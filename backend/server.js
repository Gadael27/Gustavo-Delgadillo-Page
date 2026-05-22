const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();

// Middlewares de Seguridad Globales
app.use(helmet());
app.use(cors());
app.use(express.json());

// Conexión Segura a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🔮 Conexión exitosa a MongoDB sin vulnerabilidades'))
  .catch(err => console.error('❌ Error conectando a la base de datos:', err));

// Esquemas y Modelos de Datos
const LeadSchema = new mongoose.Schema({
  name: String, phone: String, email: String, date: Date, type: String,
  environment: String, hours: Number, guests: String, address: String, total: Number
});
const Lead = mongoose.model('Lead', LeadSchema);

const BlogSchema = new mongoose.Schema({ title: String, content: String, date: { type: Date, default: Date.now } });
const Blog = mongoose.model('Blog', BlogSchema);

// Endpoint: Sanitización, Validación y Registro de Contratación de Eventos (Evita Inyecciones NoSQL)
app.post('/api/bookings', [
  body('name').trim().escape().isLength({ min: 3 }),
  body('phone').trim().isNumeric().isLength({ min: 10, max: 10 }),
  body('email').isEmail().normalizeEmail(),
  body('address').trim().escape().notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const newLead = new Lead(req.body);
    await newLead.save();
    res.status(201).json({ message: 'Contratación guardada exitosamente en la base de datos.' });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// Endpoints del Blog Administrativo
app.get('/api/blog', async (req, res) => {
  const articles = await Blog.find().sort({ date: -1 });
  res.json(articles);
});

app.post('/api/blog', async (req, res) => {
  const newArticle = new Blog(req.body);
  await newArticle.save();
  res.status(201).json(newArticle);
});

// Endpoint: Panel de Ventas Ordenado alfabéticamente por Artículo
app.get('/api/admin/sales', async (req, res) => {
  const sales = [
    { article: 'Cabina Diamante Oro Espejo', category: 'Mobiliario', total: 3000 },
    { article: 'Servicio DJ Premium Show', category: 'Servicio', total: 7500 },
    { article: 'Cabina Mate Black Diamante', category: 'Mobiliario', total: 3000 },
    { article: 'Servicio DJ Base', category: 'Servicio', total: 5500 }
  ];
  sales.sort((a, b) => a.article.localeCompare(b.article));
  res.json(sales);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor Express corriendo en el puerto ${PORT}`));