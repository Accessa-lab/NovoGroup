# Novo Operativa - Plataforma Integral

## Estructura del Proyecto

```
novo-operativa/
├── backend/
│   └── server.js          # Servidor Express con API REST
├── frontend/
│   ├── css/
│   │   └── styles.css     # Estilos personalizados
│   ├── js/
│   │   ├── auth.js        # Módulo de autenticación
│   │   └── dashboard.js   # Módulo del dashboard
│   └── index.html         # HTML principal
├── .env.example           # Variables de entorno de ejemplo
├── package.json           # Dependencias y scripts
└── README.md              # Documentación
```

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno (opcional):
```bash
cp .env.example .env
```

## Ejecución

### Modo Desarrollo (con auto-reload)
```bash
npm run dev
```

### Modo Producción
```bash
npm start
```

El servidor estará disponible en: `http://localhost:3000`

## Credenciales de Demo

- **Email:** Camilo@novo.com / 123456
- **Documento:** CC 1000376905 / 123456

## API Endpoints

- `GET /api/health` - Verificar estado del servidor
- `GET /api/dashboard/stats` - Obtener estadísticas del dashboard

## Tecnologías

### Backend
- Node.js
- Express
- CORS

### Frontend
- HTML5
- Tailwind CSS
- Chart.js
- Font Awesome
- JavaScript ES6+

## Estructura de Módulos Frontend

- **auth.js**: Manejo de autenticación, login, logout y sesión
- **dashboard.js**: Navegación entre secciones y carga de datos
