import Link from "next/link";
import styles from "./catalogo.module.css";

export const metadata = { title: "Catálogo · Santorini Spa" };

// Lista de chicas disponibles. Añade más objetos cuando las tengas.
const chicas = [
  { nombre: "Aurora", href: "/aurora", img: "/1111111111111.png" },
  { nombre: "Clio", href: "/clio", img: "/222222222222222.png" },
  { nombre: "Hebe", href: "/hebe", img: "/333333333333333333.png" },
];

export default function CatalogoPage() {
  return (
    <>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.volver}>
          ← Volver
        </Link>
        <span className={styles.marca}>Catálogo</span>
        <span className={styles.spacer} />
      </nav>

      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.titulo}>Nuestras Chicas</h1>
          <p className={styles.subtitulo}>
            Descubre a todas las disponibles
          </p>
        </header>

        <div className={styles.grid}>
          {chicas.map((c) => (
            <Link key={c.href} href={c.href} className={styles.card}>
              <div className={styles.fotoWrap}>
                <img src={c.img} alt={c.nombre} className={styles.foto} />
              </div>
              <span className={styles.nombre}>{c.nombre}</span>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
