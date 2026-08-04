import { SITE_URL } from "./lib/site";
import { getChicas } from "./lib/data";

// Refleja los cambios del admin (chicas agregadas/eliminadas en /admin).
export const dynamic = "force-dynamic";

export default function sitemap() {
  const chicas = getChicas();
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/catalogo`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/eventos`, changeFrequency: "weekly", priority: 0.6 },
    ...chicas.map((c) => ({
      url: `${SITE_URL}/chicas/${c.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ];
}
