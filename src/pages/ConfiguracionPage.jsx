import { useState } from "react";
import { useSocial } from "../components/SocialContext";

export default function ConfiguracionPage() {
  const { usuarioActual } = useSocial();
  const [tabActiva, setTabActiva] = useState("General");
  const [nombre, setNombre] = useState(usuarioActual.name);
  const [email, setEmail] = useState("juandavid@email.com");
  const [bio, setBio] = useState("Diseñador UI/UX. Amante del café.");
  const [mensajeGuardado, setMensajeGuardado] = useState("");

  function guardarCambios(e) {
    e.preventDefault();
    setMensajeGuardado("¡Cambios guardados con éxito!");
    setTimeout(() => setMensajeGuardado(""), 3000);
  }

  return (
    <div className="w3-container w3-content" style={{ maxWidth: 1000, marginTop: 80 }}>
      <div className="w3-card w3-round w3-white">
        <div className="w3-container w3-padding-16 w3-theme-d2">
          <h2>
            <i className="fa fa-cogs w3-margin-right"></i>Configuración de la cuenta
          </h2>
        </div>

        {/* Pestañas */}
        <div className="w3-bar w3-theme-l4">
          <button
            type="button"
            className={`w3-bar-item w3-button ${tabActiva === "General" ? "w3-theme-d1" : ""}`}
            onClick={() => setTabActiva("General")}
          >
            General
          </button>
          <button
            type="button"
            className={`w3-bar-item w3-button ${tabActiva === "Privacidad" ? "w3-theme-d1" : ""}`}
            onClick={() => setTabActiva("Privacidad")}
          >
            Privacidad
          </button>
          <button
            type="button"
            className={`w3-bar-item w3-button ${tabActiva === "Notificaciones" ? "w3-theme-d1" : ""}`}
            onClick={() => setTabActiva("Notificaciones")}
          >
            Notificaciones
          </button>
        </div>

        {mensajeGuardado && (
          <div className="w3-panel w3-green w3-round w3-margin">
            <p>
              <i className="fa fa-check w3-margin-right"></i>
              {mensajeGuardado}
            </p>
          </div>
        )}

        {/* Pestaña: General */}
        {tabActiva === "General" && (
          <form onSubmit={guardarCambios} className="w3-container w3-padding-24">
            <h4>Información personal</h4>
            <div className="w3-section">
              <label><strong>Nombre</strong></label>
              <input
                className="w3-input w3-border w3-round"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="w3-section">
              <label><strong>Correo electrónico</strong></label>
              <input
                className="w3-input w3-border w3-round"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w3-section">
              <label><strong>Biografía</strong></label>
              <textarea
                className="w3-input w3-border w3-round"
                rows="3"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="w3-button w3-theme-d2 w3-round">
              <i className="fa fa-save w3-margin-right"></i>Guardar cambios
            </button>
          </form>
        )}

        {/* Pestaña: Privacidad */}
        {tabActiva === "Privacidad" && (
          <form onSubmit={guardarCambios} className="w3-container w3-padding-24">
            <h4>Privacidad y seguridad</h4>
            <div className="w3-section">
              <label><strong>¿Quién puede ver tu perfil?</strong></label>
              <select className="w3-select w3-border w3-round" defaultValue="Solo amigos">
                <option>Todos</option>
                <option>Solo amigos</option>
                <option>Solo yo</option>
              </select>
            </div>
            <div className="w3-section">
              <label><strong>¿Quién puede enviarte solicitudes de amistad?</strong></label>
              <select className="w3-select w3-border w3-round" defaultValue="Amigos de amigos">
                <option>Todos</option>
                <option>Amigos de amigos</option>
              </select>
            </div>
            <div className="w3-section">
              <label><strong>Cambiar contraseña</strong></label>
              <input className="w3-input w3-border w3-round" type="password" placeholder="Nueva contraseña" />
            </div>
            <button type="submit" className="w3-button w3-theme-d2 w3-round">
              <i className="fa fa-lock w3-margin-right"></i>Actualizar privacidad
            </button>
          </form>
        )}

        {/* Pestaña: Notificaciones */}
        {tabActiva === "Notificaciones" && (
          <form onSubmit={guardarCambios} className="w3-container w3-padding-24">
            <h4>Preferencias de notificaciones</h4>
            <div className="w3-section">
              <input className="w3-check" type="checkbox" defaultChecked />{" "}
              <label>Recibir notificaciones por correo</label>
            </div>
            <div className="w3-section">
              <input className="w3-check" type="checkbox" defaultChecked />{" "}
              <label>Notificaciones de nuevos mensajes</label>
            </div>
            <div className="w3-section">
              <input className="w3-check" type="checkbox" />{" "}
              <label>Notificaciones de cumpleaños</label>
            </div>
            <div className="w3-section">
              <input className="w3-check" type="checkbox" defaultChecked />{" "}
              <label>Notificaciones de grupos</label>
            </div>
            <button type="submit" className="w3-button w3-theme-d2 w3-round">
              <i className="fa fa-bell w3-margin-right"></i>Guardar preferencias
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
