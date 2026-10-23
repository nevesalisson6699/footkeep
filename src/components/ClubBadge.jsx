import React, { useState } from 'react';

const SIZE_MAP = {
  xs: 'w-5 h-5 text-[9px]',
  sm: 'w-7 h-7 text-[10px]',
  md: 'w-10 h-10 text-xs',
  lg: 'w-14 h-14 text-sm',
  xl: 'w-20 h-20 text-base',
  '2xl': 'w-24 h-24 text-lg'
};

export function ClubBadge({ club, size = 'md', className = '' }) {
  const [imageFailed, setImageFailed] = useState(false);

  if (!club) return null;

  const sizeClass = SIZE_MAP[size] || SIZE_MAP.md;
  const primaryColor = club.colors?.primary || '#1e293b';
  const secondaryColor = club.colors?.secondary || '#ffffff';
  const accentColor = club.colors?.accent || '#fbbf24';
  const monogram = club.monogram || club.shortName || club.name?.slice(0, 3).toUpperCase();

  // If a valid external licensed URL is provided and has not failed, use it
  if (club.badgeUrl && !imageFailed) {
    return (
      <img
        src={club.badgeUrl}
        alt={`Escudo do ${club.name}`}
        onError={() => setImageFailed(true)}
        className={`${sizeClass} object-contain drop-shadow-md ${className}`}
      />
    );
  }

  // Original Vector SVG Shield (Original Footkeep Asset)
  return (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 drop-shadow-lg select-none ${sizeClass} ${className}`}
      title={`${club.name} (${monogram})`}
    >
      <svg
        viewBox="0 0 100 120"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`grad_${club.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} />
            <stop offset="100%" stopColor={primaryColor} stopOpacity="0.88" />
          </linearGradient>
          <linearGradient id={`gold_${club.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>
          <filter id={`shadow_${club.id}`} x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* Heraldic Shield Contour */}
        <path
          d="M 50 114 C 20 98 10 70 10 24 L 50 8 L 90 24 C 90 70 80 98 50 114 Z"
          fill={`url(#grad_${club.id})`}
          stroke="#ffffff"
          strokeWidth="3.5"
          filter={`url(#shadow_${club.id})`}
        />

        {/* Inner Secondary Pattern (Diagonal / Split Ribbon) */}
        <path
          d="M 50 12 L 90 24 C 90 60 84 86 50 108 L 50 12 Z"
          fill={secondaryColor}
          fillOpacity={secondaryColor === '#ffffff' ? 0.22 : 0.45}
        />

        {/* Inner Border Line */}
        <path
          d="M 50 106 C 26 92 18 68 18 28 L 50 16 L 82 28 C 82 68 74 92 50 106 Z"
          stroke={accentColor}
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="80 1"
        />

        {/* Heraldic Top Star */}
        <polygon
          points="50,18 52.5,24 58.5,24 53.5,27.5 55.5,33.5 50,29.5 44.5,33.5 46.5,27.5 41.5,24 47.5,24"
          fill={`url(#gold_${club.id})`}
          stroke="#000"
          strokeWidth="0.5"
        />

        {/* Monogram / Acronym Text */}
        <text
          x="50"
          y="68"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#ffffff"
          fontWeight="900"
          fontSize={monogram.length > 3 ? "21" : "25"}
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="0.5"
          style={{
            textShadow: '0 2px 4px rgba(0,0,0,0.85), 0 0 2px #000000'
          }}
        >
          {monogram}
        </text>

        {/* Lower Banner Ribbon */}
        <path
          d="M 28 86 Q 50 94 72 86"
          stroke={accentColor}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
