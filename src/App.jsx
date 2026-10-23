import React, { useState, useEffect } from 'react';
import { INITIAL_CLUBS } from './data/initialClubs';
import { generateAllPlayers } from './data/initialPlayers';
import { 
  generateLeagueFixtures, 
  generateInitialCup, 
  advanceCupPhase, 
  calculateStandings 
} from './engine/competitionEngine';
import { simulateFullMatch } from './engine/matchSimulator';

import { Navbar } from './components/Navbar';
import { ClubDashboard } from './components/ClubDashboard';
import { SquadTactics } from './components/SquadTactics';
import { MatchView } from './components/MatchView';
import { LeagueTable } from './components/LeagueTable';
import { CupBracket } from './components/CupBracket';
import { TransfersMarket } from './components/TransfersMarket';
import { FinancesView } from './components/FinancesView';
import { SaveLoadModal } from './components/SaveLoadModal';

const STORAGE_KEY = 'footkeep_save_v1';

export function App() {
  // Main Game State
  const [clubs, setClubs] = useState([]);
  const [players, setPlayers] = useState([]);
  const [userClubId, setUserClubId] = useState('est');
  const [budget, setBudget] = useState(8500000);
  const [currentRound, setCurrentRound] = useState(1);
  const [leagueRounds, setLeagueRounds] = useState([]);
  const [cupState, setCupState] = useState(null);
  const [standings, setStandings] = useState([]);
  const [tactics, setTactics] = useState({ formation: '4-4-2', mentality: 'Equilibrada' });
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  // Initialize or load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setClubs(data.clubs || INITIAL_CLUBS);
        setPlayers(data.players || []);
        setUserClubId(data.userClubId || 'est');
        setBudget(data.budget || 8500000);
        setCurrentRound(data.currentRound || 1);
        setLeagueRounds(data.leagueRounds || []);
        setCupState(data.cupState || null);
        setTactics(data.tactics || { formation: '4-4-2', mentality: 'Equilibrada' });
        return;
      } catch (err) {
        console.error('Falha ao restaurar save:', err);
      }
    }

    // New Game Setup
    resetToNewGame('est');
  }, []);

  const resetToNewGame = (clubId = 'est') => {
    const initialClubs = [...INITIAL_CLUBS];
    const initialPlayers = generateAllPlayers(initialClubs);
    const fixtures = generateLeagueFixtures(initialClubs);
    const cup = generateInitialCup(initialClubs);
    const selectedClub = initialClubs.find(c => c.id === clubId) || initialClubs[0];

    setClubs(initialClubs);
    setPlayers(initialPlayers);
    setUserClubId(selectedClub.id);
    setBudget(selectedClub.budget);
    setCurrentRound(1);
    setLeagueRounds(fixtures);
    setCupState(cup);
    setTactics({ formation: '4-4-2', mentality: 'Equilibrada' });
    setCurrentTab('dashboard');
  };

  // Auto-recalculate standings whenever league rounds change
  useEffect(() => {
    if (clubs.length > 0 && leagueRounds.length > 0) {
      const updatedTable = calculateStandings(clubs, leagueRounds);
      setStandings(updatedTable);
    }
  }, [clubs, leagueRounds]);

  // Persist State to LocalStorage
  useEffect(() => {
    if (clubs.length > 0 && players.length > 0) {
      const stateToSave = {
        clubs,
        players,
        userClubId,
        budget,
        currentRound,
        leagueRounds,
        cupState,
        tactics
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    }
  }, [clubs, players, userClubId, budget, currentRound, leagueRounds, cupState, tactics]);

  const userClub = clubs.find(c => c.id === userClubId);
  const userSquad = players.filter(p => p.clubId === userClubId);

  // Determine current match for user:
  // Alternate between League and Cup matches if cup is active and user is still in cup!
  const getNextMatch = () => {
    // 1. Check if user has an unplayed cup match in the current phase
    if (cupState && !cupState.championId) {
      const currentPhaseMatches = cupState.phases[cupState.currentPhase]?.matches || [];
      const userCupMatch = currentPhaseMatches.find(
        m => !m.played && (m.homeId === userClubId || m.awayId === userClubId)
      );

      // If user has a cup match scheduled, give it priority every 4 league rounds
      if (userCupMatch && (currentRound % 4 === 0 || currentRound > 26)) {
        return { ...userCupMatch, type: 'cup' };
      }
    }

    // 2. Otherwise return current league round match
    const currentLeagueRound = leagueRounds.find(r => r.roundNumber === currentRound);
    if (!currentLeagueRound) return null;

    const match = currentLeagueRound.matches.find(
      m => !m.played && (m.homeId === userClubId || m.awayId === userClubId)
    );

    return match ? { ...match, type: 'league' } : null;
  };

  const nextMatch = getNextMatch();

  // Finish match handler and batch-simulate remaining matches in the round
  const handleFinishMatch = (finishedMatch) => {
    if (finishedMatch.type === 'cup') {
      // 1. Update Cup Match
      const phase = cupState.currentPhase;
      const updatedMatches = cupState.phases[phase].matches.map(m => {
        if (m.matchId === finishedMatch.matchId) {
          return finishedMatch;
        }
        if (!m.played) {
          // Simulate other AI cup matches automatically
          const hClub = clubs.find(c => c.id === m.homeId);
          const aClub = clubs.find(c => c.id === m.awayId);
          const hP = players.filter(p => p.clubId === hClub.id);
          const aP = players.filter(p => p.clubId === aClub.id);
          const sim = simulateFullMatch({ homeClub: hClub, awayClub: aClub, homePlayers: hP, awayPlayers: aP, isCup: true });
          return { ...m, ...sim };
        }
        return m;
      });

      const updatedCupState = advanceCupPhase({
        ...cupState,
        phases: {
          ...cupState.phases,
          [phase]: { ...cupState.phases[phase], matches: updatedMatches }
        }
      });

      setCupState(updatedCupState);

    } else {
      // 2. Update League Match
      const updatedRounds = leagueRounds.map(r => {
        if (r.roundNumber === currentRound) {
          const updatedMatches = r.matches.map(m => {
            if (m.homeId === finishedMatch.homeId && m.awayId === finishedMatch.awayId) {
              return finishedMatch;
            }
            if (!m.played) {
              // Simulate other AI league matches automatically
              const hClub = clubs.find(c => c.id === m.homeId);
              const aClub = clubs.find(c => c.id === m.awayId);
              const hP = players.filter(p => p.clubId === hClub.id);
              const aP = players.filter(p => p.clubId === aClub.id);
              const sim = simulateFullMatch({ homeClub: hClub, awayClub: aClub, homePlayers: hP, awayPlayers: aP, isCup: false });
              return { ...m, ...sim };
            }
            return m;
          });
          return { ...r, matches: updatedMatches };
        }
        return r;
      });

      setLeagueRounds(updatedRounds);

      // Financials: Add gate receipts if home, deduct weekly payroll
      const isHome = finishedMatch.homeId === userClubId;
      const gateIncome = isHome ? (finishedMatch.gateReceipts || 0) : 0;
      const weeklyPayroll = userSquad.reduce((sum, p) => sum + (p.salary || 0), 0);
      const sponsorIncome = Math.round((userClub?.reputation || 70) * 3500);

      const netIncome = gateIncome + sponsorIncome - weeklyPayroll;
      setBudget(prev => Math.max(0, prev + netIncome));

      // Advance round
      if (currentRound < 30) {
        setCurrentRound(prev => prev + 1);
      }
    }

    setCurrentTab('dashboard');
  };

  // Squad Swap Titular/Reserva
  const handleSwapPlayers = (id1, id2) => {
    const idx1 = players.findIndex(p => p.id === id1);
    const idx2 = players.findIndex(p => p.id === id2);
    if (idx1 === -1 || idx2 === -1) return;

    const newPlayers = [...players];
    const temp = newPlayers[idx1];
    newPlayers[idx1] = newPlayers[idx2];
    newPlayers[idx2] = temp;
    setPlayers(newPlayers);
  };

  // Toggle Player for sale
  const handleToggleTransferList = (playerId) => {
    setPlayers(prev => prev.map(p => {
      if (p.id === playerId) {
        return { ...p, isListed: !p.isListed };
      }
      return p;
    }));
  };

  // Buy Player from Market
  const handleBuyPlayer = (player) => {
    setBudget(prev => prev - player.value);
    setPlayers(prev => prev.map(p => {
      if (p.id === player.id) {
        return { ...p, clubId: userClubId, isListed: false };
      }
      return p;
    }));
  };

  // Sell Player
  const handleSellPlayer = (player) => {
    setBudget(prev => prev + player.value);
    setPlayers(prev => prev.map(p => {
      if (p.id === player.id) {
        return { ...p, clubId: null, isListed: true };
      }
      return p;
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      
      {/* Top Navbar */}
      <Navbar 
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        userClub={userClub}
        currentRound={currentRound}
        budget={budget}
        onOpenSaveModal={() => setIsSaveModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="container-app py-6 flex-1">
        {currentTab === 'dashboard' && (
          <ClubDashboard 
            userClub={userClub}
            standings={standings}
            nextMatch={nextMatch}
            allClubs={clubs}
            squad={userSquad}
            budget={budget}
            currentRound={currentRound}
            onGoToMatch={() => setCurrentTab('match')}
            onGoToTactics={() => setCurrentTab('tactics')}
            onGoToTransfers={() => setCurrentTab('transfers')}
          />
        )}

        {currentTab === 'tactics' && (
          <SquadTactics 
            squad={userSquad}
            tactics={tactics}
            onUpdateTactics={setTactics}
            onSwapPlayers={handleSwapPlayers}
            onToggleTransferList={handleToggleTransferList}
          />
        )}

        {currentTab === 'match' && (
          <MatchView 
            userClub={userClub}
            nextMatch={nextMatch}
            allClubs={clubs}
            allPlayers={players}
            tactics={tactics}
            onFinishMatch={handleFinishMatch}
          />
        )}

        {currentTab === 'league' && (
          <LeagueTable 
            standings={standings}
            userClubId={userClubId}
            allPlayers={players}
            allClubs={clubs}
          />
        )}

        {currentTab === 'cup' && (
          <CupBracket 
            cupState={cupState}
            allClubs={clubs}
            userClubId={userClubId}
          />
        )}

        {currentTab === 'transfers' && (
          <TransfersMarket 
            allPlayers={players}
            allClubs={clubs}
            userClubId={userClubId}
            budget={budget}
            onBuyPlayer={handleBuyPlayer}
            onSellPlayer={handleSellPlayer}
          />
        )}

        {currentTab === 'finances' && (
          <FinancesView 
            userClub={userClub}
            squad={userSquad}
            budget={budget}
            currentRound={currentRound}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-4 text-center text-xs text-slate-500">
        <div className="container-app flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Footkeep Football Manager © 2026 • 100% Original</span>
          <span>Pronto para publicação via Cloudflare Pages</span>
        </div>
      </footer>

      {/* Save / Load / New Game Modal */}
      <SaveLoadModal 
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        gameState={{ clubs, players, userClubId, budget, currentRound, leagueRounds, cupState, tactics }}
        onLoadSave={(savedState) => {
          setClubs(savedState.clubs);
          setPlayers(savedState.players);
          setUserClubId(savedState.userClubId);
          setBudget(savedState.budget);
          setCurrentRound(savedState.currentRound);
          setLeagueRounds(savedState.leagueRounds);
          setCupState(savedState.cupState);
          setTactics(savedState.tactics);
        }}
        onResetGame={() => resetToNewGame(userClubId)}
        allClubs={clubs}
        onSelectNewClub={(newClubId) => resetToNewGame(newClubId)}
      />

    </div>
  );
}
