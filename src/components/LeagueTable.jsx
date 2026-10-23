import React from 'react';
import { Table, Trophy, Flame } from 'lucide-react';

export function LeagueTable({ standings, userClubId, allPlayers, allClubs }) {
  // Compute top goalscorers from all players
  const topScorers = [...allPlayers]
    .filter(p => (p.goals || 0) > 0)
    .sort((a, b) => (b.goals || 0) - (a.goals || 0))
    .slice(0, 10);

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Title Header */}
      <div className="glass-panel p-5 border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Trophy className="text-yellow-400" size={22} />
            Tabela de Classificação - Liga Nacional Série A
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Turno e Returno • 16 Clubes • 30 Rodadas
          </p>
        </div>

        {/* Legend */}
        <div className="hidden md:flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> 1º Campeão
          </span>
          <span className="flex items-center gap-1.5 text-sky-400">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span> G4 Continental
          </span>
          <span className="flex items-center gap-1.5 text-rose-400">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Z4 Rebaixamento
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Main Table (8 Cols) */}
        <div className="lg:col-span-8 glass-panel p-5 border-slate-800 overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">#</th>
                <th className="py-2.5 px-3">Clube</th>
                <th className="py-2.5 px-3 text-center font-bold text-white">PTS</th>
                <th className="py-2.5 px-3 text-center">J</th>
                <th className="py-2.5 px-3 text-center">V</th>
                <th className="py-2.5 px-3 text-center">E</th>
                <th className="py-2.5 px-3 text-center">D</th>
                <th className="py-2.5 px-3 text-center">GP</th>
                <th className="py-2.5 px-3 text-center">GC</th>
                <th className="py-2.5 px-3 text-center font-bold">SG</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {standings.map((team, index) => {
                const rank = index + 1;
                const isUser = team.clubId === userClubId;

                // Color accent bar on rank
                let rankColor = 'border-l-4 border-transparent';
                if (rank === 1) rankColor = 'border-l-4 border-emerald-500';
                else if (rank <= 4) rankColor = 'border-l-4 border-sky-500';
                else if (rank >= 13) rankColor = 'border-l-4 border-rose-500';

                return (
                  <tr 
                    key={team.clubId}
                    className={`transition-colors ${rankColor} ${
                      isUser 
                        ? 'bg-emerald-500/15 font-bold text-white shadow-inner' 
                        : 'hover:bg-slate-800/40 text-slate-300'
                    }`}
                  >
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-400">
                      {rank}
                    </td>
                    <td className="py-2.5 px-3 flex items-center gap-2.5">
                      <span className="text-lg">{team.badgeEmoji}</span>
                      <span className="font-semibold text-slate-100">
                        {team.name} {isUser && <span className="text-[10px] text-emerald-400 font-bold ml-1">(VOCÊ)</span>}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center font-black text-emerald-400 text-sm">
                      {team.points}
                    </td>
                    <td className="py-2.5 px-3 text-center text-slate-400">{team.played}</td>
                    <td className="py-2.5 px-3 text-center text-slate-300">{team.won}</td>
                    <td className="py-2.5 px-3 text-center text-slate-300">{team.drawn}</td>
                    <td className="py-2.5 px-3 text-center text-slate-300">{team.lost}</td>
                    <td className="py-2.5 px-3 text-center text-slate-400">{team.goalsFor}</td>
                    <td className="py-2.5 px-3 text-center text-slate-400">{team.goalsAgainst}</td>
                    <td className={`py-2.5 px-3 text-center font-bold ${team.goalDifference > 0 ? 'text-emerald-400' : (team.goalDifference < 0 ? 'text-rose-400' : 'text-slate-400')}`}>
                      {team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Top Scorers Card (4 Cols) */}
        <div className="lg:col-span-4 glass-panel p-5 border-slate-800 flex flex-col">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800 mb-3 text-sm font-bold text-slate-200">
            <Flame className="text-rose-500" size={18} />
            <span>Artilharia do Campeonato</span>
          </div>

          <div className="overflow-y-auto flex-1 space-y-2 pr-1 max-h-[500px]">
            {topScorers.length === 0 ? (
              <div className="h-40 flex items-center justify-center text-xs text-slate-500 text-center">
                Ainda não há gols marcados na temporada.
              </div>
            ) : (
              topScorers.map((scorer, i) => {
                const club = allClubs.find(c => c.id === scorer.clubId);

                return (
                  <div 
                    key={scorer.id} 
                    className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-slate-500 w-4">{i + 1}º</span>
                      <div>
                        <span className="font-bold text-slate-200 block line-clamp-1">{scorer.name}</span>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          {club?.badgeEmoji} {club?.name || 'Agente Livre'}
                        </span>
                      </div>
                    </div>
                    <div className="bg-rose-500/15 border border-rose-500/30 text-rose-400 font-black font-teko text-xl px-2.5 py-0.5 rounded-md">
                      {scorer.goals} GOLS
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
