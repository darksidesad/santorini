"use client";

import { useEffect, useState } from "react";
import styles from "./Loader.module.css";

// Muestra una pantalla de carga hasta que todas las imágenes de "images"
// terminen de descargarse. Incluye un tope de seguridad para no quedarse
// bloqueado si alguna imagen tarda demasiado o falla.
export default function Loader({ images = [] }) {
  const [done, setDone] = useState(false);
  const [remove, setRemove] = useState(false);

  useEffect(() => {
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      setDone(true);
      // Espera a que termine la animación de desvanecido antes de quitarlo
      setTimeout(() => setRemove(true), 600);
    };

    // Bloquea el scroll mientras carga
    document.body.style.overflow = "hidden";

    if (images.length === 0) {
      finish();
    } else {
      let loaded = 0;
      const onOne = () => {
        loaded += 1;
        if (loaded >= images.length) finish();
      };

      images.forEach((src) => {
        const img = new window.Image();
        img.onload = onOne;
        img.onerror = onOne;
        img.src = src;
      });
    }

    // Tope de seguridad: pase lo que pase, entra a los 8s
    const timeout = setTimeout(finish, 8000);

    return () => {
      clearTimeout(timeout);
      document.body.style.overflow = "";
    };
  }, [images]);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  if (remove) return null;

  return (
    <div
      className={`${styles.loader} ${done ? styles.hidden : ""}`}
      aria-hidden={done}
    >
      <div className={styles.spinner} />
      <span className={styles.texto}>Cargando</span>
    </div>
  );
}
