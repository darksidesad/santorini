import { cookies } from "next/headers";
import { isValidToken, ADMIN_COOKIE } from "../lib/auth";
import LoginForm from "./LoginForm";
import AdminPanel from "./AdminPanel";

export const metadata = { title: "Admin" };

export const dynamic = "force-dynamic";

export default function AdminPage() {
  const authed = isValidToken(cookies().get(ADMIN_COOKIE)?.value);
  return authed ? <AdminPanel /> : <LoginForm />;
}
