import {
  ArrowUpRight,
  Github,
  Linkedin,
  Moon,
  Plane,
  Sparkles,
  Store,
  Sun,
} from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

interface AppTile {
  name: string;
  tagline: string;
  description: string;
  href: string;
  icon: ReactNode;
  accent: string;
  status: string;
}

const APPS: AppTile[] = [
  {
    name: "Market",
    tagline: "Live prices & watchlists",
    description:
      "A personal market dashboard for tracking tickers, portfolios and daily movers at a glance.",
    href: "/Market/",
    icon: <Store size={22} />,
    accent: "#0e9f7a",
    status: "Live",
  },
  {
    name: "Travel",
    tagline: "Visa, expenses & itineraries",
    description:
      "Travel Command Center for planning visas, tracking spend and generating downloadable itineraries.",
    href: "/travel/",
    icon: <Plane size={22} />,
    accent: "#e24c4b",
    status: "Live",
  },
];

const STORAGE_KEY = "nihal-universe-theme";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <main className="universe">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">
            <Sparkles size={16} />
          </span>
          <div>
            <small>Personal workspace</small>
            <strong>Nihal Universe</strong>
          </div>
        </div>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          type="button"
        >
          {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          <span>{theme === "light" ? "Dark" : "Light"}</span>
        </button>
      </header>

      <section className="hero">
        <span className="eyebrow">
          <Sparkles size={14} /> Hey, I'm Nihal
        </span>
        <h1>
          A tiny universe of apps I build
          <br />
          for myself &mdash; and share for fun.
        </h1>
        <p>
          Everything here is a self-contained web app deployed on GitHub Pages.
          Pick a room and jump in.
        </p>
      </section>

      <section className="app-grid" aria-label="Apps">
        {APPS.map((app) => (
          <a
            className="app-card"
            href={app.href}
            key={app.name}
            style={{ ["--accent" as never]: app.accent }}
          >
            <div className="app-card-head">
              <span className="app-icon">{app.icon}</span>
              <span className="app-status">{app.status}</span>
            </div>
            <div className="app-card-body">
              <h2>{app.name}</h2>
              <small>{app.tagline}</small>
              <p>{app.description}</p>
            </div>
            <div className="app-card-foot">
              <span>Open app</span>
              <ArrowUpRight size={18} />
            </div>
          </a>
        ))}
      </section>

      <footer className="footer">
        <small>&copy; {new Date().getFullYear()} Nihal &middot; built with Vite + React</small>
        <div className="socials">
          <a
            aria-label="GitHub"
            href="https://github.com/nihal467"
            rel="noreferrer"
            target="_blank"
          >
            <Github size={16} />
            <span>github.com/nihal467</span>
          </a>
          <a
            aria-label="LinkedIn"
            href="https://www.linkedin.com/in/nihal467"
            rel="noreferrer"
            target="_blank"
          >
            <Linkedin size={16} />
            <span>linkedin.com/in/nihal467</span>
          </a>
        </div>
      </footer>
    </main>
  );
}

export default App;
