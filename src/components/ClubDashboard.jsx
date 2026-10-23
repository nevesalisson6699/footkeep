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
  Star
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

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Hero Club Banner */}
      <div 
        className="relative overflow-hidden rounded-2xl p-6 md:p-8 border border-slate-700/80 shadow-2xl"
        style={{
          background: `linear-gradient(135deg, ${userClub.colors.primary}33 0%, #101726 65%, #090d16 100%)`
        }}
      >
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div 
              className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center text-5xl md:text-6xl shadow-xl border-2"
              style={{ 
                backgroundColor: userClub.colors.primary, 
                borderColor: userClub.colors.secondary || '#fff' 
              }}
            >
              {userClub.badgeEmoji}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="badge bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Série A Footkeep
                </span>
                <span className="badge bg-slate-800 text-slate-300">
                  Reputação {userClub.reputation}/100
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                {userClub.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-slate-300 mt-2">
                <span className="flex items-center gap-1.5">
                  <MapPin size={15} className="text-slate-400" />
                  {userClub.city}
                </span>
                <span className="text-slate-600">•</span>
                <span>{userClub.stadium} ({userClub.stadiumCapacity.toLocaleString('pt-BR')} lug.)</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="bg-slate-900/80 backdrop-blur-md px-5 py-3.5 rounded-xl border border-slate-800 flex-1 md:flex-initial text-center md:text-right">
              <span className="text-xs text-slate-400 uppercase tracking-wider block font-semibold">Classificação</span>
              <span className="text-3xl font-black text-emerald-400 font-teko">
                {userRank}º <span className="text-sm font-sans font-medium text-slate-300">({userStats?.points || 0} pts)</span>
              </span>
            </div>

            <div className="bg-slate-900/80 backdrop-blur-md px-5 py-3.5 rounded-xl border border-slate-800 flex-1 md:flex-initial text-center md:text-right">
              <span className="text-xs text-slate-400 uppercase tracking-wider block font-semibold">Caixa Disponível</span>
              <span className="text-2xl font-bold text-white">
                {formatCurrency(budget)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Next Match & Status Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Next Match Card (Centerpiece) */}
        <div className="lg:col-span-2 glass-panel p-6 border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
                <Calendar size={18} className="text-emerald-400" />
                <span>PRÓXIMO CONFRONTO</span>
              </div>
              <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full font-semibold">
                {nextMatch?.type === 'cup' ? 'Copa Mata-Mata' : `Liga - Rodada ${currentRound}`}
              </span>
            </div>

            {nextMatch && opponentClub ? (
              <div className="py-8 flex flex-col items-center">
                <div className="flex items-center justify-center gap-6 md:gap-12 w-full">
                  
                  {/* Home Team */}
                  <div className="flex-1 flex flex-col items-center text-center">
                    <div 
                      className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-4xl md:text-5xl shadow-lg border-2 mb-3"
                      style={{ 
                        backgroundColor: isHome ? userClub.colors.primary : opponentClub.colors.primary,
                        borderColor: '#ffffff33'
                      }}
                    >
                      {isHome ? userClub.badgeEmoji : opponentClub.badgeEmoji}
                    </div>
                    <span className="text-base md:text-lg font-bold text-white line-clamp-1">
                      {isHome ? userClub.name : opponentClub.name}
                    </span>
                    <span className="text-xs text-emerald-400 font-semibold">MANDANTE</span>
                  </div>

                  {/* VS Badge */}
                  <div className="flex flex-col items-center">
                    <span className="font-teko text-3xl font-black text-slate-500">VS</span>
                    <span className="text-[11px] text-slate-400 font-medium">90 MIN</span>
                  </div>

                  {/* Away Team */}
                  <div className="flex-1 flex flex-col items-center text-center">
                    <div 
                      className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-4xl md:text-5xl shadow-lg border-2 mb-3"
                      style={{ 
                        backgroundColor: !isHome ? userClub.colors.primary : opponentClub.colors.primary,
                        borderColor: '#ffffff33'
                      }}
                    >
                      {!isHome ? userClub.badgeEmoji : opponentClub.badgeEmoji}
                    </div>
                    <span className="text-base md:text-lg font-bold text-white line-clamp-1">
                      {!isHome ? userClub.name : opponentClub.name}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">VISITANTE</span>
                  </div>

                </div>

                <div className="mt-6 text-center text-xs text-slate-400">
                  Local: <span className="text-slate-200 font-semibold">{isHome ? userClub.stadium : opponentClub.stadium}</span>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400">
                Fim de temporada! Não há próximas partidas agendadas.
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onGoToMatch}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all"
            >
              <Play size={18} fill="currentColor" />
              <span>JOGAR PARTIDA AGORA</span>
            </button>

            <button
              onClick={onGoToTactics}
              className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-all"
            >
              Ajustar Escalação & Tática
            </button>
          </div>
        </div>

        {/* Side Panel: Squad & Star Highlights */}
        <div className="space-y-4">
          
          {/* Best Player Card */}
          {bestPlayer && (
            <div className="glass-panel p-5 border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Star size={14} className="text-yellow-400" />
                  Destaque do Time
                </span>
                <span className={`badge badge-pos-${bestPlayer.position}`}>{bestPlayer.position}</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-100 text-base">{bestPlayer.name}</h3>
                  <p className="text-xs text-slate-400">{bestPlayer.age} anos • {formatCurrency(bestPlayer.value)}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-teko text-2xl font-bold text-emerald-400">
                  {Math.round(bestPlayer.overall)}
                </div>
              </div>
            </div>
          )}

          {/* Top Scorer Card */}
          {topScorer && (
            <div className="glass-panel p-5 border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Flame size={14} className="text-rose-400" />
                  Artilheiro do Clube
                </span>
                <span className="text-xs font-bold text-emerald-400">{topScorer.goals || 0} Gols</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-100 text-base">{topScorer.name}</h3>
                  <p className="text-xs text-slate-400">{topScorer.position} • {topScorer.matchesPlayed || 0} jogos disputados</p>
                </div>
                <span className={`badge badge-pos-${topScorer.position}`}>{topScorer.position}</span>
              </div>
            </div>
          )}

          {/* Squad Status Overview */}
          <div className="glass-panel p-5 border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
              Informações do Plantel
            </span>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                <span className="text-[11px] text-slate-400 block">Total de Atletas</span>
                <span className="text-lg font-bold text-slate-200">{squad.length}</span>
              </div>
              <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                <span className="text-[11px] text-slate-400 block">Média de Idade</span>
                <span className="text-lg font-bold text-slate-200">
                  {(squad.reduce((acc, p) => acc + p.age, 0) / (squad.length || 1)).toFixed(1)}
                </span>
              </div>
            </div>
            <button
              onClick={onGoToTransfers}
              className="w-full mt-3 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700/80 text-center block transition"
            >
              Explorar Mercado de Transferências →
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
