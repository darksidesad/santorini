import "./globals.css";
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
