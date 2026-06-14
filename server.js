const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ Conexión exitosa a MongoDB Atlas"))
.catch(err => console.error("❌ Error de conexión:", err));

const EquipoSchema = new mongoose.Schema({
  nombre: String,
  pais: String,
  titulos: Number
});
const Equipo = mongoose.model('Equipo', EquipoSchema);

app.get('/equipos', async (req, res) => {
  const equipos = await Equipo.find();
  res.json(equipos);
});

app.post('/equipos', async (req, res) => {
  const nuevoEquipo = new Equipo(req.body);
  await nuevoEquipo.save();
  res.json({ mensaje: "Equipo registrado", nuevoEquipo });
});

app.put('/equipos/:id', async (req, res) => {
  const equipo = await Equipo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ mensaje: "Equipo actualizado", equipo });
});

app.delete('/equipos/:id', async (req, res) => {
  await Equipo.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Equipo eliminado" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor activo en puerto ${PORT}`));