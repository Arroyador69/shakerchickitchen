import catalog from "../../data/catalog.json";
import type { CategoryId, Product } from "./types";

export const categories: {
  id: CategoryId;
  name: string;
  blurb: string;
  href: string;
}[] = [
  { id: "cocinas", name: "Cocinas Shaker", blurb: "Cocinas inglesas a medida, lacadas y con herrajes de latón.", href: "/cocinas" },
  { id: "hogar", name: "Hogar", blurb: "Recibidores, puertas, percheros y mobiliario artesanal.", href: "/hogar" },
  { id: "jardin", name: "Jardín", blurb: "Obeliscos, maceteros Versalles y piezas de exterior.", href: "/jardin" },
  { id: "hosteleria", name: "Hostelería", blurb: "Barras, islas y mobiliario para bares, cafeterías y ferias.", href: "/tienda?categoria=hosteleria" },
  { id: "comercial", name: "Comercial", blurb: "Expositores, mostradores y cartelería para negocio.", href: "/tienda?categoria=comercial" },
  { id: "mascotas", name: "Mascotas", blurb: "Casas, comederos y trepadores de diseño en madera.", href: "/tienda?categoria=mascotas" },
  { id: "infantil", name: "Infantil", blurb: "Mobiliario lúdico y personalizado para peques.", href: "/tienda?categoria=infantil" },
  { id: "decoracion", name: "Decoración", blurb: "Estanterías escultóricas, cuadros y letras a medida.", href: "/tienda?categoria=decoracion" },
];

export const products = catalog as Product[];

export const portfolio = [
  {
    slug: "cocina-verde-oliva-marmol-laton",
    title: "Cocina Shaker verde oliva con encimera de mármol y latón",
    text: "Diseñamos esta cocina estilo Shaker en tono verde oliva, combinando puertas enmarcadas clásicas con tiradores de latón envejecido y una elegante encimera de mármol natural.",
    image: "/catalog/p-cocina-britanica/00.jpg",
    finish: "oliva" as const,
  },
  {
    slug: "cocina-blanco-crema",
    title: "Cocina Shaker en blanco crema",
    text: "Una cocina Shaker luminosa y atemporal que combina líneas clásicas con acabados contemporáneos. El mobiliario lacado en tono crema y los tiradores en latón aportan elegancia y calidez.",
    image: "/catalog/p-cocina-britanica/01.jpg",
    finish: "crema" as const,
  },
  {
    slug: "cocina-azul-profundo",
    title: "Cocina Shaker en azul profundo",
    text: "Una reinterpretación más intensa del estilo Shaker, donde el azul profundo aporta carácter y personalidad al espacio.",
    image: "/catalog/p-cocina-britanica/02.jpg",
    finish: "navy" as const,
  },
  {
    slug: "mesa-artesanal-madera-maciza",
    title: "Mesa artesanal de madera maciza",
    text: "Esta mesa ha sido fabricada a mano en nuestro taller, cuidando cada detalle y respetando la esencia de la madera natural.",
    image: "/catalog/p-mesa-maciza/00.jpg",
    finish: "crema" as const,
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function productsByCategory(category?: CategoryId | "all") {
  if (!category || category === "all") return products;
  return products.filter((p) => p.category === category);
}

export function featuredProducts() {
  return products.filter((p) => p.featured);
}

export const categoryLabel: Record<CategoryId, string> = Object.fromEntries(
  categories.map((c) => [c.id, c.name]),
) as Record<CategoryId, string>;
