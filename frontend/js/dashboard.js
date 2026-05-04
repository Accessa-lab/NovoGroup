/**
 * Novo Operativa - Dashboard Module
 * Manejo de navegación y vistas del dashboard
 */

/**
 * Mostrar el dashboard y ocultar auth
 */
function showDashboard() {
    const authView = document.getElementById('auth-view');
    const dashboardView = document.getElementById('dashboard-view');
    
    if (authView) authView.classList.add('hidden');
    if (dashboardView) dashboardView.classList.add('active');
}

/**
 * Ocultar dashboard y mostrar auth
 */
function showAuth() {
    const authView = document.getElementById('auth-view');
    const dashboardView = document.getElementById('dashboard-view');
    
    if (authView) authView.classList.remove('hidden');
    if (dashboardView) dashboardView.classList.remove('active');
}

/**
 * Navegar entre secciones del dashboard
 */
function showSection(sectionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    
    // Mostrar sección seleccionada
    const targetSection = document.getElementById('section-' + sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }
    
    // Actualizar sidebar activo
    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
    if (event && event.target) {
        const closestLink = event.target.closest('.sidebar-link');
        if (closestLink) {
            closestLink.classList.add('active');
        }
    }
}

/**
 * Cargar estadísticas del dashboard desde la API
 */
async function loadDashboardStats() {
    try {
        const response = await fetch('/api/dashboard/stats');
        const data = await response.json();
        
        updateStatCard('empresas', data.empresas);
        updateStatCard('personal', data.personal);
        updateStatCard('eventos', data.eventos);
        updateStatCard('sync', data.sync);
        
        console.log('✅ Estadísticas cargadas correctamente');
    } catch (error) {
        console.error('❌ Error cargando estadísticas:', error);
    }
}

/**
 * Actualizar tarjeta de estadística
 */
function updateStatCard(id, value) {
    // Implementación básica - puede extenderse según necesidad
    console.log(`Actualizando ${id}: ${value}`);
}

/**
 * Inicializar el dashboard al cargar
 */
function initDashboard() {
    if (hasActiveSession()) {
        showDashboard();
        loadDashboardStats();
        
        const user = getCurrentUser();
        if (user) {
            const welcomeSpan = document.querySelector('header span');
            if (welcomeSpan) {
                welcomeSpan.textContent = `Bienvenido, ${user.name}`;
            }
        }
        
        console.log('✅ Dashboard inicializado');
    } else {
        showAuth();
        console.log('ℹ️ Sin sesión activa - Login mostrado');
    }
}

// Exportar funciones para uso global
window.showDashboard = showDashboard;
window.showAuth = showAuth;
window.showSection = showSection;
window.loadDashboardStats = loadDashboardStats;
window.initDashboard = initDashboard;

// Event listener para cargar al inicio del DOM
document.addEventListener('DOMContentLoaded', initDashboard);
