import Link from "next/link";
import styles from "./eventos.module.css";

export const metadata = { title: "Eventos · Santorini Spa" };

// Añade o edita los eventos aquí.
const eventos = [
  {
    titulo: "Noche de Relajación",
    fecha: "15 Ago 2026",
    lugar: "Santorini Spa · Salón Principal",
    descripcion:
      "Una velada de masajes, aromaterapia y música en vivo para desconectar por completo.",
  },
  {
    titulo: "Retiro de Bienestar",
    fecha: "3 Sep 2026",
    lugar: "Terraza del Mar",
    descripcion:
      "Jornada completa con yoga al amanecer, tratamientos y almuerzo saludable frente al mar.",
  },
  {
    titulo: "Spa & Champán",
    fecha: "20 Sep 2026",
    lugar: "Santorini Spa · Zona VIP",
    descripcion:
      "Experiencia exclusiva de circuito termal con copa de champán y atención personalizada.",
  },
];

export default function EventosPage() {
  return (
    <>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.volver}>
          ← Volver
        </Link>
        <span className={styles.marca}>Eventos</span>
        <span className={styles.spacer} />
      </nav>

      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.titulo}>Próximos Eventos</h1>
          <p className={styles.subtitulo}>
            Vive experiencias únicas con nosotros
          </p>
        </header>

        <div className={styles.lista}>
          {eventos.map((e) => (
            <article key={e.titulo} className={styles.card}>
              <div className={styles.fecha}>{e.fecha}</div>
              <div className={styles.contenido}>
                <h2 className={styles.cardTitulo}>{e.titulo}</h2>
                <p className={styles.lugar}>{e.lugar}</p>
                <p className={styles.desc}>{e.descripcion}</p>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
