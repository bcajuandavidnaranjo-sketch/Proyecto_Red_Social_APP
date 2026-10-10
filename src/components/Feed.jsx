import { useState } from "react";
import { useSocial } from "./SocialContext";
import Post from "./Post";

// Componente de formulario de Búsqueda de Publicaciones (Criterio 5.0)
function PostSearchBar({ busqueda, setBusqueda }) {
  return (
    <div className="w3-row-padding w3-margin-bottom">
      <div className="w3-col m12">
        <div className="w3-card w3-round w3-white w3-padding">
          <form onSubmit={(e) => e.preventDefault()} className="w3-row">
            <div className="w3-col s10">
              <input
                type="text"
                className="w3-input w3-border w3-round"
                placeholder="🔍 Buscar publicaciones por texto o autor..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
            <div className="w3-col s2 w3-center">
              {busqueda ? (
                <button
                  type="button"
                  onClick={() => setBusqueda("")}
                  className="w3-button w3-text-red w3-hover-none w3-small"
                  title="Limpiar búsqueda"
                >
                  <i className="fa fa-times w3-margin-right"></i>Limpiar
                </button>
              ) : (
                <span className="w3-text-grey w3-small" style={{ lineHeight: "38px" }}>
                  <i className="fa fa-search"></i>
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function StatusComposer() {
  const { agregarPublicacion } = useSocial();
  const [textoPublicacion, setTextoPublicacion] = useState("");

  function manejarEnvioPublicacion(evento) {
    evento.preventDefault();
    if (!textoPublicacion.trim()) return;
    agregarPublicacion(textoPublicacion);
    setTextoPublicacion("");
  }

  function manejarPresionarTecla(evento) {
    if (evento.key === "Enter" && !evento.shiftKey) {
      evento.preventDefault();
      manejarEnvioPublicacion(evento);
    }
  }

  return (
    <div className="w3-row-padding w3-margin-bottom">
      <div className="w3-col m12">
        <div className="w3-card w3-round w3-white">
          <form className="w3-container w3-padding" onSubmit={manejarEnvioPublicacion}>
            <h6 className="w3-opacity">Comparte un nuevo estado</h6>
            <textarea
              className="w3-border w3-padding status-input"
              value={textoPublicacion}
              onChange={(evento) => setTextoPublicacion(evento.target.value)}
              onKeyDown={manejarPresionarTecla}
              placeholder="¿Qué estás pensando hoy?"
              rows={2}
            />
            <button type="submit" className="w3-button w3-theme w3-margin-top w3-round">
              <i className="fa fa-pencil w3-margin-right"></i>Publicar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function Feed() {
  const { publicaciones } = useSocial();
  const [busqueda, setBusqueda] = useState("");

  // Filtrado reactivo en tiempo real con formulario controlado (Criterio 5.0)
  const publicacionesFiltradas = publicaciones.filter((item) => {
    const texto = (item.text || "").toLowerCase();
    const autor = (item.author?.name || "").toLowerCase();
    const consulta = busqueda.toLowerCase().trim();
    return texto.includes(consulta) || autor.includes(consulta);
  });

  return (
    <div className="w3-col m7">
      {/* Buscador de posts */}
      <PostSearchBar busqueda={busqueda} setBusqueda={setBusqueda} />

      {/* Formulario para publicar nuevo estado */}
      <StatusComposer />

      {/* Lista de posts filtrados */}
      {publicacionesFiltradas.length > 0 ? (
        publicacionesFiltradas.map((publicacionItem) => (
          <Post key={publicacionItem.id} post={publicacionItem} />
        ))
      ) : (
        <div className="w3-container w3-card w3-white w3-round w3-padding-24 w3-center">
          <p className="w3-text-grey">
            <i className="fa fa-search w3-large w3-margin-right"></i>
            No se encontraron publicaciones que coincidan con "<strong>{busqueda}</strong>".
          </p>
          <button
            type="button"
            className="w3-button w3-theme-d1 w3-round w3-small"
            onClick={() => setBusqueda("")}
          >
            Ver todas las publicaciones
          </button>
        </div>
      )}
    </div>
  );
}
