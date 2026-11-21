import React from 'react';

interface KomdigiLogoProps {
  className?: string;
  size?: number;
}

/**
 * Logo Resmi Kementerian Komunikasi dan Digital Republik Indonesia (Komdigi)
 * Identitas visual modular berbasis jaringan data digital:
 * - Titik Merah (kiri atas) melambangkan kedaulatan & identitas bangsa Indonesia
 * - Struktur Biru Komdigi (kiri) & Biru Cyan (kanan) melambangkan transformasi & konektivitas digital
 * - Titik Kuning Emas (kanan bawah) melambangkan visi Indonesia Emas 2045
 */
export const KomdigiLogo: React.FC<KomdigiLogoProps> = ({ className = 'w-8 h-8', size }) => {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-label="Logo Resmi Kementerian Komunikasi dan Digital"
    >
      {/* ── 1. TITIK MERAH (Kiri Atas) ── */}
      <rect
        x="10"
        y="12"
        width="16"
        height="16"
        rx="3.5"
        fill="#880015"
      />
      
      {/* Sambungan Merah ke Biru */}
      <path
        d="M25 27 L29 31"
        stroke="#005A9E"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* ── 2. BLOK UTAMA BIRU (KOMDIGI BLUE) ── */}
      {/* Node Biru Tengah Kiri */}
      <rect
        x="26"
        y="28"
        width="20"
        height="22"
        rx="4.5"
        fill="#005A9E"
      />

      {/* Kurva Penghubung Biru Kiri */}
      <path
        d="M26 48 C16 48 2 52 2 62 L2 66 C2 72 6 76 12 76 L22 76 C26 76 26 68 26 62 Z"
        fill="#005A9E"
      />

      {/* Node Biru Paling Kiri */}
      <rect
        x="2"
        y="50"
        width="24"
        height="26"
        rx="5.5"
        fill="#005A9E"
      />

      {/* Penghubung Bawah Biru */}
      <path
        d="M24 72 C24 78 28 82 34 82 L38 82 C44 82 48 86 48 92 L48 96 C48 99 45 100 42 100 L34 100 C28 100 24 96 24 90 Z"
        fill="#005A9E"
      />

      {/* Node Biru Bawah */}
      <rect
        x="26"
        y="76"
        width="26"
        height="24"
        rx="6"
        fill="#005A9E"
      />

      {/* ── 3. STRUKTUR CYAN (DIGITAL CYAN) ── */}
      {/* Node Cyan Kanan Atas */}
      <rect
        x="56"
        y="2"
        width="22"
        height="20"
        rx="4.5"
        fill="#009CDE"
      />

      {/* Lengkungan Penghubung Cyan Atas */}
      <path
        d="M56 20 C56 26 60 30 68 30 L80 30 C90 30 98 38 98 48 L98 50 C98 56 94 60 88 60 L78 60 C72 60 68 56 68 50 L68 22 Z"
        fill="#009CDE"
      />

      {/* Node Cyan Kanan Samping */}
      <rect
        x="76"
        y="20"
        width="24"
        height="26"
        rx="5.5"
        fill="#009CDE"
      />

      {/* Node Cyan Tengah */}
      <rect
        x="50"
        y="46"
        width="26"
        height="26"
        rx="6"
        fill="#009CDE"
      />

      {/* Sambungan Cyan ke Kuning */}
      <path
        d="M74 70 C74 75 78 78 82 78"
        stroke="#009CDE"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* ── 4. TITIK KUNING EMAS (Kanan Bawah) ── */}
      <rect
        x="76"
        y="72"
        width="18"
        height="18"
        rx="4"
        fill="#F8A800"
      />
    </svg>
  );
};
