export default function About() {
  return (
    <div className="stack">
      <div className="card">
        <h2>About</h2>
        <p className="muted">
          WeatherOutfit is a React app that fetches weather data and suggests outfits based on
          temperature, rain, wind, and your activity.
        </p>
      </div>

      <div className="card">
        <h3>Tech</h3>
        <ul className="list">
          <li>React + Vite</li>
          <li>React Router (multi-page)</li>
          <li>Context API + Custom Hooks</li>
          <li>OpenWeatherMap APIs (Geocoding + Forecast)</li>
          <li>LocalStorage for persistence</li>
        </ul>
      </div>
    </div>
  );
}
