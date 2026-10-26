import React, { useState, useEffect } from 'react';
import { REAL_CLUBS } from './data/realClubs';
import { INITIAL_CLUBS } from './data/initialClubs';
import { buildRealPlayers } from './data/realPlayers';
import { generateAllPlayers, sortSquadForFormation } from './data/initialPlayers';
import { 
  generateLeagueFixtures, 
  generateInitialCup, 
  advanceCupPhase, 
  calculateStandings,
  getInitialStandings 
} from './engine/competitionEngine';
import { simulateFullMatch, applyMatchResultToPlayers } from './engine/matchSimulator';
import { sanitizeSquadForNewCareer } from './data/players2026';
import { 
  getClubsByCompetition, 
  getInitialPlayersForCompetition,
  getCompetitionMetadata,
  normalizeCompetitionId 
} from './data/competitionsHub';
import {
  CALENDAR_CONFIG,
  getInitialDateForCompetition,
  advanceGameDate,
  formatGameDate,
  isPreSeason,
  isTransferWindowOpen,
  getTransferWindowStatus,
  generateDatedLeagueFixtures
} from './engine/calendarEngine';
import { generateSimulationNews, deduplicateNews } from './engine/newsEngine';
import { generateYouthIntake, processYearlyAgingAndRetirements } from './engine/youthAcademyEngine';
import { updateClubsForm, adjustPlayersMarketValues, calculateWeeklyFinances } from './engine/careerEvolutionEngine';

import { Navbar } from './components/Navbar';
import { ClubDashboard } from './components/ClubDashboard';
import { SquadTactics } from './components/SquadTactics';
import { MatchView } from './components/MatchView';
import { LeagueTable } from './components/LeagueTable';
import { CupBracket } from './components/CupBracket';
import { TransfersMarket } from './components/TransfersMarket';
import { FinancesView } from './components/FinancesView';
import { SettingsView } from './components/SettingsView';
import { MonitoringAnalyticsView } from './components/MonitoringAnalyticsView';
import { SaveLoadModal } from './components/SaveLoadModal';
import { CareerCreationModal } from './components/CareerCreationModal';
import { FootkeepLogo } from './components/FootkeepLogo';
import { Trophy, CheckCircle2, Mail, ShieldAlert } from 'lucide-react';

import {
  getActiveEmail,
  setActiveEmail,
  getCloudSaveByEmail,
  saveCloudProgress,
  sendSaveNotificationToEmail
} from './services/emailSaveService';

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
  const [userClubId, setUserClubId] = useState(null);
  const [budget, setBudget] = useState(30000000);
  const [currentRound, setCurrentRound] = useState(1);
  const [leagueRounds, setLeagueRounds] = useState([]);
  const [cupState, setCupState] = useState(null);
  const [standings, setStandings] = useState([]);
  const [tactics, setTactics] = useState({ formation: '4-4-2', mentality: 'Equilibrada' });
  const [awardedPrizes, setAwardedPrizes] = useState([]);
  const [managerProfile, setManagerProfile] = useState(null);
  const [selectedCompetition, setSelectedCompetition] = useState('brasileirao_serie_a');
  const [currentDate, setCurrentDate] = useState('2026-01-15');
  const [simulationNews, setSimulationNews] = useState([]);
  const [youthIntakes, setYouthIntakes] = useState([]);
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isCareerModalOpen, setIsCareerModalOpen] = useState(false);

  // Cloud & Email Feedback
  const [activeEmailState, setActiveEmailState] = useState('');
  const [saveToast, setSaveToast] = useState('');

  // 1. Initialize or load from LocalStorage or Active Cloud Email
  useEffect(() => {
    const activeEmail = getActiveEmail();
    if (activeEmail) {
      setActiveEmailState(activeEmail);
    }

    // Check localStorage save
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data && data.userClubId && data.clubs && data.clubs.length > 0) {
          handleLoadSave(data, false);
          return;
        }
      } catch (err) {
        console.error('Falha ao restaurar save do localStorage:', err);
      }
    }

    // Check cloud save by active email
    if (activeEmail) {
      const cloudSave = getCloudSaveByEmail(activeEmail);
      if (cloudSave && cloudSave.userClubId) {
        handleLoadSave(cloudSave, false);
        return;
      }
    }

    // First time or reset state: Open Career Creation Modal without forcing any club!
    setIsCareerModalOpen(true);
  }, []);

  // 2. Load Save Handler (shared by LocalStorage, Cloud Email and JSON files)
  const handleLoadSave = (savedState, showToast = true) => {
    if (!savedState || !savedState.userClubId) return;

    const rawClubs = savedState.clubs || REAL_CLUBS;
    const loadedClubs = rawClubs.map(c => {
      const fresh = REAL_CLUBS.find(rc => rc.id === c.id);
      return fresh ? { ...c, badgeUrl: fresh.badgeUrl || `/badges/${c.id}.svg`, colors: fresh.colors || c.colors } : c;
    });

    let loadedPlayers = savedState.players || [];
    const activeUserClubId = savedState.userClubId;

    // Squad order verification
    const userSquadSlice = loadedPlayers.filter(p => p.clubId === activeUserClubId).slice(0, 11);
    const hasMid = userSquadSlice.some(p => p.position === 'M');
    const hasAtk = userSquadSlice.some(p => p.position === 'A');

    if (!hasMid || !hasAtk) {
      const healed = [];
      loadedClubs.forEach(c => {
        const clubSquad = loadedPlayers.filter(p => p.clubId === c.id);
        healed.push(...sortSquadForFormation(clubSquad, savedState.tactics?.formation || '4-4-2'));
      });
      healed.push(...loadedPlayers.filter(p => !p.clubId));
      loadedPlayers = healed;
    }

    setClubs(loadedClubs);
    setPlayers(loadedPlayers);
    setUserClubId(activeUserClubId);
    setBudget(savedState.budget ?? 30000000);
    setCurrentRound(savedState.currentRound || 1);
    const savedComp = savedState.selectedCompetition || savedState.competitionId || 'brasileirao_serie_a';
    const savedDate = savedState.currentDate || getInitialDateForCompetition(savedComp);

    setSelectedCompetition(savedComp);
    setCurrentDate(savedDate);
    setSimulationNews(savedState.simulationNews || []);
    setYouthIntakes(savedState.youthIntakes || []);

    const loadedRounds = savedState.leagueRounds || [];
    setLeagueRounds(loadedRounds);
    setCupState(savedState.cupState || null);
    setStandings(calculateStandings(loadedClubs, loadedRounds));
    setTactics(savedState.tactics || { formation: '4-4-2', mentality: 'Equilibrada' });
    setAwardedPrizes(savedState.awardedPrizes || []);

    const linkedEmail = savedState.email || savedState.managerProfile?.email;
    if (linkedEmail) {
      setActiveEmail(linkedEmail);
      setActiveEmailState(linkedEmail);
    }

    setManagerProfile(savedState.managerProfile || {
      firstName: 'Treinador',
      lastName: 'Footkeep',
      coachName: `Prof. ${loadedClubs.find(c => c.id === activeUserClubId)?.name || 'Footkeep'}`,
      email: linkedEmail || '',
      coachStyle: 'Ofensivo & Pressão',
      rosterChoice: 'real',
      investmentOption: 'none',
      investmentAmount: 0
    });

    setIsCareerModalOpen(false);
    setIsSaveModalOpen(false);

    if (showToast) {
      setSaveToast('Carreira carregada com sucesso a partir da nuvem!');
      setTimeout(() => setSaveToast(''), 3500);
    }
  };

  // 3. Fallback default career generator for explicit club selection
  const initDefaultCareer = (targetClubId) => {
    if (!targetClubId) return;
    const initialClubs = [...REAL_CLUBS];
    const initialPlayers = sanitizeSquadForNewCareer(buildRealPlayers());
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
    setStandings(getInitialStandings(initialClubs));
    setTactics({ formation: '4-4-2', mentality: 'Equilibrada' });
    setAwardedPrizes([]);
    setManagerProfile({
      firstName: 'Treinador',
      lastName: 'Footkeep',
      coachName: `Prof. ${selectedClub.name}`,
      email: activeEmailState || '',
      coachStyle: 'Ofensivo & Pressão',
      rosterChoice: 'real',
      investmentOption: 'none',
      investmentAmount: 0
    });
    setCurrentTab('dashboard');
  };

  // 4. Start a new career from the Career Creation Modal
  const handleStartCareer = (careerConfig) => {
    const competitionId = careerConfig.competitionId || 'brasileirao_serie_a';
    const chosenClubs = careerConfig.leagueMode === 'classic' 
      ? [...INITIAL_CLUBS] 
      : getClubsByCompetition(competitionId);

    let allPlayers = careerConfig.leagueMode === 'classic' 
      ? generateAllPlayers(chosenClubs) 
      : getInitialPlayersForCompetition(competitionId);

    const targetClubId = careerConfig.selectedClubId || chosenClubs[0].id;
    const selectedClub = chosenClubs.find(c => c.id === targetClubId) || chosenClubs[0];

    // If custom players were created, add them to the chosen club
    if (careerConfig.customPlayers && careerConfig.customPlayers.length > 0) {
      const customSquad = careerConfig.customPlayers.map(p => ({
        ...p,
        clubId: targetClubId
      }));

      const existingClubPlayers = allPlayers.filter(p => p.clubId === targetClubId);
      const otherPlayers = allPlayers.filter(p => p.clubId !== targetClubId);

      const neededFromReal = Math.max(0, 21 - customSquad.length);
      const sortedReal = [...existingClubPlayers].sort((a, b) => b.overall - a.overall);
      const keptRealPlayers = sortedReal.slice(0, neededFromReal);

      const mergedSquad = [...customSquad, ...keptRealPlayers];
      const balancedSquad = sortSquadForFormation(mergedSquad, '4-4-2');

      allPlayers = [...balancedSquad, ...otherPlayers];
    }

    // Rigorously sanitize all player career stats to 0 (goals, assists, cards, matches)
    allPlayers = sanitizeSquadForNewCareer(allPlayers);

    const initialDate = getInitialDateForCompetition(competitionId);
    const fixtures = generateDatedLeagueFixtures(competitionId, chosenClubs);
    const cup = generateInitialCup(chosenClubs);
    const initialStandings = getInitialStandings(chosenClubs);

    const initialBudgetVal = careerConfig.initialBudget || selectedClub.budget;
    const targetEmail = careerConfig.email || activeEmailState || '';

    setSelectedCompetition(competitionId);
    setCurrentDate(initialDate);
    setSimulationNews([]);
    setYouthIntakes([]);

    setClubs(chosenClubs);
    setPlayers(allPlayers);
    setUserClubId(selectedClub.id);
    setBudget(initialBudgetVal);
    setCurrentRound(1);
    setLeagueRounds(fixtures);
    setCupState(cup);
    setStandings(initialStandings);
    setTactics({ formation: '4-4-2', mentality: 'Equilibrada' });
    setAwardedPrizes([]);
    setManagerProfile(careerConfig.managerProfile);
    setIsCareerModalOpen(false);
    setCurrentTab('dashboard');

    // Register active email and trigger cloud save & initial email dispatch
    if (targetEmail) {
      setActiveEmail(targetEmail);
      setActiveEmailState(targetEmail);

      const initialGameState = {
        clubs: chosenClubs,
        players: allPlayers,
        userClubId: selectedClub.id,
        budget: initialBudgetVal,
        currentRound: 1,
        leagueRounds: fixtures,
        cupState: cup,
        tactics: { formation: '4-4-2', mentality: 'Equilibrada' },
        awardedPrizes: [],
        managerProfile: careerConfig.managerProfile,
        selectedCompetition: competitionId,
        currentDate: initialDate,
        simulationNews: [],
        youthIntakes: [],
        email: targetEmail
      };

      saveCloudProgress(targetEmail, initialGameState);
      sendSaveNotificationToEmail(targetEmail, initialGameState);

      setSaveToast(`Carreira iniciada e vinculada ao e-mail ${targetEmail}!`);
      setTimeout(() => setSaveToast(''), 4000);
    }
  };

  // 5. Global Save Progress & Email Notification Handler
  const handleSaveProgress = async () => {
    if (!userClubId || clubs.length === 0) return;

    const currentState = {
      clubs,
      players,
      userClubId,
      budget,
      currentRound,
      leagueRounds,
      cupState,
      tactics,
      awardedPrizes,
      managerProfile,
      selectedCompetition,
      currentDate,
      simulationNews,
      youthIntakes,
      email: activeEmailState || getActiveEmail() || managerProfile?.email || ''
    };

    // 1. Local storage backup
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentState));

    // 2. Cloud save & Email command dispatch
    const targetEmail = currentState.email;
    if (targetEmail) {
      saveCloudProgress(targetEmail, currentState);
      const res = await sendSaveNotificationToEmail(targetEmail, currentState);
      setSaveToast(`Progresso salvo! Confirmação enviada para ${targetEmail}.`);
    } else {
      setSaveToast('Progresso salvo localmente com sucesso!');
    }
    setTimeout(() => setSaveToast(''), 4000);
  };

  // 6. BeforeUnload Listener: Save and send notification on window close
  useEffect(() => {
    const handleBeforeUnload = () => {
      const email = activeEmailState || getActiveEmail() || managerProfile?.email;
      if (email && userClubId && clubs.length > 0) {
        const currentState = {
          clubs,
          players,
          userClubId,
          budget,
          currentRound,
          leagueRounds,
          cupState,
          tactics,
          awardedPrizes,
          managerProfile,
          selectedCompetition,
          currentDate,
          simulationNews,
          youthIntakes,
          email
        };
        saveCloudProgress(email, currentState);
        sendSaveNotificationToEmail(email, currentState);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [clubs, players, userClubId, budget, currentRound, leagueRounds, cupState, tactics, awardedPrizes, managerProfile, activeEmailState, selectedCompetition, currentDate, simulationNews, youthIntakes]);

  // 7. Auto-recalculate standings whenever league rounds change
  useEffect(() => {
    if (clubs.length > 0 && leagueRounds.length > 0) {
      const updatedTable = calculateStandings(clubs, leagueRounds);
      setStandings(updatedTable);
    }
  }, [clubs, leagueRounds]);

  // 8. Persist State to LocalStorage (only when an active club is valid)
  useEffect(() => {
    if (clubs.length > 0 && players.length > 0 && userClubId) {
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
        managerProfile,
        selectedCompetition,
        currentDate,
        simulationNews,
        youthIntakes,
        email: activeEmailState || getActiveEmail() || managerProfile?.email || ''
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    }
  }, [clubs, players, userClubId, budget, currentRound, leagueRounds, cupState, tactics, awardedPrizes, managerProfile, activeEmailState, selectedCompetition, currentDate, simulationNews, youthIntakes]);

  const userClub = clubs.find(c => c.id === userClubId) || null;
  const userSquad = userClubId ? players.filter(p => p.clubId === userClubId) : [];

  // Determine current match for user:
  // Schedules Cup phases at specific season milestones (Rounds 7, 14, 21, 28)
  const getNextMatch = () => {
    if (!userClubId) return null;

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
    // 0. Atualizar estatísticas dos jogadores de forma pura e imutável
    setPlayers(prevPlayers => applyMatchResultToPlayers(prevPlayers, finishedMatch));

    if (finishedMatch.type === 'cup') {
      // 1. Update Cup Match
      const phase = cupState.currentPhase;
      const otherSimulatedCupMatches = [];
      const updatedMatches = cupState.phases[phase].matches.map(m => {
        if (m.matchId === finishedMatch.matchId) {
          return finishedMatch;
        }
        if (!m.played) {
          const hClub = clubs.find(c => c.id === m.homeId);
          const aClub = clubs.find(c => c.id === m.awayId);
          const hP = players.filter(p => p.clubId === hClub?.id);
          const aP = players.filter(p => p.clubId === aClub?.id);
          const sim = simulateFullMatch({ homeClub: hClub, awayClub: aClub, homePlayers: hP, awayPlayers: aP, isCup: true });
          const fullSim = { ...m, ...sim };
          otherSimulatedCupMatches.push(fullSim);
          return fullSim;
        }
        return m;
      });

      if (otherSimulatedCupMatches.length > 0) {
        setPlayers(prevPlayers => {
          let updated = [...prevPlayers];
          for (const simMatch of otherSimulatedCupMatches) {
            updated = applyMatchResultToPlayers(updated, simMatch);
          }
          return updated;
        });
      }

      const updatedCupState = advanceCupPhase({
        ...cupState,
        phases: {
          ...cupState.phases,
          [phase]: { ...cupState.phases[phase], matches: updatedMatches }
        }
      });

      setCupState(updatedCupState);

      const isHome = finishedMatch.homeId === userClubId;
      const gateIncome = isHome ? (finishedMatch.gateReceipts || 0) : 0;
      let cupPrize = 0;
      const newPrizes = [];

      if (updatedCupState.championId === userClubId) {
        if (!awardedPrizes.some(p => p.id === 'cup_champion')) {
          cupPrize = 10000000;
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

      // Advance game calendar by 4 days for cup match
      const nextDate = advanceGameDate(currentDate, 4);
      setCurrentDate(nextDate);

    } else {
      // 2. Update League Match
      const cpuSimulatedMatches = [];
      const updatedRounds = leagueRounds.map(r => {
        if (r.roundNumber === currentRound) {
          const updatedMatches = r.matches.map(m => {
            if (m.homeId === finishedMatch.homeId && m.awayId === finishedMatch.awayId) {
              return finishedMatch;
            }
            if (!m.played) {
              const hClub = clubs.find(c => c.id === m.homeId);
              const aClub = clubs.find(c => c.id === m.awayId);
              const hP = players.filter(p => p.clubId === hClub?.id);
              const aP = players.filter(p => p.clubId === aClub?.id);
              const sim = simulateFullMatch({ homeClub: hClub, awayClub: aClub, homePlayers: hP, awayPlayers: aP, isCup: false });
              const fullSim = { ...m, ...sim };
              cpuSimulatedMatches.push(fullSim);
              return fullSim;
            }
            return m;
          });
          return { ...r, matches: updatedMatches };
        }
        return r;
      });

      const allRoundMatches = [finishedMatch, ...cpuSimulatedMatches];
      const updatedClubsWithForm = updateClubsForm(clubs, allRoundMatches);
      setClubs(updatedClubsWithForm);

      // Advance game calendar by 7 days for league match
      const nextDate = advanceGameDate(currentDate, 7);
      setCurrentDate(nextDate);

      // Atualiza os artilheiros e cartões dos outros jogos da rodada simulados e recalibra valores de mercado
      setPlayers(prevPlayers => {
        let updated = [...prevPlayers];
        for (const simMatch of cpuSimulatedMatches) {
          updated = applyMatchResultToPlayers(updated, simMatch);
        }
        return adjustPlayersMarketValues(updated, { currentRound });
      });

      setLeagueRounds(updatedRounds);

      const isHome = finishedMatch.homeId === userClubId;
      const gateIncome = isHome ? (finishedMatch.gateReceipts || 0) : 0;
      const weeklyPayroll = userSquad.reduce((sum, p) => sum + (p.salary || 0), 0);
      const sponsorIncome = Math.round((userClub?.reputation || 70) * 3500);

      const netIncome = gateIncome + sponsorIncome - weeklyPayroll;

      const newStandings = calculateStandings(updatedClubsWithForm, updatedRounds);
      setStandings(newStandings);

      // Contextual simulation news
      const generatedNews = generateSimulationNews({
        currentRound,
        roundMatches: allRoundMatches,
        standings: newStandings,
        clubs: updatedClubsWithForm,
        players,
        userClubId,
        currentDate: nextDate,
        existingNews: simulationNews
      });
      setSimulationNews(prev => deduplicateNews(prev, generatedNews));

      // Mid-season youth intake at round 19
      if (currentRound === 19 && !youthIntakes.some(y => y.round === 19)) {
        const newYouths = generateYouthIntake(userClubId, selectedCompetition);
        setYouthIntakes(prev => [...prev, { round: 19, players: newYouths }]);
        setPlayers(prev => [...prev, ...newYouths]);
      }

      let leaguePrizes = 0;
      const newPrizes = [];

      const totalRounds = leagueRounds.length || 38;

      if (currentRound >= totalRounds) {
        const userPosition = newStandings.findIndex(s => s.clubId === userClubId) + 1;

        if (userPosition === 1 && !awardedPrizes.some(p => p.id === 'league_champion')) {
          leaguePrizes += 15000000;
          newPrizes.push({
            id: 'league_champion',
            title: 'Campeão da Liga Nacional (1º Lugar)',
            amount: 15000000,
            round: totalRounds
          });
        }

        if (userPosition >= 1 && userPosition <= 4 && !awardedPrizes.some(p => p.id === 'league_g4')) {
          leaguePrizes += 6000000;
          newPrizes.push({
            id: 'league_g4',
            title: 'Classificação para o G4',
            amount: 6000000,
            round: totalRounds
          });
        }
      }

      setBudget(prev => Math.max(0, prev + netIncome + leaguePrizes));
      if (newPrizes.length > 0) {
        setAwardedPrizes(prev => [...prev, ...newPrizes]);
      }

      if (cupState && !cupState.championId) {
        const curPhase = cupState.currentPhase;
        const phaseMilestone = CUP_SCHEDULE[curPhase] || totalRounds;
        if (currentRound >= phaseMilestone) {
          const phaseMatches = cupState.phases[curPhase]?.matches || [];
          const hasUserInPhase = phaseMatches.some(m => !m.played && (m.homeId === userClubId || m.awayId === userClubId));
          const hasUnplayed = phaseMatches.some(m => !m.played);
          
          if (!hasUserInPhase && hasUnplayed) {
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

      if (currentRound < totalRounds) {
        setCurrentRound(prev => prev + 1);
      }
    }

    setCurrentTab('dashboard');
  };

  // Auto Lineup for user squad according to formation roles
  const handleAutoLineup = (formationToUse = tactics.formation) => {
    if (!userClubId) return;
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
    if (!userClubId) return;
    setBudget(prev => prev - player.value);
    setPlayers(prev => {
      const exists = prev.some(p => p.id === player.id);
      if (exists) {
        return prev.map(p => {
          if (p.id === player.id) {
            return { ...p, clubId: userClubId, isListed: false };
          }
          return p;
        });
      } else {
        return [...prev, { ...player, clubId: userClubId, isListed: false }];
      }
    });
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col overflow-x-hidden w-full max-w-full">
      
      {/* Top Navbar */}
      <Navbar 
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        userClub={userClub}
        currentRound={currentRound}
        totalRounds={leagueRounds?.length || 38}
        budget={budget}
        managerProfile={managerProfile}
        activeEmail={activeEmailState}
        currentDate={currentDate}
        selectedCompetition={selectedCompetition}
        onOpenSaveModal={() => setIsSaveModalOpen(true)}
        onOpenCareerModal={() => setIsCareerModalOpen(true)}
        onQuickSave={handleSaveProgress}
      />

      {/* Floating Save & Cloud Toast Notification */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce bg-emerald-950/95 border border-emerald-500/80 text-emerald-200 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs backdrop-blur-md">
          <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
          <span className="font-semibold">{saveToast}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="container-app py-6 flex-1">
        
        {/* If no club is loaded yet (clean start / reset state) */}
        {!userClubId ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 space-y-5 animate-fadeIn">
            <FootkeepLogo size="lg" variant="vertical" />
            <div className="max-w-md space-y-2">
              <h2 className="text-2xl font-black text-white">Bem-vindo ao Footkeep Manager</h2>
              <p className="text-slate-400 text-xs leading-relaxed">
                Nenhum save local foi forçado. Vincule seu e-mail para recuperar seu progresso anterior ou crie uma nova carreira escolhendo livremente seu clube do coração.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setIsCareerModalOpen(true)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-xs shadow-xl shadow-emerald-500/20 transition flex items-center gap-2"
              >
                <Trophy size={16} />
                <span>Iniciar ou Recuperar Carreira</span>
              </button>
            </div>
          </div>
        ) : (
          <>
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
                currentDate={currentDate}
                selectedCompetition={selectedCompetition}
                simulationNews={simulationNews}
                onGoToMatch={() => setCurrentTab('match')}
                onGoToTactics={() => setCurrentTab('tactics')}
                onGoToTransfers={() => setCurrentTab('transfers')}
              />
            )}

            {currentTab === 'tactics' && (
              <SquadTactics 
                squad={userSquad}
                tactics={tactics}
                userClub={userClub}
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
                selectedCompetition={selectedCompetition}
              />
            )}

            {currentTab === 'cup' && (
              <CupBracket 
                cupState={cupState}
                allClubs={clubs}
                userClubId={userClubId}
              />
            )}

            {currentTab === 'monitoring' && (
              <MonitoringAnalyticsView 
                userClub={userClub}
                tactics={tactics}
                budget={budget}
                players={players}
                standings={standings}
                allClubs={clubs}
                selectedCompetition={selectedCompetition}
                currentRound={currentRound}
                leagueRounds={leagueRounds}
              />
            )}

            {currentTab === 'transfers' && (
              <TransfersMarket 
                allPlayers={players}
                allClubs={clubs}
                userClubId={userClubId}
                budget={budget}
                currentDate={currentDate}
                selectedCompetition={selectedCompetition}
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
                  setIsCareerModalOpen(true);
                }}
                onResetCareer={() => {
                  try {
                    localStorage.removeItem(STORAGE_KEY);
                  } catch (e) {
                    console.warn('Erro ao remover save:', e);
                  }
                  setClubs([]);
                  setPlayers([]);
                  setUserClubId(null);
                  setBudget(0);
                  setCurrentRound(1);
                  setLeagueRounds([]);
                  setCupState(null);
                  setManagerProfile(null);
                  setIsCareerModalOpen(true);
                  setSaveToast('Carreira reiniciada com sucesso!');
                  setTimeout(() => setSaveToast(''), 3000);
                }}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-4 text-center text-xs text-slate-500">
        <div className="container-app flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Footkeep Football Manager © 2025/26 • Temporada Oficial (Série A, Série B, Copa do Brasil, Premier League & LaLiga)</span>
          <span>Sincronização em Nuvem & Cloudflare Pages</span>
        </div>
      </footer>

      {/* Save / Load / Cloud Email Modal */}
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
          managerProfile,
          selectedCompetition,
          currentDate,
          simulationNews,
          youthIntakes,
          email: activeEmailState
        }}
        onLoadSave={handleLoadSave}
        onResetGame={() => {
          try {
            localStorage.removeItem(STORAGE_KEY);
          } catch (e) {
            console.warn('Erro ao remover save:', e);
          }
          setClubs([]);
          setPlayers([]);
          setUserClubId(null);
          setIsCareerModalOpen(true);
        }}
        allClubs={clubs}
        onSelectNewClub={(newClubId) => initDefaultCareer(newClubId)}
      />

      {/* Career Creation & Trainer Onboarding Modal */}
      <CareerCreationModal
        isOpen={isCareerModalOpen}
        onStartCareer={handleStartCareer}
        currentClubId={userClubId}
        onClose={userClubId && clubs.length > 0 ? () => setIsCareerModalOpen(false) : undefined}
        onLoadSave={handleLoadSave}
      />

    </div>
  );
}
