import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Play, 
  Pause, 
  FastForward, 
  CheckCircle2, 
  Flame, 
  Clock, 
  DollarSign, 
  Trophy,
  ArrowRight,
  Shield
} from 'lucide-react';
import { simulateFullMatch } from '../engine/matchSimulator';
import { ClubBadge } from './ClubBadge';
import { getRefereeForMatch } from '../data/refereesData.js';
import { 
  playWhistle, 
  playGoal, 
  playCard, 
  playKick, 
  playClick 
} from '../services/audioService';

export function MatchView({ 
  userClub, 
  nextMatch, 
  allClubs, 
  allPlayers, 
  tactics, 
  onFinishMatch 
}) {
  const [matchState, setMatchState] = useState('ready'); // ready, playing, finished
  const [currentMinute, setCurrentMinute] = useState(0);
  const [speed, setSpeed] = useState(1); // 1 = normal, 2 = fast, 0 = instant
  const [simulatedData, setSimulatedData] = useState(null);
  const [visibleEvents, setVisibleEvents] = useState([]);

  const timerRef = useRef(null);

  if (!nextMatch) {
    return (
      <div className="glass-panel p-12 text-center text-slate-400">
        <Trophy size={48} className="mx-auto text-yellow-500 mb-3" />
        <h2 className="text-xl font-bold text-white">Temporada Encerrada!</h2>
        <p className="text-sm mt-1">Todas as rodadas foram concluídas com sucesso.</p>
      </div>
    );
  }

  const homeClub = allClubs.find(c => c.id === nextMatch.homeId);
  const awayClub = allClubs.find(c => c.id === nextMatch.awayId);
  const isUserHome = userClub?.id === homeClub?.id;

  // Prepare full simulation when entering ready state
  useEffect(() => {
    if (nextMatch && homeClub && awayClub) {
      const homePlayers = allPlayers.filter(p => p.clubId === homeClub.id);
      const awayPlayers = allPlayers.filter(p => p.clubId === awayClub.id);

      const sim = simulateFullMatch({
        homeClub,
        awayClub,
        homePlayers,
        awayPlayers,
        homeTactics: isUserHome ? tactics : { formation: '4-4-2', mentality: 'Equilibrada' },
        awayTactics: !isUserHome ? tactics : { formation: '4-4-2', mentality: 'Equilibrada' },
        isCup: nextMatch.type === 'cup',
        matchId: nextMatch.matchId || `${homeClub.id}_${awayClub.id}`
      });

      setSimulatedData(sim);
      setCurrentMinute(0);
      setVisibleEvents([]);
      setMatchState('ready');
    }
  }, [nextMatch?.matchId || nextMatch?.homeId + nextMatch?.awayId]);

  // Clock ticker
  useEffect(() => {
    if (matchState === 'playing') {
      const intervalMs = speed === 1 ? 250 : (speed === 2 ? 80 : 0);

      if (speed === 0) {
        // Instant simulation
        setCurrentMinute(90);
        setVisibleEvents(simulatedData.events);
        finishGame();
        return;
      }

      timerRef.current = setInterval(() => {
        setCurrentMinute(prev => {
          const next = prev + 1;

          // Reveal events that occurred up to this minute and trigger audio cues
          if (simulatedData) {
            const currentEvents = simulatedData.events.filter(e => e.minute === next);
            currentEvents.forEach(ev => {
              if (ev.type === 'goal') {
                playGoal();
              } else if (ev.type === 'card_yellow') {
                playCard('yellow');
              } else if (ev.type === 'card_red') {
                playCard('red');
              } else if (ev.type === 'miss') {
                playKick();
              }
            });

            const upToNow = simulatedData.events.filter(e => e.minute <= next);
            setVisibleEvents(upToNow);
          }

          if (next >= 90) {
            clearInterval(timerRef.current);
            finishGame();
            return 90;
          }
          return next;
        });
      }, intervalMs);

      return () => clearInterval(timerRef.current);
    }
  }, [matchState, speed, simulatedData]);

  const finishGame = () => {
    setMatchState('finished');
    playWhistle('end'); // Apito final da partida (três silvos)
    if (simulatedData) {
      setVisibleEvents(simulatedData.events);
      // Trigger victory celebration if user won
      const userWon = (isUserHome && simulatedData.homeScore > simulatedData.awayScore) ||
                      (!isUserHome && simulatedData.awayScore > simulatedData.homeScore) ||
                      (simulatedData.winnerId === userClub?.id);

      if (userWon) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handleStartPlay = () => {
    if (matchState === 'ready' || matchState === 'paused') {
      if (matchState === 'ready' && currentMinute === 0) {
        playWhistle('start'); // Apito de início do jogo
      } else {
        playClick();
      }
      setMatchState('playing');
    } else if (matchState === 'playing') {
      playClick();
      setMatchState('paused');
    }
  };

  const handleAdvance = () => {
    playClick();
    if (simulatedData) {
      onFinishMatch({
        ...nextMatch,
        ...simulatedData
      });
    }
  };

  // Current live score
  const currentHomeScore = visibleEvents.filter(e => e.type === 'goal' && e.clubId === homeClub?.id).length;
  const currentAwayScore = visibleEvents.filter(e => e.type === 'goal' && e.clubId === awayClub?.id).length;

  const activeReferee = simulatedData?.referee || getRefereeForMatch(nextMatch?.matchId || `${nextMatch?.homeId}_${nextMatch?.awayId}`, nextMatch?.type === 'cup');

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Stadium Scoreboard Header */}
      <div className="glass-panel p-6 md:p-8 border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs text-slate-400">
          <span className="font-semibold uppercase tracking-wider text-emerald-400">
            {nextMatch.type === 'cup' ? 'Copa Footkeep Mata-Mata' : 'Liga Nacional Série A'}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-sm bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
            <Clock size={15} className="text-emerald-400" />
            {currentMinute}' {matchState === 'finished' ? '(FIM DE JOGO)' : ''}
          </span>
        </div>

        {/* Scoreboard */}
        <div className="py-6 flex items-center justify-between gap-4">
          
          {/* Home Club */}
          <div className="flex-1 flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <ClubBadge club={homeClub} size="xl" className="shadow-2xl" />
            <div>
              <h2 className="text-lg md:text-2xl font-black text-white">{homeClub?.name}</h2>
              <span className="text-xs text-slate-400">MANDANTE {isUserHome ? '(SEU TIME)' : ''}</span>
            </div>
          </div>

          {/* Central Score Digits */}
          <div className="flex flex-col items-center px-4">
            <div className="flex items-center gap-3 font-teko text-5xl md:text-7xl font-black tracking-wider text-white">
              <span className="w-14 text-right text-emerald-400">{currentHomeScore}</span>
              <span className="text-slate-600">:</span>
              <span className="w-14 text-left text-emerald-400">{currentAwayScore}</span>
            </div>
            
            {simulatedData?.homePenalties !== null && matchState === 'finished' && (
              <span className="text-xs font-bold text-yellow-400 mt-1">
                Pênaltis: {simulatedData.homePenalties} x {simulatedData.awayPenalties}
              </span>
            )}
          </div>

          {/* Away Club */}
          <div className="flex-1 flex flex-col md:flex-row-reverse items-center gap-4 text-center md:text-right">
            <ClubBadge club={awayClub} size="xl" className="shadow-2xl" />
            <div>
              <h2 className="text-lg md:text-2xl font-black text-white">{awayClub?.name}</h2>
              <span className="text-xs text-slate-400">VISITANTE {!isUserHome ? '(SEU TIME)' : ''}</span>
            </div>
          </div>

        </div>

        {/* Timeline Progress Bar */}
        <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
          <div 
            className="bg-emerald-500 h-full transition-all duration-300"
            style={{ width: `${(currentMinute / 90) * 100}%` }}
          />
        </div>

        {/* Controls Toolbar */}
        <div className="pt-6 mt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {matchState !== 'finished' ? (
              <button
                onClick={handleStartPlay}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 transition"
              >
                {matchState === 'playing' ? <Pause size={18} /> : <Play size={18} />}
                <span>{matchState === 'playing' ? 'Pausar' : 'Iniciar Narração'}</span>
              </button>
            ) : (
              <button
                onClick={handleAdvance}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 transition animate-pulse"
              >
                <span>Confirmar & Avançar Rodada</span>
                <ArrowRight size={18} />
              </button>
            )}

            {matchState !== 'finished' && (
              <div className="flex items-center bg-slate-900 rounded-xl p-1 border border-slate-800">
                <button
                  onClick={() => setSpeed(1)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${speed === 1 ? 'bg-slate-800 text-emerald-400' : 'text-slate-400'}`}
                >
                  1x
                </button>
                <button
                  onClick={() => setSpeed(2)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${speed === 2 ? 'bg-slate-800 text-emerald-400' : 'text-slate-400'}`}
                >
                  2x
                </button>
                <button
                  onClick={() => {
                    setSpeed(0);
                    setCurrentMinute(90);
                    if (simulatedData) {
                      setVisibleEvents(simulatedData.events);
                      finishGame();
                    }
                  }}
                  className="px-3 py-1 rounded-lg text-xs font-bold text-yellow-400 hover:bg-slate-800 transition"
                >
                  Instantâneo
                </button>
              </div>
            )}
          </div>

          {/* Gate receipts if user is home */}
          {isUserHome && simulatedData && (
            <div className="text-xs text-slate-300 bg-slate-900/80 px-3.5 py-1.5 rounded-xl border border-slate-800 flex items-center gap-2">
              <DollarSign size={14} className="text-emerald-400" />
              <span>Renda de Bilheteria: <b className="text-white">R$ {simulatedData.gateReceipts?.toLocaleString('pt-BR')}</b> ({simulatedData.attendance?.toLocaleString('pt-BR')} torcedores)</span>
            </div>
          )}
        </div>
      </div>

      {/* Play-by-Play Narrative Commentary & Match Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Narrative Live Feed (2 Cols) */}
        <div className="lg:col-span-2 glass-panel p-5 border-slate-800 flex flex-col h-[400px]">
          <h3 className="text-sm font-bold text-slate-200 pb-3 border-b border-slate-800 flex items-center gap-2">
            <Flame size={16} className="text-emerald-400" />
            Lances Principais e Narração ao Vivo
          </h3>

          <div className="flex-1 overflow-y-auto space-y-3 pt-3 pr-2 scrollbar-thin">
            {visibleEvents.length === 0 ? (
              <div className="h-full flex items-center justify-center text-xs text-slate-500">
                A bola ainda vai rolar. Clique em "Iniciar Narração" para acompanhar o jogo!
              </div>
            ) : (
              [...visibleEvents].reverse().map((ev, i) => {
                const isGoal = ev.type === 'goal';
                const isRed = ev.type === 'card_red';
                const isYellow = ev.type === 'card_yellow';

                return (
                  <div 
                    key={i} 
                    className={`p-3 rounded-xl border flex items-start gap-3 transition-all ${
                      isGoal 
                        ? 'bg-emerald-950/40 border-emerald-500/50 shadow-lg shadow-emerald-950/40' 
                        : (isRed
                            ? 'bg-rose-950/40 border-rose-500/50 shadow-lg shadow-rose-950/30'
                            : (isYellow ? 'bg-amber-950/20 border-amber-500/30' : 'bg-slate-900/60 border-slate-800/80'))
                    }`}
                  >
                    <span className="font-mono text-xs font-bold text-emerald-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {ev.minute}'
                    </span>
                    <div className="flex-1 text-xs">
                      {isGoal && (
                        <span className="font-bold text-emerald-400 uppercase tracking-wide block mb-0.5">
                          ⚽ GOL DO {ev.clubName}! ({ev.homeScore} x {ev.awayScore})
                        </span>
                      )}
                      {isRed && (
                        <span className="font-bold text-rose-400 uppercase tracking-wide block mb-0.5">
                          🟥 CARTÃO VERMELHO ({ev.clubName})
                        </span>
                      )}
                      {isYellow && (
                        <span className="font-bold text-amber-400 uppercase tracking-wide block mb-0.5">
                          🟨 CARTÃO AMARELO ({ev.clubName})
                        </span>
                      )}
                      <p className="text-slate-200 leading-relaxed">{ev.text}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Match Statistics */}
        <div className="glass-panel p-5 border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-200 pb-3 border-b border-slate-800">
            Estatísticas da Partida
          </h3>

          {/* Possession Bar */}
          <div>
            <div className="flex justify-between text-xs text-slate-300 font-semibold mb-1">
              <span>{simulatedData?.possession.home || 50}%</span>
              <span className="text-slate-400 text-[11px]">Posse de Bola</span>
              <span>{simulatedData?.possession.away || 50}%</span>
            </div>
            <div className="h-2 bg-slate-900 rounded-full flex overflow-hidden border border-slate-800">
              <div 
                className="bg-emerald-500 h-full" 
                style={{ width: `${simulatedData?.possession.home || 50}%` }}
              />
              <div 
                className="bg-sky-500 h-full" 
                style={{ width: `${simulatedData?.possession.away || 50}%` }}
              />
            </div>
          </div>

          {/* Quick Stats Summary */}
          <div className="space-y-3 pt-2 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="font-bold text-white">
                {visibleEvents.filter(e => (e.type === 'goal' || e.type === 'miss') && e.clubId === homeClub?.id).length}
              </span>
              <span className="text-slate-400">Chances Criadas</span>
              <span className="font-bold text-white">
                {visibleEvents.filter(e => (e.type === 'goal' || e.type === 'miss') && e.clubId === awayClub?.id).length}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="font-bold text-emerald-400">{currentHomeScore}</span>
              <span className="text-slate-400">Gols Marcados</span>
              <span className="font-bold text-emerald-400">{currentAwayScore}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="font-bold text-amber-400">
                {visibleEvents.filter(e => e.type === 'card_yellow' && e.clubId === homeClub?.id).length}
              </span>
              <span className="text-slate-400">Cartões Amarelos</span>
              <span className="font-bold text-amber-400">
                {visibleEvents.filter(e => e.type === 'card_yellow' && e.clubId === awayClub?.id).length}
              </span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="font-bold text-rose-500">
                {visibleEvents.filter(e => e.type === 'card_red' && e.clubId === homeClub?.id).length}
              </span>
              <span className="text-slate-400">Cartões Vermelhos</span>
              <span className="font-bold text-rose-500">
                {visibleEvents.filter(e => e.type === 'card_red' && e.clubId === awayClub?.id).length}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Official Match Officiating Crew & CBF Referee History */}
      <div className="glass-panel p-5 md:p-6 border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Shield size={18} />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">
                Equipe Oficial de Arbitragem (CBF / Quadro FIFA)
              </h3>
              <p className="text-[11px] text-slate-400">
                Designação oficial e histórico disciplinar auditado na competição
              </p>
            </div>
          </div>

          <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-700 self-start sm:self-auto">
            {activeReferee ? `${activeReferee.federation} • ${activeReferee.badgeCategory}` : 'Designação em Processamento'}
          </span>
        </div>

        {activeReferee ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Main Referee Profile & History (7 Cols) */}
            <div className="lg:col-span-7 space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                    Árbitro Principal
                  </span>
                  <h4 className="text-base font-black text-white">
                    {activeReferee.name}
                  </h4>
                  <span className="text-xs text-slate-400">
                    Federação: <b className="text-slate-200">{activeReferee.federation}</b> • Categoria: <b className="text-emerald-400">{activeReferee.badgeCategory}</b>
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Estilo de Arbitragem</span>
                  <span className="text-xs font-bold text-amber-400 capitalize">
                    {activeReferee.styleKey || 'Equilibrado'}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/60">
                "{activeReferee.profileSummary}"
              </p>

              {/* Verified Career Statistics Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center">
                <div className="bg-slate-900/90 p-2 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Jogos na Temporada</span>
                  <span className="text-sm font-black text-white font-mono">{activeReferee.seasonMatches}</span>
                  <span className="text-[9px] text-slate-500 block">({activeReferee.careerMatches} total)</span>
                </div>
                <div className="bg-slate-900/90 p-2 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Média de Faltas</span>
                  <span className="text-sm font-black text-emerald-400 font-mono">{activeReferee.avgFoulsPerMatch}</span>
                  <span className="text-[9px] text-slate-500 block">por partida</span>
                </div>
                <div className="bg-slate-900/90 p-2 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Cartões Amarelos</span>
                  <span className="text-sm font-black text-amber-400 font-mono">{activeReferee.avgYellowsPerMatch}</span>
                  <span className="text-[9px] text-slate-500 block">por partida</span>
                </div>
                <div className="bg-slate-900/90 p-2 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Pênaltis Marcados</span>
                  <span className="text-sm font-black text-sky-400 font-mono">{activeReferee.penaltiesAwarded}</span>
                  <span className="text-[9px] text-slate-500 block">assinalados</span>
                </div>
              </div>
            </div>

            {/* Field Assistants and VAR Crew (5 Cols) */}
            <div className="lg:col-span-5 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Equipe de Campo & Arbitragem de Vídeo (VAR)
                </span>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/60">
                    <span className="text-slate-400">Assistente 1:</span>
                    <span className="font-semibold text-slate-200">{activeReferee.assistantPairs?.assistant1 || 'Em definição CBF'}</span>
                  </div>
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/60">
                    <span className="text-slate-400">Assistente 2:</span>
                    <span className="font-semibold text-slate-200">{activeReferee.assistantPairs?.assistant2 || 'Em definição CBF'}</span>
                  </div>
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/60">
                    <span className="text-slate-400">Quarto Árbitro:</span>
                    <span className="font-semibold text-slate-200">{activeReferee.assistantPairs?.fourthOfficial || 'Quarto árbitro local'}</span>
                  </div>
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/60">
                    <span className="text-slate-400">Árbitro de Vídeo (VAR):</span>
                    <span className="font-semibold text-purple-400">{activeReferee.assistantPairs?.varOfficial || 'Central do VAR CBF'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Assistente de VAR (AVAR):</span>
                    <span className="font-semibold text-slate-300">{activeReferee.assistantPairs?.avarOfficial || 'Homologado'}</span>
                  </div>
                </div>
              </div>

              {/* Verified Source Disclaimer */}
              <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-500">
                ℹ️ <b>Fonte Verificada:</b> {activeReferee.source} ({activeReferee.consultationDate}). Estatísticas oficiais consolidadas.
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-slate-900/50 rounded-2xl border border-dashed border-slate-800 text-center text-xs text-slate-400">
            Escalação da equipe de arbitragem em processamento pela comissão organizadora da CBF.
          </div>
        )}
      </div>

    </div>
  );
}
