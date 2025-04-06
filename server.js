const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('public')); // sirve archivos estáticos

// API routes
app.get('/characters', async (req, res) => {
  try {
    const response = await axios.get('https://rickandmortyapi.com/api/character');
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener personajes' });
  }
});

app.get('/characters/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(name)}`);
    res.json(response.data.results[0]);
  } catch (error) {
    res.status(404).json({ error: 'Personaje no encontrado' });
  }
});

// Ruta raíz explícita
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});