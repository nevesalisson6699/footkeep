import React from 'react';
import { Award, Trophy, ChevronRight } from 'lucide-react';

export function CupBracket({ cupState, allClubs, userClubId }) {
  if (!cupState) return null;

  const getClub = (id) => allClubs.find(c => c.id === id);

  const champion = cupState.championId ? getClub(cupState.championId) : null;

  const renderMatchCard = (match, phaseName) => {
    const home = getClub(match.homeId);
    const away = getClub(match.awayId);
    const isPlayed = match.played;
    const isUserMatch = match.homeId === userClubId || match.awayId === userClubId;

    return (
      <div 
        key={match.matchId}
        className={`p-3 rounded-xl border text-xs transition-all ${
          isUserMatch 
            ? 'bg-emerald-950/30 border-emerald-500/60 shadow-lg shadow-emerald-950/20' 
            : 'bg-slate-900/70 border-slate-800'
        }`}
      >
        {/* Home Row */}
        <div className={`flex items-center justify-between py-1 px-1.5 rounded ${match.winnerId === home?.id ? 'bg-emerald-500/15 font-bold text-emerald-300' : 'text-slate-300'}`}>
          <div className="flex items-center gap-2 truncate">
            <span className="text-base">{home?.badgeEmoji}</span>
            <span className="truncate">{home?.name}</span>
          </div>
          <span className="font-mono font-bold text-sm">
            {isPlayed ? match.homeScore : '-'}
          </span>
        </div>

        {/* Away Row */}
        <div className={`flex items-center justify-between py-1 px-1.5 rounded mt-0.5 ${match.winnerId === away?.id ? 'bg-emerald-500/15 font-bold text-emerald-300' : 'text-slate-300'}`}>
          <div className="flex items-center gap-2 truncate">
            <span className="text-base">{away?.badgeEmoji}</span>
            <span className="truncate">{away?.name}</span>
          </div>
          <span className="font-mono font-bold text-sm">
            {isPlayed ? match.awayScore : '-'}
          </span>
        </div>

        {/* Shootout indicator */}
        {match.homePenalties !== null && (
          <div className="text-[10px] text-yellow-400 text-center font-bold mt-1 bg-slate-950/60 py-0.5 rounded border border-slate-800">
            Pen. ({match.homePenalties} x {match.awayPenalties})
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="glass-panel p-5 border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Award className="text-emerald-400" size={24} />
            Copa Footkeep Mata-Mata
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            16 Clubes • Jogo Único Eliminatório • Pênaltis em caso de empate
          </p>
        </div>

        {champion && (
          <div className="flex items-center gap-3 bg-gradient-to-r from-yellow-500/20 to-amber-500/10 px-4 py-2 rounded-xl border border-yellow-500/40">
            <Trophy className="text-yellow-400" size={24} />
            <div>
              <span className="text-[10px] text-yellow-400 uppercase font-black tracking-wider block">Campeão da Copa</span>
              <span className="text-sm font-bold text-white flex items-center gap-1.5">
                {champion.badgeEmoji} {champion.name}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Bracket Visual Board */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 overflow-x-auto pb-4">
        
        {/* Oitavas */}
        <div className="space-y-3 min-w-[220px]">
          <div className="bg-slate-900/90 py-2 px-3 rounded-lg border border-slate-800 text-center text-xs font-bold text-slate-300 uppercase tracking-wider">
            Oitavas de Final
          </div>
          <div className="space-y-3">
            {cupState.phases.oitavas.matches.map(m => renderMatchCard(m, 'oitavas'))}
          </div>
        </div>

        {/* Quartas */}
        <div className="space-y-3 min-w-[220px]">
          <div className="bg-slate-900/90 py-2 px-3 rounded-lg border border-slate-800 text-center text-xs font-bold text-slate-300 uppercase tracking-wider">
            Quartas de Final
          </div>
          <div className="space-y-6 pt-4">
            {cupState.phases.quartas.matches.length > 0 ? (
              cupState.phases.quartas.matches.map(m => renderMatchCard(m, 'quartas'))
            ) : (
              <div className="p-8 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-xl">
                Aguardando conclusão das Oitavas
              </div>
            )}
          </div>
        </div>

        {/* Semifinal */}
        <div className="space-y-3 min-w-[220px]">
          <div className="bg-slate-900/90 py-2 px-3 rounded-lg border border-slate-800 text-center text-xs font-bold text-slate-300 uppercase tracking-wider">
            Semifinais
          </div>
          <div className="space-y-12 pt-12">
            {cupState.phases.semi.matches.length > 0 ? (
              cupState.phases.semi.matches.map(m => renderMatchCard(m, 'semi'))
            ) : (
              <div className="p-8 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-xl">
                Aguardando conclusão das Quartas
              </div>
            )}
          </div>
        </div>

        {/* Grande Final */}
        <div className="space-y-3 min-w-[220px]">
          <div className="bg-gradient-to-r from-emerald-500/20 to-yellow-500/20 py-2 px-3 rounded-lg border border-emerald-500/40 text-center text-xs font-black text-emerald-400 uppercase tracking-wider">
            🏆 GRANDE FINAL
          </div>
          <div className="pt-24">
            {cupState.phases.final.matches.length > 0 ? (
              cupState.phases.final.matches.map(m => renderMatchCard(m, 'final'))
            ) : (
              <div className="p-8 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-xl">
                Aguardando os finalistas
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
