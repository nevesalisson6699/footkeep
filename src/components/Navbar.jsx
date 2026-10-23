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
  Shield 
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
    { id: 'match', label: 'Partida', icon: PlayCircle },
    { id: 'league', label: 'Liga Nacional', icon: Table },
    { id: 'cup', label: 'Copa Mata-Mata', icon: Award },
    { id: 'transfers', label: 'Mercado', icon: ArrowLeftRight },
    { id: 'finances', label: 'Finanças', icon: DollarSign }
  ];

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
      <div className="container-app py-2.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Logo & User Club Brand */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentTab('dashboard')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white font-black text-xl font-teko">
                FK
              </div>
              <div>
                <span className="font-teko text-2xl tracking-wide font-bold text-white uppercase block leading-none">
                  FOOT<span className="text-emerald-400">KEEP</span>
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold block">
                  Football Manager v1.0
                </span>
              </div>
            </div>

            {userClub && (
              <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-slate-800">
                <span className="text-2xl">{userClub.badgeEmoji}</span>
                <div>
                  <span className="text-sm font-bold text-slate-100 block leading-tight">{userClub.name}</span>
                  <span className="text-xs text-emerald-400 font-semibold">{formatCurrency(budget)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Items */}
          <nav className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                    isActive 
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon size={15} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Header Status & Save Actions */}
          <div className="flex items-center gap-2 justify-end">
            <div className="bg-slate-800/80 px-2.5 py-1 rounded-md text-xs font-medium text-slate-300 border border-slate-700/60">
              Rodada <span className="text-emerald-400 font-bold">{currentRound}/30</span>
            </div>

            <button
              onClick={onOpenSaveModal}
              title="Salvar ou Carregar Jogo"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
            >
              <Save size={16} />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
