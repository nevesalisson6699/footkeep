import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Sparkles, 
  EyeOff, 
  Gauge, 
  ShieldCheck, 
  Flame, 
  LogOut, 
  Trash2, 
  AlertTriangle, 
  Check, 
  X, 
  Save, 
  RotateCcw,
  Sliders,
  Info,
  CheckCircle2
} from 'lucide-react';
import { FootkeepLogo } from './FootkeepLogo';

export const SETTINGS_STORAGE_KEY = 'footkeep_settings_v1';

export const DEFAULT_SETTINGS = {
  soundEffects: true,
  visualEffects: true,
  difficulty: 'normal', // 'easy' | 'normal' | 'hard'
  autoSaveOnRound: true,
  commentarySpeed: 'normal' // 'slow' | 'normal' | 'fast'
};

/**
 * Carrega as configurações salvas no localStorage ou devolve os padrões.
 */
export function getStoredSettings() {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch (err) {
    console.warn('[Footkeep Settings] Erro ao ler localStorage:', err);
    return DEFAULT_SETTINGS;
  }
}

/**
 * Salva as configurações fornecidas no localStorage.
 */
export function saveStoredSettings(newSettings) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(newSettings));
  } catch (err) {
    console.error('[Footkeep Settings] Erro ao persistir configurações:', err);
  }
}

/**
 * SettingsView - Painel Completo de Configurações do Footkeep
 *
 * @param {Function} onLogout - Callback para retornar à tela de login/início mantendo a carreira intacta
 * @param {Function} onResetCareer - Callback para apagar o save da carreira e abrir criação de novo jogo
 * @param {Object} userClub - Clube ativo na carreira (opcional para contexto)
 * @param {number} currentRound - Rodada atual da carreira (opcional)
 * @param {Object} managerProfile - Dados do treinador ativo (opcional)
 * @param {Function} onSettingsChange - Callback disparado a cada alteração de configuração
 */
export function SettingsView({
  onLogout,
  onResetCareer,
  userClub,
  currentRound = 1,
  managerProfile,
  onSettingsChange
}) {
  const [settings, setSettings] = useState(getStoredSettings);
  const [toastMessage, setToastMessage] = useState(null);
  const [isDangerModalOpen, setIsDangerModalOpen] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');

  // Garante que as configurações estejam salvas no localStorage ao montar o painel
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const current = getStoredSettings();
      saveStoredSettings(current);
    }
  }, []);

  // Persistência automática em localStorage sempre que as configurações mudam
  const updateSetting = (key, value) => {
    setSettings(prev => {
      const updated = { ...prev, [key]: value };
      saveStoredSettings(updated);
      if (onSettingsChange) {
        onSettingsChange(updated);
      }
      return updated;
    });

    // Feedback visual rápido
    setToastMessage(`Configuração atualizada com sucesso.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  // Sintetizador de áudio simulado nativo via Web Audio API para teste imediato
  const playTestTone = () => {
    if (!settings.soundEffects) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // Ré5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // Lá5
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch {
      // Ignorar caso navegador bloqueie sem interação prévia
    }
  };

  // Handler de confirmação de exclusão da carreira
  const handleConfirmReset = () => {
    if (onResetCareer) {
      onResetCareer();
    }
    setIsDangerModalOpen(false);
    setDeleteConfirmationText('');
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in max-w-4xl mx-auto">
      {/* Header com Logotipo e Título */}
      <div className="bg-slate-900/90 border border-emerald-900/40 rounded-2xl p-6 shadow-xl relative overflow-hidden backdrop-blur-sm">
        <div className="absolute -right-16 -top-16 w-56 h-56 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <FootkeepLogo size="md" variant="horizontal" subtitleText="CENTRAL DE CONFIGURAÇÕES" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-emerald-950/70 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-mono font-semibold">
              v2.1 • build 2026
            </span>
          </div>
        </div>
      </div>

      {/* Toast Alert Flutuante */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-emerald-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-2xl border border-emerald-300 animate-bounce">
          <CheckCircle2 size={18} />
          <span className="text-xs">{toastMessage}</span>
        </div>
      )}

      {/* Grid de Configurações */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* 1. Efeitos Sonoros */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 shadow-lg hover:border-slate-700 transition">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${settings.soundEffects ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-500'}`}>
                {settings.soundEffects ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  Efeitos Sonoros
                  <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${settings.soundEffects ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'}`}>
                    {settings.soundEffects ? 'Ativado' : 'Mudo'}
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Apito do árbitro, reações da torcida e cliques sonoros da interface.
                </p>
              </div>
            </div>

            {/* Toggle Switch */}
            <button
              onClick={() => {
                const nextVal = !settings.soundEffects;
                updateSetting('soundEffects', nextVal);
                if (nextVal) playTestTone();
              }}
              className={`w-13 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out relative flex items-center ${settings.soundEffects ? 'bg-emerald-500' : 'bg-slate-800'}`}
              title={settings.soundEffects ? 'Desativar Sons' : 'Ativar Sons'}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${settings.soundEffects ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </button>
          </div>

          {settings.soundEffects && (
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Canal de áudio WebAudio ativo</span>
              <button
                onClick={playTestTone}
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-500/30 px-2.5 py-1 rounded-lg transition flex items-center gap-1.5"
                title="Testar Som da interface"
              >
                <Volume2 size={13} />
                <span>Testar Som</span>
              </button>
            </div>
          )}
        </div>

        {/* 2. Efeitos Visuais & Animações */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 shadow-lg hover:border-slate-700 transition">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${settings.visualEffects ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-800 text-slate-500'}`}>
                {settings.visualEffects ? <Sparkles size={20} /> : <EyeOff size={20} />}
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  Efeitos Visuais
                  <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${settings.visualEffects ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-800 text-slate-400'}`}>
                    {settings.visualEffects ? 'Ativado' : 'Desativado'}
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Chuva de confetes em títulos, transições de placar e destaques animados.
                </p>
              </div>
            </div>

            {/* Toggle Switch */}
            <button
              onClick={() => updateSetting('visualEffects', !settings.visualEffects)}
              className={`w-13 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out relative flex items-center ${settings.visualEffects ? 'bg-amber-500' : 'bg-slate-800'}`}
              title={settings.visualEffects ? 'Desativar Animações e Confetes' : 'Ativar Animações e Confetes'}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${settings.visualEffects ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </button>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>{settings.visualEffects ? 'Animações fluidas a 60 FPS' : 'Modo de alto desempenho econômico'}</span>
            <span className="text-slate-500">Confetes & Shines</span>
          </div>
        </div>

      </div>

      {/* 3. Nível de Dificuldade do Jogo */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-2.5 mb-2">
          <Gauge size={20} className="text-emerald-400" />
          <h2 className="text-base font-bold text-white">Dificuldade da Simulação</h2>
        </div>
        <p className="text-xs text-slate-400 mb-5">
          Define a inteligência tática dos adversários, a facilidade de negociação no mercado e o rigor financeiro das diretorias.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Opção Fácil */}
          <button
            type="button"
            onClick={() => updateSetting('difficulty', 'easy')}
            className={`text-left cursor-pointer rounded-xl p-4 border transition-all duration-200 relative ${
              settings.difficulty === 'easy'
                ? 'bg-emerald-950/40 border-emerald-500 shadow-md shadow-emerald-950/50 ring-1 ring-emerald-500'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-950'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                Fácil
              </span>
              {settings.difficulty === 'easy' && <Check size={16} className="text-emerald-400 font-bold" />}
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Amador & Treinador Estrela</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Premiações financeiras +25% maiores, menor chance de lesões graves, adversários menos agressivos e mercado flexível.
            </p>
          </button>

          {/* Opção Normal */}
          <button
            type="button"
            onClick={() => updateSetting('difficulty', 'normal')}
            className={`text-left cursor-pointer rounded-xl p-4 border transition-all duration-200 relative ${
              settings.difficulty === 'normal'
                ? 'bg-blue-950/40 border-blue-500 shadow-md shadow-blue-950/50 ring-1 ring-blue-500'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-950'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/40">
                Normal
              </span>
              {settings.difficulty === 'normal' && <Check size={16} className="text-blue-400 font-bold" />}
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Padrão Série A (Recomendado)</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Equilíbrio competitivo autêntico do futebol brasileiro. Negociações realistas e inteligência tática balanceada.
            </p>
          </button>

          {/* Opção Difícil */}
          <button
            type="button"
            onClick={() => updateSetting('difficulty', 'hard')}
            className={`text-left cursor-pointer rounded-xl p-4 border transition-all duration-200 relative ${
              settings.difficulty === 'hard'
                ? 'bg-amber-950/40 border-amber-500 shadow-md shadow-amber-950/50 ring-1 ring-amber-500'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-950'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/40">
                Difícil
              </span>
              {settings.difficulty === 'hard' && <Check size={16} className="text-amber-400 font-bold" />}
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Desafio Tático / Hardcore</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Adversários adaptam marcações em tempo real, atletas cobram luvas elevadas e a diretoria pune severamente oscilações.
            </p>
          </button>

        </div>
      </div>

      {/* 4. Sessão & Gerenciamento de Carreira */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
        <div className="flex items-center gap-2.5">
          <Sliders size={20} className="text-slate-300" />
          <h2 className="text-base font-bold text-white">Sessão e Gerenciamento de Carreira</h2>
        </div>

        {/* Resumo da carreira em andamento se houver */}
        {userClub && (
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div>
              <span className="text-slate-400">Carreira Ativa: </span>
              <span className="font-bold text-white">{userClub.name}</span>
              {managerProfile?.coachName && (
                <span className="text-amber-400 ml-1.5 font-medium">({managerProfile.coachName})</span>
              )}
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <span>Rodada: <strong className="text-emerald-400">{currentRound}/30</strong></span>
              <span>Armazenamento: <strong className="text-slate-200">localStorage</strong></span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          
          {/* Botão Sair para Login */}
          <div className="border border-slate-800 bg-slate-950/40 rounded-xl p-4 flex flex-col justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <LogOut size={16} className="text-blue-400" />
                Sair para Tela de Login
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Encerra a sessão ativa sem perder o progresso. A carreira e todas as estatísticas continuam gravadas localmente.
              </p>
            </div>
            <button
              onClick={() => {
                if (onLogout) {
                  onLogout();
                } else {
                  alert('Sessão encerrada com sucesso. O progresso da carreira está seguro.');
                }
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition"
            >
              <LogOut size={14} />
              <span>Sair sem Apagar Carreira</span>
            </button>
          </div>

          {/* Botão Apagar Carreira Atual (Zona de Perigo) */}
          <div className="border border-red-900/40 bg-red-950/10 rounded-xl p-4 flex flex-col justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold text-red-300 flex items-center gap-2">
                <AlertTriangle size={16} className="text-red-400" />
                Apagar Carreira Atual
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Ação destrutiva. Exclui o arquivo de save do navegador e permite iniciar uma nova jornada do zero.
              </p>
            </div>
            <button
              onClick={() => setIsDangerModalOpen(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 hover:text-red-100 font-bold text-xs flex items-center justify-center gap-2 border border-red-500/40 transition"
            >
              <Trash2 size={14} />
              <span>Resetar e Apagar Carreira</span>
            </button>
          </div>

        </div>
      </div>

      {/* 5. Informações Técnicas e Persistência */}
      <div className="text-center text-xs text-slate-500 flex items-center justify-center gap-2">
        <Info size={14} />
        <span>Configurações persistidas em <code>localStorage('{SETTINGS_STORAGE_KEY}')</code></span>
      </div>

      {/* Modal de Confirmação Obrigatório de Exclusão */}
      {isDangerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-slate-900 border border-red-500/50 rounded-2xl max-w-md w-full p-6 shadow-2xl shadow-red-950/50 space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto border border-red-500/40">
              <AlertTriangle size={24} />
            </div>

            <div className="text-center">
              <h3 className="text-lg font-black text-white">Confirmar Exclusão de Carreira</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Você está prestes a excluir em definitivo a carreira com o <strong>{userClub?.name || 'Clube Atual'}</strong> na rodada <strong>{currentRound}</strong>. Essa ação não pode ser desfeita.
              </p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-400">
              <span className="block mb-1.5 font-semibold text-slate-200">Para prosseguir, digite <strong>APAGAR</strong> no campo abaixo:</span>
              <input
                type="text"
                value={deleteConfirmationText}
                onChange={(e) => setDeleteConfirmationText(e.target.value.toUpperCase())}
                placeholder="Digite APAGAR para liberar"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-center tracking-widest focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setIsDangerModalOpen(false);
                  setDeleteConfirmationText('');
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition"
              >
                Cancelar
              </button>
              <button
                disabled={deleteConfirmationText !== 'APAGAR'}
                onClick={handleConfirmReset}
                className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition ${
                  deleteConfirmationText === 'APAGAR'
                    ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30'
                    : 'bg-red-900/30 text-red-400/40 border border-red-900/40 cursor-not-allowed'
                }`}
              >
                <Trash2 size={14} />
                <span>Excluir Definitivamente</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
