import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <div className="brand">WeatherOutfit</div>

        <nav className="links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
          <NavLink to="/forecast" className={({ isActive }) => (isActive ? "active" : "")}>
            Forecast
          </NavLink>
          <NavLink to="/favorites" className={({ isActive }) => (isActive ? "active" : "")}>
            Favorites
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
            About
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
