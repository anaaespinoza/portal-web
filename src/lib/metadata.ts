// SEO — port de src/seo/metadata.ts del SPA a TypeScript de Astro.

export interface SeoMeta {
  title: string;
  description: string;
  noindex?: boolean;
}

export const siteUrl = "https://www.tecmm.edu.mx";

export const defaultSeo: SeoMeta = {
  title: "Tecnológico Superior de Jalisco | Educación superior y universitaria en Jalisco",
  description:
    "Tecnológico Superior de Jalisco: educación superior y formación a nivel universitario en Jalisco. Oferta académica, unidades académicas y programas de calidad.",
};

export const seoMetadata: Record<string, SeoMeta> = {
  "/": {
    title: "Tecnológico Superior de Jalisco | Educación superior y universitaria en Jalisco",
    description:
      "Descubre el Tecnológico Superior de Jalisco: educación superior y formación a nivel universitario con carreras tecnológicas, unidades académicas y programas de calidad.",
  },
  "/admisiones": {
    title: "Admisiones e inscripciones | Tecnológico Superior de Jalisco",
    description: "Proceso de admisión e inscripción al Tecnológico Superior de Jalisco. Requisitos y pasos para estudiar en nivel universitario y educación superior.",
  },
  "/pasedirecto": {
    title: "Pase Directo | Tecnológico Superior de Jalisco",
    description: "Conoce el Pase Directo del Tecnológico Superior de Jalisco y cómo continuar tu educación superior universitaria.",
  },
  "/planeacion-institucional": {
    title: "Planeación Institucional | Tecnológico Superior de Jalisco",
    description: "Planeación institucional del Tecnológico Superior de Jalisco: programas y proyectos de educación superior.",
  },
  "/ofertaEducativa": {
    title: "Oferta académica | Carreras universitarias TSJ",
    description: "Explora la oferta académica del Tecnológico Superior de Jalisco: carreras universitarias y programas de educación superior tecnológica.",
  },
  "/ofertaEducativa/:carreraNombre": {
    title: "Carrera | Oferta académica TSJ",
    description: "Detalle de la carrera en el Tecnológico Superior de Jalisco: educación superior universitaria y formación tecnológica.",
  },
  "/unidadesAcademicas": {
    title: "Unidades Académicas | Tecnológico Superior de Jalisco",
    description: "Conoce las unidades académicas del Tecnológico Superior de Jalisco y su oferta de educación superior universitaria.",
  },
  "/en-linea": {
    title: "TSJ en Línea | Educación superior virtual",
    description: "TSJ en Línea: educación superior universitaria 100% en línea, flexible y de alta calidad en el Tecnológico Superior de Jalisco.",
  },
  "/en-linea/servicios-red-tsj": {
    title: "Servicios a la Red TSJ | Tecnológico Superior de Jalisco",
    description: "Servicios de la Red TSJ: asesoría curricular, recursos multimedia, captación de estudiantes y más.",
  },
  "/cursos-talleres": {
    title: "Cursos y talleres | Educación flexible TSJ",
    description: "Cursos y talleres de educación flexible del Tecnológico Superior de Jalisco para tu desarrollo profesional.",
  },
  "/cursos-talleres/:id": {
    title: "Curso o taller | Educación flexible TSJ",
    description: "Detalle del curso o taller de educación flexible del Tecnológico Superior de Jalisco.",
  },
  "/directorio": { title: "Directorio | Tecnológico Superior de Jalisco", description: "Directorio del Tecnológico Superior de Jalisco." },
  "/noticias": {
    title: "Noticias | Tecnológico Superior de Jalisco",
    description: "Últimas noticias del Tecnológico Superior de Jalisco, institución de educación superior universitaria en Jalisco.",
  },
  "/noticias/:id": { title: "Noticia | Tecnológico Superior de Jalisco", description: "Noticia del Tecnológico Superior de Jalisco." },
  "/ordenamientos": { title: "Ordenamientos | Tecnológico Superior de Jalisco", description: "Ordenamientos del Tecnológico Superior de Jalisco." },
  "/aranceles": { title: "Aranceles | Tecnológico Superior de Jalisco", description: "Aranceles y costos de educación superior en el Tecnológico Superior de Jalisco." },
  "/archivo": { title: "Archivo | Tecnológico Superior de Jalisco", description: "Archivo del Tecnológico Superior de Jalisco." },
  "/gaceta": { title: "Gaceta | Tecnológico Superior de Jalisco", description: "Gaceta del Tecnológico Superior de Jalisco." },
  "/junta-gobierno": { title: "Junta de Gobierno | Tecnológico Superior de Jalisco", description: "Junta de Gobierno del Tecnológico Superior de Jalisco." },
  "/transparencia": {
    title: "Transparencia | Tecnológico Superior de Jalisco",
    description: "Información de transparencia del Tecnológico Superior de Jalisco.",
  },
  "/ppu079-2026": {
    title: "Transparencia U079-2026 | Tecnológico Superior de Jalisco",
    description: "Detalle de transparencia del programa presupuestario U079-2026 del Tecnológico Superior de Jalisco.",
  },
  "/organos-tecnicos": { title: "Órganos Técnicos | Tecnológico Superior de Jalisco", description: "Órganos técnicos del Tecnológico Superior de Jalisco." },
  "/quienes-somos": {
    title: "Quiénes somos | Tecnológico Superior de Jalisco",
    description: "Conoce el Tecnológico Superior de Jalisco, institución de educación superior universitaria en Jalisco: misión, visión e historia.",
  },
  "/investigacion": {
    title: "Investigación | Tecnológico Superior de Jalisco",
    description: "Investigación del Tecnológico Superior de Jalisco: proyectos de ciencia, tecnología e innovación en educación superior.",
  },
  "/investigacion/:unidad": {
    title: "Investigación | Tecnológico Superior de Jalisco",
    description: "Investigación del Tecnológico Superior de Jalisco.",
  },
  "/mapa-sitio": { title: "Mapa del sitio | Tecnológico Superior de Jalisco", description: "Mapa del sitio del Tecnológico Superior de Jalisco." },
  "/contraloria-social": { title: "Contraloría Social | Tecnológico Superior de Jalisco", description: "Contraloría social del Tecnológico Superior de Jalisco." },
  "/carrera": { title: "Carrera | Tecnológico Superior de Jalisco", description: "Información de carrera del Tecnológico Superior de Jalisco." },
  // rutas internas/privadas -> noindex
  "/base": { title: "Base | TSJ", description: "Plataforma base TSJ.", noindex: true },
  "/login": { title: "Iniciar sesión | TSJ", description: "Acceso TSJ.", noindex: true },
  "/validaciones": { title: "Validaciones | TSJ", description: "Validaciones TSJ.", noindex: true },
  "/validarCredencial": { title: "Validar credencial | TSJ", description: "Validar credencial TSJ.", noindex: true },
  "/credencialesAdmins": { title: "Credenciales | TSJ", description: "Credenciales TSJ.", noindex: true },
  "/credencialesAlumnos": { title: "Credenciales | TSJ", description: "Credenciales TSJ.", noindex: true },
  "/enConstruccion": { title: "En construcción | TSJ", description: "Página en construcción.", noindex: true },
};

export function getSeo(pathname: string): SeoMeta {
  if (seoMetadata[pathname]) return seoMetadata[pathname];
  const segment = "/" + (pathname.split("/")[1] || "");
  if (seoMetadata[segment]) return seoMetadata[segment];
  return defaultSeo;
}