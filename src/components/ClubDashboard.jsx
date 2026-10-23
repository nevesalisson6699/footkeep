import React from 'react';
import { 
  Trophy, 
  MapPin, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Flame, 
  Play, 
  Calendar, 
  Award,
  Star,
  Shield,
  ArrowRight
} from 'lucide-react';

export function ClubDashboard({ 
  userClub, 
  standings, 
  nextMatch, 
  allClubs, 
  squad, 
  budget, 
  currentRound, 
  onGoToMatch, 
  onGoToTactics, 
  onGoToTransfers 
}) {
  if (!userClub) return null;

  const userRank = standings.findIndex(s => s.clubId === userClub.id) + 1;
  const userStats = standings.find(s => s.clubId === userClub.id);

  const opponentClub = nextMatch 
    ? allClubs.find(c => c.id === (nextMatch.homeId === userClub.id ? nextMatch.awayId : nextMatch.homeId))
    : null;

  const isHome = nextMatch ? nextMatch.homeId === userClub.id : false;

  // Key player insights
  const sortedByOverall = [...squad].sort((a, b) => b.overall - a.overall);
  const bestPlayer = sortedByOverall[0];
  const topScorer = [...squad].sort((a, b) => (b.goals || 0) - (a.goals || 0))[0];

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  const avgOverall = Math.round(squad.reduce((sum, p) => sum + p.overall, 0) / (squad.length || 1));

  return (
    <div className="space-y-5 animate-fadeIn">
      
      {/* Club Banner Header with Stadium Turf Feeling */}
      <div 
        className="relative overflow-hidden rounded-xl border border-emerald-900/50 shadow-xl"
        style={{
          background: `linear-gradient(135deg, ${userClub.colors.primary}44 0%, #0d1a12 40%, #090d16 100%)`
        }}
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="relative p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div 
              className="w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center text-4xl md:text-5xl shadow-xl border-2 shrink-0"
              style={{ 
                backgroundColor: userClub.colors.primary, 
                borderColor: userClub.colors.secondary || '#ffffff44' 
              }}
            >
              {userClub.badgeEmoji}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                  Série A
                </span>
                <span className="text-[10px] font-semibold text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                  {userClub.city}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                {userClub.name}
              </h1>
              <div className="flex items-center gap-2 text-xs text-slate-300 mt-1">
                <MapPin size={13} className="text-emerald-400 shrink-0" />
                <span>{userClub.stadium} • {userClub.stadiumCapacity.toLocaleString('pt-BR')} lugares</span>
              </div>
            </div>
          </div>

          {/* Key Indicators */}
          <div className="grid grid-cols-3 gap-2 w-full md:w-auto">
            <div className="bg-slate-900/90 border border-slate-800 px-3.5 py-2 rounded-lg text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Posição</span>
              <span className="font-teko text-2xl font-bold text-emerald-400 leading-none">
                {userRank}º <span className="text-xs font-sans text-slate-400">({userStats?.points || 0} pts)</span>
              </span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 px-3.5 py-2 rounded-lg text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Força Média</span>
              <span className="font-teko text-2xl font-bold text-amber-400 leading-none">
                {avgOverall}
              </span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 px-3.5 py-2 rounded-lg text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Finanças</span>
              <span className="font-teko text-2xl font-bold text-white leading-none">
                {formatCurrency(budget)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Gameplay Section: Next Match & Tactical Center */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Next Match Highlight Card (7 Cols) */}
        <div className="lg:col-span-7 game-card p-5 border-emerald-900/40 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>

          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <Calendar size={15} />
                <span>Próximo Compromisso</span>
              </div>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-800/50">
                {nextMatch?.type === 'cup' ? 'Copa Mata-Mata' : `Liga - Rodada ${currentRound} de 30`}
              </span>
            </div>

            {/* Stadium Matchup Face-off */}
            {nextMatch && opponentClub ? (
              <div className="py-6">
                <div className="flex items-center justify-around gap-2">
                  
                  {/* Home Club */}
                  <div className="flex-1 flex flex-col items-center text-center">
                    <div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl shadow-lg border-2 mb-2 transition-transform hover:scale-105"
                      style={{ 
                        backgroundColor: isHome ? userClub.colors.primary : opponentClub.colors.primary,
                        borderColor: '#ffffff33'
                      }}
                    >
                      {isHome ? userClub.badgeEmoji : opponentClub.badgeEmoji}
                    </div>
                    <span className="text-sm font-bold text-white line-clamp-1">
                      {isHome ? userClub.name : opponentClub.name}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase mt-0.5">
                      {isHome ? 'Seu Clube (Casa)' : 'Mandante'}
                    </span>
                  </div>

                  {/* VS Badge */}
                  <div className="flex flex-col items-center px-2">
                    <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
                      <span className="font-teko text-xl font-bold text-slate-400">VS</span>
                    </div>
                    <span className="text-[9px] text-slate-500 font-bold uppercase mt-1">90 min</span>
                  </div>

                  {/* Away Club */}
                  <div className="flex-1 flex flex-col items-center text-center">
                    <div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl shadow-lg border-2 mb-2 transition-transform hover:scale-105"
                      style={{ 
                        backgroundColor: !isHome ? userClub.colors.primary : opponentClub.colors.primary,
                        borderColor: '#ffffff33'
                      }}
                    >
                      {!isHome ? userClub.badgeEmoji : opponentClub.badgeEmoji}
                    </div>
                    <span className="text-sm font-bold text-white line-clamp-1">
                      {!isHome ? userClub.name : opponentClub.name}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">
                      {!isHome ? 'Seu Clube (Fora)' : 'Visitante'}
                    </span>
                  </div>

                </div>

                {/* Match Details */}
                <div className="mt-4 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-center text-xs text-slate-300">
                  Estádio: <span className="font-bold text-white">{isHome ? userClub.stadium : opponentClub.stadium}</span>
                  {isHome && (
                    <span className="ml-2 text-emerald-400 font-semibold">• Sua torcida comparecerá em peso!</span>
                  )}
                </div>
              </div>
            ) : (
              <div className="py-10 text-center text-slate-400 text-xs">
                Temporada finalizada! Consulte a tabela final para ver suas conquistas.
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={onGoToMatch}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-emerald-500/25 transition-all"
            >
              <Play size={17} fill="currentColor" />
              <span>JOGAR PARTIDA</span>
            </button>

            <button
              onClick={onGoToTactics}
              className="py-3 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition flex items-center justify-center gap-1.5"
            >
              <Users size={15} />
              <span>Definir Tática</span>
            </button>
          </div>
        </div>

        {/* Right Side Compact Cards (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          
          {/* Best Player Card */}
          {bestPlayer && (
            <div className="game-card p-3.5 border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-teko text-2xl font-bold text-emerald-400">
                  {Math.round(bestPlayer.overall)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className={`badge badge-pos-${bestPlayer.position} text-[9px] px-1.5 py-0.5`}>
                      {bestPlayer.position}
                    </span>
                    <span className="text-xs font-bold text-white line-clamp-1">{bestPlayer.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    Craque do Time • {bestPlayer.age} anos • {formatCurrency(bestPlayer.value)}
                  </span>
                </div>
              </div>
              <Star size={16} className="text-yellow-400 shrink-0" />
            </div>
          )}

          {/* Top Scorer Card */}
          {topScorer && (
            <div className="game-card p-3.5 border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-rose-950/40 border border-rose-500/40 flex items-center justify-center font-teko text-2xl font-bold text-rose-400">
                  {topScorer.goals || 0}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1">
                      <Flame size={12} /> Artilheiro
                    </span>
                  </div>
                  <span className="text-xs font-bold text-white block">{topScorer.name}</span>
                  <span className="text-[10px] text-slate-400">{topScorer.goals || 0} gols marcados nesta temporada</span>
                </div>
              </div>
              <span className={`badge badge-pos-${topScorer.position} text-[9px] px-1.5 py-0.5`}>
                {topScorer.position}
              </span>
            </div>
          )}

          {/* Squad & Market Quick Access */}
          <div className="game-card p-4 border-slate-800">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Users size={14} className="text-emerald-400" />
                Resumo do Elenco
              </span>
              <span className="text-xs font-bold text-white">{squad.length} atletas</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Folha Salarial</span>
                <span className="font-bold text-white text-[11px]">
                  {formatCurrency(squad.reduce((s, p) => s + (p.salary || 0), 0))} / sem
                </span>
              </div>
              <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Listados à Venda</span>
                <span className="font-bold text-emerald-400 text-[11px]">
                  {squad.filter(p => p.isListed).length} atletas
                </span>
              </div>
            </div>

            <button
              onClick={onGoToTransfers}
              className="w-full mt-2.5 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition flex items-center justify-center gap-1.5"
            >
              <span>Mercado de Transferências</span>
              <ArrowRight size={13} />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
