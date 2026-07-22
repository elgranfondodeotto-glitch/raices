# Raíces Santander — Etapa 1: Arquitectura de la Información

**Eslogan:** Construye tu patrimonio en Santander desde cualquier lugar del mundo.
**Alcance de esta etapa:** mapa del sitio, jerarquía de navegación y flujos de usuario del MVP. No incluye wireframes, UI ni código (etapas 2, 3 y 4).

---

## 0. Decisiones de equipo que enmarcan la arquitectura

- **CEO** — el MVP compite por *confianza*, no por catálogo. Con pocos proyectos verificados al inicio, la arquitectura debe hacer que "Plan de Inversión" y "Aliados verificados" luzcan tan importantes como el marketplace, para no parecer un portal vacío.
- **PM** — cortamos alcance a Santander y 10 municipios fijos. Todo lo que implique escalar a otros departamentos (selector de país/región genérico, taxonomía multi-departamento) se diseña extensible pero no se construye ahora.
- **Arquitecto** — separamos tres dominios de datos desde la IA para que el modelo de datos no requiera reescritura al escalar: `Contenido editorial` (municipios, blog), `Inventario` (propiedades, proyectos, aliados) y `Usuario` (perfil, plan financiero, favoritos, documentos). Esto también define las URLs.
- **UX/UI** — la navegación principal se limita a 5 ítems visibles; todo lo demás vive en submenús o footer, siguiendo el patrón Airbnb/Zillow de "explorar primero, filtrar después".
- **SEO** — cada municipio y cada proyecto necesita una URL propia, indexable, con datos estructurados (`RealEstateListing`, `Place`). El blog y las páginas de municipio son el motor de tráfico orgánico mientras el marketplace todavía tiene poco inventario.
- **Growth** — el "Plan de Inversión" es el imán de leads principal (permite capturar email antes de mostrar el resultado). El registro se pide en el paso de guardar resultados, no antes de empezar el cuestionario, para bajar la fricción.
- **Experiencia de Usuario** — el usuario objetivo compra a distancia y en otro huso horario; la arquitectura prioriza contenido que reemplace la visita presencial (video, mapas, comparativas, testimonios, WhatsApp/agenda de llamada) sobre formularios fríos.

---

## 1. Mapa completo del sitio

```
raicessantander.com
│
├── / (Home)
│
├── /por-que-santander              [Landing: ¿Por qué invertir en Santander?]
│
├── /explora                        [Explora Santander — hub de municipios]
│   ├── /explora/bucaramanga
│   ├── /explora/floridablanca
│   ├── /explora/giron
│   ├── /explora/piedecuesta
│   ├── /explora/barichara
│   ├── /explora/san-gil
│   ├── /explora/mesa-de-los-santos
│   ├── /explora/curiti
│   ├── /explora/socorro
│   └── /explora/barrancabermeja
│       └── (cada uno con sub-secciones ancla: #descripcion #mapa #fotos #precios #valorizacion #calidad-de-vida)
│
├── /marketplace                    [Listado con filtros]
│   └── /marketplace/[slug-propiedad]   [Ficha de proyecto/propiedad]
│
├── /plan-de-inversion               [Cuestionario + resultado del plan financiero]
│   └── /plan-de-inversion/resultado/[id]  [Resultado guardado, compartible, ligado a cuenta]
│
├── /calculadora                     [Calculadora financiera standalone — versión ligera/rápida del plan]
│
├── /blog
│   ├── /blog/comprar-desde-el-exterior
│   ├── /blog/creditos
│   ├── /blog/constructoras
│   ├── /blog/impuestos
│   ├── /blog/guias
│   ├── /blog/inversion
│   ├── /blog/patrimonio
│   └── /blog/[slug-articulo]
│
├── /aliados                         [Directorio de aliados por categoría]
│   ├── /aliados/constructoras
│   ├── /aliados/inmobiliarias
│   ├── /aliados/abogados
│   ├── /aliados/bancos
│   ├── /aliados/arquitectos
│   ├── /aliados/topografos
│   └── /aliados/[slug-aliado]        [Perfil individual del aliado]
│
├── /sobre-nosotros
├── /contacto
│
├── /registro
├── /login
├── /recuperar-password
│
└── /cuenta                          [Dashboard — requiere sesión]
    ├── /cuenta                       [Resumen: meta patrimonial + estado del plan]
    ├── /cuenta/favoritos
    ├── /cuenta/simulaciones           [Historial de simulaciones del plan de inversión]
    ├── /cuenta/documentos
    ├── /cuenta/recordatorios
    └── /cuenta/perfil                 [Datos personales, país de residencia, preferencias]
```

**Páginas legales/soporte** (no pedidas explícitamente, pero necesarias para lanzar en LATAM/exterior y para SEO/confianza — se agregan al footer, no al alcance de diseño detallado del MVP): `/terminos`, `/privacidad`, `/preguntas-frecuentes`.

---

## 2. Jerarquía de navegación

### Header (navegación primaria — máx. 5 ítems + acciones)
```
[Logo Raíces Santander]   Explora   Marketplace   Plan de Inversión   Blog   Aliados        [Login] [Crear cuenta]
```
- "Plan de Inversión" lleva estilo de botón/highlight (es el CTA de producto, no un link más).
- Tras login, `[Login][Crear cuenta]` se reemplaza por avatar → menú: Mi cuenta, Favoritos, Simulaciones, Cerrar sesión.

### Footer (navegación secundaria — todo lo demás)
```
Producto              Explora Santander       Compañía            Legal
- Marketplace         - Bucaramanga            - Sobre nosotros    - Términos
- Plan de Inversión   - Floridablanca          - Contacto          - Privacidad
- Calculadora         - Girón                  - Aliados           - Preguntas frecuentes
- Blog                - Piedecuesta
                       - Barichara
                       - San Gil
                       - (+5 más)
```

### Home → jerarquía de secciones (orden = prioridad de negocio)
1. Hero (CTA doble: "Crea tu plan de inversión" / "Explora oportunidades")
2. ¿Por qué invertir en Santander? (prueba social + datos macro, resumen — enlaza a `/por-que-santander`)
3. Explora Santander (carrusel de municipios destacados)
4. Cómo funciona (3-4 pasos: Explora → Simula tu plan → Conecta con un aliado → Compra con acompañamiento)
5. Marketplace destacado (proyectos verificados)
6. Testimonios / casos de colombianos en el exterior
7. Blog destacado (3 artículos)
8. Aliados destacados (logos constructoras/bancos — señal de confianza)
9. CTA final + footer

---

## 3. Flujos de usuario clave

### Flujo A — Visitante frío → Lead calificado (flujo principal de conversión)
```
Home
 └─▶ CTA "Crea tu plan de inversión"
      └─▶ /plan-de-inversion (cuestionario: país, edad, ingresos, ahorros,
          capital disponible, meta, tiempo, tipo de propiedad)
           └─▶ Resultado generado (plan financiero, cuota inicial, tiempo estimado)
                ├─▶ [Ver resultado sin registrarse] (vista limitada / borrosa parcial)
                └─▶ [Guardar mi plan] → /registro (email, país de residencia)
                     └─▶ /cuenta (dashboard con el plan ya cargado)
                          └─▶ Recomendaciones de propiedades acordes al plan
                               └─▶ /marketplace/[propiedad] → "Contactar aliado" → lead a constructora
```
*Growth: el resultado se muestra parcialmente sin cuenta (número de cuota inicial visible, desglose completo bloqueado) — reduce fricción inicial y da razón concreta para registrarse.*

### Flujo B — Visitante con intención de exploración (top of funnel, SEO)
```
Google ("invertir en Bucaramanga desde Estados Unidos")
 └─▶ /explora/bucaramanga (landing SEO)
      └─▶ Precio m², valorización, tipo de inversión recomendada
           ├─▶ "Simula tu plan para esta zona" → /plan-de-inversion (pre-cargado con el municipio)
           └─▶ "Ver proyectos en Bucaramanga" → /marketplace?ciudad=bucaramanga
```

### Flujo C — Comprador listo (marketplace directo)
```
/marketplace (filtros: ciudad, precio, tipo, rentabilidad, área, estado del proyecto)
 └─▶ /marketplace/[propiedad] (ficha: fotos, mapa, rentabilidad estimada, constructora responsable)
      ├─▶ [Agregar a favoritos] (si no hay sesión → prompt de login/registro, luego vuelve a la ficha)
      └─▶ [Hablar con el aliado] → formulario de contacto → lead enviado a constructora + WhatsApp/agenda de llamada
```

### Flujo D — Aliado / Constructora (lado B2B del marketplace)
```
/aliados/constructoras (directorio)
 └─▶ /aliados/[slug-aliado] (perfil: proyectos activos, credenciales, contacto)
      └─▶ Visitante interesado → formulario → lead calificado al aliado
```
*(El panel de gestión para que el aliado administre su propio perfil/proyectos es una feature de back-office — se define en Etapa 4/Fase 2, no es una página pública del IA de usuario final.)*

### Flujo E — Usuario recurrente (dashboard)
```
/login → /cuenta
 ├─ Meta patrimonial (resumen visual del progreso hacia la meta del plan)
 ├─ Favoritos → vuelve a /marketplace/[propiedad]
 ├─ Simulaciones → historial, comparar versiones del plan, actualizar con nuevos datos
 ├─ Documentos → subir/ver documentos relacionados a su proceso de compra
 └─ Recordatorios → notificaciones (ej. "actualiza tus ingresos", "nuevo proyecto en tu municipio de interés")
```

---

## 4. Notas de alcance MVP vs. Fase 2

**Dentro del MVP** (todo lo listado arriba en el mapa del sitio).

**Fuera del MVP** (para que quede explícito y evitemos scope creep en Etapa 4):
- Panel de administración para que aliados editen su propio perfil (por ahora, los perfiles de aliados los carga el equipo de Raíces Santander manualmente).
- Pagos o reservas en línea dentro de la plataforma (el flujo termina en lead calificado, no en transacción).
- Multi-idioma (inglés) — probable Fase 2 dado que parte de la audiencia vive en EE.UU./Canadá/Australia, pero no bloquea la validación inicial en español.
- Expansión a otros departamentos de Colombia.
- Comparador de propiedades lado a lado, alertas de precio automatizadas — features de retención para Fase 2.

---

## 5. Qué sigue (Etapa 2)

Wireframes página por página para las 13 pantallas núcleo del MVP (Home, Por qué Santander, Explora — hub y detalle de municipio, Marketplace — listado y ficha, Plan de Inversión — cuestionario y resultado, Calculadora, Blog — hub y artículo, Aliados — directorio y perfil, Registro/Login, Dashboard), con explicación sección por sección.

**Quedo a la espera de tu aprobación de esta Etapa 1 (o los ajustes que quieras) antes de pasar a wireframes.**
