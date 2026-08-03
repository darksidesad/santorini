"use client";

import { useEffect, useState } from "react";
import styles from "./admin.module.css";

const EMPTY = {
  servicios: [],
  chicas: [],
  eventos: [],
  site: { contacto: {}, textos: {} },
};

export default function AdminPanel() {
  const [data, setData] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(null);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    fetch("/api/admin/data")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setData)
      .catch(() => setMsg({ type: "error", text: "No se pudo cargar la información." }))
      .finally(() => setLoading(false));
  }, []);

  const setSection = (key, next) => setData((d) => ({ ...d, [key]: next }));

  async function save(key) {
    setSaving(key);
    setMsg(null);
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value: data[key] }),
      });
      if (!res.ok) throw new Error();
      setMsg({ type: "ok", text: "Cambios guardados." });
    } catch {
      setMsg({ type: "error", text: "Error al guardar." });
    }
    setSaving(null);
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  if (loading) {
    return (
      <main className={styles.wrap}>
        <p className={styles.muted}>Cargando...</p>
      </main>
    );
  }

  return (
    <main className={styles.wrap}>
      <header className={styles.topbar}>
        <h1 className={styles.topbarTitle}>Panel de administración</h1>
        <div className={styles.topbarActions}>
          <a className={styles.link} href="/" target="_blank" rel="noopener noreferrer">
            Ver el sitio ↗
          </a>
          <button className={styles.btnGhost} onClick={logout}>
            Cerrar sesión
          </button>
        </div>
      </header>

      {msg && (
        <p className={msg.type === "ok" ? styles.ok : styles.error}>{msg.text}</p>
      )}

      <ContactoEditor
        value={data.site}
        onChange={(site) => setSection("site", site)}
        onSave={() => save("site")}
        saving={saving === "site"}
      />

      <ServiciosEditor
        value={data.servicios}
        onChange={(v) => setSection("servicios", v)}
        onSave={() => save("servicios")}
        saving={saving === "servicios"}
      />

      <ChicasEditor
        value={data.chicas}
        onChange={(v) => setSection("chicas", v)}
        onSave={() => save("chicas")}
        saving={saving === "chicas"}
      />

      <EventosEditor
        value={data.eventos}
        onChange={(v) => setSection("eventos", v)}
        onSave={() => save("eventos")}
        saving={saving === "eventos"}
      />
    </main>
  );
}

/* ============ Contacto y textos ============ */

function ContactoEditor({ value, onChange, onSave, saving }) {
  const c = value.contacto || {};
  const t = value.textos || {};

  const setContacto = (field, v) =>
    onChange({ ...value, contacto: { ...c, [field]: v } });
  const setTexto = (k, v) => onChange({ ...value, textos: { ...t, [k]: v } });

  return (
    <section className={styles.card}>
      <div className={styles.cardHead}>
        <h2 className={styles.cardTitle}>Contacto y textos</h2>
        <button className={styles.btnPrimary} onClick={onSave} disabled={saving}>
          {saving ? "Guardando..." : "Guardar"}
        </button>
      </div>

      <div className={styles.fieldGrid}>
        <label className={styles.field}>
          <span className={styles.label}>
            WhatsApp (internacional, sin + ni espacios)
          </span>
          <input
            className={styles.input}
            value={c.whatsapp || ""}
            onChange={(e) => setContacto("whatsapp", e.target.value)}
          />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Teléfono</span>
          <input
            className={styles.input}
            value={c.telefono || ""}
            onChange={(e) => setContacto("telefono", e.target.value)}
          />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Dirección</span>
          <input
            className={styles.input}
            value={c.direccion || ""}
            onChange={(e) => setContacto("direccion", e.target.value)}
          />
        </label>
      </div>

      <div className={styles.fieldGrid}>
        {Object.entries(t).map(([k, v]) => (
          <label key={k} className={styles.field}>
            <span className={styles.label}>{k}</span>
            <input
              className={styles.input}
              value={v || ""}
              onChange={(e) => setTexto(k, e.target.value)}
            />
          </label>
        ))}
      </div>
    </section>
  );
}

/* ============ Servicios ============ */

function ServiciosEditor({ value, onChange, onSave, saving }) {
  const update = (i, field, v) =>
    onChange(value.map((s, idx) => (idx === i ? { ...s, [field]: v } : s)));

  return (
    <section className={styles.card}>
      <div className={styles.cardHead}>
        <h2 className={styles.cardTitle}>Servicios</h2>
        <button className={styles.btnPrimary} onClick={onSave} disabled={saving}>
          {saving ? "Guardando..." : "Guardar"}
        </button>
      </div>

      {value.map((s, i) => (
        <div key={s.id || i} className={styles.row}>
          <input
            className={styles.input}
            value={s.nombre}
            onChange={(e) => update(i, "nombre", e.target.value)}
            placeholder="Nombre"
          />
          <input
            className={styles.input}
            value={s.precio}
            onChange={(e) => update(i, "precio", e.target.value)}
            placeholder="Precio"
            style={{ maxWidth: 110 }}
          />
          <input
            className={styles.input}
            value={s.duracion}
            onChange={(e) => update(i, "duracion", e.target.value)}
            placeholder="Duración"
            style={{ maxWidth: 120 }}
          />
          <input
            className={styles.input}
            value={s.descripcion}
            onChange={(e) => update(i, "descripcion", e.target.value)}
            placeholder="Descripción"
          />
          <button
            className={styles.btnDanger}
            onClick={() => onChange(value.filter((_, idx) => idx !== i))}
            aria-label="Eliminar servicio"
          >
            ×
          </button>
        </div>
      ))}

      <button
        className={styles.btnGhost}
        onClick={() =>
          onChange([...value, { nombre: "", descripcion: "", precio: "", duracion: "" }])
        }
      >
        + Añadir servicio
      </button>
    </section>
  );
}

/* ============ Chicas ============ */

function ChicasEditor({ value, onChange, onSave, saving }) {
  const update = (i, patch) =>
    onChange(value.map((c, idx) => (idx === i ? { ...c, ...patch } : c)));

  async function uploadImg(i, file, target) {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("chica", value[i].slug || "img");
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        alert(d.error || "No se pudo subir la imagen.");
        return;
      }
      const { url } = await res.json();
      if (target === "img") update(i, { img: url });
      else update(i, { galeria: [...(value[i].galeria || []), url] });
    } catch {
      alert("Error al subir la imagen.");
    }
  }

  function addChica() {
    onChange([
      ...value,
      {
        slug: `nueva-${Date.now()}`,
        nombre: "Nueva chica",
        disponible: true,
        img: "/placeholder.webp",
        galeria: [],
        serviciosExtras: [],
      },
    ]);
  }

  function removeChica(i) {
    const c = value[i];
    if (!window.confirm(`¿Eliminar a ${c.nombre || c.slug}?`)) return;
    onChange(value.filter((_, idx) => idx !== i));
  }

  const updateExtra = (i, ei, field, v) => {
    const extras = (value[i].serviciosExtras || []).map((e, idx) =>
      idx === ei ? { ...e, [field]: v } : e
    );
    update(i, { serviciosExtras: extras });
  };

  const addExtra = (i) =>
    update(i, {
      serviciosExtras: [...(value[i].serviciosExtras || []), { servicio: "", precio: "" }],
    });

  const removeExtra = (i, ei) =>
    update(i, {
      serviciosExtras: (value[i].serviciosExtras || []).filter((_, idx) => idx !== ei),
    });

  return (
    <section className={styles.card}>
      <div className={styles.cardHead}>
        <h2 className={styles.cardTitle}>Chicas</h2>
        <button className={styles.btnPrimary} onClick={onSave} disabled={saving}>
          {saving ? "Guardando..." : "Guardar"}
        </button>
      </div>

      {value.map((c, i) => (
        <div key={i} className={styles.chica}>
          <div className={styles.chicaHead}>
            <input
              className={styles.input}
              value={c.nombre}
              onChange={(e) => update(i, { nombre: e.target.value })}
              placeholder="Nombre"
            />
            <input
              className={styles.input}
              value={c.slug}
              onChange={(e) => update(i, { slug: e.target.value })}
              placeholder="slug"
              style={{ maxWidth: 180 }}
            />
            <button
              type="button"
              className={c.disponible ? styles.badgeOn : styles.badgeOff}
              onClick={() => update(i, { disponible: !c.disponible })}
            >
              {c.disponible ? "Disponible" : "No disponible"}
            </button>
            <button
              type="button"
              className={styles.btnDanger}
              onClick={() => removeChica(i)}
              aria-label="Eliminar chica"
            >
              ×
            </button>
          </div>

          <div className={styles.chicaFotos}>
            <figure className={styles.thumb}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.img} alt="" />
              <figcaption className={styles.thumbCaption}>Foto principal</figcaption>
              <label className={styles.thumbBtn}>
                Cambiar
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) uploadImg(i, f, "img");
                    e.target.value = "";
                  }}
                />
              </label>
            </figure>

            <div className={styles.galeria}>
              <p className={styles.muted}>Galería</p>
              <div className={styles.thumbs}>
                {(c.galeria || []).map((g, gi) => (
                  <figure key={`${g}-${gi}`} className={styles.thumbSmall}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={g} alt="" />
                    <button
                      className={styles.thumbRemove}
                      onClick={() =>
                        update(i, {
                          galeria: (c.galeria || []).filter((_, x) => x !== gi),
                        })
                      }
                      aria-label="Quitar foto"
                    >
                      ×
                    </button>
                  </figure>
                ))}
                <label className={styles.addThumb}>
                  + Foto
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) uploadImg(i, f, "gal");
                      e.target.value = "";
                    }}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className={styles.extras}>
            <p className={styles.muted}>Servicios adicionales</p>
            {(c.serviciosExtras || []).map((e, ei) => (
              <div key={ei} className={styles.row}>
                <input
                  className={styles.input}
                  value={e.servicio}
                  onChange={(ev) => updateExtra(i, ei, "servicio", ev.target.value)}
                  placeholder="Servicio"
                />
                <input
                  className={styles.input}
                  value={e.precio}
                  onChange={(ev) => updateExtra(i, ei, "precio", ev.target.value)}
                  placeholder="Precio"
                  style={{ maxWidth: 120 }}
                />
                <button
                  className={styles.btnDanger}
                  onClick={() => removeExtra(i, ei)}
                  aria-label="Quitar servicio adicional"
                >
                  ×
                </button>
              </div>
            ))}
            <button className={styles.btnGhost} onClick={() => addExtra(i)}>
              + Añadir servicio adicional
            </button>
          </div>
        </div>
      ))}

      <button className={styles.btnGhost} onClick={addChica}>
        + Añadir chica
      </button>
    </section>
  );
}

/* ============ Eventos ============ */

function EventosEditor({ value, onChange, onSave, saving }) {
  const update = (i, field, v) =>
    onChange(value.map((e, idx) => (idx === i ? { ...e, [field]: v } : e)));

  return (
    <section className={styles.card}>
      <div className={styles.cardHead}>
        <h2 className={styles.cardTitle}>Eventos</h2>
        <button className={styles.btnPrimary} onClick={onSave} disabled={saving}>
          {saving ? "Guardando..." : "Guardar"}
        </button>
      </div>

      {value.map((e, i) => (
        <div key={e.id || i} className={styles.evento}>
          <div className={styles.row}>
            <input
              className={styles.input}
              value={e.titulo}
              onChange={(x) => update(i, "titulo", x.target.value)}
              placeholder="Título"
            />
            <input
              className={styles.input}
              value={e.fecha}
              onChange={(x) => update(i, "fecha", x.target.value)}
              placeholder="Fecha"
              style={{ maxWidth: 150 }}
            />
            <button
              className={styles.btnDanger}
              onClick={() => onChange(value.filter((_, idx) => idx !== i))}
              aria-label="Eliminar evento"
            >
              ×
            </button>
          </div>
          <input
            className={styles.input}
            value={e.lugar}
            onChange={(x) => update(i, "lugar", x.target.value)}
            placeholder="Lugar"
          />
          <input
            className={styles.input}
            value={e.descripcion}
            onChange={(x) => update(i, "descripcion", x.target.value)}
            placeholder="Descripción"
          />
        </div>
      ))}

      <button
        className={styles.btnGhost}
        onClick={() =>
          onChange([...value, { titulo: "", fecha: "", lugar: "", descripcion: "" }])
        }
      >
        + Añadir evento
      </button>
    </section>
  );
}
