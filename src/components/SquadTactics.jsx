import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Users, 
  Shield, 
  Swords, 
  Activity, 
  ArrowUpDown, 
  CheckCircle2, 
  AlertCircle,
  Move,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Info,
  Check,
  X
} from 'lucide-react';
import { 
  TACTICAL_ROLES, 
  getCompatibleRoles, 
  FORMATION_PRESETS 
} from '../data/tacticalRoles.js';

export function SquadTactics({ 
  squad, 
  tactics, 
  onUpdateTactics, 
  onSwapPlayers, 
  onToggleTransferList,
  onAutoLineup
}) {
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [draggingSlotIndex, setDraggingSlotIndex] = useState(null);
  const [dragCurrentPos, setDragCurrentPos] = useState(null); // { x, y } in percent
  const [roleModalData, setRoleModalData] = useState(null); // { slotIndex, player, x, y, compatibleRoles, allRoles }
  const [statusNotice, setStatusNotice] = useState('');

  const pitchRef = useRef(null);

  const starters = squad.slice(0, 11);
  const bench = squad.slice(11);

  // Active formation slots (uses customSlots if present, otherwise preset)
  const currentPreset = FORMATION_PRESETS[tactics.formation] || FORMATION_PRESETS['4-4-2'];
  const activeSlots = useMemo(() => {
    if (tactics.customSlots && Array.isArray(tactics.customSlots) && tactics.customSlots.length === 11) {
      return tactics.customSlots;
    }
    return currentPreset.slots;
  }, [tactics.customSlots, tactics.formation]);

  // Selected player and their slot index
  const selectedIndex = starters.findIndex(p => p.id === selectedPlayerId);

  // Save updated slots to parent tactics
  const saveSlots = (newSlots) => {
    onUpdateTactics({
      ...tactics,
      customSlots: newSlots
    });
    setStatusNotice('Posicionamento salvo com sucesso!');
    setTimeout(() => setStatusNotice(''), 3000);
  };

  // Reset to default formation slots
  const handleResetFormation = () => {
    const preset = FORMATION_PRESETS[tactics.formation] || FORMATION_PRESETS['4-4-2'];
    saveSlots(preset.slots);
    setSelectedPlayerId(null);
    setRoleModalData(null);
  };

  // Change formation
  const handleFormationChange = (newFormation) => {
    const preset = FORMATION_PRESETS[newFormation] || FORMATION_PRESETS['4-4-2'];
    onUpdateTactics({
      ...tactics,
      formation: newFormation,
      customSlots: preset.slots
    });
    setSelectedPlayerId(null);
    setRoleModalData(null);
  };

  // Helper to get pitch coordinates from pointer event
  const getPitchCoords = (e) => {
    if (!pitchRef.current) return null;
    const rect = pitchRef.current.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
    
    let x = ((clientX - rect.left) / rect.width) * 100;
    let y = ((clientY - rect.top) / rect.height) * 100;

    x = Math.max(8, Math.min(92, Math.round(x)));
    y = Math.max(8, Math.min(92, Math.round(y)));
    return { x, y };
  };

  // DRAG & DROP WITH POINTER EVENTS (Mobile & Desktop friendly)
  const handlePointerDownSlot = (e, index) => {
    e.stopPropagation();
    e.preventDefault();
    setDraggingSlotIndex(index);
    const coords = getPitchCoords(e);
    if (coords) setDragCurrentPos(coords);
  };

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (draggingSlotIndex === null) return;
      const coords = getPitchCoords(e);
      if (coords) setDragCurrentPos(coords);
    };

    const handlePointerUp = (e) => {
      if (draggingSlotIndex === null) return;
      const finalCoords = dragCurrentPos || getPitchCoords(e);
      const slotIdx = draggingSlotIndex;
      setDraggingSlotIndex(null);
      setDragCurrentPos(null);

      if (!finalCoords) return;

      const player = starters[slotIdx];
      const compatibleRoleCodes = getCompatibleRoles(finalCoords.x, finalCoords.y);

      // Open Role Selection Popover
      setRoleModalData({
        slotIndex: slotIdx,
        player,
        x: finalCoords.x,
        y: finalCoords.y,
        compatibleRoles: compatibleRoleCodes
      });
    };

    if (draggingSlotIndex !== null) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
      window.addEventListener('touchmove', handlePointerMove);
      window.addEventListener('touchend', handlePointerUp);
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [draggingSlotIndex, dragCurrentPos, starters]);

  // Click on pitch (Accessible repositioning for selected player without dragging)
  const handlePitchClick = (e) => {
    if (roleModalData) return;
    if (selectedPlayerId === null || selectedIndex === -1) return;

    const coords = getPitchCoords(e);
    if (!coords) return;

    const player = starters[selectedIndex];
    const compatibleRoleCodes = getCompatibleRoles(coords.x, coords.y);

    setRoleModalData({
      slotIndex: selectedIndex,
      player,
      x: coords.x,
      y: coords.y,
      compatibleRoles: compatibleRoleCodes
    });
  };

  // Confirm role & position
  const handleConfirmRole = (roleCode) => {
    if (!roleModalData) return;
    const { slotIndex, x, y } = roleModalData;
    const roleMeta = TACTICAL_ROLES[roleCode] || TACTICAL_ROLES['CM'];

    const updatedSlots = [...activeSlots];
    updatedSlots[slotIndex] = {
      ...updatedSlots[slotIndex],
      x,
      y,
      role: roleCode,
      name: roleMeta.name
    };

    saveSlots(updatedSlots);
    setRoleModalData(null);
  };

  // Click on player in list or on pitch (selection / swapping)
  const handlePlayerClick = (p) => {
    if (!selectedPlayerId) {
      setSelectedPlayerId(p.id);
    } else if (selectedPlayerId === p.id) {
      setSelectedPlayerId(null);
    } else {
      // Swap players
      onSwapPlayers(selectedPlayerId, p.id);
      setSelectedPlayerId(null);
    }
  };

  // Nudge movement with accessible arrow buttons
  const handleNudge = (dx, dy) => {
    if (selectedIndex === -1) return;
    const current = activeSlots[selectedIndex];
    const newX = Math.max(8, Math.min(92, current.x + dx));
    const newY = Math.max(8, Math.min(92, current.y + dy));

    const compatibleRoles = getCompatibleRoles(newX, newY);
    let roleCode = current.role;
    if (!compatibleRoles.includes(roleCode)) {
      roleCode = compatibleRoles[0];
    }
    const roleMeta = TACTICAL_ROLES[roleCode] || TACTICAL_ROLES['CM'];

    const updatedSlots = [...activeSlots];
    updatedSlots[selectedIndex] = {
      ...updatedSlots[selectedIndex],
      x: newX,
      y: newY,
      role: roleCode,
      name: roleMeta.name
    };

    saveSlots(updatedSlots);
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Tactical Settings Header */}
      <div className="glass-panel p-5 border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Users className="text-emerald-400" size={22} />
            <h2 className="text-xl font-bold text-white">
              Escalação e Formação Tática Interativa
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              Arrastar & Soltar Ativo
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Arraste os atletas pelo campo para reposicioná-los. Ao soltar, escolha a função tática específica daquela região.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Formation Picker */}
          <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-700/80">
            <span className="text-xs font-semibold text-slate-400">Esquema:</span>
            <select
              value={tactics.formation}
              onChange={(e) => handleFormationChange(e.target.value)}
              className="bg-transparent text-emerald-400 font-bold text-sm focus:outline-none cursor-pointer"
            >
              {Object.keys(FORMATION_PRESETS).map(f => (
                <option key={f} value={f} className="bg-slate-900 text-white">{f} ({FORMATION_PRESETS[f].name})</option>
              ))}
            </select>
          </div>

          {/* Mentality Picker */}
          <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-700/80">
            <span className="text-xs font-semibold text-slate-400">Postura:</span>
            <select
              value={tactics.mentality}
              onChange={(e) => onUpdateTactics({ ...tactics, mentality: e.target.value })}
              className={`bg-transparent font-bold text-sm focus:outline-none cursor-pointer ${
                tactics.mentality === 'Ofensiva' ? 'text-rose-400' : (tactics.mentality === 'Defensiva' ? 'text-sky-400' : 'text-amber-400')
              }`}
            >
              <option value="Defensiva" className="bg-slate-900 text-sky-400">Defensiva (Linha baixa)</option>
              <option value="Equilibrada" className="bg-slate-900 text-amber-400">Equilibrada (Padrão)</option>
              <option value="Ofensiva" className="bg-slate-900 text-rose-400">Ofensiva (Pressão e gols)</option>
            </select>
          </div>

          {/* Reset Position Button */}
          <button
            onClick={handleResetFormation}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition"
            title="Restaura as posições e funções táticas padrão deste esquema"
          >
            <RotateCcw size={14} />
            <span>Padrão</span>
          </button>

          {/* Auto-Escalar Button */}
          <button
            onClick={() => onAutoLineup && onAutoLineup(tactics.formation)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 font-bold text-xs transition shadow-sm"
            title="Escala automaticamente os melhores jogadores para cada função da formação"
          >
            <CheckCircle2 size={15} />
            <span>Auto-Escalar</span>
          </button>
        </div>
      </div>

      {/* Main Tactical Layout: 2D Pitch + Roster List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* 2D Interactive Football Pitch (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-3">
          <div 
            ref={pitchRef}
            onClick={handlePitchClick}
            className="football-pitch h-[540px] p-4 flex flex-col justify-between relative select-none touch-none cursor-crosshair overflow-hidden rounded-2xl shadow-2xl"
          >
            {/* Visual pitch markings */}
            <div className="pitch-line-half" />
            <div className="pitch-circle" />
            <div className="pitch-box-top" />
            <div className="pitch-box-bottom" />

            {/* Tactical Pins for Starters */}
            {activeSlots.map((slot, index) => {
              const player = starters[index];
              const isSelected = player && selectedPlayerId === player.id;
              const isDragging = draggingSlotIndex === index;

              // Display coordinates (live coordinates if being dragged)
              const posX = isDragging && dragCurrentPos ? dragCurrentPos.x : slot.x;
              const posY = isDragging && dragCurrentPos ? dragCurrentPos.y : slot.y;

              const roleMeta = TACTICAL_ROLES[slot.role] || TACTICAL_ROLES['CM'];

              return (
                <div
                  key={index}
                  onPointerDown={(e) => handlePointerDownSlot(e, index)}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (player) handlePlayerClick(player);
                  }}
                  style={{
                    position: 'absolute',
                    left: `${posX}%`,
                    top: `${posY}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: isDragging ? 50 : (isSelected ? 40 : 20),
                    cursor: 'grab'
                  }}
                  className={`flex flex-col items-center group transition-transform ${
                    isDragging ? 'scale-125 cursor-grabbing opacity-90' : ''
                  }`}
                  title={`${player?.name || 'Vago'} - ${roleMeta.code} (${roleMeta.name}) - Arraste para mover`}
                >
                  {/* Pin Circle Badge */}
                  <div 
                    className={`w-9 h-9 rounded-full flex flex-col items-center justify-center font-black text-xs shadow-2xl transition-all duration-150 ${
                      isSelected 
                        ? 'ring-4 ring-yellow-400 scale-125 bg-yellow-400 text-slate-950 shadow-yellow-500/50' 
                        : (isDragging 
                            ? 'ring-4 ring-emerald-400 bg-emerald-500 text-slate-950'
                            : 'bg-slate-950/95 text-white border-2 border-emerald-400 group-hover:scale-110 shadow-emerald-950/60')
                    }`}
                  >
                    <span className="leading-none text-[11px]">
                      {player ? Math.round(player.overall) : slot.role}
                    </span>
                    <span className="text-[8px] font-bold tracking-tighter uppercase opacity-85 leading-none mt-0.5">
                      {slot.role}
                    </span>
                  </div>

                  {/* Player Name and Tactical Role Card */}
                  <div className={`mt-1 px-2 py-0.5 rounded text-[10px] font-semibold whitespace-nowrap shadow-lg border text-center transition-all max-w-[95px] line-clamp-1 ${
                    isSelected 
                      ? 'bg-yellow-400 text-slate-950 border-yellow-300 font-bold'
                      : 'bg-slate-950/90 text-slate-200 border-slate-800'
                  }`}>
                    {player ? player.name.split(' ')[0] : slot.name}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Accessible Control Center & Nudge Toolbar */}
          <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300 flex items-center gap-1.5">
                <Move size={15} className="text-emerald-400" />
                Controle Acessível (Sem Arrastar)
              </span>
              {statusNotice && (
                <span className="text-emerald-400 font-semibold animate-pulse text-[11px]">
                  {statusNotice}
                </span>
              )}
            </div>

            {selectedIndex !== -1 && starters[selectedIndex] ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Atleta Selecionado:</span>
                    <span className="text-xs font-bold text-yellow-400">
                      {starters[selectedIndex].name} ({activeSlots[selectedIndex]?.role} — {activeSlots[selectedIndex]?.name})
                    </span>
                  </div>

                  {/* Direct Role Selector Button */}
                  <button
                    onClick={() => {
                      const curSlot = activeSlots[selectedIndex];
                      setRoleModalData({
                        slotIndex: selectedIndex,
                        player: starters[selectedIndex],
                        x: curSlot.x,
                        y: curSlot.y,
                        compatibleRoles: getCompatibleRoles(curSlot.x, curSlot.y)
                      });
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[11px] font-bold hover:bg-emerald-500/30 transition"
                  >
                    Alterar Função
                  </button>
                </div>

                {/* Micro Directional Nudge Keys */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  <span className="text-[11px] text-slate-400">Mover Posição:</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleNudge(-4, 0)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700"
                      title="Mover para esquerda"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => handleNudge(0, -4)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700"
                      title="Avançar no campo"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => handleNudge(0, 4)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700"
                      title="Recuar no campo"
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => handleNudge(4, 0)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700"
                      title="Mover para direita"
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400">
                💡 Dica: Clique em qualquer jogador para selecioná-lo e use as setas acima ou clique em qualquer ponto do gramado para reposicioná-lo.
              </p>
            )}
          </div>
        </div>

        {/* Squad Player Management Table (7 Cols) */}
        <div className="lg:col-span-7 glass-panel p-5 border-slate-800 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
            <div>
              <h3 className="font-bold text-slate-200 text-sm">
                Plantel do Clube ({squad.length} Atletas)
              </h3>
              <p className="text-[11px] text-slate-400">
                Os 11 primeiros da lista são os titulares escalados no gramado.
              </p>
            </div>
            <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
              11 Titulares Ativos
            </span>
          </div>

          <div className="overflow-y-auto max-h-[500px] pr-1">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-slate-400 sticky top-0 z-10">
                <tr>
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Função</th>
                  <th className="py-2.5 px-3">Nome</th>
                  <th className="py-2.5 px-3 text-center">OVR</th>
                  <th className="py-2.5 px-3 text-center">FIN</th>
                  <th className="py-2.5 px-3 text-center">PAS</th>
                  <th className="py-2.5 px-3 text-center">DEF</th>
                  <th className="py-2.5 px-3 text-center">Idade</th>
                  <th className="py-2.5 px-3 text-right">Salário</th>
                  <th className="py-2.5 px-3 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {squad.map((player, idx) => {
                  const isStarter = idx < 11;
                  const isSelected = selectedPlayerId === player.id;
                  const assignedSlot = isStarter ? activeSlots[idx] : null;

                  return (
                    <tr 
                      key={player.id}
                      onClick={() => handlePlayerClick(player)}
                      className={`cursor-pointer transition-colors ${
                        isSelected 
                          ? 'bg-yellow-500/20 text-yellow-300' 
                          : (isStarter ? 'hover:bg-slate-800/60' : 'opacity-70 hover:opacity-100 hover:bg-slate-800/40')
                      }`}
                    >
                      <td className="py-2.5 px-3 font-bold text-slate-500">
                        {idx + 1}
                      </td>
                      <td className="py-2.5 px-3">
                        {isStarter && assignedSlot ? (
                          <div className="flex items-center gap-1">
                            <span className="badge badge-pos-A font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-700">
                              {assignedSlot.role}
                            </span>
                            <span className="text-[10px] text-slate-400 hidden xl:inline">
                              {assignedSlot.name.split('-')[0]}
                            </span>
                          </div>
                        ) : (
                          <span className={`badge badge-pos-${player.position}`}>
                            {player.position}
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-slate-200 whitespace-nowrap">
                        {player.name}
                        {isStarter && (
                          <span className="ml-1.5 text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-bold">
                            TITULAR
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-center font-bold text-emerald-400">
                        {Math.round(player.overall)}
                      </td>
                      <td className="py-2.5 px-3 text-center text-slate-300">{player.fin}</td>
                      <td className="py-2.5 px-3 text-center text-slate-300">{player.pas}</td>
                      <td className="py-2.5 px-3 text-center text-slate-300">{player.def}</td>
                      <td className="py-2.5 px-3 text-center text-slate-400">{player.age}</td>
                      <td className="py-2.5 px-3 text-right text-slate-400 font-mono">
                        {formatCurrency(player.salary)}
                      </td>
                      <td className="py-2.5 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => onToggleTransferList(player.id)}
                          className={`text-[10px] px-2 py-1 rounded font-semibold border transition ${
                            player.isListed 
                              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30' 
                              : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                          }`}
                        >
                          {player.isListed ? 'Listado' : 'Vender'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>

      </div>

      {/* ROLE SELECTION MODAL (Triggered upon dropping or accessible reposition) */}
      {roleModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 overflow-hidden">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-black">
                  {roleModalData.player ? Math.round(roleModalData.player.overall) : '11'}
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">
                    Atribuir Função Tática de Campo
                  </h3>
                  <p className="text-xs text-slate-400">
                    {roleModalData.player?.name} • Região ({roleModalData.x}%, {roleModalData.y}%)
                  </p>
                </div>
              </div>

              <button
                onClick={() => setRoleModalData(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Compatible Roles List */}
            <div className="py-4 space-y-2.5">
              <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-400 block">
                Funções Táticas Compatíveis com Esta Região:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {roleModalData.compatibleRoles.map(code => {
                  const role = TACTICAL_ROLES[code];
                  if (!role) return null;

                  return (
                    <button
                      key={code}
                      onClick={() => handleConfirmRole(code)}
                      className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500 hover:bg-emerald-950/30 text-left transition group flex items-start justify-between"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-xs text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-800">
                            {role.code}
                          </span>
                          <span className="font-bold text-white text-xs group-hover:text-emerald-300">
                            {role.name}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 line-clamp-1">
                          {role.description}
                        </p>
                      </div>
                      <ChevronRight size={15} className="text-slate-600 group-hover:text-emerald-400 shrink-0 mt-1" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* All Roles Selector (in case manager wants any custom role) */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">Outras funções:</span>
              <select
                onChange={(e) => handleConfirmRole(e.target.value)}
                defaultValue=""
                className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-emerald-500"
              >
                <option value="" disabled>Escolher qualquer função...</option>
                {Object.values(TACTICAL_ROLES).map(r => (
                  <option key={r.code} value={r.code} className="bg-slate-900 text-white">
                    {r.code} — {r.name}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
