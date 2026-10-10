import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/authService";

const SocialContext = createContext(null);
const CLAVE_ALMACENAMIENTO = "cavynet-posts-v2";
const obtenerUrlImagen = (nombreArchivo) => `https://www.w3schools.com/w3images/${nombreArchivo}`;

const usuarioActual = {
  name: "Juan David Naranjo",
  handle: "@juandavidnaranjo",
  avatar: obtenerUrlImagen("avatar3.png"),
  job: "Designer, UI",
  location: "London, UK",
  birthday: "April 1, 1988",
};

const publicacionesIniciales = [
  {
    id: "post-1",
    author: { name: "John Doe", avatar: obtenerUrlImagen("avatar2.png") },
    createdAt: "1 min",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    images: [
      { src: obtenerUrlImagen("lights.jpg"), alt: "Northern Lights" },
      { src: obtenerUrlImagen("nature.jpg"), alt: "Nature" },
    ],
    likes: 12,
    comments: [
      {
        id: "comment-1",
        author: "Jane Doe",
        avatar: obtenerUrlImagen("avatar5.png"),
        text: "Beautiful pictures!",
        likes: 2,
        replies: [],
      },
    ],
    liked: false,
    shared: false,
  },
  {
    id: "post-2",
    author: { name: "Jane Doe", avatar: obtenerUrlImagen("avatar5.png") },
    createdAt: "16 min",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    images: [],
    likes: 4,
    comments: [],
    liked: false,
    shared: false,
  },
  {
    id: "post-3",
    author: { name: "Angie Jane", avatar: obtenerUrlImagen("avatar6.png") },
    createdAt: "32 min",
    title: "Have you seen this?",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    featuredImage: { src: obtenerUrlImagen("nature.jpg"), alt: "Nature" },
    images: [],
    likes: 7,
    comments: [],
    liked: false,
    shared: false,
  },
];

const notificacionesIniciales = [
  "One new friend request",
  "John Doe posted on your wall",
  "Jane likes your post",
];

const gruposUsuario = [
  { id: "groups", icon: "fa-circle-o-notch", title: "My Groups", text: "Some text.." },
  { id: "events", icon: "fa-calendar-check-o", title: "My Events", text: "Some other text.." },
  {
    id: "photos",
    icon: "fa-users",
    title: "My Photos",
    photos: ["lights.jpg", "nature.jpg", "mountains.jpg", "forest.jpg", "nature.jpg", "snow.jpg"].map(obtenerUrlImagen),
  },
];

const interesesUsuario = [
  { label: "News", theme: "w3-theme-d5" },
  { label: "W3Schools", theme: "w3-theme-d4" },
  { label: "Labels", theme: "w3-theme-d3" },
  { label: "Games", theme: "w3-theme-d2" },
  { label: "Friends", theme: "w3-theme-d1" },
  { label: "Games", theme: "w3-theme" },
  { label: "Friends", theme: "w3-theme-l1" },
  { label: "Food", theme: "w3-theme-l2" },
  { label: "Design", theme: "w3-theme-l3" },
  { label: "Art", theme: "w3-theme-l4" },
  { label: "Photos", theme: "w3-theme-l5" },
];

const eventoProximo = {
  title: "Holiday",
  when: "Friday 15:00",
  image: obtenerUrlImagen("forest.jpg"),
};

const solicitudesAmistadIniciales = [
  { id: "req-1", name: "Jane Doe", avatar: obtenerUrlImagen("avatar6.png") },
];

function cargarPublicaciones() {
  try {
    const datosGuardados = localStorage.getItem(CLAVE_ALMACENAMIENTO);
    if (!datosGuardados) return publicacionesIniciales;
    const datosParseados = JSON.parse(datosGuardados);
    return Array.isArray(datosParseados) && datosParseados.length > 0
      ? datosParseados
      : publicacionesIniciales;
  } catch {
    return publicacionesIniciales;
  }
}

export function SocialProvider({ children }) {
  const [publicaciones, setPublicaciones] = useState(cargarPublicaciones);
  const [solicitudesAmistad, setSolicitudesAmistad] = useState(solicitudesAmistadIniciales);
  const [amigos, setAmigos] = useState([]);
  const [mostrarAlerta, setMostrarAlerta] = useState(true);
  const [usuarioActivo, setUsuarioActivo] = useState(authService.obtenerUsuarioActual);
  const [autenticado, setAutenticado] = useState(() => {
    try {
      const sesion = localStorage.getItem("red_social_auth");
      return sesion !== null ? sesion === "true" : true;
    } catch {
      return true;
    }
  });

  function iniciarSesion(datosUsuario = null) {
    setAutenticado(true);
    if (datosUsuario) {
      setUsuarioActivo(datosUsuario);
    } else {
      setUsuarioActivo(authService.obtenerUsuarioActual());
    }
    try {
      localStorage.setItem("red_social_auth", "true");
    } catch {
      // ignore
    }
  }

  function cerrarSesion() {
    authService.logout();
    setAutenticado(false);
  }

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(publicaciones));
    } catch {
      // storage unavailable (private mode, quota): keep in-memory state
    }
  }, [publicaciones]);

  function agregarPublicacion(textoPublicacion) {
    const textoLimpio = textoPublicacion.trim();
    if (!textoLimpio) return;
    setPublicaciones((listaActual = []) => [
      {
        id: `post-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        author: { name: usuarioActual.name, avatar: usuarioActual.avatar },
        createdAt: "Now",
        text: textoLimpio,
        images: [],
        likes: 0,
        comments: [],
        liked: false,
        shared: false,
        shares: 0,
      },
      ...listaActual,
    ]);
  }

  function alternarMeGusta(idPublicacion) {
    setPublicaciones((listaActual) =>
      listaActual.map((itemPublicacion) =>
        itemPublicacion.id === idPublicacion
          ? {
              ...itemPublicacion,
              liked: !itemPublicacion.liked,
              likes: (itemPublicacion.likes || 0) + (itemPublicacion.liked ? -1 : 1),
            }
          : itemPublicacion,
      ),
    );
  }

  function alternarCompartir(idPublicacion) {
    setPublicaciones((listaActual) =>
      listaActual.map((itemPublicacion) =>
        itemPublicacion.id === idPublicacion
          ? {
              ...itemPublicacion,
              shared: !itemPublicacion.shared,
              shares: (itemPublicacion.shares ?? 0) + (itemPublicacion.shared ? -1 : 1),
            }
          : itemPublicacion,
      ),
    );
  }

  function agregarComentario(idPublicacion, textoComentario, idComentarioPadre = null) {
    const textoLimpio = textoComentario.trim();
    if (!textoLimpio) return;
    setPublicaciones((listaActual) =>
      listaActual.map((itemPublicacion) => {
        if (itemPublicacion.id !== idPublicacion) return itemPublicacion;
        const nuevoComentario = {
          id: `comment-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          author: usuarioActual.name,
          avatar: usuarioActual.avatar,
          text: textoLimpio,
          likes: 0,
          replies: [],
        };
        const comentariosExistentes = Array.isArray(itemPublicacion.comments)
          ? itemPublicacion.comments
          : [];

        if (!idComentarioPadre) {
          return { ...itemPublicacion, comments: [...comentariosExistentes, nuevoComentario] };
        }
        return {
          ...itemPublicacion,
          comments: comentariosExistentes.map((comentarioItem) =>
            comentarioItem.id === idComentarioPadre
              ? {
                  ...comentarioItem,
                  replies: [...(Array.isArray(comentarioItem.replies) ? comentarioItem.replies : []), nuevoComentario],
                }
              : comentarioItem,
          ),
        };
      }),
    );
  }

  function alternarMeGustaComentario(idPublicacion, idComentario, idComentarioPadre = null) {
    setPublicaciones((listaActual) =>
      listaActual.map((itemPublicacion) => {
        if (itemPublicacion.id !== idPublicacion) return itemPublicacion;
        const actualizarComentario = (comentarioItem) =>
          comentarioItem.id === idComentario
            ? {
                ...comentarioItem,
                liked: !comentarioItem.liked,
                likes: (comentarioItem.likes || 0) + (comentarioItem.liked ? -1 : 1),
              }
            : comentarioItem;

        const comentariosExistentes = Array.isArray(itemPublicacion.comments)
          ? itemPublicacion.comments
          : [];

        return idComentarioPadre
          ? {
              ...itemPublicacion,
              comments: comentariosExistentes.map((comentarioItem) =>
                comentarioItem.id === idComentarioPadre
                  ? {
                      ...comentarioItem,
                      replies: (comentarioItem.replies || []).map(actualizarComentario),
                    }
                  : comentarioItem,
              ),
            }
          : { ...itemPublicacion, comments: comentariosExistentes.map(actualizarComentario) };
      }),
    );
  }

  function aceptarSolicitudAmistad(idSolicitud) {
    const solicitudEncontrada = solicitudesAmistad.find((item) => item.id === idSolicitud);
    if (solicitudEncontrada) setAmigos((listaAmigos) => [...listaAmigos, solicitudEncontrada]);
    setSolicitudesAmistad((listaSolicitudes) =>
      listaSolicitudes.filter((item) => item.id !== idSolicitud),
    );
  }

  function rechazarSolicitudAmistad(idSolicitud) {
    setSolicitudesAmistad((listaSolicitudes) =>
      listaSolicitudes.filter((item) => item.id !== idSolicitud),
    );
  }

  function ocultarAlerta() {
    setMostrarAlerta(false);
  }

  return (
    <SocialContext.Provider
      value={{
        publicaciones,
        usuarioActual: usuarioActivo,
        notificaciones: notificacionesIniciales,
        grupos: gruposUsuario,
        intereses: interesesUsuario,
        eventoProximo,
        solicitudesAmistad,
        amigos,
        mostrarAlerta,
        autenticado,
        iniciarSesion,
        cerrarSesion,
        isAuthenticated: autenticado,
        login: iniciarSesion,
        logout: cerrarSesion,
        agregarPublicacion,
        alternarMeGusta,
        alternarCompartir,
        agregarComentario,
        alternarMeGustaComentario,
        aceptarSolicitudAmistad,
        rechazarSolicitudAmistad,
        ocultarAlerta,

        // Alias retrocompatibles
        posts: publicaciones,
        currentUser: usuarioActivo,
        notifications: notificacionesIniciales,
        groups: gruposUsuario,
        interests: interesesUsuario,
        upcomingEvent: eventoProximo,
        friendRequests: solicitudesAmistad,
        friends: amigos,
        showAlert: mostrarAlerta,
        addPost: agregarPublicacion,
        toggleLike: alternarMeGusta,
        toggleShare: alternarCompartir,
        addComment: agregarComentario,
        likeComment: alternarMeGustaComentario,
        acceptFriend: aceptarSolicitudAmistad,
        declineFriend: rechazarSolicitudAmistad,
        dismissAlert: ocultarAlerta,
      }}
    >
      {children}
    </SocialContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSocial() {
  const contexto = useContext(SocialContext);
  if (!contexto) throw new Error("useSocial must be used inside <SocialProvider>");
  return contexto;
}
