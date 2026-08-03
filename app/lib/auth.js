import crypto from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "admin_token";

// La cookie guarda el hash de ADMIN_PASSWORD (nunca la contraseña en sí).
export function tokenFromPassword(password) {
  return crypto.createHash("sha256").update(String(password)).digest("hex");
}

export function isValidToken(token) {
  if (!process.env.ADMIN_PASSWORD || !token) return false;
  const expected = Buffer.from(
    tokenFromPassword(process.env.ADMIN_PASSWORD),
    "hex"
  );
  const given = Buffer.from(String(token), "hex");
  return expected.length === given.length && crypto.timingSafeEqual(expected, given);
}

export function isAdmin() {
  return isValidToken(cookies().get(ADMIN_COOKIE)?.value);
}
