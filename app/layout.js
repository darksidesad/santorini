import "./globals.css";
import { Montserrat } from "next/font/google";
import WhatsAppButton from "./components/WhatsAppButton";
import { getSite } from "./lib/data";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SITE_PRICE_RANGE, SITE_CITY, SITE_REGION, SITE_POSTAL, SITE_COUNTRY, SITE_GEO } from "./lib/site";

// El botón flotante de WhatsApp y el JSON-LD leen data/site.json (admin).
// Fuerzo render on-demand para que NINGUNA página sirva un número viejo
// congelado en un build estático.
export const dynamic = "force-dynamic";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: SITE_URL },
  title: {
    default: "Santorini Medellín | Escorts, Prepagos y Masajes",
    template: `%s · Santorini Medellín`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "escorts medellín",
    "escort santorini",
    "prepagos santorini",
    "santorini medellín",
    "masajes santorini",
    "acompañantes medellín",
    "spa exclusivo medellín",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Santorini Medellín | Escorts, Prepagos y Masajes",
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "es_CO",
    images: [
      {
        url: "/fondo1.webp",
        width: 1200,
        height: 675,
        alt: "Santorini Medellín",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Santorini Medellín | Escorts, Prepagos y Masajes",
    description: SITE_DESCRIPTION,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  const { contacto } = getSite();

  return (
    <html lang="es" className={montserrat.className}>
      <body>
        {children}
        <WhatsAppButton />

        {/* Datos estructurados para Google (negocio local de Medellín).
            Teléfono y dirección se editan desde /admin → Contacto. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "DaySpa",
              name: SITE_NAME,
              url: SITE_URL,
              image: `${SITE_URL}/fondo1.webp`,
              description: SITE_DESCRIPTION,
              telephone: contacto.telefono,
              priceRange: SITE_PRICE_RANGE,
              areaServed: SITE_CITY,
              address: {
                "@type": "PostalAddress",
                streetAddress: contacto.direccion,
                addressLocality: SITE_CITY,
                addressRegion: SITE_REGION,
                postalCode: SITE_POSTAL,
                addressCountry: SITE_COUNTRY,
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: SITE_GEO.lat,
                longitude: SITE_GEO.lng,
              },
              openingHours: "Mo-Su 10:00-22:00",
            }),
          }}
        />

        {/* Umami: etiqueta <script> real en el HTML (NO next/script).
            El tracker lee sus atributos desde document.currentScript, que es
            null cuando el script se inyecta dinámicamente; con next/script
            abortaba sin enviar nada.
            Se sirve desde nuestro dominio (/script.js) y Next lo reenvía a
            Umami con los rewrites de next.config.js, para que los
            bloqueadores de anuncios no lo bloqueen.
            Los EVENTOS se envían directo del navegador a umami.luxurycitas.com
            (data-host-url): si no, Cloudflare de Umami ve la IP del servidor y
            todo el tráfico sale geolocalizado en Francia. */}
        <script
          defer
          src="/script.js"
          data-website-id="3c272cc7-959b-4806-aac8-0f7c9ddc49e2"
          data-host-url="https://umami.luxurycitas.com"
        />
      </body>
    </html>
  );
}
