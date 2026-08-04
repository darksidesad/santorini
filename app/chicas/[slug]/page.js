import { notFound } from "next/navigation";
import Gallery from "../../components/Gallery";
import { getChica } from "../../lib/data";

// Se lee de data/chicas.json (editable desde /admin).
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const chica = getChica(params.slug);
  if (!chica) return { title: "Chica no encontrada" };
  return {
    title: `${chica.nombre} · Escort en Medellín`,
    description: `${chica.nombre} en Santorini Medellín: acompañante y prepago exclusiva. Galería de fotos, servicios y reserva por WhatsApp.`,
  };
}

export default function ChicaPage({ params }) {
  const chica = getChica(params.slug);
  if (!chica) notFound();

  return (
    <Gallery
      title={chica.nombre}
      subtitle={`Colección ${chica.nombre}`}
      images={chica.galeria ?? []}
      extras={chica.serviciosExtras ?? []}
    />
  );
}
