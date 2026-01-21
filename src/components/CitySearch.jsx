import { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider";
import { useNavigate } from "react-router-dom";

export default function CitySearch() {
  const { city, setCity } = useContext(AppContext);
  const [value, setValue] = useState(city);
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    setCity(trimmed);
    navigate("/forecast");
  }

  return (
    <form className="card" onSubmit={onSubmit}>
      <h2>Search a city</h2>
      <p className="muted">Type a city name (e.g., Amsterdam, Cairo, Berlin)</p>

      <div className="row">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="City name..."
        />
        <button type="submit">Show forecast</button>
      </div>
    </form>
  );
}
