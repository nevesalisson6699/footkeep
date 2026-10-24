import React, { useState, useEffect } from 'react';
import { REAL_CLUBS } from './data/realClubs';
import { INITIAL_CLUBS } from './data/initialClubs';
import { buildRealPlayers } from './data/realPlayers';
import { generateAllPlayers, sortSquadForFormation } from './data/initialPlayers';
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
import { SettingsView } from './components/SettingsView';
import { SaveLoadModal } from './components/SaveLoadModal';
import { CareerCreationModal } from './components/CareerCreationModal';

const STORAGE_KEY = 'footkeep_save_v1';

export const CUP_SCHEDULE = {
  oitavas: 7,   // League Round 7
  quartas: 14,  // League Round 14
  semi: 21,     // League Round 21
  final: 28     // League Round 28
};

export function App() {
  // Main Game State
  const [clubs, setClubs] = useState([]);
  const [players, setPlayers] = useState([]);
  const [userClubId, setUserClubId] = useState('fla');
  const [budget, setBudget] = useState(38000000);
  const [currentRound, setCurrentRound] = useState(1);
  const [leagueRounds, setLeagueRounds] = useState([]);
  const [cupState, setCupState] = useState(null);
  const [standings, setStandings] = useState([]);
  const [tactics, setTactics] = useState({ formation: '4-4-2', mentality: 'Equilibrada' });
  const [awardedPrizes, setAwardedPrizes] = useState([]);
  const [managerProfile, setManagerProfile] = useState(null);
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isCareerModalOpen, setIsCareerModalOpen] = useState(false);

  // Initialize or load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        const rawClubs = data.clubs || REAL_CLUBS;
        // Merge metadata to ensure existing saves get updated badgeUrl and colors
        const loadedClubs = rawClubs.map(c => {
          const fresh = REAL_CLUBS.find(rc => rc.id === c.id);
          return fresh ? { ...c, badgeUrl: fresh.badgeUrl || `/badges/${c.id}.svg`, colors: fresh.colors || c.colors } : c;
        });
        setClubs(loadedClubs);
        
        // Auto-heal squad order for older saves where starting 11 had 0 M or 0 A
        let loadedPlayers = data.players || [];
        const activeUserClubId = data.userClubId || loadedClubs[0]?.id || 'fla';
        const userSquadSlice = loadedPlayers.filter(p => p.clubId === activeUserClubId).slice(0, 11);
        const hasMid = userSquadSlice.some(p => p.position === 'M');
        const hasAtk = userSquadSlice.some(p => p.position === 'A');

        if (!hasMid || !hasAtk) {
          const healed = [];
          loadedClubs.forEach(c => {
            const clubSquad = loadedPlayers.filter(p => p.clubId === c.id);
            healed.push(...sortSquadForFormation(clubSquad, data.tactics?.formation || '4-4-2'));
          });
          healed.push(...loadedPlayers.filter(p => !p.clubId));
          loadedPlayers = healed;
        }

        setPlayers(loadedPlayers);
        setUserClubId(activeUserClubId);
        setBudget(data.budget || 38000000);
        setCurrentRound(data.currentRound || 1);
        setLeagueRounds(data.leagueRounds || []);
        setCupState(data.cupState || null);
        setTactics(data.tactics || { formation: '4-4-2', mentality: 'Equilibrada' });
        setAwardedPrizes(data.awardedPrizes || []);
        
        // Manager profile fallback for existing saves
        const activeClub = loadedClubs.find(c => c.id === activeUserClubId);
        setManagerProfile(data.managerProfile || {
          firstName: 'Treinador',
          lastName: 'Footkeep',
          coachName: `Prof. ${activeClub?.name || 'Footkeep'}`,
          coachStyle: 'Ofensivo & Pressão',
          rosterChoice: 'real',
          investmentOption: 'none',
          investmentAmount: 0
        });
        return;
      } catch (err) {
        console.error('Falha ao restaurar save:', err);
      }
    }

    // First time opening the game: Open career creation modal!
    initDefaultCareer();
    setIsCareerModalOpen(true);
  }, []);

  const initDefaultCareer = (targetClubId = 'fla') => {
    const initialClubs = [...REAL_CLUBS];
    const initialPlayers = buildRealPlayers();
    const fixtures = generateLeagueFixtures(initialClubs);
    const cup = generateInitialCup(initialClubs);
    const selectedClub = initialClubs.find(c => c.id === targetClubId) || initialClubs[0];

    setClubs(initialClubs);
    setPlayers(initialPlayers);
    setUserClubId(selectedClub.id);
    setBudget(selectedClub.budget);
    setCurrentRound(1);
    setLeagueRounds(fixtures);
    setCupState(cup);
    setTactics({ formation: '4-4-2', mentality: 'Equilibrada' });
    setAwardedPrizes([]);
    setManagerProfile({
      firstName: 'Treinador',
      lastName: 'Footkeep',
      coachName: `Prof. ${selectedClub.name}`,
      coachStyle: 'Ofensivo & Pressão',
      rosterChoice: 'real',
      investmentOption: 'none',
      investmentAmount: 0
    });
    setCurrentTab('dashboard');
  };

  // Start a new career from the Career Creation Modal
  const handleStartCareer = (careerConfig) => {
    const chosenClubs = careerConfig.leagueMode === 'classic' ? [...INITIAL_CLUBS] : [...REAL_CLUBS];
    let allPlayers = careerConfig.leagueMode === 'classic' ? generateAllPlayers(chosenClubs) : buildRealPlayers();
    const targetClubId = careerConfig.selectedClubId || chosenClubs[0].id;
    const selectedClub = chosenClubs.find(c => c.id === targetClubId) || chosenClubs[0];

    // If custom players were created, add them to the chosen club
    if (careerConfig.customPlayers && careerConfig.customPlayers.length > 0) {
      const customSquad = careerConfig.customPlayers.map(p => ({
        ...p,
        clubId: targetClubId
      }));

      // Get real players of this club
      const existingClubPlayers = allPlayers.filter(p => p.clubId === targetClubId);
      const otherPlayers = allPlayers.filter(p => p.clubId !== targetClubId);

      // Keep enough real players to complement the custom players up to 21
      const neededFromReal = Math.max(0, 21 - customSquad.length);
      const sortedReal = [...existingClubPlayers].sort((a, b) => b.overall - a.overall);
      const keptRealPlayers = sortedReal.slice(0, neededFromReal);

      // Combine and balance
      const mergedSquad = [...customSquad, ...keptRealPlayers];
      const balancedSquad = sortSquadForFormation(mergedSquad, '4-4-2');

      allPlayers = [...balancedSquad, ...otherPlayers];
    }

    const fixtures = generateLeagueFixtures(chosenClubs);
    const cup = generateInitialCup(chosenClubs);

    setClubs(chosenClubs);
    setPlayers(allPlayers);
    setUserClubId(selectedClub.id);
    setBudget(careerConfig.initialBudget || selectedClub.budget);
    setCurrentRound(1);
    setLeagueRounds(fixtures);
    setCupState(cup);
    setTactics({ formation: '4-4-2', mentality: 'Equilibrada' });
    setAwardedPrizes([]);
    setManagerProfile(careerConfig.managerProfile);
    setIsCareerModalOpen(false);
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
        tactics,
        awardedPrizes,
        managerProfile
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    }
  }, [clubs, players, userClubId, budget, currentRound, leagueRounds, cupState, tactics, awardedPrizes, managerProfile]);

  const userClub = clubs.find(c => c.id === userClubId) || clubs[0];
  const userSquad = players.filter(p => p.clubId === userClubId);

  // Determine current match for user:
  // Schedules Cup phases at specific season milestones (Rounds 7, 14, 21, 28)
  const getNextMatch = () => {
    // 1. Check if user has an unplayed cup match in the current phase that has reached its scheduled milestone
    if (cupState && !cupState.championId) {
      const currentPhase = cupState.currentPhase;
      const scheduledRound = CUP_SCHEDULE[currentPhase] || 28;

      if (currentRound >= scheduledRound) {
        const currentPhaseMatches = cupState.phases[currentPhase]?.matches || [];
        const userCupMatch = currentPhaseMatches.find(
          m => !m.played && (m.homeId === userClubId || m.awayId === userClubId)
        );

        if (userCupMatch) {
          return { ...userCupMatch, type: 'cup' };
        }
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
          const hP = players.filter(p => p.clubId === hClub?.id);
          const aP = players.filter(p => p.clubId === aClub?.id);
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

      // Financials for Cup match: Ticket income if user is home
      const isHome = finishedMatch.homeId === userClubId;
      const gateIncome = isHome ? (finishedMatch.gateReceipts || 0) : 0;
      let cupPrize = 0;
      const newPrizes = [];

      // Check if user won the Cup Championship
      if (updatedCupState.championId === userClubId) {
        if (!awardedPrizes.some(p => p.id === 'cup_champion')) {
          cupPrize = 10000000; // R$ 10.000.000
          newPrizes.push({
            id: 'cup_champion',
            title: 'Campeão da Copa Footkeep',
            amount: 10000000,
            round: currentRound
          });
        }
      }

      setBudget(prev => prev + gateIncome + cupPrize);
      if (newPrizes.length > 0) {
        setAwardedPrizes(prev => [...prev, ...newPrizes]);
      }

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
              const hP = players.filter(p => p.clubId === hClub?.id);
              const aP = players.filter(p => p.clubId === aClub?.id);
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

      // Recalculate standings with this round completed
      const newStandings = calculateStandings(clubs, updatedRounds);
      setStandings(newStandings);

      let leaguePrizes = 0;
      const newPrizes = [];

      // Award league prizes at the conclusion of the season (round 30)
      if (currentRound >= 30) {
        const userPosition = newStandings.findIndex(s => s.clubId === userClubId) + 1;

        // 1st Place: League Champion (R$ 15.000.000)
        if (userPosition === 1 && !awardedPrizes.some(p => p.id === 'league_champion')) {
          leaguePrizes += 15000000;
          newPrizes.push({
            id: 'league_champion',
            title: 'Campeão da Liga Nacional (1º Lugar)',
            amount: 15000000,
            round: 30
          });
        }

        // Top 4: G4 Qualification (R$ 6.000.000)
        if (userPosition >= 1 && userPosition <= 4 && !awardedPrizes.some(p => p.id === 'league_g4')) {
          leaguePrizes += 6000000;
          newPrizes.push({
            id: 'league_g4',
            title: 'Classificação para o G4',
            amount: 6000000,
            round: 30
          });
        }
      }

      setBudget(prev => Math.max(0, prev + netIncome + leaguePrizes));
      if (newPrizes.length > 0) {
        setAwardedPrizes(prev => [...prev, ...newPrizes]);
      }

      // Check if any AI cup matches should run (if user is eliminated from cup but milestone round reached)
      if (cupState && !cupState.championId) {
        const curPhase = cupState.currentPhase;
        const phaseMilestone = CUP_SCHEDULE[curPhase] || 30;
        if (currentRound >= phaseMilestone) {
          const phaseMatches = cupState.phases[curPhase]?.matches || [];
          const hasUserInPhase = phaseMatches.some(m => !m.played && (m.homeId === userClubId || m.awayId === userClubId));
          const hasUnplayed = phaseMatches.some(m => !m.played);
          
          if (!hasUserInPhase && hasUnplayed) {
            // Auto-simulate AI cup matches for this phase
            const simCupMatches = phaseMatches.map(m => {
              if (m.played) return m;
              const hClub = clubs.find(c => c.id === m.homeId);
              const aClub = clubs.find(c => c.id === m.awayId);
              const hP = players.filter(p => p.clubId === hClub?.id);
              const aP = players.filter(p => p.clubId === aClub?.id);
              const sim = simulateFullMatch({ homeClub: hClub, awayClub: aClub, homePlayers: hP, awayPlayers: aP, isCup: true });
              return { ...m, ...sim };
            });
            const updatedCup = advanceCupPhase({
              ...cupState,
              phases: {
                ...cupState.phases,
                [curPhase]: { ...cupState.phases[curPhase], matches: simCupMatches }
              }
            });
            setCupState(updatedCup);
          }
        }
      }

      // Advance round
      if (currentRound < 30) {
        setCurrentRound(prev => prev + 1);
      }
    }

    setCurrentTab('dashboard');
  };

  // Auto Lineup for user squad according to formation roles
  const handleAutoLineup = (formationToUse = tactics.formation) => {
    const clubSquad = players.filter(p => p.clubId === userClubId);
    const otherPlayers = players.filter(p => p.clubId !== userClubId);
    const sortedSquad = sortSquadForFormation(clubSquad, formationToUse);
    setPlayers([...sortedSquad, ...otherPlayers]);
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
        totalRounds={leagueRounds?.length || 38}
        budget={budget}
        managerProfile={managerProfile}
        onOpenSaveModal={() => setIsSaveModalOpen(true)}
        onOpenCareerModal={() => setIsCareerModalOpen(true)}
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
            managerProfile={managerProfile}
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
            onAutoLineup={handleAutoLineup}
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
            awardedPrizes={awardedPrizes}
          />
        )}

        {currentTab === 'settings' && (
          <SettingsView 
            userClub={userClub}
            currentRound={currentRound}
            managerProfile={managerProfile}
            onLogout={() => {
              // Sair para tela de onboarding / login sem apagar o progresso da carreira
              setIsCareerModalOpen(true);
            }}
            onResetCareer={() => {
              // Apagar carreira atual: limpa save do localStorage e re-inicializa
              try {
                localStorage.removeItem(STORAGE_KEY);
              } catch (e) {
                console.warn('Erro ao remover save:', e);
              }
              initDefaultCareer('fla');
              setIsCareerModalOpen(true);
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-4 text-center text-xs text-slate-500">
        <div className="container-app flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Footkeep Football Manager © 2024 / 2026 • Temporada 2024 Série A Oficial</span>
          <span>Pronto para publicação via Cloudflare Pages</span>
        </div>
      </footer>

      {/* Save / Load / New Game Modal */}
      <SaveLoadModal 
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        gameState={{ 
          clubs, 
          players, 
          userClubId, 
          budget, 
          currentRound, 
          leagueRounds, 
          cupState, 
          tactics, 
          awardedPrizes,
          managerProfile 
        }}
        onLoadSave={(savedState) => {
          setClubs(savedState.clubs || REAL_CLUBS);
          setPlayers(savedState.players || []);
          setUserClubId(savedState.userClubId || 'fla');
          setBudget(savedState.budget || 38000000);
          setCurrentRound(savedState.currentRound || 1);
          setLeagueRounds(savedState.leagueRounds || []);
          setCupState(savedState.cupState || null);
          setTactics(savedState.tactics || { formation: '4-4-2', mentality: 'Equilibrada' });
          setAwardedPrizes(savedState.awardedPrizes || []);
          setManagerProfile(savedState.managerProfile || null);
        }}
        onResetGame={() => setIsCareerModalOpen(true)}
        allClubs={clubs}
        onSelectNewClub={(newClubId) => initDefaultCareer(newClubId)}
      />

      {/* Career Creation & Trainer Onboarding Modal */}
      <CareerCreationModal
        isOpen={isCareerModalOpen}
        onStartCareer={handleStartCareer}
        currentClubId={userClubId}
        onClose={clubs && clubs.length > 0 ? () => setIsCareerModalOpen(false) : undefined}
      />

    </div>
  );
}
