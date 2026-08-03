import { redirect } from "next/navigation";

// Rutas viejas (/aurora, /clio, /hebe) redirigen a la nueva URL dinámica.
export default function AuroraRedirect() {
  redirect("/chicas/aurora");
}
