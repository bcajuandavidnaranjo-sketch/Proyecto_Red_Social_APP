import { useState } from "react";

export default function GruposPage() {
  const [busqueda, setBusqueda] = useState("");
  const [misGrupos, setMisGrupos] = useState([
    { id: 1, nombre: "Diseñadores UI/UX", miembros: "1.2k", novedades: "15 publicaciones nuevas", avatar: "https://www.w3schools.com/w3images/avatar2.png" },
    { id: 2, nombre: "Desarrollo Web", miembros: "3.4k", novedades: "8 publicaciones nuevas", avatar: "https://www.w3schools.com/w3images/avatar5.png" },
    { id: 3, nombre: "Fotografía Creativa", miembros: "856", novedades: "3 publicaciones nuevas", avatar: "https://www.w3schools.com/w3images/avatar6.png" },
  ]);

  const [sugeridos, setSugeridos] = useState([
    { id: 4, nombre: "Viajeros del mundo", miembros: "5.1k", img: "https://www.w3schools.com/w3images/forest.jpg" },
    { id: 5, nombre: "Tecnología y gadgets", miembros: "8.2k", img: "https://www.w3schools.com/w3images/lights.jpg" },
    { id: 6, nombre: "Cocina fácil", miembros: "2.7k", img: "https://www.w3schools.com/w3images/nature.jpg" },
  ]);

  function unirseAGrupo(grupo) {
    setSugeridos((prev) => prev.filter((g) => g.id !== grupo.id));
    setMisGrupos((prev) => [
      ...prev,
      {
        id: grupo.id,
        nombre: grupo.nombre,
        miembros: grupo.miembros,
        novedades: "Recién unido",
        avatar: grupo.img,
      },
    ]);
  }

  const gruposFiltrados = misGrupos.filter((g) =>
    g.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="w3-container w3-content" style={{ maxWidth: 1200, marginTop: 80 }}>
      <div className="w3-row-padding">
        {/* Columna izquierda: Mis grupos */}
        <div className="w3-col m6">
          <div className="w3-card w3-round w3-white">
            <div className="w3-container w3-padding-16 w3-theme-d2">
              <h3>
                <i className="fa fa-group w3-margin-right"></i>Mis grupos
              </h3>
            </div>
            <ul className="w3-ul">
              {gruposFiltrados.map((grupo) => (
                <li key={grupo.id} className="w3-padding-16">
                  <img
                    src={grupo.avatar}
                    className="w3-left w3-circle w3-margin-right"
                    style={{ width: 50, height: 50, objectFit: "cover" }}
                    alt={grupo.nombre}
                  />
                  <span className="w3-large">{grupo.nombre}</span>
                  <br />
                  <span className="w3-opacity">
                    {grupo.miembros} miembros · {grupo.novedades}
                  </span>
                  <button type="button" className="w3-button w3-small w3-theme-d2 w3-right w3-round">
                    Ver grupo
                  </button>
                </li>
              ))}
              {gruposFiltrados.length === 0 && (
                <li className="w3-padding-16 w3-center w3-text-grey">
                  No se encontraron grupos con "{busqueda}".
                </li>
              )}
            </ul>
            <div className="w3-container w3-padding-16">
              <button type="button" className="w3-button w3-block w3-theme-l1 w3-round">
                <i className="fa fa-plus w3-margin-right"></i>Crear nuevo grupo
              </button>
            </div>
          </div>
        </div>

        {/* Columna derecha: Grupos sugeridos y búsqueda */}
        <div className="w3-col m6">
          <div className="w3-card w3-round w3-white">
            <div className="w3-container w3-padding-16 w3-theme-d1">
              <h3>
                <i className="fa fa-star w3-margin-right"></i>Grupos sugeridos
              </h3>
            </div>
            <ul className="w3-ul">
              {sugeridos.map((sug) => (
                <li key={sug.id} className="w3-padding-16">
                  <img
                    src={sug.img}
                    className="w3-left w3-circle w3-margin-right"
                    style={{ width: 50, height: 50, objectFit: "cover" }}
                    alt={sug.nombre}
                  />
                  <span className="w3-large">{sug.nombre}</span>
                  <br />
                  <span className="w3-opacity">{sug.miembros} miembros</span>
                  <button
                    type="button"
                    onClick={() => unirseAGrupo(sug)}
                    className="w3-button w3-small w3-green w3-right w3-round"
                  >
                    <i className="fa fa-plus w3-margin-right"></i>Unirse
                  </button>
                </li>
              ))}
              {sugeridos.length === 0 && (
                <li className="w3-padding-16 w3-center w3-text-grey">
                  ¡Te has unido a todos los grupos sugeridos!
                </li>
              )}
            </ul>
          </div>

          <br />

          {/* Buscar grupos */}
          <div className="w3-card w3-round w3-white">
            <div className="w3-container w3-padding-16">
              <h4>Buscar grupos</h4>
              <input
                className="w3-input w3-border w3-round"
                type="text"
                placeholder="Nombre del grupo..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
