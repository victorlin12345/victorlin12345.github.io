"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import type { Lang } from "@/lib/i18n";

interface NavbarProps {
  onBooking: () => void;
}

const LANGS: { code: Lang; label: string }[] = [
  { code: "zh", label: "中文" },
  { code: "en", label: "EN" },
  { code: "ja", label: "日本語" },
];

function LangDropdown({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-[10px] tracking-[0.2em] text-white/50 hover:text-white transition-all duration-300 uppercase select-none"
      >
        {compact ? current.label.slice(0, 2) : current.label}
        <svg
          width="8"
          height="8"
          viewBox="0 0 8 8"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 2.5L4 5.5L7 2.5" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 bg-black/95 backdrop-blur-xl border border-white/10 py-1 min-w-[88px] z-50">
          {LANGS.map(({ code, label }) => (
            <button
              key={code}
              type="button"
              onClick={() => { setLang(code); setOpen(false); }}
              className={`block w-full text-left px-4 py-2 text-[10px] tracking-[0.2em] transition-colors duration-200 ${
                lang === code ? "text-white" : "text-white/40 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
      <circle cx="7" cy="7" r="2.5" />
      <line x1="7" y1="1" x2="7" y2="2.8" />
      <line x1="7" y1="11.2" x2="7" y2="13" />
      <line x1="1" y1="7" x2="2.8" y2="7" />
      <line x1="11.2" y1="7" x2="13" y2="7" />
      <line x1="2.9" y1="2.9" x2="4.1" y2="4.1" />
      <line x1="9.9" y1="9.9" x2="11.1" y2="11.1" />
      <line x1="11.1" y1="2.9" x2="9.9" y2="4.1" />
      <line x1="4.1" y1="9.9" x2="2.9" y2="11.1" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "切換淺色主題" : "切換深色主題"}
      className="text-white/50 hover:text-white transition-all duration-300 p-0.5"
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

export default function Navbar({ onBooking }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { theme } = useTheme();
  const logoFilter = theme === "dark" ? "brightness(0) invert(1)" : "brightness(0)";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { key: "nav.collections", href: "/collections" },
    { key: "nav.journal", href: "/bespoke" },
    { key: "nav.about", href: "/about" },
    { key: "nav.discover", href: "/discover" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-black/55 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">

        {/* Logo */}
        <a href="/" className="flex items-center gap-3 select-none">
          <Image
            src="/logo-icon.svg"
            alt="PAOYEE"
            width={40}
            height={40}
            className="object-contain"
            style={{ filter: logoFilter }}
            priority
          />
          <span className="hidden lg:block text-white/25 text-[8px] tracking-[0.3em] uppercase border-l border-white/10 pl-3">
            SINCE 1956
          </span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              className="text-white/50 hover:text-white text-[10px] tracking-[0.2em] transition-all duration-300 uppercase"
            >
              {t(key)}
            </a>
          ))}
        </div>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-5">
          <LangDropdown />
          <ThemeToggle />
          <div className="w-px h-4 bg-white/15" />
          <button
            type="button"
            onClick={onBooking}
            className="text-[10px] tracking-[0.2em] text-white border border-white/30 px-6 py-3 hover:bg-white hover:text-black transition-all duration-500 uppercase whitespace-nowrap"
          >
            {t("nav.book")}
          </button>
        </div>

        {/* Mobile right */}
        <div className="md:hidden flex items-center gap-3">
          <LangDropdown compact />
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 p-2 ml-1"
            aria-label="Menu"
          >
            <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[5px]" : ""}`} />
            <span className={`block w-4 h-px bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/[0.06] px-6 py-8 flex flex-col gap-6">
          {navLinks.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              className="text-white/60 hover:text-white text-xs tracking-[0.2em] transition-colors duration-300 uppercase"
            >
              {t(key)}
            </a>
          ))}
          <button
            type="button"
            onClick={onBooking}
            className="text-[10px] tracking-[0.2em] text-white border border-white/30 px-6 py-3 hover:bg-white hover:text-black transition-all duration-500 text-left uppercase"
          >
            {t("nav.book")}
          </button>
          <div className="flex items-center gap-3 pt-2 border-t border-white/[0.06]">
            <ThemeToggle />
            <span className="text-white/30 text-[9px] tracking-[0.2em] uppercase">
              {/* intentionally empty — icon speaks for itself */}
            </span>
          </div>
        </div>
      )}
    </nav>
  );
}
