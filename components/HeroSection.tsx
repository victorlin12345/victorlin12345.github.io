"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function HeroSection() {
  const { lang, t } = useLanguage();

  return (
    <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-[#0B0B0B]">
      <div className="absolute inset-0">
        {/* Deep blue-tinted radial background — echoes the store's cobalt wall */}
        <div
          className="absolute inset-0"
          style={{ background: "var(--c-hero-gradient)" }}
        />
        {/* Concentric rings — brand blue tones */}
        {[700, 520, 360, 220].map((size, i) => (
          <div
            key={size}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2E5CB8]"
            style={{ width: size, height: size, opacity: 0.04 + i * 0.015 }}
          />
        ))}
        {/* Inner brand-blue accent ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] rounded-full border border-[#1C4399]/20" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <p className="text-[#6B90D4] text-[10px] tracking-[0.5em] uppercase mb-6 animate-float-in">
          {t("hero.eyebrow")}
        </p>
        {lang === "zh" && (
          <p className="text-white/30 text-[11px] tracking-[0.4em] uppercase mb-4 animate-float-in" style={{ animationDelay: "0.05s" }}>
            寶儀鐘錶
          </p>
        )}
        <h1
          className="text-white font-light leading-[1.15] tracking-[0.03em] mb-12 animate-float-in"
          style={{
            fontSize: "clamp(2rem, 5vw, 4.5rem)",
            animationDelay: "0.15s",
          }}
        >
          {t("hero.h1")}
          <br />
          <span className="text-white/70">{t("hero.h1sub")}</span>
        </h1>
        <div className="animate-float-in" style={{ animationDelay: "0.3s", opacity: 0 }}>
          <a
            href="#collection"
            className="inline-block border border-[#2E5CB8]/70 text-white text-[10px] tracking-[0.35em] px-12 py-4 hover:bg-[#1C4399] hover:border-[#1C4399] transition-all duration-500 uppercase"
          >
            {t("hero.cta")}
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-px h-14 overflow-hidden relative mx-auto">
          <div
            className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-transparent via-[#2E5CB8]/50 to-transparent"
            style={{ animation: "float-in 2s ease-in-out infinite" }}
          />
        </div>
      </div>
    </section>
  );
}
