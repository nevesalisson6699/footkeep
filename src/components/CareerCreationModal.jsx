import React, { useState, useMemo, useEffect } from 'react';
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
  Lock,
  Mail,
  Cloud,
  CloudDownload,
  Calendar,
  RefreshCw,
  LogIn
} from 'lucide-react';
import { REAL_CLUBS } from '../data/realClubs';
import { INITIAL_CLUBS } from '../data/initialClubs';
import { ClubBadge } from './ClubBadge';
import { FootkeepLogo } from './FootkeepLogo';
import { POSITIONS } from '../data/initialPlayers';
import { 
  getActiveEmail, 
  setActiveEmail, 
  isValidEmail, 
  normalizeEmail, 
  getCloudSaveByEmail, 
  listKnownEmailAccounts 
} from '../services/emailSaveService';

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

export function CareerCreationModal({ 
  isOpen, 
  onStartCareer, 
  currentClubId = null, 
  onClose,
  onLoadSave 
}) {
  // Modal mode: 'create' | 'email_login'
  const [modalMode, setModalMode] = useState('create');

  // Mode of clubs: real (Brasileirão 2024) or classic
  const [leagueMode, setLeagueMode] = useState('real'); // 'real' | 'classic'

  // Coach Profile Fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [coachName, setCoachName] = useState('');
  const [email, setEmail] = useState('');
  const [coachStyle, setCoachStyle] = useState('Ofensivo & Pressão');

  // Club Selection - NEVER default to Flamengo automatically!
  const [selectedClubId, setSelectedClubId] = useState(currentClubId || null);
  const [searchQuery, setSearchQuery] = useState('');

  // Squad Choice & Custom Players
  const [rosterMode, setRosterMode] = useState('real'); // 'real' | 'custom'
  const [customPlayers, setCustomPlayers] = useState([]);
  
  // Single custom player form inputs
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerPos, setNewPlayerPos] = useState('A');
  const [newPlayerAge, setNewPlayerAge] = useState(23);
  const [newPlayerTier, setNewPlayerTier] = useState('titular');

  // Investment Choice
  const [selectedInvestment, setSelectedInvestment] = useState('none');

  // UI state
  const [activeStep, setActiveStep] = useState(1); // 1: Perfil & E-mail, 2: Clube, 3: Elenco, 4: Orçamento
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Email login state
  const [loginEmailInput, setLoginEmailInput] = useState('');
  const [cloudPreviewSave, setCloudPreviewSave] = useState(null);
  const [loginFeedback, setLoginFeedback] = useState(null);
  const [knownAccounts, setKnownAccounts] = useState([]);

  // Pre-fill active email if exists on open
  useEffect(() => {
    if (isOpen) {
      const active = getActiveEmail();
      if (active) {
        setEmail(active);
        setLoginEmailInput(active);
      }
      setKnownAccounts(listKnownEmailAccounts());
      setCloudPreviewSave(null);
      setLoginFeedback(null);
      setErrorMessage('');
      
      // If we have an existing club, select it; otherwise ensure it starts clean (null)
      if (currentClubId) {
        setSelectedClubId(currentClubId);
      }
    }
  }, [isOpen, currentClubId]);

  const clubsList = leagueMode === 'real' ? REAL_CLUBS : INITIAL_CLUBS;

  const filteredClubs = useMemo(() => {
    return clubsList.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.shortName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [clubsList, searchQuery]);

  const selectedClub = useMemo(() => {
    if (!selectedClubId) return null;
    return clubsList.find(c => c.id === selectedClubId) || null;
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
      return Boolean(firstName.trim() && lastName.trim() && isValidEmail(email));
    }
    if (targetStep === 3) {
      return Boolean(firstName.trim() && lastName.trim() && isValidEmail(email) && selectedClubId);
    }
    if (targetStep === 4) {
      if (!firstName.trim() || !lastName.trim() || !isValidEmail(email) || !selectedClubId) return false;
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
      } else if (!isValidEmail(email)) {
        setErrorMessage('Informe um e-mail válido no Passo 1 para vincular seu save na nuvem.');
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

    if (!isValidEmail(email)) {
      setActiveStep(1);
      setErrorMessage('Por favor, informe um endereço de e-mail válido para vincular o save.');
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

    const normEmail = normalizeEmail(email);

    setTimeout(() => {
      onStartCareer({
        managerProfile: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          coachName: coachName.trim(),
          email: normEmail,
          coachStyle,
          createdAt: new Date().toISOString(),
          rosterChoice: rosterMode,
          investmentOption: selectedInvestment,
          investmentAmount: investmentData.amount
        },
        email: normEmail,
        selectedClubId,
        leagueMode,
        customPlayers: rosterMode === 'custom' ? customPlayers : [],
        initialBudget
      });
      setIsLoading(false);
    }, 450);
  };

  // ==========================================
  // Email Login & Save Upload Handlers
  // ==========================================
  const handleSearchEmailSave = () => {
    const targetEmail = normalizeEmail(loginEmailInput);
    if (!isValidEmail(targetEmail)) {
      setLoginFeedback({
        type: 'error',
        message: 'Por favor, digite um e-mail válido para localizar seu save.'
      });
      setCloudPreviewSave(null);
      return;
    }

    const found = getCloudSaveByEmail(targetEmail);
    if (found) {
      setCloudPreviewSave(found);
      setLoginFeedback({
        type: 'success',
        message: `Save localizado para ${targetEmail}! Revise os dados abaixo e confirme para jogar.`
      });
    } else {
      setCloudPreviewSave(null);
      setLoginFeedback({
        type: 'error',
        message: `Nenhum save foi localizado para o e-mail "${targetEmail}". Se for sua primeira vez, inicie uma Nova Carreira!`
      });
    }
  };

  const handleApplyEmailSave = () => {
    if (!cloudPreviewSave || !onLoadSave) return;
    setActiveEmail(cloudPreviewSave.email || loginEmailInput);
    onLoadSave(cloudPreviewSave);
    if (onClose) {
      onClose();
    }
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
          <div className="flex items-center gap-3.5">
            <FootkeepLogo size="md" variant="icon" />
            <div>
              <span className="text-[11px] font-bold tracking-widest uppercase text-emerald-400 block">
                Footkeep 2.0 • Sincronização em Nuvem
              </span>
              <h1 className="text-xl md:text-2xl font-black text-white">
                {modalMode === 'create' ? 'Iniciar Nova Carreira de Treinador' : 'Acessar Carreira Salva por E-mail'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {modalMode === 'create' && (
              <div className="hidden sm:flex items-center gap-2 bg-slate-950/70 px-3.5 py-1.5 rounded-xl border border-slate-800 text-xs font-semibold text-slate-300">
                <Briefcase size={15} className="text-emerald-400" />
                <span>Passo {activeStep} de 4</span>
              </div>
            )}

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

        {/* Mode Selector Header Bar */}
        <div className="grid grid-cols-2 border-b border-slate-800 bg-slate-950/80 p-2 gap-2 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setModalMode('create');
              setErrorMessage('');
            }}
            className={`py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-2 ${
              modalMode === 'create'
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Trophy size={16} />
            <span>Criar Nova Carreira</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setModalMode('email_login');
              setErrorMessage('');
            }}
            className={`py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-2 ${
              modalMode === 'email_login'
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <CloudDownload size={16} />
            <span>Acessar via E-mail (Upload do Save)</span>
          </button>
        </div>

        {/* If in Create Mode: Step Indicator Tabs */}
        {modalMode === 'create' && (
          <div className="grid grid-cols-4 border-b border-slate-800 bg-slate-950/60 text-xs font-bold text-center">
            <button
              onClick={() => handleStepClick(1)}
              className={`py-3 px-2 border-b-2 transition flex items-center justify-center gap-1.5 ${
                activeStep === 1 
                  ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>1. Perfil & E-mail</span>
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
        )}

        {/* Error Notification */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3.5 bg-rose-950/40 border border-rose-500/40 rounded-xl text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle size={17} className="shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* ==================================================== */}
        {/* MODE: EMAIL LOGIN & UPLOAD DO SAVE                   */}
        {/* ==================================================== */}
        {modalMode === 'email_login' && (
          <div className="p-6 md:p-8 flex-1 overflow-y-auto space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Mail size={18} className="text-emerald-400" />
                Recuperar Progresso e Carreira na Nuvem
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Digite o e-mail que você utilizou ao criar ou salvar sua carreira. O Footkeep fará o upload dos dados salvos diretamente para sua sessão sem depender de cache preso.
              </p>
            </div>

            {/* Input & Search Form */}
            <div className="p-5 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-4">
              <label className="text-xs font-semibold text-slate-300 block">
                E-mail do Treinador:
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    value={loginEmailInput}
                    onChange={(e) => {
                      setLoginEmailInput(e.target.value);
                      setCloudPreviewSave(null);
                      setLoginFeedback(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSearchEmailSave();
                      }
                    }}
                    placeholder="exemplo@footkeep.com"
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSearchEmailSave}
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-md shadow-emerald-500/20"
                >
                  <Search size={15} />
                  <span>Buscar Save na Nuvem</span>
                </button>
              </div>

              {/* Known accounts quick chips */}
              {knownAccounts.length > 0 && (
                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-[11px] text-slate-400 block mb-2 font-medium">
                    Saves encontrados no dispositivo:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {knownAccounts.map(acc => (
                      <button
                        key={acc.email}
                        type="button"
                        onClick={() => {
                          setLoginEmailInput(acc.email);
                          const found = getCloudSaveByEmail(acc.email);
                          if (found) {
                            setCloudPreviewSave(found);
                            setLoginFeedback({
                              type: 'success',
                              message: `Save carregado da memória para ${acc.email}!`
                            });
                          }
                        }}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-emerald-950/40 text-slate-300 hover:text-emerald-400 border border-slate-800 hover:border-emerald-500/40 text-xs transition"
                      >
                        <Shield size={13} className="text-emerald-400" />
                        <span className="font-semibold">{acc.clubName || 'Clube'}</span>
                        <span className="text-slate-500 text-[11px]">({acc.email})</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Feedback Message */}
            {loginFeedback && (
              <div className={`p-4 rounded-xl border flex items-center gap-3 text-xs ${
                loginFeedback.type === 'success' 
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' 
                  : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
              }`}>
                {loginFeedback.type === 'success' ? (
                  <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle size={18} className="text-rose-400 shrink-0" />
                )}
                <span>{loginFeedback.message}</span>
              </div>
            )}

            {/* Cloud Save Preview Card */}
            {cloudPreviewSave && (
              <div className="p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/30 rounded-2xl border border-emerald-500/40 space-y-4 shadow-xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3.5">
                    {cloudPreviewSave.clubs && (
                      <ClubBadge 
                        club={cloudPreviewSave.clubs.find(c => c.id === cloudPreviewSave.userClubId) || cloudPreviewSave.clubs[0]} 
                        size="lg" 
                      />
                    )}
                    <div>
                      <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
                        Carreira Vinculada a {cloudPreviewSave.email}
                      </span>
                      <h4 className="text-xl font-black text-white">
                        {cloudPreviewSave.metadata?.clubName || 'Clube'}
                      </h4>
                      <span className="text-xs text-slate-300">
                        Treinador: <strong className="text-emerald-400">{cloudPreviewSave.metadata?.coachName || 'Treinador'}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[11px] text-slate-400 block">Progresso da Temporada</span>
                    <span className="text-sm font-bold text-white flex items-center sm:justify-end gap-1.5 mt-0.5">
                      <Calendar size={14} className="text-emerald-400" />
                      Rodada {cloudPreviewSave.currentRound || 1} de 38
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase">Saldo em Caixa</span>
                    <span className="font-mono font-bold text-emerald-400 text-sm">
                      {formatCurrency(cloudPreviewSave.budget || 0)}
                    </span>
                  </div>
                  <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase">Esquema Tático</span>
                    <span className="font-bold text-slate-200 text-sm">
                      {cloudPreviewSave.tactics?.formation || '4-4-2'}
                    </span>
                  </div>
                  <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
                    <span className="text-slate-400 block text-[10px] uppercase">Último Salvamento</span>
                    <span className="text-slate-300 text-xs">
                      {cloudPreviewSave.savedAt ? new Date(cloudPreviewSave.savedAt).toLocaleString('pt-BR') : 'Recentemente'}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleApplyEmailSave}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black text-sm shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 transition"
                >
                  <LogIn size={18} />
                  <span>Carregar Save do E-mail e Jogar Agora</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* MODE: CRIAR NOVA CARREIRA (4 PASSOS)                 */}
        {/* ==================================================== */}
        {modalMode === 'create' && (
          <div className="p-6 md:p-8 flex-1 overflow-y-auto space-y-6">

            {/* STEP 1: PERFIL DO TREINADOR & E-MAIL */}
            {activeStep === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <User size={18} className="text-emerald-400" />
                    Identificação do Treinador & Vínculo em Nuvem
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Crie sua identidade profissional e informe seu e-mail. Seu save ficará vinculado a ele e enviará notificações de salvamento para sua caixa de entrada.
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

                  {/* Campo de E-mail Obrigatório */}
                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Mail size={14} className="text-emerald-400" />
                        E-mail do Treinador (Para salvar progresso e sincronizar na nuvem): <span className="text-rose-400">*</span>
                      </span>
                      {isValidEmail(email) && (
                        <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 size={12} /> E-mail Válido
                        </span>
                      )}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="treinador@exemplo.com"
                      className={`w-full bg-slate-950 border rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition ${
                        isValidEmail(email) ? 'border-emerald-500/80 focus:border-emerald-400' : 'border-slate-700/80 focus:border-emerald-500'
                      }`}
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      Ao fechar o navegador ou clicar em Salvar, o Footkeep transmitirá o progresso vinculado a este endereço, permitindo upload posterior em qualquer dispositivo sem risco de cache preso.
                    </span>
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
                  <Cloud size={20} className="text-emerald-400 shrink-0" />
                  <span className="text-xs text-slate-300">
                    O save fica isolado e protegido na nuvem por e-mail, garantindo que você possa jogar com qualquer clube sem que o jogo fique preso ao time padrão anterior.
                  </span>
                </div>
              </div>
            )}

            {/* STEP 2: ESCOLHA DO CLUBE (SEM FORÇAR FLAMENGO) */}
            {activeStep === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Shield size={18} className="text-emerald-400" />
                      Selecione o Clube que Deseja Comandar
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Escolha qualquer clube da Série A do Campeonato Brasileiro para iniciar sua trajetória.
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
                            ? 'bg-emerald-950/50 border-emerald-500 ring-2 ring-emerald-500/50 shadow-lg shadow-emerald-950/40' 
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

                {selectedClub ? (
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
                ) : (
                  <div className="p-4 bg-amber-950/30 rounded-2xl border border-amber-500/30 text-center text-xs text-amber-300">
                    Nenhum clube selecionado ainda. Clique em um dos clubes acima para definir seu time!
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
                    Escolha se deseja atuar com os atletas reais da temporada oficial ou criar atletas personalizados para o clube.
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
                      <h4 className="font-bold text-white text-sm">Elenco Oficial</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        Recomendado
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Comece com o plantel completo e real do {selectedClub?.name} (21 atletas oficiais com atributos calibrados).
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
                          Nome do Jogador:
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
                  </div>
                )}
              </div>
            )}

            {/* STEP 4: ORÇAMENTO & CONFIRMAÇÃO */}
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

                {/* Financial Impact & Account Summary */}
                <div className="p-5 bg-gradient-to-br from-slate-950 to-emerald-950/40 rounded-2xl border border-emerald-500/30 space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                    <span className="text-slate-400">E-mail Vinculado:</span>
                    <span className="font-mono text-emerald-400 font-bold">{normalizeEmail(email)}</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                    <span className="text-slate-400">Clube Escolhido:</span>
                    <span className="font-bold text-white">{selectedClub?.name || 'Clube'}</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                    <span className="text-slate-400">Orçamento Base do Clube:</span>
                    <span className="font-mono text-slate-300">{formatCurrency(selectedClub?.budget || 0)}</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                    <span className="text-slate-400">Aporte de Investimento:</span>
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
        )}

        {/* Modal Footer Controls (Only in Create Mode) */}
        {modalMode === 'create' && (
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
                      if (!isValidEmail(email)) {
                        setErrorMessage('Por favor, informe um e-mail válido para sincronizar na nuvem.');
                        return;
                      }
                      if (!coachName.trim()) {
                        setCoachName(`Prof. ${firstName} ${lastName}`.trim());
                      }
                    } else if (activeStep === 2) {
                      if (!selectedClubId) {
                        setErrorMessage('Selecione um clube antes de avançar para a próxima etapa.');
                        return;
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
                    <span>Sincronizando e Preparando a Temporada...</span>
                  ) : (
                    <>
                      <Trophy size={18} />
                      <span>Confirmar Carreira e Sincronizar E-mail</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
