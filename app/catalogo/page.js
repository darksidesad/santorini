import Image from "next/image";
import Link from "next/link";
import SubpageNav from "../components/SubpageNav";
import { getChicas, getSite } from "../lib/data";
import styles from "./catalogo.module.css";

export const metadata = { title: "Catálogo" };

// Se leen de data/chicas.json (editable desde /admin).
export const dynamic = "force-dynamic";

export default function CatalogoPage() {
  const chicas = getChicas().filter((c) => c.disponible !== false);
  const { textos } = getSite();

  return (
    <>
      <SubpageNav marca="Catálogo" />

      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.titulo}>{textos.catalogoTitulo}</h1>
          <p className={styles.subtitulo}>{textos.catalogoSubtitulo}</p>
        </header>

        <div className={styles.grid}>
          {chicas.map((c) => (
            <Link key={c.slug} href={`/chicas/${c.slug}`} className={styles.card}>
              <div className={styles.fotoWrap}>
                <Image
                  src={c.img}
                  alt={c.nombre}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.foto}
                />
              </div>
              <span className={styles.nombre}>{c.nombre}</span>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
