import Link from "next/link";
import styles from "./Gallery.module.css";

// Componente reutilizable para las páginas /aurora, /clio, /hebe.
// Pasa "images" con las rutas de las imágenes cuando las tengas, ej:
//   <Gallery title="Aurora" images={["/aurora-1.png", "/aurora-2.png"]} />
export default function Gallery({ title, subtitle, images = [] }) {
  return (
    <>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.volver}>
          ← Volver
        </Link>
        <span className={styles.marca}>{title}</span>
        <span className={styles.spacer} />
      </nav>

      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.titulo}>{title}</h1>
          {subtitle && <p className={styles.subtitulo}>{subtitle}</p>}
        </header>

        {images.length > 0 ? (
          <div className={styles.grid}>
            {images.map((src) => (
              <div key={src} className={styles.item}>
                <img src={src} alt={title} className={styles.foto} />
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.placeholder}>
            Pronto añadiremos las imágenes de esta colección.
          </p>
        )}
      </main>
    </>
  );
}
