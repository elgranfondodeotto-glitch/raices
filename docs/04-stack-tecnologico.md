# Raíces — Etapa 4: Stack Tecnológico

Última etapa de definición antes de generar código. Criterio de selección: velocidad de lanzamiento del MVP, costo bajo mientras se valida el mercado, y que cada pieza escale sin reescritura cuando el proyecto crezca a todo el país.

---

## 1. Resumen del stack

| Capa | Elección | Alternativa descartada y por qué |
|---|---|---|
| Frontend | **Next.js 14 (App Router) + React + TypeScript** | Remix (menos ecosistema de plugins SEO/ISR) |
| Estilos / UI | **Tailwind CSS + shadcn/ui** (componentes Radix sin estilizar, no una librería de UI cerrada) | Chakra/MUI — imponen una estética propia, difícil de lograr el look Apple/Notion pedido |
| Backend | **Route Handlers + Server Actions de Next.js** (sin servidor separado) | Node/Express aparte — complejidad innecesaria para el MVP, Next.js ya cubre esto |
| Base de datos | **PostgreSQL (gestionado por Supabase)** | MongoDB — el dominio es fuertemente relacional (usuarios↔planes↔propiedades↔aliados), Postgres es la elección correcta |
| ORM | **Prisma** | Drizzle — Prisma tiene mejor DX para el equipo y Prisma Studio sirve como panel admin provisional en el MVP |
| Autenticación | **Supabase Auth** (email/password + Google OAuth) | Auth.js — Supabase Auth ya viene integrado con la misma base de datos, un proveedor menos que mantener |
| CMS (blog y contenido de municipios) | **Sanity.io** (headless, free tier generoso) | MDX en el repo — el equipo de marketing/SEO necesita publicar sin depender de un deploy; Sanity da edición visual + pipeline de imágenes optimizado |
| Hosting | **Vercel** | Render/Railway — Vercel es el hosting nativo de Next.js (ISR, Edge, optimización de imágenes automática) |
| Mapas | **Mapbox** | Google Maps — mejor precio a escala y permite un estilo de mapa personalizado a la marca (verde montaña) |
| Analytics de producto | **PostHog** (funnels, session replay) + **Google Analytics 4** + **Google Search Console** | Mixpanel — PostHog es open-source, autohosteable a futuro, y combina analytics de producto con session replay (clave para optimizar el funnel del Plan de Inversión) en una sola herramienta |
| Email transaccional y newsletter | **Resend** (+ React Email para las plantillas) | Mailchimp/SendGrid — Resend se integra nativamente con React/Next.js, mismas plantillas para transaccional y newsletter, evita un proveedor adicional |
| CRM (leads a constructoras) | **HubSpot (plan gratuito)** | Pipedrive — el free tier de HubSpot ya cubre captura de leads, pipelines por aliado y automatizaciones básicas, sin costo mientras se valida el modelo |
| Storage de imágenes (propiedades) | **Supabase Storage** | Cloudinary — evita un proveedor más; Next/Image se encarga de la optimización en el frontend |
| Testing | **Vitest** (unitario) + **Playwright** (e2e en flujos críticos: registro, plan de inversión, contacto a aliado) | — |
| CI/CD | **GitHub + despliegue automático en Vercel** (preview deploy por PR) | — |

---

## 2. Cómo cada elección responde a una decisión de negocio ya tomada

- **SEO** (Etapa 1) exige URLs indexables por municipio/proyecto con contenido que cambia poco → Next.js con **ISR (Incremental Static Regeneration)**: las páginas de municipio y ficha de propiedad se generan estáticas y se revalidan cada cierto tiempo (ej. cada 1h), dando velocidad de página estática con datos que no quedan obsoletos. Datos estructurados (`Place`, `RealEstateListing`, `Article`) se inyectan en cada página vía JSON-LD.
- **Growth** (Etapa 1) necesita medir dónde se abandona el cuestionario del Plan de Inversión → PostHog trackea cada paso del funnel de 8 pasos y permite ver grabaciones de sesión reales para detectar fricción.
- **CEO** (Etapa 1) pidió validar mercado con bajo riesgo → todo el stack tiene **tier gratuito o casi gratuito** hasta que haya tráfico/usuarios reales: Vercel Hobby→Pro cuando se necesite, Supabase free tier (500MB DB, suficiente para el MVP), Sanity free tier, HubSpot free CRM, Resend free hasta 3,000 emails/mes. Costo estimado de operar el MVP: **~$0-25/mes** hasta validar tracción.
- **Arquitecto** (Etapa 1) separó los dominios Contenido editorial / Inventario / Usuario → se refleja en el stack: **Sanity** para contenido editorial (blog, textos largos de municipios), **Postgres/Prisma** para inventario y usuarios (datos transaccionales y relacionales: favoritos, planes, leads).
- **UX** (Etapa 1) — el usuario compra a distancia → **Mapbox** con estilo personalizado y video/foto en Next/Image optimizado son el reemplazo digital de la visita presencial.

---

## 3. Modelo de datos (alto nivel, para Prisma)

```
User            → id, email, nombre, país_residencia, creado_en
InvestmentPlan  → id, userId, país, edad, ingresos, ahorros, capital,
                   meta, tiempo, tipoPropiedad, resultado(jsonb), creado_en
Property        → id, slug, título, municipioId, allyId, precio, área, tipo,
                   rentabilidadEstimada, estado, fotos[], destacado(bool)
Municipality     → id, slug, nombre, descripción(ref. Sanity), precioM2Promedio,
                   valorización, calidadDeVida, nivelValorización
Ally             → id, slug, nombre, categoría, municipios[], verificado(bool),
                   descripción, contacto
Favorite         → userId, propertyId, creado_en
Lead             → id, userId?(nullable), allyId, propertyId?, nombre, email,
                   teléfono, mensaje, origen(enum: ficha/plan/aliado), estado
Reminder         → id, userId, tipo, mensaje, leído(bool), creado_en
```
`BlogPost` vive en Sanity (no en Postgres) porque es contenido editorial puro, sin relaciones transaccionales fuertes con el resto del modelo — solo se referencia por slug desde el frontend cuando un artículo se vincula a un municipio.

---

## 4. Seguridad y datos personales

- Contraseñas gestionadas 100% por Supabase Auth (nunca se manejan en texto plano en la app).
- Row Level Security (RLS) de Postgres activado desde el día uno: un usuario solo puede leer/escribir sus propios `InvestmentPlan`, `Favorite`, `Reminder`.
- Datos de leads (nombre, email, teléfono) tratados conforme a Ley 1581 de 2012 (protección de datos, Colombia) y consentimiento explícito en cada formulario — se documenta la política de privacidad de la Etapa 1 (`/privacidad`) con este alcance.

---

## Siguiente paso

Con arquitectura de información, wireframes, sistema de diseño y stack técnico aprobados, la **Etapa 5** genera el proyecto real: scaffold de Next.js + TypeScript + Tailwind + Prisma, esquema de base de datos, páginas del MVP con datos de ejemplo, responsive, modo oscuro, y bases de SEO/Core Web Vitals ya aplicadas.

**Esta es la etapa que más código produce — antes de generarla, confírmame que el stack propuesto (o los ajustes que quieras) queda aprobado.** En particular vale la pena tu opinión en dos puntos donde hay alternativas razonables:

1. **CMS del blog:** Sanity (recomendado) vs. mantener los artículos como archivos Markdown en el propio repo (más simple, pero requiere un deploy para publicar — no apto si alguien de marketing sin acceso al código va a escribir posts).
2. **CRM:** HubSpot free (recomendado) vs. no integrar CRM todavía y solo guardar los leads en la base de datos propia con notificación por email (más simple para el MVP, pero menos manejable cuando haya varias constructoras aliadas).
