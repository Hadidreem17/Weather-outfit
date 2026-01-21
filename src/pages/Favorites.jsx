import { useContext } from "react";
import { AppContext } from "../context/AppProvider";
import { useNavigate } from "react-router-dom";

export default function Favorites() {
  const { favorites, setFavorites, setCity } = useContext(AppContext);
  const navigate = useNavigate();

  function openCity(name) {
    setCity(name);
    navigate("/forecast");
  }

  function removeCity(name) {
    setFavorites(favorites.filter((x) => x !== name));
  }

  return (
    <div className="stack">
      <div className="card">
        <h2>Favorites</h2>
        <p className="muted">Saved cities for quick access.</p>
      </div>

      {favorites.length === 0 ? (
        <div className="card">
          <p>No favorites yet.</p>
        </div>
      ) : (
        <div className="card">
          <ul className="list">
            {favorites.map((name) => (
              <li key={name} className="row-between">
                <button type="button" onClick={() => openCity(name)}>
                  {name}
                </button>
                <button type="button" className="danger" onClick={() => removeCity(name)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="row-between">
            <span className="muted small">Stored in LocalStorage.</span>
            <button type="button" className="danger" onClick={() => setFavorites([])}>
              Clear all
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
