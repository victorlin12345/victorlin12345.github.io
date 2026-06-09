"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Lang } from "@/lib/i18n";
import BookingModal from "@/components/BookingModal";
import { INVENTORY } from "@/lib/inventory";
import type { InventoryWatch, Category } from "@/lib/inventory";

const CATEGORIES: { key: Category; label: Record<Lang, string> }[] = [
  { key: "all",          label: { en: "ALL",          zh: "全部",   ja: "すべて"   } },
  { key: "dress",        label: { en: "DRESS",        zh: "正裝",   ja: "ドレス"   } },
  { key: "sport",        label: { en: "SPORT",        zh: "運動",   ja: "スポーツ" } },
  { key: "complication", label: { en: "COMPLICATION", zh: "複雜功能", ja: "コンプリケーション" } },
  { key: "independent",  label: { en: "INDEPENDENT",  zh: "獨立製錶", ja: "インディペンデント" } },
];

// ─── Complications data ───────────────────────────────────────────────────────

const COMPLICATIONS = [
  {
    id: "tourbillon", name: "TOURBILLON", label: { zh: "陀飛輪", ja: "トゥールビヨン" } as Partial<Record<Lang,string>>,
    year: "1801", inventor: "Abraham-Louis Breguet",
    short: { en: "Gravity's antidote.", zh: "重力的解藥。", ja: "重力への解答。" } as Record<Lang,string>,
    desc: {
      en: "Invented by Abraham-Louis Breguet in 1801, the tourbillon places the escapement and balance wheel inside a rotating cage — counteracting gravity's effect on timekeeping. Once practical; now pure art. A master watchmaker requires up to six months to assemble one.",
      zh: "由寶璣於 1801 年發明，陀飛輪將擒縱系統置於旋轉框架中，抵消重力對計時的影響。曾是實用方案，如今已成藝術形式。資深製錶師需長達六個月完成組裝。",
      ja: "1801年ブレゲが発明。脱進機を回転ケージに収め重力の影響を打ち消す。かつて実用的、今は純粋な芸術。組み立てに最大6か月。",
    } as Record<Lang,string>,
  },
  {
    id: "perpetual", name: "PERPETUAL CALENDAR", label: { zh: "萬年曆", ja: "パーペチュアルカレンダー" } as Partial<Record<Lang,string>>,
    year: "1762", inventor: "Thomas Mudge",
    short: { en: "Mechanical memory of the year.", zh: "曆法的機械記憶。", ja: "暦の機械的な記憶。" } as Record<Lang,string>,
    desc: {
      en: "Accounts for months of varying length — including February's 28 or 29 days — without manual correction until 2100. Achieved through levers, cams, and programme wheels encoding 48 months of calendar data into brass and steel.",
      zh: "能自動辨識各月份天數（含閏年二月），無需手動調整直至 2100 年。透過槓桿、凸輪與程式輪盤，將 48 個月的曆法資料完整編碼於黃銅與鋼中。",
      ja: "閏年の2月を含む月ごとの日数を2100年まで手動修正なしに処理。レバー・カム・プログラムホイールで48か月のカレンダーデータを刻む。",
    } as Record<Lang,string>,
  },
  {
    id: "repeater", name: "MINUTE REPEATER", label: { zh: "三問報時", ja: "ミニッツリピーター" } as Partial<Record<Lang,string>>,
    year: "1687", inventor: "Edward Barlow",
    short: { en: "Time, made audible.", zh: "讓時間成為聲音。", ja: "時間を音にする。" } as Record<Lang,string>,
    desc: {
      en: "Sounds the time on demand — hours on a low gong, quarters on both, minutes on the high gong. Born before electric light. The acoustic quality of a fine repeater is one of watchmaking's most debated criteria.",
      zh: "按需鳴響時間。低音報時、雙音報刻、高音報分。誕生於電燈之前。音色是製錶界最多爭議的評判標準之一。",
      ja: "要求に応じて時刻を鳴らす。低音で時間、両ゴングで刻、高音で分。電灯以前に生まれた。音響品質は時計製造で最も議論される基準の一つ。",
    } as Record<Lang,string>,
  },
  {
    id: "chrono", name: "CHRONOGRAPH", label: { zh: "計時碼錶", ja: "クロノグラフ" } as Partial<Record<Lang,string>>,
    year: "1821", inventor: "Nicolas Mathieu Rieussec",
    short: { en: "Elapsed time, precisely captured.", zh: "精確捕捉流逝時間。", ja: "経過時間を精密に捉える。" } as Record<Lang,string>,
    desc: {
      en: "Adds an independently controllable stopwatch to a movement. The column wheel chronograph — using a star-shaped ratchet — is the engineering ideal: smoother actuation, more precise, longer-lasting.",
      zh: "在機芯中加入可獨立控制的碼錶功能。柱輪計時機制以星形棘輪控制各功能，被視為工程設計理想：操作流暢、精確、耐久。",
      ja: "独立制御可能なストップウォッチをムーブメントに追加。コラムホイールクロノグラフは工学的理想：滑らかな作動、高精度、耐久性。",
    } as Record<Lang,string>,
  },
] as const;

// ─── Lexicon ──────────────────────────────────────────────────────────────────

const LEXICON = [
  { term: "ESCAPEMENT",      label: { zh: "擒縱機構", ja: "脱進機" } as Partial<Record<Lang,string>>,
    def: { en: "The beating heart of a mechanical watch — releases the mainspring's energy in controlled increments, allowing the gear train to advance in precise steps.", zh: "機械腕錶跳動的心臟，以受控方式逐步釋放發條能量，讓輪列精確前進。", ja: "機械式時計の鼓動する心臓。メインスプリングのエネルギーを制御放出し、輪列を正確に進める。" } as Record<Lang,string> },
  { term: "MAINSPRING",      label: { zh: "發條", ja: "メインスプリング" } as Partial<Record<Lang,string>>,
    def: { en: "A coiled metal alloy strip that stores potential energy when wound. Typically 25–35cm when uncoiled, yet fits within the barrel drum.", zh: "捲曲金屬合金帶，上鍊時儲存位能。展開後長達 25–35 公分，卻收納於小小簧盒之中。", ja: "巻き上げると位置エネルギーを蓄えるコイル状金属帯。展開すると25〜35cmだがバレルに収まる。" } as Record<Lang,string> },
  { term: "BALANCE WHEEL",   label: { zh: "擺輪", ja: "テンプ" } as Partial<Record<Lang,string>>,
    def: { en: "The oscillating regulator — rotates back and forth at a fixed frequency (typically 6–10 beats/sec), dividing time into equal segments. Its precision determines the watch's accuracy.", zh: "振動調速器，以固定頻率來回擺動（通常每秒 6–10 次），將時間分割為等份。其精準度決定走時準確性。", ja: "振動する調整器。固定周波数（通常6〜10振動/秒）で往復し、時間を等分する。その精度が時計の精確さを決める。" } as Record<Lang,string> },
  { term: "MANUFACTURE",     label: { zh: "自製廠", ja: "マニュファクチュール" } as Partial<Record<Lang,string>>,
    def: { en: "A watchmaker that designs, produces, and finishes its own movements entirely in-house. Only a minority of brands qualify; those who source from ETA, Sellita, or others do not.", zh: "在內部完整設計、生產並精修自有機芯的製錶商。只有少數品牌符合資格；向外購機芯的品牌不在此列。", ja: "自社でムーブメントを完全に設計・製造・仕上げする時計師。資格を持つブランドは少数。外部調達は除外。" } as Record<Lang,string> },
  { term: "CÔTES DE GENÈVE", label: { zh: "日內瓦波紋", ja: "コート・ド・ジュネーブ" } as Partial<Record<Lang,string>>,
    def: { en: "Parallel stripes polished into movement plates at a slight angle. Originally functional; now a mark of craftsmanship. A skilled finisher produces 40–60 perfect stripes per hour.", zh: "施於機芯夾板的平行條紋拋光工藝，原具功能性，現為工藝象徵。熟練精修師每小時可完成 40–60 道完美條紋。", ja: "ムーブメントプレートに斜めに磨かれた平行ストライプ。元来は機能的、今は工芸の証。熟練仕上げ師は時間に40〜60本。" } as Record<Lang,string> },
  { term: "POWER RESERVE",   label: { zh: "動力儲存", ja: "パワーリザーブ" } as Partial<Record<Lang,string>>,
    def: { en: "Duration a fully wound watch runs before stopping. Typically 38–72 hours; some achieve 8 days. Longer reserve reflects mainspring capacity, balanced against isochronism — rate consistency across the full unwinding cycle.", zh: "完全上鍊後的運行時間，通常 38–72 小時，部分機芯達 8 天。動力儲存反映發條容量，需與等時性（走時一致性）取得平衡。", ja: "満巻き状態から停止までの動作時間。通常38〜72時間、一部は8日以上。スプリング容量を反映し、等時性とのバランスが必要。" } as Record<Lang,string> },
  { term: "PERLAGE",         label: { zh: "珍珠紋打磨", ja: "ペルラージュ" } as Partial<Record<Lang,string>>,
    def: { en: "Circular brushing applied to interior movement surfaces, creating overlapping circles like fish scales. Purely decorative — applied only where the wearer cannot see, a statement of craft made for itself alone.", zh: "施於機芯夾板內表面的圓形拋光，形成魚鱗狀圓圈紋路。純粹裝飾性，僅施於佩戴者看不見之處，是為工藝本身而生的宣言。", ja: "ムーブメント内面に施す円形ブラッシング。魚の鱗状の重なり合う円形パターン。完全装飾的 — 見えない面だけに施す、工芸自体のための声明。" } as Record<Lang,string> },
  { term: "HACKING SECONDS", label: { zh: "停秒功能", ja: "ハック機能" } as Partial<Record<Lang,string>>,
    def: { en: "Stops the seconds hand when the crown is pulled out, enabling precise synchronisation to an external time standard. Standard on modern watches; significant in vintage pieces as a marker of quality. From German Hemmung — to stop.", zh: "錶冠拉出時停止秒針，使腕錶能精確對準外部時間標準。現代腕錶的標準配備；在古董錶中是品質的標誌。源自德文 Hemmung——停止。", ja: "竜頭を引くと秒針が止まり、外部時刻基準に正確に合わせられる。現代時計の標準機能。ビンテージでは品質の指標。ドイツ語Hemmung（止める）由来。" } as Record<Lang,string> },
] as const;

// ─── Watch face SVG ───────────────────────────────────────────────────────────

function WatchSVG({ w, size = 160 }: { w: InventoryWatch; size?: number }) {
  const vb = 220, cx = 110, cy = 110, bezR = 98, dialR = 86, mR = 68;

  const ticks = Array.from({ length: 60 }, (_, i) => {
    const isHour = i % 5 === 0, isMain = i % 15 === 0;
    const rad = (i * 6 - 90) * Math.PI / 180;
    const o = dialR - 2, inn = isHour ? dialR - 10 : dialR - 5;
    return { x1: cx + o * Math.cos(rad), y1: cy + o * Math.sin(rad), x2: cx + inn * Math.cos(rad), y2: cy + inn * Math.sin(rad), isHour, skip: isMain, sw: isHour ? 1.2 : 0.5 };
  });

  const pos4 = ([-90, 0, 90, 180] as const).map((deg, i) => ({
    x: cx + mR * Math.cos(deg * Math.PI / 180),
    y: cy + mR * Math.sin(deg * Math.PI / 180),
    label: w.markerType === "arabic" ? ["12","3","6","9"][i] : w.markerType === "roman" ? ["XII","III","VI","IX"][i] : "",
    deg,
  }));

  const ink = w.isLight
    ? { t1: "rgba(0,0,0,0.36)", t2: "rgba(0,0,0,0.15)", h: "rgba(15,15,15,0.92)", hm: "rgba(15,15,15,0.8)", br: "rgba(0,0,0,0.2)" }
    : { t1: "rgba(255,255,255,0.42)", t2: "rgba(255,255,255,0.16)", h: "rgba(255,255,255,0.95)", hm: "rgba(255,255,255,0.88)", br: "rgba(255,255,255,0.16)" };

  const hRad = ((10 * 30 + 10 * 0.5) - 90) * Math.PI / 180;
  const mRad = (10 * 6 - 90) * Math.PI / 180;
  const uid = `inv-${w.id}`;

  return (
    <svg viewBox={`0 0 ${vb} ${vb}`} width={size} height={size}>
      <defs>
        <linearGradient id={`b${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#b0b0b0" /><stop offset="35%" stopColor="#888" />
          <stop offset="65%" stopColor="#a0a0a0" /><stop offset="100%" stopColor="#606060" />
        </linearGradient>
        <radialGradient id={`d${uid}`} cx="35%" cy="25%" r="75%">
          <stop offset="0%" stopColor={w.dialInner} /><stop offset="100%" stopColor={w.dialOuter} />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={bezR + 2} fill="rgba(0,0,0,0.4)" />
      <circle cx={cx} cy={cy} r={bezR} fill={`url(#b${uid})`} />
      <circle cx={cx} cy={cy} r={bezR - 9} fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="0.8" />
      <circle cx={cx} cy={cy} r={dialR} fill={`url(#d${uid})`} />
      {ticks.filter(t => !t.skip).map((t, i) => (
        <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
          stroke={t.isHour ? ink.t1 : ink.t2} strokeWidth={t.sw} strokeLinecap="round" />
      ))}
      {w.markerType === "baton"
        ? pos4.map(({ x, y, deg }) => <rect key={deg} x={x - 1.2} y={y - 7} width={2.4} height={14} rx={0.8} fill={w.markerAccent} transform={`rotate(${deg + 90},${x},${y})`} />)
        : pos4.map(({ x, y, label }) => <text key={label} x={x} y={y} textAnchor="middle" dominantBaseline="central" fill={w.markerAccent} fontSize={label.length > 2 ? 8 : 9} fontFamily="Inter,sans-serif" fontWeight="300">{label}</text>)}
      <text x={cx} y={cy - 22} textAnchor="middle" fill={ink.br} fontSize={4} fontFamily="Inter,sans-serif" letterSpacing="0.3em">{w.brand.split(" ")[0]}</text>
      <line x1={cx - 8} y1={cy + 6} x2={cx + 8} y2={cy + 6} stroke="rgba(44,94,184,0.18)" strokeWidth="0.5" />
      <line x1={cx} y1={cy} x2={cx + 44 * Math.cos(hRad)} y2={cy + 44 * Math.sin(hRad)} stroke={ink.h} strokeWidth="1.8" strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={cx + 63 * Math.cos(mRad)} y2={cy + 63 * Math.sin(mRad)} stroke={ink.hm} strokeWidth="1.3" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={3.5} fill={ink.h} />
      <circle cx={cx} cy={cy} r={2} fill="#1C4399" />
    </svg>
  );
}

// ─── Inventory card ───────────────────────────────────────────────────────────

function WatchCard({ w }: { w: InventoryWatch }) {
  const { t, lang } = useLanguage();
  const condKey = `col.condition.${w.condition}` as const;

  return (
    <Link
      href={`/discover/${w.id}`}
      className="group flex flex-col border-t border-[#2C2C2E] pt-8 pb-8 transition-all duration-300"
    >
      {/* Watch face */}
      <div className="flex justify-center mb-6 transition-transform duration-500 group-hover:-translate-y-1">
        <WatchSVG w={w} size={160} />
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col gap-2">
        <p className="text-[#8E8E93] text-[9px] tracking-[0.28em] uppercase">{w.brand}</p>
        <h3 className="text-white text-sm font-light leading-snug tracking-[0.03em] group-hover:text-white/80 transition-colors duration-300">{w.model}</h3>
        <p className="text-[#2E5CB8]/60 text-[9px] tracking-[0.18em] uppercase">{w.ref} · {w.year}</p>

        {/* Brief — appears on hover */}
        <p className="text-[#8E8E93] text-[11px] leading-relaxed tracking-wide transition-all duration-300 overflow-hidden max-h-0 opacity-0 group-hover:max-h-[80px] group-hover:opacity-100">
          {w.brief[lang]}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-1">
          {w.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-[#8E8E93]/60 text-[8px] tracking-[0.12em] border border-[#2C2C2E] px-1.5 py-0.5">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between gap-2">
        <div>
          <p className="text-white text-sm font-light tracking-wide">{w.price}</p>
          <span className="text-[#8E8E93] text-[8px] tracking-[0.2em] uppercase">{t(condKey)}</span>
        </div>
        <span className="text-[9px] tracking-[0.2em] uppercase text-white/50 group-hover:text-white transition-colors duration-300 flex items-center gap-1">
          VIEW <span className="group-hover:translate-x-0.5 transition-transform duration-300 inline-block">→</span>
        </span>
      </div>
    </Link>
  );
}

// ─── Complication card ────────────────────────────────────────────────────────

function CompCard({ comp, svgEl }: { comp: typeof COMPLICATIONS[number]; svgEl: React.ReactNode }) {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-[#2C2C2E] pt-10 pb-10 flex flex-col gap-5">
      <div className="opacity-55">{svgEl}</div>
      <div>
        <p className="text-[#8E8E93] text-[8px] tracking-[0.25em] uppercase mb-1">{comp.inventor} · {comp.year}</p>
        <h3 className="text-white text-base font-light tracking-[0.06em] mb-0.5">{comp.name}</h3>
        {lang !== "en" && comp.label[lang] && <p className="text-[#2E5CB8]/60 text-[9px] tracking-[0.18em] uppercase mb-3">{comp.label[lang]}</p>}
        <p className="text-white/55 text-xs font-light italic mb-3">{comp.short[lang]}</p>
        {open && <p className="text-[#8E8E93] text-xs leading-[1.85] tracking-wide mb-3">{comp.desc[lang]}</p>}
        <button onClick={() => setOpen(v => !v)}
          className="text-[#2E5CB8]/60 text-[9px] tracking-[0.2em] uppercase hover:text-[#2E5CB8] transition-colors duration-300">
          {open ? "LESS ↑" : "MORE →"}
        </button>
      </div>
    </div>
  );
}

// ─── SVG illustrations ────────────────────────────────────────────────────────

function Svg1() {
  return (
    <svg viewBox="0 0 64 64" width={52} height={52}>
      <style>{`@keyframes ts{from{transform-origin:32px 32px;transform:rotate(0)}to{transform-origin:32px 32px;transform:rotate(360deg)}}.ts{animation:ts 8s linear infinite}`}</style>
      <circle cx={32} cy={32} r={28} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
      <g className="ts">
        <circle cx={32} cy={32} r={16} fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="1"/>
        <line x1={32} y1={16} x2={32} y2={48} stroke="rgba(255,255,255,0.18)" strokeWidth="0.7"/>
        <line x1={16} y1={32} x2={48} y2={32} stroke="rgba(255,255,255,0.18)" strokeWidth="0.7"/>
        <circle cx={32} cy={32} r={5} fill="none" stroke="rgba(44,94,184,0.6)" strokeWidth="1"/>
        <circle cx={32} cy={32} r={1.8} fill="rgba(44,94,184,0.8)"/>
      </g>
    </svg>
  );
}
function Svg2() {
  return (
    <svg viewBox="0 0 64 64" width={52} height={52}>
      <style>{`@keyframes ps{from{transform-origin:32px 32px;transform:rotate(0)}to{transform-origin:32px 32px;transform:rotate(360deg)}}.ps{animation:ps 20s linear infinite}.ps2{animation:ps 8s linear infinite}`}</style>
      <circle cx={32} cy={32} r={28} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
      <g className="ps">{Array.from({length:12},(_,i)=>{const a=(i*30-90)*Math.PI/180;return<line key={i} x1={32+22*Math.cos(a)} y1={32+22*Math.sin(a)} x2={32+28*Math.cos(a)} y2={32+28*Math.sin(a)} stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>})}</g>
      <g className="ps2"><circle cx={32} cy={32} r={14} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.7"/>{Array.from({length:31},(_,i)=>{const a=(i*11.6-90)*Math.PI/180;return<circle key={i} cx={32+10*Math.cos(a)} cy={32+10*Math.sin(a)} r={i===0?1.8:0.7} fill={i===0?"rgba(44,94,184,0.8)":"rgba(255,255,255,0.28)"}/>})}</g>
    </svg>
  );
}
function Svg3() {
  return (
    <svg viewBox="0 0 64 64" width={52} height={52}>
      <style>{`@keyframes rt{0%,85%,100%{transform-origin:16px 44px;transform:rotate(0)}42%,58%{transform-origin:16px 44px;transform:rotate(-14deg)}}.rt{animation:rt 2.8s ease-in-out infinite}.rt2{animation:rt 2.8s ease-in-out 1.4s infinite}`}</style>
      <ellipse cx={32} cy={44} rx={22} ry={5} fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth="1"/>
      <g className="rt"><line x1={16} y1={44} x2={16} y2={16} stroke="rgba(255,255,255,0.38)" strokeWidth="1.2" strokeLinecap="round"/><circle cx={16} cy={14} r={2.5} fill="rgba(255,255,255,0.28)"/></g>
      <g className="rt2"><line x1={48} y1={44} x2={48} y2={16} stroke="rgba(44,94,184,0.6)" strokeWidth="1.2" strokeLinecap="round"/><circle cx={48} cy={14} r={2.5} fill="rgba(44,94,184,0.5)"/></g>
    </svg>
  );
}
function Svg4() {
  return (
    <svg viewBox="0 0 64 64" width={52} height={52}>
      <style>{`@keyframes cs{from{transform-origin:32px 32px;transform:rotate(0)}to{transform-origin:32px 32px;transform:rotate(360deg)}}.cs{animation:cs 3s linear infinite}`}</style>
      <circle cx={32} cy={32} r={28} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
      {Array.from({length:12},(_,i)=>{const a=(i*30-90)*Math.PI/180;const m=i%3===0;return<line key={i} x1={32+(m?22:24)*Math.cos(a)} y1={32+(m?22:24)*Math.sin(a)} x2={32+28*Math.cos(a)} y2={32+28*Math.sin(a)} stroke="rgba(255,255,255,0.22)" strokeWidth={m?1.1:0.5}/>})}
      <g className="cs"><line x1={32} y1={32} x2={32} y2={8} stroke="rgba(44,94,184,0.65)" strokeWidth="0.9" strokeLinecap="round"/></g>
      <line x1={32} y1={32} x2={42} y2={22} stroke="rgba(255,255,255,0.5)" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1={32} y1={32} x2={24} y2={20} stroke="rgba(255,255,255,0.38)" strokeWidth="0.9" strokeLinecap="round"/>
      <circle cx={32} cy={32} r={2.5} fill="rgba(255,255,255,0.8)"/>
    </svg>
  );
}

const COMP_SVGS = [<Svg1 key={0}/>, <Svg2 key={1}/>, <Svg3 key={2}/>, <Svg4 key={3}/>];

// ─── Lexicon entry ────────────────────────────────────────────────────────────

function LexEntry({ e }: { e: typeof LEXICON[number] }) {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-[#2C2C2E] py-5 cursor-pointer" onClick={() => setOpen(v => !v)}>
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-3">
          <span className="text-white text-xs tracking-[0.15em] font-light">{e.term}</span>
          {lang !== "en" && e.label[lang] && <span className="text-[#8E8E93] text-[9px] tracking-[0.12em]">{e.label[lang]}</span>}
        </div>
        <span className="text-[#8E8E93] text-[10px]" style={{ display: "inline-block", transition: "transform 0.3s", transform: open ? "rotate(180deg)" : "none" }}>↓</span>
      </div>
      {open && <p className="text-[#8E8E93] text-xs leading-[1.85] tracking-wide mt-4">{e.def[lang]}</p>}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function DiscoverPage() {
  const { t, lang } = useLanguage();
  const [category, setCategory] = useState<Category>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedWatch, setSelectedWatch] = useState("");

  const filtered = category === "all" ? INVENTORY : INVENTORY.filter(w => w.category === category);

  function inquire(w: InventoryWatch) {
    setSelectedWatch(`${w.brand} ${w.model} ${w.ref}`);
    setModalOpen(true);
  }

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-end pb-20 overflow-hidden bg-[#0B0B0B]">
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{ background: "var(--c-hero-gradient)" }} />
          {[700, 500, 340, 200].map((s, i) => (
            <div key={s} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2E5CB8]"
              style={{ width: s, height: s, opacity: 0.025 + i * 0.01 }} />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <p className="text-[#8E8E93] text-[10px] tracking-[0.5em] uppercase mb-6 animate-float-in">
            {t("disc.hero.eyebrow")}
          </p>
          <h1 className="text-white font-light leading-[1.05] animate-float-in"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)", animationDelay: "0.12s" }}>
            {t("disc.hero.title")}
          </h1>
        </div>
      </section>

      {/* ── Watch gallery ─────────────────────────────────────────────────── */}
      <section className="border-t border-[#2C2C2E] py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Filter bar */}
          <div className="flex items-center gap-0 mb-16 border-b border-[#2C2C2E] overflow-x-auto">
            {CATEGORIES.map(cat => (
              <button key={cat.key} type="button"
                onClick={() => setCategory(cat.key)}
                className={`text-[10px] tracking-[0.25em] uppercase pb-4 pr-8 whitespace-nowrap transition-all duration-300 border-b-2 -mb-px ${
                  category === cat.key
                    ? "text-white border-white"
                    : "text-[#8E8E93] border-transparent hover:text-white/60"
                }`}>
                {cat.label[lang]}
              </button>
            ))}
            <span className="ml-auto text-[#8E8E93] text-[9px] tracking-[0.2em] uppercase pb-4 whitespace-nowrap">
              {filtered.length} {lang === "zh" ? "枚" : lang === "ja" ? "点" : "pieces"}
            </span>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-0">
            {filtered.map((w, i) => (
              <div key={w.id} className={i % 4 !== 0 ? "border-l border-[#2C2C2E] pl-8" : ""}>
                <WatchCard w={w} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Four Pinnacles ────────────────────────────────────────────────── */}
      <section className="border-t border-[#2C2C2E] py-28 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div>
              <p className="text-[#8E8E93] text-[10px] tracking-[0.4em] uppercase mb-4">{t("disc.comp.eyebrow")}</p>
              <h2 className="text-white font-light leading-[1.15]" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}>{t("disc.comp.title")}</h2>
            </div>
            <div className="flex items-end">
              <p className="text-[#8E8E93] text-sm leading-relaxed tracking-wide">{t("disc.comp.sub")}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {COMPLICATIONS.map((comp, i) => (
              <div key={comp.id} className={i > 0 ? "sm:pl-8 sm:border-l border-[#2C2C2E]" : ""}>
                <CompCard comp={comp} svgEl={COMP_SVGS[i]} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Language of Time ──────────────────────────────────────────────── */}
      <section className="border-t border-[#2C2C2E] py-28 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
          <div className="lg:sticky lg:top-32 h-fit">
            <p className="text-[#8E8E93] text-[10px] tracking-[0.4em] uppercase mb-4">{t("disc.lex.eyebrow")}</p>
            <h2 className="text-white font-light leading-[1.15] mb-6" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}>{t("disc.lex.title")}</h2>
            <p className="text-[#8E8E93] text-sm leading-relaxed tracking-wide">{t("disc.lex.sub")}</p>
          </div>
          <div className="lg:col-span-2">
            {LEXICON.map(e => <LexEntry key={e.term} e={e} />)}
            <div className="border-t border-[#2C2C2E]" />
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="border-t border-[#2C2C2E] py-28 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-white font-light leading-[1.2] mb-8" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
            {t("disc.cta.title")}
          </h2>
          <p className="text-[#8E8E93] text-sm leading-relaxed tracking-wide mb-12 max-w-xl mx-auto">{t("disc.cta.body")}</p>
          <button onClick={() => { setSelectedWatch(""); setModalOpen(true); }}
            className="bg-[#1C4399] text-white text-[10px] tracking-[0.3em] uppercase px-14 py-5 hover:bg-transparent hover:border hover:border-[#1C4399] hover:text-white transition-all duration-500 border border-[#1C4399]">
            {t("disc.cta.btn")}
          </button>
          <p className="text-[#8E8E93] text-[10px] tracking-wider mt-6">{t("trust.sub")}</p>
        </div>
      </section>

      <BookingModal open={modalOpen} onClose={() => setModalOpen(false)} preselectedWatch={selectedWatch} />
    </>
  );
}
