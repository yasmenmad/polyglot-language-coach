import React from 'react';

interface FlagProps {
  code: string;
  size?: number;
  className?: string;
}

export default function Flag({ code, size = 16, className = "" }: FlagProps) {
  const normCode = code.toLowerCase();

  const renderSvgContent = () => {
    switch (normCode) {
      case 'zh': // China
        return (
          <>
            <rect width="100" height="100" fill="#de2910" />
            <polygon points="30,20 34,32 46,32 36,40 40,52 30,44 20,52 24,40 14,32 26,32" fill="#ffde00" />
            <polygon points="50,15 51,19 55,19 52,22 53,26 50,23 47,26 48,22 45,19 49,19" fill="#ffde00" transform="rotate(10, 50, 15)" />
            <polygon points="58,25 59,29 63,29 60,32 61,36 58,33 55,36 56,32 53,29 57,29" fill="#ffde00" transform="rotate(25, 58, 25)" />
            <polygon points="58,40 59,44 63,44 60,47 61,51 58,48 55,51 56,47 53,44 57,44" fill="#ffde00" transform="rotate(10, 58, 40)" />
            <polygon points="50,50 51,54 55,54 52,57 53,61 50,58 47,61 48,57 45,54 49,54" fill="#ffde00" transform="rotate(25, 50, 50)" />
          </>
        );
      case 'es': // Spain
        return (
          <>
            <rect width="100" height="25" fill="#ad1519" />
            <rect y="25" width="100" height="50" fill="#fabd00" />
            <rect y="75" width="100" height="25" fill="#ad1519" />
            {/* Simplified crown/shield symbol */}
            <circle cx="30" cy="50" r="10" fill="#ad1519" opacity="0.8" />
            <circle cx="30" cy="50" r="6" fill="#fabd00" />
          </>
        );
      case 'fr': // France
        return (
          <>
            <rect width="33.3" height="100" fill="#00209f" />
            <rect x="33.3" width="33.4" height="100" fill="#ffffff" />
            <rect x="66.7" width="33.3" height="100" fill="#e70020" />
          </>
        );
      case 'de': // Germany
        return (
          <>
            <rect width="100" height="33.3" fill="#000000" />
            <rect y="33.3" width="100" height="33.4" fill="#dd0000" />
            <rect y="66.7" width="100" height="33.3" fill="#ffcc00" />
          </>
        );
      case 'ja': // Japan
        return (
          <>
            <rect width="100" height="100" fill="#ffffff" />
            <circle cx="50" cy="50" r="28" fill="#bc002d" />
          </>
        );
      case 'ko': // South Korea
        return (
          <>
            <rect width="100" height="100" fill="#ffffff" />
            {/* Center Taegeuk (Yin-Yang) */}
            <g transform="translate(50,50) scale(1.1) rotate(-35)">
              <path d="M 0,-20 A 20,20 0 0,1 0,20 A 10,10 0 0,1 0,0 A 10,10 0 0,0 0,-20" fill="#c60c30" />
              <path d="M 0,20 A 20,20 0 0,1 0,-20 A 10,10 0 0,0 0,0 A 10,10 0 0,1 0,20" fill="#003478" />
            </g>
            {/* Simplified Trigrams */}
            {/* Top Left */}
            <g transform="translate(26,26) rotate(45)">
              <rect x="-8" y="-6" width="16" height="2" fill="#000000" />
              <rect x="-8" y="-2" width="16" height="2" fill="#000000" />
              <rect x="-8" y="2" width="16" height="2" fill="#000000" />
            </g>
            {/* Bottom Right */}
            <g transform="translate(74,74) rotate(45)">
              <rect x="-8" y="-6" width="7" height="2" fill="#000000" />
              <rect x="1" y="-6" width="7" height="2" fill="#000000" />
              <rect x="-8" y="-2" width="16" height="2" fill="#000000" />
              <rect x="-8" y="2" width="7" height="2" fill="#000000" />
              <rect x="1" y="2" width="7" height="2" fill="#000000" />
            </g>
            {/* Top Right */}
            <g transform="translate(74,26) rotate(-45)">
              <rect x="-8" y="-6" width="7" height="2" fill="#000000" />
              <rect x="1" y="-6" width="7" height="2" fill="#000000" />
              <rect x="-8" y="-2" width="7" height="2" fill="#000000" />
              <rect x="1" y="-2" width="7" height="2" fill="#000000" />
              <rect x="-8" y="2" width="7" height="2" fill="#000000" />
              <rect x="1" y="2" width="7" height="2" fill="#000000" />
            </g>
            {/* Bottom Left */}
            <g transform="translate(26,74) rotate(-45)">
              <rect x="-8" y="-6" width="16" height="2" fill="#000000" />
              <rect x="-8" y="-2" width="7" height="2" fill="#000000" />
              <rect x="1" y="-2" width="7" height="2" fill="#000000" />
              <rect x="-8" y="2" width="16" height="2" fill="#000000" />
            </g>
          </>
        );
      case 'it': // Italy
        return (
          <>
            <rect width="33.3" height="100" fill="#008c45" />
            <rect x="33.3" width="33.4" height="100" fill="#f4f9ff" />
            <rect x="66.7" width="33.3" height="100" fill="#cd212a" />
          </>
        );
      case 'en': // USA / English
        return (
          <>
            {/* Red and white stripes */}
            <rect width="100" height="100" fill="#ffffff" />
            {Array.from({ length: 7 }).map((_, i) => (
              <rect key={i} y={i * 15.4} width="100" height="7.7" fill="#b22234" />
            ))}
            {/* Blue canton */}
            <rect width="50" height="53.8" fill="#3c3b6e" />
            {/* Simplified stars (white dots) */}
            <circle cx="10" cy="12" r="2" fill="#ffffff" />
            <circle cx="25" cy="12" r="2" fill="#ffffff" />
            <circle cx="40" cy="12" r="2" fill="#ffffff" />
            <circle cx="17" cy="22" r="2" fill="#ffffff" />
            <circle cx="32" cy="22" r="2" fill="#ffffff" />
            <circle cx="10" cy="32" r="2" fill="#ffffff" />
            <circle cx="25" cy="32" r="2" fill="#ffffff" />
            <circle cx="40" cy="32" r="2" fill="#ffffff" />
            <circle cx="17" cy="42" r="2" fill="#ffffff" />
            <circle cx="32" cy="42" r="2" fill="#ffffff" />
          </>
        );
      case 'ar': // Arabic (green + gold crescent/sword style)
        return (
          <>
            <rect width="100" height="100" fill="#006c35" />
            {/* Gold Crescent */}
            <path d="M 60,35 A 20,20 0 1,0 60,65 A 16,16 0 1,1 60,35" fill="#ffffff" transform="rotate(-30, 50, 50)" />
            {/* Gold Star */}
            <polygon points="58,48 60,52 64,52 61,55 62,59 58,56 54,59 55,55 52,52 56,52" fill="#ffffff" />
          </>
        );
      default: // Fallback / Globe icon styled
        return (
          <>
            <rect width="100" height="100" fill="#4fb8e8" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="#ffffff" strokeWidth="6" />
            <path d="M 15,50 H 85 M 50,15 V 85" stroke="#ffffff" strokeWidth="6" fill="none" />
            <ellipse cx="50" cy="50" rx="20" ry="35" fill="none" stroke="#ffffff" strokeWidth="6" />
          </>
        );
    }
  };

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`rounded-full overflow-hidden inline-block align-middle shadow-sm select-none ${className}`}
      style={{ minWidth: size, minHeight: size }}
    >
      <clipPath id="circle-clip">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
      <g clipPath="url(#circle-clip)">
        {renderSvgContent()}
      </g>
    </svg>
  );
}
