import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

const SITE_DEFAULT = {
  contacto: {
    whatsapp: "34600000000",
    telefono: "(555) 123-4567",
    direccion: "Av. del Mar 123",
  },
  textos: {
    heroHint: "Toca una imagen para ver más",
    serviciosTitulo: "Nuestros Servicios",
    serviciosSubtitulo: "Bienestar y relajación en cada sesión",
    ubicacionTitulo: "Dónde Encontrarnos",
    ubicacionSubtitulo: "Visítanos y déjate consentir",
    catalogoTitulo: "Nuestras Chicas",
    catalogoSubtitulo: "Descubre a todas las disponibles",
    eventosTitulo: "Próximos Eventos",
    eventosSubtitulo: "Vive experiencias únicas con nosotros",
  },
};

export function readJson(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), "utf8"));
  } catch {
    return fallback;
  }
}

export function writeJson(file, data) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(
    path.join(DATA_DIR, file),
    JSON.stringify(data, null, 2) + "\n",
    "utf8"
  );
}

export const getServicios = () => readJson("servicios.json", []);
export const getChicas = () => readJson("chicas.json", []);
export const getEventos = () => readJson("eventos.json", []);

export function getSite() {
  const s = readJson("site.json", SITE_DEFAULT);
  return {
    ...SITE_DEFAULT,
    ...s,
    contacto: { ...SITE_DEFAULT.contacto, ...(s.contacto || {}) },
    textos: { ...SITE_DEFAULT.textos, ...(s.textos || {}) },
  };
}

export function getChica(slug) {
  return getChicas().find((c) => c.slug === slug);
}

// ─────────────────────────────────────────────────────────────
//  Limpieza de lo que llega del admin (evita corromper los JSON)
// ─────────────────────────────────────────────────────────────
const str = (v, max) => String(v ?? "").trim().slice(0, max);
const bool = (v, dflt) => {
  if (typeof v === "boolean") return v;
  if (typeof v === "string") return v === "true" || v === "1";
  return dflt;
};
const slugify = (v) =>
  str(v, 30).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export function sanitizeSection(key, value) {
  switch (key) {
    case "servicios": {
      const arr = Array.isArray(value) ? value : [];
      return arr.map((s) => ({
        id: str(s.id, 40) || String(Math.random().toString(36).slice(2)),
        nombre: str(s.nombre, 80),
        descripcion: str(s.descripcion, 300),
        precio: str(s.precio, 20),
        duracion: str(s.duracion, 20),
      }));
    }
    case "chicas": {
      const arr = Array.isArray(value) ? value : [];
      const used = new Set();
      return arr.map((c) => {
        const nombre = str(c.nombre, 40);
        let slug = slugify(c.slug);
        if (!slug) slug = slugify(nombre) || "chica";
        const base = slug;
        let n = 2;
        while (used.has(slug)) slug = `${base}-${n++}`;
        used.add(slug);
        return {
          slug,
          nombre,
          disponible: bool(c.disponible, true),
          img: str(c.img, 300) || "/placeholder.webp",
          galeria: Array.isArray(c.galeria)
            ? c.galeria.map((g) => str(g, 300)).filter(Boolean)
            : [],
          serviciosExtras: Array.isArray(c.serviciosExtras)
            ? c.serviciosExtras
                .map((s) => ({
                  servicio: str(s.servicio, 80),
                  precio: str(s.precio, 20),
                }))
                .filter((s) => s.servicio)
            : [],
        };
      });
    }
    case "eventos": {
      const arr = Array.isArray(value) ? value : [];
      return arr.map((e) => ({
        id: str(e.id, 40) || String(Math.random().toString(36).slice(2)),
        titulo: str(e.titulo, 120),
        fecha: str(e.fecha, 40),
        lugar: str(e.lugar, 120),
        descripcion: str(e.descripcion, 500),
      }));
    }
    case "site": {
      const s = value && typeof value === "object" ? value : {};
      const c = s.contacto || {};
      const t = s.textos || {};
      const textos = {};
      for (const k of Object.keys(SITE_DEFAULT.textos)) {
        textos[k] = str(t[k], 120);
      }
      return {
        contacto: {
          whatsapp: String(c.whatsapp || "")
            .replace(/[^\d+]/g, "")
            .slice(0, 20),
          telefono: str(c.telefono, 30),
          direccion: str(c.direccion, 120),
        },
        textos,
      };
    }
    default:
      return null;
  }
}
