import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Download, 
  Upload, 
  RotateCcw, 
  Shield, 
  Check, 
  CheckCircle2,
  FileText,
  Cloud,
  CloudUpload,
  CloudDownload,
  Mail,
  Send,
  RefreshCw,
  AlertCircle,
  Clock,
  Sparkles,
  Trash2,
  UserCheck
} from 'lucide-react';
import {
  getActiveEmail,
  setActiveEmail,
  isValidEmail,
  normalizeEmail,
  getCloudSaveByEmail,
  saveCloudProgress,
  sendSaveNotificationToEmail,
  getEmailDispatchLogs,
  listKnownEmailAccounts,
  deleteCloudSaveByEmail
} from '../services/emailSaveService';

export function SaveLoadModal({ 
  isOpen, 
  onClose, 
  gameState, 
  onLoadSave, 
  onResetGame, 
  allClubs, 
  onSelectNewClub 
}) {
  const fileInputRef = useRef(null);

  // Tabs: 'cloud' | 'json' | 'clubs'
  const [activeTab, setActiveTab] = useState('cloud');

  // Cloud & Email State
  const [currentActiveEmail, setCurrentActiveEmail] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [syncStatus, setSyncStatus] = useState(null); // { type: 'success' | 'info' | 'error', message: string, timestamp?: string }
  const [isProcessing, setIsProcessing] = useState(false);
  const [cloudPreviewSave, setCloudPreviewSave] = useState(null);
  const [knownAccounts, setKnownAccounts] = useState([]);
  const [dispatchLogs, setDispatchLogs] = useState([]);

  // Load cloud and email info when modal opens
  useEffect(() => {
    if (isOpen) {
      const active = getActiveEmail();
      setCurrentActiveEmail(active);
      setEmailInput(active || '');
      setKnownAccounts(listKnownEmailAccounts());
      setDispatchLogs(getEmailDispatchLogs());
      setCloudPreviewSave(null);
      setSyncStatus(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Active user club helper
  const userClub = allClubs?.find(c => c.id === gameState?.userClubId) || 
                   gameState?.clubs?.find(c => c.id === gameState?.userClubId);

  // ==========================================
  // Cloud & Email Handlers
  // ==========================================

  // 1. Salvar na Nuvem para o e-mail digitado
  const handleSaveToCloud = () => {
    const targetEmail = normalizeEmail(emailInput);
    if (!isValidEmail(targetEmail)) {
      setSyncStatus({
        type: 'error',
        message: 'Por favor, insira um e-mail válido para sincronizar na nuvem.'
      });
      return;
    }

    setIsProcessing(true);
    const success = saveCloudProgress(targetEmail, gameState);
    setIsProcessing(false);

    if (success) {
      setCurrentActiveEmail(targetEmail);
      setKnownAccounts(listKnownEmailAccounts());
      setSyncStatus({
        type: 'success',
        message: `Save enviado para a nuvem com sucesso para ${targetEmail}!`,
        timestamp: new Date().toLocaleTimeString('pt-BR')
      });
    } else {
      setSyncStatus({
        type: 'error',
        message: 'Falha ao salvar na nuvem. Verifique os dados da carreira.'
      });
    }
  };

  // 2. Salvar e Notificar E-mail (Requisito 3)
  const handleSaveAndNotifyEmail = async () => {
    const targetEmail = normalizeEmail(emailInput);
    if (!isValidEmail(targetEmail)) {
      setSyncStatus({
        type: 'error',
        message: 'Por favor, insira um endereço de e-mail válido antes de notificar.'
      });
      return;
    }

    setIsProcessing(true);
    setSyncStatus({
      type: 'info',
      message: `Gravando save e transmitindo confirmação para ${targetEmail}...`
    });

    // Garante primeiro o salvamento em nuvem
    saveCloudProgress(targetEmail, gameState);
    setCurrentActiveEmail(targetEmail);

    // Dispara a notificação detalhada para o e-mail
    try {
      const result = await sendSaveNotificationToEmail(targetEmail, gameState);
      setIsProcessing(false);
      setKnownAccounts(listKnownEmailAccounts());
      setDispatchLogs(getEmailDispatchLogs());

      setSyncStatus({
        type: 'success',
        message: result.message || `Notificação e save enviados com sucesso para ${targetEmail}!`,
        timestamp: result.timestamp
      });
    } catch (err) {
      setIsProcessing(false);
      setSyncStatus({
        type: 'error',
        message: 'Erro ao despachar notificação para o e-mail.'
      });
    }
  };

  // 3. Buscar Save na Nuvem por E-mail
  const handleSearchCloudSave = () => {
    const targetEmail = normalizeEmail(emailInput);
    if (!isValidEmail(targetEmail)) {
      setSyncStatus({
        type: 'error',
        message: 'Insira um e-mail válido para buscar o save na nuvem.'
      });
      return;
    }

    const found = getCloudSaveByEmail(targetEmail);
    if (found) {
      setCloudPreviewSave(found);
      setSyncStatus({
        type: 'info',
        message: `Save localizado para ${targetEmail}! Revise os dados abaixo e clique em 'Carregar na Carreira'.`
      });
    } else {
      setCloudPreviewSave(null);
      setSyncStatus({
        type: 'error',
        message: `Nenhum save em nuvem foi encontrado para o e-mail ${targetEmail}.`
      });
    }
  };

  // 4. Carregar o Save localizado na nuvem
  const handleApplyCloudSave = () => {
    if (!cloudPreviewSave) return;
    onLoadSave(cloudPreviewSave);
    setActiveEmail(cloudPreviewSave.email || emailInput);
    setSyncStatus({
      type: 'success',
      message: `Carreira carregada com sucesso a partir da nuvem!`
    });
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  // 5. Desvincular e-mail ativo
  const handleUnlinkEmail = () => {
    setActiveEmail('');
    setCurrentActiveEmail('');
    setSyncStatus({
      type: 'info',
      message: 'E-mail desvinculado da sessão atual.'
    });
  };

  // ==========================================
  // Funções Existentes de Export/Import JSON
  // ==========================================

  // Export Save to JSON file
  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(gameState, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `footkeep_save_rodada_${gameState.currentRound || 1}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import Save from JSON file
  const handleImportFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.userClubId && parsed.clubs && parsed.players) {
          onLoadSave(parsed);
          onClose();
        } else {
          alert('Arquivo de save inválido ou corrompido.');
        }
      } catch (err) {
        alert('Erro ao processar o arquivo JSON de save.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-3xl bg-slate-900 border border-slate-800 shadow-2xl rounded-3xl p-6 relative max-h-[92vh] overflow-y-auto flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Cloud className="text-emerald-400" size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white">Central de Saves & Nuvem</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                  Footkeep Cloud
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Sincronize sua carreira por e-mail, exporte arquivos .JSON ou troque de clube.
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Fechar Modal"
          >
            <X size={19} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 my-4 border-b border-slate-800 pb-2 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('cloud')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'cloud'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-slate-800'
            }`}
          >
            <Cloud size={15} />
            <span>Nuvem & Sincronização por E-mail</span>
            <span className="text-[9px] bg-slate-900/30 text-white px-1.5 py-0.2 rounded font-black uppercase">
              Principal
            </span>
          </button>

          <button
            onClick={() => setActiveTab('json')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'json'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-slate-800'
            }`}
          >
            <FileText size={15} />
            <span>Arquivos Locais (.JSON)</span>
          </button>

          <button
            onClick={() => setActiveTab('clubs')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'clubs'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-slate-800'
            }`}
          >
            <RotateCcw size={15} />
            <span>Trocar Clube / Reiniciar</span>
          </button>
        </div>

        {/* TAB 1: NUVEM & SINCRONIZAÇÃO POR E-MAIL */}
        {activeTab === 'cloud' && (
          <div className="space-y-5 animate-fadeIn">
            
            {/* Status do E-mail Vinculado Atualmente (Requisito 1) */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950/40 border border-emerald-500/30 flex flex-wrap items-center justify-between gap-3 shadow-inner">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${currentActiveEmail ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-800 text-slate-500'}`}>
                  {currentActiveEmail ? <UserCheck size={18} /> : <Mail size={18} />}
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                    1. E-mail Vinculado Atualmente:
                  </span>
                  {currentActiveEmail ? (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-emerald-300 font-mono">
                        {currentActiveEmail}
                      </span>
                      <span className="text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.2 rounded font-bold uppercase">
                        Conectado
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-amber-300 font-semibold">
                      Nenhum e-mail vinculado (o jogo está rodando apenas em memória/cache local)
                    </span>
                  )}
                </div>
              </div>

              {currentActiveEmail && (
                <button
                  onClick={handleUnlinkEmail}
                  className="text-xs font-semibold text-slate-400 hover:text-rose-400 bg-slate-800 hover:bg-slate-800/80 border border-slate-700 px-3 py-1.5 rounded-lg transition"
                  title="Desvincular e-mail ativo da sessão"
                >
                  Desvincular
                </button>
              )}
            </div>

            {/* Inserir/Digitar E-mail e Ações de Nuvem (Requisito 2 e 3) */}
            <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1.5 flex items-center justify-between">
                  <span>2. Inserir / Digitar E-mail do Treinador:</span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    Evita travamentos e bloqueio em cache local
                  </span>
                </label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  <div className="relative flex-1">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="treinador@footkeep.com"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
                    />
                  </div>

                  {/* Buscar Save na Nuvem */}
                  <button
                    onClick={handleSearchCloudSave}
                    disabled={isProcessing}
                    className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 font-bold text-xs border border-sky-500/30 transition flex items-center justify-center gap-2 shrink-0"
                    title="Buscar save salvo na nuvem com este e-mail"
                  >
                    <CloudDownload size={15} />
                    <span>Buscar na Nuvem</span>
                  </button>

                  {/* Fazer Upload do Save */}
                  <button
                    onClick={handleSaveToCloud}
                    disabled={isProcessing}
                    className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-2 shrink-0"
                    title="Salvar o estado atual da carreira na nuvem para este e-mail"
                  >
                    <CloudUpload size={15} />
                    <span>Upload na Nuvem</span>
                  </button>
                </div>
              </div>

              {/* Botão Principal: Salvar e Notificar E-mail (Requisito 3) */}
              <div className="pt-2 border-t border-slate-800/80">
                <button
                  onClick={handleSaveAndNotifyEmail}
                  disabled={isProcessing}
                  className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/25 transition transform active:scale-[0.99] flex items-center justify-center gap-2.5 border border-emerald-300/40"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw size={17} className="animate-spin text-slate-950" />
                      <span>Transmitindo Save e Notificando...</span>
                    </>
                  ) : (
                    <>
                      <Send size={17} className="text-slate-950" />
                      <span>3. Salvar e Notificar E-mail</span>
                    </>
                  )}
                </button>
                <span className="text-[11px] text-slate-400 block text-center mt-1.5">
                  Salva todo o progresso atual na nuvem e registra o comprovante de envio institucional.
                </span>
              </div>

              {/* Contas Salvas Recentemente neste dispositivo */}
              {knownAccounts.length > 0 && (
                <div className="pt-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Contas de E-mail Encontradas Neste Dispositivo:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {knownAccounts.map(acc => (
                      <button
                        key={acc.email}
                        onClick={() => {
                          setEmailInput(acc.email);
                          const save = getCloudSaveByEmail(acc.email);
                          if (save) setCloudPreviewSave(save);
                        }}
                        className={`text-xs px-2.5 py-1.5 rounded-lg border transition flex items-center gap-2 ${
                          emailInput === acc.email
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                            : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <Mail size={12} className="text-emerald-400" />
                        <span className="font-mono">{acc.email}</span>
                        <span className="text-[10px] text-slate-400">({acc.clubName || 'Clube'})</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Preview de Save Encontrado na Nuvem */}
            {cloudPreviewSave && (
              <div className="p-4 rounded-2xl bg-sky-950/30 border border-sky-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
                    <CloudCheck size={16} />
                    <span>Save de Carreira Encontrado na Nuvem</span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    Salvo em: {new Date(cloudPreviewSave.savedAt || Date.now()).toLocaleString('pt-BR')}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Clube:</span>
                    <strong className="text-white">{cloudPreviewSave.metadata?.clubName || 'Clube'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Treinador:</span>
                    <strong className="text-emerald-400">{cloudPreviewSave.metadata?.coachName || 'Treinador'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Rodada:</span>
                    <strong className="text-amber-300">{cloudPreviewSave.metadata?.currentRound || cloudPreviewSave.currentRound || 1}/38</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Formação:</span>
                    <strong className="text-slate-200">{cloudPreviewSave.tactics?.formation || '4-4-2'}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleApplyCloudSave}
                    className="flex-1 py-2 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow transition flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={15} />
                    <span>Carregar Este Save na Minha Carreira</span>
                  </button>
                  <button
                    onClick={() => setCloudPreviewSave(null)}
                    className="py-2 px-3 rounded-xl bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold"
                  >
                    Dispensar
                  </button>
                </div>
              </div>
            )}

            {/* Exibir o Status de Sincronização (Requisito 4) */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                  <RefreshCw size={14} className="text-emerald-400" />
                  4. Status de Sincronização em Tempo Real:
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                  syncStatus?.type === 'success'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : syncStatus?.type === 'error'
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}>
                  {syncStatus ? (syncStatus.type === 'success' ? 'Sincronizado' : syncStatus.type === 'error' ? 'Falha' : 'Aguardando') : (currentActiveEmail ? 'Conectado' : 'Modo Offline')}
                </span>
              </div>

              {syncStatus ? (
                <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                  syncStatus.type === 'success' 
                    ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/30'
                    : syncStatus.type === 'error'
                      ? 'bg-rose-950/40 text-rose-300 border border-rose-500/30'
                      : 'bg-sky-950/40 text-sky-300 border border-sky-500/30'
                }`}>
                  {syncStatus.type === 'success' ? (
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  ) : syncStatus.type === 'error' ? (
                    <AlertCircle size={16} className="text-rose-400 shrink-0" />
                  ) : (
                    <RefreshCw size={16} className="text-sky-400 animate-spin shrink-0" />
                  )}
                  <span className="leading-relaxed">{syncStatus.message}</span>
                  {syncStatus.timestamp && (
                    <span className="ml-auto text-[10px] opacity-75 font-mono">{syncStatus.timestamp}</span>
                  )}
                </div>
              ) : (
                <p className="text-xs text-slate-400">
                  {currentActiveEmail 
                    ? `Sessão ativa indexada para ${currentActiveEmail}. Os dados da carreira do ${userClub?.name || 'seu clube'} estão prontos para backup na nuvem.` 
                    : 'Nenhum e-mail conectado. Insira seu endereço acima para manter seu save seguro na nuvem.'}
                </p>
              )}

              {/* Último log de envio se houver */}
              {dispatchLogs.length > 0 && (
                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 truncate max-w-[80%]">
                    <Clock size={12} className="text-emerald-400 shrink-0" />
                    <span className="truncate">Última notificação: <strong>{dispatchLogs[0].subject}</strong></span>
                  </span>
                  <span className="font-mono text-[10px] text-slate-500 shrink-0">{dispatchLogs[0].displayTime}</span>
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: EXPORTAR / IMPORTAR ARQUIVOS JSON (PRESERVADO) */}
        {activeTab === 'json' && (
          <div className="animate-fadeIn space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
              
              {/* Export */}
              <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-2">
                    <Download size={18} />
                    <span>Exportar Save (Download)</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    Baixe seu progresso atual (tabelas, elenco, finanças) em um arquivo JSON local para continuar em qualquer navegador.
                  </p>
                </div>
                <button
                  onClick={handleExport}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition flex items-center justify-center gap-2"
                >
                  <Download size={15} />
                  <span>Baixar Arquivo .JSON</span>
                </button>
              </div>

              {/* Import */}
              <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-sky-400 font-bold text-sm mb-2">
                    <Upload size={18} />
                    <span>Importar Save (.JSON)</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    Restaure uma campanha anterior a partir de um arquivo salvo no seu computador.
                  </p>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImportFile} 
                  accept=".json" 
                  className="hidden" 
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition flex items-center justify-center gap-2"
                >
                  <Upload size={15} />
                  <span>Selecionar Arquivo .JSON</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: TROCAR CLUBE / REINICIAR (PRESERVADO) */}
        {activeTab === 'clubs' && (
          <div className="animate-fadeIn space-y-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-slate-200">
                Escolher Outro Clube ou Iniciar Novo Jogo
              </span>
              <button
                onClick={onResetGame}
                className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1.5 transition"
              >
                <RotateCcw size={14} />
                Reiniciar Temporada Atual
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-h-64 overflow-y-auto pr-1">
              {allClubs?.map(c => {
                const isCurrent = c.id === gameState?.userClubId;

                return (
                  <div
                    key={c.id}
                    onClick={() => {
                      onSelectNewClub(c.id);
                      onClose();
                    }}
                    className={`p-3 rounded-xl border cursor-pointer transition text-center flex flex-col items-center ${
                      isCurrent 
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow' 
                        : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/80 text-slate-300'
                    }`}
                  >
                    <span className="text-2xl mb-1">{c.badgeEmoji}</span>
                    <span className="text-xs font-bold truncate w-full">{c.name}</span>
                    <span className="text-[10px] text-slate-400">Rep. {c.reputation}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
