"use client";

import { useState } from "react";
import styles from "./admin.module.css";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        window.location.reload();
        return;
      }
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Error al iniciar sesión.");
    } catch {
      setError("Error de conexión.");
    }
    setLoading(false);
  }

  return (
    <main className={styles.loginWrap}>
      <form onSubmit={onSubmit} className={styles.loginCard}>
        <h1 className={styles.loginTitle}>Admin · Santorini</h1>
        <label className={styles.label} htmlFor="password">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          autoComplete="current-password"
        />
        {error && <p className={styles.error}>{error}</p>}
        <button
          type="submit"
          className={styles.btnPrimary}
          disabled={loading || !password}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </main>
  );
}
