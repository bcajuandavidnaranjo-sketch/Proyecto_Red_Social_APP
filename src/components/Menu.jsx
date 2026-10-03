import { NavLink } from "react-router-dom";

export default function Menu() {
  const getActiveClass = ({ isActive }) =>
    `w3-bar-item w3-button w3-mobile ${
      isActive ? "w3-theme-d4 w3-text-white" : "w3-hover-light-grey"
    }`;

  return (
    <div className="w3-bar w3-white w3-card w3-round w3-margin-bottom w3-large">
      <NavLink to="/" className={getActiveClass}>
        <i className="fa fa-home w3-margin-right"></i>Inicio
      </NavLink>
      <NavLink to="/profile" className={getActiveClass}>
        <i className="fa fa-user w3-margin-right"></i>Perfil
      </NavLink>
      <NavLink to="/login" className={getActiveClass}>
        <i className="fa fa-sign-in w3-margin-right"></i>Login
      </NavLink>
      <NavLink to="/register" className={getActiveClass}>
        <i className="fa fa-user-plus w3-margin-right"></i>Registro
      </NavLink>
    </div>
  );
}
