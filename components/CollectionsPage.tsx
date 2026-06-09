"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Lang } from "@/lib/i18n";
import BookingModal from "@/components/BookingModal";

// ─── Watch data ───────────────────────────────────────────────────────────────

type Condition = "unworn" | "excellent" | "vgood";

interface Watch {
  id: string;
  brand: string;
  model: string;
  ref: string;
  year: number;
  condition: Condition;
  price: string;
  dialInner: string;
  dialOuter: string;
  isLight: boolean;
  markerType: "arabic" | "roman" | "baton";
  markerAccent: string;
  headline: Record<Lang, string>;
  story: Record<Lang, string>;
  pullquote: Record<Lang, string>;
  specs: { label: string; value: string }[];
}

const WATCHES: Watch[] = [
  {
    id: "pp5726",
    brand: "PATEK PHILIPPE",
    model: "Annual Calendar Moonphase",
    ref: "Ref. 5726A-014",
    year: 2021,
    condition: "excellent",
    price: "NT$ 2,680,000",
    dialInner: "#1e2c44",
    dialOuter: "#0d1828",
    isLight: false,
    markerType: "baton",
    markerAccent: "rgba(255,255,255,0.7)",
    headline: {
      en: "The Perpetual Argument",
      zh: "永恆的辯證",
      ja: "永遠の議論",
    },
    story: {
      en: "There are timepieces, and then there are arguments. The 5726A is Patek Philippe's annual calendar in stainless steel — a combination so rare that when examples appear, they carry the weight of a generation's horological debate. This particular piece, acquired from its original Taiwanese collector in early 2025, presents in exceptional condition with the characteristic slate blue dial that ages like a great wine: imperceptibly, and always toward beauty.\n\nThe annual calendar mechanism — requiring only one correction per year, on the first of March — was Patek's response to collectors who found the perpetual calendar's complexity unnecessary for a daily companion. In stainless steel, it became the rational man's irrational obsession.",
      zh: "有些腕錶只是計時工具，有些卻是一道命題。5726A 是百達翡麗以不鏽鋼製作的年曆錶——如此稀有的組合，每當市場上出現一枚，便帶著整整一個世代製錶論辯的分量。這枚腕錶於 2025 年初自台灣原始藏家處入手，以石板藍錶面呈現出色的品相；那枚錶面，如同佳釀般悄悄老化，始終朝向更深邃的美麗。\n\n年曆機制——每年僅需在三月一日進行一次調整——是百達翡麗對那些認為萬年曆過於繁複藏家的回應。以不鏽鋼呈現，它成為理性之人最不理性的執念。",
      ja: "時計には単なる計時器と、議論を呼ぶものがある。5726Aはパテック・フィリップのステンレス製年次カレンダー — この組み合わせは非常に希少で、市場に出るたびに一世代の時計論争の重みを帯びる。2025年初頭に台湾の初代コレクターから入手したこの個体は、スレートブルーのダイヤルとともに優れたコンディションを呈する。そのダイヤルは良いワインのように静かに熟成し、より深い美しさへと向かい続ける。\n\n年次カレンダー機構 — 年に一度、3月1日のみ修正が必要 — は、永久カレンダーの複雑さを不要と感じるコレクターへのパテックの回答だった。ステンレスで生まれたそれは、理性的な人間の非理性的な執念となった。",
    },
    pullquote: {
      en: "A combination so rare, it carries the weight of a generation's debate.",
      zh: "如此罕見的組合，承載著整個世代論辯的分量。",
      ja: "一世代の議論の重みを担う、それほど希少な組み合わせ。",
    },
    specs: [
      { label: "MOVEMENT", value: "Cal. 324 S QA LU 24H" },
      { label: "CASE", value: "38.5mm Stainless Steel" },
      { label: "CRYSTAL", value: "Sapphire, AR Coated" },
      { label: "CONDITION", value: "Excellent · 2023 Service" },
    ],
  },
  {
    id: "lange-datograph",
    brand: "A. LANGE & SÖHNE",
    model: "Datograph Perpetual Tourbillon",
    ref: "Ref. 740.056",
    year: 2019,
    condition: "excellent",
    price: "Inquire",
    dialInner: "#e8e4dc",
    dialOuter: "#ccc8c0",
    isLight: true,
    markerType: "arabic",
    markerAccent: "rgba(20,20,20,0.75)",
    headline: {
      en: "The German Case for Perfection",
      zh: "完美的德意志論述",
      ja: "完璧へのドイツ的論証",
    },
    story: {
      en: "Glashütte is a small Saxon town that has produced, across two centuries, a disproportionate share of the world's finest mechanical watches. The Datograph Perpetual Tourbillon is its most ambitious statement: a flyback chronograph, perpetual calendar, and hand-wound tourbillon in a single platinum case.\n\nThis example wears the silvery argenté dial particular to the platinum variant — a surface that catches light differently depending on the hour, making the same watch appear to shift mood across a day. To own one is to understand that perfection is not a destination; it is a language.",
      zh: "格拉蘇蒂是薩克森州的小鎮，卻在兩個世紀間，孕育出全球最頂尖機械錶中不成比例的份量。Datograph Perpetual Tourbillon 是其最雄心壯志的宣言：飛返計時、萬年曆、手上鍊陀飛輪，匯聚於一枚鉑金錶殼之中。\n\n這枚腕錶佩戴鉑金版本特有的銀色錶面——一個依據光線角度而變換風貌的錶面，讓同一枚錶在一天之內呈現不同的情緒。擁有它，便是理解了：完美不是目的地，而是一種語言。",
      ja: "グラスヒュッテはザクセン州の小さな町で、二世紀にわたり世界最高の機械式時計を不釣り合いなほど多く生み出してきた。Datograph Perpetual Tourbillonはその最も野心的な声明だ：フライバッククロノグラフ、パーペチュアルカレンダー、手巻きトゥールビヨン — すべてが一つのプラチナケースに宿る。\n\nこの個体はプラチナバリアント特有のシルバーアルジャンテダイヤルを纏う — 光の角度によって異なる表情を見せる表面で、同じ時計が一日の中で違う気分を呈する。それを所有することは、完璧とは目的地ではなく言語であると理解することだ。",
    },
    pullquote: {
      en: "Perfection is not a destination. It is a language.",
      zh: "完美不是目的地，而是一種語言。",
      ja: "完璧とは目的地ではない。それは言語だ。",
    },
    specs: [
      { label: "MOVEMENT", value: "Cal. L952.2 · 75hr Reserve" },
      { label: "CASE", value: "41.5mm Platinum" },
      { label: "COMPLICATIONS", value: "Flyback · Perpetual · Tourbillon" },
      { label: "CONDITION", value: "Excellent · Full Set" },
    ],
  },
  {
    id: "fpj-blue",
    brand: "F.P. JOURNE",
    model: "Chronomètre Bleu",
    ref: "CB TN 38",
    year: 2020,
    condition: "unworn",
    price: "NT$ 3,100,000",
    dialInner: "#1c3060",
    dialOuter: "#0a1840",
    isLight: false,
    markerType: "arabic",
    markerAccent: "rgba(255,255,255,0.82)",
    headline: {
      en: "The Conviction in Tantalum",
      zh: "鉭金屬的信念",
      ja: "タンタルへの確信",
    },
    story: {
      en: "François-Paul Journe built his first tourbillon at the age of 20, borrowed tools from his uncle, and has since refused every acquisition offer that has come his way. The Chronomètre Bleu, his signature resonance watch, encapsulates this independence: two balance wheels connected by the physics of vibration, keeping each other honest across time.\n\nThe blue — achieved by heating the brass movement parts — is not a colour but a philosophy. Unworn and undisturbed, this example arrived directly from the authorised retailer in 2024 and has never been wound for use.",
      zh: "弗朗索瓦-保羅·茹納在二十歲時，借用叔父的工具打造出第一枚陀飛輪，此後拒絕了所有收購邀約。Chronomètre Bleu，他的代表作共振腕錶，凝聚了這份獨立精神：兩個由振動物理學相互牽引的擒縱系統，跨越時光彼此守正。\n\n那一抹藍——透過加熱黃銅機芯零件而成——不只是一種顏色，而是一種哲學。這枚全新未佩戴的腕錶，2024 年直接自授權零售商取得，從未上鍊使用。",
      ja: "フランソワ＝ポール・ジュルヌは20歳の時、叔父から工具を借りて最初のトゥールビヨンを製作し、それ以来すべての買収提案を断り続けてきた。彼の代表作である共鳴時計Chronomètre Bleuはその独立精神を体現する：振動の物理学によって繋がれた2つのテンプが、時を超えてお互いを正し合う。\n\nその青 — 真鍮のムーブメントパーツを加熱することで生まれる — は色ではなく哲学だ。このアンウォーン個体は2024年に正規代理店から直接入手され、使用のために巻き上げられたことは一度もない。",
    },
    pullquote: {
      en: "Two balance wheels, connected by physics, keeping each other honest.",
      zh: "兩個擒縱系統，由物理法則相連，跨越時光彼此守正。",
      ja: "物理学によって繋がれた2つのテンプが、時を超えてお互いを正し合う。",
    },
    specs: [
      { label: "MOVEMENT", value: "Cal. 1499.3 · Resonance" },
      { label: "CASE", value: "38mm Tantalum" },
      { label: "DIAL", value: "18K Gold, Blue" },
      { label: "CONDITION", value: "Unworn · 2024 · Full Set" },
    ],
  },
  {
    id: "daytona-116500",
    brand: "ROLEX",
    model: "Cosmograph Daytona",
    ref: "Ref. 116500LN",
    year: 2022,
    condition: "excellent",
    price: "NT$ 1,480,000",
    dialInner: "#141414",
    dialOuter: "#060606",
    isLight: false,
    markerType: "arabic",
    markerAccent: "rgba(255,255,255,0.85)",
    headline: {
      en: "The Enduring Standard",
      zh: "恆久不變的標準",
      ja: "不変の基準",
    },
    story: {
      en: "Some watches exist to be collected. The Daytona exists to be worn. Since the ceramic bezel 116500LN debuted in 2016, it has become the benchmark against which all sports chronographs are judged — not because of what it does differently, but because of what it refuses to change.\n\nThis 2022 example has been worn perhaps a dozen times by its previous owner — a Taipei-based architect who replaced it with the newer 126500LN. The watch shows no marks consistent with regular use, and retains the crisp interaction of its Cerachrom bezel that characterises unworn examples.",
      zh: "有些腕錶是為收藏而生，而 Daytona 是為了被佩戴。自陶瓷錶圈 116500LN 於 2016 年亮相，它便成為所有運動計時錶的評判基準——不是因為它有何不同，而是因為它拒絕改變之物。\n\n這枚 2022 年腕錶，前主人是一位台北建築師，或許僅佩戴過十餘次，後以更新款 126500LN 替換。錶面無任何一般使用痕跡，Cerachrom 陶瓷錶圈仍保有近乎全新的清晰質感。",
      ja: "コレクションのために存在する時計がある。デイトナは着用するために存在する。セラミックベゼルの116500LNが2016年にデビューして以来、すべてのスポーツクロノグラフの評価基準となってきた — 何かが違うからではなく、変えることを拒絶するものがあるから。\n\nこの2022年個体の前オーナーは台北在住の建築家で、おそらく十数回しか着用せず、新しい126500LNに買い替えた。通常使用に伴う傷跡は一切なく、Cerachromベゼルのシャープな質感はアンウォーン同様を維持している。",
    },
    pullquote: {
      en: "Not because of what it does differently, but because of what it refuses to change.",
      zh: "不是因為它有何不同，而是因為它拒絕改變之物。",
      ja: "違うことをするからではなく、変えることを拒絶するものがあるから。",
    },
    specs: [
      { label: "MOVEMENT", value: "Cal. 4130 · 72hr Reserve" },
      { label: "CASE", value: "40mm Oystersteel" },
      { label: "BEZEL", value: "Cerachrom · Tachymeter" },
      { label: "CONDITION", value: "Excellent · Box & Papers" },
    ],
  },
];

// ─── Watch face SVG ───────────────────────────────────────────────────────────

function WatchFaceSVG({
  watch, size = 280,
}: {
  watch: Watch; size?: number;
}) {
  const vb = 280;
  const cx = 140, cy = 140;
  const bezR = 124;
  const dialR = 112;
  const markerR = 90;

  const ticks = Array.from({ length: 60 }, (_, i) => {
    const isHour = i % 5 === 0;
    const isMain = i % 15 === 0;
    const rad = (i * 6 - 90) * Math.PI / 180;
    const o = dialR - 2, inner = isHour ? dialR - 12 : dialR - 6;
    return {
      x1: cx + o * Math.cos(rad), y1: cy + o * Math.sin(rad),
      x2: cx + inner * Math.cos(rad), y2: cy + inner * Math.sin(rad),
      isHour, isMain, sw: isHour ? 1.3 : 0.6,
    };
  });

  const mainPos = ([-90, 0, 90, 180] as const).map((deg, i) => ({
    x: cx + markerR * Math.cos(deg * Math.PI / 180),
    y: cy + markerR * Math.sin(deg * Math.PI / 180),
    label: watch.markerType === "arabic" ? ["12", "3", "6", "9"][i]
      : watch.markerType === "roman" ? ["XII", "III", "VI", "IX"][i] : "",
    deg,
  }));

  const ink = watch.isLight
    ? { t1: "rgba(0,0,0,0.38)", t2: "rgba(0,0,0,0.16)", hand: "rgba(15,15,15,0.92)", handM: "rgba(15,15,15,0.82)", brand: "rgba(0,0,0,0.22)", brandS: "rgba(0,0,0,0.12)" }
    : { t1: "rgba(255,255,255,0.45)", t2: "rgba(255,255,255,0.18)", hand: "rgba(255,255,255,0.95)", handM: "rgba(255,255,255,0.9)", brand: "rgba(255,255,255,0.18)", brandS: "rgba(255,255,255,0.08)" };

  const hourRad = ((10 * 30 + 10 * 0.5) - 90) * Math.PI / 180;
  const minRad  = (10 * 6 - 90) * Math.PI / 180;
  const uid = `col-${watch.id}`;

  return (
    <svg viewBox={`0 0 ${vb} ${vb}`} width={size} height={size}>
      <defs>
        <linearGradient id={`bez-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#b0b0b0" />
          <stop offset="30%"  stopColor="#888888" />
          <stop offset="60%"  stopColor="#a0a0a0" />
          <stop offset="100%" stopColor="#606060" />
        </linearGradient>
        <radialGradient id={`dial-${uid}`} cx="35%" cy="25%" r="75%">
          <stop offset="0%"   stopColor={watch.dialInner} />
          <stop offset="100%" stopColor={watch.dialOuter} />
        </radialGradient>
      </defs>

      {/* Bezel shadow + silver ring */}
      <circle cx={cx} cy={cy} r={bezR + 2} fill="rgba(0,0,0,0.45)" />
      <circle cx={cx} cy={cy} r={bezR}     fill={`url(#bez-${uid})`} />
      <circle cx={cx} cy={cy} r={bezR - 11} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />

      {/* Dial */}
      <circle cx={cx} cy={cy} r={dialR} fill={`url(#dial-${uid})`} />
      <circle cx={cx} cy={cy} r={dialR - 0.5} fill="none" stroke={watch.isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.04)"} strokeWidth="1" />

      {/* Tick marks */}
      {ticks.filter(t => !t.isMain).map((t, i) => (
        <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
          stroke={t.isHour ? ink.t1 : ink.t2} strokeWidth={t.sw} strokeLinecap="round" />
      ))}

      {/* Main markers */}
      {watch.markerType === "baton"
        ? mainPos.map(({ x, y, deg }) => (
            <rect key={deg} x={x - 1.5} y={y - 8} width={3} height={16} rx={1}
              fill={watch.markerAccent}
              transform={`rotate(${deg + 90}, ${x}, ${y})`} />
          ))
        : mainPos.map(({ x, y, label }) => (
            <text key={label} x={x} y={y}
              textAnchor="middle" dominantBaseline="central"
              fill={watch.markerAccent}
              fontSize={label.length > 2 ? 9 : 11}
              fontFamily="Inter, sans-serif" fontWeight="300">
              {label}
            </text>
          ))}

      {/* Brand / model */}
      <text x={cx} y={cy - 28} textAnchor="middle"
        fill={ink.brand} fontSize={4.8} fontFamily="Inter, sans-serif" letterSpacing="0.32em" fontWeight="400">
        {watch.brand.split(" ")[0]}
      </text>
      <text x={cx} y={cy - 19} textAnchor="middle"
        fill={ink.brandS} fontSize={3.5} fontFamily="Inter, sans-serif" letterSpacing="0.2em">
        {watch.ref}
      </text>
      <line x1={cx - 10} y1={cy + 8} x2={cx + 10} y2={cy + 8}
        stroke="rgba(44,94,184,0.2)" strokeWidth="0.5" />

      {/* Hands */}
      <line x1={cx} y1={cy}
        x2={cx + 57 * Math.cos(hourRad)} y2={cy + 57 * Math.sin(hourRad)}
        stroke={ink.hand} strokeWidth="2.2" strokeLinecap="round" />
      <line x1={cx} y1={cy}
        x2={cx + 82 * Math.cos(minRad)} y2={cy + 82 * Math.sin(minRad)}
        stroke={ink.handM} strokeWidth="1.5" strokeLinecap="round" />

      <circle cx={cx} cy={cy} r={4}   fill={ink.hand} />
      <circle cx={cx} cy={cy} r={2.2} fill="#1C4399" />
    </svg>
  );
}

// ─── Condition badge ──────────────────────────────────────────────────────────

function ConditionBadge({ condition }: { condition: Condition }) {
  const { t } = useLanguage();
  const key = `col.condition.${condition}` as const;
  return (
    <span className="text-[#8E8E93] text-[9px] tracking-[0.25em] uppercase border border-[#2C2C2E] px-2 py-0.5">
      {t(key)}
    </span>
  );
}

// ─── Lead piece ───────────────────────────────────────────────────────────────

function LeadPiece({ watch, onInquire }: { watch: Watch; onInquire: () => void }) {
  const { t, lang } = useLanguage();

  return (
    <section id="watches" className="border-t border-[#2C2C2E] py-28 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <p className="text-[#8E8E93] text-[10px] tracking-[0.4em] uppercase mb-20">
          {t("col.lead.eyebrow")}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Watch + specs */}
          <div>
            <div className="flex justify-center mb-10">
              <WatchFaceSVG watch={watch} size={280} />
            </div>

            {/* Specs grid */}
            <div className="border-t border-[#2C2C2E] pt-8">
              <p className="text-[#8E8E93] text-[9px] tracking-[0.35em] uppercase mb-6">
                {t("col.specs")}
              </p>
              <div className="grid grid-cols-2 gap-y-5">
                {watch.specs.map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-[#8E8E93] text-[9px] tracking-[0.2em] uppercase mb-1">{label}</p>
                    <p className="text-white/80 text-xs tracking-wide">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Story */}
          <div className="lg:pt-4">
            <p className="text-[#8E8E93] text-[10px] tracking-[0.3em] uppercase mb-3">
              {watch.brand}
            </p>
            <h2
              className="text-white font-light leading-[1.1] tracking-[0.02em] mb-2"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)" }}
            >
              {watch.model}
            </h2>
            <p className="text-[#2E5CB8]/70 text-[10px] tracking-[0.2em] uppercase mb-8">
              {watch.ref} · {watch.year}
            </p>

            {/* Headline */}
            <h3
              className="text-white/90 font-light leading-[1.2] italic mb-8"
              style={{ fontSize: "clamp(1.3rem, 2.5vw, 2rem)" }}
            >
              "{watch.headline[lang]}"
            </h3>

            {/* Story paragraphs */}
            <div className="space-y-5 mb-10">
              {watch.story[lang].split("\n\n").map((para, i) => (
                <p key={i} className="text-[#8E8E93] text-sm leading-[1.85] tracking-wide">
                  {para}
                </p>
              ))}
            </div>

            {/* Pull quote */}
            <blockquote className="border-l-2 border-[#1C4399]/50 pl-6 mb-10">
              <p className="text-white/60 text-sm leading-relaxed tracking-wide italic">
                {watch.pullquote[lang]}
              </p>
            </blockquote>

            {/* Price + CTA */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#8E8E93] text-[9px] tracking-[0.3em] uppercase mb-1">ASKING PRICE</p>
                <p className="text-white text-xl font-light tracking-[0.05em]">{watch.price}</p>
              </div>
              <div className="flex items-center gap-4">
                <ConditionBadge condition={watch.condition} />
                <button
                  onClick={onInquire}
                  className="text-[10px] tracking-[0.25em] uppercase text-white border border-white/30 px-8 py-3 hover:bg-white hover:text-black transition-all duration-500"
                >
                  {t("col.inquire")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Secondary card ───────────────────────────────────────────────────────────

function WatchCard({ watch, onInquire }: { watch: Watch; onInquire: () => void }) {
  const { t, lang } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  const paras = watch.story[lang].split("\n\n");

  return (
    <div className="border-t border-[#2C2C2E] pt-12 pb-12 flex flex-col gap-8">
      {/* Watch face */}
      <div className="flex justify-start">
        <WatchFaceSVG watch={watch} size={180} />
      </div>

      {/* Info */}
      <div className="flex-1">
        <p className="text-[#8E8E93] text-[9px] tracking-[0.3em] uppercase mb-1">{watch.brand}</p>
        <h3 className="text-white text-lg font-light tracking-[0.04em] mb-1">{watch.model}</h3>
        <p className="text-[#2E5CB8]/60 text-[10px] tracking-[0.18em] uppercase mb-5">
          {watch.ref} · {watch.year}
        </p>

        <p className="text-white/70 text-sm font-light italic leading-snug mb-5">
          "{watch.headline[lang]}"
        </p>

        {/* First paragraph always visible */}
        <p className="text-[#8E8E93] text-xs leading-[1.8] tracking-wide mb-3">
          {paras[0]}
        </p>

        {/* Second paragraph expands */}
        {paras[1] && (
          <>
            {expanded && (
              <p className="text-[#8E8E93] text-xs leading-[1.8] tracking-wide mb-3">
                {paras[1]}
              </p>
            )}
            <button
              onClick={() => setExpanded(v => !v)}
              className="text-[#2E5CB8]/70 text-[10px] tracking-[0.2em] uppercase hover:text-[#2E5CB8] transition-colors duration-300"
            >
              {expanded ? "COLLAPSE ↑" : "READ MORE →"}
            </button>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-[#2C2C2E] pt-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-white text-sm font-light tracking-wide">{watch.price}</p>
          <ConditionBadge condition={watch.condition} />
        </div>
        <button
          onClick={onInquire}
          className="text-[9px] tracking-[0.25em] uppercase text-white border border-white/20 px-5 py-2.5 hover:bg-white hover:text-black transition-all duration-500 whitespace-nowrap"
        >
          {t("col.inquire")}
        </button>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function CollectionsPage() {
  const { t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedWatch, setSelectedWatch] = useState("");

  function inquire(watch: Watch) {
    setSelectedWatch(`${watch.brand} ${watch.model} ${watch.ref}`);
    setModalOpen(true);
  }

  const [lead, ...rest] = WATCHES;

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-end pb-24 overflow-hidden bg-[#0B0B0B]">
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{ background: "var(--c-hero-gradient)" }} />
          {[800, 580, 390, 240].map((size, i) => (
            <div key={size}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2E5CB8]"
              style={{ width: size, height: size, opacity: 0.025 + i * 0.01 }} />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <p className="text-[#8E8E93] text-[10px] tracking-[0.5em] uppercase mb-4 animate-float-in">
            {t("col.hero.eyebrow")}
          </p>
          <p className="text-[#2E5CB8]/60 text-[9px] tracking-[0.4em] uppercase mb-6 animate-float-in"
            style={{ animationDelay: "0.05s" }}>
            {t("col.hero.season")}
          </p>
          <h1
            className="text-white font-light leading-[1.1] tracking-[0.02em] animate-float-in"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)", animationDelay: "0.15s" }}
          >
            {t("col.hero.title")}
            <br />
            <span className="text-white/55">{t("col.hero.title2")}</span>
          </h1>
        </div>
      </section>

      {/* ── Lead piece ────────────────────────────────────────────────────── */}
      <LeadPiece watch={lead} onInquire={() => inquire(lead)} />

      {/* ── Rest of collection ────────────────────────────────────────────── */}
      <section className="border-t border-[#2C2C2E] py-28 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8E8E93] text-[10px] tracking-[0.4em] uppercase mb-20">
            {t("col.more.eyebrow")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {rest.map((watch, i) => (
              <div key={watch.id} className={i > 0 ? "md:pl-10 md:border-l border-[#2C2C2E]" : ""}>
                {i < rest.length - 1 && <div className={i > 0 ? "md:pr-10" : "md:pr-10"} />}
                <div className={i > 0 ? "pl-0 md:pl-0" : ""}>
                  <WatchCard watch={watch} onInquire={() => inquire(watch)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="border-t border-[#2C2C2E] py-28 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-white font-light leading-[1.2] tracking-[0.03em] mb-8"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            {t("col.cta.title")}
          </h2>
          <p className="text-[#8E8E93] text-sm leading-relaxed tracking-wide mb-12 max-w-xl mx-auto">
            {t("col.cta.body")}
          </p>
          <button
            onClick={() => { setSelectedWatch(""); setModalOpen(true); }}
            className="bg-[#1C4399] text-white text-[10px] tracking-[0.3em] uppercase px-14 py-5 hover:bg-transparent hover:border hover:border-[#1C4399] hover:text-white transition-all duration-500 border border-[#1C4399]"
          >
            {t("col.cta.btn")}
          </button>
          <p className="text-[#8E8E93] text-[10px] tracking-wider mt-6">
            {t("trust.sub")}
          </p>
        </div>
      </section>

      <BookingModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        preselectedWatch={selectedWatch}
      />
    </>
  );
}
