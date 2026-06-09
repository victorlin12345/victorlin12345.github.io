"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import BookingModal from "@/components/BookingModal";

export default function AboutPage() {
  const { t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);

  const pillars = [
    { label: "about.pillar1.label", desc: "about.pillar1.desc" },
    { label: "about.pillar2.label", desc: "about.pillar2.desc" },
    { label: "about.pillar3.label", desc: "about.pillar3.desc" },
  ] as const;

  const stats = [
    { value: "about.stat1.value", label: "about.stat1.label" },
    { value: "about.stat2.value", label: "about.stat2.label" },
    { value: "about.stat3.value", label: "about.stat3.label" },
    { value: "about.stat4.value", label: "about.stat4.label" },
  ] as const;

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#0B0B0B]">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{ background: "var(--c-hero-gradient)" }}
          />
          {[800, 600, 420, 260].map((size, i) => (
            <div
              key={size}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2E5CB8]"
              style={{ width: size, height: size, opacity: 0.03 + i * 0.012 }}
            />
          ))}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <p className="text-[#8E8E93] text-[10px] tracking-[0.5em] uppercase mb-8 animate-float-in">
            {t("about.eyebrow")}
          </p>
          <h1
            className="text-white font-light leading-[1.1] tracking-[0.03em] mb-6 animate-float-in"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", animationDelay: "0.15s" }}
          >
            {t("about.hero.title")}
            <br />
            <span className="text-white/60">{t("about.hero.title2")}</span>
          </h1>
          <p
            className="text-[#2E5CB8]/70 text-[10px] tracking-[0.4em] uppercase animate-float-in"
            style={{ animationDelay: "0.3s" }}
          >
            {t("about.hero.sub")}
          </p>
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

      {/* Stats bar */}
      <section className="border-y border-[#2C2C2E] bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[#2C2C2E]">
            {stats.map(({ value, label }) => (
              <div key={label} className="px-8 py-10 text-center">
                <p className="text-white text-3xl md:text-4xl font-light tracking-[0.05em] mb-2">
                  {t(value)}
                </p>
                <p className="text-[#8E8E93] text-[9px] tracking-[0.3em] uppercase">
                  {t(label)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-32 px-6 lg:px-12 border-b border-[#2C2C2E]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          {/* Left: vintage timeline visual */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <div
              className="absolute inset-0"
              style={{ background: "var(--c-trust-gradient)" }}
            />
            {/* Timeline marks */}
            <div className="absolute left-12 top-0 bottom-0 flex flex-col justify-between py-12">
              {[
                { year: "1956", note: "FOUNDED" },
                { year: "1982", note: "2ND GEN." },
                { year: "2010", note: "3RD GEN." },
                { year: "2026", note: "TODAY" },
              ].map(({ year, note }) => (
                <div key={year} className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1C4399]/60 flex-none" />
                  <div>
                    <p className="text-white/80 text-sm font-light tracking-[0.1em]">{year}</p>
                    <p className="text-[#8E8E93] text-[9px] tracking-[0.2em] uppercase">{note}</p>
                  </div>
                </div>
              ))}
              <div className="absolute left-[5px] top-12 bottom-12 w-px bg-gradient-to-b from-[#1C4399]/10 via-[#2E5CB8]/30 to-[#1C4399]/10" />
            </div>
            <div className="absolute bottom-8 right-8">
              <p className="text-[#2E5CB8]/50 text-[9px] tracking-[0.3em] uppercase">PAOYEE · 寶儀鐘錶</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>

          {/* Right: story text */}
          <div>
            <p className="text-[#8E8E93] text-[10px] tracking-[0.4em] uppercase mb-6">
              {t("about.story.label")}
            </p>
            <p className="text-white/80 text-base leading-[1.9] tracking-wide font-light">
              {t("about.story.body")}
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-32 px-6 lg:px-12 border-b border-[#2C2C2E]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-20">
            <p className="text-[#8E8E93] text-[10px] tracking-[0.4em] uppercase mb-6">
              {t("about.philosophy.eyebrow")}
            </p>
            <h2
              className="text-white font-light leading-[1.15] tracking-[0.03em] mb-8"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
            >
              {t("about.philosophy.title")}
            </h2>
            <p className="text-[#8E8E93] text-sm leading-relaxed tracking-wide">
              {t("about.philosophy.body")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-[#2C2C2E]">
            {pillars.map(({ label, desc }, i) => (
              <div
                key={label}
                className={`py-12 pr-12 ${i > 0 ? "md:pl-12 md:border-l border-[#2C2C2E]" : ""}`}
              >
                <div className="w-px h-10 bg-[#1C4399]/50 mb-8" />
                <p className="text-white text-[10px] tracking-[0.3em] uppercase mb-4">
                  {t(label)}
                </p>
                <p className="text-[#8E8E93] text-sm leading-relaxed tracking-wide">
                  {t(desc)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Atelier */}
      <section className="py-32 px-6 lg:px-12 border-b border-[#2C2C2E]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text left */}
          <div>
            <p className="text-[#8E8E93] text-[10px] tracking-[0.4em] uppercase mb-6">
              {t("about.atelier.eyebrow")}
            </p>
            <h2
              className="text-white font-light leading-[1.2] tracking-[0.03em] mb-8"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)" }}
            >
              {t("about.atelier.title")}
            </h2>
            <p className="text-[#8E8E93] text-sm leading-relaxed tracking-wide">
              {t("about.atelier.body")}
            </p>
          </div>

          {/* Visual right: loupe / watchmaker bench */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <div
              className="absolute inset-0"
              style={{ background: "var(--c-trust-gradient)" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Outer precision rings */}
                {[220, 170, 120, 76].map((size, i) => (
                  <div
                    key={size}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#1C4399]"
                    style={{ width: size, height: size, opacity: 0.1 + i * 0.08 }}
                  />
                ))}
                {/* Crosshair */}
                <div className="absolute top-1/2 left-0 right-0 h-px bg-[#1C4399]/20" />
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#1C4399]/20" />
                {/* Center dot */}
                <div className="w-3 h-3 rounded-full bg-[#2E5CB8]/40 mx-auto" />
                {/* Tick marks */}
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i * 30 * Math.PI) / 180;
                  const r = 108;
                  const x = Math.sin(angle) * r;
                  const y = -Math.cos(angle) * r;
                  return (
                    <div
                      key={i}
                      className="absolute w-px h-2 bg-[#2E5CB8]/30"
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        transform: `rotate(${i * 30}deg) translateX(-50%)`,
                        transformOrigin: "top center",
                      }}
                    />
                  );
                })}
              </div>
            </div>
            <div className="absolute bottom-6 left-6">
              <p className="text-[#2E5CB8]/50 text-[9px] tracking-[0.3em] uppercase">TAIPEI ATELIER</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-white font-light leading-[1.2] tracking-[0.03em] mb-8"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)" }}
          >
            {t("about.cta.title")}
            <br />
            <span className="text-white/60">{t("about.cta.title2")}</span>
          </h2>
          <p className="text-[#8E8E93] text-sm leading-relaxed tracking-wide mb-12 max-w-xl mx-auto">
            {t("about.cta.body")}
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-[#1C4399] text-white text-[10px] tracking-[0.3em] uppercase px-14 py-5 hover:bg-transparent hover:border hover:border-[#1C4399] hover:text-white transition-all duration-500 border border-[#1C4399]"
          >
            {t("about.cta.btn")}
          </button>
          <p className="text-[#8E8E93] text-[10px] tracking-wider mt-6">
            {t("about.cta.sub")}
          </p>
        </div>
      </section>

      <BookingModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        preselectedWatch=""
      />
    </>
  );
}
