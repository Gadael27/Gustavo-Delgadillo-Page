const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const { MercadoPagoConfig, Preference } = require('mercadopago'); // SDK oficial actualizado v3
require('dotenv').config();

const app = express();

// Middlewares globales de seguridad y comunicación entre puertos
app.use(cors());
app.use(express.json());

// =========================================================================
// 🔥 1. INICIALIZACIÓN DE FIREBASE DIRECTA VÍA ARCHIVO JSON (MÉTODO SEGURO)
// =========================================================================
try {
  const serviceAccount = require("./firebase-key.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log("🔥 [SYSTEM] Conexión establecida con éxito a Google Firebase Firestore");
} catch (error) {
  console.error("❌ [ERROR] Falló la inicialización de Firebase. Verifica que el archivo firebase-key.json esté en la carpeta backend:", error.message);
}

const db = admin.firestore();

// =========================================================================
// 💳 1.5. INICIALIZACIÓN DE MERCADO PAGO (CON CREDENCIALES SEGURAS)
// =========================================================================
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN || 'APP_USR-3796101029675541-051115-8c1998085ce1f90c25288334caf61c6b-3395131658' 
});

// =========================================================================
// 🛣️ 2. ENDPOINT: GUARDAR RESERVACIONES DE EVENTOS (FRONTEND -> DB)
// =========================================================================
app.post('/api/reservaciones', async (req, res) => {
  try {
    // ✅ CORRECCIÓN CRÍTICA: Ahora recibimos montoPagar y paymentType desde el Frontend
    const { nombre, telefono, correo, fecha, horaInicio, tipoEvento, locacion, direccion, totalEvent, paymentType, montoPagar } = req.body;

    // Sanitización y Validación básica obligatoria
    if (!nombre || !telefono || !correo || !fecha || !horaInicio) {
      return res.status(400).json({ success: false, error: 'Faltan campos mandatorios para agendar la fecha.' });
    }

    const nuevaReservacion = {
      tipoItem: 'Servicio DJ',
      cliente: { nombre, telefono, correo },
      logistica: { fecha, horaInicio, tipoEvento, locacion, direccion },
      // ✅ GUARDAMOS EL TIPO DE PAGO Y EL MONTO REAL EN FIREBASE PARA TU AUDITORÍA
      financiero: { totalEvent, montoCobradoOnline: montoPagar, tipoPago: paymentType, estatus: 'Pendiente de Pago' },
      fechaRegistro: new Date().toISOString()
    };

    // Inserción directa en la colección 'reservaciones' de Firestore
    const docRef = await db.collection('reservaciones').add(nuevaReservacion);

    // B. Crear la orden de cobro de forma dinámica en Mercado Pago
    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: [
          {
            id: docRef.id,
            // 🏷️ Cambiamos el título en Mercado Pago dependiendo de qué eligió el cliente
            title: paymentType === 'completo' ? `Pago Completo Show DJ - ${tipoEvento}` : `Anticipo Fecha Show DJ - ${tipoEvento}`,
            quantity: 1,
            unit_price: Number(montoPagar), // 💵 COBRA EXACTAMENTE EL VALOR DINÁMICO (Anticipo o Total)
            currency_id: 'MXN'
          }
        ],
        back_urls: {
          success: 'http://localhost:5176/', 
          failure: 'http://localhost:5176/cotizacion',
          pending: 'http://localhost:5176/'
        },
        // ✅ CORRECCIÓN MERCADO PAGO: Se desactiva el retorno automático para evitar el error de validación en local
        // auto_return: 'approved',
        external_reference: docRef.id 
      }
    });

    res.status(201).json({ 
      success: true, 
      message: 'Lead guardado y pasarela de Mercado Pago generada correctamente.', 
      id: docRef.id,
      init_point: result.init_point 
    });

  } catch (error) {
    console.error("❌ Error en el flujo del servidor (Firestore/MercadoPago):", error);
    res.status(500).json({ success: false, error: 'Error interno en el servidor de base de datos o pasarela.' });
  }
});

// =========================================================================
// 🛣️ 3. ENDPOINT: OBTENER RESERVACIONES ORDENADAS (PARA EL PANEL DE ADMIN)
// =========================================================================
app.get('/api/admin/ventas', async (req, res) => {
  try {
    const snapshot = await db.collection('reservaciones')
      .orderBy('fechaRegistro', 'desc') 
      .get();

    const ventas = [];
    snapshot.forEach(doc => {
      ventas.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json({ success: true, data: ventas });
  } catch (error) {
    console.error("❌ Error al consultar Firestore para Admin:", error);
    res.status(500).json({ success: false, error: 'No se pudo extraer el historial de ventas.' });
  }
});

// =========================================================================
// 🔐 ENDPOINT: AUTENTICACIÓN SEGURA MASTER (MIGRADO DESDE EL FRONTEND)
// =========================================================================
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;

  // Las credenciales quedan blindadas dentro del entorno seguro del servidor
  const USUARIO_MASTER = 'admin@gdl.com';
  const PASSWORD_MASTER = 'admin123';

  if (email === USUARIO_MASTER && password === PASSWORD_MASTER) {
    res.status(200).json({ 
      success: true, 
      message: 'Consola desbloqueada correctamente.' 
    });
  } else {
    res.status(401).json({ 
      success: false, 
      error: 'Credenciales inválidas de control interno.' 
    });
  }
});

// =========================================================================
// 🛣️ 3.5. WEBHOOK: NOTIFICACIÓN DE PAGO REAL DE MERCADO PAGO (SINCRO AUTOMÁTICA)
// =========================================================================
app.post('/api/mercadopago/webhook', async (req, res) => {
  try {
    const { query } = req;
    const topic = query.topic || query.type;

    if (topic === "payment") {
      const paymentId = query.id || query['data.id'];
      
      const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: { 'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN || 'APP_USR-3796101029675541-051115-8c1998085ce1f90c25288334caf61c6b-3395131658'}` }
      });
      
      if (response.ok) {
        const paymentData = await response.json();
        
        if (paymentData.status === "approved") {
          const firebaseDocId = paymentData.external_reference;

          if (firebaseDocId) {
            await db.collection('reservaciones').doc(firebaseDocId).update({
              'financiero.estatus': 'Apartado Confirmado',
              'financiero.mercadopagoPaymentId': paymentId,
              'fechaConfirmacion': new Date().toISOString()
            });
            console.log(`✅ [WEBHOOK SINCRO] Evento ${firebaseDocId} actualizado a APARTADO CONFIRMADO de forma remota.`);
          }
        }
      }
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error("❌ Error procesando el Webhook de Mercado Pago:", error);
    res.status(500).send('Internal Server Error');
  }
});

// =========================================================================
// 📝 ENDPOINTS: GESTIÓN COMPLETA DEL BLOG DINÁMICO (CRUD)
// =========================================================================

app.get('/api/blog', async (req, res) => {
  try {
    const snapshot = await db.collection('blog').orderBy('fechaPublicacion', 'desc').get();
    const posts = [];
    snapshot.forEach(doc => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.error("❌ Error al leer notas de la colección blog:", error);
    res.status(500).json({ success: false, error: 'No se pudo obtener el historial del blog.' });
  }
});

app.post('/api/admin/blog', async (req, res) => {
  try {
    const { titulo, autor, contenido, imagenUrl } = req.body;
    if (!titulo || !contenido) {
      return res.status(400).json({ success: false, error: 'Faltan parámetros mandatorios de texto.' });
    }

    const nuevoPost = {
      titulo,
      autor: autor || 'Gustavo Delgadillo',
      contenido,
      imagenUrl: imagenUrl || 'https://images.unsplash.com/photo-1516873240891-4bf014598ab4',
      fechaPublicacion: new Date().toISOString()
    };

    const docRef = await db.collection('blog').add(nuevoPost);
    res.status(201).json({ success: true, id: docRef.id, message: 'Nota indexada de forma exitosa en Firebase.' });
  } catch (error) {
    console.error("❌ Error al guardar publicación en Firebase:", error);
    res.status(500).json({ success: false, error: 'Fallo interno al registrar la nota.' });
  }
});

app.delete('/api/admin/blog/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('blog').doc(id).delete();
    res.status(200).json({ success: true, message: 'Artículo purgado con éxito de la base de datos.' });
  } catch (error) {
    console.error("❌ Error al eliminar documento del blog:", error);
    res.status(500).json({ success: false, error: 'Fallo de comunicación con Firebase.' });
  }
});

// =========================================================================
// 🚀 4. ARRANQUE DEL SERVIDOR EN EL PUERTO SELECCIONADO
// =========================================================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 [SERVER] Infraestructura corriendo perfectamente en http://localhost:${PORT}`);
});