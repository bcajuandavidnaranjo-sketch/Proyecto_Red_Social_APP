import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="w3-container w3-content w3-center" style={{ maxWidth: 600, marginTop: 120 }}>
      <div className="w3-card-4 w3-white w3-round w3-padding-32">
        <h1 className="w3-xxlarge w3-text-theme">
          <i className="fa fa-exclamation-triangle w3-margin-right"></i>
          Error 404
        </h1>
        <h3 className="w3-text-grey">La página que buscas no existe</h3>
        <p className="w3-padding-16">
          Verifica que la dirección web esté bien escrita o regresa a la página de inicio.
        </p>
        <Link to="/" className="w3-button w3-theme-d1 w3-round w3-padding-large">
          <i className="fa fa-home w3-margin-right"></i>
          Ir al Inicio
        </Link>
      </div>
    </div>
  );
}
