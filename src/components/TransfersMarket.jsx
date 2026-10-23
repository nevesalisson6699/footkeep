import React, { useState } from 'react';
import { 
  ArrowLeftRight, 
  Search, 
  DollarSign, 
  UserPlus, 
  Check, 
  AlertTriangle 
} from 'lucide-react';

export function TransfersMarket({ 
  allPlayers, 
  allClubs, 
  userClubId, 
  budget, 
  onBuyPlayer, 
  onSellPlayer 
}) {
  const [positionFilter, setPositionFilter] = useState('ALL');
  const [sourceFilter, setSourceFilter] = useState('ALL'); // ALL, FREE, CLUBS
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  // Filter market players (exclude user's own players)
  const marketPlayers = allPlayers.filter(p => {
    if (p.clubId === userClubId) return false;
    if (positionFilter !== 'ALL' && p.position !== positionFilter) return false;
    if (sourceFilter === 'FREE' && p.clubId !== null) return false;
    if (sourceFilter === 'CLUBS' && p.clubId === null) return false;
    if (searchTerm && !p.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  }).sort((a, b) => b.overall - a.overall);

  // User players that are for sale
  const myListedPlayers = allPlayers.filter(p => p.clubId === userClubId && p.isListed);

  const handleBuy = (player) => {
    if (budget < player.value) {
      setNotification({ type: 'error', message: 'Orçamento insuficiente para contratar este atleta!' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    onBuyPlayer(player);
    setNotification({ type: 'success', message: `Contratação de ${player.name} confirmada com sucesso!` });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSell = (player) => {
    onSellPlayer(player);
    setNotification({ type: 'success', message: `${player.name} foi vendido por ${formatCurrency(player.value)}!` });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header & Balance */}
      <div className="glass-panel p-5 border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ArrowLeftRight className="text-emerald-400" size={22} />
            Mercado da Bola & Transferências
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Reforce o seu elenco contratando atletas de outros clubes ou agentes livres.
          </p>
        </div>

        <div className="bg-slate-900/90 px-4 py-2.5 rounded-xl border border-slate-800 flex items-center gap-3">
          <DollarSign size={20} className="text-emerald-400" />
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Seu Saldo Disponível</span>
            <span className="text-lg font-black text-white">{formatCurrency(budget)}</span>
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className={`p-4 rounded-xl border text-sm flex items-center gap-3 transition-all ${
          notification.type === 'success' 
            ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200' 
            : 'bg-rose-950/60 border-rose-500 text-rose-200'
        }`}>
          {notification.type === 'success' ? <Check size={18} /> : <AlertTriangle size={18} />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Filters Toolbar */}
      <div className="glass-panel p-4 border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Search Input */}
        <div className="flex items-center gap-2 bg-slate-900 px-3 py-2 rounded-xl border border-slate-800 flex-1 min-w-[200px]">
          <Search size={15} className="text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nome do atleta..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-white placeholder-slate-500 focus:outline-none w-full text-xs"
          />
        </div>

        {/* Position Filter */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
          {['ALL', 'G', 'Z', 'L', 'V', 'M', 'A'].map(pos => (
            <button
              key={pos}
              onClick={() => setPositionFilter(pos)}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${
                positionFilter === pos ? 'bg-emerald-500 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              {pos === 'ALL' ? 'Todas' : pos}
            </button>
          ))}
        </div>

        {/* Source Filter */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setSourceFilter('ALL')}
            className={`px-3 py-1 rounded-lg font-semibold transition ${sourceFilter === 'ALL' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
          >
            Todos
          </button>
          <button
            onClick={() => setSourceFilter('FREE')}
            className={`px-3 py-1 rounded-lg font-semibold transition ${sourceFilter === 'FREE' ? 'bg-slate-800 text-emerald-400' : 'text-slate-400'}`}
          >
            Agentes Livres
          </button>
          <button
            onClick={() => setSourceFilter('CLUBS')}
            className={`px-3 py-1 rounded-lg font-semibold transition ${sourceFilter === 'CLUBS' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
          >
            Com Contrato
          </button>
        </div>

      </div>

      {/* Market List & Sales Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Available for Purchase (8 cols) */}
        <div className="lg:col-span-8 glass-panel p-5 border-slate-800">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3 text-sm font-bold text-slate-200">
            <span>Atletas Disponíveis no Mercado ({marketPlayers.length})</span>
          </div>

          <div className="overflow-x-auto max-h-[500px] overflow-y-auto pr-1">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead className="bg-slate-900/90 text-slate-400 sticky top-0 z-10">
                <tr>
                  <th className="py-2.5 px-3">Pos</th>
                  <th className="py-2.5 px-3">Nome</th>
                  <th className="py-2.5 px-3">Clube Atual</th>
                  <th className="py-2.5 px-3 text-center">OVR</th>
                  <th className="py-2.5 px-3 text-center">Idade</th>
                  <th className="py-2.5 px-3 text-right">Valor Passe</th>
                  <th className="py-2.5 px-3 text-center">Contratar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {marketPlayers.slice(0, 35).map(player => {
                  const club = allClubs.find(c => c.id === player.clubId);
                  const canAfford = budget >= player.value;

                  return (
                    <tr key={player.id} className="hover:bg-slate-800/40 text-slate-300 transition">
                      <td className="py-2.5 px-3">
                        <span className={`badge badge-pos-${player.position}`}>{player.position}</span>
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-white">
                        {player.name}
                      </td>
                      <td className="py-2.5 px-3 text-slate-400 flex items-center gap-1.5">
                        {club ? (
                          <>
                            <span>{club.badgeEmoji}</span>
                            <span>{club.shortName}</span>
                          </>
                        ) : (
                          <span className="text-emerald-400 font-semibold">Agente Livre</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-center font-bold text-emerald-400 font-teko text-lg">
                        {Math.round(player.overall)}
                      </td>
                      <td className="py-2.5 px-3 text-center text-slate-400">{player.age}</td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-200">
                        {formatCurrency(player.value)}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <button
                          onClick={() => handleBuy(player)}
                          disabled={!canAfford}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                            canAfford 
                              ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20' 
                              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          {canAfford ? 'Comprar' : 'Sem Verba'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* My Listed for Sale (4 cols) */}
        <div className="lg:col-span-4 glass-panel p-5 border-slate-800 flex flex-col">
          <div className="pb-3 border-b border-slate-800 mb-3 text-sm font-bold text-slate-200">
            Seus Jogadores à Venda ({myListedPlayers.length})
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto max-h-[500px]">
            {myListedPlayers.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-xl">
                Nenhum jogador listado para transferência no momento. Vá em "Elenco & Tática" e clique em "Vender".
              </div>
            ) : (
              myListedPlayers.map(p => (
                <div key={p.id} className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className={`badge badge-pos-${p.position}`}>{p.position}</span>
                      <span className="font-bold text-slate-100 text-xs">{p.name}</span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">
                      OVR: {Math.round(p.overall)} • {formatCurrency(p.value)}
                    </span>
                  </div>

                  <button
                    onClick={() => handleSell(p)}
                    className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold transition"
                  >
                    Aceitar Oferta
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
