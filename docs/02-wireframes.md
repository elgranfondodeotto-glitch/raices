# Raíces — Etapa 2: Wireframes

Wireframes de baja fidelidad (estructura y contenido, no estilo visual — eso es la Etapa 3) para las 13 pantallas núcleo del MVP. Notación: `[ ]` = componente, `→` = acción/enlace, `※` = nota de UX/negocio.

---

## 1. Home (`/`)

```
┌────────────────────────────────────────────────────────────┐
│ HEADER: Logo | Explora Marketplace PlanInversión Blog Aliados│  Login  [Crear cuenta]
├────────────────────────────────────────────────────────────┤
│                                                              │
│   HERO (video de fondo — dron sobre Santander, loop, muted) │
│   "Construye tu patrimonio en Santander                     │
│    desde cualquier lugar del mundo"                         │
│   [Crea tu plan de inversión]   [Explora oportunidades]     │
│                                                              │
├────────────────────────────────────────────────────────────┤
│  ¿POR QUÉ SANTANDER?  (3-4 datos clave en cards horizontales)│
│  [Valorización %] [Costo de vida] [Conectividad] [Clima]    │
│  → "Conoce más" (/por-que-santander)                        │
├────────────────────────────────────────────────────────────┤
│  EXPLORA SANTANDER (carrusel horizontal, scroll-snap)       │
│  [Bucaramanga][Floridablanca][Girón][Barichara][San Gil]... │
│  cada card: foto, nombre, precio m² promedio, badge tipo    │
├────────────────────────────────────────────────────────────┤
│  CÓMO FUNCIONA (4 pasos, iconografía simple, horizontal)    │
│  1.Explora → 2.Simula tu plan → 3.Conecta con un aliado     │
│  → 4.Compra acompañado                                      │
├────────────────────────────────────────────────────────────┤
│  MARKETPLACE DESTACADO (3-4 proyectos verificados)          │
│  [Card propiedad] [Card propiedad] [Card propiedad]         │
│  → "Ver todo el marketplace"                                │
├────────────────────────────────────────────────────────────┤
│  TESTIMONIOS (carrusel, foto + país de residencia + cita)   │
│  "Compré mi apto en Floridablanca viviendo en Miami" —María │
├────────────────────────────────────────────────────────────┤
│  BLOG DESTACADO (3 artículos)                                │
├────────────────────────────────────────────────────────────┤
│  ALIADOS DESTACADOS (logos en fila, grises, hover a color)  │
├────────────────────────────────────────────────────────────┤
│  CTA FINAL: "¿Listo para construir tu patrimonio?"           │
│  [Crea tu plan de inversión]                                 │
├────────────────────────────────────────────────────────────┤
│ FOOTER (4 columnas + legal + redes)                          │
└────────────────────────────────────────────────────────────┘
```
※ El hero usa video con imagen estática de respaldo (poster) para el primer render — crítico para LCP/Core Web Vitals (ver Etapa 4). En móvil el video se reemplaza directamente por la imagen (ahorro de datos).

---

## 2. Por qué invertir en Santander (`/por-que-santander`)

```
HEADER
[Hero de texto corto + imagen panorámica]
"El departamento con mejor relación patrimonio/costo de Colombia"

[Bloque de datos — grid 2x3 con fuente citada al pie de cada dato]
 - Valorización promedio anual (%)
 - Costo de vida vs. Bogotá/Medellín
 - Conectividad (aeropuerto, vías 4G)
 - Clima y calidad de vida
 - Seguridad (fuente: cifras oficiales)
 - Comunidad de colombianos en el exterior ya invirtiendo aquí

[Comparativa Santander vs. otros destinos de inversión típicos]
 (tabla simple: Santander | Eje Cafetero | Costa Caribe — precio m², valorización, liquidez)

[Sección "Para quién es esto"] — perfiles de comprador (jubilación futura,
 renta por alquiler, finca familiar, primera propiedad en Colombia)

[CTA] "Descubre tu municipio ideal" → /explora
FOOTER
```
※ Página con mayor densidad de texto y datos citables — es la más importante para SEO informacional y para credibilidad ante un comprador escéptico a distancia.

---

## 3. Explora Santander — Hub (`/explora`)

```
HEADER
[Hero corto: mapa interactivo del departamento con 10 pines de municipios]
[Filtro rápido: "¿Qué buscas?" → Inversión | Retiro | Finca | Rentabilidad]
[Grid de 10 municipios — cards grandes]
  cada card: foto, nombre, 1 línea descriptiva, precio m² promedio,
  badge de "nivel de valorización" (Alta/Media/Emergente)
[Sección "No sabes por dónde empezar"] → CTA a /plan-de-inversion
FOOTER
```

## 3.1 Explora Santander — Detalle de municipio (`/explora/[municipio]`)

```
HEADER
[Hero: foto/video del municipio + nombre + 1 línea de posicionamiento]
[Barra de datos rápidos, sticky al hacer scroll]
 Precio m² promedio | Valorización 5 años | Calidad de vida | Tipo recomendado

[Descripción] (300-500 palabras, SEO)
[Mapa interactivo] (zonas del municipio, puntos de interés)
[Galería de fotos]
[Bloque "Tipo de inversión recomendada"] (ej. Barichara → turismo/finca raíz patrimonial)
[Proyectos disponibles en este municipio] (mini-marketplace filtrado, 3-6 cards)
  → "Ver todos los proyectos en [municipio]"
[Simula tu plan para esta zona] → CTA a /plan-de-inversion?municipio=X
[Artículos de blog relacionados a este municipio]
FOOTER
```
※ Cada una de las 10 páginas de municipio es una landing SEO independiente — título, meta description y H1 únicos por municipio (definido con el especialista SEO en Etapa 4).

---

## 4. Marketplace — Listado (`/marketplace`)

```
HEADER
[Barra de filtros, sticky]
 Ciudad ▾ | Precio ▾ | Tipo ▾ | Rentabilidad ▾ | Área ▾ | Estado del proyecto ▾  [Limpiar filtros]
[Contador de resultados] "42 proyectos verificados"
[Toggle: Grid / Mapa]

GRID (por defecto):
[Card] [Card] [Card]
[Card] [Card] [Card]   (paginación o scroll infinito)
 cada card: foto principal, badge "Verificado", nombre, municipio,
 precio desde, tipo, rentabilidad estimada, ❤ favorito

VISTA MAPA (alterna):
[Mapa a la izquierda con pines] [Lista scrolleable a la derecha sincronizada]

FOOTER
```

## 4.1 Marketplace — Ficha de propiedad (`/marketplace/[slug]`)

```
HEADER
[Galería de fotos — carrusel grande, video si existe]
[Título del proyecto] [Municipio] [Badge Verificado] [❤ Favorito] [Compartir]

[Barra de datos clave]
 Precio desde | Área | Tipo | Estado del proyecto | Rentabilidad estimada | Entrega

[Descripción del proyecto]
[Mapa de ubicación exacta]
[Características / amenidades] (grid de iconos)
[Simulación rápida] "¿Cuánto necesitarías para este proyecto?" (mini-calculadora embebida)
[Constructora/aliado responsable] (mini-card con link a su perfil)
[CTA principal, sticky en mobile]: [Hablar con el aliado] [Agendar llamada]
[Proyectos similares] (3 cards)
FOOTER
```
※ El botón "Hablar con el aliado" abre un formulario corto (nombre, email, teléfono, mejor horario en su zona horaria) — el dato de zona horaria es clave dado el público en el exterior.

---

## 5. Plan de Inversión — Cuestionario (`/plan-de-inversion`)

```
HEADER (minimalista, sin distracción — solo logo + salir)
[Barra de progreso — 8 pasos, 1 pregunta por pantalla]

Paso 1: País de residencia actual         [selector con banderas]
Paso 2: Edad                              [selector numérico]
Paso 3: Ingresos mensuales aproximados    [rango + moneda]
Paso 4: Ahorros actuales                  [rango + moneda]
Paso 5: Capital disponible para invertir  [monto]
Paso 6: Meta (¿qué quieres lograr?)       [tarjetas: Vivienda futura /
                                            Renta / Finca / Patrimonio familiar]
Paso 7: Tiempo estimado para comprar      [selector: <1 año, 1-2, 3-5, 5+]
Paso 8: Tipo de propiedad de interés      [tarjetas: Apto/Casa/Lote/Finca/Local]

[Botón Atrás] ...................... [Siguiente / Ver mi plan]
```
※ Cada paso es una sola pregunta, con auto-avance donde sea posible (tarjetas clicables) — minimiza abandono en un formulario largo.

## 5.1 Plan de Inversión — Resultado (`/plan-de-inversion/resultado/[id]`)

```
HEADER
[Resumen visual arriba — "Tu plan de inversión en Santander"]
 [Gráfico circular o barra de progreso: Capacidad de compra estimada]

[SIN CUENTA — vista parcial]:
 - Cuota inicial estimada: visible
 - Tiempo estimado para alcanzar la meta: visible
 - Desglose completo, recomendaciones de municipios y proyectos: difuminado
 - [Crear cuenta gratis para ver tu plan completo] (CTA principal)

[CON CUENTA — vista completa]:
 - Desglose financiero completo (cuota inicial, capacidad de crédito estimada,
   ahorro mensual sugerido)
 - Recomendaciones: 3 municipios que calzan con el perfil
 - Recomendaciones: 3-6 proyectos del marketplace que calzan con el presupuesto
 - [Guardar este plan] [Descargar resumen PDF] [Hablar con un asesor]
 - [Ajustar mis respuestas] → vuelve al cuestionario precargado
FOOTER
```

---

## 6. Calculadora financiera (`/calculadora`)

```
HEADER
[Título: "Calculadora rápida"] "¿Cuánto necesitas para invertir en Santander?"
[Formulario de una sola pantalla — 4 campos]
 Precio de la propiedad | % de cuota inicial | Plazo | Tasa estimada
[Resultado en vivo, se actualiza mientras el usuario mueve los sliders]
 Cuota inicial | Cuota mensual estimada | Total a pagar

[Nota legal pequeña]: "Estimación referencial, no constituye una oferta de crédito"
[CTA]: "¿Quieres un plan completo y personalizado?" → /plan-de-inversion
FOOTER
```
※ Diferencia clave con "Plan de Inversión": esta es pública, sin registro, instantánea — sirve como puerta de entrada más ligera y como herramienta embebible en fichas de propiedad.

---

## 7. Blog — Hub (`/blog`)

```
HEADER
[Hero simple: "Guías para invertir en Santander desde el exterior"]
[Filtro de categorías, chips horizontales]
 Todos | Comprar desde el exterior | Créditos | Constructoras | Impuestos | Guías | Inversión | Patrimonio
[Artículo destacado] (card grande, el más reciente o más relevante)
[Grid de artículos] (imagen, categoría, título, resumen, tiempo de lectura)
[Paginación]
[Newsletter signup] "Recibe guías de inversión en tu correo"
FOOTER
```

## 7.1 Blog — Artículo (`/blog/[slug]`)

```
HEADER
[Categoría] [Título H1] [Autor, fecha, tiempo de lectura]
[Imagen destacada]
[Contenido del artículo — tipografía optimizada para lectura larga]
 (con H2/H3 para SEO, tabla de contenidos sticky en desktop)
[CTA embebido a mitad de artículo] (contextual: plan de inversión, calculadora,
 o municipio relacionado según la categoría)
[Bio corta del autor/equipo editorial]
[Artículos relacionados] (3 cards)
[Newsletter signup]
FOOTER
```

---

## 8. Aliados — Directorio (`/aliados`)

```
HEADER
[Título: "Aliados verificados de Raíces"]
[Tabs de categoría: Constructoras | Inmobiliarias | Abogados | Bancos | Arquitectos | Topógrafos]
[Grid de aliados] (logo, nombre, categoría, municipio(s) donde opera, badge "Verificado")
FOOTER
```

## 8.1 Aliados — Perfil individual (`/aliados/[slug]`)

```
HEADER
[Banner/logo del aliado] [Nombre] [Categoría] [Badge Verificado] [Municipios donde opera]
[Descripción / trayectoria]
[Credenciales] (años de experiencia, proyectos entregados, certificaciones)
[Proyectos activos de este aliado] (si es constructora — grid de cards del marketplace)
[Contacto] [Formulario: "Habla con [Aliado]"]
[Testimonios sobre este aliado] (si existen)
FOOTER
```

---

## 9. Registro / Login (`/registro`, `/login`)

```
[Layout de dos columnas en desktop, una en mobile]

Columna izquierda: formulario
 REGISTRO: Nombre | Email | Contraseña | País de residencia | [Crear cuenta]
           (u opción "Continuar con Google")
 LOGIN:    Email | Contraseña | [Ingresar]  ¿Olvidaste tu contraseña?

Columna derecha: imagen/foto premium de Santander + cita de valor
 "Únete a los colombianos que ya están construyendo
  su patrimonio en Santander desde el exterior"
```
※ Sin header de navegación completo — pantalla enfocada en conversión, sin fugas de atención (patrón estándar Airbnb/Stripe en checkout/auth).

---

## 10. Dashboard del usuario (`/cuenta`)

```
┌───────────┬──────────────────────────────────────────────┐
│ SIDEBAR   │  HEADER interno: "Hola, [Nombre]"             │
│           ├──────────────────────────────────────────────┤
│ Resumen   │  [Card: Meta patrimonial]                     │
│ Favoritos │   Barra de progreso visual hacia la meta      │
│ Simulac.  │   "Vas al 34% de tu meta de $250M en 4 años"  │
│ Documentos│                                                │
│ Recordat. │  [Card: Tu plan actual]                        │
│ Perfil    │   Resumen del último plan de inversión         │
│           │   [Ver detalle] [Actualizar mis datos]         │
│           │                                                │
│           │  [Sección: Propiedades favoritas] (3-4 cards)  │
│           │                                                │
│           │  [Sección: Recomendado para ti]                │
│           │   (proyectos que calzan con su plan)           │
│           │                                                │
│           │  [Sección: Recordatorios / próximos pasos]     │
│           │   "Agenda una llamada con un asesor"            │
│           │   "Actualiza tus ingresos para un plan más     │
│           │    preciso"                                     │
└───────────┴──────────────────────────────────────────────┘
```
※ En mobile el sidebar se colapsa a una barra de navegación inferior (bottom tab bar) con 4 íconos: Resumen, Favoritos, Plan, Perfil — patrón estándar de apps financieras/inmobiliarias en mobile.

---

## Notas de accesibilidad y responsive (aplican a las 13 pantallas)

- Mobile-first: todo wireframe de arriba colapsa a una sola columna en mobile; los CTAs principales quedan siempre visibles (sticky bottom bar en fichas de propiedad, plan de inversión y checkout de contacto).
- Contraste mínimo AA en todos los textos sobre imágenes (overlay oscuro semitransparente en heroes).
- Todos los formularios largos (plan de inversión, registro) muestran progreso y permiten guardar/retomar.

---

## Siguiente paso

Con la estructura de estas 13 pantallas definida, sigo directo a la **Etapa 3: Sistema de diseño UI** (paleta de colores, tipografía, botones, cards, formularios y especificación visual del dashboard), que es lo que le da vida visual a estos wireframes.
