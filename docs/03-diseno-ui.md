# Raíces — Etapa 3: Sistema de Diseño UI

Sistema de diseño completo, listo para traducirse a tokens de Tailwind en la Etapa 5. Referencias: Airbnb (calidez + fotografía), Apple (espacio en blanco, jerarquía tipográfica), Notion (componentes limpios), Stripe (precisión en formularios/dashboard), Zillow/Compass (patrones de real estate).

---

## 1. Paleta de colores

### Colores de marca

| Token | Nombre | Hex | Uso |
|---|---|---|---|
| `brand-forest` | Verde Montaña (primario) | `#1B4332` | Logo, header, CTA primario, links activos, iconografía de marca |
| `brand-forest-light` | Verde Montaña claro | `#40916C` | Hover de CTA, acentos, badges "Verificado", gráficos de progreso |
| `brand-navy` | Azul Profundo | `#0B2545` | Dashboard, datos financieros, gráficos, sidebar de cuenta — transmite seriedad/confianza en contexto de dinero |
| `brand-sand` | Arena | `#F4EEE4` | Fondos alternos de sección (reemplaza el blanco puro para dar calidez), fondos de card |

### Neutros

| Token | Hex | Uso |
|---|---|---|
| `neutral-white` | `#FFFFFF` | Fondo base, cards sobre arena |
| `neutral-100` | `#F5F5F3` | Fondo de página (modo claro) |
| `neutral-200` | `#E7E5E0` | Bordes, separadores |
| `neutral-400` | `#A8A29A` | Texto deshabilitado, placeholders |
| `neutral-600` | `#5C5850` | Texto secundario |
| `neutral-900` | `#1C1B18` | Texto principal |

### Semánticos

| Token | Hex | Uso |
|---|---|---|
| `success` | `#2D6A4F` | Confirmaciones, "Verificado" |
| `warning` | `#B08900` | Alertas suaves (ej. "faltan datos para tu plan") |
| `error` | `#B3261E` | Errores de formulario |
| `info` | `#1E5F8C` | Tooltips, notas informativas |

### Modo oscuro

No es una inversión automática — se recalibran los tokens para mantener la calidez de marca:

| Token | Claro | Oscuro |
|---|---|---|
| Fondo base | `neutral-100` `#F5F5F3` | `#12130F` |
| Fondo de card | `neutral-white` `#FFFFFF` | `#1B1C17` |
| Fondo alterno (arena) | `#F4EEE4` | `#1F2117` |
| Texto principal | `#1C1B18` | `#F0EEE7` |
| Texto secundario | `#5C5850` | `#A8A29A` |
| Borde | `#E7E5E0` | `#302F28` |
| Verde Montaña (marca) | `#1B4332` | `#52B788` (más brillante para contraste sobre fondo oscuro) |
| Azul Profundo | `#0B2545` | `#3E6FA8` |

Regla: en modo oscuro el verde de marca sube de luminosidad (`#52B788`) porque `#1B4332` pierde contraste sobre fondos oscuros — se usa como color de acento/CTA, no de fondo.

---

## 2. Tipografía

**Pareja tipográfica:**
- **Display / títulos:** `Fraunces` (serif moderna, variable font) — le da al sitio la sensación de "patrimonio" y lujo sencillo sin caer en lo clásico/anticuado. Se usa en H1/H2 de hero y landings.
- **UI / cuerpo / datos:** `Inter` (sans-serif, variable font) — máxima legibilidad en formularios, dashboard, cifras financieras y texto largo de blog. Es la misma familia que usan Stripe y Notion, por eso transmite el mismo nivel de precisión.

Ambas son de Google Fonts / open source — sin costos de licencia.

### Escala tipográfica

| Token | Tamaño (desktop) | Tamaño (mobile) | Familia | Peso | Uso |
|---|---|---|---|---|---|
| `display-xl` | 64px / 1.05 | 40px / 1.1 | Fraunces | 500 | Hero de Home |
| `display-lg` | 48px / 1.1 | 32px / 1.15 | Fraunces | 500 | H1 de landing (municipios, por qué Santander) |
| `heading-lg` | 32px / 1.2 | 26px / 1.2 | Fraunces | 500 | H2 de sección |
| `heading-md` | 24px / 1.3 | 20px / 1.3 | Inter | 600 | H3, títulos de card grande |
| `heading-sm` | 18px / 1.4 | 17px / 1.4 | Inter | 600 | Títulos de card, labels de formulario |
| `body-lg` | 18px / 1.6 | 16px / 1.6 | Inter | 400 | Cuerpo de artículos de blog |
| `body-md` | 16px / 1.5 | 15px / 1.5 | Inter | 400 | Cuerpo general, UI |
| `body-sm` | 14px / 1.5 | 13px / 1.5 | Inter | 400 | Metadatos, captions, notas legales |
| `data-lg` | 28px / 1.2 | 24px / 1.2 | Inter | 700 | Cifras destacadas (dashboard, resultado del plan) |

Regla editorial: Fraunces solo en titulares cortos (nunca en párrafos ni en UI interactiva); Inter en todo lo demás, incluidos los números financieros (tabular-nums activado para que las cifras alineen en tablas y dashboard).

---

## 3. Espaciado, radios y sombras

| Token | Valor | Uso |
|---|---|---|
| `radius-sm` | 8px | Inputs, botones pequeños, badges |
| `radius-md` | 12px | Cards estándar |
| `radius-lg` | 20px | Cards grandes (hero cards, modales) |
| `radius-full` | 999px | Pills/badges, avatar |
| `shadow-sm` | `0 1px 2px rgba(28,27,24,0.06)` | Cards en reposo |
| `shadow-md` | `0 4px 16px rgba(28,27,24,0.10)` | Cards en hover, dropdowns |
| `shadow-lg` | `0 12px 32px rgba(28,27,24,0.14)` | Modales, popovers |

Escala de espaciado: base 4px (Tailwind por defecto: 4, 8, 12, 16, 24, 32, 48, 64, 96px) — sin tokens custom, se usa la escala estándar de Tailwind para no reinventar.

---

## 4. Botones

| Variante | Fondo | Texto | Borde | Uso |
|---|---|---|---|---|
| **Primario** | `brand-forest` (`brand-forest-light` en dark) | blanco | ninguno | Acción principal por pantalla (1 por vista): "Crea tu plan de inversión", "Guardar mi plan" |
| **Secundario** | transparente | `brand-forest` | 1.5px `brand-forest` | Acción secundaria: "Explora oportunidades" |
| **Ghost / texto** | transparente | `neutral-900` | ninguno, subrayado en hover | Navegación, "Ver todo" |
| **Destructivo** | transparente | `error` | 1.5px `error` | Eliminar favorito, cancelar cuenta |

Estados: `hover` (oscurece 8%), `active` (oscurece 14% + scale 0.98), `disabled` (opacidad 40%, cursor not-allowed), `focus-visible` (ring de 2px en `brand-forest-light`, requerido para accesibilidad de teclado).

Tamaños: `sm` (36px alto), `md` (44px alto, default), `lg` (52px alto, usado en hero/CTAs principales). Radio: `radius-sm`. Padding horizontal ≥ 20px.

---

## 5. Cards

### Card de propiedad (marketplace)
```
┌─────────────────────────┐
│ [Foto 4:3]  ❤ (top-right)│
│ [Badge "Verificado"]     │
├─────────────────────────┤
│ Nombre del proyecto      │  heading-sm
│ Municipio · Tipo         │  body-sm, neutral-600
│ Desde $XXX.XXX.XXX       │  data con peso 700
│ ● Rentabilidad est. X%   │  body-sm, brand-forest-light
└─────────────────────────┘
```
Fondo `neutral-white`, `radius-md`, `shadow-sm` en reposo → `shadow-md` + `translateY(-2px)` en hover (transición 150ms).

### Card de municipio (explora)
Igual estructura base pero foto 16:9 más grande y badge de "nivel de valorización" (Alta = `success`, Media = `warning`, Emergente = `info`) en vez de "Verificado".

### Card de blog
Foto 16:9, chip de categoría (`brand-sand` fondo, `brand-forest` texto), título `heading-sm`, resumen `body-sm` truncado a 2 líneas, metadato de tiempo de lectura.

### Card de aliado
Layout horizontal (logo a la izquierda 64x64px circular, info a la derecha): nombre, categoría, badge verificado, municipios donde opera como chips pequeños.

---

## 6. Formularios

- **Input de texto:** altura 44px, `radius-sm`, borde `neutral-200` en reposo, `brand-forest` en focus (ring 2px `brand-forest-light` al 30% opacidad), fondo `neutral-white`.
- **Label:** `heading-sm` reducido a 14px, `neutral-900`, siempre visible arriba del input (no placeholder-as-label, por accesibilidad).
- **Error:** borde `error`, mensaje `body-sm` en `error` debajo del input, ícono de alerta a la derecha del input.
- **Select / dropdown:** mismo tratamiento visual que input de texto, chevron a la derecha.
- **Slider (calculadora, rangos de ingreso):** track `neutral-200`, progreso `brand-forest`, thumb blanco con sombra `shadow-sm` y borde `brand-forest`.
- **Tarjetas seleccionables** (usadas en el cuestionario de Plan de Inversión — ej. "Meta": Vivienda/Renta/Finca/Patrimonio): borde `neutral-200` en reposo, borde `brand-forest` de 2px + fondo `brand-sand` cuando está seleccionada, ícono de check en la esquina.
- **Barra de progreso de formulario largo:** línea delgada (4px) en `neutral-200`, relleno `brand-forest-light`, con el paso actual indicado numéricamente ("Paso 3 de 8").

---

## 7. Dashboard (`/cuenta`)

- **Sidebar:** fondo `brand-navy` (modo claro y oscuro — es el único componente que no cambia entre temas, refuerza la identidad de "zona financiera/seria"), texto `neutral-white` a 70% opacidad, ítem activo en blanco 100% + barra izquierda de 3px en `brand-forest-light`.
- **Stat cards** (meta patrimonial, progreso del plan): fondo `neutral-white`/card oscura, cifra grande en `data-lg`, con un anillo de progreso circular (SVG) en `brand-forest-light` sobre fondo `neutral-200`.
- **Gráficos** (progreso hacia la meta, historial de simulaciones): paleta restringida a `brand-forest-light`, `brand-navy` y `neutral-400` — nunca más de 3 colores en un mismo gráfico, siguiendo el principio de "un color por serie de datos" (ver skill de dataviz para la implementación final).
- **Barra de navegación inferior (mobile):** fondo `neutral-white`/oscuro, 4 íconos (Resumen, Favoritos, Plan, Perfil), ítem activo en `brand-forest`.

---

## 8. Fotografía e iconografía

- **Fotografía:** siempre de alta calidad, luz natural, sin filtros saturados. Aérea/dron para heroes de municipios; interiores con luz cálida para fichas de propiedad; retratos reales (no stock genérico) para testimonios cuando sea posible.
- **Overlay de heroes:** gradiente oscuro `rgba(11,37,69,0.55)` (basado en `brand-navy`) sobre la imagen/video, no negro puro — mantiene la calidez de marca y garantiza contraste AA para el texto blanco encima.
- **Iconografía:** set de línea (stroke 1.5-2px, esquinas redondeadas), no iconos rellenos — coherente con la estética minimalista de Apple/Notion. Un solo set en todo el sitio (ej. Phosphor Icons o Lucide, ambos open-source y con licencia libre).

---

## Siguiente paso

Con wireframes y sistema de diseño definidos, sigo a la **Etapa 4: Propuesta de stack tecnológico** (frontend, backend, base de datos, hosting, CMS, autenticación, analytics, email, CRM) — la última etapa de definición antes de generar el proyecto de código real.
