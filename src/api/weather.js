const API_KEY = import.meta.env.VITE_OWM_API_KEY;

export async function geocodeCity(city) {
  if (!API_KEY) throw new Error("Missing API key. Set VITE_OWM_API_KEY in .env");

  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
    city
  )}&limit=1&appid=${API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to geocode city");
  const data = await res.json();

  if (!data || data.length === 0) throw new Error("City not found");

  const place = data[0];
  return {
    name: place.name,
    country: place.country,
    latitude: place.lat,
    longitude: place.lon,
  };
}

export async function fetchForecast({ latitude, longitude, unit }) {
  if (!API_KEY) throw new Error("Missing API key. Set VITE_OWM_API_KEY in .env");

  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch forecast");
  return res.json();
}
