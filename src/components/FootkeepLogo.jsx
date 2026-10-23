import React, { useId } from 'react';

/**
 * FootkeepLogo - Logotipo Original e Refinado para o Footkeep Football Manager
 * 
 * Design:
 * - Escudo geométrico esportivo facetado em verde esmeralda e dourado imperial.
 * - Monograma FK estilizado com ângulos dinâmicos e cortes precisos de vetor.
 * - Coroa/estrelas superiores simbolizando glória em competições e gestão de elite.
 * - Padrão geométrico interno inspirado em gomos de bola e linhas táticas de campo.
 * - Tipografia elegante com suporte a variantes (completa, horizontal, ícone e badge).
 * 
 * @param {string} variant - 'full' | 'horizontal' | 'icon' | 'badge'
 * @param {string} size - 'sm' | 'md' | 'lg' | 'xl' | 'hero'
 * @param {boolean} showSubtitle - Exibe 'FOOTBALL MANAGER'
 * @param {string} subtitleText - Texto personalizado do subtítulo
 * @param {string} className - Classes CSS adicionais
 */
export function FootkeepLogo({
  variant = 'full',
  size = 'md',
  showSubtitle = true,
  subtitleText = 'FOOTBALL MANAGER',
  className = ''
}) {
  const rawId = useId();
  const id = rawId.replace(/:/g, '_');

  // Dimension mapping
  const sizeMap = {
    sm: { icon: 32, textTitle: 'text-lg', textSub: 'text-[8px]', gap: 'gap-2' },
    md: { icon: 44, textTitle: 'text-2xl', textSub: 'text-[10px]', gap: 'gap-3' },
    lg: { icon: 64, textTitle: 'text-4xl', textSub: 'text-xs', gap: 'gap-3.5' },
    xl: { icon: 84, textTitle: 'text-5xl', textSub: 'text-sm', gap: 'gap-4' },
    hero: { icon: 110, textTitle: 'text-6xl', textSub: 'text-base', gap: 'gap-5' }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  // The geometric shield SVG mark
  const renderShieldSvg = () => (
    <svg
      width={currentSize.icon}
      height={currentSize.icon}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 group-hover:scale-105 drop-shadow-md select-none"
    >
      <defs>
        {/* Emerald Base Gradient */}
        <linearGradient id={`fkEmerald_${id}`} x1="10" y1="10" x2="110" y2="115" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="45%" stopColor="#059669" />
          <stop offset="100%" stopColor="#022c22" />
        </linearGradient>

        {/* Gold Border / Accent Gradient */}
        <linearGradient id={`fkGold_${id}`} x1="20" y1="5" x2="100" y2="115" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="35%" stopColor="#fbbf24" />
          <stop offset="70%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>

        {/* Metallic Dark Crest Fill */}
        <linearGradient id={`fkDarkCrest_${id}`} x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="50%" stopColor="#090d16" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>

        {/* Facet Reflection */}
        <linearGradient id={`fkFacet_${id}`} x1="30" y1="15" x2="60" y2="95" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0.05" />
        </linearGradient>

        {/* Soft Drop Glow */}
        <filter id={`fkGlow_${id}`} x="-10%" y="-10%" width="120%" height="130%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#10b981" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Crest Outer Gold Shield Frame */}
      <path
        d="M60 6 L104 22 C104 58 92 92 60 114 C28 92 16 58 16 22 L60 6 Z"
        fill={`url(#fkGold_${id})`}
        filter={`url(#fkGlow_${id})`}
      />

      {/* Inner Emerald Border Trim */}
      <path
        d="M60 11 L99 25 C99 56 88 87 60 108 C32 87 21 56 21 25 L60 11 Z"
        fill={`url(#fkEmerald_${id})`}
      />

      {/* Main Core Shield in Deep Obsidian / Midnight */}
      <path
        d="M60 15 L95 28 C95 55 85 83 60 102 C35 83 25 55 25 28 L60 15 Z"
        fill={`url(#fkDarkCrest_${id})`}
      />

      {/* Left Light Reflection Facet */}
      <path
        d="M60 15 L25 28 C25 55 35 83 60 102 Z"
        fill={`url(#fkFacet_${id})`}
      />

      {/* Internal Geometric Turf / Football Tactical Chevron Pattern */}
      <path
        d="M60 30 L80 44 L60 58 L40 44 Z"
        fill="none"
        stroke="#10b981"
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />
      <path
        d="M60 58 L85 75 L60 92 L35 75 Z"
        fill="none"
        stroke={`url(#fkGold_${id})`}
        strokeWidth="1.5"
        strokeOpacity="0.3"
      />

      {/* Central Monogram 'FK' Stylized Vector */}
      {/* 'F' Stem and Arms */}
      <path
        d="M38 34 H52 V41 H45 V48 H51 V54 H45 V76 H38 V34 Z"
        fill="white"
      />
      {/* 'K' Spine and Angled Wings in Vibrant Gold/Emerald */}
      <path
        d="M56 34 H63 V52 L74 34 H83 L70 54 L84 76 H75 L63 57 V76 H56 V34 Z"
        fill={`url(#fkGold_${id})`}
      />

      {/* Subtle Diamond / Football Apex Node */}
      <polygon
        points="60,20 64,25 60,30 56,25"
        fill="#fef08a"
      />

      {/* Dual Stars of Merit at Bottom Apex */}
      <circle cx="50" cy="88" r="1.5" fill="#fbbf24" />
      <circle cx="60" cy="94" r="2.2" fill="#fef08a" />
      <circle cx="70" cy="88" r="1.5" fill="#fbbf24" />
    </svg>
  );

  // Icon Only Variant
  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {renderShieldSvg()}
      </div>
    );
  }

  // Horizontal or Compact Variant
  if (variant === 'horizontal') {
    return (
      <div className={`inline-flex items-center ${currentSize.gap} ${className} group cursor-pointer select-none`}>
        {renderShieldSvg()}
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-center gap-1.5">
            <span className={`font-teko ${currentSize.textTitle} font-extrabold tracking-wider text-white uppercase leading-none`}>
              FOOT<span className="text-emerald-400 bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">KEEP</span>
            </span>
            <span className="text-[9px] font-black uppercase tracking-widest bg-gradient-to-r from-emerald-500/20 to-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30">
              PRO
            </span>
          </div>
          {showSubtitle && (
            <span className={`font-sans ${currentSize.textSub} font-semibold uppercase tracking-widest text-slate-400 group-hover:text-emerald-300 transition-colors`}>
              {subtitleText}
            </span>
          )}
        </div>
      </div>
    );
  }

  // Circular / Tournament Badge Variant
  if (variant === 'badge') {
    return (
      <div className={`relative inline-flex flex-col items-center p-3 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-emerald-500/30 shadow-xl ${className} select-none`}>
        {renderShieldSvg()}
        <span className="mt-2 font-teko text-xl font-bold tracking-wider text-white uppercase">
          FOOT<span className="text-emerald-400">KEEP</span>
        </span>
        {showSubtitle && (
          <span className="text-[9px] font-bold uppercase tracking-widest text-amber-300/90">
            {subtitleText}
          </span>
        )}
      </div>
    );
  }

  // Full / Default Variant (Stacked or balanced for Headers, Hero and Splash)
  return (
    <div className={`inline-flex items-center ${currentSize.gap} ${className} group select-none`}>
      {renderShieldSvg()}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-2 leading-none">
          <span className={`font-teko ${currentSize.textTitle} font-black tracking-wider text-white uppercase leading-none drop-shadow-sm`}>
            FOOT<span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">KEEP</span>
          </span>
          <span className="text-[9px] font-black uppercase tracking-widest bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/40 shadow-sm">
            BRASIL
          </span>
        </div>
        {showSubtitle && (
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            <span className={`font-sans ${currentSize.textSub} font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-200 transition-colors`}>
              {subtitleText}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
