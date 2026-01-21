import { useContext, useMemo } from "react";
import { AppContext } from "../context/AppProvider";
import { useWeather } from "../hooks/useWeather";
import Loader from "../components/Loader";
import ErrorBox from "../components/ErrorBox";
import OutfitCard from "../components/OutfitCard";
import { getOutfitSuggestion, weatherMainToText } from "../utils/outfitRules";

export default function Forecast() {
  const { city, unit, setUnit, activity, setActivity, favorites, setFavorites } =
    useContext(AppContext);

  const { loading, error, place, forecast } = useWeather(city, unit);

  const view = useMemo(() => {
    if (!forecast) return null;
    const first = forecast.list?.[0];
    if (!first) return null;

    const temp = first.main.temp;
    const main = first.weather?.[0]?.main || "Clear";
    const desc = first.weather?.[0]?.description || "";
    const windSpeed = unit === "metric" ? first.wind.speed * 3.6 : first.wind.speed;

    const isRaining = ["Rain", "Drizzle", "Thunderstorm"].includes(main);

    const outfit = getOutfitSuggestion({
      temp,
      isRaining,
      windSpeed,
      unit,
      activity,
    });

    const tempLabel =
      unit === "metric" ? `${temp.toFixed(1)}°C` : `${temp.toFixed(1)}°F`;

    const windLabel =
      unit === "metric"
        ? `${windSpeed.toFixed(0)} km/h`
        : `${windSpeed.toFixed(0)} mph`;

    return {
      tempLabel,
      windLabel,
      condition: weatherMainToText(main),
      desc,
      outfit,
    };
  }, [forecast, unit, activity]);

  function toggleFavoriteCity() {
    const name = place?.name || city;
    const exists = favorites.includes(name);

    if (exists) setFavorites(favorites.filter((x) => x !== name));
    else setFavorites([...favorites, name]);
  }

  function activityLabel(a) {
    if (a === "work") return "Work";
    if (a === "sport") return "Sport";
    if (a === "outing") return "Outing";
    return "Casual";
  }

  return (
    <div className="stack">
      <div className="card row-between">
        <div>
          <h2>Forecast & Outfit</h2>
          <p className="muted">
            Current city: <strong>{city}</strong>
          </p>
        </div>

        <div className="row">
          <button
            type="button"
            className={unit === "metric" ? "btn-secondary" : ""}
            onClick={() => setUnit("metric")}
          >
            °C
          </button>
          <button
            type="button"
            className={unit === "imperial" ? "btn-secondary" : ""}
            onClick={() => setUnit("imperial")}
          >
            °F
          </button>
        </div>
      </div>

      <div className="card">
        <h3>Select activity</h3>
        <div className="row" style={{ flexWrap: "wrap" }}>
          <button
            type="button"
            className={activity === "casual" ? "btn-secondary" : ""}
            onClick={() => setActivity("casual")}
          >
            Casual
          </button>
          <button
            type="button"
            className={activity === "work" ? "btn-secondary" : ""}
            onClick={() => setActivity("work")}
          >
            Work
          </button>
          <button
            type="button"
            className={activity === "sport" ? "btn-secondary" : ""}
            onClick={() => setActivity("sport")}
          >
            Sport
          </button>
          <button
            type="button"
            className={activity === "outing" ? "btn-secondary" : ""}
            onClick={() => setActivity("outing")}
          >
            Outing
          </button>
        </div>
        <p className="muted small">Suggestions update based on your choice.</p>
      </div>

      {loading && <Loader text="Fetching forecast..." />}
      {error && <ErrorBox message={error} />}

      {place && view && (
        <>
          <div className="card">
            <h3>
              {place.name} — {place.country}
            </h3>

            <div className="grid">
              <div className="stat">
                <div className="label">Temperature</div>
                <div className="value">{view.tempLabel}</div>
              </div>
              <div className="stat">
                <div className="label">Wind</div>
                <div className="value">{view.windLabel}</div>
              </div>
              <div className="stat">
                <div className="label">Condition</div>
                <div className="value">{view.condition}</div>
              </div>
              <div className="stat">
                <div className="label">Description</div>
                <div className="value" style={{ fontSize: 14 }}>
                  {view.desc}
                </div>
              </div>
            </div>

            <div className="row-between">
              <button type="button" onClick={toggleFavoriteCity}>
                {favorites.includes(place.name) ? "Remove favorite" : "Add favorite"}
              </button>
              <span className="muted small">Saved in LocalStorage</span>
            </div>
          </div>

          <OutfitCard
            title={`Outfit suggestions (${activityLabel(activity)})`}
            items={view.outfit}
          />

          <div className="card">
            <h3>Next 5 slots (3-hour steps)</h3>
            <div className="forecast">
              {forecast.list.slice(0, 5).map((slot) => {
                const dt = slot.dt_txt;
                const t = slot.main.temp;
                const m = slot.weather?.[0]?.main || "Clear";

                return (
                  <div className="forecast-item" key={dt}>
                    <div className="label">{dt}</div>
                    <div className="value">
                      {unit === "metric" ? `${t.toFixed(0)}°C` : `${t.toFixed(0)}°F`} —{" "}
                      {weatherMainToText(m)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
