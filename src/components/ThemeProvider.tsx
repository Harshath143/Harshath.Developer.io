import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Theme = "light" | "dark" | "ai";

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
  cycle: () => void;
}>({ theme: "dark", setTheme: () => {}, cycle: () => {} });

const ORDER: Theme[] = ["dark", "ai", "light"];
const STORAGE_KEY = "harshath-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY)) as Theme | null;
    if (stored && ORDER.includes(stored)) setThemeState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme === "light" ? "light" : "dark";
    try { localStorage.setItem(STORAGE_KEY, theme); } catch {}
  }, [theme]);

  const setTheme = (t: Theme) => setThemeState(t);
  const cycle = () => setThemeState((t) => ORDER[(ORDER.indexOf(t) + 1) % ORDER.length]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycle }}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
