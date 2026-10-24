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
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { ClubBadge } from './ClubBadge';

export function ClubDashboard({ 
  userClub, 
  standings, 
  nextMatch, 
  allClubs, 
  squad, 
  budget, 
  currentRound, 
  managerProfile,
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
          background: `linear-gradient(135deg, ${userClub.colors?.primary || '#166534'}44 0%, #0d1a12 40%, #090d16 100%)`
        }}
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="relative p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <ClubBadge club={userClub} size="xl" className="shadow-2xl" />

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                  Série A 2024
                </span>
                <span className="text-[10px] font-semibold text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                  {userClub.city}
                </span>
                {managerProfile?.coachName && (
                  <span className="text-[10px] font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800 flex items-center gap-1">
                    <UserCheck size={12} className="text-amber-400" />
                    {managerProfile.coachName}
                  </span>
                )}
                {managerProfile?.investmentAmount > 0 && (
                  <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                    Aporte: +{formatCurrency(managerProfile.investmentAmount)}
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                {userClub.fullName || userClub.name}
              </h1>
              <div className="flex items-center gap-2 text-xs text-slate-300 mt-1">
                <MapPin size={13} className="text-emerald-400 shrink-0" />
                <span>{userClub.stadium} • {userClub.stadiumCapacity?.toLocaleString('pt-BR')} lugares</span>
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
                {nextMatch?.type === 'cup' ? 'Copa Mata-Mata' : `Liga - Rodada ${currentRound} de ${(standings?.length > 1 ? (standings.length - 1) * 2 : 38)}`}
              </span>
            </div>

            {/* Stadium Matchup Face-off */}
            {nextMatch && opponentClub ? (
              <div className="py-6">
                <div className="flex items-center justify-around gap-2">
                  
                  {/* Home Club */}
                  <div className="flex-1 flex flex-col items-center text-center">
                    <ClubBadge club={isHome ? userClub : opponentClub} size="xl" className="mb-2" />
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
                    <ClubBadge club={!isHome ? userClub : opponentClub} size="xl" className="mb-2" />
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
              <span>Ajustar Tática</span>
            </button>
          </div>
        </div>

        {/* Squad & Star Players Panel (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Top Star Card */}
          {bestPlayer && (
            <div className="game-card p-4 border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-teko text-2xl font-bold">
                  {bestPlayer.overall}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Craque do Time</span>
                  <h4 className="font-bold text-white text-sm">{bestPlayer.name}</h4>
                  <span className="text-xs text-slate-400">
                    Posição: <b className="text-white">{bestPlayer.position}</b> • {bestPlayer.age} anos
                  </span>
                </div>
              </div>
              <span className="font-mono text-xs font-semibold text-slate-300">
                {formatCurrency(bestPlayer.value)}
              </span>
            </div>
          )}

          {/* Top Scorer Card */}
          {topScorer && (
            <div className="game-card p-4 border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Flame size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Artilheiro</span>
                  <h4 className="font-bold text-white text-sm">{topScorer.name}</h4>
                  <span className="text-xs text-slate-400">
                    Gols marcados: <b className="text-amber-400">{topScorer.goals || 0}</b> gols
                  </span>
                </div>
              </div>
              <button 
                onClick={onGoToTactics}
                className="text-xs text-slate-400 hover:text-emerald-400 transition"
              >
                Ver elenco →
              </button>
            </div>
          )}

          {/* Quick Roster Snapshot */}
          <div className="game-card p-4 border-slate-800">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800 text-xs">
              <span className="font-bold text-slate-300 flex items-center gap-1.5">
                <Users size={14} className="text-emerald-400" />
                Resumo do Plantel ({squad.length} atletas)
              </span>
              <button 
                onClick={onGoToTransfers}
                className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
              >
                Mercado <ArrowRight size={12} />
              </button>
            </div>

            <div className="grid grid-cols-6 gap-1.5 text-center">
              {['G', 'Z', 'L', 'V', 'M', 'A'].map(pos => {
                const count = squad.filter(p => p.position === pos).length;
                return (
                  <div key={pos} className="bg-slate-900/60 p-2 rounded-lg border border-slate-800/80">
                    <span className="text-[10px] font-bold text-slate-400 block">{pos}</span>
                    <span className="font-teko text-lg font-bold text-white leading-none">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
