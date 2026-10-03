import { useEffect, useRef, useState } from "react";
import { useSocial } from "./SocialContext";

export default function ShareButton({ post }) {
  const { alternarCompartir } = useSocial();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [mensajeEstado, setMensajeEstado] = useState("");
  const referenciaContenedor = useRef(null);
  const enlacePublicacion = `${window.location.origin}${window.location.pathname}#${post.id}`;

  // Cerrar el menú al hacer clic fuera del componente
  useEffect(() => {
    if (!menuAbierto) return;
    function manejarClickAfuera(eventoClick) {
      if (referenciaContenedor.current && !referenciaContenedor.current.contains(eventoClick.target)) {
        setMenuAbierto(false);
      }
    }
    document.addEventListener("mousedown", manejarClickAfuera);
    return () => document.removeEventListener("mousedown", manejarClickAfuera);
  }, [menuAbierto]);

  // Ocultar mensaje de confirmación tras 2 segundos
  useEffect(() => {
    if (!mensajeEstado) return;
    const temporizadorMensaje = setTimeout(() => setMensajeEstado(""), 2000);
    return () => clearTimeout(temporizadorMensaje);
  }, [mensajeEstado]);

  function compartirEnMuro() {
    alternarCompartir(post.id);
    setMensajeEstado(post.shared ? "Share removed" : "Shared to your feed");
    setMenuAbierto(false);
  }

  async function copiarEnlacePublicacion() {
    try {
      await navigator.clipboard.writeText(enlacePublicacion);
      setMensajeEstado("Link copied!");
    } catch {
      setMensajeEstado("Could not copy the link");
    }
    setMenuAbierto(false);
  }

  async function compartirEnOtrasApps() {
    setMenuAbierto(false);
    try {
      await navigator.share({
        title: `Post by ${post.author.name}`,
        text: post.text,
        url: enlacePublicacion,
      });
    } catch {
      // Diálogo de compartir cancelado por el usuario
    }
  }

  return (
    <div ref={referenciaContenedor} className="w3-dropdown-click share-button">
      <button
        type="button"
        className={`w3-button ${post.shared ? "w3-theme-d4" : "w3-theme-d3"}`}
        onClick={() => setMenuAbierto(!menuAbierto)}
        aria-expanded={menuAbierto}
      >
        <i className="fa fa-share"></i>  {post.shared ? "Shared" : "Share"} ({post.shares ?? 0})
      </button>
      <div
        className={`w3-dropdown-content w3-bar-block w3-card-4 ${menuAbierto ? "w3-show" : ""}`}
        style={{ minWidth: 200 }}
      >
        <button type="button" className="w3-bar-item w3-button" onClick={compartirEnMuro}>
          <i className="fa fa-retweet fa-fw w3-margin-right"></i>
          {post.shared ? "Undo share" : "Share to my feed"}
        </button>
        <button type="button" className="w3-bar-item w3-button" onClick={copiarEnlacePublicacion}>
          <i className="fa fa-link fa-fw w3-margin-right"></i>Copy link
        </button>
        {typeof navigator.share === "function" && (
          <button type="button" className="w3-bar-item w3-button" onClick={compartirEnOtrasApps}>
            <i className="fa fa-external-link fa-fw w3-margin-right"></i>Share via...
          </button>
        )}
      </div>
      {mensajeEstado && <span className="w3-small w3-opacity share-message">{mensajeEstado}</span>}
    </div>
  );
}
