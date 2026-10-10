import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSocial } from "../components/SocialContext";
import { authService } from "../services/authService";

export default function RegistroPage() {
  const { iniciarSesion } = useSocial();
  const navigate = useNavigate();

  // Estados del formulario controlado
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    fechaNacimiento: "1998-04-01",
    genero: "Hombre",
  });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setExito("");

    if (!formData.nombre.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError("Por favor completa los campos obligatorios (*).");
      return;
    }

    setCargando(true);

    try {
      // 1. Guardar el nuevo usuario en la base de datos MySQL (red_social_db -> tabla 'usuarios')
      const resultadoRegistro = await authService.registrarUsuario({
        nombre: formData.nombre,
        email: formData.email,
        password: formData.password,
        fechaNacimiento: formData.fechaNacimiento,
        genero: formData.genero,
      });

      if (!resultadoRegistro.success) {
        setCargando(false);
        setError(resultadoRegistro.error || "No se pudo registrar el usuario en la base de datos.");
        return;
      }

      setExito("¡Usuario guardado con éxito en la base de datos red_social_db (tabla usuarios)!");

      // 2. Iniciar sesión automáticamente consultando la base de datos
      const resultadoLogin = await authService.loginUsuario(formData.email, formData.password);
      setCargando(false);

      if (resultadoLogin.success) {
        iniciarSesion(resultadoLogin.user);
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1200);
      } else {
        // Si el registro fue exitoso pero el login automático tuvo algún detalle, redirigir al login
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 1500);
      }
    } catch (err) {
      setCargando(false);
      setError("Error al procesar el registro: " + err.message);
    }
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
            <div className="w3-panel w3-pale-red w3-border w3-border-red w3-round w3-padding-small">
              <p className="w3-small" style={{ margin: 0 }}>
                <i className="fa fa-exclamation-triangle w3-margin-right"></i>
                {error}
              </p>
            </div>
          )}

          {exito && (
            <div className="w3-panel w3-pale-green w3-border w3-border-green w3-round w3-padding-small">
              <p className="w3-small" style={{ margin: 0 }}>
                <i className="fa fa-check-circle w3-margin-right"></i>
                {exito}
              </p>
            </div>
          )}

          <div className="w3-section">
            <label>
              <i className="fa fa-user w3-margin-right"></i>Nombre completo *
            </label>
            <input
              className="w3-input w3-border w3-round"
              type="text"
              name="nombre"
              placeholder="Ej. Juan David Naranjo"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="w3-section">
            <label>
              <i className="fa fa-envelope w3-margin-right"></i>Correo electrónico *
            </label>
            <input
              className="w3-input w3-border w3-round"
              type="email"
              name="email"
              placeholder="alumno@cesde.edu.co"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="w3-section">
            <label>
              <i className="fa fa-lock w3-margin-right"></i>Contraseña *
            </label>
            <input
              className="w3-input w3-border w3-round"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
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
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
            />
          </div>

          <div className="w3-section">
            <label>
              <i className="fa fa-venus-mars w3-margin-right"></i>Género
            </label>
            <select
              className="w3-select w3-border w3-round"
              name="genero"
              value={formData.genero}
              onChange={handleChange}
            >
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div className="w3-section">
            <button
              type="submit"
              disabled={cargando}
              className="w3-button w3-theme-d2 w3-round w3-block w3-section w3-padding-large"
            >
              {cargando ? (
                <span>
                  <i className="fa fa-spinner fa-spin w3-margin-right"></i>Guardando en MySQL (red_social_db)...
                </span>
              ) : (
                <span>
                  <i className="fa fa-user-plus w3-margin-right"></i>Registrarse
                </span>
              )}
            </button>
          </div>

          <p className="w3-center w3-small">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="w3-text-theme">
              <strong>Inicia sesión aquí</strong>
            </Link>.
          </p>
        </form>
      </div>
    </div>
  );
}
