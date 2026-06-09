"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const COLLECTIONS = [
  {
    titleKey: "editorial.col1.title",
    subtitleKey: "editorial.col1.subtitle",
    descKey: "editorial.col1.desc",
    gradient:
      "radial-gradient(ellipse at 40% 40%, #2A2520 0%, #161410 50%, #0F0D0A 100%)",
    accent: "#D4AF37",
    count: 14,
  },
  {
    titleKey: "editorial.col2.title",
    subtitleKey: "editorial.col2.subtitle",
    descKey: "editorial.col2.desc",
    gradient:
      "radial-gradient(ellipse at 60% 40%, #1A1F2A 0%, #101318 50%, #0A0C10 100%)",
    accent: "#8E8E93",
    count: 22,
  },
  {
    titleKey: "editorial.col3.title",
    subtitleKey: "editorial.col3.subtitle",
    descKey: "editorial.col3.desc",
    gradient:
      "radial-gradient(ellipse at 50% 60%, #1E1A2A 0%, #120F18 50%, #0B0A10 100%)",
    accent: "#9B8EC4",
    count: 9,
  },
];

export default function EditorialCollections() {
  const { t } = useLanguage();

  return (
    <section className="py-28 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-[#8E8E93] text-[10px] tracking-[0.4em] uppercase mb-4">
              {t("editorial.eyebrow")}
            </p>
            <h2 className="text-white text-3xl md:text-4xl font-light tracking-[0.05em] uppercase">
              {t("editorial.title")}
            </h2>
          </div>
          <a
            href="#"
            className="text-[#8E8E93] hover:text-white text-[10px] tracking-[0.25em] uppercase transition-colors duration-300 border-b border-[#2C2C2E] hover:border-white/40 pb-1 self-start md:self-auto"
          >
            {t("editorial.viewAll")}
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#2C2C2E]">
          {COLLECTIONS.map((col) => (
            <article
              key={col.titleKey}
              className="group relative overflow-hidden cursor-pointer bg-[#161616]"
            >
              <div
                className="relative aspect-[3/4] overflow-hidden"
                style={{ background: col.gradient }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div
                      className="w-40 h-40 rounded-full border transition-all duration-700 group-hover:scale-110"
                      style={{
                        borderColor: `${col.accent}30`,
                        boxShadow: `0 0 60px ${col.accent}08`,
                      }}
                    />
                    <div
                      className="absolute inset-3 rounded-full border"
                      style={{ borderColor: `${col.accent}20` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ background: `${col.accent}60` }}
                      />
                    </div>
                    {[0, 3, 6, 9].map((pos) => (
                      <div
                        key={pos}
                        className="absolute w-1 h-4 rounded-full"
                        style={{
                          background: `${col.accent}40`,
                          top: "50%",
                          left: "50%",
                          transform: `translate(-50%, -50%) rotate(${pos * 30}deg) translateY(-62px)`,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
                <div className="absolute top-6 right-6">
                  <span
                    className="text-[9px] tracking-[0.25em] uppercase px-3 py-1.5 border"
                    style={{
                      borderColor: `${col.accent}30`,
                      color: `${col.accent}80`,
                    }}
                  >
                    {col.count} {t("editorial.pieces")}
                  </span>
                </div>
              </div>

              <div className="p-8 border-t border-[#2C2C2E]">
                <p
                  className="text-[9px] tracking-[0.3em] uppercase mb-3"
                  style={{ color: col.accent + "80" }}
                >
                  {t(col.subtitleKey)}
                </p>
                <h3 className="text-white text-xl font-light tracking-[0.05em] mb-4 group-hover:text-white/90 transition-colors duration-300">
                  {t(col.titleKey)}
                </h3>
                <p className="text-[#8E8E93] text-xs leading-relaxed tracking-wide">
                  {t(col.descKey)}
                </p>
                <div className="mt-6">
                  <span className="text-[9px] tracking-[0.25em] uppercase text-white/40 group-hover:text-white/80 transition-all duration-500 border-b border-transparent group-hover:border-white/30 pb-0.5">
                    {t("editorial.explore")}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
