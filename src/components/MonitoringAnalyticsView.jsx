import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  Search, 
  Filter, 
  Shield, 
  ShieldCheck,
  Trophy, 
  Users, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ArrowUpRight, 
  Sparkles, 
  ExternalLink, 
  X, 
  Eye, 
  Star, 
  Flame, 
  Award, 
  Check, 
  Info,
  SlidersHorizontal,
  LayoutGrid,
  List
} from 'lucide-react';
import { 
  COMPETITIONS_DATA, 
  PLAYER_STATS_2025_26, 
  AUDIT_METADATA, 
  getCompetitionById 
} from '../data/playerStats2025_26';
import { 
  ALL_COVERED_COMPETITIONS_2026, 
  POPULAR_COMPETITIONS_METADATA_2026 
} from '../data/allCoveredCompetitions2026';
import { playClick } from '../services/audioService';

export function MonitoringAnalyticsView({
  userClub,
  tactics,
  budget = 0,
  players = [],
  standings = [],
  allClubs = [],
  selectedCompetition = 'brasileirao_serie_a',
  currentRound = 1,
  leagueRounds = []
}) {
  // Navigation & Primary Filter State
  const [selectedCompetitionId, setSelectedCompetitionId] = useState(selectedCompetition || 'brasileirao_serie_a');
  const [activeTab, setActiveTab] = useState('standings'); // 'standings' | 'clubs' | 'scouting'
  const [selectedSeason, setSelectedSeason] = useState('2025/26');
  
  // Scouting Secondary Filters
  const [selectedClubFilter, setSelectedClubFilter] = useState('all');
  const [selectedPosFilter, setSelectedPosFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'table'

  // Scouting Modal State
  const [selectedPlayerForScouting, setSelectedPlayerForScouting] = useState(null);
  const [evaluationFeedback, setEvaluationFeedback] = useState(null);

  // Covered Competitions Catalog State
  const [catalogContinentFilter, setCatalogContinentFilter] = useState('Todos');
  const [catalogSearch, setCatalogSearch] = useState('');

  const filteredCatalog = useMemo(() => {
    return ALL_COVERED_COMPETITIONS_2026.filter(comp => {
      if (catalogContinentFilter !== 'Todos' && comp.continent !== catalogContinentFilter) {
        return false;
      }
      if (catalogSearch.trim()) {
        const q = catalogSearch.toLowerCase();
        const matchesName = comp.name.toLowerCase().includes(q);
        const matchesCountry = comp.country.toLowerCase().includes(q);
        const matchesClub = comp.prominentClubs?.some(club => club.toLowerCase().includes(q));
        if (!matchesName && !matchesCountry && !matchesClub) return false;
      }
      return true;
    });
  }, [catalogContinentFilter, catalogSearch]);

  // Read game difficulty setting from localStorage ('footkeep_settings_v1')
  const scoutingDifficulty = useMemo(() => {
    try {
      const raw = localStorage.getItem('footkeep_settings_v1');
      if (!raw) return 'normal';
      const parsed = JSON.parse(raw);
      return parsed.difficulty || 'normal';
    } catch {
      return 'normal';
    }
  }, []);

  // Active competition object
  const activeCompetition = useMemo(() => {
    return getCompetitionById(selectedCompetitionId);
  }, [selectedCompetitionId]);

  // Clubs of active competition for dropdown
  const competitionClubs = useMemo(() => {
    return activeCompetition?.clubs || [];
  }, [activeCompetition]);

  // Filtered Players list
  const filteredPlayers = useMemo(() => {
    return PLAYER_STATS_2025_26.filter(p => {
      // League filter
      if (p.competitionId !== selectedCompetitionId) return false;
      // Club filter
      if (selectedClubFilter !== 'all' && p.clubId !== selectedClubFilter) return false;
      // Position filter
      if (selectedPosFilter !== 'all' && p.position !== selectedPosFilter) return false;
      // Search filter (name or club name)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesClub = p.clubName.toLowerCase().includes(query);
        if (!matchesName && !matchesClub) return false;
      }
      return true;
    });
  }, [selectedCompetitionId, selectedClubFilter, selectedPosFilter, searchQuery]);

  // Format currency
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  // Tactical evaluation logic for user's club without mutating any career data
  const handleEvaluatePlayer = (player) => {
    playClick();
    
    // Find players of same position in user's club
    const userSquadSamePos = players.filter(p => p.clubId === userClub?.id && p.position === player.position);
    const avgUserPosRating = userSquadSamePos.length > 0 
      ? Math.round(userSquadSamePos.reduce((acc, p) => acc + (p.ovr || 75), 0) / userSquadSamePos.length)
      : 76;
    
    const ratingDiff = player.ovr - avgUserPosRating;
    const isUpgrade = ratingDiff > 0;
    const fitFormation = tactics?.formation || '4-4-2';

    let verdict = '';
    let fitLevel = 'Alto';

    if (isUpgrade) {
      verdict = `Reforço de impacto imediato (+${ratingDiff} OVR em relação à média da sua posição). Encaixa com destaque no esquema ${fitFormation} do ${userClub?.name}.`;
      fitLevel = 'Excelente (Titular Absoluto)';
    } else if (ratingDiff === 0) {
      verdict = `Nível técnico equivalente aos titulares do seu elenco. Agrega profundidade e rotação tática no ${fitFormation}.`;
      fitLevel = 'Bom (Disputa de Posição)';
    } else {
      verdict = `Opção de composição de grupo. OVR ligeiramente abaixo da média dos seus titulares (${avgUserPosRating}), recomendado para rotação.`;
      fitLevel = 'Composição de Elenco';
    }

    setEvaluationFeedback({
      isUpgrade,
      diff: ratingDiff,
      verdict,
      fitLevel,
      userClubName: userClub?.name || 'Seu Clube',
      userBudget: budget,
      playerCostEstimated: player.marketValueEur,
      tacticsFormation: fitFormation
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12 max-w-7xl mx-auto">
      
      {/* Header com Transparência e Metadados */}
      <div className="glass-panel p-6 border-slate-800 shadow-2xl relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950/30">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <BarChart3 size={22} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-black text-white">Central de Monitoramento & Análise</h1>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    Footkeep Analytics v2.6
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Banco de inteligência estatística oficial, tabelas de classificação e scouting avançado multicompetições.
                </p>
              </div>
            </div>
          </div>

          {/* Badge de Transparência e Dificuldade */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl text-xs flex items-center gap-2 shadow-inner">
              <CheckCircle2 size={14} className="text-emerald-400" />
              <div className="text-[11px]">
                <span className="text-slate-400 block text-[9px] uppercase font-bold">Status dos Dados:</span>
                <span className="text-emerald-400 font-bold">Auditado & Confirmado</span>
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl text-xs flex items-center gap-2 shadow-inner">
              <Clock size={14} className="text-sky-400" />
              <div className="text-[11px]">
                <span className="text-slate-400 block text-[9px] uppercase font-bold">Data de Auditoria:</span>
                <span className="text-slate-200 font-mono font-semibold">{AUDIT_METADATA.auditDate}</span>
              </div>
            </div>

            {scoutingDifficulty === 'hard' && (
              <div className="bg-amber-950/40 border border-amber-500/40 px-3 py-1.5 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle size={14} className="text-amber-400" />
                <span className="text-amber-300 font-bold text-[11px]">Scouting Rigoroso (Hard)</span>
              </div>
            )}
          </div>
        </div>

        {/* Aviso de Governança / Não Fictício */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
          <span className="flex items-center gap-1.5">
            <Info size={13} className="text-emerald-400" />
            <span>Fonte Primária: <strong>{activeCompetition.source}</strong> ({activeCompetition.season})</span>
          </span>
          <span className="text-slate-500 text-[10px]">
            Protocolo de Governança: Dados 100% catalogados de fontes institucionais oficiais.
          </span>
        </div>
      </div>

      {/* Seletor de Competições (5 Ligas Catalogadas) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {COMPETITIONS_DATA.map(comp => {
          const isSelected = selectedCompetitionId === comp.id;

          return (
            <button
              key={comp.id}
              onClick={() => {
                playClick();
                setSelectedCompetitionId(comp.id);
                setSelectedClubFilter('all');
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap border ${
                isSelected
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/25 font-black'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border-slate-800'
              }`}
            >
              <span className="text-base">{comp.badgeEmoji}</span>
              <span>{comp.name}</span>
              <span className={`text-[9px] px-1.5 py-0.2 rounded-full uppercase font-black ${
                isSelected ? 'bg-slate-950/30 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {comp.season}
              </span>
            </button>
          );
        })}
      </div>

      {/* Abas Internas da Competição */}
      <div className="bg-slate-950/70 p-1.5 rounded-2xl border border-slate-800 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <button
            onClick={() => { playClick(); setActiveTab('standings'); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'standings'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Trophy size={14} />
            <span>Classificação & Tabela</span>
          </button>

          <button
            onClick={() => { playClick(); setActiveTab('clubs'); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'clubs'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Shield size={14} />
            <span>Clubes & Desempenho ({competitionClubs.length})</span>
          </button>

          <button
            onClick={() => { playClick(); setActiveTab('scouting'); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'scouting'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Users size={14} />
            <span>Scouting & Estatísticas de Jogadores ({filteredPlayers.length})</span>
          </button>

          <button
            onClick={() => { playClick(); setActiveTab('catalog'); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'catalog'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Sparkles size={14} />
            <span>Escopo Coberto ({ALL_COVERED_COMPETITIONS_2026.length} Competições)</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 pr-2 text-xs text-slate-400 font-mono">
          <Calendar size={13} className="text-emerald-400" />
          <span>Temporada Oficial: {selectedSeason}</span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* ABA 1: CLASSIFICAÇÃO E TABELA */}
      {/* ======================================================== */}
      {activeTab === 'standings' && (
        <div className="glass-panel p-6 border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Trophy size={18} className="text-yellow-400" />
                Tabela de Classificação — {activeCompetition.name}
              </h3>
              <span className="text-xs text-slate-400">
                Simulação Oficial Footkeep • Inicia na 1ª rodada com zero pontos e zero partidas
              </span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Classificação Simulada da Carreira</span>
            </div>
          </div>

          <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl text-xs flex items-center gap-2 text-emerald-300">
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
            <span>
              <b>Simulação Própria do Footkeep:</b> Nenhuma pontuação de futebol real é importada para a carreira. Todas as agremiações iniciam a temporada zeradas e a pontuação avança estritamente com os resultados simulados.
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3 w-12 text-center">Pos</th>
                  <th className="py-3 px-3">Clube</th>
                  <th className="py-3 px-2 text-center">J</th>
                  <th className="py-3 px-2 text-center">V</th>
                  <th className="py-3 px-2 text-center">E</th>
                  <th className="py-3 px-2 text-center">D</th>
                  <th className="py-3 px-2 text-center">GP</th>
                  <th className="py-3 px-2 text-center">GC</th>
                  <th className="py-3 px-2 text-center">SG</th>
                  <th className="py-3 px-3 text-center text-emerald-400">PTS</th>
                  <th className="py-3 px-3 text-center hidden md:table-cell">Últimos 5 Jogos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {(() => {
                  const rows = (selectedCompetitionId === selectedCompetition && standings && standings.length > 0)
                    ? standings.map((s, idx) => ({
                        pos: idx + 1,
                        clubId: s.clubId,
                        clubName: s.name,
                        played: s.played || 0,
                        won: s.won || 0,
                        drawn: s.drawn || 0,
                        lost: s.lost || 0,
                        gf: s.goalsFor || 0,
                        ga: s.goalsAgainst || 0,
                        gd: s.goalDifference || 0,
                        pts: s.points || 0,
                        form: s.form || []
                      }))
                    : (activeCompetition?.standings || []).map((s, idx) => ({
                        ...s,
                        pos: idx + 1,
                        played: s.played || 0,
                        won: s.won || 0,
                        drawn: s.drawn || 0,
                        lost: s.lost || 0,
                        gf: s.gf || s.goalsFor || 0,
                        ga: s.ga || s.goalsAgainst || 0,
                        gd: s.gd || s.goalDifference || 0,
                        pts: s.pts || s.points || 0,
                        form: s.form || []
                      }));

                  return rows.map((team, idx) => {
                    const isTop4 = idx < 4;
                    const isUserCurrentClub = team.clubId === userClub?.id;

                    return (
                      <tr 
                        key={team.clubId || idx}
                        className={`hover:bg-slate-800/40 transition ${
                          isUserCurrentClub ? 'bg-emerald-950/30 border-l-4 border-l-emerald-500 font-semibold' : ''
                        }`}
                      >
                        <td className="py-3 px-3 text-center font-mono font-bold">
                          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-md ${
                            idx === 0 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40' :
                            isTop4 ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400'
                          }`}>
                            {team.pos}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">{team.clubName}</span>
                            {isUserCurrentClub && (
                              <span className="text-[9px] uppercase font-bold bg-emerald-500/30 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-500/40">
                                Seu Time
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-2 text-center text-slate-300 font-mono">{team.played}</td>
                        <td className="py-3 px-2 text-center text-emerald-400 font-mono font-bold">{team.won}</td>
                        <td className="py-3 px-2 text-center text-slate-400 font-mono">{team.drawn}</td>
                        <td className="py-3 px-2 text-center text-rose-400 font-mono">{team.lost}</td>
                        <td className="py-3 px-2 text-center text-slate-300 font-mono">{team.gf}</td>
                        <td className="py-3 px-2 text-center text-slate-400 font-mono">{team.ga}</td>
                        <td className={`py-3 px-2 text-center font-mono font-bold ${team.gd > 0 ? 'text-emerald-400' : team.gd < 0 ? 'text-rose-400' : 'text-slate-400'}`}>
                          {team.gd > 0 ? `+${team.gd}` : team.gd}
                        </td>
                        <td className="py-3 px-3 text-center font-mono font-black text-sm text-emerald-400 bg-emerald-950/20">
                          {team.pts}
                        </td>
                        <td className="py-3 px-3 text-center hidden md:table-cell">
                          <div className="flex items-center justify-center gap-1">
                            {team.form && team.form.length > 0 ? (
                              team.form.map((result, rIdx) => (
                                <span 
                                  key={rIdx}
                                  className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-black uppercase ${
                                    result === 'V' ? 'bg-emerald-500 text-slate-950' :
                                    result === 'E' ? 'bg-amber-500 text-slate-950' : 'bg-rose-500 text-white'
                                  }`}
                                >
                                  {result}
                                </span>
                              ))
                            ) : (
                              <span className="text-slate-600 font-mono text-[10px]">—</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  });
                })()}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ABA 2: CLUBES & DESEMPENHO */}
      {/* ======================================================== */}
      {activeTab === 'clubs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-200">
              Perfil Técnico dos Clubes Participantes ({activeCompetition.name})
            </h3>
            <span className="text-xs text-slate-400">
              Métricas de Força: Escala 0 a 100
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {competitionClubs.map(club => {
              const isUserClub = club.id === userClub?.id;

              return (
                <div 
                  key={club.id}
                  className={`glass-panel p-5 rounded-2xl border transition hover:border-slate-700 space-y-4 ${
                    isUserClub ? 'border-emerald-500/60 bg-emerald-950/20 shadow-lg shadow-emerald-950/30' : 'border-slate-800 bg-slate-950/60'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{club.badgeEmoji}</span>
                      <div>
                        <h4 className="text-base font-black text-white flex items-center gap-1.5">
                          {club.name}
                          {isUserClub && (
                            <span className="text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.2 rounded font-bold">
                              Seu Clube
                            </span>
                          )}
                        </h4>
                        <span className="text-xs text-slate-400 block font-mono">
                          {club.shortName} • Reputação {club.reputation}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Geral</span>
                      <span className="text-lg font-black text-emerald-400 font-mono">{club.ovr}</span>
                    </div>
                  </div>

                  {/* Barras de Ataque e Defesa */}
                  <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-slate-400 font-semibold">Força Ofensiva (ATT)</span>
                        <span className="font-bold text-emerald-300 font-mono">{club.att}</span>
                      </div>
                      <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${club.att}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-slate-400 font-semibold">Solidez Defensiva (DEF)</span>
                        <span className="font-bold text-sky-300 font-mono">{club.def}</span>
                      </div>
                      <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-sky-500 h-full rounded-full" style={{ width: `${club.def}%` }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Estádio & Capacidade */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Estádio: <strong className="text-slate-200">{club.stadium}</strong></span>
                    <span className="font-mono">{club.stadiumCapacity?.toLocaleString('pt-BR')} lug.</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ABA 3: SCOUTING E ESTATÍSTICAS DE JOGADORES */}
      {/* ======================================================== */}
      {activeTab === 'scouting' && (
        <div className="space-y-5">
          
          {/* Barra de Filtros Dinâmicos */}
          <div className="glass-panel p-4 border-slate-800 bg-slate-950/80 rounded-2xl space-y-3">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              
              {/* Campo de Busca */}
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Pesquisar por nome do jogador ou clube..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
                />
              </div>

              {/* Filtro de Clube */}
              <select
                value={selectedClubFilter}
                onChange={(e) => setSelectedClubFilter(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="all">Todos os Clubes ({competitionClubs.length})</option>
                {competitionClubs.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>

              {/* Alternar Visualização Cards / Tabela */}
              <div className="flex items-center bg-slate-900 rounded-xl p-1 border border-slate-700">
                <button
                  onClick={() => { playClick(); setViewMode('cards'); }}
                  className={`p-1.5 rounded-lg transition ${viewMode === 'cards' ? 'bg-slate-800 text-emerald-400' : 'text-slate-400'}`}
                  title="Visualização em Cards"
                >
                  <LayoutGrid size={15} />
                </button>
                <button
                  onClick={() => { playClick(); setViewMode('table'); }}
                  className={`p-1.5 rounded-lg transition ${viewMode === 'table' ? 'bg-slate-800 text-emerald-400' : 'text-slate-400'}`}
                  title="Visualização em Tabela"
                >
                  <List size={15} />
                </button>
              </div>

            </div>

            {/* Pílulas de Filtro por Posição */}
            <div className="flex items-center gap-1.5 pt-2 border-t border-slate-800/80 overflow-x-auto scrollbar-none text-xs">
              <span className="text-[11px] font-bold text-slate-400 mr-2 flex items-center gap-1">
                <Filter size={12} />
                Posição:
              </span>
              {[
                { id: 'all', label: 'Todas' },
                { id: 'G', label: 'Goleiros (G)' },
                { id: 'Z', label: 'Zagueiros (Z)' },
                { id: 'L', label: 'Laterais (L)' },
                { id: 'V', label: 'Volantes (V)' },
                { id: 'M', label: 'Meias (M)' },
                { id: 'A', label: 'Atacantes (A)' }
              ].map(pos => (
                <button
                  key={pos.id}
                  onClick={() => { playClick(); setSelectedPosFilter(pos.id); }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                    selectedPosFilter === pos.id
                      ? 'bg-emerald-500 text-slate-950 font-black'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {pos.label}
                </button>
              ))}
            </div>
          </div>

          {/* Estado Vazio de Resultados */}
          {filteredPlayers.length === 0 && (
            <div className="glass-panel p-12 text-center text-slate-400 space-y-3">
              <Search size={32} className="mx-auto text-slate-600" />
              <h4 className="text-sm font-bold text-white">Nenhum jogador encontrado com os filtros aplicados</h4>
              <p className="text-xs text-slate-400">
                Tente limpar a busca de texto ou redefinir o clube e posição selecionados.
              </p>
            </div>
          )}

          {/* VISUALIZAÇÃO 1: CARDS DETALHADOS DE SCOUTING */}
          {viewMode === 'cards' && filteredPlayers.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPlayers.map(player => {
                return (
                  <div
                    key={player.id}
                    onClick={() => {
                      playClick();
                      setSelectedPlayerForScouting(player);
                      setEvaluationFeedback(null);
                    }}
                    className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/60 cursor-pointer transition-all duration-200 group bg-slate-950/60 hover:bg-slate-900/80 shadow-lg space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                            player.position === 'A' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                            player.position === 'M' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                            player.position === 'G' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                            'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                          }`}>
                            {player.position}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">{player.nationality} • {player.age} anos</span>
                        </div>
                        <h4 className="text-base font-black text-white group-hover:text-emerald-300 transition-colors mt-1">
                          {player.name}
                        </h4>
                        <span className="text-xs text-slate-400 font-semibold">{player.clubName}</span>
                      </div>

                      <div className="text-right">
                        <span className="text-xl font-black text-emerald-400 font-mono">{player.ovr}</span>
                        <span className="text-[9px] uppercase font-bold text-slate-500 block">OVR</span>
                      </div>
                    </div>

                    {/* Estatísticas Chave na Temporada */}
                    <div className="grid grid-cols-4 gap-1.5 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
                      <div>
                        <span className="text-[9px] text-slate-400 uppercase block">Jogos</span>
                        <strong className="text-xs font-mono text-white">{player.stats.matches}</strong>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 uppercase block">Gols</span>
                        <strong className="text-xs font-mono text-emerald-400">{player.stats.goals}</strong>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 uppercase block">Assist.</span>
                        <strong className="text-xs font-mono text-sky-400">{player.stats.assists}</strong>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 uppercase block">Nota</span>
                        <strong className="text-xs font-mono text-yellow-400">{player.stats.averageRating}</strong>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {player.tacticalProfile}
                    </p>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                      <span className="text-emerald-400 font-bold font-mono">{player.marketValueEur}</span>
                      <span className="text-slate-400 group-hover:text-emerald-400 transition-colors flex items-center gap-1 font-semibold text-[11px]">
                        Ver Relatório <ArrowUpRight size={13} />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* VISUALIZAÇÃO 2: TABELA DE ESTATÍSTICAS */}
          {viewMode === 'table' && filteredPlayers.length > 0 && (
            <div className="glass-panel p-5 border-slate-800 overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-3">Jogador</th>
                    <th className="py-3 px-2">Clube</th>
                    <th className="py-3 px-2 text-center">Pos</th>
                    <th className="py-3 px-2 text-center">Idade</th>
                    <th className="py-3 px-2 text-center">OVR</th>
                    <th className="py-3 px-2 text-center">Jogos</th>
                    <th className="py-3 px-2 text-center">Minutos</th>
                    <th className="py-3 px-2 text-center text-emerald-400">Gols</th>
                    <th className="py-3 px-2 text-center text-sky-400">Assist.</th>
                    <th className="py-3 px-2 text-center">Cartões (A/V)</th>
                    <th className="py-3 px-2 text-center text-yellow-400">Nota Média</th>
                    <th className="py-3 px-3 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredPlayers.map(player => (
                    <tr 
                      key={player.id}
                      className="hover:bg-slate-800/40 transition cursor-pointer"
                      onClick={() => {
                        playClick();
                        setSelectedPlayerForScouting(player);
                        setEvaluationFeedback(null);
                      }}
                    >
                      <td className="py-3 px-3 font-bold text-white flex items-center gap-2">
                        <span>{player.name}</span>
                      </td>
                      <td className="py-3 px-2 text-slate-300">{player.clubName}</td>
                      <td className="py-3 px-2 text-center font-bold text-slate-400">{player.position}</td>
                      <td className="py-3 px-2 text-center font-mono text-slate-400">{player.age}</td>
                      <td className="py-3 px-2 text-center font-mono font-black text-emerald-400">{player.ovr}</td>
                      <td className="py-3 px-2 text-center font-mono text-slate-200">{player.stats.matches}</td>
                      <td className="py-3 px-2 text-center font-mono text-slate-400">{player.stats.minutes}'</td>
                      <td className="py-3 px-2 text-center font-mono font-bold text-emerald-400">{player.stats.goals}</td>
                      <td className="py-3 px-2 text-center font-mono font-bold text-sky-400">{player.stats.assists}</td>
                      <td className="py-3 px-2 text-center font-mono text-slate-400">
                        {player.stats.yellowCards} / {player.stats.redCards}
                      </td>
                      <td className="py-3 px-2 text-center font-mono font-black text-yellow-400">
                        {player.stats.averageRating}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
                          Scouting
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL DE RELATÓRIO DE SCOUTING & AVALIAÇÃO DE CONTRATAÇÃO */}
      {/* ======================================================== */}
      {selectedPlayerForScouting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="glass-panel w-full max-w-2xl bg-slate-900 border border-slate-800 shadow-2xl rounded-3xl p-6 relative max-h-[92vh] overflow-y-auto space-y-5">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-lg font-black font-mono">
                  {selectedPlayerForScouting.ovr}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-white">{selectedPlayerForScouting.name}</h3>
                    <span className="text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                      {selectedPlayerForScouting.position}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    {selectedPlayerForScouting.clubName} • {selectedPlayerForScouting.nationality} • {selectedPlayerForScouting.age} anos
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedPlayerForScouting(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
                title="Fechar"
              >
                <X size={19} />
              </button>
            </div>

            {/* Ficha Estatística Completa */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-300 block uppercase tracking-wider">
                Estatísticas Consolidadas ({selectedSeason})
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Jogos Oficiais</span>
                  <strong className="text-sm text-white font-mono">{selectedPlayerForScouting.stats.matches}</strong>
                </div>
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Minutos em Campo</span>
                  <strong className="text-sm text-white font-mono">{selectedPlayerForScouting.stats.minutes}'</strong>
                </div>
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Gols Marcados</span>
                  <strong className="text-sm text-emerald-400 font-mono">{selectedPlayerForScouting.stats.goals}</strong>
                </div>
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Assistências</span>
                  <strong className="text-sm text-sky-400 font-mono">{selectedPlayerForScouting.stats.assists}</strong>
                </div>
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Nota Média</span>
                  <strong className="text-sm text-yellow-400 font-mono">{selectedPlayerForScouting.stats.averageRating}</strong>
                </div>
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Precisão de Passes</span>
                  <strong className="text-sm text-slate-200 font-mono">{selectedPlayerForScouting.stats.passAccuracy}</strong>
                </div>
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Finalizações no Alvo</span>
                  <strong className="text-sm text-slate-200 font-mono">{selectedPlayerForScouting.stats.shotsOnTarget || '-'}</strong>
                </div>
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Contrato Vigente</span>
                  <strong className="text-xs text-amber-300 font-mono">{selectedPlayerForScouting.contractExpiry}</strong>
                </div>
              </div>
            </div>

            {/* Parecer Técnico do Olheiro */}
            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-1.5">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Star size={14} className="text-emerald-400" />
                Parecer do Departamento de Inteligência
              </span>
              <p className="text-xs text-slate-400 leading-relaxed">
                {selectedPlayerForScouting.tacticalProfile}
              </p>
              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500">
                <span>Valor de Mercado Referencial: <strong className="text-emerald-400 font-mono">{selectedPlayerForScouting.marketValueEur}</strong></span>
                <span>Índice de Recomendação: <strong className="text-white font-mono">{selectedPlayerForScouting.recommendationScore}/100</strong></span>
              </div>
            </div>

            {/* SEÇÃO: AVALIAR PARA CONTRATAÇÃO (INTEGRAÇÃO COM A CARREIRA ATIVA) */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 border border-emerald-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black text-white flex items-center gap-1.5">
                    <Sparkles size={16} className="text-emerald-400" />
                    Simular Avaliação Tática para o seu Clube
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    Clube Ativo: <strong>{userClub?.name}</strong> • Tática: <strong>{tactics?.formation || '4-4-2'}</strong>
                  </span>
                </div>
                <button
                  onClick={() => handleEvaluatePlayer(selectedPlayerForScouting)}
                  className="py-2 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 transition flex items-center gap-1.5"
                >
                  <Eye size={14} />
                  <span>Avaliar para Contratação</span>
                </button>
              </div>

              {/* Resultado da Avaliação Técnica */}
              {evaluationFeedback && (
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/50 space-y-2 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">Veredito do Scouting:</span>
                    <span className={`font-bold px-2 py-0.5 rounded text-[10px] uppercase ${
                      evaluationFeedback.isUpgrade ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {evaluationFeedback.fitLevel}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {evaluationFeedback.verdict}
                  </p>
                  <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800 flex items-center justify-between">
                    <span>Impacto Financeiro: Saldo atual {formatCurrency(evaluationFeedback.userBudget)}</span>
                    <span className="text-emerald-400 font-semibold">Simulação de Scouting (Sem custos aplicados)</span>
                  </div>
                </div>
              )}
            </div>

            {/* Aviso de Respeito aos Dados da Carreira */}
            <div className="text-center text-[10px] text-slate-500 flex items-center justify-center gap-1.5">
              <CheckCircle2 size={13} className="text-emerald-500" />
              <span>Esta consulta é estritamente de observação técnica e não altera a escalação ou os dados da sua carreira.</span>
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ABA 4: ESCOPO DE COMPETIÇÕES COBERTAS (45)              */}
      {/* ======================================================== */}
      {activeTab === 'catalog' && (
        <div className="glass-panel p-6 border-slate-800 shadow-xl space-y-6 animate-fadeIn">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles size={20} className="text-emerald-400" />
                <h3 className="text-base font-bold text-white">
                  Escopo Coberto de Competições — Temporada 2025/2026
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                  {filteredCatalog.length} de {ALL_COVERED_COMPETITIONS_2026.length} competições
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-3xl">
                Relação canônica de todas as ligas e copas populares selecionadas, organizadas por continente e país. Dados cadastrais auditados para 2026, com início de carreira estritamente zerado na simulação.
              </p>
            </div>

            {/* Busca Rápida no Catálogo */}
            <div className="relative min-w-[240px]">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={catalogSearch}
                onChange={(e) => setCatalogSearch(e.target.value)}
                placeholder="Buscar por competição, país ou clube..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              {catalogSearch && (
                <button onClick={() => setCatalogSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                  <X size={13} />
                </button>
              )}
            </div>
          </div>

          {/* Filtros por Continente */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider pr-1">Continente:</span>
            {['Todos', 'Europa', 'Américas', 'Ásia & Oceania', 'África', 'Global'].map(cont => {
              const count = cont === 'Todos' 
                ? ALL_COVERED_COMPETITIONS_2026.length 
                : ALL_COVERED_COMPETITIONS_2026.filter(c => c.continent === cont).length;
              const isActive = catalogContinentFilter === cont;
              return (
                <button
                  key={cont}
                  onClick={() => { playClick(); setCatalogContinentFilter(cont); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 font-black shadow'
                      : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <span>{cont}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-slate-950/30 text-white' : 'bg-slate-800 text-slate-500'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Grid de Competições Cobertas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCatalog.map(comp => (
              <div 
                key={comp.id}
                className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-4 hover:border-emerald-500/40 transition space-y-3 shadow-md"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{comp.countryFlag}</span>
                    <div>
                      <h4 className="text-sm font-bold text-white leading-tight">{comp.name}</h4>
                      <span className="text-[11px] text-slate-400 block">{comp.country} • {comp.continent}</span>
                    </div>
                  </div>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider shrink-0 ${
                    comp.type === 'league' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                    comp.type === 'continental_cup' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                    comp.type === 'international' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                    'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {comp.type === 'league' ? 'Liga' : comp.type === 'continental_cup' ? 'Continental' : comp.type === 'international' ? 'Seleções' : 'Copa'}
                  </span>
                </div>

                <div className="text-[11px] text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60 leading-relaxed">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold mb-0.5">Formato & Clubes:</span>
                  <span>{comp.format}</span>
                  {comp.teamsCount && <span className="text-slate-400 font-semibold block mt-0.5">({comp.teamsCount} participantes)</span>}
                </div>

                {comp.prominentClubs && comp.prominentClubs.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Clubes de Referência:</span>
                    <div className="flex flex-wrap gap-1">
                      {comp.prominentClubs.slice(0, 6).map((club, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700/50">
                          {typeof club === 'string' ? club : club.name}
                        </span>
                      ))}
                      {comp.prominentClubs.length > 6 && (
                        <span className="text-[10px] text-slate-500 py-0.5">+{comp.prominentClubs.length - 6}</span>
                      )}
                    </div>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Fonte: <strong className="text-slate-300">{comp.source}</strong></span>
                  <span className="text-emerald-400 font-semibold">Auditado ({comp.auditDate})</span>
                </div>
              </div>
            ))}
          </div>

          {filteredCatalog.length === 0 && (
            <div className="text-center py-12 text-slate-500 text-xs">
              Nenhuma competição encontrada para os filtros selecionados.
            </div>
          )}
        </div>
      )}

      {/* Aviso Institucional de Independência e Direitos de Propriedade Intelectual */}
      <div className="glass-panel p-5 border-slate-800/80 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-xs text-slate-400 space-y-2 mt-8">
        <div className="flex items-center gap-2 text-white font-bold">
          <ShieldCheck size={18} className="text-emerald-400" />
          <span className="text-sm">Aviso Legal de Independência & Direitos de Propriedade Intelectual</span>
        </div>
        <p className="text-[11px] leading-relaxed text-slate-400">
          O <strong>Footkeep</strong> é um jogo eletrônico de simulação e gestão desportiva autônomo e independente. Os nomes oficiais de atletas, clubes, estádios e competições (incluindo Campeonato Brasileiro — Série A, Série B, Copa do Brasil, Premier League e LaLiga) são utilizados exclusivamente com finalidade descritiva, referencial e informativa factual do ecossistema do futebol.
        </p>
        <p className="text-[11px] leading-relaxed text-slate-400">
          Todas as marcas nominativas, escudos, emblemas e logotipos pertencem integralmente aos seus respectivos titulares, agremiações e federações desportivas (CBF, The FA, RFEF e correlatas). Os valores de mercado e salários atribuídos aos atletas no jogo constituem modelagens e estimativas algorítmicas exclusivas do Footkeep (<code>isEstimate: true</code>) calibradas para equilíbrio de jogabilidade.
        </p>
      </div>

    </div>
  );
}
