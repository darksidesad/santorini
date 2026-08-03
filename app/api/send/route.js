export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UMANI_SEND = "https://umami.luxurycitas.com/api/send";

function clientIP(req) {
  const fwd = req.headers.get("x-forwarded-for");
  const cf = req.headers.get("cf-connecting-ip");
  const real = cf || (fwd ? fwd.split(",")[0].trim() : "");
  return real;
}

export async function POST(req) {
  const ip = clientIP(req);
  const headers = new Headers(req.headers);
  headers.delete("host");
  // Reemplazamos X-Forwarded-For con la IP REAL del visitante (Cloudflare la
  // pone en CF-Connecting-IP). Así Umami geolocaliza al usuario y no a este
  // servidor (que estaba haciendo que TODO el tráfico saliera de Francia).
  headers.set("x-forwarded-for", ip || "127.0.0.1");
  headers.set("cf-connecting-ip", ip || "");

  try {
    const res = await fetch(UMANI_SEND, {
      method: "POST",
      headers,
      body: await req.arrayBuffer(),
    });
    return new Response(res.body, {
      status: res.status,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  } catch {
    return new Response("Unavailable", { status: 502 });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}