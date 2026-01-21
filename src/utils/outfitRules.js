export function getOutfitSuggestion({ temp, isRaining, windSpeed, unit, activity }) {
  const isMetric = unit === "metric";
  const t = temp;
  const items = [];

  const add = (...x) => items.push(...x);

  if (isMetric) {
    if (t <= 5) add("Heavy coat", "Scarf", "Gloves");
    else if (t <= 12) add("Jacket", "Long pants");
    else if (t <= 20) add("Light hoodie", "Sneakers");
    else add("T-shirt", "Lightwear");
  } else {
    if (t <= 41) add("Heavy coat", "Scarf", "Gloves");
    else if (t <= 54) add("Jacket", "Long pants");
    else if (t <= 68) add("Light hoodie", "Sneakers");
    else add("T-shirt", "Lightwear");
  }

  if (isRaining) add("Umbrella", "Water-resistant shoes");
  if (windSpeed >= (isMetric ? 25 : 16)) add("Windbreaker layer");

  switch (activity) {
    case "work":
      add("Smart outfit", "Comfortable walking shoes");
      if (isRaining) add("Formal rain coat");
      break;
    case "sport":
      add("Sportswear", "Proper socks", "Cap");
      if (isMetric ? t <= 12 : t <= 54) add("Light sport jacket");
      if (isRaining) add("Light rain jacket");
      break;
    case "outing":
      add("Easy layering outfit", "Accessories");
      if (isMetric ? t <= 12 : t <= 54) add("Extra warm layer for indoors");
      break;
    default:
      add("Small day bag");
  }

  return Array.from(new Set(items));
}

export function weatherMainToText(main) {
  const map = {
    Clear: "Clear",
    Clouds: "Cloudy",
    Rain: "Rain",
    Drizzle: "Drizzle",
    Thunderstorm: "Thunderstorm",
    Snow: "Snow",
    Mist: "Misty",
    Fog: "Fog",
    Haze: "Haze",
    Smoke: "Smoke",
    Dust: "Dusty",
    Sand: "Sandy",
    Ash: "Ash",
    Squall: "Squall",
    Tornado: "Tornado",
  };
  return map[main] || "Variable";
}
