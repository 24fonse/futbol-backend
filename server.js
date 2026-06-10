const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ Conexión exitosa a MongoDB Atlas"))
.catch(err => console.error("❌ Error de conexión:", err));

// Esquema NoSQL de Mongoose
const EquipoSchema = new mongoose.Schema({
  nombre: String,
  pais: String,
  titulos: Number
});
const Equipo = mongoose.model('Equipo', EquipoSchema);

// RUTAS DE LA API

// 1. GET: Obtener todos los equipos
app.get('/equipos', async (req, res) => {
  const equipos = await Equipo.find();
  res.json(equipos);
});

// 2. POST: Insertar un nuevo equipo
app.post('/equipos', async (req, res) => {
  const nuevoEquipo = new Equipo(req.body);
  await nuevoEquipo.save();
  res.json({ mensaje: "Equipo registrado", nuevoEquipo });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor activo en puerto ${PORT}`));