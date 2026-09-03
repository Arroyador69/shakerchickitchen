import { brand } from "@/lib/brand";

export function JsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: brand.legalName,
    description: brand.tagline,
    url: brand.url,
    telephone: brand.phone,
    email: brand.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Marqués de Nervión 4 local",
      addressLocality: "Sevilla",
      postalCode: "41005",
      addressCountry: "ES",
    },
    areaServed: "ES",
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
  );
}
