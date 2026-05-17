"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {}
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Determine the starting theme from local storage or device preferences
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      applyThemeClass(storedTheme);
    } else {
      // Default to dark as requested (#0a0a0a)
      setTheme("dark");
      applyThemeClass("dark");
      localStorage.setItem("theme", "dark");
    }
    setMounted(true);
  }, []);

  const applyThemeClass = (currentTheme) => {
    if (currentTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    applyThemeClass(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Prevent hydration flicker by returning a placeholder or rendering children
  // but keep the markup stable.
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
