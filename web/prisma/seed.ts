import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const MUNICIPIOS = [
  { slug: "bucaramanga", nombre: "Bucaramanga", resumen: "La capital, motor económico y de servicios de Santander.", precioM2Promedio: 6200000, valorizacionPct: 9.5, calidadDeVida: "Alta — clima templado, buena oferta de salud y educación", nivelValorizacion: "Alta", tipoRecomendado: "Apartamentos de renta y vivienda familiar", lat: 7.1193, lng: -73.1227 },
  { slug: "floridablanca", nombre: "Floridablanca", resumen: "Zona residencial premium del área metropolitana.", precioM2Promedio: 5400000, valorizacionPct: 10.2, calidadDeVida: "Muy alta — conjuntos cerrados y zonas verdes", nivelValorizacion: "Alta", tipoRecomendado: "Apartamentos y casas en conjunto cerrado", lat: 7.0631, lng: -73.0862 },
  { slug: "giron", nombre: "Girón", resumen: "Centro histórico colonial en plena expansión inmobiliaria.", precioM2Promedio: 4100000, valorizacionPct: 8.1, calidadDeVida: "Alta — patrimonio histórico y crecimiento urbano ordenado", nivelValorizacion: "Media", tipoRecomendado: "Casas coloniales e inversión turística", lat: 7.0687, lng: -73.1698 },
  { slug: "piedecuesta", nombre: "Piedecuesta", resumen: "Crecimiento acelerado y precios aún accesibles.", precioM2Promedio: 3800000, valorizacionPct: 11.4, calidadDeVida: "Alta — clima fresco, cercanía a Bucaramanga", nivelValorizacion: "Emergente", tipoRecomendado: "Proyectos nuevos y lotes", lat: 6.9938, lng: -73.0505 },
  { slug: "barichara", nombre: "Barichara", resumen: "El pueblo patrimonio más querido de Colombia — turismo de alto valor.", precioM2Promedio: 7800000, valorizacionPct: 13.8, calidadDeVida: "Excepcional — patrimonio, tranquilidad y turismo internacional", nivelValorizacion: "Alta", tipoRecomendado: "Casas patrimoniales e inversión en renta turística", lat: 6.6333, lng: -73.1667 },
  { slug: "san-gil", nombre: "San Gil", resumen: "Capital del turismo de aventura de Colombia.", precioM2Promedio: 3900000, valorizacionPct: 9.9, calidadDeVida: "Alta — clima cálido y economía turística activa", nivelValorizacion: "Emergente", tipoRecomendado: "Fincas y hospedajes turísticos", lat: 6.5572, lng: -73.1348 },
  { slug: "mesa-de-los-santos", nombre: "Mesa de los Santos", resumen: "Altiplano exclusivo con las mejores vistas del Cañón del Chicamocha.", precioM2Promedio: 5100000, valorizacionPct: 12.6, calidadDeVida: "Muy alta — fincas de descanso y clima excepcional", nivelValorizacion: "Alta", tipoRecomendado: "Fincas de recreo y proyectos boutique", lat: 6.8, lng: -73.0167 },
  { slug: "curiti", nombre: "Curití", resumen: "Pueblo artesanal creciendo como alternativa a San Gil.", precioM2Promedio: 2900000, valorizacionPct: 8.7, calidadDeVida: "Alta — tranquilidad y cercanía a San Gil", nivelValorizacion: "Emergente", tipoRecomendado: "Lotes y casas campestres", lat: 6.6017, lng: -73.0783 },
  { slug: "socorro", nombre: "Socorro", resumen: "Ciudad histórica con precios de entrada muy competitivos.", precioM2Promedio: 2400000, valorizacionPct: 6.9, calidadDeVida: "Media-alta — vida tranquila de ciudad intermedia", nivelValorizacion: "Emergente", tipoRecomendado: "Vivienda familiar e inversión de bajo capital", lat: 6.4644, lng: -73.2649 },
  { slug: "barrancabermeja", nombre: "Barrancabermeja", resumen: "Polo industrial petrolero sobre el río Magdalena.", precioM2Promedio: 3100000, valorizacionPct: 5.8, calidadDeVida: "Media — ciudad industrial con demanda de arriendo estable", nivelValorizacion: "Media", tipoRecomendado: "Apartamentos de renta para trabajadores del sector energético", lat: 7.0653, lng: -73.8547 },
].map((m) => ({
  ...m,
  descripcion: `${m.nombre} es uno de los diez municipios priorizados por Raíces en Santander. ${m.resumen} Con un precio promedio de $${m.precioM2Promedio.toLocaleString("es-CO")} por metro cuadrado y una valorización histórica cercana al ${m.valorizacionPct}% anual, es un destino a considerar dentro de tu plan de inversión.`,
  heroImage: "gradient",
}));

const ALIADOS = [
  { slug: "constructora-cordillera", nombre: "Constructora Cordillera", categoria: "Constructoras", descripcion: "20 años desarrollando proyectos residenciales en el área metropolitana de Bucaramanga.", municipios: "Bucaramanga,Floridablanca", aniosExperiencia: 20, proyectosEntregados: 34, logoInitial: "C" },
  { slug: "grupo-guane", nombre: "Grupo Guane Inmobiliaria", categoria: "Constructoras", descripcion: "Especialistas en proyectos boutique en Barichara y San Gil.", municipios: "Barichara,San Gil,Curití", aniosExperiencia: 12, proyectosEntregados: 15, logoInitial: "G" },
  { slug: "inmobiliaria-santander-global", nombre: "Inmobiliaria Santander Global", categoria: "Inmobiliarias", descripcion: "Intermediación especializada en compradores colombianos residentes en el exterior.", municipios: "Bucaramanga,Girón,Piedecuesta", aniosExperiencia: 9, proyectosEntregados: 0, logoInitial: "S" },
  { slug: "juridica-patrimonio-ltda", nombre: "Jurídica Patrimonio Ltda.", categoria: "Abogados", descripcion: "Firma legal especializada en compraventa de inmuebles para colombianos en el exterior (poderes, escrituración remota).", municipios: "Bucaramanga", aniosExperiencia: 15, proyectosEntregados: 0, logoInitial: "J" },
  { slug: "banco-andes-hipotecario", nombre: "Banco Andes — Línea Hipotecaria", categoria: "Bancos", descripcion: "Créditos hipotecarios para colombianos no residentes con ingresos en el exterior.", municipios: "Nacional", aniosExperiencia: 30, proyectosEntregados: 0, logoInitial: "A" },
  { slug: "estudio-arquitectura-roble", nombre: "Estudio Roble Arquitectura", categoria: "Arquitectos", descripcion: "Diseño de vivienda campestre y proyectos de renta turística en el oriente santandereano.", municipios: "Mesa de los Santos,San Gil,Barichara", aniosExperiencia: 11, proyectosEntregados: 22, logoInitial: "R" },
  { slug: "topografia-precision-oriente", nombre: "Topografía Precisión Oriente", categoria: "Topógrafos", descripcion: "Levantamientos topográficos y linderos para compra de lotes y fincas.", municipios: "Piedecuesta,Curití,Socorro", aniosExperiencia: 18, proyectosEntregados: 0, logoInitial: "T" },
];

const PROPERTIES = [
  { slug: "altos-de-cabecera", titulo: "Altos de Cabecera", municipioSlug: "bucaramanga", allySlug: "constructora-cordillera", precioDesde: 420000000, areaM2: 78, tipo: "Apartamento", estadoProyecto: "En construcción", rentabilidadEstimada: 7.2, entrega: "Dic 2027", destacado: true, amenidades: "Piscina,Gimnasio,Coworking,Zona BBQ" },
  { slug: "mirador-de-floridablanca", titulo: "Mirador de Floridablanca", municipioSlug: "floridablanca", allySlug: "constructora-cordillera", precioDesde: 510000000, areaM2: 92, tipo: "Apartamento", estadoProyecto: "Preventa", rentabilidadEstimada: 8.1, entrega: "Jun 2028", destacado: true, amenidades: "Piscina,Salón social,Parque infantil" },
  { slug: "casa-colonial-giron", titulo: "Casa Colonial Centro Histórico", municipioSlug: "giron", allySlug: "inmobiliaria-santander-global", precioDesde: 680000000, areaM2: 210, tipo: "Casa", estadoProyecto: "Entrega inmediata", rentabilidadEstimada: 6.5, entrega: "Inmediata", destacado: false, amenidades: "Patio colonial,Ubicación centro histórico" },
  { slug: "villas-piedecuesta", titulo: "Villas del Cacique", municipioSlug: "piedecuesta", allySlug: "constructora-cordillera", precioDesde: 310000000, areaM2: 64, tipo: "Apartamento", estadoProyecto: "En construcción", rentabilidadEstimada: 9.4, entrega: "Mar 2027", destacado: true, amenidades: "Zona verde,Parqueadero visitantes" },
  { slug: "casa-patrimonial-barichara", titulo: "Casa Patrimonial Calle del Mirador", municipioSlug: "barichara", allySlug: "grupo-guane", precioDesde: 950000000, areaM2: 180, tipo: "Casa", estadoProyecto: "Entrega inmediata", rentabilidadEstimada: 11.2, entrega: "Inmediata", destacado: true, amenidades: "Piscina privada,Vista al cañón,Apta para renta turística" },
  { slug: "eco-hospedaje-san-gil", titulo: "Eco-Hospedaje Río Fonce", municipioSlug: "san-gil", allySlug: "grupo-guane", precioDesde: 720000000, areaM2: 320, tipo: "Local", estadoProyecto: "Entrega inmediata", rentabilidadEstimada: 13.5, entrega: "Inmediata", destacado: false, amenidades: "8 habitaciones,Zona de aventura,Restaurante" },
  { slug: "finca-mesa-de-los-santos", titulo: "Finca Mirador del Chicamocha", municipioSlug: "mesa-de-los-santos", allySlug: "estudio-arquitectura-roble", precioDesde: 1250000000, areaM2: 8000, tipo: "Finca", estadoProyecto: "Entrega inmediata", rentabilidadEstimada: 10.8, entrega: "Inmediata", destacado: true, amenidades: "Vista al cañón,Casa principal,Zona de cultivo" },
  { slug: "lote-curiti", titulo: "Lote Campestre Curití", municipioSlug: "curiti", allySlug: "topografia-precision-oriente", precioDesde: 180000000, areaM2: 1200, tipo: "Lote", estadoProyecto: "Disponible", rentabilidadEstimada: 9.0, entrega: "Inmediata", destacado: false, amenidades: "Servicios públicos disponibles,Vía pavimentada" },
  { slug: "apartamentos-socorro-centro", titulo: "Reserva del Socorro", municipioSlug: "socorro", allySlug: "inmobiliaria-santander-global", precioDesde: 195000000, areaM2: 58, tipo: "Apartamento", estadoProyecto: "En construcción", rentabilidadEstimada: 7.8, entrega: "Sep 2027", destacado: false, amenidades: "Ascensor,Parqueadero" },
  { slug: "renta-barrancabermeja", titulo: "Torres del Magdalena", municipioSlug: "barrancabermeja", allySlug: "inmobiliaria-santander-global", precioDesde: 240000000, areaM2: 62, tipo: "Apartamento", estadoProyecto: "Entrega inmediata", rentabilidadEstimada: 8.9, entrega: "Inmediata", destacado: false, amenidades: "Portería 24h,Salón comunal" },
  { slug: "penthouse-cabecera", titulo: "Penthouse Cabecera del Llano", municipioSlug: "bucaramanga", allySlug: "constructora-cordillera", precioDesde: 890000000, areaM2: 145, tipo: "Apartamento", estadoProyecto: "Preventa", rentabilidadEstimada: 6.9, entrega: "Nov 2028", destacado: false, amenidades: "Terraza privada,Jacuzzi,Vista panorámica" },
  { slug: "finca-san-gil-aventura", titulo: "Finca Cascadas de Juan Curí", municipioSlug: "san-gil", allySlug: "estudio-arquitectura-roble", precioDesde: 980000000, areaM2: 15000, tipo: "Finca", estadoProyecto: "Disponible", rentabilidadEstimada: 12.1, entrega: "Inmediata", destacado: false, amenidades: "Nacimiento de agua,Bosque nativo,Cabaña existente" },
];

async function main() {
  await prisma.lead.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.property.deleteMany();
  await prisma.ally.deleteMany();
  await prisma.municipality.deleteMany();
  await prisma.investmentPlan.deleteMany();

  const municipalityMap = new Map<string, string>();
  for (const m of MUNICIPIOS) {
    const created = await prisma.municipality.create({ data: m });
    municipalityMap.set(m.slug, created.id);
  }

  const allyMap = new Map<string, string>();
  for (const a of ALIADOS) {
    const created = await prisma.ally.create({ data: a });
    allyMap.set(a.slug, created.id);
  }

  for (const p of PROPERTIES) {
    const { municipioSlug, allySlug, ...rest } = p;
    await prisma.property.create({
      data: {
        ...rest,
        descripcion: `${p.titulo} es un proyecto ${p.estadoProyecto.toLowerCase()} desarrollado por un aliado verificado de Raíces, con una rentabilidad estimada del ${p.rentabilidadEstimada}% anual.`,
        municipioId: municipalityMap.get(municipioSlug)!,
        allyId: allyMap.get(allySlug)!,
      },
    });
  }

  console.log(`Seed listo: ${MUNICIPIOS.length} municipios, ${ALIADOS.length} aliados, ${PROPERTIES.length} propiedades.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
