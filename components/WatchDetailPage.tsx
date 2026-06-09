"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import type { InventoryWatch } from "@/lib/inventory";
import BookingModal from "@/components/BookingModal";

function WatchFaceSVG({ w, size = 300 }: { w: InventoryWatch; size?: number }) {
  const vb = 280, cx = 140, cy = 140, bezR = 124, dialR = 112, mR = 90;

  const ticks = Array.from({ length: 60 }, (_, i) => {
    const isHour = i % 5 === 0, isMain = i % 15 === 0;
    const rad = (i * 6 - 90) * Math.PI / 180;
    const o = dialR - 2, inn = isHour ? dialR - 12 : dialR - 6;
    return { x1: cx + o * Math.cos(rad), y1: cy + o * Math.sin(rad), x2: cx + inn * Math.cos(rad), y2: cy + inn * Math.sin(rad), isHour, skip: isMain, sw: isHour ? 1.3 : 0.6 };
  });

  const pos4 = ([-90, 0, 90, 180] as const).map((deg, i) => ({
    x: cx + mR * Math.cos(deg * Math.PI / 180),
    y: cy + mR * Math.sin(deg * Math.PI / 180),
    label: w.markerType === "arabic" ? ["12","3","6","9"][i] : w.markerType === "roman" ? ["XII","III","VI","IX"][i] : "",
    deg,
  }));

  const ink = w.isLight
    ? { t1: "rgba(0,0,0,0.38)", t2: "rgba(0,0,0,0.16)", h: "rgba(15,15,15,0.92)", hm: "rgba(15,15,15,0.82)", br: "rgba(0,0,0,0.22)", brS: "rgba(0,0,0,0.12)" }
    : { t1: "rgba(255,255,255,0.45)", t2: "rgba(255,255,255,0.18)", h: "rgba(255,255,255,0.95)", hm: "rgba(255,255,255,0.9)", br: "rgba(255,255,255,0.18)", brS: "rgba(255,255,255,0.08)" };

  const hRad = ((10 * 30 + 10 * 0.5) - 90) * Math.PI / 180;
  const mRad = (10 * 6 - 90) * Math.PI / 180;
  const uid = `det-${w.id}`;

  return (
    <svg viewBox={`0 0 ${vb} ${vb}`} width={size} height={size}>
      <defs>
        <linearGradient id={`b${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#b0b0b0"/><stop offset="35%" stopColor="#888"/>
          <stop offset="65%" stopColor="#a0a0a0"/><stop offset="100%" stopColor="#606060"/>
        </linearGradient>
        <radialGradient id={`d${uid}`} cx="35%" cy="25%" r="75%">
          <stop offset="0%" stopColor={w.dialInner}/><stop offset="100%" stopColor={w.dialOuter}/>
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={bezR + 2} fill="rgba(0,0,0,0.5)"/>
      <circle cx={cx} cy={cy} r={bezR} fill={`url(#b${uid})`}/>
      <circle cx={cx} cy={cy} r={bezR - 11} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="0.8"/>
      <circle cx={cx} cy={cy} r={dialR} fill={`url(#d${uid})`}/>
      <circle cx={cx} cy={cy} r={dialR - 0.5} fill="none" stroke={w.isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.04)"} strokeWidth="1"/>
      {ticks.filter(t => !t.skip).map((t, i) => (
        <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
          stroke={t.isHour ? ink.t1 : ink.t2} strokeWidth={t.sw} strokeLinecap="round"/>
      ))}
      {w.markerType === "baton"
        ? pos4.map(({ x, y, deg }) => <rect key={deg} x={x - 1.5} y={y - 8} width={3} height={16} rx={1} fill={w.markerAccent} transform={`rotate(${deg + 90},${x},${y})`}/>)
        : pos4.map(({ x, y, label }) => <text key={label} x={x} y={y} textAnchor="middle" dominantBaseline="central" fill={w.markerAccent} fontSize={label.length > 2 ? 9 : 11} fontFamily="Inter,sans-serif" fontWeight="300">{label}</text>)}
      <text x={cx} y={cy - 32} textAnchor="middle" fill={ink.br} fontSize={5.5} fontFamily="Inter,sans-serif" letterSpacing="0.3em" fontWeight="400">
        {w.brand.split(" ")[0]}
      </text>
      <text x={cx} y={cy - 22} textAnchor="middle" fill={ink.brS} fontSize={4} fontFamily="Inter,sans-serif" letterSpacing="0.2em">{w.ref}</text>
      <line x1={cx - 12} y1={cy + 8} x2={cx + 12} y2={cy + 8} stroke="rgba(44,94,184,0.2)" strokeWidth="0.5"/>
      <line x1={cx} y1={cy} x2={cx + 66 * Math.cos(hRad)} y2={cy + 66 * Math.sin(hRad)} stroke={ink.h} strokeWidth="2.5" strokeLinecap="round"/>
      <line x1={cx} y1={cy} x2={cx + 95 * Math.cos(mRad)} y2={cy + 95 * Math.sin(mRad)} stroke={ink.hm} strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx={cx} cy={cy} r={4.5} fill={ink.h}/>
      <circle cx={cx} cy={cy} r={2.5} fill="#1C4399"/>
    </svg>
  );
}

export default function WatchDetailPage({ watch }: { watch: InventoryWatch }) {
  const { t, lang } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  const condKey = `col.condition.${watch.condition}` as const;

  return (
    <>
      {/* Back link — pt-20 clears the fixed navbar */}
      <div className="border-b border-[#2C2C2E] px-6 lg:px-12 py-5 mt-20">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/discover"
            className="text-[#8E8E93] text-[10px] tracking-[0.25em] uppercase hover:text-white transition-colors duration-300 flex items-center gap-2"
          >
            <span>←</span> {lang === "zh" ? "返回探索" : lang === "ja" ? "探索に戻る" : "BACK TO DISCOVER"}
          </Link>
        </div>
      </div>

      {/* Main detail */}
      <section className="py-28 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: watch + specs */}
          <div>
            <div className="flex justify-center mb-12">
              <WatchFaceSVG w={watch} size={300} />
            </div>

            {/* Specs */}
            <div className="border-t border-[#2C2C2E] pt-8">
              <p className="text-[#8E8E93] text-[9px] tracking-[0.35em] uppercase mb-6">{t("col.specs")}</p>
              <div className="grid grid-cols-2 gap-y-6">
                {watch.specs.map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-[#8E8E93] text-[9px] tracking-[0.2em] uppercase mb-1">{label}</p>
                    <p className="text-white/80 text-xs tracking-wide">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8">
              {watch.tags.map(tag => (
                <span key={tag} className="text-[#8E8E93] text-[9px] tracking-[0.15em] border border-[#2C2C2E] px-2 py-0.5">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: story */}
          <div className="lg:pt-4">
            <p className="text-[#8E8E93] text-[10px] tracking-[0.35em] uppercase mb-3">{watch.brand}</p>
            <h1
              className="text-white font-light leading-[1.1] tracking-[0.02em] mb-2"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)" }}
            >
              {watch.model}
            </h1>
            <p className="text-[#2E5CB8]/70 text-[10px] tracking-[0.2em] uppercase mb-10">
              {watch.ref} · {watch.year}
            </p>

            {/* Pull quote as headline */}
            <h2
              className="text-white/85 font-light leading-[1.25] italic mb-10"
              style={{ fontSize: "clamp(1.1rem, 2vw, 1.6rem)" }}
            >
              "{watch.pullquote[lang]}"
            </h2>

            {/* Story */}
            <div className="space-y-6 mb-12">
              {watch.story[lang].split("\n\n").map((para, i) => (
                <p key={i} className="text-[#8E8E93] text-sm leading-[1.9] tracking-wide">{para}</p>
              ))}
            </div>

            {/* Divider */}
            <div className="w-8 h-px bg-[#1C4399]/40 mb-12" />

            {/* Price + CTA */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <p className="text-[#8E8E93] text-[9px] tracking-[0.3em] uppercase mb-2">ASKING PRICE</p>
                <p className="text-white text-2xl font-light tracking-[0.05em]">{watch.price}</p>
                <span className="text-[#8E8E93] text-[9px] tracking-[0.2em] uppercase mt-1 inline-block">
                  {t(condKey)}
                </span>
              </div>
              <button
                onClick={() => setModalOpen(true)}
                className="text-[10px] tracking-[0.3em] uppercase text-white border border-white/30 px-10 py-4 hover:bg-white hover:text-black transition-all duration-500 whitespace-nowrap"
              >
                {t("col.inquire")}
              </button>
            </div>
          </div>
        </div>
      </section>

      <BookingModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        preselectedWatch={`${watch.brand} ${watch.model} ${watch.ref}`}
      />
    </>
  );
}
