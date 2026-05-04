/**
 * Novo Operativa - Dashboard Module
 * Manejo de navegación, vistas y gráficas del dashboard
 */

// Configuración de gráficas
let growthChartInstance = null;
let departmentChartInstance = null;

/**
 * Mostrar el dashboard y ocultar auth
 */
function showDashboard() {
    const authView = document.getElementById('auth-view');
    const dashboardView = document.getElementById('dashboard-view');
    
    if (authView) {
        authView.classList.add('hidden');
        authView.style.display = 'none';
    }
    if (dashboardView) {
        dashboardView.classList.add('active');
        dashboardView.style.display = 'flex';
    }
    
    // Inicializar gráficas después de mostrar el dashboard
    setTimeout(() => {
        initCharts();
    }, 100);
}

/**
 * Ocultar dashboard y mostrar auth
 */
function showAuth() {
    const authView = document.getElementById('auth-view');
    const dashboardView = document.getElementById('dashboard-view');
    
    if (authView) {
        authView.classList.remove('hidden');
        authView.style.display = 'flex';
    }
    if (dashboardView) {
        dashboardView.classList.remove('active');
        dashboardView.style.display = 'none';
    }
}

/**
 * Navegar entre secciones del dashboard
 */
function showSection(sectionId) {
    // Prevenir comportamiento default del link
    if (event) event.preventDefault();
    
    // Ocultar todas las secciones
    document.querySelectorAll('section').forEach(s => {
        s.classList.add('hidden');
        s.classList.remove('animate-fade-in');
    });
    
    // Mostrar sección seleccionada con animación
    const targetSection = document.getElementById('section-' + sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        // Forzar reflow para reiniciar animación
        void targetSection.offsetWidth;
        targetSection.classList.add('animate-fade-in');
    }
    
    // Actualizar sidebar activo
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active');
        link.classList.remove('bg-novo-800', 'text-white');
        
        // Verificar si este link corresponde a la sección actual
        const onclickAttr = link.getAttribute('onclick');
        if (onclickAttr && onclickAttr.includes(sectionId)) {
            link.classList.add('active', 'bg-novo-800', 'text-white');
        }
    });
    
    console.log('✅ Sección cambiada a:', sectionId);
}

/**
 * Inicializar gráficas con Chart.js
 */
function initCharts() {
    // Evitar crear múltiples instancias
    if (growthChartInstance) growthChartInstance.destroy();
    if (departmentChartInstance) departmentChartInstance.destroy();
    
    // Gráfica de Crecimiento Mensual
    const growthCtx = document.getElementById('growthChart');
    if (growthCtx) {
        growthChartInstance = new Chart(growthCtx, {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                datasets: [{
                    label: 'Empleados',
                    data: [2800, 2950, 3100, 3200, 3350, 3456],
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#2563eb',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    // Gráfica de Distribución por Departamento
    const deptCtx = document.getElementById('departmentChart');
    if (deptCtx) {
        departmentChartInstance = new Chart(deptCtx, {
            type: 'doughnut',
            data: {
                labels: ['Ventas', 'Tecnología', 'Marketing', 'RH', 'Finanzas'],
                datasets: [{
                    data: [35, 25, 20, 12, 8],
                    backgroundColor: [
                        '#3b82f6', // azul
                        '#8b5cf6', // violeta
                        '#f97316', // naranja
                        '#10b981', // verde
                        '#eab308'  // amarillo
                    ],
                    borderWidth: 0,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }
    
    console.log('✅ Gráficas inicializadas correctamente');
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
        // Usar valores por defecto si falla la API
        updateStatCard('empresas', 24);
        updateStatCard('personal', '3,456');
        updateStatCard('eventos', 45);
        updateStatCard('sync', 'OK');
    }
}

/**
 * Actualizar tarjeta de estadística
 */
function updateStatCard(id, value) {
    const element = document.getElementById('stat-' + id);
    if (element) {
        // Animación simple de actualización
        element.style.opacity = '0';
        setTimeout(() => {
            element.textContent = value;
            element.style.opacity = '1';
        }, 200);
    }
    console.log(`📊 Actualizando ${id}: ${value}`);
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
            const welcomeSpan = document.getElementById('user-welcome');
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
window.initCharts = initCharts;

// Event listener para cargar al inicio del DOM
document.addEventListener('DOMContentLoaded', initDashboard);
