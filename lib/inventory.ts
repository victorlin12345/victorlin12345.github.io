import type { Lang } from "@/lib/i18n";

export type Category = "all" | "dress" | "sport" | "complication" | "independent";
export type Condition = "unworn" | "excellent" | "vgood";

export interface InventoryWatch {
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
  category: Exclude<Category, "all">;
  tags: string[];
  brief: Record<Lang, string>;
  story: Record<Lang, string>;
  pullquote: Record<Lang, string>;
  specs: { label: string; value: string }[];
}

export const INVENTORY: InventoryWatch[] = [
  {
    id: "pp5726",
    brand: "PATEK PHILIPPE", model: "Annual Calendar Moonphase", ref: "Ref. 5726A-014",
    year: 2021, condition: "excellent", price: "NT$ 2,680,000",
    dialInner: "#1e2c44", dialOuter: "#0d1828", isLight: false,
    markerType: "baton", markerAccent: "rgba(255,255,255,0.7)",
    category: "complication", tags: ["Annual Calendar", "Moon Phase", "Stainless"],
    brief: {
      en: "The annual calendar in stainless steel — Patek's rarest configuration, requiring a single correction per year.",
      zh: "不鏽鋼年曆錶——百達翡麗最罕見的配置，每年僅需調整一次。",
      ja: "ステンレスの年次カレンダー — パテック最希少な構成、年に一度の修正のみ。",
    },
    story: {
      en: "There are timepieces, and then there are arguments. The 5726A is Patek Philippe's annual calendar in stainless steel — a combination so rare that when examples appear, they carry the weight of a generation's horological debate. This particular piece, acquired from its original Taiwanese collector in early 2025, presents in exceptional condition with the characteristic slate blue dial that ages like a great wine: imperceptibly, and always toward beauty.\n\nThe annual calendar mechanism — requiring only one correction per year, on the first of March — was Patek's response to collectors who found the perpetual calendar's complexity unnecessary for a daily companion. In stainless steel, it became the rational man's irrational obsession.",
      zh: "有些腕錶只是計時工具，有些卻是一道命題。5726A 是百達翡麗以不鏽鋼製作的年曆錶——如此稀有的組合，每當市場上出現一枚，便帶著整整一個世代製錶論辯的分量。這枚腕錶於 2025 年初自台灣原始藏家處入手，以石板藍錶面呈現出色的品相；那枚錶面，如同佳釀般悄悄老化，始終朝向更深邃的美麗。\n\n年曆機制——每年僅需在三月一日進行一次調整——是百達翡麗對那些認為萬年曆過於繁複藏家的回應。以不鏽鋼呈現，它成為理性之人最不理性的執念。",
      ja: "時計には単なる計時器と、議論を呼ぶものがある。5726Aはパテック・フィリップのステンレス製年次カレンダー — この組み合わせは非常に希少で、市場に出るたびに一世代の時計論争の重みを帯びる。2025年初頭に台湾の初代コレクターから入手したこの個体は、スレートブルーのダイヤルとともに優れたコンディションを呈する。\n\n年次カレンダー機構 — 年に一度、3月1日のみ修正が必要 — は、永久カレンダーの複雑さを不要と感じるコレクターへのパテックの回答だった。ステンレスで生まれたそれは、理性的な人間の非理性的な執念となった。",
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
    id: "lange-dato",
    brand: "A. LANGE & SÖHNE", model: "Datograph Perpetual Tourbillon", ref: "Ref. 740.056",
    year: 2019, condition: "excellent", price: "Inquire",
    dialInner: "#e8e4dc", dialOuter: "#ccc8c0", isLight: true,
    markerType: "arabic", markerAccent: "rgba(20,20,20,0.75)",
    category: "complication", tags: ["Flyback", "Perpetual", "Tourbillon", "Platinum"],
    brief: {
      en: "Flyback chronograph, perpetual calendar, and tourbillon united in platinum. The German ideal made physical.",
      zh: "飛返計時、萬年曆與陀飛輪匯於鉑金之中。德國理想的具體化。",
      ja: "フライバック、パーペチュアル、トゥールビヨンがプラチナで統合。ドイツの理想の具現化。",
    },
    story: {
      en: "Glashütte is a small Saxon town that has produced, across two centuries, a disproportionate share of the world's finest mechanical watches. The Datograph Perpetual Tourbillon is its most ambitious statement: a flyback chronograph, perpetual calendar, and hand-wound tourbillon in a single platinum case.\n\nThis example wears the silvery argenté dial particular to the platinum variant — a surface that catches light differently depending on the hour, making the same watch appear to shift mood across a day. To own one is to understand that perfection is not a destination; it is a language.",
      zh: "格拉蘇蒂是薩克森州的小鎮，卻在兩個世紀間，孕育出全球最頂尖機械錶中不成比例的份量。Datograph Perpetual Tourbillon 是其最雄心壯志的宣言：飛返計時、萬年曆、手上鍊陀飛輪，匯聚於一枚鉑金錶殼之中。\n\n這枚腕錶佩戴鉑金版本特有的銀色錶面——一個依據光線角度而變換風貌的錶面，讓同一枚錶在一天之內呈現不同的情緒。擁有它，便是理解了：完美不是目的地，而是一種語言。",
      ja: "グラスヒュッテはザクセン州の小さな町で、二世紀にわたり世界最高の機械式時計を不釣り合いなほど多く生み出してきた。Datograph Perpetual Tourbillonはその最も野心的な声明だ。\n\nこの個体はプラチナバリアント特有のシルバーアルジャンテダイヤルを纏う — 光の角度によって異なる表情を見せる表面で、同じ時計が一日の中で違う気分を呈する。それを所有することは、完璧とは目的地ではなく言語であると理解することだ。",
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
    brand: "F.P. JOURNE", model: "Chronomètre Bleu", ref: "CB TN 38",
    year: 2020, condition: "unworn", price: "NT$ 3,100,000",
    dialInner: "#1c3060", dialOuter: "#0a1840", isLight: false,
    markerType: "arabic", markerAccent: "rgba(255,255,255,0.82)",
    category: "independent", tags: ["Resonance", "Tantalum", "Unworn"],
    brief: {
      en: "Two balance wheels in resonance, housed in tantalum. Unworn since its 2024 retail acquisition.",
      zh: "鉭金屬錶殼內的共振雙擒縱。自 2024 年自零售商購入後，全新未佩戴。",
      ja: "タンタルケースに収められた共鳴2テンプ。2024年小売購入以来アンウォーン。",
    },
    story: {
      en: "François-Paul Journe built his first tourbillon at the age of 20, borrowed tools from his uncle, and has since refused every acquisition offer that has come his way. The Chronomètre Bleu, his signature resonance watch, encapsulates this independence: two balance wheels connected by the physics of vibration, keeping each other honest across time.\n\nThe blue — achieved by heating the brass movement parts — is not a colour but a philosophy. Unworn and undisturbed, this example arrived directly from the authorised retailer in 2024 and has never been wound for use.",
      zh: "弗朗索瓦-保羅·茹納在二十歲時，借用叔父的工具打造出第一枚陀飛輪，此後拒絕了所有收購邀約。Chronomètre Bleu，他的代表作共振腕錶，凝聚了這份獨立精神：兩個由振動物理學相互牽引的擒縱系統，跨越時光彼此守正。\n\n那一抹藍——透過加熱黃銅機芯零件而成——不只是一種顏色，而是一種哲學。這枚全新未佩戴的腕錶，2024 年直接自授權零售商取得，從未上鍊使用。",
      ja: "フランソワ＝ポール・ジュルヌは20歳の時、叔父から工具を借りて最初のトゥールビヨンを製作し、それ以来すべての買収提案を断り続けてきた。彼の代表作である共鳴時計Chronomètre Bleuはその独立精神を体現する。\n\nその青 — 真鍮のムーブメントパーツを加熱することで生まれる — は色ではなく哲学だ。このアンウォーン個体は2024年に正規代理店から直接入手され、使用のために巻き上げられたことは一度もない。",
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
    id: "daytona",
    brand: "ROLEX", model: "Cosmograph Daytona", ref: "Ref. 116500LN",
    year: 2022, condition: "excellent", price: "NT$ 1,480,000",
    dialInner: "#141414", dialOuter: "#060606", isLight: false,
    markerType: "arabic", markerAccent: "rgba(255,255,255,0.85)",
    category: "sport", tags: ["Chronograph", "Cerachrom", "Oystersteel"],
    brief: {
      en: "The ceramic bezel Daytona in black. Worn perhaps a dozen times; shows no trace of it.",
      zh: "黑色陶瓷錶圈 Daytona。或許佩戴過十餘次，卻毫無痕跡。",
      ja: "ブラックセラミックベゼルのデイトナ。十数回の着用痕跡なし。",
    },
    story: {
      en: "Some watches exist to be collected. The Daytona exists to be worn. Since the ceramic bezel 116500LN debuted in 2016, it has become the benchmark against which all sports chronographs are judged — not because of what it does differently, but because of what it refuses to change.\n\nThis 2022 example has been worn perhaps a dozen times by its previous owner — a Taipei-based architect who replaced it with the newer 126500LN. The watch shows no marks consistent with regular use, and retains the crisp interaction of its Cerachrom bezel that characterises unworn examples.",
      zh: "有些腕錶是為收藏而生，而 Daytona 是為了被佩戴。自陶瓷錶圈 116500LN 於 2016 年亮相，它便成為所有運動計時錶的評判基準——不是因為它有何不同，而是因為它拒絕改變之物。\n\n這枚 2022 年腕錶，前主人是一位台北建築師，或許僅佩戴過十餘次，後以更新款 126500LN 替換。錶面無任何一般使用痕跡，Cerachrom 陶瓷錶圈仍保有近乎全新的清晰質感。",
      ja: "コレクションのために存在する時計がある。デイトナは着用するために存在する。セラミックベゼルの116500LNが2016年にデビューして以来、すべてのスポーツクロノグラフの評価基準となってきた。\n\nこの2022年個体の前オーナーは台北在住の建築家で、おそらく十数回しか着用せず、新しい126500LNに買い替えた。通常使用に伴う傷跡は一切なく、Cerachromベゼルのシャープな質感はアンウォーン同様を維持している。",
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
  {
    id: "ap-roa",
    brand: "AUDEMARS PIGUET", model: "Royal Oak Jumbo Extra-Thin", ref: "Ref. 15202ST",
    year: 2020, condition: "excellent", price: "NT$ 2,200,000",
    dialInner: "#1a2840", dialOuter: "#0d1828", isLight: false,
    markerType: "baton", markerAccent: "rgba(255,255,255,0.65)",
    category: "dress", tags: ["Tapisserie", "39mm", "Integrated Bracelet"],
    brief: {
      en: "The original Royal Oak, 39mm, at just 8.1mm thin. Genta's napkin sketch, perfected over fifty years.",
      zh: "原版皇家橡樹，39mm，僅 8.1mm 薄。真特的餐巾紙草圖，五十年精進的結果。",
      ja: "オリジナルロイヤルオーク、39mm、わずか8.1mm薄。ジェンタのナプキンスケッチ、五十年の完成形。",
    },
    story: {
      en: "In 1972, Audemars Piguet's management gave Gerald Genta a brief: design a watch overnight, for presentation the following morning. He produced the Royal Oak — an octagonal bezel, exposed screws, integrated bracelet — a complete repudiation of everything the watch industry considered acceptable at a luxury price point.\n\nThe 15202, successor to the original 5402, preserves Genta's geometry without compromise. At 39mm and 8.1mm thin, it remains the most architecturally honest expression of his vision: a watch that makes no apology for being steel, for being bold, for being exactly what it is.",
      zh: "1972 年，愛彼管理層給傑拉德·真特一個任務：連夜設計一枚腕錶，以供次日早上簡報。他交出了皇家橡樹——八角形錶圈、裸露螺絲、一體式錶鏈——對當時製錶業所有「奢華定價應有之物」的全面否定。\n\n15202，原款 5402 的繼承者，毫不妥協地保存了真特的幾何美學。39mm、8.1mm 薄，它仍是其設計願景最具建築誠意的呈現：一枚不為自己的鋼製、大膽、真實而道歉的腕錶。",
      ja: "1972年、オーデマ ピゲの経営陣はジェラルド・ジェンタに一夜でプレゼン用の時計をデザインするよう依頼した。彼はロイヤルオークを生み出した — 八角形ベゼル、露出したスクリュー、一体型ブレスレット — 高級品の価格帯で業界が認めていたすべてへの完全な否定。\n\n15202は、オリジナルの5402の後継で、ジェンタのジオメトリーを妥協なく保存する。39mm、8.1mm薄。それは彼のビジョンの最も建築的に誠実な表現 — 鋼であること、大胆であること、まさにそれ自身であることを詫びない時計だ。",
    },
    pullquote: {
      en: "A watch that makes no apology for being steel, for being bold, for being exactly what it is.",
      zh: "一枚不為自己的鋼製、大膽、真實而道歉的腕錶。",
      ja: "鋼であること、大胆であること、まさにそれ自身であることを詫びない時計。",
    },
    specs: [
      { label: "MOVEMENT", value: "Cal. 2121 · 40hr Reserve" },
      { label: "CASE", value: "39mm Stainless Steel · 8.1mm" },
      { label: "DIAL", value: "Blue Grande Tapisserie" },
      { label: "CONDITION", value: "Excellent · Full Set" },
    ],
  },
  {
    id: "omega-speed",
    brand: "OMEGA", model: "Speedmaster Professional", ref: "Ref. 145.022-69",
    year: 1969, condition: "vgood", price: "NT$ 680,000",
    dialInner: "#0d0d0d", dialOuter: "#050505", isLight: false,
    markerType: "arabic", markerAccent: "rgba(255,255,255,0.78)",
    category: "sport", tags: ["Pre-Moon", "Vintage", "Hesalite", "Cal. 321"],
    brief: {
      en: "A 1969 Speedmaster: the calibre and reference that went to the Moon. Presented with original bracelet.",
      zh: "1969 年超霸：搭載登上月球的機芯與參考號。附原廠錶鏈。",
      ja: "1969年スピードマスター：月に行ったキャリバーとレファレンス。オリジナルブレスレット付き。",
    },
    story: {
      en: "In 1965, NASA put the Speedmaster through tests that destroyed every other watch submitted. Extreme temperatures, shock, vacuum, humidity, acceleration — the Speedmaster survived all of it. It went to the Moon on the wrists of Armstrong, Aldrin, and Collins not as a symbol, but as a tool.\n\nThis 1969 example wears the 145.022 reference that accompanied the Apollo missions. The hesalite crystal carries the slight wear patina consistent with careful vintage ownership; the cal. 321 movement was serviced in 2023 and keeps chronometer-grade accuracy. Presented with the original bracelet and period-correct documentation.",
      zh: "1965 年，NASA 對超霸進行了摧毀所有其他送審腕錶的測試。極端溫度、衝擊、真空、濕度、加速度——超霸全部通過。它以工具（而非象徵）之姿，戴在阿姆斯壯、艾德林與柯林斯的手腕上登上月球。\n\n這枚 1969 年腕錶佩戴陪同阿波羅任務的 145.022 參考號。Hesalite 水晶鏡面帶有謹慎保存下的古董包漿；Cal. 321 機芯於 2023 年完成保養，保持精密計時器等級精準度。附原廠錶鏈及同期文件。",
      ja: "1965年、NASAはスピードマスターを提出された他のすべての時計を破壊するテストにかけた。極端な温度、衝撃、真空、湿度、加速 — スピードマスターはすべてを乗り越えた。それはシンボルとしてではなく、ツールとして、アームストロング、オルドリン、コリンズの手首で月に行った。\n\nこの1969年個体はアポロミッションに同行した145.022レファレンスを纏う。ヘサライトクリスタルは慎重なビンテージ所有に伴う軽微な使用感を帯び、Cal.321ムーブメントは2023年にサービスされ、クロノメーター精度を維持している。オリジナルブレスレットと当時の書類付き。",
    },
    pullquote: {
      en: "Not as a symbol, but as a tool — the only standard that matters.",
      zh: "不作為象徵，而作為工具——唯一重要的標準。",
      ja: "シンボルとしてではなく、ツールとして — それが唯一重要な基準だ。",
    },
    specs: [
      { label: "MOVEMENT", value: "Cal. 321 · Manual Wind" },
      { label: "CASE", value: "42mm Stainless Steel" },
      { label: "CRYSTAL", value: "Hesalite (Original)" },
      { label: "CONDITION", value: "Very Good · 2023 Service" },
    ],
  },
  {
    id: "vc-pat",
    brand: "VACHERON CONSTANTIN", model: "Patrimony Contemporaine", ref: "Ref. 85180",
    year: 2018, condition: "excellent", price: "NT$ 680,000",
    dialInner: "#e4e0d8", dialOuter: "#cac6be", isLight: true,
    markerType: "baton", markerAccent: "rgba(15,15,15,0.55)",
    category: "dress", tags: ["Ultra-Thin", "White Gold", "40mm"],
    brief: {
      en: "Ultra-thin white gold, 40mm. The kind of watch that disappears under a shirt cuff — which is exactly the point.",
      zh: "白金超薄，40mm。那種消失在袖口之下的腕錶——而這正是重點所在。",
      ja: "超薄型ホワイトゴールド、40mm。シャツの袖の下に消えるような時計 — それこそが要点。",
    },
    story: {
      en: "There is a category of watch that refuses to announce itself. The Patrimony Contemporaine exists in this space — a 40mm white gold case at just 8.09mm, with a movement that disappears beneath the dial. It asks nothing of its wearer except to notice that it is there.\n\nVacheron Constantin, founded in 1755 and continuously in operation since, brings the deepest institutional knowledge to the problem of restraint. This example has been worn socially — perhaps two hundred hours total. Its opaline dial retains the pristine lustre that age rarely spares.",
      zh: "有一類腕錶，拒絕宣告自己的存在。Patrimony Contemporaine 便存在於這個空間——40mm 白金錶殼，僅 8.09mm 薄，機芯消失在錶面之下。它對佩戴者別無所求，只是在那裡。\n\n成立於 1755 年且從未中斷營運的江詩丹頓，帶來對「克制」這一問題最深厚的機構知識。這枚腕錶曾於社交場合中佩戴——總計或許兩百小時。其太陽放射紋錶面保有時光鮮少留存的純淨光澤。",
      ja: "自らを宣言することを拒む時計のカテゴリーがある。Patrimony Contemporaineはこの空間に存在する — 40mm白金ケース、わずか8.09mm、ダイヤルの下に消えるムーブメント。着用者に要求するのは、そこにあることに気づくことだけだ。\n\n1755年創業以来途切れることなく続くヴァシュロン・コンスタンタンは、節制の問題に最も深い機関的知識をもたらす。この個体は社交の場で着用された — 総計おそらく200時間。オパリンダイヤルは時が滅多に残さない清廉な輝きを保っている。",
    },
    pullquote: {
      en: "It asks nothing of its wearer except to notice that it is there.",
      zh: "它對佩戴者別無所求，只是在那裡。",
      ja: "着用者に要求するのは、そこにあることに気づくことだけ。",
    },
    specs: [
      { label: "MOVEMENT", value: "Cal. 2450Q · 40hr Reserve" },
      { label: "CASE", value: "40mm White Gold · 8.09mm" },
      { label: "DIAL", value: "Opaline Silver" },
      { label: "CONDITION", value: "Excellent · Full Set" },
    ],
  },
  {
    id: "gs-snow",
    brand: "GRAND SEIKO", model: "Spring Drive Snowflake", ref: "SBGA211",
    year: 2023, condition: "unworn", price: "NT$ 560,000",
    dialInner: "#d8e0e8", dialOuter: "#c0c8d0", isLight: true,
    markerType: "baton", markerAccent: "rgba(15,15,15,0.5)",
    category: "independent", tags: ["Spring Drive", "Snowflake", "Titanium"],
    brief: {
      en: "The Snowflake dial captures Shinshu winter in textured white. Spring Drive: accurate to ±1 second per day.",
      zh: "雪花錶面以立體白色捕捉信州冬景。彈簧驅動機芯：每日精準度達 ±1 秒。",
      ja: "スノーフレークダイヤルが立体的な白で信州の冬を表現。スプリングドライブ：日差±1秒の精度。",
    },
    story: {
      en: "The Snowflake dial was not designed in a studio. It was observed: the surface texture of snow-covered fields in Shinshu, Japan, where Grand Seiko's Shizukuishi atelier has operated since 1959. The watchmakers there translated it into a dial that changes under every light — sometimes flat white, sometimes luminous with depth.\n\nThe movement beneath it is a Spring Drive: a hybrid that uses a mechanical mainspring but regulates with an electromagnetic glide spring, achieving accuracy of ±1 second per day. This example arrived directly from Shinshu and has never been wound for daily use.",
      zh: "雪花錶面不是在設計室裡誕生的，而是被觀察到的：日本信州被雪覆蓋的田野表面紋理，那裡正是精工表的雫石工坊自 1959 年以來的所在地。那裡的製錶師將它轉化為一個在每種光線下都會變化的錶面——有時扁平白色，有時發光帶有深度。\n\n其下的機芯是彈簧驅動：一種以機械發條驅動但以電磁滑動彈簧調速的混合機構，達到每日 ±1 秒的精準度。這枚腕錶直接來自信州，從未上鍊日常使用。",
      ja: "スノーフレークダイヤルはスタジオで設計されたのではなく、観察された：グランドセイコーの雫石アトリエが1959年から操業している信州の雪に覆われた田んぼの表面テクスチャーだ。そこの時計師たちはそれを、あらゆる光の下で変わるダイヤルに変換した。\n\nその下のムーブメントはスプリングドライブ：機械式メインスプリングを使用しながら電磁グライドスプリングで調整するハイブリッドで、日差±1秒の精度を達成する。この個体は信州から直接届き、日常使用のために巻き上げられたことは一度もない。",
    },
    pullquote: {
      en: "A dial that changes under every light — sometimes flat white, sometimes luminous with depth.",
      zh: "在每種光線下都會變化的錶面——有時扁平白色，有時發光帶有深度。",
      ja: "あらゆる光の下で変わるダイヤル — 時に平らな白、時に深みある輝き。",
    },
    specs: [
      { label: "MOVEMENT", value: "Cal. 9R65 · 72hr Reserve" },
      { label: "CASE", value: "41mm Titanium · 12.5mm" },
      { label: "ACCURACY", value: "±1 Second / Day" },
      { label: "CONDITION", value: "Unworn · Full Set" },
    ],
  },
  {
    id: "jlc-ultra",
    brand: "JAEGER-LECOULTRE", model: "Master Ultra Thin Perpetual", ref: "Ref. 1303520",
    year: 2021, condition: "excellent", price: "NT$ 1,180,000",
    dialInner: "#1a1a2c", dialOuter: "#0a0a18", isLight: false,
    markerType: "roman", markerAccent: "rgba(255,255,255,0.65)",
    category: "complication", tags: ["Perpetual Calendar", "Moon Phase", "Ultra-Thin"],
    brief: {
      en: "Perpetual calendar at 9.2mm thin. Blue dial, Roman numerals, moon phase. Elegance without negotiation.",
      zh: "萬年曆機芯，僅 9.2mm 薄。藍色錶面、羅馬數字、月相。毫不妥協的優雅。",
      ja: "9.2mm薄のパーペチュアルカレンダー。ブルーダイヤル、ローマ数字、月齢表示。妥協なきエレガンス。",
    },
    story: {
      en: "Fitting a perpetual calendar into a 9.2mm case is not a problem of ambition; it is a problem of mathematics. Jaeger-LeCoultre's engineers spent years solving it — eliminating conventional disc stacks, redesigning the programming wheel, flattening every component to its theoretical minimum.\n\nThe result is a watch that wears like a dress watch, with the intellectual weight of a grande complication. The blue lacquer dial shifts between deep ocean and midnight sky depending on the angle of light; the Roman numerals recall the pocket watches that made JLC's reputation in the nineteenth century.",
      zh: "將萬年曆塞進 9.2mm 的錶殼，不是雄心問題，而是數學問題。積家的工程師花了數年解決它——消除傳統碟片疊層、重新設計程式輪、將每個零件壓扁至理論最薄。\n\n結果是一枚以正裝錶的身態佩戴，卻帶有大複雜功能之智識分量的腕錶。藍色漆面錶面在不同光線角度下，在深海與午夜天空之間游移；羅馬數字令人憶及十九世紀奠定積家聲名的懷錶。",
      ja: "パーペチュアルカレンダーを9.2mmのケースに収めることは野心の問題ではなく、数学の問題だ。ジャガー・ルクルトのエンジニアたちは解決に数年かけた — 従来のディスクスタックを排除し、プログラミングホイールを再設計し、すべての部品を理論的最薄まで平坦化した。\n\n結果はドレスウォッチのように身に着け、グランドコンプリケーションの知的重みを持つ時計だ。ブルーラッカーダイヤルは光の角度によって深海から真夜中の空の間を変化する。",
    },
    pullquote: {
      en: "A dress watch with the intellectual weight of a grande complication.",
      zh: "以正裝錶之姿，承載大複雜功能的智識分量。",
      ja: "ドレスウォッチの姿にグランドコンプリケーションの知的重みを宿す。",
    },
    specs: [
      { label: "MOVEMENT", value: "Cal. 868 · 38hr Reserve" },
      { label: "CASE", value: "39mm Stainless Steel · 9.2mm" },
      { label: "COMPLICATIONS", value: "Perpetual Calendar · Moon Phase" },
      { label: "CONDITION", value: "Excellent · Box & Papers" },
    ],
  },
  {
    id: "iwc-port",
    brand: "IWC SCHAFFHAUSEN", model: "Portugieser Automatic", ref: "Ref. IW500705",
    year: 2022, condition: "unworn", price: "NT$ 420,000",
    dialInner: "#f0ece4", dialOuter: "#dcd8d0", isLight: true,
    markerType: "arabic", markerAccent: "rgba(15,15,15,0.72)",
    category: "dress", tags: ["7-Day Reserve", "Silver Dial", "42.3mm"],
    brief: {
      en: "Seven-day power reserve, 42.3mm, silver opaline dial. IWC's most enduring design, unchanged in spirit since 1939.",
      zh: "七日動力儲存，42.3mm，銀色太陽放射紋錶面。IWC 最持久的設計，精神自 1939 年不變。",
      ja: "7日間パワーリザーブ、42.3mm、シルバーオパリンダイヤル。1939年から精神不変、IWC最も永続的なデザイン。",
    },
    story: {
      en: "In 1939, two Portuguese watch importers approached IWC with an unusual request: put a marine chronometer movement into a wristwatch. The result was larger than anything IWC had made for the wrist, and more accurate. The name acknowledged the commission.\n\nThe IW500705 carries a seven-day power reserve and the same spirit of purpose-over-fashion. The silvered opaline dial is executed with blued steel hands that have always identified the Portugieser — a combination so resolved that IWC has never needed to change it. This example is unworn, with all original packaging and documentation.",
      zh: "1939 年，兩位葡萄牙腕錶進口商向 IWC 提出一個不尋常的請求：將航海計時器機芯裝進手錶錶殼。結果比 IWC 曾為手腕製作的任何腕錶都更大，也更精準。型號名稱記錄了這份委託。\n\nIW500705 搭載七日動力儲存，承載同樣的「功能先於時尚」精神。銀色太陽放射紋錶面配合藍鋼指針——一個如此圓滿的組合，以至於 IWC 從未需要改變它。這枚腕錶全新未佩戴，附完整原廠包裝與文件。",
      ja: "1939年、2人のポルトガルの時計輸入業者がIWCに異例のリクエストを持ち込んだ：船舶クロノメーターのムーブメントを腕時計に収めてほしいと。結果はIWCがそれまでに手首向けに作ったものより大きく、より正確だった。名前はその依頼を記録する。\n\nIW500705は7日間パワーリザーブを搭載し、同じ「目的優先」の精神を持つ。シルバーオパリンダイヤルとブルースチール針の組み合わせはポルトギーゼを常に識別してきた — IWCがそれを変える必要を感じないほど完成された組み合わせだ。アンウォーン、完全な元のパッケージと書類付き。",
    },
    pullquote: {
      en: "A combination so resolved that IWC has never needed to change it.",
      zh: "如此圓滿的組合，以至於 IWC 從未需要改變它。",
      ja: "IWCがそれを変える必要を感じないほど完成された組み合わせ。",
    },
    specs: [
      { label: "MOVEMENT", value: "Cal. 52010 · 7-Day Reserve" },
      { label: "CASE", value: "42.3mm Stainless Steel" },
      { label: "DIAL", value: "Silver Opaline, Blued Hands" },
      { label: "CONDITION", value: "Unworn · Full Set" },
    ],
  },
];
