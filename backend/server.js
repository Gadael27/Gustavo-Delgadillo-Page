const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const { MercadoPagoConfig, Preference } = require('mercadopago');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// =========================================================================
// 🔐 MIDDLEWARE DE PROTECCIÓN
// =========================================================================
const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(403).json({ success: false, error: 'Acceso denegado: Token requerido' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(401).json({ success: false, error: 'Token inválido o expirado' });
    req.user = user;
    next();
  });
};

// =========================================================================
// 🔥 INICIALIZACIÓN DE FIREBASE
// =========================================================================
let db;
try {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    })
  });
  db = admin.firestore();
  console.log("🔥 [SYSTEM] Conexión establecida con éxito a Google Firebase Firestore");
} catch (error) {
  console.error("❌ [ERROR] Falló la inicialización de Firebase:", error.message);
}

// =========================================================================
// 💳 INICIALIZACIÓN DE MERCADO PAGO
// =========================================================================
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN
});

// =========================================================================
// 🛣️ ENDPOINT: GUARDAR RESERVACIONES (PÚBLICO)
// =========================================================================
app.post('/api/reservaciones', async (req, res) => {
  try {
    const { nombre, telefono, correo, fecha, horaInicio, tipoEvento, locacion, direccion, totalEvent, paymentType, montoPagar } = req.body;

    if (!nombre || !telefono || !correo || !fecha || !horaInicio) {
      return res.status(400).json({ success: false, error: 'Faltan campos mandatorios para agendar la fecha.' });
    }

    const nuevaReservacion = {
      tipoItem: 'Servicio DJ',
      cliente: { nombre, telefono, correo },
      logistica: { fecha, horaInicio, tipoEvento, locacion, direccion },
      financiero: { totalEvent, montoCobradoOnline: montoPagar, tipoPago: paymentType, estatus: 'Pendiente de Pago' },
      fechaRegistro: new Date().toISOString()
    };

    const docRef = await db.collection('reservaciones').add(nuevaReservacion);

    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: [{
          id: docRef.id,
          title: paymentType === 'completo' ? `Pago Completo Show DJ - ${tipoEvento}` : `Anticipo Fecha Show DJ - ${tipoEvento}`,
          quantity: 1,
          unit_price: Number(montoPagar),
          currency_id: 'MXN'
        }],
        back_urls: {
          success: 'http://localhost:5176/',
          failure: 'http://localhost:5176/cotizacion',
          pending: 'http://localhost:5176/'
        },
        external_reference: docRef.id
      }
    });

    res.status(201).json({ success: true, message: 'Lead guardado.', id: docRef.id, init_point: result.init_point });
  } catch (error) {
    console.error("❌ Error en servidor:", error);
    res.status(500).json({ success: false, error: 'Error interno en el servidor.' });
  }
});

// =========================================================================
// 🔐 ENDPOINT: LOGIN
// =========================================================================
app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;

  const passwordValido = await bcrypt.compare(password, process.env.ADMIN_HASH);

  if (email === process.env.ADMIN_EMAIL && passwordValido) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ success: true, token });
  } else {
    res.status(401).json({ success: false, error: 'Credenciales inválidas.' });
  }
});

// =========================================================================
// 🛣️ RUTAS PROTEGIDAS (Admin)
// =========================================================================
app.get('/api/admin/ventas', verificarToken, async (req, res) => {
  try {
    const snapshot = await db.collection('reservaciones').orderBy('fechaRegistro', 'desc').get();
    const ventas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json({ success: true, data: ventas });
  } catch (error) {
    res.status(500).json({ success: false, error: 'No se pudo extraer el historial.' });
  }
});

app.post('/api/admin/blog', verificarToken, async (req, res) => {
  try {
    const { titulo, contenido, imagenUrl } = req.body;
    const nuevoPost = { titulo, autor: 'Gustavo Delgadillo', contenido, imagenUrl, fechaPublicacion: new Date().toISOString() };
    const docRef = await db.collection('blog').add(nuevoPost);
    res.status(201).json({ success: true, id: docRef.id });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al registrar la nota.' });
  }
});

app.delete('/api/admin/blog/:id', verificarToken, async (req, res) => {
  try {
    await db.collection('blog').doc(req.params.id).delete();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al eliminar.' });
  }
});

// =========================================================================
// 📝 RUTAS PÚBLICAS
// =========================================================================
app.get('/api/blog', async (req, res) => {
  try {
    const snapshot = await db.collection('blog').orderBy('fechaPublicacion', 'desc').get();
    const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, error: 'No se pudo obtener el blog.' });
  }
});

app.post('/api/mercadopago/webhook', async (req, res) => {
  try {
    const { query } = req;
    const topic = query.topic || query.type;
    if (topic === "payment") {
      const paymentId = query.id || query['data.id'];
      const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: { 'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}` }
      });
      if (response.ok) {
        const paymentData = await response.json();
        if (paymentData.status === "approved") {
          await db.collection('reservaciones').doc(paymentData.external_reference).update({
            'financiero.estatus': 'Apartado Confirmado'
          });
        }
      }
    }
    res.status(200).send('OK');
  } catch (error) {
    res.status(500).send('Error');
  }
});

// =========================================================================
// 🌐 SERVIR FRONTEND (Opción A)
// =========================================================================
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('/{*path}', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
  }
});

// =========================================================================
// 🚀 ARRANQUE
// =========================================================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 [SERVER] Seguro y corriendo en puerto ${PORT}`));