import { useState } from "react";
import { useSocial } from "./SocialContext";
import Post from "./Post";

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
    <div className="w3-row-padding">
      <div className="w3-col m12">
        <div className="w3-card w3-round w3-white">
          <form className="w3-container w3-padding" onSubmit={manejarEnvioPublicacion}>
            <h6 className="w3-opacity">Social Media template by w3.css</h6>
            <textarea
              className="w3-border w3-padding status-input"
              value={textoPublicacion}
              onChange={(evento) => setTextoPublicacion(evento.target.value)}
              onKeyDown={manejarPresionarTecla}
              placeholder="Status: Feeling Blue"
              rows={2}
            />
            <button type="submit" className="w3-button w3-theme">
              <i className="fa fa-pencil"></i>  Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function Feed() {
  const { publicaciones } = useSocial();
  return (
    <div className="w3-col m7">
      <StatusComposer />
      {publicaciones.map((publicacionItem) => (
        <Post key={publicacionItem.id} post={publicacionItem} />
      ))}
    </div>
  );
}
