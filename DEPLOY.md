# Desplegar Raíces a producción (gratis)

Todo el código ya está listo para esto. Lo único que falta son 3 cuentas gratuitas que **tienes que crear tú** —
por seguridad, un asistente de IA no puede crear cuentas ni ingresar credenciales en tu nombre. Cada paso de abajo
toma 1-2 minutos. En total, unos 10-15 minutos.

## Resumen de lo que vas a crear

| Servicio | Para qué | Plan |
|---|---|---|
| [Supabase](https://supabase.com) | Base de datos Postgres (reemplaza el SQLite local) | Gratis |
| [GitHub](https://github.com) | Alojar el código para que Vercel lo pueda desplegar | Gratis |
| [Vercel](https://vercel.com) | Hosting del sitio, un clic para desplegar | Gratis |

---

## Paso 1 — Crear la base de datos en Supabase

1. Ve a [supabase.com](https://supabase.com) → **Start your project** → crea una cuenta (puedes usar tu GitHub).
2. **New Project** → ponle un nombre (ej. `raices`), genera una contraseña de base de datos y **guárdala** — la necesitas ahora.
3. Elige la región más cercana a Colombia (ej. `us-east-1` o `sa-east-1` si está disponible).
4. Espera ~2 minutos a que se aprovisione el proyecto.
5. Ve a **Project Settings → Database → Connection string**:
   - Copia la cadena **"Transaction pooler"** (puerto `6543`, incluye `?pgbouncer=true`) → esta es tu `DATABASE_URL`.
   - Copia la cadena **"Session pooler" o "Direct connection"** (puerto `5432`) → esta es tu `DIRECT_URL`.
   - En ambas, reemplaza `[YOUR-PASSWORD]` por la contraseña que generaste en el paso 2.

Guarda esas dos cadenas — las vas a pegar en Vercel en el Paso 3.

## Paso 2 — Subir el código a GitHub

1. Crea una cuenta en [github.com](https://github.com) si no tienes.
2. Crea un repositorio nuevo, **vacío** (sin README ni .gitignore), llamado por ejemplo `raices`.
3. En tu terminal, dentro de `~/Documents/raices`:

```bash
git remote add origin https://github.com/TU-USUARIO/raices.git
git branch -M main
git push -u origin main
```

(Si usas autenticación por token, GitHub te va a pedir usuario y un *personal access token* en vez de contraseña —
lo generas en GitHub → Settings → Developer settings → Personal access tokens.)

## Paso 3 — Desplegar en Vercel

1. Crea una cuenta en [vercel.com](https://vercel.com) — lo más simple es **"Continue with GitHub"**, así quedan conectados automáticamente.
2. **Add New → Project** → selecciona el repositorio `raices` que acabas de subir.
3. En **"Configure Project"**:
   - **Root Directory**: cámbialo a `web` (el proyecto de Next.js vive en esa subcarpeta, no en la raíz del repo).
   - **Environment Variables**, agrega:
     | Nombre | Valor |
     |---|---|
     | `DATABASE_URL` | la cadena "Transaction pooler" del Paso 1 |
     | `DIRECT_URL` | la cadena "Direct connection" del Paso 1 |
     | `AUTH_SECRET` | genera uno con `openssl rand -base64 32` en tu terminal y pégalo aquí |
4. **Deploy**. Toma 1-2 minutos. El build ya incluye `prisma generate` y `prisma db push`, así que las tablas se crean solas en tu base de datos nueva — no tienes que correr nada manualmente.
5. Cuando termine, Vercel te da una URL pública (`https://raices-tu-usuario.vercel.app`).

## Paso 4 — Cargar los datos de ejemplo (municipios, aliados, propiedades)

Desde tu computador, apuntando a la base de datos real de Supabase:

```bash
cd ~/Documents/raices/web
DATABASE_URL="la-misma-cadena-pooler-del-paso-1" npx tsx prisma/seed.ts
```

Esto crea los 10 municipios, 7 aliados y 12 propiedades de ejemplo en tu base de datos de producción. Solo hace falta correrlo una vez (lo puedes volver a correr cuando quieras resetear los datos de ejemplo).

---

## Después del primer deploy

- **Cada vez que hagas `git push` a `main`**, Vercel despliega automáticamente la nueva versión — no hay que repetir estos pasos.
- **Dominio propio** (ej. `raices.com`): Vercel → tu proyecto → Settings → Domains. Necesitas comprar el dominio en cualquier registrador (Namecheap, GoDaddy, etc.) y apuntar los DNS según las instrucciones de Vercel.
- **Variables opcionales** (Mapbox, Resend, HubSpot): se agregan igual, en Vercel → Settings → Environment Variables, cuando decidas activar esas integraciones — la app funciona sin ellas.

## Desarrollo local después de este cambio

El proyecto ahora usa Postgres (no SQLite) para que el esquema sea idéntico en desarrollo y producción. Para
seguir desarrollando en tu máquina, la forma más simple es reusar la misma base de datos de Supabase: copia
`web/.env.example` a `web/.env` y pega ahí las mismas `DATABASE_URL` / `DIRECT_URL` del Paso 1.
