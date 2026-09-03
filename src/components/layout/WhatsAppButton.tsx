"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { whatsappLink } from "@/lib/utils";

export function WhatsAppButton() {
  const pathname = usePathname();
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/login")) return null;
  return (
    <a
      href={whatsappLink("Hola, me gustaría hablar de un proyecto Shaker Chic.")}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-medium text-white shadow-lg shadow-black/20 transition hover:scale-[1.03]"
    >
      <MessageCircle size={18} />
      WhatsApp
    </a>
  );
}
