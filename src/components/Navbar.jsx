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
  Calendar
} from 'lucide-react';

export function Navbar({ 
  currentTab, 
  setCurrentTab, 
  userClub, 
  currentRound, 
  budget, 
  onOpenSaveModal 
}) {
  const tabs = [
    { id: 'dashboard', label: 'Visão Geral', icon: Shield },
    { id: 'tactics', label: 'Elenco & Tática', icon: Users },
    { id: 'match', label: 'Jogar Partida', icon: PlayCircle, highlight: true },
    { id: 'league', label: 'Liga Nacional', icon: Table },
    { id: 'cup', label: 'Copa Footkeep', icon: Award },
    { id: 'transfers', label: 'Transferências', icon: ArrowLeftRight },
    { id: 'finances', label: 'Finanças', icon: DollarSign }
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
            className="flex items-center gap-2.5 cursor-pointer select-none group" 
            onClick={() => setCurrentTab('dashboard')}
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center shadow-lg shadow-emerald-500/30 text-white font-teko text-2xl font-bold tracking-wider group-hover:scale-105 transition-transform">
              FK
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-teko text-2xl tracking-wider font-extrabold text-white uppercase">
                  FOOT<span className="text-emerald-400">KEEP</span>
                </span>
                <span className="text-[9px] font-black uppercase tracking-widest bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  PRO
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide block">
                Simulador de Gestão de Futebol
              </span>
            </div>
          </div>

          {/* User Club Active Widget */}
          {userClub && (
            <div className="flex items-center gap-4 bg-slate-900/90 px-3.5 py-1.5 rounded-xl border border-slate-800 shadow-inner">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl drop-shadow">{userClub.badgeEmoji}</span>
                <div>
                  <span className="text-xs font-bold text-white block leading-tight">{userClub.name}</span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                    Série A • Reputação {userClub.reputation}
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

          {/* Quick Actions (Round + Save) */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-emerald-950/50 border border-emerald-500/30 px-3 py-1 rounded-lg text-xs font-bold text-emerald-300">
              <Calendar size={13} className="text-emerald-400" />
              <span>Rodada {currentRound}/30</span>
            </div>

            <button
              onClick={onOpenSaveModal}
              title="Salvar ou carregar jogo"
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-semibold transition"
            >
              <Save size={14} className="text-emerald-400" />
              <span className="hidden sm:inline">Salvar</span>
            </button>
          </div>

        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="bg-slate-950/60">
        <div className="container-app">
          <nav className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;

              return (
                <button
                  key={tab.id}
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
