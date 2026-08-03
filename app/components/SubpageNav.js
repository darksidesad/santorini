import Link from "next/link";
import styles from "./SubpageNav.module.css";

// Barra de navegación común a las páginas secundarias
// (/aurora, /clio, /hebe, /catalogo, /eventos).
export default function SubpageNav({ marca }) {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.volver}>
        ← Volver
      </Link>
      <span className={styles.marca}>{marca}</span>
      <span className={styles.spacer} />
    </nav>
  );
}
