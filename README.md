# Agenda de Contactos

Aplicación SPA para gestionar una agenda de contactos, desarrollada con **React + Vite** y conectada a **Supabase** como backend (base de datos PostgreSQL con API REST automática).

Proyecto desarrollado para la Evaluación Sumativa 3 - Framework JavaScript (Programación Front End).

## Funcionalidades

- Crear y eliminar contactos (nombre y apellido).
- Agregar y eliminar sets de datos de contacto (correo, teléfono, dirección) asociados a un tipo: Personal, Trabajo o Casa.
- Validación de campos según la configuración de la base de datos.
- Manejo de mensajes de error (carga, inserción, eliminación, sin conexión).
- Buscador de contactos por nombre o apellido.
- Desarrollo basado en componentes.

## Tecnologías

- React 19 + Vite
- Supabase (PostgreSQL + REST API vía `@supabase/supabase-js`)
- CSS puro (sin framework de UI)

## Instalación

```bash
npm install
```

## Configuración de variables de entorno

Este proyecto ya incluye un archivo `.env` con las credenciales de conexión a Supabase. Si necesitas usar otro proyecto de Supabase, edita `.env` (o copia `.env.example`) con tus propios valores:

```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-publica-anon
```

## Ejecutar en desarrollo

```bash
npm start
```

(equivalente a `npm run dev`)

## Generar build de producción

```bash
npm run build
```

Los archivos quedan listos en la carpeta `dist/`.

## Estructura de la base de datos (Supabase)

**Tabla `contacto`**
| Campo | Tipo |
|---|---|
| id_contacto | bigint (PK, identity) |
| nombre | varchar |
| apellido | varchar |

**Tabla `dato_contacto`**
| Campo | Tipo |
|---|---|
| id_dato_contacto | bigint (PK, identity) |
| id_contacto | bigint (FK → contacto) |
| tipo | varchar (Personal / Trabajo / Casa) |
| correo | varchar |
| telefono | varchar |
| direccion | text |

## Estructura del proyecto

```
src/
├── components/
│   ├── FormularioContacto.jsx
│   ├── FormularioDatoContacto.jsx
│   ├── FichaContacto.jsx
│   ├── ItemDatoContacto.jsx
│   ├── EstadoCarga.jsx
│   ├── EstadoError.jsx
│   └── EstadoVacio.jsx
├── hooks/
│   └── useContactos.js
├── lib/
│   └── supabaseClient.js
├── App.jsx
└── App.css
```
