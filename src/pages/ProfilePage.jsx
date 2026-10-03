import { Link } from "react-router-dom";
import { useSocial } from "../components/SocialContext";
import Post from "../components/Post";

export default function ProfilePage() {
  const { usuarioActual, intereses, grupos, publicaciones } = useSocial();

  // Filtramos o mostramos publicaciones del autor
  const misPublicaciones = publicaciones.filter(
    (p) => p.author?.name === usuarioActual.name || p.author?.name === "John Doe"
  );

  return (
    <div className="w3-container w3-content" style={{ maxWidth: 1100, marginTop: 80 }}>
      {/* Banner / Cabecera de perfil */}
      <div className="w3-card w3-round w3-white w3-margin-bottom">
        <div className="w3-container w3-theme-l1 w3-padding-16 w3-round-top">
          <h2>
            <i className="fa fa-user-circle w3-margin-right"></i>
            Perfil de Usuario
          </h2>
        </div>

        <div className="w3-row-padding w3-padding-24">
          <div className="w3-col m4 w3-center">
            <img
              src={usuarioActual.avatar}
              className="w3-circle"
              style={{ height: 140, width: 140, border: "4px solid #fff", boxShadow: "0 2px 5px rgba(0,0,0,0.2)" }}
              alt={usuarioActual.name}
            />
            <h3 style={{ marginBottom: 4 }}>{usuarioActual.name}</h3>
            <p className="w3-text-grey" style={{ marginTop: 0 }}>
              {usuarioActual.handle}
            </p>
            <Link to="/" className="w3-button w3-theme-d1 w3-round w3-small">
              <i className="fa fa-arrow-left w3-margin-right"></i>Volver al Muro
            </Link>
          </div>

          <div className="w3-col m8">
            <div className="w3-container">
              <h4>Información Personal</h4>
              <ul className="w3-ul w3-border-0">
                <li>
                  <i className="fa fa-briefcase fa-fw w3-margin-right w3-text-theme"></i>
                  <strong>Ocupación:</strong> {usuarioActual.job}
                </li>
                <li>
                  <i className="fa fa-home fa-fw w3-margin-right w3-text-theme"></i>
                  <strong>Ubicación:</strong> {usuarioActual.location}
                </li>
                <li>
                  <i className="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme"></i>
                  <strong>Cumpleaños:</strong> {usuarioActual.birthday}
                </li>
              </ul>

              <hr />

              <h4>Intereses</h4>
              <p>
                {intereses.map((tag) => (
                  <span
                    key={tag}
                    className="w3-tag w3-small w3-theme-l2 w3-round w3-margin-right"
                    style={{ marginBottom: 6 }}
                  >
                    {tag}
                  </span>
                ))}
              </p>

              <hr />

              <h4>Mis Grupos</h4>
              <p>
                {grupos.map((g) => (
                  <span key={g} className="w3-tag w3-small w3-theme-d3 w3-round w3-margin-right">
                    <i className="fa fa-users w3-margin-right"></i>
                    {g}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Publicaciones del perfil */}
      <div className="w3-margin-top">
        <h3 className="w3-border-bottom w3-padding-16">
          <i className="fa fa-newspaper-o w3-margin-right"></i>Actividad y Publicaciones
        </h3>
        {misPublicaciones.length > 0 ? (
          misPublicaciones.map((post) => <Post key={post.id} post={post} />)
        ) : (
          <div className="w3-panel w3-pale-blue w3-round w3-padding-16">
            <p>Aún no has compartido publicaciones.</p>
          </div>
        )}
      </div>
    </div>
  );
}
