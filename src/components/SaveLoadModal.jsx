import React, { useRef } from 'react';
import { 
  X, 
  Download, 
  Upload, 
  RotateCcw, 
  Shield, 
  Check, 
  FileText 
} from 'lucide-react';

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

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="glass-panel w-full max-w-2xl border-slate-700 shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Shield className="text-emerald-400" size={22} />
            <h3 className="text-lg font-bold text-white">Gerenciamento de Jogo & Salvar Progresso</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Save & Load Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          
          {/* Export */}
          <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
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
          <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
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

        {/* Change / Pick Club Section */}
        <div className="pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between mb-3">
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

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-h-48 overflow-y-auto pr-1">
            {allClubs.map(c => {
              const isCurrent = c.id === gameState.userClubId;

              return (
                <div
                  key={c.id}
                  onClick={() => {
                    onSelectNewClub(c.id);
                    onClose();
                  }}
                  className={`p-2.5 rounded-xl border cursor-pointer transition text-center flex flex-col items-center ${
                    isCurrent 
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow' 
                      : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/80 text-slate-300'
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

      </div>
    </div>
  );
}
