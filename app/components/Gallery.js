"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import SubpageNav from "./SubpageNav";
import styles from "./Gallery.module.css";

// Galería de la página de cada chica (/chicas/[slug]).
// Al tocar una foto se abre ampliada (lightbox) con flechas y teclado.
// "images" son las rutas de las fotos; "extras" los servicios adicionales.
export default function Gallery({ title, subtitle, images = [], extras = [] }) {
  const [activa, setActiva] = useState(null);

  const prev = useCallback(() => {
    if (images.length < 2) return;
    setActiva((a) => (a - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    if (images.length < 2) return;
    setActiva((a) => (a + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    document.body.style.overflow = activa === null ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activa]);

  useEffect(() => {
    if (activa === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setActiva(null);
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activa, prev, next]);

  return (
    <>
      <SubpageNav marca={title} />

      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.titulo}>{title}</h1>
          {subtitle && <p className={styles.subtitulo}>{subtitle}</p>}
        </header>

        {images.length > 0 ? (
          <div className={styles.grid}>
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                className={styles.item}
                onClick={() => setActiva(i)}
                aria-label={`Ampliar foto ${i + 1} de ${title}`}
              >
                <Image
                  src={src}
                  alt={title}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.foto}
                />
              </button>
            ))}
          </div>
        ) : (
          <p className={styles.placeholder}>
            Pronto añadiremos las imágenes de esta colección.
          </p>
        )}

        {extras.length > 0 && (
          <section className={styles.extras}>
            <h2 className={styles.extrasTitulo}>Servicios adicionales</h2>
            <ul className={styles.extrasLista}>
              {extras.map((e, i) => (
                <li key={`${e.servicio}-${i}`} className={styles.extrasItem}>
                  <span className={styles.extrasNombre}>{e.servicio}</span>
                  <span className={styles.extrasPrecio}>{e.precio}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      {activa !== null && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          onClick={() => setActiva(null)}
        >
          <button
            type="button"
            className={styles.cerrar}
            onClick={() => setActiva(null)}
            aria-label="Cerrar galería"
          >
            ×
          </button>

          <figure className={styles.lightboxMarco} onClick={(e) => e.stopPropagation()}>
            <div className={styles.lightboxImg}>
              <Image
                src={images[activa]}
                alt={`${title} ${activa + 1}`}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 80vw"
                className={styles.lightboxFoto}
              />
            </div>
            <figcaption className={styles.lightboxPie}>
              <span>{title}</span>
              {images.length > 1 && (
                <span className={styles.lightboxContador}>
                  {activa + 1} / {images.length}
                </span>
              )}
            </figcaption>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  className={styles.nav}
                  style={{ left: 0 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  aria-label="Foto anterior"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className={styles.nav}
                  style={{ right: 0 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  aria-label="Foto siguiente"
                >
                  ›
                </button>
              </>
            )}
          </figure>
        </div>
      )}
    </>
  );
}
