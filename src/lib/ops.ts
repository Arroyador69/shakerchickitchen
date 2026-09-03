import { nanoid } from "nanoid";
import { products } from "./products";
import type { OpsState } from "./types";

const g = globalThis as typeof globalThis & { __shakerOps?: OpsState };

function todayPlus(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function seedOps(): OpsState {
  return {
    inventory: products.map((p) => ({
      productId: p.id,
      stock: p.stock,
      reserved: p.madeToMeasure ? 0 : Math.min(1, p.stock),
      status: p.stock > 0 ? (p.madeToMeasure ? "bajo_pedido" : "disponible") : "agotado",
      notes: p.madeToMeasure ? "Fabricación bajo pedido · a medida" : "",
    })),
    jobs: [
      {
        id: nanoid(8),
        title: "Cocina Shaker verde oliva · vivienda Nervión",
        productId: "p-cocina-britanica",
        clientName: "María G.",
        stage: "acabado",
        dueDate: todayPlus(12),
        priority: "alta",
        notes: "Encimera mármol y tiradores latón envejecido.",
      },
      {
        id: nanoid(8),
        title: "Mudroom blanco y madera · ático Madrid",
        productId: "p-mudroom",
        clientName: "Carlos R.",
        stage: "ensamblaje",
        dueDate: todayPlus(20),
        priority: "media",
        notes: "Confirmar herrajes latón antes de lacar.",
      },
      {
        id: nanoid(8),
        title: "Macetero Versalles par · chalet Mairena",
        productId: "p-macetero-versalles",
        clientName: "Ana P.",
        stage: "corte",
        dueDate: todayPlus(9),
        priority: "media",
        notes: "Laca exterior blanca, tornillería inox.",
      },
      {
        id: nanoid(8),
        title: "Mostrador boutique · Triana",
        productId: "p-mostrador",
        clientName: "Atelier Luna",
        stage: "diseno",
        dueDate: todayPlus(35),
        priority: "alta",
        notes: "Visita de toma de medidas el viernes.",
      },
    ],
    leads: [
      {
        id: nanoid(8),
        name: "Lucía M.",
        email: "lucia@correo.es",
        phone: "655000111",
        message: "Quiero presupuesto de cocina Shaker en crema para 12 m lineales.",
        source: "presupuesto",
        status: "nuevo",
        productId: "p-cocina-britanica",
        createdAt: new Date().toISOString(),
      },
    ],
    quotes: [
      {
        id: "SC-Q-2401",
        clientName: "María G.",
        email: "maria@correo.es",
        items: [
          { description: "Cocina Shaker 4,2 m · verde oliva", qty: 1, price: 7800 },
          { description: "Encimera mármol", qty: 1, price: 2100 },
        ],
        status: "aceptado",
        total: 9900,
        createdAt: new Date().toISOString(),
      },
    ],
    tasks: [
      { id: nanoid(8), title: "Pedir tablero hidrófugo 19 mm", done: false, assignee: "taller", dueDate: todayPlus(1) },
      { id: nanoid(8), title: "Llamar a María G. para cita de instalación", done: false, assignee: "admin", dueDate: todayPlus(2) },
      { id: nanoid(8), title: "Render acabado azul profundo para lead Lucía", done: false, assignee: "diseno", dueDate: todayPlus(3) },
      { id: nanoid(8), title: "Revisar stock de tiradores latón", done: true, assignee: "taller" },
    ],
    materials: [
      { id: "m1", name: "Tablero MDF hidrófugo 19 mm", category: "tablero", stock: 28, unit: "planchas", minStock: 10 },
      { id: "m2", name: "Madera roble macizo", category: "madera", stock: 42, unit: "ml", minStock: 15 },
      { id: "m3", name: "Laca satinada crema", category: "laca", stock: 8, unit: "L", minStock: 4 },
      { id: "m4", name: "Laca verde oliva", category: "laca", stock: 5, unit: "L", minStock: 3 },
      { id: "m5", name: "Laca azul profundo", category: "laca", stock: 4, unit: "L", minStock: 3 },
      { id: "m6", name: "Tiradores latón envejecido", category: "herraje", stock: 64, unit: "uds", minStock: 24 },
      { id: "m7", name: "Bisagras clip-on", category: "herraje", stock: 120, unit: "uds", minStock: 40 },
      { id: "m8", name: "Encimera mármol / porcelánico", category: "encimera", stock: 3, unit: "slabs", minStock: 1 },
    ],
  };
}

export function getOps(): OpsState {
  if (!g.__shakerOps) g.__shakerOps = seedOps();
  return g.__shakerOps;
}

export function setOps(next: OpsState) {
  g.__shakerOps = next;
  return next;
}

export function patchOps(mutator: (draft: OpsState) => void) {
  const current = structuredClone(getOps());
  mutator(current);
  return setOps(current);
}
