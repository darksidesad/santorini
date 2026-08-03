import SubpageNav from "../components/SubpageNav";
import { getEventos, getSite } from "../lib/data";
import styles from "./eventos.module.css";

export const metadata = { title: "Eventos" };

// Se leen de data/eventos.json (editable desde /admin).
export const dynamic = "force-dynamic";

export default function EventosPage() {
  const eventos = getEventos();
  const { textos } = getSite();

  return (
    <>
      <SubpageNav marca="Eventos" />

      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.titulo}>{textos.eventosTitulo}</h1>
          <p className={styles.subtitulo}>{textos.eventosSubtitulo}</p>
        </header>

        <div className={styles.lista}>
          {eventos.map((e) => (
            <article key={e.id} className={styles.card}>
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
