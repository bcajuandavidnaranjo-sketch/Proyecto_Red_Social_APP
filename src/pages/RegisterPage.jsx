import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSocial } from "../components/SocialContext";

export default function RegisterPage() {
  const { iniciarSesion } = useSocial();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!nombre.trim() || !email.trim() || !password.trim()) {
      setError("Por favor completa todos los campos.");
      return;
    }
    iniciarSesion();
    navigate("/", { replace: true });
  }

  return (
    <div className="w3-container w3-content" style={{ maxWidth: 500, marginTop: 90 }}>
      <div className="w3-card-4 w3-round w3-white">
        <div className="w3-container w3-theme-d2 w3-round-top w3-padding-16 w3-center">
          <h2>
            <i className="fa fa-user-plus w3-margin-right"></i>
            Crear Cuenta
          </h2>
          <p className="w3-small" style={{ margin: 0 }}>
            Únete a la Red Social CESDE
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w3-container w3-padding-24">
          {error && (
            <div className="w3-panel w3-red w3-round w3-padding-small">
              <p className="w3-small">{error}</p>
            </div>
          )}

          <div className="w3-section">
            <label>
              <strong>Nombre Completo:</strong>
            </label>
            <input
              type="text"
              className="w3-input w3-border w3-round"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej. Juan David Naranjo"
              required
            />
          </div>

          <div className="w3-section">
            <label>
              <strong>Correo Electrónico:</strong>
            </label>
            <input
              type="email"
              className="w3-input w3-border w3-round"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              required
            />
          </div>

          <div className="w3-section">
            <label>
              <strong>Contraseña:</strong>
            </label>
            <input
              type="password"
              className="w3-input w3-border w3-round"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w3-button w3-block w3-theme-d1 w3-round w3-margin-top w3-padding-large"
          >
            <i className="fa fa-check w3-margin-right"></i>
            Registrarme
          </button>

          <hr />

          <div className="w3-center w3-small">
            <p>
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="w3-text-theme">
                <strong>Inicia sesión aquí</strong>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
