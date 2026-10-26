import React from 'react';
import { 
  Trophy, 
  Users, 
  PlayCircle, 
  Table, 
  Award, 
  ArrowLeftRight, 
  DollarSign, 
  Save, 
  Shield,
  Calendar,
  PlusCircle,
  UserCheck,
  Settings,
  Mail,
  CloudCheck,
  BarChart3,
  Clock
} from 'lucide-react';
import { ClubBadge } from './ClubBadge';
import { FootkeepLogo } from './FootkeepLogo';
import { formatGameDate, isPreSeason, getTransferWindowStatus } from '../engine/calendarEngine';
import { getCompetitionMetadata } from '../data/competitionsHub';

export function Navbar({ 
  currentTab, 
  setCurrentTab, 
  userClub, 
  currentRound, 
  totalRounds = 38,
  budget, 
  managerProfile,
  activeEmail,
  currentDate = '2026-01-15',
  selectedCompetition = 'brasileirao_serie_a',
  onOpenSaveModal,
  onOpenCareerModal,
  onQuickSave
}) {
  const compMeta = getCompetitionMetadata(selectedCompetition);
  const leagueTabLabel = compMeta?.shortName || compMeta?.name || 'Liga Nacional';
  const preSeason = isPreSeason(currentDate, selectedCompetition);
  const windowStatus = getTransferWindowStatus(currentDate, selectedCompetition);

  const tabs = [
    { id: 'dashboard', label: 'Visão Geral', icon: Shield },
    { id: 'tactics', label: 'Elenco & Tática', icon: Users },
    { id: 'match', label: 'Jogar Partida', icon: PlayCircle, highlight: true },
    { id: 'league', label: leagueTabLabel, icon: Table },
    { id: 'cup', label: selectedCompetition?.includes('brasileirao') ? 'Copa do Brasil' : 'Copas', icon: Award },
    { id: 'monitoring', label: 'Monitoramento & Análise', icon: BarChart3, highlightBadge: '2025/26' },
    { id: 'transfers', label: 'Transferências', icon: ArrowLeftRight },
    { id: 'finances', label: 'Finanças', icon: DollarSign },
    { id: 'settings', label: 'Configurações', icon: Settings }
  ];

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-emerald-900/40 shadow-2xl">
      {/* Top Bar: Brand, Club Info & Season Metrics */}
      <div className="border-b border-slate-900 bg-slate-950/80">
        <div className="container-app py-2 flex flex-wrap items-center justify-between gap-3">
          
          {/* Logo */}
          <div 
            className="cursor-pointer select-none" 
            onClick={() => setCurrentTab('dashboard')}
          >
            <FootkeepLogo size="md" variant="horizontal" subtitleText="GESTOR DE FUTEBOL" />
          </div>

          {/* User Club Active Widget */}
          {userClub && (
            <div className="flex items-center gap-3.5 bg-slate-900/90 px-3.5 py-1.5 rounded-xl border border-slate-800 shadow-inner">
              <div className="flex items-center gap-2.5">
                <ClubBadge club={userClub} size="sm" />
                <div>
                  <span className="text-xs font-bold text-white block leading-tight">{userClub.name}</span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                    {managerProfile?.coachName ? (
                      <span className="text-amber-300 font-medium truncate max-w-[130px]">{managerProfile.coachName}</span>
                    ) : (
                      <span>Série A • Rep. {userClub.reputation}</span>
                    )}
                  </span>
                </div>
              </div>

              <div className="h-6 w-px bg-slate-800"></div>

              {/* Budget */}
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Saldo</span>
                <span className="text-xs font-black text-emerald-400 font-mono">
                  {formatCurrency(budget)}
                </span>
              </div>
            </div>
          )}

          {/* Quick Actions (Round + Active Email + New Career + Save) */}
          <div className="flex items-center gap-2">
            
            {/* Active Email Cloud Badge */}
            {activeEmail && (
              <div 
                onClick={onOpenSaveModal}
                title={`Save sincronizado com ${activeEmail}. Clique para gerenciar backups por e-mail.`}
                className="hidden lg:flex items-center gap-1.5 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/40 px-2.5 py-1 rounded-lg text-xs text-emerald-300 cursor-pointer transition"
              >
                <Mail size={13} className="text-emerald-400" />
                <span className="font-mono text-[11px] truncate max-w-[130px]">{activeEmail}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
            )}

            {/* Game Date & Pre-Season Tag */}
            <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 px-2.5 py-1 rounded-lg text-xs font-mono text-slate-200">
              <Clock size={13} className="text-emerald-400" />
              <span>{formatGameDate(currentDate)}</span>
            </div>

            {preSeason && (
              <span className="hidden md:inline-flex text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-lg animate-pulse">
                Pré-Temporada
              </span>
            )}

            {/* Transfer Window Status Indicator */}
            <div 
              title={windowStatus.isOpen ? 'Janela de transferências aberta: contratações permitidas.' : `Janela fechada. Próxima abertura: ${windowStatus.nextWindow || 'Em breve'}`}
              className={`hidden xl:flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg border ${
                windowStatus.isOpen 
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40' 
                  : 'bg-slate-900/60 text-slate-400 border-slate-800'
              }`}
            >
              <ArrowLeftRight size={11} className={windowStatus.isOpen ? 'text-emerald-400' : 'text-slate-500'} />
              <span>{windowStatus.isOpen ? 'Janela Aberta' : 'Janela Fechada'}</span>
            </div>

            <div className="flex items-center gap-1.5 bg-emerald-950/50 border border-emerald-500/30 px-3 py-1 rounded-lg text-xs font-bold text-emerald-300">
              <Calendar size={13} className="text-emerald-400" />
              <span>Rodada {currentRound}/{totalRounds}</span>
            </div>

            <button
              onClick={onOpenCareerModal}
              title="Iniciar nova carreira ou criar novo treinador"
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 text-xs font-semibold transition"
            >
              <Trophy size={14} />
              <span className="hidden sm:inline">Nova Carreira</span>
            </button>

            {/* Quick Save / Cloud Sync Button */}
            <button
              onClick={onQuickSave || onOpenSaveModal}
              title="Salvar progresso agora e enviar confirmação para seu e-mail"
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-md shadow-emerald-600/20"
            >
              <Save size={14} />
              <span className="hidden sm:inline">Salvar</span>
            </button>

            {/* Cloud & Save Manager Options */}
            <button
              onClick={onOpenSaveModal}
              title="Gerenciador de Saves, Nuvem e E-mail"
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-xs transition"
            >
              <Settings size={14} />
            </button>
          </div>

        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="bg-slate-950/60 overflow-hidden w-full">
        <div className="container-app overflow-hidden">
          <nav className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none max-w-full">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;

              return (
                <button
                  key={tab.id}
                  data-tab={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold whitespace-nowrap rounded-t-lg transition-all duration-150 relative ${
                    isActive 
                      ? 'text-emerald-400 bg-slate-900 border-t-2 border-emerald-500 shadow-md' 
                      : (tab.highlight 
                          ? 'text-emerald-300 hover:text-emerald-200 hover:bg-emerald-950/30' 
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60')
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-emerald-400' : (tab.highlight ? 'text-emerald-400' : 'text-slate-500')} />
                  <span>{tab.label}</span>
                  {tab.highlightBadge && (
                    <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {tab.highlightBadge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 shadow-sm shadow-emerald-500"></span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
