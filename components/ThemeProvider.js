"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

// Supported country currencies with code, symbol, exchange rate, label, and flag
export const CURRENCIES = [
  { code: "USD", symbol: "$", rate: 1.0, label: "United States (USD)", flag: "🇺🇸" },
  { code: "INR", symbol: "₹", rate: 83.0, label: "India (INR)", flag: "🇮🇳" },
  { code: "EUR", symbol: "€", rate: 0.92, label: "Europe (EUR)", flag: "🇪🇺" },
  { code: "GBP", symbol: "£", rate: 0.79, label: "United Kingdom (GBP)", flag: "🇬🇧" }
];

const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
  currency: "USD",
  setCurrency: () => {},
  formatPrice: () => {},
  activeCurrencyObj: CURRENCIES[0],
  mounted: false
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  const [currency, setCurrencyState] = useState("USD");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 1. Permanently lock the application inside the sleek dark mode
    document.documentElement.classList.add("dark");
    setTheme("dark");
    localStorage.setItem("theme", "dark");

    // 2. Determine starting country/currency preference
    const storedCurrency = localStorage.getItem("currency");
    if (storedCurrency && CURRENCIES.some(c => c.code === storedCurrency)) {
      setCurrencyState(storedCurrency);
    } else {
      setCurrencyState("USD");
      localStorage.setItem("currency", "USD");
    }

    setMounted(true);
  }, []);

  const setCurrency = (code) => {
    if (CURRENCIES.some(c => c.code === code)) {
      setCurrencyState(code);
      localStorage.setItem("currency", code);
    }
  };

  const activeCurrencyObj = CURRENCIES.find(c => c.code === currency) || CURRENCIES[0];

  // Dynamic price formatter taking USD value and converting to local preferred base country currency
  const formatPrice = (usdPrice) => {
    if (usdPrice === null || usdPrice === undefined) return "N/A";
    const converted = (usdPrice * activeCurrencyObj.rate).toFixed(2);
    
    const formattedNum = parseFloat(converted).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    return `${activeCurrencyObj.symbol}${formattedNum}`;
  };

  // ToggleTheme is preserved as a simple no-op for backward compatibility
  const toggleTheme = () => {};

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        currency,
        setCurrency,
        formatPrice,
        activeCurrencyObj,
        mounted
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
