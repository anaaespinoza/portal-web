// Datos de los bloques InfoBlock del landing — origen: src/components/infoblock/infoData.tsx
// Cada bloque alimenta <InfoBlock /> con texto, imagen, orientación y enlace.

export interface InfoDescriptionPart {
  text: string;
  link?: string;
}

export interface InfoBlockData {
  id: string;
  titulo: string;
  descripcion: InfoDescriptionPart[];
  imagen: string;
  reverse: boolean;
  link?: string;
}

export const infoInscripciones: InfoBlockData = {
  id: "inscripciones",
  titulo: "Inscripciones abiertas",
  descripcion: [
    {
      text:
        "Comienza tu viaje hacia la excelencia académica hoy mismo, en el Tecnológico Superior de Jalisco, una universidad pública comprometida con la formación profesional y el desarrollo de nuestros estudiantes. Consulta el ",
    },
    { text: "proceso de admisión", link: "/admisiones" },
    {
      text:
        " que está diseñado para reconocer tu potencial, motivación y pasión por el conocimiento. Te acompañamos en cada etapa, desde la revisión de requisitos hasta tu integración formal a nuestra comunidad. ¡Transforma tu futuro hoy!",
    },
  ],
  imagen: "https://tecmm.edu.mx/apiCms/cmsWebFiles/admisiones.jpg",
  reverse: true,
  link: "/admisiones",
};

export const infoTSJEnLinea: InfoBlockData = {
  id: "tsj-en-linea",
  titulo: "TSJ en Línea",
  descripcion: [
    { text: "TSJ en Línea", link: "/en-linea" },
    {
      text:
        " es la modalidad de educación virtual del Tecnológico Superior de Jalisco, diseñada para ofrecerte educación superior tecnológica, flexible y de alta calidad. Bajo un modelo 100% asíncrono, avanzarás a tu propio ritmo mediante actividades prácticas, recursos digitales y el acompañamiento constante de nuestros docentes. ¡Sin horarios ni clases en vivo!",
    },
  ],
  imagen:
    "https://tecmm.mx/cdn/public/WEB-TSJ/IMAGES/GENERAL/a9cbfdc6c87d4be789fcaf3017fe2934.webp",
  reverse: false,
  link: "/en-linea",
};

export const infoInvestigacion: InfoBlockData = {
  id: "investigacion",
  titulo: "TSJ Investigación",
  descripcion: [
    { text: "En el TSJ, " },
    { text: "la investigación", link: "/investigacion" },
    {
      text:
        " impulsa nuevas ideas, conocimientos y soluciones para transformar nuestro entorno y responder a los desafíos de la sociedad. A través de la colaboración, la innovación y el compromiso de nuestros docentes investigadores, se desarrollan proyectos que generan conocimiento y aportan al crecimiento científico, tecnológico, económico y social, fortalecemos la formación académica y contribuimos a construir un futuro más sostenible e innovador.",
    },
  ],
  imagen:
    "https://tecmm.mx/cdn/public/images/a0f38cfb807d4d689f2d5bbf99277970.webp",
  reverse: true,
  link: "/investigacion",
};

export const infoServiciosRed: InfoBlockData = {
  id: "servicios-red",
  titulo: "Servicios a la Red",
  descripcion: [
    {
      text:
        "Desde el TSJ en Línea ponemos a disposición de nuestras Unidades Académicas herramientas, recursos y soluciones tecnológicas que fortalecen la colaboración y el aprovechamiento de nuestra infraestructura institucional. Conoce nuestros ",
    },
    { text: "Servicios a la Red", link: "/servicios-red-tsj" },
    { text: " y descubre los recursos disponibles." },
  ],
  imagen:
    "https://tecmm.mx/cdn/public/WEB-TSJ/IMAGES/GENERAL/2528441db5714ada91e3fcc1d888a9c3.webp",
  reverse: false,
  link: "/servicios-red-tsj",
};