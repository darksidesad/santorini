# Santorini

Sitio web construido con [Next.js](https://nextjs.org/) (App Router).

## Características

- Página principal con imagen a pantalla completa y recortes superpuestos **estáticos** (los define el desarrollador en `app/page.js`, no el admin) que enlazan a `/catalogo`.
- Páginas individuales: `/chicas/aurora`, `/chicas/clio`, `/chicas/hebe` (las viejas URLs `/aurora`, `/clio`, `/hebe` redirigen automáticamente). En cada página, al tocar una foto se abre una **galería ampliada** con navegación (flechas, teclado y cierre con ESC o clic afuera).
- Catálogo con todas las disponibles: `/catalogo` (tocar una chica lleva a su página).
- Página de eventos: `/eventos`.
- Sección de servicios y mapa de Google.
- Botón flotante de WhatsApp.
- Diseño responsive con posicionamiento independiente de imágenes para móvil.
- **Panel de administración** en `/admin` para editar servicios, chicas, eventos, contacto y textos.

## Desarrollo

```bash
npm install
# Creá .env.local con la contraseña del admin (ver .env.example)
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Panel de administración (`/admin`)

Edita la mayoría del contenido del sitio **sin tocar código**:

- **Contacto**: número de WhatsApp, teléfono y dirección.
- **Servicios**: nombre, descripción, precio y duración (añadir/eliminar).
- **Chicas**: nombre, slug (URL), foto principal, galería, **indicador disponible/no disponible**
  y **servicios adicionales** (servicio + precio, añadir/eliminar por chica).
  Podés **añadir y eliminar chicas**; cada una se publica en `/chicas/slug`.
  Las que están "no disponibles" no aparecen en el catálogo.
- **Eventos**: título, fecha, lugar y descripción (añadir/eliminar).
- **Textos**: títulos y subtítulos de las secciones.

### Configurar la contraseña

Se lee de la variable de entorno `ADMIN_PASSWORD`. En producción configurala en el
panel de hosting (EasyPanel). En desarrollo usá un archivo `.env.local` (ver `.env.example`).

### Cómo se guardan los datos

Sin base de datos. Todo se escribe en archivos dentro del proyecto:

- `data/site.json` — contacto y textos
- `data/servicios.json` — servicios
- `data/chicas.json` — chicas (nombre, foto principal, galería, disponibles, servicios adicionales)
- `data/eventos.json` — eventos
- `public/uploads/` — imágenes subidas desde el admin

Las páginas usan render por pedido (`force-dynamic`), así los cambios del admin se ven al instante.

> **Importante (VPS):** los cambios se guardan en el disco del servidor. Si redesplegás
> el sitio y el deploy limpia el directorio, se pierde lo editado. Para que persista,
> montá un **volumen persistente** en EasyPanel sobre las carpetas `data/` y
> `public/uploads/` del proyecto.

## Producción

```bash
npm run build
npm start
```
