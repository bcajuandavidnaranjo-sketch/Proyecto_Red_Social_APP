import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSocial } from "../components/SocialContext";
import { authService } from "../services/authService";

export default function LoginPage() {
  const { iniciarSesion } = useSocial();
  const navigate = useNavigate();
  const location = useLocation();

  // Estados del formulario controlado
  const [identificador, setIdentificador] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const destino = location.state?.from?.pathname || "/";

  // Manejo del envío del formulario (Submit)
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Validación básica de campos
    if (!identificador.trim() || !password.trim()) {
      setError("Por favor completa el correo y la contraseña.");
      return;
    }

    setCargando(true);

    try {
      // Autenticación en la base de datos MySQL (red_social_db -> tabla 'usuarios')
      const resultado = await authService.loginUsuario(identificador, password);

      setCargando(false);

      if (resultado.success) {
        iniciarSesion(resultado.user);
        navigate(destino, { replace: true });
      } else {
        setError(resultado.error || "Correo o contraseña incorrectos en la base de datos.");
      }
    } catch (err) {
      setCargando(false);
      setError("Error al iniciar sesión: " + err.message);
    }
  }

  return (
    <div className="w3-container w3-content" style={{ maxWidth: 500, marginTop: 100 }}>
      <div className="w3-card-4 w3-round-xlarge w3-white">
        {/* Cabecera */}
        <div className="w3-container w3-theme-d2 w3-round-xlarge w3-padding-16">
          <h2 className="w3-center">
            <i className="fa fa-lock w3-margin-right"></i>Iniciar sesión
          </h2>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="w3-container w3-padding-24">
          {/* Mensaje si venía de una ruta protegida */}
          {location.state?.from && (
            <div className="w3-panel w3-pale-yellow w3-border w3-border-yellow w3-round w3-padding-small">
              <p className="w3-small" style={{ margin: 0 }}>
                <i className="fa fa-info-circle w3-margin-right"></i>
                Debes iniciar sesión para acceder a esta página.
              </p>
            </div>
          )}

          {/* Mensaje de Error */}
          {error && (
            <div className="w3-panel w3-pale-red w3-border w3-border-red w3-round w3-padding-small">
              <p className="w3-small" style={{ margin: 0 }}>
                <i className="fa fa-exclamation-triangle w3-margin-right"></i>
                {error}
              </p>
            </div>
          )}

          {/* Campo Correo electrónico */}
          <div className="w3-section">
            <label>
              <i className="fa fa-envelope w3-margin-right"></i>Correo electrónico
            </label>
            <input
              type="email"
              className="w3-input w3-border w3-round"
              placeholder="tu@email.com"
              value={identificador}
              onChange={(e) => setIdentificador(e.target.value)}
              required
            />
          </div>

          {/* Campo Contraseña */}
          <div className="w3-section">
            <label>
              <i className="fa fa-lock w3-margin-right"></i>Contraseña
            </label>
            <input
              type="password"
              className="w3-input w3-border w3-round"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Botón de Acceder */}
          <div className="w3-section">
            <button
              type="submit"
              disabled={cargando}
              className="w3-button w3-theme-d2 w3-round w3-block w3-section w3-padding-large"
            >
              {cargando ? (
                <span>
                  <i className="fa fa-spinner fa-spin w3-margin-right"></i>Consultando MySQL...
                </span>
              ) : (
                <span>
                  <i className="fa fa-sign-in w3-margin-right"></i>Acceder
                </span>
              )}
            </button>
          </div>

          <p className="w3-center">
            <a
              href="#olvido"
              onClick={(e) => {
                e.preventDefault();
                alert("Se ha enviado un correo para restablecer la contraseña.");
              }}
            >
              ¿Olvidaste tu contraseña?
            </a>
          </p>

          <p className="w3-center">
            ¿No tienes cuenta?{" "}
            <Link to="/registro">
              <strong>Regístrate aquí</strong>
            </Link>.
          </p>
        </form>
      </div>
    </div>
  );
}
