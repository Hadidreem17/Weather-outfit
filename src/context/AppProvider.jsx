import { createContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [city, setCity] = useLocalStorage("wo_city", "Amsterdam");
  const [unit, setUnit] = useLocalStorage("wo_unit", "metric");
  const [activity, setActivity] = useLocalStorage("wo_activity", "casual");
  const [favorites, setFavorites] = useLocalStorage("wo_favorites", []);

  const value = useMemo(
    () => ({
      city,
      setCity,
      unit,
      setUnit,
      activity,
      setActivity,
      favorites,
      setFavorites,
    }),
    [city, unit, activity, favorites]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
