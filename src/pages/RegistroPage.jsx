import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSocial } from "../components/SocialContext";

export default function RegistroPage() {
  const { iniciarSesion } = useSocial();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("1995-05-15");
  const [genero, setGenero] = useState("Hombre");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!nombre.trim() || !email.trim() || !password.trim()) {
      setError("Por favor completa todos los campos requeridos.");
      return;
    }
    iniciarSesion();
    navigate("/", { replace: true });
  }

  return (
    <div className="w3-container w3-content" style={{ maxWidth: 600, marginTop: 90 }}>
      <div className="w3-card-4 w3-round-xlarge w3-white">
        <div className="w3-container w3-theme-d2 w3-round-xlarge w3-padding-16">
          <h2 className="w3-center">
            <i className="fa fa-user-plus w3-margin-right"></i>Crear cuenta
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="w3-container w3-padding-24">
          {error && (
            <div className="w3-panel w3-red w3-round w3-padding-small">
              <p className="w3-small">{error}</p>
            </div>
          )}

          <div className="w3-section">
            <label>
              <i className="fa fa-user w3-margin-right"></i>Nombre completo
            </label>
            <input
              className="w3-input w3-border w3-round"
              type="text"
              placeholder="Juan David Naranjo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="w3-section">
            <label>
              <i className="fa fa-envelope w3-margin-right"></i>Correo electrónico
            </label>
            <input
              className="w3-input w3-border w3-round"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="w3-section">
            <label>
              <i className="fa fa-lock w3-margin-right"></i>Contraseña
            </label>
            <input
              className="w3-input w3-border w3-round"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="w3-section">
            <label>
              <i className="fa fa-calendar w3-margin-right"></i>Fecha de nacimiento
            </label>
            <input
              className="w3-input w3-border w3-round"
              type="date"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
            />
          </div>

          <div className="w3-section">
            <label>
              <i className="fa fa-venus-mars w3-margin-right"></i>Género
            </label>
            <select
              className="w3-select w3-border w3-round"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
            >
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div className="w3-section">
            <button
              type="submit"
              className="w3-button w3-theme-d2 w3-round w3-block w3-section w3-padding-large"
            >
              <i className="fa fa-user-plus w3-margin-right"></i>Registrarse
            </button>
          </div>

          <p className="w3-center">
            ¿Ya tienes cuenta? <Link to="/login"><strong>Inicia sesión</strong></Link>.
          </p>
        </form>
      </div>
    </div>
  );
}
