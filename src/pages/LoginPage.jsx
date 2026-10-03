import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSocial } from "../components/SocialContext";

export default function LoginPage() {
  const { iniciarSesion } = useSocial();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("juandavid@email.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");

  const destino = location.state?.from?.pathname || "/";

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Por favor completa todos los campos.");
      return;
    }
    iniciarSesion();
    navigate(destino, { replace: true });
  }

  return (
    <div className="w3-container w3-content" style={{ maxWidth: 500, marginTop: 100 }}>
      <div className="w3-card-4 w3-round-xlarge w3-white">
        <div className="w3-container w3-theme-d2 w3-round-xlarge w3-padding-16">
          <h2 className="w3-center">
            <i className="fa fa-lock w3-margin-right"></i>Iniciar sesión
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="w3-container w3-padding-24">
          {location.state?.from && (
            <div className="w3-panel w3-pale-yellow w3-border w3-border-yellow w3-round">
              <p className="w3-small">
                <i className="fa fa-info-circle w3-margin-right"></i>
                Debes iniciar sesión para acceder a esta página.
              </p>
            </div>
          )}

          {error && (
            <div className="w3-panel w3-red w3-round w3-padding-small">
              <p className="w3-small">{error}</p>
            </div>
          )}

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
            <button
              type="submit"
              className="w3-button w3-theme-d2 w3-round w3-block w3-section w3-padding-large"
            >
              <i className="fa fa-sign-in w3-margin-right"></i>Acceder
            </button>
          </div>

          <p className="w3-center">
            <a href="#olvido" onClick={(e) => { e.preventDefault(); alert("Enlace de recuperación enviado."); }}>
              ¿Olvidaste tu contraseña?
            </a>
          </p>
          <p className="w3-center">
            ¿No tienes cuenta? <Link to="/registro"><strong>Regístrate aquí</strong></Link>.
          </p>
        </form>
      </div>
    </div>
  );
}
