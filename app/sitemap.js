import { SITE_URL } from "./lib/site";

export default function sitemap() {
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/aurora`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/clio`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/hebe`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/catalogo`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/eventos`, changeFrequency: "weekly", priority: 0.7 },
  ];
}
