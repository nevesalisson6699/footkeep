import React from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Landmark, 
  Receipt, 
  Ticket, 
  Award 
} from 'lucide-react';

export function FinancesView({ userClub, squad, budget, currentRound }) {
  if (!userClub) return null;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  const weeklyPayroll = squad.reduce((sum, p) => sum + (p.salary || 0), 0);
  const estimatedTicketIncome = Math.round((userClub.stadiumCapacity * 0.75) * 45);
  const weeklySponsorIncome = Math.round(userClub.reputation * 3500);

  const netWeeklyFlow = (estimatedTicketIncome * 0.5) + weeklySponsorIncome - weeklyPayroll;

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Financial Health Header */}
      <div className="glass-panel p-6 border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Landmark className="text-emerald-400" size={24} />
              Departamento Financeiro & Orçamento
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Controle de fluxo de caixa, bilheteria, folha de pagamento e receitas de patrocínio.
            </p>
          </div>

          <div className="bg-slate-900/90 px-5 py-3 rounded-2xl border border-slate-800 text-right">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Saldo Atual em Caixa</span>
            <span className="text-2xl font-black text-emerald-400 font-mono">
              {formatCurrency(budget)}
            </span>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
          
          <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="font-semibold flex items-center gap-1.5">
                <Receipt size={15} className="text-rose-400" />
                Folha Salarial Semanal
              </span>
              <span className="text-rose-400 font-bold">DESPESA</span>
            </div>
            <span className="text-xl font-bold text-white font-mono block">
              {formatCurrency(weeklyPayroll)}
            </span>
            <span className="text-[11px] text-slate-500 mt-1 block">
              {squad.length} atletas sob contrato ativo
            </span>
          </div>

          <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="font-semibold flex items-center gap-1.5">
                <Ticket size={15} className="text-emerald-400" />
                Bilheteria Média por Jogo
              </span>
              <span className="text-emerald-400 font-bold">RECEITA</span>
            </div>
            <span className="text-xl font-bold text-white font-mono block">
              {formatCurrency(estimatedTicketIncome)}
            </span>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Estádio: {userClub.stadium} ({userClub.stadiumCapacity.toLocaleString('pt-BR')} cap.)
            </span>
          </div>

          <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="font-semibold flex items-center gap-1.5">
                <Award size={15} className="text-yellow-400" />
                Patrocínios & Direitos de TV
              </span>
              <span className="text-emerald-400 font-bold">RECEITA</span>
            </div>
            <span className="text-xl font-bold text-white font-mono block">
              {formatCurrency(weeklySponsorIncome)} / sem
            </span>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Vinculado à reputação do clube ({userClub.reputation}/100)
            </span>
          </div>

        </div>
      </div>

      {/* Projection & Strategy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Projection */}
        <div className="glass-panel p-5 border-slate-800">
          <h3 className="text-sm font-bold text-slate-200 pb-3 border-b border-slate-800 flex items-center gap-2">
            <TrendingUp size={16} className="text-emerald-400" />
            Projeção Financeira & Sustentabilidade
          </h3>

          <div className="space-y-4 pt-3 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-800/60">
              <span className="text-slate-400">Saldo Operacional Líquido Estimado</span>
              <span className={`font-bold font-mono ${netWeeklyFlow >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {netWeeklyFlow >= 0 ? `+${formatCurrency(netWeeklyFlow)}` : formatCurrency(netWeeklyFlow)} / rodada
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800/60">
              <span className="text-slate-400">Premiação pelo Título da Liga (1º Lugar)</span>
              <span className="font-bold text-yellow-400 font-mono">R$ 15.000.000</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800/60">
              <span className="text-slate-400">Premiação Campeão Copa Footkeep</span>
              <span className="font-bold text-yellow-400 font-mono">R$ 10.000.000</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-400">Classificação para o G4</span>
              <span className="font-bold text-emerald-400 font-mono">R$ 6.000.000</span>
            </div>
          </div>
        </div>

        {/* Tips for Financial Management */}
        <div className="glass-panel p-5 border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-200 pb-3 border-b border-slate-800">
              Orientações da Diretoria
            </h3>
            <div className="space-y-2.5 pt-3 text-xs text-slate-300">
              <p>
                • <b>Manutenção de Elenco:</b> Mantenha a folha salarial dentro do faturamento semanal para não acumular déficit.
              </p>
              <p>
                • <b>Receita com Transferências:</b> Vender jogadores reservas com bom valor de mercado é uma ótima forma de levantar caixa para contratações pontuais.
              </p>
              <p>
                • <b>Agentes Livres:</b> Jogadores sem clube dispensam pagamento de multa rescisória, exigindo apenas o pagamento do salário semanal.
              </p>
            </div>
          </div>

          <div className="mt-4 p-3 bg-emerald-950/30 rounded-xl border border-emerald-500/30 text-[11px] text-emerald-300">
            💡 Dica: Quanto melhor a colocação da equipe na tabela, maior a média de público no estádio e maior o lucro com bilheteria!
          </div>
        </div>

      </div>

    </div>
  );
}
