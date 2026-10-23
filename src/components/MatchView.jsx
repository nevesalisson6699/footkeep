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
  ArrowRight
} from 'lucide-react';
import { simulateFullMatch } from '../engine/matchSimulator';

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
        isCup: nextMatch.type === 'cup'
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

          // Reveal events that occurred up to this minute
          if (simulatedData) {
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
      setMatchState('playing');
    } else if (matchState === 'playing') {
      setMatchState('paused');
    }
  };

  const handleAdvance = () => {
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
            <div 
              className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-4xl shadow-xl border-2"
              style={{ backgroundColor: homeClub?.colors.primary, borderColor: '#ffffff33' }}
            >
              {homeClub?.badgeEmoji}
            </div>
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
            <div 
              className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-4xl shadow-xl border-2"
              style={{ backgroundColor: awayClub?.colors.primary, borderColor: '#ffffff33' }}
            >
              {awayClub?.badgeEmoji}
            </div>
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
                  onClick={() => setSpeed(0)}
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
                const isCard = ev.type === 'card_yellow' || ev.type === 'card_red';

                return (
                  <div 
                    key={i} 
                    className={`p-3 rounded-xl border flex items-start gap-3 transition-all ${
                      isGoal 
                        ? 'bg-emerald-950/40 border-emerald-500/50 shadow-lg shadow-emerald-950/40' 
                        : (isCard ? 'bg-amber-950/20 border-amber-500/30' : 'bg-slate-900/60 border-slate-800/80')
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
              <span className="font-bold text-white">{visibleEvents.filter(e => e.clubId === homeClub?.id).length}</span>
              <span className="text-slate-400">Chances Criadas</span>
              <span className="font-bold text-white">{visibleEvents.filter(e => e.clubId === awayClub?.id).length}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="font-bold text-emerald-400">{currentHomeScore}</span>
              <span className="text-slate-400">Gols Marcados</span>
              <span className="font-bold text-emerald-400">{currentAwayScore}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="font-bold text-amber-400">
                {visibleEvents.filter(e => e.type === 'card_yellow' && e.clubId === homeClub?.id).length}
              </span>
              <span className="text-slate-400">Cartões Amarelos</span>
              <span className="font-bold text-amber-400">
                {visibleEvents.filter(e => e.type === 'card_yellow' && e.clubId === awayClub?.id).length}
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
