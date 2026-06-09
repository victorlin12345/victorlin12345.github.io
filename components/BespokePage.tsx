"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Lang } from "@/lib/i18n";

// ─── Dial style data ──────────────────────────────────────────────────────────

type DialIdx = 0 | 1 | 2;

const STYLES = [
  {
    id: "arabic",
    label: { en: "ARABIC", zh: "數字版", ja: "アラビア" } as Record<Lang, string>,
    desc: {
      en: "Clean arabic numerals on a matte black dial. Understated modernity for the contemporary collector.",
      zh: "霧黑錶面上的清晰阿拉伯數字。簡潔的現代感，為當代收藏家而生。",
      ja: "マットブラックのダイヤルにクリーンなアラビア数字。現代コレクターのための控えめなモダニティ。",
    } as Record<Lang, string>,
    markers: ["12", "3", "6", "9"] as string[],
    type: "text" as const,
    accent: "rgba(255,255,255,0.88)",
    piece: { en: "The Modernity", zh: "摩登系列", ja: "モダニティ" } as Record<Lang, string>,
    year: "2024",
  },
  {
    id: "chinese",
    label: { en: "CHINESE", zh: "漢字版", ja: "漢字" } as Record<Lang, string>,
    desc: {
      en: "Traditional Chinese characters in champagne gold. A bridge between cultural heritage and haute horology.",
      zh: "傳統中文漢字以香檳金呈現。東方文化傳承與頂級製錶藝術之間的橋樑。",
      ja: "シャンパンゴールドで表現された伝統的な漢字。文化的遺産と高級時計製造の架け橋。",
    } as Record<Lang, string>,
    markers: ["十二", "三", "六", "九"] as string[],
    type: "text" as const,
    accent: "#C9A84C",
    piece: { en: "The Heritage", zh: "傳承系列", ja: "ヘリテージ" } as Record<Lang, string>,
    year: "2024",
  },
  {
    id: "minimal",
    label: { en: "MINIMAL", zh: "極簡版", ja: "ミニマル" } as Record<Lang, string>,
    desc: {
      en: "No numerals. Pure baton hour indices only — for those who need no reminder of what time it is.",
      zh: "無數字。純粹線條刻度——獻給那些不需要時間提醒的品鑑者。",
      ja: "数字なし。純粋なバトンインデックスのみ — 時間を思い出す必要のない方へ。",
    } as Record<Lang, string>,
    markers: [] as string[],
    type: "baton" as const,
    accent: "rgba(255,255,255,0.35)",
    piece: { en: "The Purist", zh: "純粹系列", ja: "ピュリスト" } as Record<Lang, string>,
    year: "2025",
  },
] as const;

// ─── Dial colour data ─────────────────────────────────────────────────────────

type ColorIdx = 0 | 1 | 2 | 3 | 4 | 5;

const DIAL_COLORS = [
  { id: "noir",     label: { en: "NOIR",     zh: "純黑",   ja: "ノワール"     }, inner: "#1c1c1c", outer: "#080808", swatch: "#141414", isLight: false },
  { id: "blanc",    label: { en: "BLANC",    zh: "象牙白",  ja: "ブラン"      }, inner: "#eeeae2", outer: "#d8d3cb", swatch: "#e8e3db", isLight: true  },
  { id: "marine",   label: { en: "MARINE",   zh: "深海藍",  ja: "マリン"      }, inner: "#1a2e50", outer: "#0a1828", swatch: "#162540", isLight: false },
  { id: "foret",    label: { en: "FORÊT",    zh: "森林綠",  ja: "フォレ"      }, inner: "#1a3a1e", outer: "#0a2010", swatch: "#162e18", isLight: false },
  { id: "bordeaux", label: { en: "BORDEAUX", zh: "酒紅",   ja: "ボルドー"     }, inner: "#3a1520", outer: "#200a10", swatch: "#2e1018", isLight: false },
  { id: "topaze",   label: { en: "TOPAZE",   zh: "琥珀金",  ja: "トパーズ"    }, inner: "#2e2010", outer: "#180e05", swatch: "#251808", isLight: false },
] as const satisfies readonly { id: string; label: Record<Lang, string>; inner: string; outer: string; swatch: string; isLight: boolean }[];

// ─── Watch face SVG (no crown) ────────────────────────────────────────────────

function WatchFaceSVG({
  styleIdx, fade, dialInner, dialOuter, isLight = false,
}: {
  styleIdx: DialIdx; fade: boolean; dialInner: string; dialOuter: string; isLight?: boolean;
}) {
  // Palette flips for light dials
  const ink = isLight
    ? { tick1: "rgba(0,0,0,0.38)", tick2: "rgba(0,0,0,0.16)", hand: "rgba(15,15,15,0.92)", handMin: "rgba(15,15,15,0.82)", brand: "rgba(0,0,0,0.22)", brandSub: "rgba(0,0,0,0.12)", center: "rgba(15,15,15,0.9)", jewel: "#1C4399" }
    : { tick1: "rgba(255,255,255,0.45)", tick2: "rgba(255,255,255,0.18)", hand: "rgba(255,255,255,0.95)", handMin: "rgba(255,255,255,0.9)", brand: "rgba(255,255,255,0.18)", brandSub: "rgba(255,255,255,0.08)", center: "rgba(255,255,255,0.9)", jewel: "#1C4399" };
  const s = STYLES[styleIdx];
  const cx = 160, cy = 160;
  const dialR = 128;
  const markerR = 103;

  const ticks = Array.from({ length: 60 }, (_, i) => {
    const isMain = i % 15 === 0;
    const isHour = i % 5 === 0;
    const rad = (i * 6 - 90) * Math.PI / 180;
    const outerR = dialR - 3;
    const innerR = isHour ? dialR - 14 : dialR - 7;
    return {
      x1: cx + outerR * Math.cos(rad), y1: cy + outerR * Math.sin(rad),
      x2: cx + innerR * Math.cos(rad), y2: cy + innerR * Math.sin(rad),
      isHour,
      sw: isHour ? 1.5 : 0.7,
      skip: isMain,
    };
  });

  const mainPos = ([-90, 0, 90, 180] as const).map((deg, i) => ({
    x: cx + markerR * Math.cos(deg * Math.PI / 180),
    y: cy + markerR * Math.sin(deg * Math.PI / 180),
    text: s.type === "text" ? s.markers[i] : "",
    deg,
  }));

  const hourRad = ((10 * 30 + 10 * 0.5) - 90) * Math.PI / 180;
  const minRad = (10 * 6 - 90) * Math.PI / 180;

  return (
    <svg viewBox="0 0 320 320" className="w-full h-full">
      <defs>
        <linearGradient id="wBez" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#b0b0b0" />
          <stop offset="30%"  stopColor="#888888" />
          <stop offset="60%"  stopColor="#a0a0a0" />
          <stop offset="100%" stopColor="#606060" />
        </linearGradient>
        <radialGradient id="wDial" cx="35%" cy="25%" r="75%">
          <stop offset="0%" stopColor={dialInner} />
          <stop offset="100%" stopColor={dialOuter} />
        </radialGradient>
      </defs>

      {/* Bezel */}
      <circle cx={cx} cy={cy} r={144} fill="rgba(0,0,0,0.55)" />
      <circle cx={cx} cy={cy} r={142} fill="url(#wBez)" />
      <circle cx={cx} cy={cy} r={130} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

      {/* Dial — fades on style switch */}
      <g style={{ opacity: fade ? 0 : 1, transition: "opacity 0.2s ease" }}>
        <circle cx={cx} cy={cy} r={dialR} fill="url(#wDial)" />
        <circle cx={cx} cy={cy} r={dialR - 0.5} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

        {ticks.filter(t => !t.skip).map((t, i) => (
          <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
            stroke={t.isHour ? ink.tick1 : ink.tick2}
            strokeWidth={t.sw} strokeLinecap="round" />
        ))}

        {s.type === "text" && mainPos.map(({ x, y, text }) => (
          <text key={text} x={x} y={y}
            textAnchor="middle" dominantBaseline="central"
            fill={isLight && s.id !== "chinese" ? "rgba(15,15,15,0.75)" : s.accent}
            fontSize={text.length > 1 ? 11 : 13}
            fontFamily="Inter, -apple-system, sans-serif"
            fontWeight="300" letterSpacing="0.02em">
            {text}
          </text>
        ))}

        {s.type === "baton" && mainPos.map(({ x, y, deg }) => (
          <rect key={deg} x={x - 1.5} y={y - 9} width={3} height={18} rx={1}
            fill={isLight ? "rgba(15,15,15,0.45)" : s.accent}
            transform={`rotate(${deg + 90}, ${x}, ${y})`} />
        ))}

        <text x={cx} y={cy - 32} textAnchor="middle"
          fill={ink.brand} fontSize={5.5}
          fontFamily="Inter, sans-serif" letterSpacing="0.35em" fontWeight="400">
          ROVOLK
        </text>
        <text x={cx} y={cy - 22} textAnchor="middle"
          fill={ink.brandSub} fontSize={4}
          fontFamily="Inter, sans-serif" letterSpacing="0.22em">
          BESPOKE ATELIER
        </text>
        <line x1={cx - 12} y1={cy + 10} x2={cx + 12} y2={cy + 10}
          stroke="rgba(44,94,184,0.2)" strokeWidth="0.5" />

        <line x1={cx} y1={cy}
          x2={cx + 66 * Math.cos(hourRad)} y2={cy + 66 * Math.sin(hourRad)}
          stroke={ink.hand} strokeWidth="2.5" strokeLinecap="round" />
        <line x1={cx} y1={cy}
          x2={cx + 95 * Math.cos(minRad)} y2={cy + 95 * Math.sin(minRad)}
          stroke={ink.handMin} strokeWidth="1.8" strokeLinecap="round" />

        <circle cx={cx} cy={cy} r={4.5} fill={ink.center} />
        <circle cx={cx} cy={cy} r={2.5} fill={ink.jewel} />
      </g>
    </svg>
  );
}

// ─── Crown — HTML element with vertical-scroll knurling ───────────────────────
//
// Each click advances scrollY by LINE_H px.
// CSS `background-position-y` transition creates the rolling-cylinder illusion.

const LINE_H = 8; // px per knurling line (repeat period)

function Crown({ scrollY, onClick }: { scrollY: number; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Turn crown to change dial style"
      className="flex items-center group focus:outline-none"
    >
      {/* Stem — connects case to crown body */}
      <div style={{
        width: 10,
        height: 18,
        background: "linear-gradient(to bottom, #a0a0a0 0%, #808080 50%, #989898 100%)",
        borderTop: "1px solid rgba(255,255,255,0.35)",
        borderBottom: "1px solid rgba(0,0,0,0.25)",
        flexShrink: 0,
      }} />

      {/* Crown body */}
      <div style={{
        width: 22,
        height: 46,
        borderRadius: 3,
        overflow: "hidden",
        position: "relative",
        flexShrink: 0,
        boxShadow: "2px 0 10px rgba(0,0,0,0.35), inset -1px 0 2px rgba(255,255,255,0.5)",
      }}>
        {/* Silver metallic base */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, #a8a8a8 0%, #888888 45%, #686868 100%)",
        }} />

        {/* Scrolling knurling lines — vertical roll */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent 0px,
            transparent ${LINE_H - 1}px,
            rgba(0,0,0,0.12) ${LINE_H - 1}px,
            rgba(0,0,0,0.12) ${LINE_H}px
          )`,
          backgroundPositionY: `${scrollY}px`,
          transition: "background-position-y 0.45s cubic-bezier(0.4,0,0.2,1)",
        }} />

        {/* Left-edge highlight */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 3,
          background: "linear-gradient(to right, rgba(255,255,255,0.5), transparent)",
          borderRadius: "3px 0 0 3px",
        }} />

        {/* Hover glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "rgba(255,255,255,0.03)" }} />
      </div>
    </button>
  );
}

// ─── Colour picker ───────────────────────────────────────────────────────────

function ColorPicker({
  colorIdx, onChange,
}: {
  colorIdx: ColorIdx;
  onChange: (idx: ColorIdx) => void;
}) {
  const { lang } = useLanguage();
  const current = DIAL_COLORS[colorIdx];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-[#8E8E93] text-[10px] tracking-[0.3em] uppercase">
          { lang === "zh" ? "錶面顏色" : lang === "ja" ? "文字盤カラー" : "DIAL COLOUR" }
        </p>
        <span className="text-white/50 text-[10px] tracking-[0.2em] uppercase transition-all duration-300">
          {current.label[lang]}
        </span>
      </div>

      <div className="flex items-center gap-3">
        {DIAL_COLORS.map((c, i) => {
          const isActive = i === colorIdx;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onChange(i as ColorIdx)}
              aria-label={c.label[lang]}
              className="relative flex-none focus:outline-none"
              style={{ width: 28, height: 28 }}
            >
              {/* Outer ring (visible when active) */}
              <span
                className="absolute inset-0 rounded-full transition-all duration-300"
                style={{
                  border: isActive ? "1px solid rgba(255,255,255,0.55)" : "1px solid transparent",
                  transform: isActive ? "scale(1)" : "scale(0.85)",
                }}
              />
              {/* Swatch */}
              <span
                className="absolute rounded-full transition-transform duration-300"
                style={{
                  inset: isActive ? 3 : 2,
                  background: `radial-gradient(circle at 35% 30%, ${c.inner}, ${c.outer})`,
                  boxShadow: isActive ? `0 0 8px ${c.inner}80` : "none",
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Mini watch for showcase ──────────────────────────────────────────────────

function MiniWatchSVG({ styleIdx }: { styleIdx: DialIdx }) {
  const s = STYLES[styleIdx];
  const cx = 80, cy = 80;
  const dialR = 64;
  const markerR = 52;

  const mainPos = ([-90, 0, 90, 180] as const).map((deg, i) => ({
    x: cx + markerR * Math.cos(deg * Math.PI / 180),
    y: cy + markerR * Math.sin(deg * Math.PI / 180),
    text: s.type === "text" ? s.markers[i] : "",
    deg,
  }));

  const hourRad = ((10 * 30 + 10 * 0.5) - 90) * Math.PI / 180;
  const minRad = (10 * 6 - 90) * Math.PI / 180;
  const uid = `m${styleIdx}`;

  return (
    <svg viewBox="0 0 160 160" className="w-full h-full">
      <defs>
        <radialGradient id={`mb${uid}`} cx="35%" cy="25%" r="70%">
          <stop offset="0%" stopColor="#2e2e2e" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </radialGradient>
        <radialGradient id={`md${uid}`} cx="35%" cy="25%" r="75%">
          <stop offset="0%" stopColor="#1c1c1c" />
          <stop offset="100%" stopColor="#080808" />
        </radialGradient>
      </defs>

      <circle cx={cx} cy={cy} r={72} fill="rgba(0,0,0,0.4)" />
      <circle cx={cx} cy={cy} r={71} fill={`url(#mb${uid})`} />
      <circle cx={cx} cy={cy} r={dialR} fill={`url(#md${uid})`} />

      {Array.from({ length: 12 }, (_, i) => {
        if (i % 3 === 0) return null;
        const rad = (i * 30 - 90) * Math.PI / 180;
        return (
          <line key={i}
            x1={cx + (dialR - 2) * Math.cos(rad)} y1={cy + (dialR - 2) * Math.sin(rad)}
            x2={cx + (dialR - 9) * Math.cos(rad)} y2={cy + (dialR - 9) * Math.sin(rad)}
            stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round" />
        );
      })}

      {s.type === "text" && mainPos.map(({ x, y, text }) => (
        <text key={text} x={x} y={y}
          textAnchor="middle" dominantBaseline="central"
          fill={s.accent} fontSize={text.length > 1 ? 7 : 8}
          fontFamily="Inter, sans-serif" fontWeight="300">
          {text}
        </text>
      ))}

      {s.type === "baton" && mainPos.map(({ x, y, deg }) => (
        <rect key={deg} x={x - 1} y={y - 5} width={2} height={10} rx={0.5}
          fill={s.accent} transform={`rotate(${deg + 90}, ${x}, ${y})`} />
      ))}

      <line x1={cx} y1={cy}
        x2={cx + 33 * Math.cos(hourRad)} y2={cy + 33 * Math.sin(hourRad)}
        stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1={cx} y1={cy}
        x2={cx + 47 * Math.cos(minRad)} y2={cy + 47 * Math.sin(minRad)}
        stroke="rgba(255,255,255,0.85)" strokeWidth="1" strokeLinecap="round" />

      <circle cx={cx} cy={cy} r={2.5} fill="rgba(255,255,255,0.9)" />
      <circle cx={cx} cy={cy} r={1.5} fill="#1C4399" />
    </svg>
  );
}

// ─── Commission form ──────────────────────────────────────────────────────────

function CommissionForm({ defaultStyle }: { defaultStyle: DialIdx }) {
  const { t, lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "", style: defaultStyle.toString(), notes: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputClass =
    "w-full bg-transparent border-b border-[#2C2C2E] focus:border-[#2E5CB8] outline-none text-white/80 text-sm py-3 tracking-wide transition-colors duration-300 placeholder:text-[#8E8E93]/50";
  const labelClass = "block text-[#8E8E93] text-[10px] tracking-[0.3em] uppercase mb-1";

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="w-px h-12 bg-[#1C4399]/60 mx-auto mb-8" />
        <p className="text-[#8E8E93] text-[10px] tracking-[0.4em] uppercase mb-4">CONFIRMED</p>
        <h3 className="text-white text-2xl font-light tracking-[0.05em] mb-4">{t("bespoke.form.success.title")}</h3>
        <p className="text-[#8E8E93] text-sm leading-relaxed tracking-wide max-w-md mx-auto">
          {t("bespoke.form.success.body")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <label className={labelClass}>{t("bespoke.form.name")}</label>
          <input type="text" required value={form.name}
            onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
            className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{t("bespoke.form.contact")}</label>
          <input type="text" required value={form.contact}
            onChange={e => setForm(p => ({ ...p, contact: e.target.value }))}
            className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>{t("bespoke.form.style")}</label>
        <select value={form.style}
          onChange={e => setForm(p => ({ ...p, style: e.target.value }))}
          className={`${inputClass} cursor-pointer`}>
          {STYLES.map((s, i) => (
            <option key={s.id} value={i} className="bg-[#161616] text-white">
              {s.label[lang]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>{t("bespoke.form.notes")}</label>
        <textarea rows={4} value={form.notes}
          onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
          className={`${inputClass} resize-none`} />
      </div>

      <div className="flex flex-col items-start gap-4">
        <button type="submit"
          className="bg-[#1C4399] text-white text-[10px] tracking-[0.3em] uppercase px-12 py-5 hover:bg-transparent hover:border hover:border-[#1C4399] hover:text-white transition-all duration-500 border border-[#1C4399]">
          {t("bespoke.form.submit")}
        </button>
        <p className="text-[#8E8E93] text-[10px] tracking-wider">{t("bespoke.form.privacy")}</p>
      </div>
    </form>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function BespokePage() {
  const { t, lang } = useLanguage();
  const [styleIdx, setStyleIdx] = useState<DialIdx>(0);
  const [colorIdx, setColorIdx] = useState<ColorIdx>(0);
  const [crownScrollY, setCrownScrollY] = useState(0);
  const [fade, setFade] = useState(false);

  function advanceStyle(targetIdx?: DialIdx) {
    if (fade) return;
    setFade(true);
    const next = targetIdx ?? (((styleIdx + 1) % 3) as DialIdx);
    setCrownScrollY(prev => prev + LINE_H);
    setTimeout(() => {
      setStyleIdx(next);
      setFade(false);
    }, 200);
  }

  function changeColor(idx: ColorIdx) {
    if (fade) return;
    setFade(true);
    setTimeout(() => {
      setColorIdx(idx);
      setFade(false);
    }, 200);
  }

  const current = STYLES[styleIdx];
  const currentColor = DIAL_COLORS[colorIdx];

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden bg-[#0B0B0B]">
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{ background: "var(--c-hero-gradient)" }} />
          {[700, 520, 350, 210].map((size, i) => (
            <div key={size}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2E5CB8]"
              style={{ width: size, height: size, opacity: 0.03 + i * 0.01 }} />
          ))}
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <p className="text-[#8E8E93] text-[10px] tracking-[0.5em] uppercase mb-8 animate-float-in">
            {t("bespoke.hero.eyebrow")}
          </p>
          <h1
            className="text-white font-light leading-[1.1] tracking-[0.03em] mb-8 animate-float-in"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", animationDelay: "0.15s" }}
          >
            {t("bespoke.hero.title")}
            <br />
            <span className="text-white/60">{t("bespoke.hero.title2")}</span>
          </h1>
          <p className="text-[#2E5CB8]/70 text-[10px] tracking-[0.4em] uppercase animate-float-in"
            style={{ animationDelay: "0.3s" }}>
            {t("bespoke.hero.sub")}
          </p>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="w-px h-14 overflow-hidden relative mx-auto">
            <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-transparent via-[#2E5CB8]/50 to-transparent"
              style={{ animation: "float-in 2s ease-in-out infinite" }} />
          </div>
        </div>
      </section>

      {/* ── Configurator ──────────────────────────────────────────────────── */}
      <section className="border-t border-[#2C2C2E] py-28 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8E8E93] text-[10px] tracking-[0.4em] uppercase mb-20 text-center">
            {t("bespoke.config.eyebrow")}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Watch + crown */}
            <div className="flex justify-center items-center">
              {/* Outer wrapper: gives room for crown to overflow right */}
              <div className="relative" style={{ width: 300, height: 300 }}>
                {/* Watch SVG */}
                <div className="absolute inset-0">
                  <WatchFaceSVG
                    styleIdx={styleIdx}
                    fade={fade}
                    dialInner={currentColor.inner}
                    dialOuter={currentColor.outer}
                    isLight={currentColor.isLight}
                  />
                </div>

                {/* Crown — pinned to 3 o'clock position on the case edge */}
                {/* Case right edge in a 300px container: (160+142)/320*300 ≈ 283px from left */}
                <div
                  className="absolute"
                  style={{ left: 283, top: "50%", transform: "translateY(-50%)" }}
                >
                  <Crown scrollY={crownScrollY} onClick={() => advanceStyle()} />
                </div>

                {/* "TURN CROWN" label below crown */}
                <div
                  className="absolute flex flex-col items-center gap-1"
                  style={{ left: 286, top: "calc(50% + 34px)" }}
                >
                  <div className="w-px h-4 bg-[#2E5CB8]/30" />
                  <span className="text-[#8E8E93]/50 text-[8px] tracking-[0.18em] uppercase whitespace-nowrap">
                    {t("bespoke.config.instruction")}
                  </span>
                </div>
              </div>
            </div>

            {/* Style info + selector */}
            <div>
              <p className="text-[#8E8E93] text-[10px] tracking-[0.4em] uppercase mb-3">
                {t("bespoke.config.label")}
              </p>

              <div key={styleIdx} className="animate-float-in mb-10" style={{ animationDuration: "0.4s" }}>
                <h2 className="text-white text-4xl font-light tracking-[0.08em] uppercase mb-4">
                  {current.label[lang]}
                </h2>
                <p className="text-[#8E8E93] text-sm leading-relaxed tracking-wide">
                  {current.desc[lang]}
                </p>
              </div>

              {/* Style list */}
              <div className="flex flex-col border-t border-[#2C2C2E] mb-12">
                {STYLES.map((s, i) => (
                  <button key={s.id} type="button"
                    onClick={() => {
                      if (i !== styleIdx) advanceStyle(i as DialIdx);
                    }}
                    className={`flex items-center justify-between py-5 border-b border-[#2C2C2E] transition-all duration-300 ${
                      i === styleIdx ? "text-white" : "text-[#8E8E93] hover:text-white/70"
                    }`}
                  >
                    <span className="text-[10px] tracking-[0.3em] uppercase">{s.label[lang]}</span>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5 items-center">
                        {s.type === "text"
                          ? s.markers.map(m => (
                              <span key={m}
                                className={`text-[9px] font-light tracking-tight transition-opacity duration-300 ${i === styleIdx ? "opacity-70" : "opacity-30"}`}
                                style={{ color: i === styleIdx ? s.accent : undefined }}>
                                {m}
                              </span>
                            ))
                          : Array.from({ length: 4 }, (_, k) => (
                              <span key={k}
                                className={`inline-block w-px h-3 transition-opacity duration-300 ${i === styleIdx ? "opacity-60" : "opacity-20"}`}
                                style={{ background: s.accent }} />
                            ))}
                      </div>
                      {i === styleIdx && <div className="w-1 h-1 rounded-full bg-[#1C4399]" />}
                    </div>
                  </button>
                ))}
              </div>

              <p className="text-[#2C2C2E] text-[10px] tracking-[0.3em] uppercase mb-10">
                {styleIdx + 1} / {STYLES.length}
              </p>

              {/* Colour picker */}
              <div className="border-t border-[#2C2C2E] pt-10">
                <ColorPicker colorIdx={colorIdx} onChange={changeColor} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Showcase ──────────────────────────────────────────────────────── */}
      <section className="border-t border-[#2C2C2E] py-28 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
            <div>
              <p className="text-[#8E8E93] text-[10px] tracking-[0.4em] uppercase mb-4">
                {t("bespoke.showcase.eyebrow")}
              </p>
              <h2 className="text-white text-3xl md:text-4xl font-light tracking-[0.05em]">
                {t("bespoke.showcase.title")}
              </h2>
            </div>
            <p className="text-[#8E8E93] text-xs leading-relaxed tracking-wide max-w-xs">
              {t("bespoke.showcase.sub")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-[#2C2C2E]">
            {STYLES.map((s, i) => (
              <div key={s.id}
                className={`pt-12 pb-12 ${i > 0 ? "md:pl-12 md:border-l border-[#2C2C2E]" : ""} ${i < 2 ? "md:pr-12" : ""}`}>
                <div className="w-32 h-32 mb-8">
                  <MiniWatchSVG styleIdx={i as DialIdx} />
                </div>
                <p className="text-[#8E8E93] text-[9px] tracking-[0.3em] uppercase mb-2">{s.year}</p>
                <h3 className="text-white text-lg font-light tracking-[0.05em] mb-1">{s.piece[lang]}</h3>
                <p className="text-[#2E5CB8]/70 text-[10px] tracking-[0.2em] uppercase mb-4">{s.label[lang]}</p>
                <p className="text-[#8E8E93] text-xs leading-relaxed tracking-wide">
                  {s.desc[lang].split(".")[0]}.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Commission form ────────────────────────────────────────────────── */}
      <section className="border-t border-[#2C2C2E] py-28 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <p className="text-[#8E8E93] text-[10px] tracking-[0.4em] uppercase mb-6">
              {t("bespoke.form.eyebrow")}
            </p>
            <h2 className="text-white font-light leading-[1.2] tracking-[0.03em] mb-8"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}>
              {t("bespoke.form.title")}
            </h2>
            <p className="text-[#8E8E93] text-sm leading-relaxed tracking-wide mb-12">
              {t("bespoke.form.body")}
            </p>
            <div className="space-y-8">
              {[
                { n: "01", text: lang === "zh" ? "提交委託申請" : lang === "ja" ? "コミッション申請" : "Submit your commission" },
                { n: "02", text: lang === "zh" ? "工坊顧問一對一諮詢" : lang === "ja" ? "1対1の相談" : "One-on-one atelier consultation" },
                { n: "03", text: lang === "zh" ? "設計確認與製作" : lang === "ja" ? "デザイン確認と製作" : "Design approval & craft" },
                { n: "04", text: lang === "zh" ? "白手套交付" : lang === "ja" ? "白手袋でのデリバリー" : "White-glove delivery" },
              ].map(({ n, text }) => (
                <div key={n} className="flex items-start gap-6">
                  <span className="text-[#1C4399]/60 text-[10px] tracking-[0.2em] font-light pt-0.5">{n}</span>
                  <div className="w-px h-5 bg-[#1C4399]/30 flex-none mt-0.5" />
                  <p className="text-[#8E8E93] text-xs tracking-wide">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <CommissionForm defaultStyle={styleIdx} />
          </div>
        </div>
      </section>
    </>
  );
}
