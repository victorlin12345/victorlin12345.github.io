"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

interface Watch {
  id: number;
  inventoryId: string | null;
  brand: string;
  model: string;
  ref: string;
  conditionKey: "showcase.unworn" | "showcase.excellent" | "showcase.vgood";
  year: string;
  priceDisplay: string;
  isPriceInquiry?: boolean;
  frontGradient: string;
  backGradient: string;
  accentColor: string;
}

const WATCHES: Watch[] = [
  {
    id: 1,
    inventoryId: "daytona",
    brand: "ROLEX",
    model: "Cosmograph Daytona",
    ref: "Ref. 116500LN",
    conditionKey: "showcase.unworn",
    year: "2024",
    priceDisplay: "NT$ 1,880,000",
    frontGradient: "radial-gradient(ellipse at 45% 40%, #282828 0%, #141414 55%, #0D0D0D 100%)",
    backGradient: "radial-gradient(ellipse at 55% 55%, #1E1A10 0%, #141008 55%, #0A0905 100%)",
    accentColor: "#D4AF37",
  },
  {
    id: 2,
    inventoryId: "pp5726",
    brand: "PATEK PHILIPPE",
    model: "Nautilus",
    ref: "Ref. 5711/1A-014",
    conditionKey: "showcase.excellent",
    year: "2023",
    priceDisplay: "NT$ 5,680,000",
    frontGradient: "radial-gradient(ellipse at 50% 45%, #1A2028 0%, #101318 55%, #090C10 100%)",
    backGradient: "radial-gradient(ellipse at 50% 50%, #1E2818 0%, #101508 55%, #090B05 100%)",
    accentColor: "#8EA8C4",
  },
  {
    id: 3,
    inventoryId: "ap-roa",
    brand: "AUDEMARS PIGUET",
    model: "Royal Oak",
    ref: "Ref. 15202ST",
    conditionKey: "showcase.vgood",
    year: "2022",
    priceDisplay: "NT$ 3,280,000",
    frontGradient: "radial-gradient(ellipse at 40% 40%, #202020 0%, #131313 55%, #0C0C0C 100%)",
    backGradient: "radial-gradient(ellipse at 60% 45%, #201820 0%, #13100C 55%, #0C0905 100%)",
    accentColor: "#C4A87A",
  },
  {
    id: 4,
    inventoryId: null,
    brand: "RICHARD MILLE",
    model: "RM 011 Felipe Massa",
    ref: "Ref. RM011-FM",
    conditionKey: "showcase.unworn",
    year: "2025",
    priceDisplay: "",
    isPriceInquiry: true,
    frontGradient: "radial-gradient(ellipse at 55% 45%, #1E1C20 0%, #121018 55%, #0B090E 100%)",
    backGradient: "radial-gradient(ellipse at 45% 55%, #1C2018 0%, #101408 55%, #090B05 100%)",
    accentColor: "#9B8EC4",
  },
  {
    id: 5,
    inventoryId: "lange-dato",
    brand: "A. LANGE & SÖHNE",
    model: "Datograph Perpetual",
    ref: "Ref. 401.026",
    conditionKey: "showcase.excellent",
    year: "2021",
    priceDisplay: "NT$ 4,180,000",
    frontGradient: "radial-gradient(ellipse at 50% 40%, #242018 0%, #151210 55%, #0D0B09 100%)",
    backGradient: "radial-gradient(ellipse at 50% 50%, #201814 0%, #130F09 55%, #0A0806 100%)",
    accentColor: "#D4C4A4",
  },
  {
    id: 6,
    inventoryId: "vc-pat",
    brand: "VACHERON CONSTANTIN",
    model: "Overseas Chronograph",
    ref: "Ref. 5500V/110A",
    conditionKey: "showcase.unworn",
    year: "2024",
    priceDisplay: "NT$ 2,450,000",
    frontGradient: "radial-gradient(ellipse at 45% 45%, #1C1C20 0%, #111114 55%, #0A0A0C 100%)",
    backGradient: "radial-gradient(ellipse at 55% 45%, #1A2018 0%, #101408 55%, #090C05 100%)",
    accentColor: "#A4C4B4",
  },
  {
    id: 7,
    inventoryId: "fpj-blue",
    brand: "F.P. JOURNE",
    model: "Chronomètre Bleu",
    ref: "Ref. CB TN",
    conditionKey: "showcase.vgood",
    year: "2020",
    priceDisplay: "",
    isPriceInquiry: true,
    frontGradient: "radial-gradient(ellipse at 50% 40%, #181820 0%, #0F0F14 55%, #090910 100%)",
    backGradient: "radial-gradient(ellipse at 50% 55%, #181C20 0%, #0F1218 55%, #090C10 100%)",
    accentColor: "#7898C4",
  },
  {
    id: 8,
    inventoryId: null,
    brand: "H. MOSER & CIE",
    model: "Endeavour Perpetual",
    ref: "Ref. 1341-0001",
    conditionKey: "showcase.unworn",
    year: "2025",
    priceDisplay: "NT$ 980,000",
    frontGradient: "radial-gradient(ellipse at 45% 40%, #1E1814 0%, #13100C 55%, #0C0A08 100%)",
    backGradient: "radial-gradient(ellipse at 55% 55%, #1E1E18 0%, #131310 55%, #0B0B09 100%)",
    accentColor: "#C4B894",
  },
];

function WatchFaceFront({ accentColor }: { accentColor: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-36 h-36">
        <div className="absolute inset-0 rounded-full border-2" style={{ borderColor: `${accentColor}25` }} />
        <div className="absolute inset-3 rounded-full border" style={{ borderColor: `${accentColor}15` }} />
        {Array.from({ length: 12 }).map((_, i) => {
          const isMain = i % 3 === 0;
          return (
            <div
              key={i}
              className="absolute"
              style={{
                top: "50%", left: "50%",
                width: isMain ? "2px" : "1px",
                height: isMain ? "8px" : "5px",
                background: `${accentColor}${isMain ? "60" : "35"}`,
                transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-60px)`,
                borderRadius: "1px",
              }}
            />
          );
        })}
        <div className="absolute" style={{ top: "50%", left: "50%", width: "2px", height: "28px", background: `${accentColor}80`, transform: "translate(-50%, -100%) rotate(-60deg)", transformOrigin: "bottom center", borderRadius: "1px" }} />
        <div className="absolute" style={{ top: "50%", left: "50%", width: "1.5px", height: "34px", background: `${accentColor}60`, transform: "translate(-50%, -100%) rotate(60deg)", transformOrigin: "bottom center", borderRadius: "1px" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full" style={{ background: accentColor, opacity: 0.7 }} />
      </div>
    </div>
  );
}

function WatchMovementBack({ accentColor }: { accentColor: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-36 h-36">
        <div className="absolute inset-0 rounded-full border-2" style={{ borderColor: `${accentColor}30`, boxShadow: `inset 0 0 20px ${accentColor}08` }} />
        <div className="absolute inset-6 rounded-full border" style={{ borderColor: `${accentColor}20` }} />
        <div className="absolute inset-10 rounded-full border" style={{ borderColor: `${accentColor}15` }} />
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="absolute" style={{ top: "50%", left: "50%", width: "1px", height: "4px", background: `${accentColor}25`, transform: `translate(-50%, -50%) rotate(${i * 15}deg) translateY(-67px)` }} />
        ))}
        <div className="absolute inset-0 flex items-center justify-center" style={{ transform: "translate(12px, -10px)" }}>
          <div className="w-8 h-8 rounded-full border" style={{ borderColor: `${accentColor}35` }} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center" style={{ transform: "translate(-14px, 12px)" }}>
          <div className="w-10 h-10 rounded-full border" style={{ borderColor: `${accentColor}25` }} />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full" style={{ background: `${accentColor}40` }} />
      </div>
    </div>
  );
}

interface ProductShowcaseProps {
  onInquire: (watch: string) => void;
}

export default function ProductShowcase({ onInquire }: ProductShowcaseProps) {
  const { t } = useLanguage();

  return (
    <section id="collection" className="py-28 px-6 lg:px-12 bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-[#8E8E93] text-[10px] tracking-[0.4em] uppercase mb-4">
              {t("showcase.eyebrow")}
            </p>
            <h2 className="text-white text-3xl md:text-4xl font-light tracking-[0.05em] uppercase">
              {t("showcase.title")}
            </h2>
          </div>
          <p className="text-[#8E8E93] text-xs tracking-wider max-w-xs text-right leading-relaxed hidden md:block">
            {t("showcase.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#2C2C2E]">
          {WATCHES.map((watch) => {
            const cardClass = "group bg-[#161616] cursor-pointer block";
            const content = (
              <>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <div className="absolute inset-0 transition-opacity duration-700 group-hover:opacity-0" style={{ background: watch.frontGradient }}>
                    <WatchFaceFront accentColor={watch.accentColor} />
                  </div>
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" style={{ background: watch.backGradient }}>
                    <WatchMovementBack accentColor={watch.accentColor} />
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                      <span className="text-[8px] tracking-[0.3em] uppercase px-3 py-1 border border-white/10" style={{ color: `${watch.accentColor}60` }}>
                        {t("showcase.movement")}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-5 border-t border-[#2C2C2E]">
                  <p className="text-[9px] tracking-[0.3em] uppercase mb-1 font-medium" style={{ color: watch.accentColor + "90" }}>
                    {watch.brand}
                  </p>
                  <h3 className="text-white text-sm font-light mb-1 leading-snug">{watch.model}</h3>
                  <p className="text-[#8E8E93] text-[10px] tracking-wide mb-3">{watch.ref}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8E8E93] text-[9px] tracking-[0.15em] uppercase">
                      {t(watch.conditionKey)} · {watch.year}
                    </span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-[#2C2C2E] flex items-center justify-between">
                    <span className="text-white text-sm font-light tracking-wide">
                      {watch.isPriceInquiry ? t("showcase.inquirePrice") : watch.priceDisplay}
                    </span>
                    <button
                      onClick={(e) => { e.preventDefault(); onInquire(`${watch.brand} — ${watch.model} (${watch.ref})`); }}
                      className="text-[8px] tracking-[0.25em] uppercase text-[#8E8E93] hover:text-white border border-[#2C2C2E] hover:border-white/30 px-3 py-1.5 transition-all duration-300"
                    >
                      {t("showcase.inquire")}
                    </button>
                  </div>
                </div>
              </>
            );
            return watch.inventoryId ? (
              <Link key={watch.id} href={`/discover/${watch.inventoryId}`} className={cardClass}>
                {content}
              </Link>
            ) : (
              <article key={watch.id} className={cardClass}>
                {content}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
