import { NextResponse } from "next/server";
import { isAdmin } from "../../../lib/auth";
import {
  getServicios,
  getChicas,
  getEventos,
  getSite,
  sanitizeSection,
  writeJson,
} from "../../../lib/data";

const KEYS = ["servicios", "chicas", "eventos", "site"];
const FILES = {
  servicios: "servicios.json",
  chicas: "chicas.json",
  eventos: "eventos.json",
  site: "site.json",
};

export async function GET() {
  if (!isAdmin()) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }
  return NextResponse.json({
    servicios: getServicios(),
    chicas: getChicas(),
    eventos: getEventos(),
    site: getSite(),
  });
}

export async function POST(req) {
  if (!isAdmin()) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }

  const { key, value } = body || {};
  if (!KEYS.includes(key)) {
    return NextResponse.json({ error: "Sección no válida." }, { status: 400 });
  }

  const clean = sanitizeSection(key, value);
  writeJson(FILES[key], clean);
  return NextResponse.json({ ok: true });
}
