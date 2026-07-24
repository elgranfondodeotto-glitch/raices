# Raíces

Ecosistema digital para que colombianos en el exterior inviertan en finca raíz en Santander, Colombia — desde la
decisión de invertir hasta la compra de su propiedad.

## Estado actual

✅ **MVP funcional**: las 13 pantallas núcleo (Home, Por qué Santander, Explora — 10 municipios, Marketplace con
filtros, Plan de Inversión con motor de cálculo real, Calculadora, Blog, Aliados, Registro/Login, Dashboard
completo) corren sobre datos reales en base de datos, no maquetas estáticas. Build de producción sin errores.

⏳ **Pendiente de tu acción** (ver [`DEPLOY.md`](DEPLOY.md)): crear las 3 cuentas gratuitas (Supabase, GitHub,
Vercel) para tener una URL pública — un asistente de IA no puede crear cuentas por ti.

## Documentación del proyecto

1. [Arquitectura de la información](docs/01-arquitectura-informacion.md) — mapa del sitio, navegación, flujos de usuario.
2. [Wireframes](docs/02-wireframes.md) — las 13 pantallas del MVP, sección por sección.
3. [Sistema de diseño UI](docs/03-diseno-ui.md) — paleta, tipografía, componentes.
4. [Stack tecnológico](docs/04-stack-tecnologico.md) — arquitectura técnica y justificación de cada elección.
5. [DEPLOY.md](DEPLOY.md) — cómo publicar el sitio gratis, paso a paso.

## Arquitectura del repositorio

```
docs/     documentación de producto y diseño (Etapas 1-4)
web/      aplicación Next.js 16 + TypeScript + Tailwind CSS v4 + Prisma + Postgres
```

## Correr en local

```bash
cd web
npm install
cp .env.example .env   # completa DATABASE_URL / DIRECT_URL (ver DEPLOY.md paso 1) y AUTH_SECRET
npx prisma db push
npm run db:seed        # carga 10 municipios, 7 aliados y 12 propiedades de ejemplo
npm run dev
```

Abre `http://localhost:3000`.

## Qué es real hoy

- **Autenticación**: cuentas reales con contraseñas hasheadas (bcrypt), sesiones vía Auth.js (NextAuth v5).
- **Plan de Inversión**: motor de cálculo real (cuota inicial, capacidad de compra, ahorro mensual sugerido según
  ingresos, ahorros, capital disponible, meta y tipo de propiedad) — no son números de ejemplo fijos.
- **Marketplace**: filtros por ciudad y tipo funcionando contra la base de datos, favoritos persistentes por usuario.
- **Dashboard**: resumen de meta patrimonial, favoritos, historial de simulaciones, documentos y recordatorios,
  todo ligado a la cuenta real del usuario.
- **Leads**: los formularios de contacto (ficha de propiedad, perfil de aliado, página de contacto) guardan el
  lead en base de datos, listo para conectar a un CRM (ver stack tecnológico).

## Qué está listo en código pero requiere que actives cuentas externas

- **Mapbox** (mapas en páginas de municipio): agrega `NEXT_PUBLIC_MAPBOX_TOKEN` cuando tengas una cuenta gratuita en mapbox.com.
- **Resend** (emails transaccionales): agrega `RESEND_API_KEY`.
- **HubSpot** (CRM de leads): agrega `HUBSPOT_API_KEY`.
- **Blog vía CMS** (Sanity, para que alguien de marketing publique sin tocar código): hoy los artículos viven en
  [`web/src/lib/blog.ts`](web/src/lib/blog.ts) como datos de ejemplo — migrar a Sanity es un paso de la Fase 2.
