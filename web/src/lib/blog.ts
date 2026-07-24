export type BlogPost = {
  slug: string;
  titulo: string;
  categoria: string;
  resumen: string;
  fecha: string;
  tiempoLectura: string;
  contenido: string[];
};

export const CATEGORIAS = [
  "Comprar desde el exterior",
  "Créditos",
  "Constructoras",
  "Impuestos",
  "Guías",
  "Inversión",
  "Patrimonio",
];

export const POSTS: BlogPost[] = [
  {
    slug: "como-comprar-vivienda-en-colombia-viviendo-en-el-exterior",
    titulo: "Cómo comprar vivienda en Colombia viviendo en el exterior",
    categoria: "Comprar desde el exterior",
    resumen: "El proceso completo, paso a paso, para colombianos que quieren invertir sin tener que viajar.",
    fecha: "2026-05-12",
    tiempoLectura: "6 min",
    contenido: [
      "Comprar una propiedad en Colombia sin estar físicamente en el país es más común de lo que parece, y cada año más colombianos en el exterior lo hacen a través de poderes notariales y acompañamiento remoto.",
      "El primer paso es tener claridad sobre tu capacidad de compra: cuánto puedes destinar como cuota inicial y cuánto podrías financiar. Nuestra calculadora y el Plan de Inversión te dan una estimación en minutos.",
      "El segundo paso es otorgar un poder notarial a una persona de confianza o a un abogado en Colombia, autenticado en el consulado colombiano de tu país de residencia, para que pueda firmar la escritura en tu nombre.",
      "Finalmente, la mayoría de constructoras y bancos ya tienen procesos digitales para colombianos en el exterior: firma electrónica, videollamadas notariales y giros internacionales para la cuota inicial.",
    ],
  },
  {
    slug: "creditos-hipotecarios-para-no-residentes",
    titulo: "Créditos hipotecarios para colombianos no residentes",
    categoria: "Créditos",
    resumen: "Qué bancos prestan a colombianos con ingresos en el exterior y qué documentos piden.",
    fecha: "2026-04-28",
    tiempoLectura: "5 min",
    contenido: [
      "Varios bancos colombianos tienen líneas específicas para colombianos residentes en el exterior, con tasas similares a las de residentes locales pero requisitos de documentación distintos.",
      "Generalmente se pide: certificación de ingresos en el país de residencia, historial bancario de al menos 6 meses, y en algunos casos una carta de tu empleador.",
      "El monto financiable suele ser menor que para residentes (hasta 70% del valor del inmueble en vez de 80%), por lo que la cuota inicial debe ser mayor.",
    ],
  },
  {
    slug: "que-mirar-al-elegir-una-constructora",
    titulo: "Qué mirar al elegir una constructora en Santander",
    categoria: "Constructoras",
    resumen: "Señales de una constructora seria: fiducia, licencias y trayectoria.",
    fecha: "2026-04-10",
    tiempoLectura: "4 min",
    contenido: [
      "No todos los proyectos en preventa están respaldados de la misma forma. Una constructora seria maneja tu cuota inicial a través de una fiducia (patrimonio autónomo), no en una cuenta propia.",
      "Verifica la licencia de construcción del proyecto ante la curaduría urbana correspondiente, y pide el historial de proyectos entregados anteriormente.",
      "En Raíces, todos los aliados constructores pasan por una verificación antes de aparecer en el marketplace.",
    ],
  },
  {
    slug: "impuestos-al-comprar-y-vender-en-colombia",
    titulo: "Impuestos que debes conocer al comprar y vender en Colombia",
    categoria: "Impuestos",
    resumen: "Retención en la fuente, ganancia ocasional y declaración de renta para no residentes.",
    fecha: "2026-03-22",
    tiempoLectura: "7 min",
    contenido: [
      "Como comprador, pagas gastos notariales y de registro (aprox. 1.5-2% del valor de la propiedad en total).",
      "Si en el futuro vendes con utilidad, aplica el impuesto de ganancia ocasional, que puede variar según cuánto tiempo tuviste la propiedad.",
      "Si eres colombiano no residente fiscal, tus obligaciones de declaración de renta en Colombia son distintas a las de un residente — vale la pena una consulta puntual con un contador antes de la compra.",
    ],
  },
  {
    slug: "guia-primera-inversion-santander",
    titulo: "Guía para tu primera inversión inmobiliaria en Santander",
    categoria: "Guías",
    resumen: "Los errores más comunes de primerizos y cómo evitarlos.",
    fecha: "2026-03-02",
    tiempoLectura: "8 min",
    contenido: [
      "El error más común es comprar por precio y no por fundamentales: valorización histórica, demanda de arriendo y calidad del desarrollador.",
      "El segundo error es no visitar (o hacer visitar por alguien de confianza) la zona antes de comprar, incluso en preventa.",
      "El tercer error es subestimar los costos de cierre: escrituración, registro, y en algunos casos comisión inmobiliaria.",
    ],
  },
  {
    slug: "por-que-barichara-se-valoriza-tanto",
    titulo: "Por qué Barichara se valoriza más que el promedio nacional",
    categoria: "Inversión",
    resumen: "Turismo, patrimonio y oferta limitada: la fórmula detrás del municipio más querido de Colombia.",
    fecha: "2026-02-18",
    tiempoLectura: "5 min",
    contenido: [
      "Barichara combina tres factores que rara vez coinciden: declaratoria de patrimonio (que limita la oferta de nueva construcción), un flujo constante de turismo internacional, y cercanía a San Gil.",
      "Esto ha llevado a una valorización histórica cercana al 14% anual en los últimos años, muy por encima del promedio nacional.",
      "El riesgo es la iliquidez relativa: vender rápido en Barichara es más difícil que en una ciudad grande, por lo que es una inversión de mediano-largo plazo.",
    ],
  },
];

export function getPostBySlug(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}
