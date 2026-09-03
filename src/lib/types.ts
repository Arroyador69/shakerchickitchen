export type CategoryId =
  | "cocinas"
  | "hosteleria"
  | "hogar"
  | "jardin"
  | "mascotas"
  | "infantil"
  | "decoracion"
  | "comercial";

export type Product = {
  id: string;
  sku: string;
  slug: string;
  name: string;
  price: number | null;
  category: CategoryId;
  short: string;
  description: string;
  materials: string[];
  leadTimeDays: number;
  madeToMeasure: boolean;
  featured: boolean;
  stock: number;
  cost: number;
  tags: string[];
  color: string;
  image: string;
  mesh: "kitchen" | "bar" | "shelf" | "planter" | "pet" | "kids" | "door" | "sign" | "counter" | "table";
};

export type Role = "admin" | "client";

export type SessionUser = {
  email: string;
  name: string;
  role: Role;
};

export type InventoryStatus =
  | "disponible"
  | "bajo_pedido"
  | "en_produccion"
  | "agotado";

export type InventoryItem = {
  productId: string;
  stock: number;
  reserved: number;
  status: InventoryStatus;
  notes: string;
};

export type JobStage =
  | "nuevo"
  | "diseno"
  | "corte"
  | "ensamblaje"
  | "acabado"
  | "instalacion"
  | "entregado";

export type ProductionJob = {
  id: string;
  title: string;
  productId?: string;
  clientName: string;
  stage: JobStage;
  dueDate: string;
  priority: "baja" | "media" | "alta";
  notes: string;
};

export type LeadStatus = "nuevo" | "contactado" | "presupuesto" | "ganado" | "perdido";

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  source: "web" | "whatsapp" | "presupuesto" | "tienda";
  status: LeadStatus;
  productId?: string;
  createdAt: string;
};

export type QuoteStatus = "borrador" | "enviado" | "aceptado" | "rechazado";

export type Quote = {
  id: string;
  clientName: string;
  email: string;
  items: { description: string; qty: number; price: number }[];
  status: QuoteStatus;
  total: number;
  createdAt: string;
};

export type Task = {
  id: string;
  title: string;
  done: boolean;
  dueDate?: string;
  assignee: "taller" | "diseno" | "admin";
};

export type Material = {
  id: string;
  name: string;
  category: "tablero" | "laca" | "herraje" | "encimera" | "madera";
  stock: number;
  unit: string;
  minStock: number;
};

export type OpsState = {
  inventory: InventoryItem[];
  jobs: ProductionJob[];
  leads: Lead[];
  quotes: Quote[];
  tasks: Task[];
  materials: Material[];
};
