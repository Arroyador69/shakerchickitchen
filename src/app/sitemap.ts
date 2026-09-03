import { brand } from "@/lib/brand";
import { products } from "@/lib/products";

export default function sitemap() {
  const base = brand.url;
  const statics = [
    "",
    "/tienda",
    "/cocinas",
    "/cocinas-inglesas",
    "/jardin",
    "/hogar",
    "/proyectos",
    "/presupuesto",
    "/contacto",
    "/sobre-nosotros",
    "/carpinteria",
  ].map((path) => ({ url: `${base}${path}`, lastModified: new Date() }));
  const items = products.map((p) => ({
    url: `${base}/tienda/${p.slug}`,
    lastModified: new Date(),
  }));
  return [...statics, ...items];
}
