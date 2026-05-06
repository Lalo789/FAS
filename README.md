# FAS - Sistema de Gestión de Restaurantes

FAS es una plataforma web diseñada para la gestión integral de restaurantes, enfocada en optimizar tanto la atención al cliente como la administración interna del negocio.

## 📋 Descripción

FAS centraliza y automatiza procesos clave como:
- ✅ Reservaciones de mesas
- ✅ Gestión de disponibilidad en tiempo real
- ✅ Control de empleados
- ✅ Administración de clientes
- ✅ Asignación de personal
- ✅ Reportes y análisis

## 🎯 Objetivo

Agilizar el proceso de reservación y mejorar la organización interna del restaurante, reduciendo errores, tiempos de espera y optimizando la experiencia para clientes y personal.

## 🛠️ Tecnologías Utilizadas

| Componente | Tecnología |
|-----------|-----------|
| **Frontend** | HTML, CSS, Bootstrap, JavaScript |
| **Backend** | Django (Python) |
| **Base de Datos** | PostgreSQL |
| **API REST** | Django REST Framework |
| **Arquitectura** | Cliente-Servidor |

## 📦 Requisitos

- Python 3.9+
- PostgreSQL 12+
- pip (gestor de paquetes Python)

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/Lalo789/FAS.git
cd FAS
```

### 2. Crear y activar entorno virtual

**En Windows (PowerShell):**
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

**En Linux/Mac:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Instalar dependencias

```bash
pip install -r requirements.txt
```

### 4. Configurar variables de entorno

Copiar el archivo de ejemplo:
```bash
cp .env.example .env
```

Editar `.env` con tus valores:
```env
DEBUG=True
SECRET_KEY=tu-clave-secreta-aqui
DB_NAME=FAS_DB
DB_USER=postgres
DB_PASSWORD=tu-contraseña
DB_HOST=127.0.0.1
DB_PORT=5433
```

### 5. Configurar base de datos

Crear la base de datos PostgreSQL:
```bash
createdb FAS_DB
```

Ejecutar migraciones:
```bash
python manage.py migrate
```

Crear superusuario (administrador):
```bash
python manage.py createsuperuser
```

### 6. Cargar datos iniciales (Opcional)

```bash
python manage.py loaddata FAS_DB.sql
```

### 7. Ejecutar servidor de desarrollo

```bash
python manage.py runserver
```

La aplicación estará disponible en: http://127.0.0.1:8000/

## 📁 Estructura del Proyecto

```
FAS/
├── config/                 # Configuración principal de Django
│   ├── settings.py        # Configuración del proyecto
│   ├── urls.py            # Rutas principales
│   ├── wsgi.py            # Configuración WSGI
│   └── asgi.py            # Configuración ASGI
├── app1/                  # Aplicación principal
│   ├── models.py          # Modelos de datos
│   ├── views.py           # Vistas
│   ├── urls.py            # URLs de la app
│   ├── serializers.py     # Serializadores para API
│   └── templates/         # Templates HTML
├── admin_panel/           # Panel administrativo
│   ├── models.py
│   ├── views.py
│   ├── templates/
│   └── static/
├── static/                # Archivos estáticos (CSS, JS, imágenes)
├── media/                 # Archivos subidos por usuarios
├── templates/             # Templates globales
├── manage.py              # Script de gestión de Django
├── requirements.txt       # Dependencias del proyecto
└── .env                   # Variables de entorno (NO subirlo a Git)
```

## 🔧 Comandos Útiles

```bash
# Activar entorno virtual
.\venv\Scripts\Activate.ps1  # Windows
source venv/bin/activate      # Linux/Mac

# Instalar dependencias
pip install -r requirements.txt

# Hacer migraciones
python manage.py makemigrations
python manage.py migrate

# Crear usuario administrador
python manage.py createsuperuser

# Ejecutar servidor
python manage.py runserver

# Ejecutar pruebas
python manage.py test

# Desactivar entorno virtual
deactivate
```

## 🔐 Seguridad

- La clave secreta de Django está protegida en `.env`
- Las credenciales de base de datos no se versionan
- El archivo `.env` está en `.gitignore`

## 👥 Autores

- **Lalo789** - Desarrollador

## 📝 Licencia

Este proyecto está bajo licencia MIT.

## 📞 Contacto

Para preguntas o sugerencias, contacta a través de GitHub Issues.

