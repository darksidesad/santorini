/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Proxy "first-party" para Umami: el navegador pide el script y envía los
  // datos a NUESTRO dominio, y Next.js los reenvía a umami.luxurycitas.com.
  // Así los bloqueadores de anuncios no lo bloquean (no ven el dominio de Umami).
  async rewrites() {
    return [
      {
        source: "/script.js",
        destination: "https://umami.luxurycitas.com/script.js",
      },
    ];
  },
};

module.exports = nextConfig;
