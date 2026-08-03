import fs from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "data", "uploads");

const MIME = {
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
};

export function GET(_req, { params }) {
  const name = path.basename(String(params.name ?? ""));
  const file = path.join(UPLOAD_DIR, name);
  if (!name || !fs.existsSync(file)) {
    return new Response("Not found", { status: 404 });
  }
  const ext = path.extname(name).toLowerCase();
  const type = MIME[ext] || "application/octet-stream";
  const body = fs.readFileSync(file);
  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": type,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
