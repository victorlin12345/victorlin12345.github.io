const BRANDS = [
  "ROLEX",
  "AUDEMARS PIGUET",
  "PATEK PHILIPPE",
  "OMEGA",
  "RICHARD MILLE",
  "A. LANGE & SÖHNE",
  "VACHERON CONSTANTIN",
  "F.P. JOURNE",
  "H. MOSER & CIE",
  "GREUBEL FORSEY",
];

export default function BrandWall() {
  const doubled = [...BRANDS, ...BRANDS];

  return (
    <section className="border-t border-b border-[#2C2C2E] py-10 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((brand, i) => (
          <span
            key={i}
            className="inline-flex items-center text-white/30 hover:text-white/90 transition-all duration-500 text-[10px] tracking-[0.35em] uppercase cursor-pointer px-10 flex-none"
          >
            {brand}
            {i < doubled.length - 1 && (
              <span className="ml-10 text-[#2C2C2E] text-base">·</span>
            )}
          </span>
        ))}
      </div>
    </section>
  );
}
