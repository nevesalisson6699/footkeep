import React, { useState } from 'react';
import { 
  ArrowLeftRight, 
  Search, 
  DollarSign, 
  UserPlus, 
  Check, 
  AlertTriangle,
  Calendar,
  FileText,
  ShieldCheck,
  Clock,
  Sparkles,
  Info
} from 'lucide-react';
import { ClubBadge } from './ClubBadge';
import { 
  DATASET_VERSION_METADATA, 
  CONFIRMED_TRANSFERS_2026, 
  CONTRACT_STATUS_2026, 
  PENDING_CONFIRMATION 
} from '../data/season2026Data.js';
import { getTransferWindowStatus, formatGameDate } from '../engine/calendarEngine';

export function TransfersMarket({ 
  allPlayers, 
  allClubs, 
  userClubId, 
  budget, 
  currentDate = '2025-01-15',
  selectedCompetition = 'brasileirao_serie_a',
  onBuyPlayer, 
  onSellPlayer 
}) {
  const [marketView, setMarketView] = useState('market'); // 'market' | 'contracts2026'
  const [positionFilter, setPositionFilter] = useState('ALL');
  const [sourceFilter, setSourceFilter] = useState('ALL'); // ALL, FREE, CLUBS
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);
  const [contractClubFilter, setContractClubFilter] = useState(userClubId || 'fla');

  const windowStatus = getTransferWindowStatus(currentDate, selectedCompetition);

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
    if (player.clubId !== null && !windowStatus.isOpen) {
      setNotification({ 
        type: 'error', 
        message: `Janela de transferências fechada! Contratações de atletas sob contrato estão suspensas fora do período regulamentar. Próxima janela: ${windowStatus.nextWindow || 'Em breve'}.` 
      });
      setTimeout(() => setNotification(null), 4000);
      return;
    }

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

      {/* View Switcher Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setMarketView('market')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            marketView === 'market'
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <ArrowLeftRight size={15} />
          <span>Mercado Ativo & Negociações</span>
        </button>

        <button
          onClick={() => setMarketView('contracts2026')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            marketView === 'contracts2026'
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <ShieldCheck size={15} />
          <span>Painel Contratual Temporada 2025/26 (BID Oficial)</span>
          <span className="text-[10px] bg-slate-950/80 text-emerald-400 px-1.5 py-0.5 rounded font-mono border border-emerald-500/30">
            Auditado
          </span>
        </button>
      </div>

      {marketView === 'market' ? (
        <>
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

          {/* Transfer Window Status Alert */}
          {!windowStatus.isOpen && (
            <div className="mb-3 p-3 bg-amber-950/40 border border-amber-500/40 rounded-xl text-xs flex items-center gap-2.5 text-amber-200">
              <Clock size={16} className="text-amber-400 shrink-0" />
              <span>
                <b>Janela de Transferências Fechada</b> (Data atual: {formatGameDate(currentDate)}). Contratações entre clubes estão suspensas temporariamente pelas normas da federação. Apenas agentes livres podem ser contratados. Próxima janela: <b>{windowStatus.nextWindow || 'Em breve'}</b>.
              </span>
            </div>
          )}

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
                  const isContracted = player.clubId !== null;
                  const isBlockedByWindow = isContracted && !windowStatus.isOpen;
                  const canAfford = budget >= player.value;
                  const isDisabled = !canAfford || isBlockedByWindow;

                  let buttonLabel = 'Comprar';
                  if (isBlockedByWindow) buttonLabel = 'Janela Fechada';
                  else if (!canAfford) buttonLabel = 'Sem Verba';

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
                            <ClubBadge club={club} size="xs" />
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
                          disabled={isDisabled}
                          title={isBlockedByWindow ? 'Janela de transferências fechada para contratações entre clubes' : (!canAfford ? 'Saldo insuficiente' : 'Contratar jogador')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                            !isDisabled 
                              ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20' 
                              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          {buttonLabel}
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
    </>
  ) : (
    /* CONTRACTUAL STATUS & SEASON 2026/2027 VIEW */
    <div className="space-y-6 animate-fadeIn">
      
      {/* Metadata Banner */}
      <div className="glass-panel p-5 border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest block">
              Auditoria de Vínculos Federativos & Mercado 2025/26
            </span>
            <h3 className="text-lg font-black text-white">
              Contratos Reais, Transferências e Janelas Oficiais (BID / CBF)
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Fontes: <b>{DATASET_VERSION_METADATA.source}</b> • Consulta: <b>{DATASET_VERSION_METADATA.queryDate}</b>
            </p>
          </div>

          <div className="bg-slate-950/80 px-3.5 py-2 rounded-xl border border-slate-800 text-[11px] text-slate-300">
            <span className="text-emerald-400 font-bold block">Critério de Integridade:</span>
            Vínculos confirmados separados de projeções e pendências.
          </div>
        </div>
      </div>

      {/* Section 1: Confirmed Transfers for 2025/26 */}
      <div className="glass-panel p-5 border-slate-800 space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h4 className="font-bold text-white text-sm flex items-center gap-2">
            <ShieldCheck size={17} className="text-emerald-400" />
            Transferências Oficiais Confirmadas para 2025/26
          </h4>
          <span className="text-xs text-slate-400">
            Total: {CONFIRMED_TRANSFERS_2026.length} Operações Homologadas
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {CONFIRMED_TRANSFERS_2026.map(t => (
            <div key={t.id} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-white">{t.player}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                  Oficial
                </span>
              </div>

              <div className="text-xs space-y-1 text-slate-300">
                <div><b>Origem:</b> {t.fromClubName}</div>
                <div><b>Destino:</b> {t.toClubName}</div>
                {t.contractExpiry && <div><b>Vigência:</b> {t.contractExpiry}</div>}
                <div className="text-[11px] text-slate-400">{t.feeEstimatedEur}</div>
              </div>

              <p className="text-[11px] text-emerald-300/80 bg-emerald-950/30 p-2 rounded-xl border border-emerald-900/40">
                {t.impact2026}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Club Contract Ledger */}
      <div className="glass-panel p-5 border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-3">
          <div>
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <FileText size={17} className="text-emerald-400" />
              Status Contratual dos Atletas por Clube (Série A 2025/26)
            </h4>
            <p className="text-xs text-slate-400">
              Consulte os términos de vínculo e a situação de renovação para 2025/26.
            </p>
          </div>

          {/* Club Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Clube:</span>
            <select
              value={contractClubFilter}
              onChange={(e) => setContractClubFilter(e.target.value)}
              className="bg-slate-900 text-white font-bold text-xs rounded-xl px-3 py-1.5 border border-slate-700 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              {allClubs.map(c => (
                <option key={c.id} value={c.id} className="bg-slate-900 text-white">
                  {c.name} ({c.shortName})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table of Club Contracts */}
        {CONTRACT_STATUS_2026[contractClubFilter] ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead className="bg-slate-900/90 text-slate-400">
                <tr>
                  <th className="py-2 px-3">Atleta</th>
                  <th className="py-2 px-3">Posição</th>
                  <th className="py-2 px-3">Término do Contrato</th>
                  <th className="py-2 px-3">Status do Vínculo</th>
                  <th className="py-2 px-3">Detalhamento / Registro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {CONTRACT_STATUS_2026[contractClubFilter].players.map((p, i) => {
                  const isExpiring = p.status === 'contrato_expirando';
                  const isLongTerm = p.status === 'confirmado';

                  return (
                    <tr key={i} className="hover:bg-slate-900/50">
                      <td className="py-2.5 px-3 font-bold text-white">{p.name}</td>
                      <td className="py-2.5 px-3">
                        <span className={`badge badge-pos-${p.pos}`}>{p.pos}</span>
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-300">
                        {p.contractEnd}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          isExpiring 
                            ? 'bg-amber-950 text-amber-400 border-amber-800' 
                            : (isLongTerm ? 'bg-emerald-950 text-emerald-400 border-emerald-800' : 'bg-sky-950 text-sky-400 border-sky-800')
                        }`}>
                          {isExpiring ? 'Expira em 2026' : (isLongTerm ? 'Vínculo Confirmado' : 'Renovação / Metas')}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-400 text-[11px]">
                        {p.notes || 'Registrado regularmente no BID da CBF.'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-xs text-slate-400 bg-slate-950/50 rounded-2xl border border-dashed border-slate-800">
            Carregando registros contratuais homologados para este clube...
          </div>
        )}
      </div>

      {/* Section 3: Pending Confirmations (Transparency Rule) */}
      <div className="glass-panel p-5 border-slate-800 space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h4 className="font-bold text-white text-sm flex items-center gap-2">
            <Clock size={17} className="text-amber-400" />
            Informações Aguardando Abertura de Janela ou Homologação CBF
          </h4>
          <span className="text-xs text-slate-400">
            Critério de Transparência
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PENDING_CONFIRMATION.map(item => (
            <div key={item.id} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200">{item.player}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-950 text-amber-400 border border-amber-800">
                  Aguardando Janela
                </span>
              </div>
              <div className="text-xs text-slate-300"><b>Clube:</b> {item.currentClub}</div>
              <div className="text-[11px] text-slate-400"><b>Cenário:</b> {item.situation}</div>
              <p className="text-[10px] text-slate-500 pt-1 border-t border-slate-800">
                📋 {item.condition}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )}

    </div>
  );
}
