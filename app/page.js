import Image from "next/image";
import Link from "next/link";
import Loader from "./components/Loader";
import { whatsappUrl } from "./lib/whatsapp";
import { SITE_NAME } from "./lib/site";
import { getServicios, getSite } from "./lib/data";
import styles from "./page.module.css";

// Los servicios, chicas y textos se editan desde /admin y se guardan
// en data/. Se renderizan por pedido para que los cambios se vean al instante.
export const dynamic = "force-dynamic";

// ─────────────────────────────────────────────────────────────
//  HERO: imágenes fijas (solo las toca el desarrollador, NO /admin).
//
//  - nombre : etiqueta que se muestra sobre la imagen
//  - img    : archivo dentro de public/
//  - top/left/width    : posición en escritorio (% de la pantalla)
//  - topM/leftM/widthM : posición en móvil (% de la pantalla)
//
//  Al presionar una imagen se va a /catalogo (no a la chica).
//  El admin no puede borrar ni cambiar estas imágenes.
// ─────────────────────────────────────────────────────────────
const HERO = [
  {
    nombre: "Aurora",
    img: "/1111111111111.webp",
    top: "29%",
    left: "20%",
    width: "12%",
    topM: "20%",
    leftM: "0%",
    widthM: "34%",
  },
  {
    nombre: "Clio",
    img: "/222222222222222.webp",
    top: "30%",
    left: "45%",
    width: "13%",
    topM: "20%",
    leftM: "36%",
    widthM: "44%",
  },
  {
    nombre: "Hebe",
    img: "/333333333333333333.webp",
    top: "30%",
    left: "65%",
    width: "13%",
    topM: "20%",
    leftM: "70%",
    widthM: "34%",
  },
];

export default function Home() {
  const servicios = getServicios();
  const { contacto, textos } = getSite();

  const imagenesCarga = [
    "/fondo1.webp",
    "/logo1.svg",
    ...HERO.map((o) => o.img),
  ];

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
              src="/fondo1.webp"
              alt="Santorini"
              fill
              priority
              sizes="100vw"
              className={styles.image}
            />

            {HERO.map((o) => (
              <Link
                key={o.nombre}
                href="/catalogo"
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
                <Image
                  src={o.img}
                  alt=""
                  width={400}
                  height={800}
                  sizes="40vw"
                  className={styles.overlayImg}
                />
                <span className={styles.etiqueta}>{o.nombre}</span>
              </Link>
            ))}

            <span className={styles.hint}>
              <span className={styles.hintPulso} />
              {textos.heroHint}
            </span>
          </div>
        </section>

        <section id="servicios" className={styles.servicios}>
          <h2 className={styles.tituloSeccion}>{textos.serviciosTitulo}</h2>
          <span className={styles.subtitulo}>{textos.serviciosSubtitulo}</span>

          <div className={styles.cards}>
            {servicios.map((s) => (
              <article key={s.id} className={styles.card}>
                <span className={styles.duracion}>{s.duracion}</span>
                <h3 className={styles.cardTitulo}>{s.nombre}</h3>
                <p className={styles.cardDesc}>{s.descripcion}</p>
                <div className={styles.precio}>{s.precio}</div>
                <a
                  href={whatsappUrl(
                    contacto.whatsapp,
                    `Hola, me gustaría reservar el ${s.nombre} (${s.precio}).`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.boton}
                >
                  Reservar
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="ubicacion" className={styles.ubicacion}>
          <h2 className={styles.tituloSeccion}>{textos.ubicacionTitulo}</h2>
          <span className={styles.subtitulo}>{textos.ubicacionSubtitulo}</span>

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
          <h3 className={styles.footerMarca}>{SITE_NAME}</h3>
          <p>
            {contacto.direccion} · Reservas: {contacto.telefono}
          </p>
          <p className={styles.footerCopy}>
            © {new Date().getFullYear()} {SITE_NAME}. Todos los derechos
            reservados.
          </p>
        </div>
      </footer>
    </>
  );
}
