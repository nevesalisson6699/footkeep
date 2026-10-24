import React from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Landmark, 
  Receipt, 
  Ticket, 
  Award,
  CheckCircle2
} from 'lucide-react';

export function FinancesView({ userClub, squad, budget, currentRound, awardedPrizes = [] }) {
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

        {/* Projection & Prizes */}
        <div className="glass-panel p-5 border-slate-800">
          <h3 className="text-sm font-bold text-slate-200 pb-3 border-b border-slate-800 flex items-center gap-2">
            <TrendingUp size={16} className="text-emerald-400" />
            Premiações Oficiais & Sustentabilidade
          </h3>

          <div className="space-y-4 pt-3 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-800/60">
              <span className="text-slate-400">Saldo Operacional Líquido Estimado</span>
              <span className={`font-bold font-mono ${netWeeklyFlow >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {netWeeklyFlow >= 0 ? `+${formatCurrency(netWeeklyFlow)}` : formatCurrency(netWeeklyFlow)} / rodada
              </span>
            </div>

            {/* Prize 1: League Title */}
            <div className="flex items-center justify-between py-2 border-b border-slate-800/60">
              <div>
                <span className="text-slate-300 font-semibold block">Título da Liga (1º Lugar)</span>
                <span className="text-[11px] text-slate-500">Pago automaticamente na 30ª rodada</span>
              </div>
              <div className="text-right flex items-center gap-2">
                <span className="font-bold text-yellow-400 font-mono">R$ 15.000.000</span>
                {awardedPrizes.some(p => p.id === 'league_champion') ? (
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                    <CheckCircle2 size={11} /> PAGO
                  </span>
                ) : (
                  <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                    PENDENTE
                  </span>
                )}
              </div>
            </div>

            {/* Prize 2: Cup Title */}
            <div className="flex items-center justify-between py-2 border-b border-slate-800/60">
              <div>
                <span className="text-slate-300 font-semibold block">Campeão da Copa do Brasil</span>
                <span className="text-[11px] text-slate-500">Pago automaticamente ao vencer a Final</span>
              </div>
              <div className="text-right flex items-center gap-2">
                <span className="font-bold text-yellow-400 font-mono">R$ 10.000.000</span>
                {awardedPrizes.some(p => p.id === 'cup_champion') ? (
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                    <CheckCircle2 size={11} /> PAGO
                  </span>
                ) : (
                  <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                    PENDENTE
                  </span>
                )}
              </div>
            </div>

            {/* Prize 3: G4 */}
            <div className="flex items-center justify-between py-2">
              <div>
                <span className="text-slate-300 font-semibold block">Classificação para o G4</span>
                <span className="text-[11px] text-slate-500">Pago na 30ª rodada aos 4 primeiros</span>
              </div>
              <div className="text-right flex items-center gap-2">
                <span className="font-bold text-emerald-400 font-mono">R$ 6.000.000</span>
                {awardedPrizes.some(p => p.id === 'league_g4') ? (
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                    <CheckCircle2 size={11} /> PAGO
                  </span>
                ) : (
                  <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                    PENDENTE
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tips & Prize History */}
        <div className="glass-panel p-5 border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-200 pb-3 border-b border-slate-800">
              Orientações da Diretoria & Premiações
            </h3>
            
            {awardedPrizes.length > 0 ? (
              <div className="mt-3 space-y-2">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                  Premiações Creditadas no Caixa:
                </span>
                {awardedPrizes.map((pz, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-white block">{pz.title}</span>
                      <span className="text-[10px] text-slate-400">Rodada {pz.round} da Temporada</span>
                    </div>
                    <span className="font-mono font-bold text-emerald-400">+{formatCurrency(pz.amount)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2.5 pt-3 text-xs text-slate-300">
                <p>
                  • <b>Manutenção de Elenco:</b> Mantenha a folha salarial dentro do faturamento semanal para não acumular déficit.
                </p>
                <p>
                  • <b>Receita com Transferências:</b> Vender jogadores reservas com bom valor de mercado é uma ótima forma de levantar caixa para contratações pontuais.
                </p>
                <p>
                  • <b>Premiações por Desempenho:</b> Conquistar o título da liga, a Copa ou vaga no G4 garante aportes milionários diretamente creditados no caixa do clube.
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 p-3 bg-emerald-950/30 rounded-xl border border-emerald-500/30 text-[11px] text-emerald-300">
            💡 Dica: Quanto melhor a colocação da equipe na tabela, maior a média de público no estádio e maior o lucro com bilheteria!
          </div>
        </div>

      </div>

    </div>
  );
}