import { useEffect, useState } from "react";
import { geocodeCity, fetchForecast } from "../api/weather";

export function useWeather(city, unit) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [place, setPlace] = useState(null);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    if (!city) return;
    let cancelled = false;

    async function run() {
      try {
        setLoading(true);
        setError("");
        setPlace(null);
        setForecast(null);

        const p = await geocodeCity(city);
        const f = await fetchForecast({
          latitude: p.latitude,
          longitude: p.longitude,
          unit,
        });

        if (!cancelled) {
          setPlace(p);
          setForecast(f);
        }
      } catch (e) {
        if (!cancelled) setError(e?.message || "Unexpected error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [city, unit]);

  return { loading, error, place, forecast };
}
