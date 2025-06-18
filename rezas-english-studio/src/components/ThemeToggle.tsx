import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-full bg-card border border-border hover:bg-accent transition-all duration-300 flex items-center justify-center group glow-effect"
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-foreground transition-transform duration-300 group-hover:scale-110" />
      ) : (
        <Sun className="h-5 w-5 text-foreground transition-transform duration-300 group-hover:scale-110 group-hover:rotate-90" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
