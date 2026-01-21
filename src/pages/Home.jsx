import CitySearch from "../components/CitySearch";

export default function Home() {
  return (
    <div className="stack">
      <div className="hero card">
        <h1>Outfit Suggestions by Weather</h1>
        <p className="muted">
          Enter a city and get outfit suggestions based on temperature, rain, and wind.
        </p>
      </div>

      <CitySearch />

      <div className="card">
        <h3>How it works</h3>
        <ol className="list">
          <li>Geocode city name to coordinates.</li>
          <li>Fetch forecast from OpenWeatherMap.</li>
          <li>Apply outfit rules based on weather and activity.</li>
        </ol>
      </div>
    </div>
  );
}
