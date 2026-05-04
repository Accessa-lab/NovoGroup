/**
 * Novo Operativa - Authentication Module
 * Manejo de autenticación y sesión de usuarios
 */

const AUTH_CONFIG = {
    VALID_CREDENTIALS: {
        email: { user: 'camilo@novo.com', pass: '123456' },
        document: { type: 'CC', num: '1000376905', pass: '123456' }
    },
    SESSION_KEY: 'novo_session',
    USER_KEY: 'novo_user'
};

/**
 * Cambiar entre métodos de autenticación (email/documento)
 */
function switchAuthTab(method) {
    const tabEmail = document.getElementById('tab-email');
    const tabDocument = document.getElementById('tab-document');
    const fieldEmail = document.getElementById('field-email');
    const fieldDocument = document.getElementById('field-document');
    const errorMsg = document.getElementById('error-msg');

    tabEmail.classList.toggle('active', method === 'email');
    tabDocument.classList.toggle('active', method === 'document');
    fieldEmail.classList.toggle('hidden', method !== 'email');
    fieldDocument.classList.toggle('hidden', method === 'email');
    errorMsg.classList.add('hidden');
}

/**
 * Manejar el login del usuario
 */
function handleLogin(e) {
    e.preventDefault();
    
    const errorMsg = document.getElementById('error-msg');
    const isEmailMode = !document.getElementById('field-email').classList.contains('hidden');
    const password = document.getElementById('input-password').value;
    
    let isValid = false;
    
    if (isEmailMode) {
        const email = document.getElementById('input-email').value.trim().toLowerCase();
        isValid = (email === AUTH_CONFIG.VALID_CREDENTIALS.email.user && 
                   password === AUTH_CONFIG.VALID_CREDENTIALS.email.pass);
    } else {
        const type = document.getElementById('input-doc-type').value;
        const num = document.getElementById('input-doc-num').value.trim();
        isValid = (type === AUTH_CONFIG.VALID_CREDENTIALS.document.type && 
                  num === AUTH_CONFIG.VALID_CREDENTIALS.document.num && 
                  password === AUTH_CONFIG.VALID_CREDENTIALS.document.pass);
    }
    
    if (isValid) {
        saveSession({
            name: 'Camilo',
            role: 'Administrador'
        });
        
        showDashboard();
        console.log('✅ Login exitoso - Dashboard mostrado');
    } else {
        showError('Credenciales inválidas. Usa: Camilo@novo.com / 123456');
        console.log('❌ Login fallido');
    }
}

/**
 * Guardar sesión en sessionStorage
 */
function saveSession(userData) {
    sessionStorage.setItem(AUTH_CONFIG.SESSION_KEY, 'active');
    sessionStorage.setItem(AUTH_CONFIG.USER_KEY, JSON.stringify(userData));
}

/**
 * Mostrar error en el formulario
 */
function showError(message) {
    const errorMsg = document.getElementById('error-msg');
    errorMsg.textContent = message;
    errorMsg.classList.remove('hidden');
}

/**
 * Cerrar sesión y recargar
 */
function logout() {
    sessionStorage.removeItem(AUTH_CONFIG.SESSION_KEY);
    sessionStorage.removeItem(AUTH_CONFIG.USER_KEY);
    location.reload();
}

/**
 * Verificar si hay sesión activa
 */
function hasActiveSession() {
    return sessionStorage.getItem(AUTH_CONFIG.SESSION_KEY) === 'active';
}

/**
 * Obtener datos del usuario actual
 */
function getCurrentUser() {
    const userData = sessionStorage.getItem(AUTH_CONFIG.USER_KEY);
    return userData ? JSON.parse(userData) : null;
}

// Exportar funciones para uso global
window.switchAuthTab = switchAuthTab;
window.handleLogin = handleLogin;
window.logout = logout;
window.hasActiveSession = hasActiveSession;
window.getCurrentUser = getCurrentUser;
