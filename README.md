# Red Social en React

Trabajo académico del curso **Frontend 2** en el **CESDE**.

El objetivo es reconstruir en React la plantilla estática [`plantilla-RedSocial.html`](plantilla-RedSocial.html) (plantilla "Social Media" de W3.CSS), dividiéndola en componentes reutilizables y manejando el estado global de la aplicación con **Context API**.

## Funcionalidades

- Barra de navegación con notificaciones y menú para móvil.
- Tarjeta de perfil, secciones desplegables (grupos, eventos, fotos), intereses y alerta descartable.
- Publicar estados nuevos en el feed.
- Dar "Me gusta" a publicaciones y comentarios.
- Comentar publicaciones y responder comentarios.
- Compartir publicaciones: en el propio muro, copiando el enlace o con el menú de compartir del sistema.
- Aceptar o rechazar solicitudes de amistad.
- Las publicaciones se guardan en el `localStorage` del navegador.

## Tecnologías

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/)
- [W3.CSS](https://www.w3schools.com/w3css/) y Font Awesome 4.7 (cargados por CDN en `index.html`)
- ESLint

## Estructura de carpetas

```
red-social/
├── index.html                 # HTML base: carga W3.CSS, fuentes e íconos por CDN
├── plantilla-RedSocial.html   # Plantilla original que se clonó
├── package.json               # Dependencias y scripts
├── vite.config.js             # Configuración de Vite
├── eslint.config.js           # Reglas de ESLint
├── public/                    # Archivos estáticos servidos tal cual (favicon, íconos)
└── src/
    ├── main.jsx               # Punto de entrada: monta <App /> en #root
    ├── App.jsx                # Envuelve todo en <SocialProvider> y arma el layout
    ├── index.css              # Estilos globales y ajustes sobre W3.CSS
    ├── assets/                # Imágenes importadas desde el código
    └── components/
        ├── SocialContext.jsx  # Contexto global: datos y acciones de la app
        ├── Navbar.jsx         # Barra superior, notificaciones y menú móvil
        ├── ProfileSidebar.jsx # Columna izquierda: perfil, acordeón, intereses, alerta
        ├── Feed.jsx           # Columna central: formulario de estado y lista de posts
        ├── Post.jsx           # Una publicación con likes y comentarios
        ├── ShareButton.jsx    # Botón y menú para compartir una publicación
        ├── RightSidebar.jsx   # Columna derecha: evento, solicitudes de amistad, anuncios
        └── Footer.jsx         # Pie de página
```

### Cómo fluyen los datos

`SocialContext.jsx` es el centro de la aplicación. `SocialProvider` guarda el estado (publicaciones, usuario actual, solicitudes de amistad, etc.) y las funciones que lo modifican (`addPost`, `toggleLike`, `toggleShare`, `addComment`, `likeComment`, `acceptFriend`...).

Cualquier componente accede a ellos con el hook `useSocial()`:

```jsx
const { posts, toggleLike } = useSocial();
```

Así ningún componente necesita recibir datos por props desde `App`, salvo `Post` y `ShareButton`, que reciben la publicación que deben mostrar.

## Cómo ejecutar el proyecto

### Requisitos

- [Node.js](https://nodejs.org/) 20.19 o superior (o 22.12+)
- npm (viene con Node.js)

### Pasos

1. Clonar el repositorio y entrar a la carpeta:

   ```bash
   git clone <url-del-repositorio>
   cd red-social
   ```

2. Instalar las dependencias:

   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abrir en el navegador la dirección que muestra la terminal (por defecto `http://localhost:5173`).

### Scripts disponibles

| Comando           | Descripción                                             |
| ----------------- | ------------------------------------------------------- |
| `npm run dev`     | Servidor de desarrollo con recarga automática           |
| `npm run build`   | Genera la versión de producción en la carpeta `dist/`   |
| `npm run preview` | Sirve localmente la versión generada con `build`        |
| `npm run lint`    | Revisa el código con ESLint                             |

> Nota: los estilos (W3.CSS, Font Awesome y Open Sans) se cargan desde internet, así que se necesita conexión para que la página se vea correctamente.

## Autor

JuanDavidNaranjo — Frontend 2, CESDE.
