// Devuelve el enlace de WhatsApp listo para abrir el chat.
//
// El número se guarda en data/site.json (editable desde /admin → Contacto),
// en formato internacional sin "+" ni espacios (ej: 34600111222).
export function whatsappUrl(numero, mensaje = "Hola, me gustaría reservar una cita.") {
  const limpio = String(numero || "").replace(/[^\d]/g, "");
  return `https://wa.me/${limpio}?text=${encodeURIComponent(mensaje)}`;
}
