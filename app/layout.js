import "./globals.css";
import { Montserrat } from "next/font/google";
import WhatsAppButton from "./components/WhatsAppButton";
import { getSite } from "./lib/data";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SITE_PRICE_RANGE } from "./lib/site";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    url: "/",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
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

        {/* Datos estructurados para Google (negocio local).
            Teléfono y dirección se editan desde /admin → Contacto. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "DaySpa",
              name: SITE_NAME,
              url: SITE_URL,
              description: SITE_DESCRIPTION,
              telephone: contacto.telefono,
              priceRange: SITE_PRICE_RANGE,
              address: {
                "@type": "PostalAddress",
                streetAddress: contacto.direccion,
                addressCountry: "ES",
              },
            }),
          }}
        />

        {/* Umami: etiqueta <script> real en el HTML (NO next/script).
            El tracker lee sus atributos desde document.currentScript, que es
            null cuando el script se inyecta dinámicamente; con next/script
            abortaba sin enviar nada.
            Se sirve desde nuestro dominio (/script.js) y Next lo reenvía a
            Umami con los rewrites de next.config.js, para que los
            bloqueadores de anuncios no lo bloqueen. */}
        <script
          defer
          src="/script.js"
          data-website-id="3c272cc7-959b-4806-aac8-0f7c9ddc49e2"
        />
      </body>
    </html>
  );
}
