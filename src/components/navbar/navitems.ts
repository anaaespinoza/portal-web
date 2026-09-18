// Datos de navegación — port de src/components/navbar/navitems.tsx del SPA.

export interface NavOption {
  label: string;
  path: string;
  isExternal?: boolean;
  anchor?: string;
}

export interface NavItem {
  title: string;
  path: string;
  options: NavOption[];
  isExternal?: boolean;
  anchor?: string;
}

export const navItems: NavItem[] = [
  {
    title: "Sobre TSJ",
    path: "",
    options: [
      { label: "Directorio", path: "/directorio" },
      { label: "¿Quiénes somos?", path: "/quienes-somos" },
      { label: "Noticias", path: "/noticias" },
    ],
  },
  { title: "Oferta Educativa", path: "/ofertaEducativa", options: [] },
  { title: "Posgrados", path: "/ofertaEducativa/filtro/maestrias", options: [] },
  { title: "Unidades Académicas", path: "/unidadesAcademicas", options: [] },
  {
    title: "Normatividad",
    path: "",
    options: [
      { label: "Archivo", path: "/archivo" },
      { label: "Junta de Gobierno", path: "/junta-gobierno" },
      { label: "Ordenamientos", path: "/ordenamientos" },
      { label: "Órganos técnicos", path: "/organos-tecnicos" },
      { label: "Transparencia", path: "/transparencia" },
    ],
  },
  { title: "Investigación", path: "/investigacion", options: [] },
  { title: "Docentes", path: "https://edcore.tecmm.mx/doc/login.jsp", options: [], isExternal: true },
  { title: "Alumnos", path: "https://aplicaciones.tsj.mx/alumnos", options: [], isExternal: true },
];

export const navItemsEnLinea: NavItem[] = [
  {
    title: "Sobre TSJ en Línea",
    path: "",
    options: [
      { label: "Directorio", path: "/directorio" },
      { label: "¿Quiénes somos?", path: "/quienes-somos" },
      { label: "Noticias", path: "/noticias" },
      { label: "Servicios a la Red TSJ", path: "/en-linea/servicios-red-tsj" },
    ],
  },
  { title: "Oferta Educativa", path: "", options: [], anchor: "oferta-en-linea" },
  { title: "Posgrados", path: "/ofertaEducativa/filtro/maestrias", options: [] },
  { title: "Unidades Académicas", path: "/unidadesAcademicas", options: [] },
  {
    title: "Normatividad",
    path: "",
    options: [
      { label: "Archivo", path: "/archivo" },
      { label: "Junta de Gobierno", path: "/junta-gobierno" },
      { label: "Ordenamientos", path: "/ordenamientos" },
      { label: "Órganos técnicos", path: "/organos-tecnicos" },
      { label: "Transparencia", path: "/transparencia" },
    ],
  },
  { title: "Investigación", path: "/investigacion", options: [] },
  { title: "Docentes", path: "https://edcore.tecmm.mx/doc/login.jsp", options: [], isExternal: true },
  {
    title: "Alumnos",
    path: "",
    options: [
      { label: "Edcore", path: "https://edcore.tecmm.mx/alum/login.jsp", isExternal: true },
      {
        label: "Moodle",
        path: "https://auth.enlinea.tsj.mx/realms/TSJ/protocol/openid-connect/auth?client_id=PanelCampus&scope=openid%20email%20profile&response_type=code&redirect_uri=https%3A%2F%2Fcampus.enlinea.tsj.mx%2Fapi%2Fauth%2Fcallback%2Fkeycloak&state=lbXBnUkTi5SdFAz1T_rnRSQdomUyXudIUhhX11ZdV20&code_challenge=d7yxfVZ-IWdrXnNLGLn9q6XuVoOJ4XkUdGZ97sIYdTc&code_challenge_method=S256",
        isExternal: true,
      },
      { label: "TecNM Virtual", path: "https://virtual.tecnm.mx/plataforma/login/index.php?loginredirect=1", isExternal: true },
    ],
  },
];