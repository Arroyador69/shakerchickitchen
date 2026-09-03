# Shaker Chic Kitchen

Web de venta y taller para [Shaker Chic](https://shakerchickitchen.com/): cocinas Shaker de inspiración inglesa y carpintería a medida, fabricadas en Sevilla.

La web pública sustituye la plantilla WordPress. Incluye showroom 3D, catálogo completo (piezas que hoy están en [Wallapop](https://es.wallapop.com/user/shakerchick-475713327)) y un dashboard de producción.

## Stack

- Next.js 16 · React 19 · Tailwind 4
- React Three Fiber (cocina Shaker interactiva)
- Auth por cookie JWT (estudio + cliente)
- Listo para Vercel

## Arranque local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

### Acceso dashboard

| Rol | Email | Contraseña por defecto |
| --- | --- | --- |
| Estudio (tú) | `alberto@shakerchic.dev` | `ShakerAdmin2026` |
| Cliente | `info@shakerchickitchen.com` | `ShakerChic2026` |

Cámbialas en `.env.local` y en Vercel → Environment Variables.

## Qué incluye

**Web**
- Home con cocina 3D (crema / oliva / azul profundo)
- Tienda con las piezas de Wallapop + mesa artesanal del portfolio
- Cocinas, jardín, hogar, proyectos, presupuesto y contacto
- WhatsApp directo al +34 614 95 66 47
- Formularios que entran como leads al dashboard

**Dashboard** (`/dashboard`)
- Inventario y estados de stock
- Kanban de producción (diseño → corte → ensamblaje → acabado → instalación)
- Leads, presupuestos y tareas del día
- Materiales del taller con aviso de mínimo

Los datos operativos viven en memoria del servidor (perfecto para demo y primer deploy). Para persistencia real en producción se puede conectar Postgres/Neon sin tocar la UI.

## Deploy en Vercel

```bash
npx vercel
```

O conecta el repo en [vercel.com/new](https://vercel.com/new). Variables necesarias: `AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `CLIENT_EMAIL`, `CLIENT_PASSWORD`.

Cuando el dominio `shakerchickitchen.com` apunte a este proyecto, la web nueva sustituye la plantilla actual.

## Fotos

Las imágenes del catálogo son de referencia (Unsplash) hasta que se suban las fotos reales del taller / Wallapop. El modelo 3D y los textos sí son de la marca.
