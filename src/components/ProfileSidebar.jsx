import { useState } from "react";
import { Link } from "react-router-dom";
import { useSocial } from "./SocialContext";

function ProfileCard() {
  const { usuarioActual } = useSocial();
  return (
    <div className="w3-card w3-round w3-white">
      <div className="w3-container">
        <h4 className="w3-center">My Profile</h4>
        <p className="w3-center">
          <img src={usuarioActual.avatar} className="w3-circle" style={{ height: 106, width: 106 }} alt="Avatar" />
        </p>
        <p className="w3-center"><b>{usuarioActual.name}</b></p>
        <div className="w3-center">
          <Link to="/profile" className="w3-button w3-theme-d1 w3-round w3-small w3-margin-bottom">
            <i className="fa fa-user w3-margin-right"></i>Ver Perfil
          </Link>
        </div>
        <hr />
        <p><i className="fa fa-pencil fa-fw w3-margin-right w3-text-theme"></i> {usuarioActual.job}</p>
        <p><i className="fa fa-home fa-fw w3-margin-right w3-text-theme"></i> {usuarioActual.location}</p>
        <p><i className="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme"></i> {usuarioActual.birthday}</p>
      </div>
    </div>
  );
}

function Accordion() {
  const { grupos } = useSocial();
  const [seccionesAbiertas, setSeccionesAbiertas] = useState([]);

  const alternarSeccion = (idSeccion) =>
    setSeccionesAbiertas((idsPrevios) =>
      idsPrevios.includes(idSeccion)
        ? idsPrevios.filter((identificador) => identificador !== idSeccion)
        : [...idsPrevios, idSeccion],
    );

  return (
    <div className="w3-card w3-round">
      <div className="w3-white">
        {grupos.map((grupoItem) => {
          const estaAbierto = seccionesAbiertas.includes(grupoItem.id);
          return (
            <div key={grupoItem.id}>
              <button
                type="button"
                onClick={() => alternarSeccion(grupoItem.id)}
                className={`w3-button w3-block w3-theme-l1 w3-left-align ${estaAbierto ? "w3-theme-d1" : ""}`}
              >
                <i className={`fa ${grupoItem.icon} fa-fw w3-margin-right`}></i> {grupoItem.title}
              </button>
              {estaAbierto && (
                <div className="w3-container">
                  {grupoItem.photos ? (
                    <div className="w3-row-padding">
                      <br />
                      {grupoItem.photos.map((urlFoto, indiceFoto) => (
                        <div key={indiceFoto} className="w3-half">
                          <img src={urlFoto} style={{ width: "100%" }} className="w3-margin-bottom" alt="" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>{grupoItem.text}</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Interests() {
  const { intereses } = useSocial();
  return (
    <div className="w3-card w3-round w3-white w3-hide-small">
      <div className="w3-container">
        <p>Interests</p>
        <p>
          {intereses.map((etiquetaInteres, indiceEtiqueta) => (
            <span key={indiceEtiqueta}>
              <span className={`w3-tag w3-small ${etiquetaInteres.theme}`}>{etiquetaInteres.label}</span>{" "}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

function AlertBox() {
  const { mostrarAlerta, ocultarAlerta } = useSocial();
  if (!mostrarAlerta) return null;
  return (
    <div className="w3-container w3-display-container w3-round w3-theme-l4 w3-border w3-theme-border w3-margin-bottom w3-hide-small">
      <span onClick={ocultarAlerta} className="w3-button w3-theme-l3 w3-display-topright">
        <i className="fa fa-remove"></i>
      </span>
      <p><strong>Hey!</strong></p>
      <p>People are looking at your profile. Find out who.</p>
    </div>
  );
}

export default function ProfileSidebar() {
  return (
    <div className="w3-col m3">
      <ProfileCard />
      <br />
      <Accordion />
      <br />
      <Interests />
      <br />
      <AlertBox />
    </div>
  );
}
