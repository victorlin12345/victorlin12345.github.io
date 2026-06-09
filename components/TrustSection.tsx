"use client";

import { useLanguage } from "@/contexts/LanguageContext";

interface TrustSectionProps {
  onBooking: () => void;
}

export default function TrustSection({ onBooking }: TrustSectionProps) {
  const { t } = useLanguage();

  const trustPoints = [
    { labelKey: "trust.p1.label", descKey: "trust.p1.desc" },
    { labelKey: "trust.p2.label", descKey: "trust.p2.desc" },
    { labelKey: "trust.p3.label", descKey: "trust.p3.desc" },
  ];

  return (
    <section className="border-t border-[#2C2C2E] py-28 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Atelier visual — shop interior feel */}
          <div className="relative aspect-[4/5] overflow-hidden">
            <div
              className="absolute inset-0"
              style={{ background: "var(--c-trust-gradient)" }}
            />
            {/* Brand blue loupe rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-48 h-48 rounded-full border-2 border-[#1C4399]/30 flex items-center justify-center">
                  <div className="w-36 h-36 rounded-full border border-[#1C4399]/20 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full border border-[#2E5CB8]/20 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full border border-[#2E5CB8]/40" />
                    </div>
                  </div>
                </div>
                <div className="absolute top-1/2 left-0 right-0 h-px bg-[#1C4399]/15" />
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#1C4399]/15" />
              </div>
            </div>
            <div className="absolute bottom-8 left-8">
              <p className="text-[#2E5CB8]/60 text-[9px] tracking-[0.3em] uppercase">
                {t("trust.atelier")}
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          {/* Right: Text */}
          <div>
            <p className="text-[#8E8E93] text-[10px] tracking-[0.4em] uppercase mb-6">
              {t("trust.eyebrow")}
            </p>
            <h2 className="text-white text-3xl md:text-4xl font-light tracking-[0.05em] uppercase mb-8 leading-tight">
              {t("trust.title1")}
              <br />
              {t("trust.title2")}
            </h2>
            <p className="text-[#8E8E93] text-sm leading-relaxed tracking-wide mb-12">
              {t("trust.body")}
            </p>

            <div className="space-y-8 mb-14">
              {trustPoints.map((point) => (
                <div key={point.labelKey} className="flex gap-6">
                  <div className="flex-none">
                    <div className="w-px h-full bg-[#1C4399]/40 min-h-[40px]" />
                  </div>
                  <div>
                    <p className="text-white text-[10px] tracking-[0.25em] uppercase mb-2">
                      {t(point.labelKey)}
                    </p>
                    <p className="text-[#8E8E93] text-xs leading-relaxed tracking-wide">
                      {t(point.descKey)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={onBooking}
              className="bg-[#1C4399] text-white text-[10px] tracking-[0.3em] uppercase px-12 py-5 hover:bg-transparent hover:border hover:border-[#1C4399] hover:text-white transition-all duration-500 border border-[#1C4399]"
            >
              {t("trust.cta")}
            </button>

            <p className="text-[#8E8E93] text-[10px] tracking-wider mt-6">
              {t("trust.sub")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
