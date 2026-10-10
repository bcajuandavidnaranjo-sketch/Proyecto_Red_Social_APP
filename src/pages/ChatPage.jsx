import { useState } from "react";

export default function ChatPage() {
  const [busquedaConversacion, setBusquedaConversacion] = useState("");
  const [mensajeTexto, setMensajeTexto] = useState("");
  const [conversaciones] = useState([
    { id: 1, nombre: "Jane Doe", ultimo: "Hola, ¿cómo estás?", hora: "10:30", avatar: "https://www.w3schools.com/w3images/avatar5.png", activa: true },
    { id: 2, nombre: "Angie Jane", ultimo: "¿Viste el nuevo proyecto?", hora: "Ayer", avatar: "https://www.w3schools.com/w3images/avatar6.png", activa: false },
    { id: 3, nombre: "John Doe", ultimo: "¡Claro! Quedó genial.", hora: "Ayer", avatar: "https://www.w3schools.com/w3images/avatar2.png", activa: false },
  ]);
  const [mensajes, setMensajes] = useState([
    { remitente: "Jane Doe", hora: "10:28", texto: "¡Hola! ¿Cómo va el diseño?", esMio: false },
    { remitente: "Tú", hora: "10:30", texto: "Muy bien, casi terminado. ¿Te gustó la última versión?", esMio: true },
    { remitente: "Jane Doe", hora: "10:32", texto: "Sí, está genial. Solo unos ajustes en los colores.", esMio: false },
  ]);

  function enviarMensaje(e) {
    e.preventDefault();
    if (!mensajeTexto.trim()) return;
    setMensajes((prev) => [
      ...prev,
      { remitente: "Tú", hora: "Ahora", texto: mensajeTexto.trim(), esMio: true },
    ]);
    setMensajeTexto("");
  }

  // Filtrado reactivo de conversaciones (Criterio 5.0)
  const conversacionesFiltradas = conversaciones.filter((c) =>
    c.nombre.toLowerCase().includes(busquedaConversacion.toLowerCase()) ||
    c.ultimo.toLowerCase().includes(busquedaConversacion.toLowerCase())
  );

  return (
    <div className="w3-container w3-content" style={{ maxWidth: 1200, marginTop: 80 }}>
      <div className="w3-row">
        {/* Lista de chats */}
        <div className="w3-col m4">
          <div className="w3-card w3-round w3-white">
            <div className="w3-container w3-padding-16 w3-theme-d2">
              <h4>
                <i className="fa fa-comments w3-margin-right"></i>Conversaciones
              </h4>
              <div className="w3-section">
                <input
                  className="w3-input w3-border w3-round"
                  type="text"
                  placeholder="🔍 Buscar contacto o mensaje..."
                  value={busquedaConversacion}
                  onChange={(e) => setBusquedaConversacion(e.target.value)}
                />
              </div>
            </div>
            <ul className="w3-ul w3-hoverable">
              {conversacionesFiltradas.map((c) => (
                <li key={c.id} className={`w3-padding-16 ${c.activa ? "w3-theme-l4" : ""}`}>
                  <img
                    src={c.avatar}
                    className="w3-left w3-circle w3-margin-right"
                    style={{ width: 50 }}
                    alt={c.nombre}
                  />
                  <span className="w3-large">{c.nombre}</span>
                  <br />
                  <span className="w3-opacity">{c.ultimo}</span>
                  <span className="w3-right w3-small w3-text-theme">{c.hora}</span>
                </li>
              ))}
              {conversacionesFiltradas.length === 0 && (
                <li className="w3-padding-16 w3-center w3-text-grey">
                  No se encontraron conversaciones con "{busquedaConversacion}".
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Ventana de chat activa */}
        <div className="w3-col m8">
          <div className="w3-card w3-round w3-white w3-margin-left">
            <div className="w3-container w3-padding-16 w3-theme-d2 w3-round-large">
              <h4>
                <img
                  src="https://www.w3schools.com/w3images/avatar5.png"
                  className="w3-circle w3-margin-right"
                  style={{ width: 40, verticalAlign: "middle" }}
                  alt="Jane"
                />
                Jane Doe <span className="w3-opacity w3-medium"> · Activa ahora</span>
              </h4>
            </div>
            <div className="w3-container w3-padding-16" style={{ height: 400, overflowY: "scroll" }}>
              {mensajes.map((msg, index) => (
                <div
                  key={index}
                  className={`w3-panel w3-round-large ${
                    msg.esMio
                      ? "w3-rightbar w3-border-green w3-theme-l4 w3-right"
                      : "w3-leftbar w3-border-blue w3-theme-l5"
                  }`}
                  style={{ maxWidth: "80%", clear: "both", marginBottom: 12 }}
                >
                  <p>
                    <strong>{msg.remitente}</strong> <span className="w3-opacity">{msg.hora}</span>
                  </p>
                  <p>{msg.texto}</p>
                </div>
              ))}
            </div>
            <div className="w3-container w3-padding-16 w3-border-top">
              <form onSubmit={enviarMensaje} className="w3-row">
                <div className="w3-col s9">
                  <input
                    className="w3-input w3-border w3-round"
                    type="text"
                    placeholder="Escribe un mensaje..."
                    value={mensajeTexto}
                    onChange={(e) => setMensajeTexto(e.target.value)}
                  />
                </div>
                <div className="w3-col s3">
                  <button type="submit" className="w3-button w3-theme-d2 w3-round w3-block">
                    <i className="fa fa-paper-plane w3-margin-right"></i>Enviar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
