import React, { useState, useMemo } from 'react';
import { REAL_CLUBS } from '../data/realClubs.js';

// Deterministic hash to generate consistent visual appearance per player
function hashString(str = '') {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// 7 diverse, natural skin and hair tone palettes for realistic sports avatars
const AVATAR_PALETTES = [
  { skin: '#fdd9b5', shadow: '#e8b288', hair: '#1e293b', hairHighlight: '#334155' },
  { skin: '#f4c29e', shadow: '#d6966d', hair: '#3b2219', hairHighlight: '#5c3a2e' },
  { skin: '#df9c6e', shadow: '#b87343', hair: '#18181b', hairHighlight: '#27272a' },
  { skin: '#c68653', shadow: '#9b5d2e', hair: '#0f172a', hairHighlight: '#1e293b' },
  { skin: '#8d5524', shadow: '#6a3c14', hair: '#0a0a0a', hairHighlight: '#1f1f1f' },
  { skin: '#633918', shadow: '#42220b', hair: '#000000', hairHighlight: '#18181b' },
  { skin: '#ffe0bd', shadow: '#e5be97', hair: '#b45309', hairHighlight: '#d97706' }
];

// Position-based background gradient accents
const POSITION_ACCENTS = {
  G: { bgStart: '#064e3b', bgEnd: '#022c22', border: '#10b981', label: 'GOL' },
  Z: { bgStart: '#1e3a8a', bgEnd: '#0f172a', border: '#3b82f6', label: 'ZAG' },
  L: { bgStart: '#1e3a8a', bgEnd: '#172554', border: '#60a5fa', label: 'LAT' },
  V: { bgStart: '#3b0764', bgEnd: '#0f172a', border: '#8b5cf6', label: 'VOL' },
  M: { bgStart: '#4c1d95', bgEnd: '#1e1b4b', border: '#a855f7', label: 'MEI' },
  A: { bgStart: '#7f1d1d', bgEnd: '#18181b', border: '#ef4444', label: 'ATA' }
};

/**
 * PlayerAvatar - Renders circular photo portrait or original stylized Footkeep vector avatar.
 * 
 * Strict IP/Copyright Compliance: Uses original vector illustrations and avoids unapproved assets.
 */
export function PlayerAvatar({
  player,
  size = 'md', // 'xs' (28px), 'sm' (36px), 'md' (44px), 'lg' (52px), 'xl' (64px)
  showBadge = true,
  badgeType = 'ovr', // 'ovr' | 'number' | 'role'
  roleCode = null,
  isSelected = false,
  isDragging = false,
  club = null,
  clubColors = null,
  className = ''
}) {
  const [imgFailed, setImgFailed] = useState(false);

  // Determine Club Colors (from prop, player.clubId or default)
  const resolvedColors = useMemo(() => {
    if (clubColors?.primary) return clubColors;
    if (club?.colors?.primary) return club.colors;
    if (player?.clubId) {
      const found = REAL_CLUBS.find(c => c.id === player.clubId);
      if (found?.colors) return found.colors;
    }
    return {
      primary: '#059669', // Emerald Footkeep
      secondary: '#0f172a',
      accent: '#34d399'
    };
  }, [club, clubColors, player?.clubId]);

  // Size dimensions
  const sizeMap = {
    xs: {
      wrapper: 'w-7 h-7 text-[8px]',
      badge: 'text-[8px] min-w-[15px] h-[15px] -bottom-0.5 -right-0.5 px-0.5',
      ringWidth: 'ring-2'
    },
    sm: {
      wrapper: 'w-9 h-9 text-[9px]',
      badge: 'text-[9px] min-w-[17px] h-[17px] -bottom-1 -right-1 px-1',
      ringWidth: 'ring-2'
    },
    md: {
      wrapper: 'w-11 h-11 text-[10px]',
      badge: 'text-[10px] min-w-[19px] h-[19px] -bottom-1 -right-1 px-1',
      ringWidth: 'ring-4'
    },
    lg: {
      wrapper: 'w-13 h-13 text-xs',
      badge: 'text-xs min-w-[22px] h-[22px] -bottom-1.5 -right-1 px-1.5',
      ringWidth: 'ring-4'
    },
    xl: {
      wrapper: 'w-16 h-16 text-sm',
      badge: 'text-xs min-w-[24px] h-[24px] -bottom-1.5 -right-1.5 px-1.5',
      ringWidth: 'ring-4'
    }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  // Player Attributes & Deterministic styling
  const playerName = player?.name || 'Atleta';
  const playerPos = player?.position || 'M';
  const overall = player ? Math.round(player.overall || 75) : 75;
  const posAccent = POSITION_ACCENTS[playerPos] || POSITION_ACCENTS.M;

  const playerHash = useMemo(() => hashString(playerName + (player?.id || '')), [playerName, player?.id]);
  const palette = AVATAR_PALETTES[playerHash % AVATAR_PALETTES.length];
  const hairStyle = playerHash % 4; // 0: Curto, 1: Undercut, 2: Afro/Fade, 3: Moicano suave

  // Initials
  const initials = useMemo(() => {
    const parts = playerName.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }, [playerName]);

  // Image source (if custom photo provided)
  const photoSrc = player?.photo || player?.photoUrl || player?.avatarUrl || null;
  const canShowPhoto = photoSrc && !imgFailed;

  // Badge tier color
  const badgeClasses = useMemo(() => {
    if (overall >= 85) {
      return 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 border-amber-200 ring-1 ring-amber-400/50';
    }
    if (overall >= 80) {
      return 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-emerald-200 ring-1 ring-emerald-400/40';
    }
    if (overall >= 75) {
      return 'bg-gradient-to-r from-sky-500 to-blue-600 text-white border-sky-200 ring-1 ring-sky-400/40';
    }
    return 'bg-slate-800 text-slate-200 border-slate-600';
  }, [overall]);

  // Badge Content
  const badgeValue = useMemo(() => {
    if (badgeType === 'role') return roleCode || playerPos;
    if (badgeType === 'number') return player?.number || (overall % 99) || 10;
    return overall;
  }, [badgeType, roleCode, playerPos, player?.number, overall]);

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 transition-all duration-150 ${currentSize.wrapper} ${className}`}
    >
      {/* Outer Circle Container with Status Rings */}
      <div
        className={`w-full h-full rounded-full overflow-hidden relative shadow-lg flex items-center justify-center transition-all ${
          isSelected
            ? `${currentSize.ringWidth} ring-yellow-400 border-2 border-yellow-300 shadow-yellow-500/50 scale-110`
            : isDragging
            ? `${currentSize.ringWidth} ring-emerald-400 border-2 border-emerald-300 shadow-emerald-500/50 scale-125`
            : 'border-2 border-slate-700/80 hover:border-emerald-400/80 shadow-slate-950/80'
        }`}
        style={{
          background: `radial-gradient(circle at 50% 35%, ${resolvedColors.primary}33 0%, #090d16 100%)`
        }}
      >
        {canShowPhoto ? (
          /* Actual photo portrait */
          <img
            src={photoSrc}
            alt={playerName}
            onError={() => setImgFailed(true)}
            draggable={false}
            className="w-full h-full rounded-full object-cover select-none pointer-events-none"
          />
        ) : (
          /* Original Footkeep Stylized Vector Avatar (Copyright-safe) */
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full select-none pointer-events-none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={`grad_jersey_${playerHash}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={resolvedColors.primary || '#059669'} />
                <stop offset="100%" stopColor={resolvedColors.secondary || '#0f172a'} />
              </linearGradient>

              <radialGradient id={`grad_halo_${playerHash}`} cx="50%" cy="40%" r="55%">
                <stop offset="0%" stopColor={resolvedColors.accent || '#34d399'} stopOpacity="0.4" />
                <stop offset="100%" stopColor="#090d16" stopOpacity="0.9" />
              </radialGradient>
            </defs>

            {/* Background Halo */}
            <rect width="100" height="100" fill={`url(#grad_halo_${playerHash})`} />

            {/* Silhouette Torso & Jersey */}
            <path
              d="M 12 100 C 14 78, 26 68, 50 68 C 74 68, 86 78, 88 100 Z"
              fill={`url(#grad_jersey_${playerHash})`}
            />

            {/* Jersey V-Neck / Trim */}
            <path
              d="M 40 68 L 50 82 L 60 68 Z"
              fill={resolvedColors.secondary || '#ffffff'}
              opacity="0.85"
            />
            <path
              d="M 43 68 L 50 78 L 57 68 Z"
              fill={palette.shadow}
            />

            {/* Neck */}
            <path
              d="M 43 55 L 43 70 Q 50 73 57 70 L 57 55 Z"
              fill={palette.shadow}
            />

            {/* Ears */}
            <circle cx="29" cy="46" r="4.5" fill={palette.shadow} />
            <circle cx="71" cy="46" r="4.5" fill={palette.shadow} />

            {/* Head Silhouette */}
            <ellipse cx="50" cy="44" rx="19" ry="22" fill={palette.skin} />

            {/* Hair Variations */}
            {hairStyle === 0 && (
              /* Short Fade Classic */
              <path
                d="M 31 42 C 31 23, 69 23, 69 42 C 67 33, 62 26, 50 25 C 38 26, 33 33, 31 42 Z"
                fill={palette.hair}
              />
            )}

            {hairStyle === 1 && (
              /* Undercut Moderno */
              <g>
                <path
                  d="M 32 38 C 32 20, 68 20, 68 38 C 65 24, 60 21, 50 21 C 40 21, 35 24, 32 38 Z"
                  fill={palette.hair}
                />
                <path
                  d="M 36 28 Q 50 17 65 24 Q 53 22 36 28 Z"
                  fill={palette.hairHighlight}
                />
              </g>
            )}

            {hairStyle === 2 && (
              /* Afro Taper / Curly Crop */
              <path
                d="M 28 42 C 26 21, 74 21, 72 42 C 70 20, 30 20, 28 42 Z"
                fill={palette.hair}
              />
            )}

            {hairStyle === 3 && (
              /* Topete Esportivo */
              <g>
                <path
                  d="M 30 40 C 30 22, 70 22, 70 40 C 68 26, 60 19, 50 18 C 40 19, 32 26, 30 40 Z"
                  fill={palette.hair}
                />
                <path
                  d="M 44 19 Q 50 12 56 19 Z"
                  fill={palette.hairHighlight}
                />
              </g>
            )}

            {/* Stylized Face Features (Athletic Focus) */}
            <ellipse cx="43" cy="43" rx="1.5" ry="1.2" fill={palette.hair} opacity="0.7" />
            <ellipse cx="57" cy="43" rx="1.5" ry="1.2" fill={palette.hair} opacity="0.7" />
            <path d="M 40 39 Q 44 38 47 40" stroke={palette.hair} strokeWidth="1.2" strokeLinecap="round" fill="none" />
            <path d="M 60 39 Q 56 38 53 40" stroke={palette.hair} strokeWidth="1.2" strokeLinecap="round" fill="none" />
            <path d="M 49 46 L 51 46" stroke={palette.shadow} strokeWidth="1" strokeLinecap="round" />
            <path d="M 46 54 Q 50 56 54 54" stroke={palette.shadow} strokeWidth="1.2" strokeLinecap="round" fill="none" />

            {/* Jersey Initials / Monogram Watermark */}
            <text
              x="50"
              y="94"
              textAnchor="middle"
              fontSize="10"
              fontWeight="900"
              fontFamily="sans-serif"
              fill={resolvedColors.secondary || '#ffffff'}
              opacity="0.9"
              letterSpacing="0.5"
            >
              {initials}
            </text>
          </svg>
        )}
      </div>

      {/* Overlay Badge (OVR / Number) on Bottom-Right Corner without blocking face */}
      {showBadge && (
        <div
          className={`absolute ${currentSize.badge} z-20 flex items-center justify-center font-black font-teko leading-none rounded-full border shadow-md select-none pointer-events-none transition-transform ${badgeClasses}`}
          title={`${playerPos} - OVR ${overall}`}
        >
          <span className="leading-none pt-0.5">{badgeValue}</span>
        </div>
      )}
    </div>
  );
}
