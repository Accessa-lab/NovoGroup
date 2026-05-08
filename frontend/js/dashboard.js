// dashboard.js - Lógica del Panel Administrativo

document.addEventListener('DOMContentLoaded', () => {
  initDashboard();
});

function initDashboard() {
  // Verificar sesión (simulado)
  const user = JSON.parse(localStorage.getItem('novoUser'));
  if (!user) {
    window.location.href = 'index.html';
    return;
  }

  renderEmpresasSection();
}

function renderEmpresasSection() {
  const container = document.getElementById('empresas-content');
  if (!container) return;

  container.innerHTML = `
    <div class="card">
      <div class="card-header">
        <h2>Gestión de Empresas</h2>
        <button id="btn-nueva-empresa" class="btn btn-primary">
          <i class="fas fa-plus"></i> Nueva Empresa
        </button>
      </div>
      
      <div id="lista-empresas" class="mt-4">
        <p>Cargando empresas...</p>
      </div>
    </div>

    <!-- Modal Formulario -->
    <div id="modal-empresa" class="modal" style="display:none;">
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h3>Crear Nueva Empresa</h3>
        <form id="form-empresa">
          <div class="form-group">
            <label>Nombre Comercial *</label>
            <input type="text" id="emp-nombre" required placeholder="Ej: Novo Group SAS">
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>NIT / ID Fiscal *</label>
              <input type="text" id="emp-nit" required placeholder="Ej: 900123456-1">
            </div>
            <div class="form-group">
              <label>Email Corporativo</label>
              <input type="email" id="emp-email" placeholder="contacto@empresa.com">
            </div>
          </div>
          <div class="form-group">
            <label>Dirección Principal</label>
            <input type="text" id="emp-direccion" placeholder="Ciudad, Dirección">
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Teléfono</label>
              <input type="text" id="emp-telefono" placeholder="+57 300...">
            </div>
            <div class="form-group">
              <label>Estado</label>
              <select id="emp-estado">
                <option value="activa">Activa</option>
                <option value="inactiva">Inactiva</option>
                <option value="suspensa">Suspendida</option>
              </select>
            </div>
          </div>
          <div class="form-actions">
            <button type="button" class="btn btn-secondary close-modal">Cancelar</button>
            <button type="submit" class="btn btn-success">Guardar Empresa</button>
          </div>
        </form>
      </div>
    </div>
  `;

  setupModalEvents();
  loadEmpresas();
}

function setupModalEvents() {
  const modal = document.getElementById('modal-empresa');
  const btnOpen = document.getElementById('btn-nueva-empresa');
  const btnClose = document.querySelectorAll('.close-modal');
  const form = document.getElementById('form-empresa');

  if (btnOpen) {
    btnOpen.addEventListener('click', () => {
      modal.style.display = 'flex';
    });
  }

  btnClose.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  if (form) {
    form.addEventListener('submit', handleCreateEmpresa);
  }
}

async function loadEmpresas() {
  const lista = document.getElementById('lista-empresas');
  try {
    const res = await fetch('/api/empresas');
    const result = await res.json();
    
    if (result.success && result.data.length > 0) {
      let html = '<table class="table"><thead><tr><th>Nombre</th><th>NIT</th><th>Email</th><th>Estado</th></tr></thead><tbody>';
      result.data.forEach(emp => {
        html += `
          <tr>
            <td>${emp.nombre}</td>
            <td>${emp.nit}</td>
            <td>${emp.email || '-'}</td>
            <td><span class="badge badge-${emp.estado === 'activa' ? 'success' : 'danger'}">${emp.estado}</span></td>
          </tr>
        `;
      });
      html += '</tbody></table>';
      lista.innerHTML = html;
    } else {
      lista.innerHTML = '<p class="text-muted">No hay empresas registradas aún.</p>';
    }
  } catch (error) {
    lista.innerHTML = '<p class="text-danger">Error al cargar empresas.</p>';
    console.error(error);
  }
}

async function handleCreateEmpresa(e) {
  e.preventDefault();
  
  const data = {
    nombre: document.getElementById('emp-nombre').value,
    nit: document.getElementById('emp-nit').value,
    email: document.getElementById('emp-email').value,
    direccion: document.getElementById('emp-direccion').value,
    telefono: document.getElementById('emp-telefono').value,
    estado: document.getElementById('emp-estado').value
  };

  const btnSubmit = e.target.querySelector('button[type="submit"]');
  const originalText = btnSubmit.innerText;
  btnSubmit.innerText = 'Guardando...';
  btnSubmit.disabled = true;

  try {
    const res = await fetch('/api/empresas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (result.success) {
      alert('✅ Empresa creada exitosamente en Firebase');
      document.getElementById('modal-empresa').style.display = 'none';
      e.target.reset();
      loadEmpresas(); // Recargar lista
    } else {
      alert('❌ Error: ' + result.message);
    }
  } catch (error) {
    alert('❌ Error de conexión: ' + error.message);
  } finally {
    btnSubmit.innerText = originalText;
    btnSubmit.disabled = false;
  }
}
