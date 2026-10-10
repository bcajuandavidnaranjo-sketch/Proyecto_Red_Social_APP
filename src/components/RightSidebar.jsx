import { useState } from "react";
import { useSocial } from "./SocialContext";

// Buscador de amigos / usuarios (Criterio 5.0)
function FriendsSearch() {
  const [busqueda, setBusqueda] = useState("");
  const personas = [
    { id: 1, name: "Jane Doe", avatar: "https://www.w3schools.com/w3images/avatar5.png" },
    { id: 2, name: "Angie Jane", avatar: "https://www.w3schools.com/w3images/avatar6.png" },
    { id: 3, name: "John Doe", avatar: "https://www.w3schools.com/w3images/avatar2.png" },
  ];

  const personasFiltradas = personas.filter((p) =>
    p.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="w3-card w3-round w3-white w3-padding-16">
      <div className="w3-container">
        <p className="w3-margin-0">
          <i className="fa fa-search w3-margin-right"></i>
          <strong>Buscar Amigos</strong>
        </p>
        <input
          type="text"
          className="w3-input w3-border w3-round w3-margin-top w3-small"
          placeholder="Nombre de amigo..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <ul className="w3-ul w3-margin-top w3-small">
          {personasFiltradas.map((p) => (
            <li key={p.id} className="w3-padding-small">
              <img src={p.avatar} className="w3-circle w3-margin-right" style={{ width: 25 }} alt="" />
              <span>{p.name}</span>
            </li>
          ))}
          {personasFiltradas.length === 0 && (
            <li className="w3-text-grey w3-padding-small">No se encontraron amigos.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

function UpcomingEvents() {
  const { eventoProximo } = useSocial();
  return (
    <div className="w3-card w3-round w3-white w3-center">
      <div className="w3-container">
        <p>Upcoming Events:</p>
        <img src={eventoProximo.image} alt={eventoProximo.title} style={{ width: "100%" }} />
        <p><strong>{eventoProximo.title}</strong></p>
        <p>{eventoProximo.when}</p>
        <p><button type="button" className="w3-button w3-block w3-theme-l4">Info</button></p>
      </div>
    </div>
  );
}

function FriendRequests() {
  const { solicitudesAmistad, aceptarSolicitudAmistad, rechazarSolicitudAmistad } = useSocial();
  return (
    <div className="w3-card w3-round w3-white w3-center">
      <div className="w3-container">
        <p>Friend Request</p>
        {solicitudesAmistad.length === 0 && <p className="w3-opacity w3-small">No pending requests</p>}
        {solicitudesAmistad.map((solicitudItem) => (
          <div key={solicitudItem.id}>
            <img src={solicitudItem.avatar} alt="Avatar" style={{ width: "50%" }} />
            <br />
            <span>{solicitudItem.name}</span>
            <div className="w3-row w3-opacity">
              <div className="w3-half">
                <button
                  type="button"
                  className="w3-button w3-block w3-green w3-section"
                  title="Accept"
                  onClick={() => aceptarSolicitudAmistad(solicitudItem.id)}
                >
                  <i className="fa fa-check"></i>
                </button>
              </div>
              <div className="w3-half">
                <button
                  type="button"
                  className="w3-button w3-block w3-red w3-section"
                  title="Decline"
                  onClick={() => rechazarSolicitudAmistad(solicitudItem.id)}
                >
                  <i className="fa fa-remove"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RightSidebar() {
  return (
    <div className="w3-col m2">
      <FriendsSearch />
      <br />
      <UpcomingEvents />
      <br />
      <FriendRequests />
      <br />
      <div className="w3-card w3-round w3-white w3-padding-16 w3-center">
        <p>ADS</p>
      </div>
    </div>
  );
}
