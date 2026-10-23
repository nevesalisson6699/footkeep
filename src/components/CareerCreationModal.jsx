import React, { useState, useMemo } from 'react';
import { 
  Trophy, 
  User, 
  Shield, 
  Users, 
  DollarSign, 
  Plus, 
  Trash2, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  ArrowRight,
  TrendingUp,
  Briefcase,
  X,
  Lock
} from 'lucide-react';
import { REAL_CLUBS } from '../data/realClubs';
import { INITIAL_CLUBS } from '../data/initialClubs';
import { ClubBadge } from './ClubBadge';
import { POSITIONS } from '../data/initialPlayers';

const INVESTMENT_OPTIONS = [
  {
    id: 'none',
    name: 'Sem Investimento (Gestão Raiz)',
    amount: 0,
    badge: 'Realista',
    badgeColor: 'text-slate-400 bg-slate-800 border-slate-700',
    description: 'Trabalhe exclusivamente com o orçamento oficial e receitas geradas pelo clube. Máximo desafio de gestão e equilíbrio de caixa.'
  },
  {
    id: 'moderate',
    name: 'Aporte de Patrocínio (+ R$ 15M)',
    amount: 15000000,
    badge: 'Equilibrado',
    badgeColor: 'text-sky-400 bg-sky-950/60 border-sky-800',
    description: 'Novo contrato de patrocínio máster. Proporciona fôlego para buscar 1 ou 2 reforços pontuais de qualidade no mercado de transferências.'
  },
  {
    id: 'saf',
    name: 'Investimento SAF (+ R$ 50M)',
    amount: 50000000,
    badge: 'Aporte Massivo',
    badgeColor: 'text-amber-400 bg-amber-950/60 border-amber-800',
    description: 'Aporte massivo de investidores para formar um super-elenco de craques. A diretoria e a torcida cobrarão títulos expressivos de imediato.'
  }
];

export function CareerCreationModal({ isOpen, onStartCareer, currentClubId = 'fla', onClose }) {
  // Mode of clubs: real (Brasileirão 2024) or classic
  const [leagueMode, setLeagueMode] = useState('real'); // 'real' | 'classic'

  // Coach Profile Fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [coachName, setCoachName] = useState('');
  const [coachStyle, setCoachStyle] = useState('Ofensivo & Pressão');

  // Club Selection
  const [selectedClubId, setSelectedClubId] = useState(currentClubId || 'fla');
  const [searchQuery, setSearchQuery] = useState('');

  // Squad Choice & Custom Players
  const [rosterMode, setRosterMode] = useState('real'); // 'real' | 'custom'
  const [customPlayers, setCustomPlayers] = useState([]);
  
  // Single custom player form inputs
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerPos, setNewPlayerPos] = useState('A');
  const [newPlayerAge, setNewPlayerAge] = useState(23);
  const [newPlayerTier, setNewPlayerTier] = useState('titular'); // 'base' (74), 'titular' (80), 'craque' (86)

  // Investment Choice
  const [selectedInvestment, setSelectedInvestment] = useState('none');

  // UI state
  const [activeStep, setActiveStep] = useState(1); // 1: Perfil, 2: Clube, 3: Elenco, 4: Orçamento
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const clubsList = leagueMode === 'real' ? REAL_CLUBS : INITIAL_CLUBS;

  const filteredClubs = useMemo(() => {
    return clubsList.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.shortName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [clubsList, searchQuery]);

  const selectedClub = useMemo(() => {
    return clubsList.find(c => c.id === selectedClubId) || clubsList[0];
  }, [clubsList, selectedClubId]);

  // Position distribution HUD for custom players
  const positionCounts = useMemo(() => {
    const counts = { G: 0, Z: 0, L: 0, V: 0, M: 0, A: 0 };
    customPlayers.forEach(p => {
      if (counts[p.position] !== undefined) counts[p.position]++;
    });
    return counts;
  }, [customPlayers]);

  // Stepper validation guard
  const canGoToStep = (targetStep) => {
    if (targetStep === 1) return true;
    if (targetStep === 2) {
      return Boolean(firstName.trim() && lastName.trim());
    }
    if (targetStep === 3) {
      return Boolean(firstName.trim() && lastName.trim() && selectedClubId);
    }
    if (targetStep === 4) {
      if (!firstName.trim() || !lastName.trim() || !selectedClubId) return false;
      if (rosterMode === 'custom' && customPlayers.length === 0) return false;
      return true;
    }
    return false;
  };

  const handleStepClick = (targetStep) => {
    if (canGoToStep(targetStep)) {
      setActiveStep(targetStep);
      setErrorMessage('');
    } else {
      if (!firstName.trim() || !lastName.trim()) {
        setErrorMessage('Preencha seu nome e sobrenome no Passo 1 antes de avançar.');
      } else if (!selectedClubId) {
        setErrorMessage('Selecione um clube no Passo 2 antes de avançar.');
      } else if (rosterMode === 'custom' && customPlayers.length === 0) {
        setErrorMessage('Cadastre pelo menos 1 atleta personalizado no Passo 3 antes de ir ao orçamento.');
      }
    }
  };

  // Investment calculation
  const investmentData = INVESTMENT_OPTIONS.find(i => i.id === selectedInvestment) || INVESTMENT_OPTIONS[0];
  const initialBudget = (selectedClub?.budget || 15000000) + investmentData.amount;

  // Auto-generate coach name if empty when typing first/last name
  const handleNameBlur = () => {
    if (!coachName && firstName) {
      setCoachName(`Prof. ${firstName} ${lastName}`.trim());
    }
  };

  const handleAddCustomPlayer = () => {
    if (!newPlayerName.trim() || newPlayerName.trim().length < 3) {
      setErrorMessage('Digite um nome válido com pelo menos 3 caracteres para o jogador.');
      return;
    }

    if (customPlayers.length >= 15) {
      setErrorMessage('Limite máximo atingido! Você pode cadastrar até 15 jogadores personalizados.');
      return;
    }

    let ovr = 80, fin = 75, pas = 75, def = 75, fis = 78;
    if (newPlayerTier === 'base') {
      ovr = 74;
      fin = newPlayerPos === 'A' ? 76 : (newPlayerPos === 'M' ? 70 : 45);
      pas = newPlayerPos === 'M' || newPlayerPos === 'V' ? 75 : 68;
      def = newPlayerPos === 'Z' || newPlayerPos === 'V' || newPlayerPos === 'G' ? 77 : 50;
      fis = 76;
    } else if (newPlayerTier === 'craque') {
      ovr = 86;
      fin = newPlayerPos === 'A' ? 88 : (newPlayerPos === 'M' ? 84 : 58);
      pas = newPlayerPos === 'M' || newPlayerPos === 'V' || newPlayerPos === 'L' ? 88 : 78;
      def = newPlayerPos === 'Z' || newPlayerPos === 'V' || newPlayerPos === 'G' ? 87 : 56;
      fis = 85;
    } else {
      // titular
      ovr = 80;
      fin = newPlayerPos === 'A' ? 82 : (newPlayerPos === 'M' ? 78 : 50);
      pas = newPlayerPos === 'M' || newPlayerPos === 'V' ? 81 : 74;
      def = newPlayerPos === 'Z' || newPlayerPos === 'V' || newPlayerPos === 'G' ? 82 : 54;
      fis = 80;
    }

    const age = parseInt(newPlayerAge, 10) || 23;
    const baseValue = Math.pow(ovr - 40, 2.7) * 1200;
    const value = Math.round(baseValue / 10000) * 10000;
    const salary = Math.round((value * 0.007) / 1000) * 1000 + 4000;

    const newPlayer = {
      id: `custom_${Date.now()}_${customPlayers.length + 1}`,
      name: newPlayerName.trim(),
      position: newPlayerPos,
      age,
      overall: ovr,
      fin,
      pas,
      def,
      fis,
      value,
      salary,
      fitness: 100,
      morale: 'Alta',
      yellowCards: 0,
      redCards: 0,
      goals: 0,
      assists: 0,
      matchesPlayed: 0,
      isSuspended: false,
      isListed: false,
      isCustom: true
    };

    setCustomPlayers([...customPlayers, newPlayer]);
    setNewPlayerName('');
    setErrorMessage('');
  };

  const handleRemoveCustomPlayer = (id) => {
    setCustomPlayers(customPlayers.filter(p => p.id !== id));
  };

  const handleFinalSubmit = () => {
    // Validations
    if (!firstName.trim() || !lastName.trim()) {
      setActiveStep(1);
      setErrorMessage('Por favor, informe seu nome e sobrenome.');
      return;
    }

    if (!coachName.trim()) {
      setActiveStep(1);
      setErrorMessage('Por favor, defina o nome de treinador que aparecerá no clube.');
      return;
    }

    if (!selectedClub) {
      setActiveStep(2);
      setErrorMessage('Por favor, selecione um clube para comandar.');
      return;
    }

    if (rosterMode === 'custom' && customPlayers.length === 0) {
      setActiveStep(3);
      setErrorMessage('Você selecionou elenco personalizado! Cadastre pelo menos 1 atleta ou mude para o elenco oficial.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    setTimeout(() => {
      onStartCareer({
        managerProfile: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          coachName: coachName.trim(),
          coachStyle,
          createdAt: new Date().toISOString(),
          rosterChoice: rosterMode,
          investmentOption: selectedInvestment,
          investmentAmount: investmentData.amount
        },
        selectedClubId,
        leagueMode,
        customPlayers: rosterMode === 'custom' ? customPlayers : [],
        initialBudget
      });
      setIsLoading(false);
    }, 450);
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="p-6 md:p-7 bg-gradient-to-r from-emerald-950/70 via-slate-900 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Trophy size={26} />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-widest uppercase text-emerald-400 block">
                Footkeep 2.0 • Temporada 2024 / 2025
              </span>
              <h1 className="text-xl md:text-2xl font-black text-white">
                Iniciar Nova Carreira de Treinador
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-slate-950/70 px-3.5 py-1.5 rounded-xl border border-slate-800 text-xs font-semibold text-slate-300">
              <Briefcase size={15} className="text-emerald-400" />
              <span>Passo {activeStep} de 4</span>
            </div>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition"
                title="Fechar e Manter Carreira Atual"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Step Indicator Tabs */}
        <div className="grid grid-cols-4 border-b border-slate-800 bg-slate-950/60 text-xs font-bold text-center">
          <button
            onClick={() => handleStepClick(1)}
            className={`py-3 px-2 border-b-2 transition flex items-center justify-center gap-1.5 ${
              activeStep === 1 
                ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>1. Perfil</span>
          </button>

          <button
            onClick={() => handleStepClick(2)}
            className={`py-3 px-2 border-b-2 transition flex items-center justify-center gap-1.5 ${
              activeStep === 2 
                ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10' 
                : canGoToStep(2)
                  ? 'border-transparent text-slate-400 hover:text-slate-200'
                  : 'border-transparent text-slate-600 opacity-60 cursor-not-allowed'
            }`}
          >
            {!canGoToStep(2) && <Lock size={12} className="text-slate-600" />}
            <span>2. Clube</span>
          </button>

          <button
            onClick={() => handleStepClick(3)}
            className={`py-3 px-2 border-b-2 transition flex items-center justify-center gap-1.5 ${
              activeStep === 3 
                ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10' 
                : canGoToStep(3)
                  ? 'border-transparent text-slate-400 hover:text-slate-200'
                  : 'border-transparent text-slate-600 opacity-60 cursor-not-allowed'
            }`}
          >
            {!canGoToStep(3) && <Lock size={12} className="text-slate-600" />}
            <span>3. Elenco</span>
          </button>

          <button
            onClick={() => handleStepClick(4)}
            className={`py-3 px-2 border-b-2 transition flex items-center justify-center gap-1.5 ${
              activeStep === 4 
                ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10' 
                : canGoToStep(4)
                  ? 'border-transparent text-slate-400 hover:text-slate-200'
                  : 'border-transparent text-slate-600 opacity-60 cursor-not-allowed'
            }`}
          >
            {!canGoToStep(4) && <Lock size={12} className="text-slate-600" />}
            <span>4. Orçamento</span>
          </button>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3.5 bg-rose-950/40 border border-rose-500/40 rounded-xl text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle size={17} className="shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Modal Body / Steps */}
        <div className="p-6 md:p-8 flex-1 overflow-y-auto space-y-6">

          {/* STEP 1: PERFIL DO TREINADOR */}
          {activeStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <User size={18} className="text-emerald-400" />
                  Identificação do Treinador
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Crie sua identidade profissional. Seus dados serão usados nas súmulas, comunicados da diretoria e coletivas.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Nome: <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    onBlur={handleNameBlur}
                    placeholder="Ex: Carlos"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Sobrenome: <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    onBlur={handleNameBlur}
                    placeholder="Ex: Silva"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Nome de Treinador (Exibição no Jogo): <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={coachName}
                    onChange={(e) => setCoachName(e.target.value)}
                    placeholder="Ex: Prof. Carlos Silva ou Carlão"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-emerald-400 font-bold placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Como você será chamado pela torcida e na narração das partidas.
                  </span>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Filosofia Tática & Liderança:
                  </label>
                  <select
                    value={coachStyle}
                    onChange={(e) => setCoachStyle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition cursor-pointer"
                  >
                    <option value="Ofensivo & Pressão">Ofensivo & Pressão Alta</option>
                    <option value="Equilibrado & Controle">Equilibrado & Controle de Posse</option>
                    <option value="Sólido & Contra-Ataque">Sólido Defensivamente & Transição Rápida</option>
                    <option value="Desenvolvedor da Base">Foco em Desenvolvimento de Jovens</option>
                  </select>
                </div>
              </div>

              <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 flex items-center gap-3">
                <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
                <span className="text-xs text-slate-300">
                  Sem necessidade de contas externas ou senhas: sua carreira é gravada com segurança de forma local e persistente.
                </span>
              </div>
            </div>
          )}

          {/* STEP 2: ESCOLHA DO CLUBE */}
          {activeStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Shield size={18} className="text-emerald-400" />
                    Selecione o Clube que Deseja Comandar
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    16 agremiações oficiais da Série A do Campeonato Brasileiro (Temporada 2024).
                  </p>
                </div>

                {/* Search Bar */}
                <div className="relative min-w-[220px]">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar clube ou cidade..."
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Clubs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 max-h-[360px] overflow-y-auto pr-1">
                {filteredClubs.map(club => {
                  const isSelected = selectedClubId === club.id;

                  return (
                    <div
                      key={club.id}
                      onClick={() => {
                        setSelectedClubId(club.id);
                        setErrorMessage('');
                      }}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected 
                          ? 'bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/40 shadow-lg shadow-emerald-950/40' 
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <ClubBadge club={club} size="md" />
                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-white text-sm truncate">{club.name}</h4>
                          <span className="text-[11px] text-slate-400 block truncate">{club.city}</span>
                        </div>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">Reputação:</span>
                        <span className="font-bold text-emerald-400">{club.reputation}/100</span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] mt-1">
                        <span className="text-slate-400">Orçamento:</span>
                        <span className="font-mono font-semibold text-slate-200">
                          {formatCurrency(club.budget)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {selectedClub && (
                <div className="p-4 bg-slate-950/80 rounded-2xl border border-emerald-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ClubBadge club={selectedClub} size="lg" />
                    <div>
                      <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">Clube Selecionado</span>
                      <h4 className="font-black text-white text-base">{selectedClub.fullName || selectedClub.name}</h4>
                      <span className="text-xs text-slate-400">
                        {selectedClub.stadium} ({selectedClub.stadiumCapacity?.toLocaleString('pt-BR')} torcedores)
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 block">Orçamento Base</span>
                    <span className="text-base font-black text-emerald-400 font-mono">
                      {formatCurrency(selectedClub.budget)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: ELENCO & JOGADORES PERSONALIZADOS */}
          {activeStep === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Users size={18} className="text-emerald-400" />
                  Configuração do Elenco do {selectedClub?.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Escolha se deseja atuar com os atletas reais da temporada 2024 ou criar atletas personalizados para o clube.
                </p>
              </div>

              {/* Roster Mode Toggle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => setRosterMode('real')}
                  className={`p-4 rounded-2xl border cursor-pointer transition ${
                    rosterMode === 'real'
                      ? 'bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/30'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-white text-sm">Elenco Oficial (Temporada 2024)</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Recomendado
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Comece com o plantel completo e real do {selectedClub?.name} (21 atletas oficiais com atributos calibrados pela CBF e mercado 2024).
                  </p>
                </div>

                <div
                  onClick={() => setRosterMode('custom')}
                  className={`p-4 rounded-2xl border cursor-pointer transition ${
                    rosterMode === 'custom'
                      ? 'bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/30'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-white text-sm">Criar Jogadores Personalizados</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">
                      Até 15 Atletas
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Cadastre seus próprios atletas (amigos, promessas ou lendas). Seus jogadores entrarão no elenco principal do clube.
                  </p>
                </div>
              </div>

              {/* Custom Players Builder Panel */}
              {rosterMode === 'custom' && (
                <div className="p-5 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
                    <span className="text-sm font-bold text-white flex items-center gap-2">
                      <Sparkles size={16} className="text-purple-400" />
                      Cadastro de Atletas Personalizados
                    </span>
                    <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border self-start sm:self-auto ${
                      customPlayers.length >= 15 
                        ? 'bg-rose-950 text-rose-400 border-rose-800' 
                        : 'bg-slate-900 text-purple-400 border-slate-700'
                    }`}>
                      {customPlayers.length} / 15 Atletas
                    </span>
                  </div>

                  {/* Positional Balance HUD */}
                  <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                      Distribuição do Elenco:
                    </span>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold border transition ${
                        positionCounts.G > 0 ? 'bg-emerald-950/80 text-emerald-400 border-emerald-700' : 'bg-slate-900 text-slate-500 border-slate-800'
                      }`}>
                        G: {positionCounts.G}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold border transition ${
                        positionCounts.Z > 0 ? 'bg-emerald-950/80 text-emerald-400 border-emerald-700' : 'bg-slate-900 text-slate-500 border-slate-800'
                      }`}>
                        Z: {positionCounts.Z}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold border transition ${
                        positionCounts.L > 0 ? 'bg-emerald-950/80 text-emerald-400 border-emerald-700' : 'bg-slate-900 text-slate-500 border-slate-800'
                      }`}>
                        L: {positionCounts.L}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold border transition ${
                        positionCounts.V > 0 ? 'bg-emerald-950/80 text-emerald-400 border-emerald-700' : 'bg-slate-900 text-slate-500 border-slate-800'
                      }`}>
                        V: {positionCounts.V}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold border transition ${
                        positionCounts.M > 0 ? 'bg-emerald-950/80 text-emerald-400 border-emerald-700' : 'bg-slate-900 text-slate-500 border-slate-800'
                      }`}>
                        M: {positionCounts.M}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold border transition ${
                        positionCounts.A > 0 ? 'bg-emerald-950/80 text-emerald-400 border-emerald-700' : 'bg-slate-900 text-slate-500 border-slate-800'
                      }`}>
                        A: {positionCounts.A}
                      </span>
                    </div>
                  </div>

                  {/* Add Player Form */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                    <div className="sm:col-span-4">
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                        Nome do Jogador (Pressione Enter para adicionar):
                      </label>
                      <input
                        type="text"
                        value={newPlayerName}
                        onChange={(e) => setNewPlayerName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddCustomPlayer();
                          }
                        }}
                        placeholder="Ex: Roberto Silva"
                        disabled={customPlayers.length >= 15}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 disabled:opacity-50"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                        Posição:
                      </label>
                      <select
                        value={newPlayerPos}
                        onChange={(e) => setNewPlayerPos(e.target.value)}
                        disabled={customPlayers.length >= 15}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2 py-2 text-xs text-emerald-400 font-bold focus:outline-none focus:border-purple-500 disabled:opacity-50 cursor-pointer"
                      >
                        {POSITIONS.map(p => (
                          <option key={p.code} value={p.code} className="bg-slate-900 text-white">
                            {p.code} - {p.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                        Idade:
                      </label>
                      <input
                        type="number"
                        min="16"
                        max="40"
                        value={newPlayerAge}
                        onChange={(e) => setNewPlayerAge(e.target.value)}
                        disabled={customPlayers.length >= 15}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 disabled:opacity-50"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                        Nível de Habilidade:
                      </label>
                      <select
                        value={newPlayerTier}
                        onChange={(e) => setNewPlayerTier(e.target.value)}
                        disabled={customPlayers.length >= 15}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2 py-2 text-xs text-amber-400 font-bold focus:outline-none focus:border-purple-500 disabled:opacity-50 cursor-pointer"
                      >
                        <option value="base" className="bg-slate-900 text-white">Promessa (OVR 74)</option>
                        <option value="titular" className="bg-slate-900 text-white">Titular (OVR 80)</option>
                        <option value="craque" className="bg-slate-900 text-white">Craque (OVR 86)</option>
                      </select>
                    </div>

                    <div className="sm:col-span-1">
                      <button
                        type="button"
                        onClick={handleAddCustomPlayer}
                        disabled={customPlayers.length >= 15}
                        className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center transition disabled:opacity-50 shadow-md shadow-purple-600/20"
                        title="Adicionar Atleta"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Custom Players Table */}
                  {customPlayers.length > 0 ? (
                    <div className="overflow-x-auto max-h-[190px] overflow-y-auto pr-1">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-900/90 text-slate-400 sticky top-0">
                          <tr>
                            <th className="py-2 px-2.5">Pos</th>
                            <th className="py-2 px-2.5">Nome</th>
                            <th className="py-2 px-2.5 text-center">Idade</th>
                            <th className="py-2 px-2.5 text-center">OVR</th>
                            <th className="py-2 px-2.5 text-right">Salário</th>
                            <th className="py-2 px-2.5 text-center">Ação</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                          {customPlayers.map((player) => (
                            <tr key={player.id} className="hover:bg-slate-900/40">
                              <td className="py-2 px-2.5 font-bold text-emerald-400">{player.position}</td>
                              <td className="py-2 px-2.5 font-semibold text-white">{player.name}</td>
                              <td className="py-2 px-2.5 text-center text-slate-400">{player.age} anos</td>
                              <td className="py-2 px-2.5 text-center font-bold text-purple-400">{player.overall}</td>
                              <td className="py-2 px-2.5 text-right font-mono text-slate-300">{formatCurrency(player.salary)}</td>
                              <td className="py-2 px-2.5 text-center">
                                <button
                                  type="button"
                                  onClick={() => handleRemoveCustomPlayer(player.id)}
                                  className="text-slate-500 hover:text-rose-400 transition"
                                  title="Remover"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="py-6 text-center text-xs text-slate-500 bg-slate-900/40 rounded-xl border border-dashed border-slate-800">
                      Nenhum atleta cadastrado ainda. Preencha os campos acima para adicionar até 15 jogadores ao seu elenco!
                    </div>
                  )}

                  <p className="text-[11px] text-slate-400">
                    💡 Caso adicione menos de 15 jogadores, o restante do elenco será completado automaticamente com atletas da base oficial do {selectedClub?.name}.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: ORÇAMENTO & INVESTIMENTO INICIAL */}
          {activeStep === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <DollarSign size={18} className="text-emerald-400" />
                  Orçamento & Investimento Inicial de Carreira
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Defina se deseja adicionar um aporte financeiro ao clube ou iniciar com a saúde financeira real.
                </p>
              </div>

              {/* Investment Cards */}
              <div className="space-y-3">
                {INVESTMENT_OPTIONS.map(opt => {
                  const isSelected = selectedInvestment === opt.id;

                  return (
                    <div
                      key={opt.id}
                      onClick={() => setSelectedInvestment(opt.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                        isSelected 
                          ? 'bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/30' 
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-sm">{opt.name}</h4>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${opt.badgeColor}`}>
                            {opt.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 max-w-xl">
                          {opt.description}
                        </p>
                      </div>

                      <div className="text-left md:text-right shrink-0">
                        <span className="text-[10px] text-slate-400 block">Aporte Adicional</span>
                        <span className={`font-mono font-bold text-sm ${opt.amount > 0 ? 'text-emerald-400' : 'text-slate-400'}`}>
                          {opt.amount > 0 ? `+ ${formatCurrency(opt.amount)}` : 'R$ 0'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Financial Impact Summary Card */}
              <div className="p-5 bg-gradient-to-br from-slate-950 to-emerald-950/40 rounded-2xl border border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                  <span className="text-slate-400">Orçamento Base do {selectedClub?.name}:</span>
                  <span className="font-mono text-slate-300">{formatCurrency(selectedClub?.budget || 0)}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                  <span className="text-slate-400">Aporte de Investimento Escolhido:</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    + {formatCurrency(investmentData.amount)}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-xs font-bold text-white block">Orçamento em Caixa Inicial:</span>
                    <span className="text-[11px] text-slate-400">Disponível para contratações e salários</span>
                  </div>
                  <span className="text-2xl font-black text-emerald-400 font-mono">
                    {formatCurrency(initialBudget)}
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="p-5 md:p-6 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
          {activeStep > 1 ? (
            <button
              type="button"
              onClick={() => setActiveStep(prev => prev - 1)}
              disabled={isLoading}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition disabled:opacity-50"
            >
              Voltar
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-3">
            {activeStep < 4 ? (
              <button
                type="button"
                onClick={() => {
                  if (activeStep === 1) {
                    if (!firstName.trim() || !lastName.trim()) {
                      setErrorMessage('Por favor, informe seu nome e sobrenome para continuar.');
                      return;
                    }
                    if (!coachName.trim()) {
                      setCoachName(`Prof. ${firstName} ${lastName}`.trim());
                    }
                  }
                  setErrorMessage('');
                  setActiveStep(prev => prev + 1);
                }}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition"
              >
                <span>Avançar para Passo {activeStep + 1}</span>
                <ArrowRight size={15} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinalSubmit}
                disabled={isLoading}
                className="px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black text-sm shadow-xl shadow-emerald-500/30 flex items-center gap-2 transition disabled:opacity-50 animate-pulse"
              >
                {isLoading ? (
                  <span>Preparando a Temporada...</span>
                ) : (
                  <>
                    <Trophy size={18} />
                    <span>Iniciar Carreira no Footkeep</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
