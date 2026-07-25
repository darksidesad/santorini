import Image from "next/image";
import Link from "next/link";
import Loader from "./components/Loader";
import styles from "./page.module.css";

// Cada recorte se posiciona de forma independiente sobre el fondo.
// Hay DOS juegos de valores (todos en %):
//
//   ESCRITORIO ->  top / left / width
//   MÓVIL      ->  topM / leftM / widthM   (se usan en pantallas <= 600px)
//
//   - left / leftM : distancia desde la izquierda (0% = izq, 100% = der)
//   - top  / topM  : distancia desde arriba       (0% = arriba, 100% = abajo)
//   - width/ widthM: ancho de la imagen respecto al ancho de la pantalla
//
// Edita los valores "M" para acomodar las imágenes en la vista móvil
// sin cambiar cómo se ven en escritorio.
const overlays = [
  {
    src: "/1111111111111.png",
    href: "/aurora",
    nombre: "Aurora",
    top: "29%", left: "20%", width: "12%",
    topM: "20%", leftM: "0%", widthM: "34%",
  },
  {
    src: "/222222222222222.png",
    href: "/clio",
    nombre: "Clio",
    top: "30%", left: "45%", width: "13%",
    topM: "20%", leftM: "36%", widthM: "44%",
  },
  {
    src: "/333333333333333333.png",
    href: "/hebe",
    nombre: "Hebe",
    top: "30%", left: "65%", width: "13%",
    topM: "20%", leftM: "70%", widthM: "34%",
  },
];

const servicios = [
  {
    nombre: "Masaje Relajante",
    descripcion:
      "Técnica suave de cuerpo completo para liberar tensión y calmar la mente.",
    precio: "$45",
    duracion: "60 min",
  },
  {
    nombre: "Masaje Descontracturante",
    descripcion:
      "Presión profunda enfocada en nudos musculares y zonas de dolor crónico.",
    precio: "$60",
    duracion: "75 min",
  },
  {
    nombre: "Masaje con Piedras Calientes",
    descripcion:
      "Piedras volcánicas templadas que relajan los músculos y activan la circulación.",
    precio: "$75",
    duracion: "90 min",
  },
];

const imagenesCarga = [
  "/fondo1.png",
  "/logo1.svg",
  ...overlays.map((o) => o.src),
];

export default function Home() {
  return (
    <>
      <Loader images={imagenesCarga} />

      <nav className={styles.navbar}>
        <ul className={styles.navList}>
          <li>
            <a href="#inicio">Inicio</a>
          </li>
          <li>
            <Link href="/eventos">Eventos</Link>
          </li>
          <li>
            <Link href="/catalogo">Catálogo</Link>
          </li>
        </ul>
      </nav>

      <main>
        <section id="inicio" className={styles.hero}>
          <div className={styles.imageWrapper}>
            <Image
              src="/fondo1.png"
              alt="Santorini"
              fill
              priority
              sizes="100vw"
              className={styles.image}
            />

            {/* Logo oculto. Para volver a mostrarlo, quita las marcas de
                comentario que rodean este bloque. */}
            {/*
            <img
              src="/logo1.svg"
              alt="Logo Santorini"
              className={styles.logo}
              style={{
                "--logo-top": "6%",
                "--logo-left": "50%",
                "--logo-width": "18%",
                "--logo-top-m": "14%",
                "--logo-left-m": "50%",
                "--logo-width-m": "45%",
              }}
            />
            */}

            {overlays.map((o) => (
              <Link
                key={o.src}
                href={o.href}
                className={styles.overlay}
                style={{
                  "--ov-top": o.top,
                  "--ov-left": o.left,
                  "--ov-width": o.width,
                  "--ov-top-m": o.topM,
                  "--ov-left-m": o.leftM,
                  "--ov-width-m": o.widthM,
                }}
              >
                <img src={o.src} alt="" className={styles.overlayImg} />
                <span className={styles.etiqueta}>{o.nombre}</span>
              </Link>
            ))}

            <span className={styles.hint}>
              <span className={styles.hintPulso} />
              Toca una imagen para ver más
            </span>
          </div>
        </section>

        <section id="servicios" className={styles.servicios}>
          <h2 className={styles.tituloSeccion}>Nuestros Servicios</h2>
          <span className={styles.subtitulo}>
            Bienestar y relajación en cada sesión
          </span>

          <div className={styles.cards}>
            {servicios.map((s) => (
              <article key={s.nombre} className={styles.card}>
                <span className={styles.duracion}>{s.duracion}</span>
                <h3 className={styles.cardTitulo}>{s.nombre}</h3>
                <p className={styles.cardDesc}>{s.descripcion}</p>
                <div className={styles.precio}>{s.precio}</div>
                <button className={styles.boton}>Reservar</button>
              </article>
            ))}
          </div>
        </section>

        <section id="ubicacion" className={styles.ubicacion}>
          <h2 className={styles.tituloSeccion}>Dónde Encontrarnos</h2>
          <span className={styles.subtitulo}>
            Visítanos y déjate consentir
          </span>

          <div className={styles.mapaWrapper}>
            <iframe
              title="Ubicación Santorini Spa"
              src="https://www.google.com/maps?q=Santorini,Greece&output=embed"
              className={styles.mapa}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </section>
      </main>

      <footer id="contacto" className={styles.footer}>
        <div className={styles.footerContenido}>
          <h3 className={styles.footerMarca}>Santorini Spa</h3>
          <p>Av. del Mar 123 · Reservas: (555) 123-4567</p>
          <p className={styles.footerCopy}>
            © {new Date().getFullYear()} Santorini Spa. Todos los derechos
            reservados.
          </p>
        </div>
      </footer>
    </>
  );
}
