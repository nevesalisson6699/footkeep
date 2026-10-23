import React, { useState } from 'react';
import { 
  Users, 
  Shield, 
  Swords, 
  Activity, 
  ArrowUpDown, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

const FORMATIONS = {
  '4-4-2': {
    name: '4-4-2 Clássico',
    slots: [
      { role: 'G', x: 50, y: 88, name: 'Goleiro' },
      { role: 'L', x: 15, y: 70, name: 'Lateral E.' },
      { role: 'Z', x: 38, y: 73, name: 'Zagueiro E.' },
      { role: 'Z', x: 62, y: 73, name: 'Zagueiro D.' },
      { role: 'L', x: 85, y: 70, name: 'Lateral D.' },
      { role: 'M', x: 18, y: 46, name: 'Meia E.' },
      { role: 'V', x: 38, y: 52, name: 'Volante' },
      { role: 'V', x: 62, y: 52, name: 'Volante' },
      { role: 'M', x: 82, y: 46, name: 'Meia D.' },
      { role: 'A', x: 36, y: 22, name: 'Atacante' },
      { role: 'A', x: 64, y: 22, name: 'Atacante' }
    ]
  },
  '4-3-3': {
    name: '4-3-3 Ofensivo',
    slots: [
      { role: 'G', x: 50, y: 88, name: 'Goleiro' },
      { role: 'L', x: 15, y: 70, name: 'Lateral E.' },
      { role: 'Z', x: 38, y: 73, name: 'Zagueiro E.' },
      { role: 'Z', x: 62, y: 73, name: 'Zagueiro D.' },
      { role: 'L', x: 85, y: 70, name: 'Lateral D.' },
      { role: 'V', x: 50, y: 54, name: 'Volante Central' },
      { role: 'M', x: 32, y: 42, name: 'Meia Criador' },
      { role: 'M', x: 68, y: 42, name: 'Meia Ofensivo' },
      { role: 'A', x: 18, y: 22, name: 'Ponta E.' },
      { role: 'A', x: 50, y: 18, name: 'Centroavante' },
      { role: 'A', x: 82, y: 22, name: 'Ponta D.' }
    ]
  },
  '3-5-2': {
    name: '3-5-2 Equilibrado',
    slots: [
      { role: 'G', x: 50, y: 88, name: 'Goleiro' },
      { role: 'Z', x: 28, y: 72, name: 'Zagueiro E.' },
      { role: 'Z', x: 50, y: 74, name: 'Líbero' },
      { role: 'Z', x: 72, y: 72, name: 'Zagueiro D.' },
      { role: 'L', x: 12, y: 48, name: 'Ala E.' },
      { role: 'V', x: 38, y: 52, name: 'Volante' },
      { role: 'V', x: 62, y: 52, name: 'Volante' },
      { role: 'M', x: 50, y: 38, name: 'Armador' },
      { role: 'L', x: 88, y: 48, name: 'Ala D.' },
      { role: 'A', x: 36, y: 20, name: 'Atacante E.' },
      { role: 'A', x: 64, y: 20, name: 'Atacante D.' }
    ]
  },
  '4-2-3-1': {
    name: '4-2-3-1 Moderno',
    slots: [
      { role: 'G', x: 50, y: 88, name: 'Goleiro' },
      { role: 'L', x: 15, y: 70, name: 'Lateral E.' },
      { role: 'Z', x: 38, y: 73, name: 'Zagueiro E.' },
      { role: 'Z', x: 62, y: 73, name: 'Zagueiro D.' },
      { role: 'L', x: 85, y: 70, name: 'Lateral D.' },
      { role: 'V', x: 38, y: 56, name: 'Primeiro Volante' },
      { role: 'V', x: 62, y: 56, name: 'Segundo Volante' },
      { role: 'M', x: 22, y: 36, name: 'Extremo E.' },
      { role: 'M', x: 50, y: 34, name: 'Meia Central' },
      { role: 'M', x: 78, y: 36, name: 'Extremo D.' },
      { role: 'A', x: 50, y: 18, name: 'Referência' }
    ]
  }
};

export function SquadTactics({ 
  squad, 
  tactics, 
  onUpdateTactics, 
  onSwapPlayers, 
  onToggleTransferList 
}) {
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);

  const starters = squad.slice(0, 11);
  const bench = squad.slice(11);

  const activeFormation = FORMATIONS[tactics.formation] || FORMATIONS['4-4-2'];

  const handlePlayerClick = (p) => {
    if (!selectedPlayerId) {
      setSelectedPlayerId(p.id);
    } else if (selectedPlayerId === p.id) {
      setSelectedPlayerId(null);
    } else {
      // Swap players
      onSwapPlayers(selectedPlayerId, p.id);
      setSelectedPlayerId(null);
    }
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Tactical Settings Header */}
      <div className="glass-panel p-5 border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="text-emerald-400" size={22} />
            Escalação e Formação Tática
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Selecione 11 titulares. Clique em um jogador para selecioná-lo e depois em outro para trocar de posição.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Formation Picker */}
          <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-700/80">
            <span className="text-xs font-semibold text-slate-400">Esquema:</span>
            <select
              value={tactics.formation}
              onChange={(e) => onUpdateTactics({ ...tactics, formation: e.target.value })}
              className="bg-transparent text-emerald-400 font-bold text-sm focus:outline-none cursor-pointer"
            >
              {Object.keys(FORMATIONS).map(f => (
                <option key={f} value={f} className="bg-slate-900 text-white">{f} ({FORMATIONS[f].name})</option>
              ))}
            </select>
          </div>

          {/* Mentality Picker */}
          <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-700/80">
            <span className="text-xs font-semibold text-slate-400">Postura:</span>
            <select
              value={tactics.mentality}
              onChange={(e) => onUpdateTactics({ ...tactics, mentality: e.target.value })}
              className={`bg-transparent font-bold text-sm focus:outline-none cursor-pointer ${
                tactics.mentality === 'Ofensiva' ? 'text-rose-400' : (tactics.mentality === 'Defensiva' ? 'text-sky-400' : 'text-amber-400')
              }`}
            >
              <option value="Defensiva" className="bg-slate-900 text-sky-400">Defensiva (Tranca a defesa)</option>
              <option value="Equilibrada" className="bg-slate-900 text-amber-400">Equilibrada (Padrão)</option>
              <option value="Ofensiva" className="bg-slate-900 text-rose-400">Ofensiva (Pressão e gols)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Tactical Layout: 2D Pitch + Roster List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* 2D Football Pitch (5 Cols) */}
        <div className="lg:col-span-5">
          <div className="football-pitch h-[540px] p-4 flex flex-col justify-between">
            <div className="pitch-line-half" />
            <div className="pitch-circle" />
            <div className="pitch-box-top" />
            <div className="pitch-box-bottom" />

            {/* Tactical Pins */}
            {activeFormation.slots.map((slot, index) => {
              const player = starters[index];
              const isSelected = player && selectedPlayerId === player.id;

              return (
                <div
                  key={index}
                  onClick={() => player && handlePlayerClick(player)}
                  style={{
                    position: 'absolute',
                    left: `${slot.x}%`,
                    top: `${slot.y}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 20
                  }}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  <div 
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shadow-xl transition-all duration-150 ${
                      isSelected 
                        ? 'ring-4 ring-yellow-400 scale-125 bg-yellow-500 text-slate-950 font-black' 
                        : 'bg-slate-950/90 text-white border-2 border-emerald-400 group-hover:scale-110'
                    }`}
                  >
                    {player ? Math.round(player.overall) : slot.role}
                  </div>
                  <div className="bg-slate-950/85 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-slate-200 font-semibold mt-1 whitespace-nowrap shadow border border-slate-800 line-clamp-1 max-w-[90px] text-center">
                    {player ? player.name.split(' ')[0] : slot.name}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-center text-xs text-slate-400">
            {selectedPlayerId ? (
              <span className="text-yellow-400 font-bold animate-pulse">
                Jogador selecionado! Clique em outro atleta para efetuar a substituição.
              </span>
            ) : (
              <span>Dica: Clique no jogador no campo ou na lista para selecionar e trocar.</span>
            )}
          </div>
        </div>

        {/* Squad Player Management Table (7 Cols) */}
        <div className="lg:col-span-7 glass-panel p-5 border-slate-800 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
            <h3 className="font-bold text-slate-200 text-sm">
              Plantel Completo ({squad.length} Atletas)
            </h3>
            <span className="text-xs text-emerald-400 font-semibold">
              Top 11 são os Titulares
            </span>
          </div>

          <div className="overflow-y-auto max-h-[490px] pr-1">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 text-slate-400 sticky top-0 z-10">
                <tr>
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Pos</th>
                  <th className="py-2.5 px-3">Nome</th>
                  <th className="py-2.5 px-3 text-center">OVR</th>
                  <th className="py-2.5 px-3 text-center">FIN</th>
                  <th className="py-2.5 px-3 text-center">PAS</th>
                  <th className="py-2.5 px-3 text-center">DEF</th>
                  <th className="py-2.5 px-3 text-center">Idade</th>
                  <th className="py-2.5 px-3 text-right">Salário</th>
                  <th className="py-2.5 px-3 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {squad.map((player, idx) => {
                  const isStarter = idx < 11;
                  const isSelected = selectedPlayerId === player.id;

                  return (
                    <tr 
                      key={player.id}
                      onClick={() => handlePlayerClick(player)}
                      className={`cursor-pointer transition-colors ${
                        isSelected 
                          ? 'bg-yellow-500/20 text-yellow-300' 
                          : (isStarter ? 'hover:bg-slate-800/60' : 'opacity-70 hover:opacity-100 hover:bg-slate-800/40')
                      }`}
                    >
                      <td className="py-2.5 px-3 font-bold text-slate-500">
                        {idx + 1}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`badge badge-pos-${player.position}`}>
                          {player.position}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-slate-200 whitespace-nowrap">
                        {player.name}
                        {isStarter && (
                          <span className="ml-1.5 text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-bold">
                            TITULAR
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-center font-bold text-emerald-400">
                        {Math.round(player.overall)}
                      </td>
                      <td className="py-2.5 px-3 text-center text-slate-300">{player.fin}</td>
                      <td className="py-2.5 px-3 text-center text-slate-300">{player.pas}</td>
                      <td className="py-2.5 px-3 text-center text-slate-300">{player.def}</td>
                      <td className="py-2.5 px-3 text-center text-slate-400">{player.age}</td>
                      <td className="py-2.5 px-3 text-right text-slate-400 font-mono">
                        {formatCurrency(player.salary)}
                      </td>
                      <td className="py-2.5 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => onToggleTransferList(player.id)}
                          className={`text-[10px] px-2 py-1 rounded font-semibold border transition ${
                            player.isListed 
                              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30' 
                              : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                          }`}
                        >
                          {player.isListed ? 'Listado' : 'Vender'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>

      </div>

    </div>
  );
}
