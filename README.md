# Shaker Chic Kitchen

Web de venta y taller para [Shaker Chic](https://shakerchickitchen.com/): cocinas Shaker de inspiración inglesa y carpintería a medida, fabricadas en Sevilla.

Showroom 3D, catálogo (piezas de [Wallapop](https://es.wallapop.com/user/shakerchick-475713327)) y dashboard de producción.

- **Producción:** [https://shakerchickitchen.vercel.app](https://shakerchickitchen.vercel.app)
- **GitHub:** [https://github.com/Arroyador69/shakerchickitchen](https://github.com/Arroyador69/shakerchickitchen)

## Crear el proyecto en Vercel

El repo ya está preparado: Next.js 16, Node 20, región `fra1` (Frankfurt) y variables documentadas.

### Opción A · Importar el repo (recomendado)

1. Abre **[Importar shakerchickitchen en Vercel](https://vercel.com/new/import?s=https://github.com/Arroyador69/shakerchickitchen)**.
2. Framework: **Next.js** (se detecta solo).
3. Root Directory: `.`
4. Añade estas Environment Variables en Production, Preview y Development:

| Nombre | Ejemplo |
| --- | --- |
| `AUTH_SECRET` | cadena larga aleatoria (mín. 32 caracteres) |
| `ADMIN_EMAIL` | `alberto@shakerchic.dev` |
| `ADMIN_PASSWORD` | contraseña tuya |
| `CLIENT_EMAIL` | `info@shakerchickitchen.com` |
| `CLIENT_PASSWORD` | contraseña del cliente |

5. Deploy.
6. Project → **Domains** → añade `shakerchickitchen.com` y `www.shakerchickitchen.com`.

### Opción B · CLI

```bash
npx vercel@latest
npx vercel@latest env add AUTH_SECRET
npx vercel@latest --prod
```

## Arranque local

```bash
npm install
cp .env.example .env.local
# rellena AUTH_SECRET y las contraseñas
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). Dashboard: `/login` → `/dashboard`.

En local el taller se guarda en `data/ops.json`. En Vercel el catálogo es estático; el dashboard operativo usa memoria + `/tmp` hasta conectar una base de datos.

## Qué incluye

**Web:** home 3D (crema / oliva / azul), tienda, cocinas, jardín, hogar, proyectos, presupuesto, contacto, WhatsApp.

**Dashboard:** inventario, kanban de producción, leads, presupuestos, tareas y materiales.
