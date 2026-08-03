import crypto from "crypto";
import { NextResponse } from "next/server";
import { tokenFromPassword, ADMIN_COOKIE } from "../../../lib/auth";

export async function POST(req) {
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Falta configurar ADMIN_PASSWORD en las variables de entorno." },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }

  const expected = Buffer.from(
    tokenFromPassword(process.env.ADMIN_PASSWORD),
    "hex"
  );
  const given = Buffer.from(tokenFromPassword(body?.password ?? ""), "hex");

  if (expected.length !== given.length || !crypto.timingSafeEqual(expected, given)) {
    return NextResponse.json({ error: "Contraseña incorrecta." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, tokenFromPassword(process.env.ADMIN_PASSWORD), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
