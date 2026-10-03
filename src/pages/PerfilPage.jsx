import { useState } from "react";
import { Link } from "react-router-dom";
import { useSocial } from "../components/SocialContext";

export default function PerfilPage() {
  const { usuarioActual, publicaciones, agregarPublicacion, alternarMeGusta } = useSocial();
  const [nuevoPost, setNuevoPost] = useState("");

  function handlePublicar(e) {
    e.preventDefault();
    if (!nuevoPost.trim()) return;
    agregarPublicacion(nuevoPost);
    setNuevoPost("");
  }

  return (
    <div className="w3-container w3-content" style={{ maxWidth: 1400, marginTop: 80 }}>
      <div className="w3-row">
        {/* Columna izquierda: info de perfil */}
        <div className="w3-col m3">
          <div className="w3-card w3-round w3-white">
            <div className="w3-container">
              <h4 className="w3-center">Mi perfil</h4>
              <p className="w3-center">
                <img
                  src={usuarioActual.avatar}
                  className="w3-circle"
                  style={{ height: 106, width: 106 }}
                  alt="Avatar"
                />
              </p>
              <h5 className="w3-center">
                <strong>{usuarioActual.name}</strong>
              </h5>
              <hr />
              <p>
                <i className="fa fa-pencil fa-fw w3-margin-right w3-text-theme"></i>
                {usuarioActual.job}
              </p>
              <p>
                <i className="fa fa-home fa-fw w3-margin-right w3-text-theme"></i>
                {usuarioActual.location}
              </p>
              <p>
                <i className="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme"></i>
                {usuarioActual.birthday}
              </p>
              <p>
                <i className="fa fa-users fa-fw w3-margin-right w3-text-theme"></i>
                1.2k seguidores · 345 siguiendo
              </p>
              <Link to="/configuracion" className="w3-button w3-block w3-theme-d2 w3-margin-bottom w3-round">
                <i className="fa fa-pencil w3-margin-right"></i>Editar perfil
              </Link>
            </div>
          </div>

          <br />

          {/* Fotos destacadas */}
          <div className="w3-card w3-round w3-white">
            <div className="w3-container w3-padding-16">
              <p>
                <i className="fa fa-camera w3-margin-right"></i>Fotos
              </p>
              <div className="w3-row-padding">
                <div className="w3-third">
                  <img
                    src="https://www.w3schools.com/w3images/lights.jpg"
                    style={{ width: "100%" }}
                    className="w3-margin-bottom w3-round"
                    alt="Luces"
                  />
                </div>
                <div className="w3-third">
                  <img
                    src="https://www.w3schools.com/w3images/nature.jpg"
                    style={{ width: "100%" }}
                    className="w3-margin-bottom w3-round"
                    alt="Naturaleza"
                  />
                </div>
                <div className="w3-third">
                  <img
                    src="https://www.w3schools.com/w3images/mountains.jpg"
                    style={{ width: "100%" }}
                    className="w3-margin-bottom w3-round"
                    alt="Montañas"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Columna central: publicaciones y actividad */}
        <div className="w3-col m7">
          <div className="w3-container">
            {/* Portada */}
            <div className="w3-card w3-round w3-white w3-margin-bottom">
              <img
                src="https://www.w3schools.com/w3images/forest.jpg"
                alt="Portada"
                style={{ width: "100%", maxHeight: 200, objectFit: "cover" }}
                className="w3-round-top"
              />
              <div className="w3-container w3-padding">
                <h3>
                  {usuarioActual.name}{" "}
                  <span className="w3-opacity w3-medium">{usuarioActual.handle}</span>
                </h3>
                <p>Diseñador UI/UX. Amante del café y la tecnología.</p>
              </div>
            </div>

            {/* Publicar estado */}
            <div className="w3-card w3-round w3-white w3-margin-bottom">
              <form onSubmit={handlePublicar} className="w3-container w3-padding">
                <h6 className="w3-opacity">¿Qué estás pensando?</h6>
                <input
                  type="text"
                  className="w3-input w3-border w3-round w3-padding"
                  placeholder="Comparte algo en tu perfil..."
                  value={nuevoPost}
                  onChange={(e) => setNuevoPost(e.target.value)}
                />
                <button
                  type="submit"
                  className="w3-button w3-theme w3-margin-top w3-round"
                >
                  <i className="fa fa-pencil w3-margin-right"></i>Publicar
                </button>
              </form>
            </div>

            {/* Publicaciones del Muro */}
            {publicaciones.map((post) => (
              <div key={post.id} className="w3-container w3-card w3-white w3-round w3-margin-bottom">
                <br />
                <img
                  src={post.author?.avatar || usuarioActual.avatar}
                  alt="Avatar"
                  className="w3-left w3-circle w3-margin-right"
                  style={{ width: 60 }}
                />
                <span className="w3-right w3-opacity">{post.createdAt}</span>
                <h4>{post.author?.name || usuarioActual.name}</h4>
                <br />
                <hr className="w3-clear" />
                <p>{post.text}</p>
                {post.featuredImage && (
                  <img
                    src={post.featuredImage.src}
                    style={{ width: "100%" }}
                    className="w3-margin-bottom w3-round"
                    alt=""
                  />
                )}
                {post.images && post.images.length > 0 && (
                  <div className="w3-row-padding" style={{ margin: "0 -16px" }}>
                    {post.images.map((img, i) => (
                      <div key={i} className="w3-half">
                        <img src={img.src} style={{ width: "100%" }} className="w3-margin-bottom w3-round" alt="" />
                      </div>
                    ))}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => alternarMeGusta(post.id)}
                  className={`w3-button ${
                    post.liked ? "w3-theme-d1" : "w3-theme-action"
                  } w3-margin-bottom w3-round`}
                >
                  <i className="fa fa-thumbs-up w3-margin-right"></i>
                  {post.likes} Me gusta
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Columna derecha */}
        <div className="w3-col m2">
          <div className="w3-card w3-round w3-white w3-center w3-padding-16">
            <p>
              <i className="fa fa-calendar w3-margin-right"></i>Próximos eventos
            </p>
            <p>
              <strong>Reunión de diseño</strong>
              <br />
              Viernes 15:00
            </p>
            <button type="button" className="w3-button w3-block w3-theme-l4 w3-round">
              Info
            </button>
          </div>
          <br />
          <div className="w3-card w3-round w3-white w3-padding-16 w3-center">
            <p className="w3-opacity">PUBLICIDAD</p>
            <p className="w3-small">CESDE Frontend 2 · React Router</p>
          </div>
        </div>
      </div>
    </div>
  );
}
