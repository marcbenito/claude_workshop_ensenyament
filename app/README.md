# Reserva de Sesiones de Trabajo

Prototipo funcional (solo parte de cliente) de un sistema de reserva de sesiones
con profesores. Construido con **Next.js (App Router) + TypeScript + Tailwind CSS**
y componentes UI estilo **shadcn/ui**.

> ⚠️ **Datos falsos (mock).** No hay base de datos real conectada. Toda la
> persistencia (usuarios, sesión y reservas) vive en `localStorage` del navegador.
> La capa de servicios (`src/lib/services`) está aislada a propósito para poder
> sustituirla por **Supabase** más adelante sin tocar la UI.

## Funcionalidades

- **Registro** de usuario (`/register`).
- **Login** (`/login`).
- **Dashboard** con "Mis reservas" (`/dashboard`): listado y cancelación.
- **Crear reserva** (`/reservar`) con asistente de 3 pasos:
  1. Seleccionar **día** en un calendario (días pasados deshabilitados).
  2. Seleccionar la **hora** (franjas fijas; se ocultan las ya pasadas si es hoy).
  3. Elegir un **profesor** de la lista (todos disponibles siempre).
- Rutas privadas protegidas: sin sesión redirigen a `/login`.

La lista de profesores está "hardcodeada en la BD" en
[`src/lib/data/professors.ts`](src/lib/data/professors.ts).

## Puesta en marcha

```bash
npm install
npm run dev
```

Abre http://localhost:3000. Empieza creando una cuenta en `/register`.

## Estructura

```
src/
├── app/                      # Rutas (App Router)
│   ├── layout.tsx            # Layout raíz + AuthProvider
│   ├── page.tsx              # Redirección según sesión
│   ├── login/                # Login
│   ├── register/             # Registro
│   ├── dashboard/            # Mis reservas
│   └── reservar/             # Asistente de creación de reserva
├── components/
│   ├── ui/                   # Componentes shadcn (button, card, input, calendar…)
│   ├── reservar/             # Stepper y tarjeta de profesor
│   ├── protected-route.tsx   # Guard de rutas privadas
│   ├── site-header.tsx       # Cabecera con usuario y logout
│   └── reservation-card.tsx  # Tarjeta de reserva
└── lib/
    ├── types.ts              # Tipos de dominio (mapeables a tablas de Supabase)
    ├── auth-context.tsx      # Estado de sesión (React Context)
    ├── data/                 # Datos hardcodeados (profesores, franjas horarias)
    └── services/             # Capa de "persistencia" mock (auth, reservas, storage)
```

## Migrar a Supabase (siguiente paso)

Solo hay que reimplementar las funciones de `src/lib/services/` (`auth.ts`,
`reservations.ts`) para que usen el cliente de Supabase en lugar de `localStorage`.
Los tipos de `src/lib/types.ts` ya están pensados para mapear a tablas
(`users`, `professors`, `reservations`). La UI no necesita cambios.
