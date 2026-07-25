import "./globals.css";
import Script from "next/script";
import { Montserrat } from "next/font/google";
import WhatsAppButton from "./components/WhatsAppButton";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Santorini Spa",
  description: "Bienestar y relajación · Galería y servicios",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={montserrat.className}>
      <body>
        {children}
        <WhatsAppButton />
        {/* Se carga desde nuestro propio dominio (/script.js) y Next.js lo
            reenvía a Umami mediante rewrites en next.config.js. El tracker
            enviará los datos a /api/send, también reenviado a Umami. */}
        <Script
          defer
          src="/script.js"
          data-website-id="3c272cc7-959b-4806-aac8-0f7c9ddc49e2"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
