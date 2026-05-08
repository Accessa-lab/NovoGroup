const express = require('express');
const cors = require('cors');
const path = require('path');
const { db, collection, addDoc, getDocs } = require('./firebaseConfig');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// --- RUTA: Crear Nueva Empresa ---
app.post('/api/empresas', async (req, res) => {
  try {
    const { nombre, nit, direccion, telefono, email, logoUrl, estado } = req.body;

    if (!nombre || !nit) {
      return res.status(400).json({ success: false, message: 'Nombre y NIT son obligatorios' });
    }

    const nuevaEmpresa = {
      nombre,
      nit,
      direccion: direccion || '',
      telefono: telefono || '',
      email: email || '',
      logoUrl: logoUrl || '',
      estado: estado || 'activa',
      fechaCreacion: new Date().toISOString(),
      createdBy: 'superadmin' // En producción, esto vendría del token de sesión
    };

    // Guardar en Firebase Firestore
    const docRef = await addDoc(collection(db, "empresas"), nuevaEmpresa);

    console.log(`✅ Empresa creada con ID: ${docRef.id}`);
    
    res.json({ 
      success: true, 
      message: 'Empresa creada exitosamente', 
      data: { id: docRef.id, ...nuevaEmpresa } 
    });

  } catch (error) {
    console.error('❌ Error al crear empresa:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor', 
      error: error.message 
    });
  }
});

// --- RUTA: Listar Empresas (Para verificar) ---
app.get('/api/empresas', async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, "empresas"));
    const empresas = [];
    querySnapshot.forEach((doc) => {
      empresas.push({ id: doc.id, ...doc.data() });
    });
    res.json({ success: true, data: empresas });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Servir el frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`🔗 URL: http://localhost:${PORT}`);
});
