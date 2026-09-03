# Shaker Chic Kitchen

Web de venta y taller para [Shaker Chic](https://shakerchickitchen.com/): cocinas Shaker de inspiración inglesa y carpintería a medida, fabricadas en Sevilla.

Showroom 3D, catálogo (piezas de [Wallapop](https://es.wallapop.com/user/shakerchick-475713327)) y dashboard de producción.

- **Producción:** [https://shakerchickitchen.vercel.app](https://shakerchickitchen.vercel.app)
- **GitHub:** [https://github.com/Arroyador69/shakerchickitchen](https://github.com/Arroyador69/shakerchickitchen)

## Crear el proyecto en Vercel

El proyecto **ya está creado y conectado**:

- Dashboard: [arroyador69s-projects/shakerchickitchen](https://vercel.com/arroyador69s-projects/shakerchickitchen)
- Web: [https://shakerchickitchen.vercel.app](https://shakerchickitchen.vercel.app)
- GitHub conectado: cada `git push` a `main` despliega producción
- Variables: `AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `CLIENT_EMAIL`, `CLIENT_PASSWORD` (Production, Preview y Development)

### Si hay que crear otro (otra cuenta / duplicado)

1. Abre **[Importar shakerchickitchen](https://vercel.com/new/import?s=https://github.com/Arroyador69/shakerchickitchen)**.
2. Framework: **Next.js**. Root Directory: `.`
3. Añade las mismas Environment Variables.
4. Deploy → Project → **Domains** → `shakerchickitchen.com`.

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
