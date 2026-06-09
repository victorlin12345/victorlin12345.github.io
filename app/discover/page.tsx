"use client";

import { useState } from "react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Navbar from "@/components/Navbar";
import DiscoverPage from "@/components/DiscoverPage";
import BookingModal from "@/components/BookingModal";

function PageContent() {
  const [modalOpen, setModalOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <Navbar onBooking={() => setModalOpen(true)} />
      <main>
        <DiscoverPage />
      </main>
      <footer className="border-t border-[#2C2C2E] py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-0.5">
            <span className="text-[#8E8E93] text-xs tracking-[0.3em] uppercase">PAOYEE · 寶儀鐘錶</span>
            <span className="text-[#2E5CB8]/60 text-[9px] tracking-[0.25em] uppercase">SINCE 1956</span>
          </div>
          <p className="text-[#8E8E93] text-xs tracking-wider text-center">{t("footer.copy")}</p>
          <div className="flex gap-8">
            {(["footer.privacy", "footer.terms", "footer.contact"] as const).map(key => (
              <a key={key} href="#"
                className="text-[#8E8E93] hover:text-white text-xs tracking-[0.15em] transition-colors duration-300">
                {t(key)}
              </a>
            ))}
          </div>
        </div>
      </footer>
      <BookingModal open={modalOpen} onClose={() => setModalOpen(false)} preselectedWatch="" />
    </>
  );
}

export default function Discover() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <PageContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
