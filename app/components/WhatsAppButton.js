import styles from "./WhatsAppButton.module.css";

// Cambia el número por el tuyo, en formato internacional sin "+" ni espacios.
// Ejemplo España: 34600111222 · México: 5215512345678
const NUMERO = "34600000000";
const MENSAJE = "Hola, me gustaría reservar una cita.";

export default function WhatsAppButton() {
  const url = `https://wa.me/${NUMERO}?text=${encodeURIComponent(MENSAJE)}`;

  return (
    <a
      href={url}
      className={styles.boton}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
    >
      <svg
        viewBox="0 0 32 32"
        className={styles.icono}
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.47 1.74 6.42L3.2 28.8l6.55-1.72a12.74 12.74 0 0 0 6.25 1.62h.01c7.06 0 12.8-5.74 12.8-12.8s-5.74-12.7-12.8-12.7zm0 23.04h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-3.88 1.02 1.04-3.78-.25-.4a10.62 10.62 0 0 1-1.63-5.65c0-5.87 4.78-10.64 10.66-10.64 2.85 0 5.52 1.11 7.53 3.13a10.57 10.57 0 0 1 3.12 7.53c0 5.87-4.78 10.65-10.66 10.65zm5.84-7.97c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.72.16-.21.32-.82 1.04-1 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.74-.99-2.38-.26-.62-.52-.54-.72-.55l-.61-.01c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.66 0 1.57 1.14 3.08 1.3 3.3.16.21 2.25 3.43 5.44 4.81.76.33 1.35.52 1.81.67.76.24 1.46.21 2 .13.61-.09 1.89-.77 2.16-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37z" />
      </svg>
    </a>
  );
}
