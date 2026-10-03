import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSocial } from "./SocialContext";

export default function Navbar() {
  const { usuarioActual, notificaciones, autenticado, cerrarSesion } = useSocial();
  const [menuMovilVisible, setMenuMovilVisible] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    cerrarSesion();
    navigate("/login");
  }

  // Clase para los enlaces del menú principal con resaltado cuando está activo
  const getNavClass = ({ isActive }) =>
    `w3-bar-item w3-button w3-padding-large ${
      isActive ? "w3-white w3-text-theme" : "w3-hover-white"
    }`;

  return (
    <>
      <div className="w3-top" style={{ zIndex: 100 }}>
        <div className="w3-bar w3-theme-d2 w3-left-align w3-large">
          {/* Botón menú móvil */}
          <button
            type="button"
            className="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2"
            onClick={() => setMenuMovilVisible(!menuMovilVisible)}
            aria-label="Menú"
          >
            <i className="fa fa-bars"></i>
          </button>

          {/* 1. Inicio / Logo */}
          <NavLink to="/" className={getNavClass} title="Inicio">
            <i className="fa fa-home w3-margin-right"></i>Logo
          </NavLink>

          {/* 2. Perfil */}
          <NavLink to="/perfil" className={getNavClass} title="Mi Perfil">
            <i className="fa fa-user"></i>
            <span className="w3-hide-small w3-hide-medium w3-margin-left">Perfil</span>
          </NavLink>

          {/* 3. Mensajes / Chat */}
          <NavLink to="/chat" className={getNavClass} title="Mensajes">
            <i className="fa fa-envelope"></i>
            <span className="w3-hide-small w3-hide-medium w3-margin-left">Mensajes</span>
          </NavLink>

          {/* 4. Grupos */}
          <NavLink to="/grupos" className={getNavClass} title="Grupos">
            <i className="fa fa-users"></i>
            <span className="w3-hide-small w3-hide-medium w3-margin-left">Grupos</span>
          </NavLink>

          {/* 5. Notificaciones */}
          <div className="w3-dropdown-hover w3-hide-small">
            <button type="button" className="w3-button w3-padding-large" title="Notificaciones">
              <i className="fa fa-bell"></i>
              <span className="w3-badge w3-right w3-small w3-green">{notificaciones.length}</span>
            </button>
            <div className="w3-dropdown-content w3-card-4 w3-bar-block" style={{ width: 300 }}>
              {notificaciones.map((notificacionTexto) => (
                <span key={notificacionTexto} className="w3-bar-item w3-button">
                  {notificacionTexto}
                </span>
              ))}
            </div>
          </div>

          {/* Sección Derecha */}
          <div className="w3-right">
            {autenticado ? (
              <>
                {/* 6. Configuración */}
                <NavLink to="/configuracion" className={getNavClass} title="Configuración">
                  <i className="fa fa-cog"></i>
                </NavLink>

                {/* Avatar y enlace al perfil */}
                <Link
                  to="/perfil"
                  className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"
                  title={`Mi cuenta (${usuarioActual.name})`}
                >
                  <img
                    src={usuarioActual.avatar}
                    className="w3-circle w3-margin-right"
                    style={{ height: 23, width: 23 }}
                    alt="Avatar"
                  />
                  <span className="w3-small">{usuarioActual.name}</span>
                </Link>

                {/* Botón Salir */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w3-bar-item w3-button w3-padding-large w3-hover-red"
                  title="Cerrar Sesión"
                >
                  <i className="fa fa-sign-out w3-margin-right"></i>
                  <span className="w3-hide-small">Salir</span>
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={getNavClass} title="Iniciar sesión">
                  <i className="fa fa-sign-in w3-margin-right"></i>Login
                </NavLink>
                <NavLink to="/registro" className={getNavClass} title="Registrarse">
                  <i className="fa fa-user-plus w3-margin-right"></i>Registro
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Menú para móviles */}
      <div
        className={`w3-bar-block w3-theme-d2 w3-hide-large w3-hide-medium w3-large ${
          menuMovilVisible ? "w3-show" : "w3-hide"
        }`}
        style={{ marginTop: 51 }}
      >
        <NavLink
          to="/"
          className="w3-bar-item w3-button w3-padding-large"
          onClick={() => setMenuMovilVisible(false)}
        >
          <i className="fa fa-home w3-margin-right"></i>Inicio
        </NavLink>
        <NavLink
          to="/perfil"
          className="w3-bar-item w3-button w3-padding-large"
          onClick={() => setMenuMovilVisible(false)}
        >
          <i className="fa fa-user w3-margin-right"></i>Mi Perfil
        </NavLink>
        <NavLink
          to="/chat"
          className="w3-bar-item w3-button w3-padding-large"
          onClick={() => setMenuMovilVisible(false)}
        >
          <i className="fa fa-envelope w3-margin-right"></i>Mensajes
        </NavLink>
        <NavLink
          to="/grupos"
          className="w3-bar-item w3-button w3-padding-large"
          onClick={() => setMenuMovilVisible(false)}
        >
          <i className="fa fa-users w3-margin-right"></i>Grupos
        </NavLink>
        <NavLink
          to="/configuracion"
          className="w3-bar-item w3-button w3-padding-large"
          onClick={() => setMenuMovilVisible(false)}
        >
          <i className="fa fa-cog w3-margin-right"></i>Configuración
        </NavLink>
        {autenticado ? (
          <button
            type="button"
            className="w3-bar-item w3-button w3-padding-large w3-left-align w3-hover-red"
            onClick={() => {
              setMenuMovilVisible(false);
              handleLogout();
            }}
          >
            <i className="fa fa-sign-out w3-margin-right"></i>Cerrar Sesión ({usuarioActual.name})
          </button>
        ) : (
          <>
            <NavLink
              to="/login"
              className="w3-bar-item w3-button w3-padding-large"
              onClick={() => setMenuMovilVisible(false)}
            >
              <i className="fa fa-sign-in w3-margin-right"></i>Iniciar sesión
            </NavLink>
            <NavLink
              to="/registro"
              className="w3-bar-item w3-button w3-padding-large"
              onClick={() => setMenuMovilVisible(false)}
            >
              <i className="fa fa-user-plus w3-margin-right"></i>Registrarse
            </NavLink>
          </>
        )}
      </div>
    </>
  );
}
