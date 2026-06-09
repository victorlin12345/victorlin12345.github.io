"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  preselectedWatch?: string;
}

const WATCHES_LIST = [
  "Rolex Cosmograph Daytona — Ref. 116500LN",
  "Patek Philippe Nautilus — Ref. 5711/1A-014",
  "Audemars Piguet Royal Oak — Ref. 15202ST",
  "Richard Mille RM 011 Felipe Massa",
  "A. Lange & Söhne Datograph Perpetual — Ref. 401.026",
  "Vacheron Constantin Overseas Chronograph — Ref. 5500V/110A",
  "F.P. Journe Chronomètre Bleu — Ref. CB TN",
  "H. Moser & Cie Endeavour Perpetual — Ref. 1341-0001",
  "Other / Open to recommendation",
];

const BEVERAGES_EN = ["Espresso", "Hand-drip Coffee", "Sparkling Water", "Single Malt"];
const BEVERAGES_ZH = ["義式濃縮咖啡", "手沖咖啡", "氣泡水", "單一麥芽威士忌"];

type FormState = {
  name: string;
  contact: string;
  watch: string;
  beverage: string;
};

export default function BookingModal({ open, onClose, preselectedWatch = "" }: BookingModalProps) {
  const { lang, t } = useLanguage();
  const { theme } = useTheme();
  const beverages = lang === "zh" ? BEVERAGES_ZH : BEVERAGES_EN;
  const optBg = theme === "dark" ? "#0D0D0D" : "#EDECE5";
  const optFg = theme === "dark" ? "#ffffff" : "#1a1a1a";
  const optMuted = theme === "dark" ? "#8E8E93" : "#6E6E73";

  const [form, setForm] = useState<FormState>({ name: "", contact: "", watch: "", beverage: "" });
  const [submitted, setSubmitted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setSubmitted(false);
      if (preselectedWatch) {
        const matched = WATCHES_LIST.find((w) =>
          w.toLowerCase().includes(preselectedWatch.split(" — ")[0]?.toLowerCase() ?? "")
        );
        setForm((f) => ({ ...f, watch: matched ?? preselectedWatch }));
      }
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open, preselectedWatch]);

  useEffect(() => {
    setForm((f) => ({ ...f, beverage: "" }));
  }, [lang]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md px-4"
    >
      <div className="relative w-full max-w-lg bg-[#0D0D0D] border border-[#2C2C2E] overflow-hidden">
        {/* Brand blue top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#1C4399]" />

        <button onClick={onClose} className="absolute top-6 right-6 text-[#8E8E93] hover:text-white transition-colors duration-300 z-10" aria-label="Close">
          <X size={18} strokeWidth={1.5} />
        </button>

        <div className="px-10 py-12">
          {!submitted ? (
            <>
              <div className="mb-10">
                <p className="text-[#6B90D4] text-[9px] tracking-[0.4em] uppercase mb-4">
                  {t("modal.eyebrow")}
                </p>
                <h2 className="text-white text-2xl font-light tracking-[0.05em] uppercase">
                  {t("modal.title")}
                </h2>
                <div className="mt-4 w-8 h-[2px] bg-[#1C4399]" />
              </div>

              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-8">
                {/* Name */}
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder=" "
                    className="peer w-full bg-transparent border-b border-[#2C2C2E] focus:border-[#1C4399]/60 outline-none py-3 text-white text-sm tracking-wide transition-colors duration-300 placeholder-transparent"
                  />
                  <label className="absolute left-0 top-3 text-[#8E8E93] text-xs tracking-[0.2em] uppercase transition-all duration-300 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-[#6B90D4] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[9px] pointer-events-none">
                    {t("modal.name")}
                  </label>
                </div>

                {/* Contact */}
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={form.contact}
                    onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))}
                    placeholder=" "
                    className="peer w-full bg-transparent border-b border-[#2C2C2E] focus:border-[#1C4399]/60 outline-none py-3 text-white text-sm tracking-wide transition-colors duration-300 placeholder-transparent"
                  />
                  <label className="absolute left-0 top-3 text-[#8E8E93] text-xs tracking-[0.2em] uppercase transition-all duration-300 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-[#6B90D4] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[9px] pointer-events-none">
                    {t("modal.contact")}
                  </label>
                </div>

                {/* Timepiece */}
                <div className="relative">
                  <select
                    value={form.watch}
                    onChange={(e) => setForm((f) => ({ ...f, watch: e.target.value }))}
                    className="w-full bg-transparent border-b border-[#2C2C2E] focus:border-[#1C4399]/60 outline-none py-3 text-sm tracking-wide transition-colors duration-300 appearance-none cursor-pointer"
                    style={{ color: form.watch ? optFg : optMuted }}
                  >
                    <option value="" disabled style={{ background: optBg }}>{t("modal.watch")}</option>
                    {WATCHES_LIST.map((w) => (
                      <option key={w} value={w} style={{ background: optBg, color: optFg }}>{w}</option>
                    ))}
                  </select>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#8E8E93]">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor"><path d="M0 0l5 6 5-6z" opacity="0.5" /></svg>
                  </div>
                </div>

                {/* Beverage */}
                <div>
                  <p className="text-[#8E8E93] text-[9px] tracking-[0.3em] uppercase mb-4">{t("modal.beverage")}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {beverages.map((bev) => (
                      <button
                        key={bev}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, beverage: bev }))}
                        className={`py-2.5 px-4 text-[9px] tracking-[0.2em] uppercase border transition-all duration-300 text-left ${
                          form.beverage === bev
                            ? "border-[#1C4399]/70 text-[#6B90D4] bg-[#1C4399]/10"
                            : "border-[#2C2C2E] text-[#8E8E93] hover:border-[#1C4399]/30 hover:text-white/60"
                        }`}
                      >
                        {bev}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1C4399] text-white text-[10px] tracking-[0.3em] uppercase py-5 hover:bg-[#2E5CB8] border border-[#1C4399] hover:border-[#2E5CB8] transition-all duration-500"
                >
                  {t("modal.submit")}
                </button>
                <p className="text-[#8E8E93] text-[9px] tracking-wider text-center">{t("modal.privacy")}</p>
              </form>
            </>
          ) : (
            <div className="py-8 text-center">
              <div className="w-12 h-12 rounded-full border border-[#1C4399]/50 flex items-center justify-center mx-auto mb-8">
                <div className="w-4 h-4 rounded-full bg-[#1C4399]/50" />
              </div>
              <p className="text-[#6B90D4] text-[9px] tracking-[0.4em] uppercase mb-4">{t("modal.success.eyebrow")}</p>
              <h3 className="text-white text-xl font-light tracking-[0.05em] mb-6">{t("modal.success.title")}</h3>
              <p className="text-[#8E8E93] text-sm leading-relaxed tracking-wide max-w-xs mx-auto">{t("modal.success.body")}</p>
              <button
                onClick={onClose}
                className="mt-10 text-[9px] tracking-[0.3em] uppercase text-[#8E8E93] hover:text-white border-b border-[#2C2C2E] hover:border-[#1C4399]/50 pb-1 transition-all duration-300"
              >
                {t("modal.close")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
