import React, { useState, useMemo } from 'react';
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
  Info,
  Globe,
  Filter,
  X,
  ChevronDown
} from 'lucide-react';
import { ClubBadge } from './ClubBadge';
import { 
  DATASET_VERSION_METADATA, 
  CONFIRMED_TRANSFERS_2026, 
  CONTRACT_STATUS_2026, 
  PENDING_CONFIRMATION 
} from '../data/season2026Data.js';
import { getTransferWindowStatus, formatGameDate } from '../engine/calendarEngine';
import { 
  getAllGlobalMarketClubs, 
  getAllGlobalMarketPlayers, 
  normalizeCompetitionId,
  SUPPORTED_COMPETITIONS 
} from '../data/competitionsHub.js';

export function TransfersMarket({ 
  allPlayers = [], 
  allClubs = [], 
  userClubId, 
  budget = 0, 
  currentDate = '2026-01-15',
  selectedCompetition = 'brasileirao_serie_a',
  onBuyPlayer, 
  onSellPlayer 
}) {
  const [marketView, setMarketView] = useState('market'); // 'market' | 'contracts2026'
  
  // Multileague Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState('ALL'); // 'ALL' | 'Brasil' | 'Inglaterra' | 'Espanha' | etc.
  const [leagueFilter, setLeagueFilter] = useState('ALL'); // 'ALL' | leagueId
  const [clubFilter, setClubFilter] = useState('ALL'); // 'ALL' | clubId
  const [positionFilter, setPositionFilter] = useState('ALL'); // 'ALL' | 'G' | 'Z' | 'L' | 'V' | 'M' | 'A'
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'FREE' | 'CLUBS'
  const [priceRangeFilter, setPriceRangeFilter] = useState('ALL'); // 'ALL' | 'under_5m' | '5m_20m' | '20m_50m' | 'over_50m'
  const [visibleCount, setVisibleCount] = useState(50);
  
  const [notification, setNotification] = useState(null);
  const [contractClubFilter, setContractClubFilter] = useState(userClubId || 'fla');

  const windowStatus = getTransferWindowStatus(currentDate, selectedCompetition);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val || 0);
  };

  // 1. Consolidated Global Clubs (80 clubs + active career clubs override)
  const globalClubs = useMemo(() => {
    const baseGlobal = getAllGlobalMarketClubs();
    const clubMap = new Map();
    baseGlobal.forEach(c => clubMap.set(c.id, c));
    allClubs.forEach(c => {
      const existing = clubMap.get(c.id) || {};
      clubMap.set(c.id, { ...existing, ...c });
    });
    return Array.from(clubMap.values());
  }, [allClubs]);

  // 2. Consolidated Global Market Players (~1.340+ athletes across all leagues + Free Agents)
  const globalMarketPlayers = useMemo(() => {
    const basePlayers = getAllGlobalMarketPlayers();
    const playerMap = new Map();
    basePlayers.forEach(p => playerMap.set(p.id, p));
    // Overwrite with active career players (reflecting user's purchases, sales, and listing status)
    allPlayers.forEach(p => {
      playerMap.set(p.id, { ...(playerMap.get(p.id) || {}), ...p });
    });
    return Array.from(playerMap.values());
  }, [allPlayers]);

  // Dynamic clubs list for the club filter dropdown based on country and league filters
  const filteredClubOptions = useMemo(() => {
    return globalClubs.filter(club => {
      if (countryFilter !== 'ALL' && club.country !== countryFilter) return false;
      if (leagueFilter !== 'ALL' && normalizeCompetitionId(club.leagueId) !== normalizeCompetitionId(leagueFilter)) return false;
      return true;
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [globalClubs, countryFilter, leagueFilter]);

  // Handle Country selection with automatic league synchronization
  const handleCountryChange = (country) => {
    setCountryFilter(country);
    setClubFilter('ALL');
    setVisibleCount(50);
    const countryLeagueMap = {
      'Brasil': (leagueFilter === 'brasileirao_serie_a' || leagueFilter === 'brasileirao_serie_b') ? leagueFilter : 'ALL',
      'Inglaterra': 'premier_league',
      'Espanha': 'laliga',
      'Estados Unidos': 'mls',
      'México': 'liga_mx',
      'Argentina': 'copa_libertadores',
      'Uruguai': 'copa_libertadores',
      'América do Sul': 'copa_libertadores',
      'Arábia Saudita': 'afc_champions_league',
      'Japão': 'j_league',
      'China': 'chinese_super_league',
      'Índia': 'indian_super_league',
      'Coreia do Sul': 'k_league_2',
      'Austrália': 'a_league',
      'África do Sul': 'south_african_psl'
    };
    setLeagueFilter(countryLeagueMap[country] || 'ALL');
  };

  // Handle League selection with automatic country synchronization
  const handleLeagueChange = (league) => {
    setLeagueFilter(league);
    setClubFilter('ALL');
    setVisibleCount(50);
    const leagueCountryMap = {
      'premier_league': 'Inglaterra',
      'laliga': 'Espanha',
      'brasileirao_serie_a': 'Brasil',
      'brasileirao_serie_b': 'Brasil',
      'mls': 'Estados Unidos',
      'liga_mx': 'México',
      'copa_libertadores': 'ALL',
      'afc_champions_league': 'ALL',
      'j_league': 'Japão',
      'chinese_super_league': 'China',
      'indian_super_league': 'Índia',
      'k_league_2': 'Coreia do Sul',
      'a_league': 'Austrália',
      'south_african_psl': 'África do Sul'
    };
    if (league !== 'ALL') {
      setCountryFilter(leagueCountryMap[league] || 'ALL');
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setCountryFilter('ALL');
    setLeagueFilter('ALL');
    setClubFilter('ALL');
    setPositionFilter('ALL');
    setStatusFilter('ALL');
    setPriceRangeFilter('ALL');
    setVisibleCount(50);
  };

  const hasActiveFilters = searchTerm !== '' || countryFilter !== 'ALL' || leagueFilter !== 'ALL' || clubFilter !== 'ALL' || positionFilter !== 'ALL' || statusFilter !== 'ALL' || priceRangeFilter !== 'ALL';

  // 3. Filter market players (exclude user's own squad)
  const filteredMarketPlayers = useMemo(() => {
    return globalMarketPlayers.filter(p => {
      // Exclude user's own players
      if (p.clubId === userClubId) return false;

      // Position filter
      if (positionFilter !== 'ALL' && p.position !== positionFilter) return false;

      // Status filter
      const isFree = p.clubId === null || p.contractStatus === 'livre_mercado' || p.leagueId === 'free_agent';
      if (statusFilter === 'FREE' && !isFree) return false;
      if (statusFilter === 'CLUBS' && isFree) return false;

      // Price range filter
      if (priceRangeFilter === 'under_5m' && p.value > 5000000) return false;
      if (priceRangeFilter === '5m_20m' && (p.value <= 5000000 || p.value > 20000000)) return false;
      if (priceRangeFilter === '20m_50m' && (p.value <= 20000000 || p.value > 50000000)) return false;
      if (priceRangeFilter === 'over_50m' && p.value <= 50000000) return false;

      // Find associated club
      const club = globalClubs.find(c => c.id === p.clubId);

      // Country filter
      if (countryFilter !== 'ALL') {
        if (isFree) {
          if (p.country && p.country !== 'Global' && p.country !== 'Mundial' && p.country !== countryFilter) {
            return false;
          }
        } else {
          const clubCountry = club ? club.country : p.country;
          if (clubCountry !== countryFilter) return false;
        }
      }

      // League filter
      if (leagueFilter !== 'ALL') {
        if (isFree) return false;
        const playerLeague = p.leagueId || (club && club.leagueId);
        if (normalizeCompetitionId(playerLeague) !== normalizeCompetitionId(leagueFilter)) return false;
      }

      // Club filter
      if (clubFilter !== 'ALL') {
        if (p.clubId !== clubFilter) return false;
      }

      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const nameMatch = p.name.toLowerCase().includes(query);
        const clubNameMatch = club && (club.name.toLowerCase().includes(query) || club.shortName.toLowerCase().includes(query));
        if (!nameMatch && !clubNameMatch) return false;
      }

      return true;
    }).sort((a, b) => b.overall - a.overall);
  }, [globalMarketPlayers, userClubId, positionFilter, statusFilter, countryFilter, leagueFilter, clubFilter, searchTerm, globalClubs]);

  // User players that are for sale
  const myListedPlayers = allPlayers.filter(p => p.clubId === userClubId && p.isListed);

  const handleBuy = (player) => {
    const isFree = player.clubId === null;

    if (!isFree && !windowStatus.isOpen) {
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

  // Helper to format country / league badge
  const renderLeagueBadge = (player, club) => {
    if (!player.clubId || player.contractStatus === 'livre_mercado' || player.leagueId === 'free_agent') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-800">
          <Globe size={11} />
          Agente Livre
        </span>
      );
    }

    const leagueId = normalizeCompetitionId(player.leagueId || (club && club.leagueId));
    if (leagueId === 'brasileirao_serie_a') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/70 text-emerald-300 border border-emerald-800/60">
          <span>🇧🇷</span> Série A
        </span>
      );
    }
    if (leagueId === 'brasileirao_serie_b') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-950/70 text-amber-300 border border-amber-800/60">
          <span>🇧🇷</span> Série B
        </span>
      );
    }
    if (leagueId === 'premier_league') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-950/70 text-purple-300 border border-purple-800/60">
          <span>🏴󠁧󠁢󠁥󠁮󠁧󠁿</span> Premier League
        </span>
      );
    }
    if (leagueId === 'laliga') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-950/70 text-rose-300 border border-rose-800/60">
          <span>🇪🇸</span> LaLiga
        </span>
      );
    }
    if (leagueId === 'mls') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-950/70 text-blue-300 border border-blue-800/60">
          <span>🇺🇸</span> MLS
        </span>
      );
    }
    if (leagueId === 'liga_mx') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/70 text-emerald-300 border border-emerald-800/60">
          <span>🇲🇽</span> Liga MX
        </span>
      );
    }
    if (leagueId === 'copa_libertadores') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-950/70 text-amber-300 border border-amber-800/60">
          <span>🌎</span> Libertadores
        </span>
      );
    }
    if (leagueId === 'afc_champions_league') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-yellow-950/70 text-yellow-300 border border-yellow-800/60">
          <span>⭐</span> AFC Champions
        </span>
      );
    }
    if (leagueId === 'j_league') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-950/70 text-red-300 border border-red-800/60">
          <span>🇯🇵</span> J-League
        </span>
      );
    }
    if (leagueId === 'chinese_super_league') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-950/70 text-amber-300 border border-red-800/60">
          <span>🇨🇳</span> CSL China
        </span>
      );
    }
    if (leagueId === 'indian_super_league') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-950/70 text-orange-300 border border-orange-800/60">
          <span>🇮🇳</span> ISL Índia
        </span>
      );
    }
    if (leagueId === 'k_league_2') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-950/70 text-indigo-300 border border-indigo-800/60">
          <span>🇰🇷</span> K-League 2
        </span>
      );
    }
    if (leagueId === 'a_league') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-950/70 text-teal-300 border border-teal-800/60">
          <span>🇦🇺</span> A-League
        </span>
      );
    }
    if (leagueId === 'south_african_psl') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-yellow-950/70 text-yellow-400 border border-yellow-800/60">
          <span>🇿🇦</span> PSL África
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
        Internacional
      </span>
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header & Balance */}
      <div className="glass-panel p-5 border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ArrowLeftRight className="text-emerald-400" size={22} />
            Mercado Global de Transferências Multiliga
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Explore e contrate atletas do Brasil (Série A e B), Inglaterra (Premier League), Espanha (LaLiga) e Agentes Livres mundiais.
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

      {/* Algorithmic Estimate Disclaimer Banner */}
      <div className="p-3.5 bg-gradient-to-r from-emerald-950/40 via-slate-900/90 to-slate-900/90 border border-emerald-500/30 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-300">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
            <Sparkles size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-white text-xs uppercase tracking-wider">
                Estimativa Algorítmica Footkeep
              </span>
              <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Temporada 2025/26
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
              Todos os <b>valores de passe</b> e <b>salários mensais</b> são calculados matematicamente pelo algoritmo proprietário do Footkeep, calibrados segundo idade, rating OVR, posição, divisão e ciclo de desempenho 2025/26. Não constituem dados contábeis nem balanços oficiais divulgados pelos clubes.
            </p>
          </div>
        </div>
        <div className="shrink-0 text-[11px] text-slate-400 flex items-center gap-1.5 bg-slate-950/60 px-3 py-1.5 rounded-xl border border-slate-800 self-stretch sm:self-auto justify-center">
          <Info size={14} className="text-emerald-400" />
          <span>Equilíbrio Desportivo</span>
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
          <Globe size={15} />
          <span>Mercado Global & Negociações</span>
          <span className="text-[10px] bg-slate-950/80 text-emerald-300 px-1.5 py-0.5 rounded font-mono border border-emerald-500/30">
            {filteredMarketPlayers.length}
          </span>
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

          {/* Multileague Filters Toolbar */}
          <div className="glass-panel p-4 border-slate-800 space-y-3 text-xs">
            
            {/* Top row: Search input + Position Pills + Reset */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              
              {/* Search Input */}
              <div className="flex items-center gap-2 bg-slate-900 px-3 py-2 rounded-xl border border-slate-800 flex-1 min-w-[220px]">
                <Search size={15} className="text-slate-400" />
                <input
                  type="text"
                  data-testid="market-search-input"
                  placeholder="Buscar atleta ou clube no mercado global..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setVisibleCount(50);
                  }}
                  className="bg-transparent text-white placeholder-slate-500 focus:outline-none w-full text-xs"
                />
                {searchTerm && (
                  <button onClick={() => setSearchTerm('')} className="text-slate-500 hover:text-white">
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Position Filter */}
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-500 px-1.5 uppercase">Pos:</span>
                {['ALL', 'G', 'Z', 'L', 'V', 'M', 'A'].map(pos => (
                  <button
                    key={pos}
                    data-testid={`pos-${pos}`}
                    onClick={() => {
                      setPositionFilter(pos);
                      setVisibleCount(50);
                    }}
                    className={`px-2.5 py-1 rounded-lg font-bold transition text-xs ${
                      positionFilter === pos ? 'bg-emerald-500 text-white shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {pos === 'ALL' ? 'Todas' : pos}
                  </button>
                ))}
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                <button
                  data-testid="status-all"
                  onClick={() => { setStatusFilter('ALL'); setVisibleCount(50); }}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition text-xs ${statusFilter === 'ALL' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
                >
                  Todos
                </button>
                <button
                  data-testid="status-free"
                  onClick={() => { setStatusFilter('FREE'); setVisibleCount(50); }}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition text-xs ${statusFilter === 'FREE' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-slate-400'}`}
                >
                  Agentes Livres
                </button>
                <button
                  data-testid="status-clubs"
                  onClick={() => { setStatusFilter('CLUBS'); setVisibleCount(50); }}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition text-xs ${statusFilter === 'CLUBS' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
                >
                  Sob Contrato
                </button>
              </div>

              {/* Reset Filters Button */}
              {hasActiveFilters && (
                <button
                  data-testid="market-reset-filters"
                  onClick={handleResetFilters}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center gap-1 text-[11px] transition"
                  title="Limpar todos os filtros"
                >
                  <X size={13} />
                  <span>Limpar</span>
                </button>
              )}

            </div>

            {/* Bottom row: Country Pills + League Dropdown + Club Dropdown */}
            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-800/70">
              
              {/* Country Selection Pills */}
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 overflow-x-auto max-w-full">
                <span className="text-[10px] font-bold text-slate-500 px-1.5 uppercase flex items-center gap-1 shrink-0">
                  <Globe size={11} />
                  País:
                </span>
                <button
                  data-testid="country-all"
                  onClick={() => handleCountryChange('ALL')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition text-xs shrink-0 ${countryFilter === 'ALL' ? 'bg-emerald-500 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                >
                  Mundial
                </button>
                <button
                  data-testid="country-brasil"
                  onClick={() => handleCountryChange('Brasil')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition text-xs shrink-0 flex items-center gap-1 ${countryFilter === 'Brasil' ? 'bg-emerald-500 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                >
                  <span>🇧🇷</span> Brasil
                </button>
                <button
                  data-testid="country-inglaterra"
                  onClick={() => handleCountryChange('Inglaterra')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition text-xs shrink-0 flex items-center gap-1 ${countryFilter === 'Inglaterra' ? 'bg-emerald-500 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                >
                  <span>🏴󠁧󠁢󠁥󠁮󠁧󠁿</span> Inglaterra
                </button>
                <button
                  data-testid="country-espanha"
                  onClick={() => handleCountryChange('Espanha')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition text-xs shrink-0 flex items-center gap-1 ${countryFilter === 'Espanha' ? 'bg-emerald-500 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                >
                  <span>🇪🇸</span> Espanha
                </button>
                <button
                  data-testid="country-eua"
                  onClick={() => handleCountryChange('Estados Unidos')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition text-xs shrink-0 flex items-center gap-1 ${countryFilter === 'Estados Unidos' ? 'bg-emerald-500 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                >
                  <span>🇺🇸</span> EUA
                </button>
                <button
                  data-testid="country-mexico"
                  onClick={() => handleCountryChange('México')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition text-xs shrink-0 flex items-center gap-1 ${countryFilter === 'México' ? 'bg-emerald-500 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                >
                  <span>🇲🇽</span> México
                </button>
                <button
                  data-testid="country-arabia"
                  onClick={() => handleCountryChange('Arábia Saudita')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition text-xs shrink-0 flex items-center gap-1 ${countryFilter === 'Arábia Saudita' ? 'bg-emerald-500 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                >
                  <span>🇸🇦</span> Arábia
                </button>
                <button
                  data-testid="country-japao"
                  onClick={() => handleCountryChange('Japão')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition text-xs shrink-0 flex items-center gap-1 ${countryFilter === 'Japão' ? 'bg-emerald-500 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                >
                  <span>🇯🇵</span> Japão
                </button>
              </div>

              {/* League Selector Dropdown */}
              <div className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded-xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Liga:</span>
                <select
                  data-testid="market-league-select"
                  value={leagueFilter}
                  onChange={(e) => handleLeagueChange(e.target.value)}
                  className="bg-transparent text-white font-bold text-xs focus:outline-none cursor-pointer py-1"
                >
                  <option value="ALL" className="bg-slate-900 text-white">Todas as Ligas</option>
                  
                  <optgroup label="Brasil" className="bg-slate-950 text-emerald-400 font-bold">
                    <option value="brasileirao_serie_a" className="bg-slate-900 text-white">🇧🇷 Brasileirão Série A</option>
                    <option value="brasileirao_serie_b" className="bg-slate-900 text-white">🇧🇷 Brasileirão Série B</option>
                  </optgroup>

                  <optgroup label="Europa" className="bg-slate-950 text-purple-400 font-bold">
                    <option value="premier_league" className="bg-slate-900 text-white">🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League</option>
                    <option value="laliga" className="bg-slate-900 text-white">🇪🇸 LaLiga EA Sports</option>
                  </optgroup>

                  <optgroup label="Américas" className="bg-slate-950 text-amber-400 font-bold">
                    <option value="mls" className="bg-slate-900 text-white">🇺🇸 Major League Soccer (MLS)</option>
                    <option value="liga_mx" className="bg-slate-900 text-white">🇲🇽 Liga MX</option>
                    <option value="copa_libertadores" className="bg-slate-900 text-white">🌎 CONMEBOL Copa Libertadores</option>
                  </optgroup>

                  <optgroup label="Ásia & Oceania" className="bg-slate-950 text-sky-400 font-bold">
                    <option value="afc_champions_league" className="bg-slate-900 text-white">⭐ AFC Champions League Elite</option>
                    <option value="j_league" className="bg-slate-900 text-white">🇯🇵 J1 League</option>
                    <option value="chinese_super_league" className="bg-slate-900 text-white">🇨🇳 Chinese Super League</option>
                    <option value="indian_super_league" className="bg-slate-900 text-white">🇮🇳 Indian Super League</option>
                    <option value="k_league_2" className="bg-slate-900 text-white">🇰🇷 K League 2</option>
                    <option value="a_league" className="bg-slate-900 text-white">🇦🇺 A-League Men</option>
                  </optgroup>

                  <optgroup label="África" className="bg-slate-950 text-yellow-400 font-bold">
                    <option value="south_african_psl" className="bg-slate-900 text-white">🇿🇦 PSL África do Sul</option>
                  </optgroup>
                </select>
              </div>

              {/* Price Range Filter Dropdown */}
              <div className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded-xl border border-slate-800">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Preço:</span>
                <select
                  data-testid="market-price-select"
                  value={priceRangeFilter}
                  onChange={(e) => {
                    setPriceRangeFilter(e.target.value);
                    setVisibleCount(50);
                  }}
                  className="bg-transparent text-white font-bold text-xs focus:outline-none cursor-pointer py-1"
                >
                  <option value="ALL" className="bg-slate-900 text-white">Qualquer Valor</option>
                  <option value="under_5m" className="bg-slate-900 text-white">Até R$ 5 Milhões</option>
                  <option value="5m_20m" className="bg-slate-900 text-white">R$ 5M a R$ 20M</option>
                  <option value="20m_50m" className="bg-slate-900 text-white">R$ 20M a R$ 50M</option>
                  <option value="over_50m" className="bg-slate-900 text-white">Acima de R$ 50M</option>
                </select>
              </div>

              {/* Club Selector Dropdown */}
              <div className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded-xl border border-slate-800 flex-1 min-w-[200px]">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Clube:</span>
                <select
                  data-testid="market-club-select"
                  value={clubFilter}
                  onChange={(e) => {
                    setClubFilter(e.target.value);
                    setVisibleCount(50);
                  }}
                  className="bg-transparent text-white font-bold text-xs focus:outline-none cursor-pointer py-1 w-full"
                >
                  <option value="ALL" className="bg-slate-900 text-white">
                    Todos os Clubes ({filteredClubOptions.length})
                  </option>
                  {filteredClubOptions.map(c => (
                    <option key={c.id} value={c.id} className="bg-slate-900 text-white">
                      {c.name} ({c.shortName}) — {c.country}
                    </option>
                  ))}
                </select>
              </div>

            </div>

          </div>

          {/* Market List & Sales Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Available for Purchase (8 cols) */}
            <div className="lg:col-span-8 glass-panel p-5 border-slate-800">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3 text-sm font-bold text-slate-200">
                <div className="flex items-center gap-2">
                  <span>Atletas Disponíveis no Mercado Global</span>
                  <span className="text-xs bg-slate-800 text-emerald-400 font-mono px-2 py-0.5 rounded-full">
                    {filteredMarketPlayers.length}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-normal">
                  Exibindo {Math.min(visibleCount, filteredMarketPlayers.length)} atletas
                </span>
              </div>

              {/* Transfer Window Status Alert */}
              {!windowStatus.isOpen && (
                <div className="mb-3 p-3 bg-amber-950/40 border border-amber-500/40 rounded-xl text-xs flex items-center gap-2.5 text-amber-200">
                  <Clock size={16} className="text-amber-400 shrink-0" />
                  <span>
                    <b>Janela de Transferências Fechada</b> (Data atual: {formatGameDate(currentDate)}). Contratações entre clubes estão suspensas temporariamente pelas normas da federação. Apenas <b>agentes livres</b> podem assinar imediatamente. Próxima janela: <b>{windowStatus.nextWindow || 'Em breve'}</b>.
                  </span>
                </div>
              )}

              <div className="overflow-x-auto max-h-[550px] overflow-y-auto pr-1">
                <table className="w-full text-left text-xs whitespace-nowrap">
                  <thead className="bg-slate-900/90 text-slate-400 sticky top-0 z-10 backdrop-blur-sm">
                    <tr>
                      <th className="py-2.5 px-3">Pos</th>
                      <th className="py-2.5 px-3">Atleta</th>
                      <th className="py-2.5 px-3">País / Liga</th>
                      <th className="py-2.5 px-3">Clube Atual</th>
                      <th className="py-2.5 px-3 text-center">OVR</th>
                      <th className="py-2.5 px-3 text-center">Idade</th>
                      <th className="py-2.5 px-3 text-right">
                        <span className="inline-flex items-center gap-1 justify-end" title="Valor estimado pelo algoritmo do Footkeep">
                          <span>Valor Passe *</span>
                          <Sparkles size={11} className="text-emerald-400" />
                        </span>
                      </th>
                      <th className="py-2.5 px-3 text-right">
                        <span className="inline-flex items-center gap-1 justify-end" title="Salário mensal projetado pelo algoritmo do Footkeep">
                          <span>Salário Mensal *</span>
                          <Info size={11} className="text-slate-400" />
                        </span>
                      </th>
                      <th className="py-2.5 px-3 text-center">Contratar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredMarketPlayers.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="py-8 text-center text-slate-400">
                          Nenhum atleta encontrado com os filtros selecionados. Tente ajustar os parâmetros ou clique em "Limpar".
                        </td>
                      </tr>
                    ) : (
                      filteredMarketPlayers.slice(0, visibleCount).map(player => {
                        const club = globalClubs.find(c => c.id === player.clubId);
                        const isContracted = player.clubId !== null && player.contractStatus !== 'livre_mercado' && player.leagueId !== 'free_agent';
                        const isBlockedByWindow = isContracted && !windowStatus.isOpen;
                        const canAfford = budget >= player.value;
                        const isDisabled = !canAfford || isBlockedByWindow;

                        let buttonLabel = 'Contratar';
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
                            <td className="py-2.5 px-3">
                              {renderLeagueBadge(player, club)}
                            </td>
                            <td className="py-2.5 px-3 text-slate-400">
                              {club ? (
                                <div className="flex items-center gap-1.5">
                                  <ClubBadge club={club} size="xs" />
                                  <span>{club.shortName}</span>
                                </div>
                              ) : (
                                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                                  <Globe size={12} />
                                  Livre no Mercado
                                </span>
                              )}
                            </td>
                            <td className="py-2.5 px-3 text-center font-bold text-emerald-400 font-teko text-lg">
                              {Math.round(player.overall)}
                            </td>
                            <td className="py-2.5 px-3 text-center text-slate-400">{player.age}</td>
                            <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-200">
                              {formatCurrency(player.value)}
                            </td>
                            <td className="py-2.5 px-3 text-right font-mono text-[11px] text-slate-400">
                              {formatCurrency(player.salary)}/mês
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
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Load More Button */}
              {visibleCount < filteredMarketPlayers.length && (
                <div className="pt-3 text-center border-t border-slate-800/80 mt-2">
                  <button
                    onClick={() => setVisibleCount(prev => prev + 50)}
                    className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 font-bold border border-slate-800 transition"
                  >
                    Exibir mais 50 atletas ({visibleCount} de {filteredMarketPlayers.length})
                  </button>
                </div>
              )}

              {/* Table Footer Disclaimer Note */}
              <div className="pt-3 border-t border-slate-800/60 mt-3 text-[10px] text-slate-500 flex items-center justify-between">
                <span>
                  <b>* Legenda de Transparência:</b> Valores de passe e estimativas salariais projetados pelo modelo algorítmico do Footkeep para equilíbrio desportivo.
                </span>
                <span className="font-mono text-emerald-400/80">
                  {filteredMarketPlayers.length} atletas mapeados
                </span>
              </div>

            </div>

            {/* My Listed for Sale (4 cols) */}
            <div className="lg:col-span-4 glass-panel p-5 border-slate-800 flex flex-col">
              <div className="pb-3 border-b border-slate-800 mb-3 text-sm font-bold text-slate-200 flex items-center justify-between">
                <span>Seus Jogadores à Venda</span>
                <span className="text-xs bg-slate-800 text-rose-400 font-mono px-2 py-0.5 rounded-full">
                  {myListedPlayers.length}
                </span>
              </div>

              <div className="space-y-3 flex-1 overflow-y-auto max-h-[500px]">
                {myListedPlayers.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-xl">
                    Nenhum jogador listado para transferência no momento. Vá em "Elenco & Tática" e clique em "Vender".
                  </div>
                ) : (
                  myListedPlayers.map(p => (
                    <div key={p.id} className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className={`badge badge-pos-${p.position}`}>{p.position}</span>
                          <span className="font-bold text-slate-100 text-xs">{p.name}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono space-y-0.5">
                          <div>OVR: {Math.round(p.overall)} • Passe Est.*: <b>{formatCurrency(p.value)}</b></div>
                          <div className="text-[10px] text-emerald-400/80">Alívio Salarial Est.*: {formatCurrency(p.salary)}/mês</div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleSell(p)}
                        className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold transition shrink-0"
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
        /* CONTRACTUAL STATUS & SEASON 2025/26 VIEW */
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