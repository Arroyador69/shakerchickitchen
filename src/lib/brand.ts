export const brand = {
  name: "Shaker Chic",
  legalName: "Shaker Chic Kitchen",
  tagline: "Carpintería artesanal de inspiración inglesa",
  city: "Sevilla",
  location: "Marqués de Nervión 4 local, Sevilla, 41005",
  phone: "+34 614 95 66 47",
  phoneHref: "tel:+34614956647",
  email: "info@shakerchickitchen.com",
  whatsapp: "34614956647",
  url: "https://shakerchickitchen.com",
  hours: "Lunes a viernes · 9:00 – 19:00",
  instagram: "https://www.instagram.com/shakerchickitchen",
} as const;

export const nav = [
  { href: "/", label: "Inicio" },
  {
    href: "/cocinas",
    label: "Cocinas shaker",
    children: [
      { href: "/cocinas", label: "Cocinas a medida" },
      { href: "/cocinas-inglesas", label: "Cocinas inglesas" },
    ],
  },
  { href: "/tienda", label: "Tienda" },
  { href: "/jardin", label: "Jardín" },
  { href: "/hogar", label: "Hogar" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/presupuesto", label: "Presupuesto gratis" },
  {
    href: "/contacto",
    label: "Contacto",
    children: [
      { href: "/sobre-nosotros", label: "Sobre nosotros" },
      { href: "/carpinteria", label: "Carpintería a medida" },
    ],
  },
] as const;

export const testimonials = [
  {
    quote:
      "Desde el primer diseño hasta la instalación final, el equipo de Shaker Chic Kitchen cuidó cada detalle. Nuestra cocina Shaker ha transformado completamente el espacio y el resultado superó nuestras expectativas. Profesionalidad y calidad impecables.",
    author: "María G.",
    city: "Sevilla",
  },
  {
    quote:
      "Buscábamos una cocina elegante y atemporal, y el resultado ha sido espectacular. La fabricación artesanal y los acabados demuestran el nivel de detalle con el que trabajan. Sin duda volveríamos a confiar en ellos.",
    author: "Carlos R.",
    city: "Madrid",
  },
];

export const finishes = [
  { id: "crema", label: "Blanco crema", color: "#EDE4D4", accent: "#C4A574" },
  { id: "oliva", label: "Verde oliva", color: "#6A7349", accent: "#C4A574" },
  { id: "navy", label: "Azul profundo", color: "#2C3A56", accent: "#C4A574" },
] as const;

export type FinishId = (typeof finishes)[number]["id"];
