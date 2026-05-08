const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// API Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Servidor funcionando correctamente' });
});

app.get('/api/dashboard/stats', (req, res) => {
    res.json({
        empresas: 24,
        personal: 3456,
        eventos: 45,
        sync: 'OK'
    });
});

// Ruta para servir el index.html en cualquier ruta no API
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📁 Modo: ${process.env.NODE_ENV || 'development'}`);
});
