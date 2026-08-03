import fs from "fs";
import path from "path";
import sharp from "sharp";
import { NextResponse } from "next/server";
import { isAdmin } from "../../../lib/auth";

const UPLOAD_DIR = path.join(process.cwd(), "data", "uploads");
const MAX_BYTES = 6 * 1024 * 1024;
// Tipos explícitamente aceptados. Si el navegador/envío manda un tipo
// genérico (application/octet-stream o vacío), igual se intenta procesar
// con sharp: si no es una imagen real, sharp falla y se rechaza.
const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
  "application/octet-stream",
]);

export async function POST(req) {
  if (!isAdmin()) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  let form;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }

  const file = form.get("file");
  if (!file || typeof file === "string" || typeof file.arrayBuffer !== "function") {
    return NextResponse.json({ error: "No se recibió ningún archivo." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "La imagen supera los 6 MB." }, { status: 400 });
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json(
      { error: "Formato no permitido. Usá JPG, PNG, WebP, GIF o AVIF." },
      { status: 400 }
    );
  }

  const slug =
    String(form.get("chica") || "img")
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "")
      .slice(0, 30) || "img";
  const name = `${slug}-${Date.now()}.webp`;
  const buf = Buffer.from(await file.arrayBuffer());
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });

  try {
    await sharp(buf)
      .rotate()
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(path.join(UPLOAD_DIR, name));
  } catch {
    return NextResponse.json({ error: "No se pudo procesar la imagen." }, { status: 400 });
  }

  return NextResponse.json({ url: `/uploads/${name}` });
}
