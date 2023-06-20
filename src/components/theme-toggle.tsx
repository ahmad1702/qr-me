"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

type Theme = "light" | "dark";
const prefersColorScheme = (): Theme => {
  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const getOppositeTheme = (theme: Theme) =>
  theme === "dark" ? "light" : "dark";

export function ThemeToggle({ className }: { className?: string }) {
  const applyTheme = (theme: Theme) => {
    const oppTheme = getOppositeTheme(theme);
    document.documentElement.classList.add(theme);
    document.documentElement.classList.remove(oppTheme);

    localStorage.setItem("theme", theme);
  };

  const toggleTheme = () => {
    const currentTheme = localStorage.getItem("theme");
    let themeToApply: Theme = "light";
    if (currentTheme === null) {
      themeToApply = prefersColorScheme();
    } else if (currentTheme === "light") {
      themeToApply = "dark";
    }

    applyTheme(themeToApply);
  };

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    let themeToApply: Theme = "light";
    if (currentTheme === null) {
      themeToApply = prefersColorScheme();
    } else if (currentTheme === "dark") {
      themeToApply = "dark";
    }

    applyTheme(themeToApply);
  }, []);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className={className}
    >
      <Icons.sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Icons.moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
