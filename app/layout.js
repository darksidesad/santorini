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
      </body>
    </html>
  );
}
