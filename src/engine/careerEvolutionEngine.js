// Career Evolution Engine for Footkeep
// Pure functional engine for advancing career state, updating club form, dynamic market value adjustment,
// weekly financial calculations, and coordinating contextual simulation news.
// Guarantees strict immutability, zero side effects, and anti-duplication safety across save/reloads.

import { generateSimulationNews, deduplicateNews } from './newsEngine.js';
import { calculateStandings } from './competitionEngine.js';

/**
 * Updates recent form ('V', 'E', 'D') for clubs that played in finished matches.
 * Caps recent form history to the 5 most recent matches.
 * Pure function: returns a new array of clubs without mutating inputs.
 * 
 * @param {Array} clubs - Current clubs array
 * @param {Array} finishedMatches - Matches finished in the round
 * @returns {Array} Updated clubs array
 */
export function updateClubsForm(clubs = [], finishedMatches = []) {
  if (!Array.isArray(clubs) || clubs.length === 0) return [];
  if (!Array.isArray(finishedMatches) || finishedMatches.length === 0) return clubs.map(c => ({ ...c }));

  const roundResultsByClub = {};

  finishedMatches.forEach(m => {
    if (!m.played || m.homeScore === null || m.awayScore === null) return;

    if (m.homeScore > m.awayScore) {
      roundResultsByClub[m.homeId] = 'V';
      roundResultsByClub[m.awayId] = 'D';
    } else if (m.awayScore > m.homeScore) {
      roundResultsByClub[m.homeId] = 'D';
      roundResultsByClub[m.awayId] = 'V';
    } else {
      roundResultsByClub[m.homeId] = 'E';
      roundResultsByClub[m.awayId] = 'E';
    }
  });

  return clubs.map(club => {
    const roundResult = roundResultsByClub[club.id];
    if (!roundResult) {
      return { ...club };
    }

    const currentForm = Array.isArray(club.form) ? club.form : [];
    // Prepend new result, keeping maximum 5 most recent games
    const nextForm = [roundResult, ...currentForm].slice(0, 5);

    return {
      ...club,
      form: nextForm
    };
  });
}

/**
 * Adjusts player market values dynamically based on match participation, goal scoring,
 * assists, age, and disciplinary records.
 * Pure function: returns a new array of players without mutating inputs.
 * 
 * @param {Array} players - Current players array
 * @param {Object} [options]
 * @param {number} [options.currentRound=1] - Current round index
 * @returns {Array} Updated players array with recalibrated market values
 */
export function adjustPlayersMarketValues(players = [], options = {}) {
  if (!Array.isArray(players) || players.length === 0) return [];

  const { currentRound = 1 } = options;

  return players.map(player => {
    const initialValue = player.value || 500000;
    const matches = player.matchesPlayed || 0;
    const goals = player.goals || 0;
    const assists = player.assists || 0;
    const reds = player.redCards || 0;
    const age = player.age || 25;

    let multiplier = 1.0;

    // Atletas que jogaram com regularidade
    if (matches > 0) {
      // Bônus ofensivo (artilheiros e garçons)
      const offensiveContribution = (goals * 0.035) + (assists * 0.02);
      multiplier += Math.min(0.25, offensiveContribution);

      // Bônus de juventude em ascensão (jogadores sub-23 com minutos)
      if (age <= 22 && matches >= Math.min(5, Math.floor(currentRound * 0.4))) {
        multiplier += 0.05;
      }

      // Penalidade por indisciplina grave
      if (reds > 1) {
        multiplier -= Math.min(0.08, reds * 0.03);
      }
    } else if (currentRound >= 6) {
      // Inatividade prolongada (nenhuma partida após várias rodadas)
      multiplier -= 0.03;
    }

    // Declínio natural de atletas veteranos (34+ anos)
    if (age >= 34) {
      multiplier -= 0.02;
    }

    // Amortecimento para evitar oscilações extremas em uma única rodada (limite entre -6% e +10% por rodada)
    const clampedMultiplier = Math.max(0.94, Math.min(1.10, multiplier));
    const nextValue = Math.round((initialValue * clampedMultiplier) / 50000) * 50000;

    return {
      ...player,
      value: Math.max(100000, nextValue)
    };
  });
}

/**
 * Calculates weekly financial balance including payroll deduction, ticket receipts (for home matches),
 * and club sponsorship.
 * 
 * @param {Object} params
 * @param {Array} params.userSquad - User club's players list
 * @param {Object} params.userClub - User club metadata (stadiumCapacity, reputation, etc.)
 * @param {boolean} params.isHomeMatch - Whether the user club played at home in this round
 * @param {number} [params.gateReceipts] - Pre-calculated gate receipts from simulator (if available)
 * @returns {Object} { weeklyPayroll, gateIncome, sponsorIncome, netIncome, breakdown }
 */
export function calculateWeeklyFinances({
  userSquad = [],
  userClub = null,
  isHomeMatch = false,
  gateReceipts = null
}) {
  // Folha salarial semanal: soma dos salários do elenco
  const weeklyPayroll = userSquad.reduce((sum, p) => sum + (p.salary || 0), 0);

  // Renda de bilheteria em jogos como mandante
  let gateIncome = 0;
  if (isHomeMatch) {
    if (typeof gateReceipts === 'number' && gateReceipts > 0) {
      gateIncome = gateReceipts;
    } else {
      const capacity = userClub?.stadiumCapacity || 35000;
      const rep = userClub?.reputation || 70;
      // Ocupação estimada entre 65% e 92% da capacidade do estádio
      const occupancyRate = Math.min(0.95, 0.55 + (rep * 0.004));
      const attendance = Math.round(capacity * occupancyRate);
      const ticketPrice = 50 + Math.round(rep * 0.4); // R$ 70 a R$ 90
      gateIncome = Math.round((attendance * ticketPrice) / 1000) * 1000;
    }
  }

  // Receita de patrocinadores proporcional à reputação do clube
  const rep = userClub?.reputation || 70;
  const sponsorIncome = Math.round(rep * 3500);

  const netIncome = gateIncome + sponsorIncome - weeklyPayroll;

  return {
    weeklyPayroll,
    gateIncome,
    sponsorIncome,
    netIncome,
    breakdown: {
      isHomeMatch,
      payrollExpense: weeklyPayroll,
      ticketRevenue: gateIncome,
      sponsorRevenue: sponsorIncome,
      netBalance: netIncome
    }
  };
}

/**
 * Orchestrator: pure functional advancement of the career state upon round completion.
 * Coordinates form updates, standings calculation, player value calibrations, weekly finances,
 * and contextual simulation news generation with strict anti-duplication protection.
 * 
 * @param {Object} careerState - Immutable current state of the career
 * @param {Object} options - Progression parameters
 * @param {Array} options.finishedRoundMatches - All matches completed in this round
 * @param {number} options.roundNumber - The round number just completed
 * @param {Object} [options.userMatch] - Specific finished match involving user club
 * @param {Array} [options.transferEvents] - Transfers executed in this step
 * @param {Array} [options.youthEvents] - Youth prospects promoted in this step
 * @param {string} [options.gameDate] - Current game date in 'YYYY-MM-DD'
 * @returns {Object} Purely updated next career state
 */
export function evolveCareerRound(careerState = {}, options = {}) {
  const {
    clubs = [],
    players = [],
    leagueRounds = [],
    currentRound = 1,
    standings = [],
    budget = 10000000,
    userClubId = null,
    news = [],
    processedRounds = [],
    awardedPrizes = [],
    managerProfile = null,
    date = '2025-04-12'
  } = careerState;

  const {
    finishedRoundMatches = [],
    roundNumber = currentRound,
    userMatch = null,
    transferEvents = [],
    youthEvents = [],
    gameDate = date
  } = options;

  // 1. Anti-Duplication Guard: If this round was already processed, return state unchanged
  const alreadyProcessed = Array.isArray(processedRounds) && processedRounds.includes(roundNumber);
  if (alreadyProcessed) {
    return { ...careerState };
  }

  // 2. Update Club Form
  const updatedClubs = updateClubsForm(clubs, finishedRoundMatches);

  // 3. Update League Rounds fixtures
  const updatedLeagueRounds = leagueRounds.map(r => {
    if (r.roundNumber === roundNumber) {
      const matchMap = new Map();
      finishedRoundMatches.forEach(m => matchMap.set(`${m.homeId}_${m.awayId}`, m));

      const updatedMatches = r.matches.map(m => {
        const key = `${m.homeId}_${m.awayId}`;
        return matchMap.get(key) || m;
      });

      return { ...r, matches: updatedMatches };
    }
    return r;
  });

  // 4. Recalculate Standings
  const updatedStandings = calculateStandings(updatedClubs, updatedLeagueRounds);

  // 5. Adjust Player Market Values dynamically
  const updatedPlayers = adjustPlayersMarketValues(players, { currentRound: roundNumber });

  // 6. Weekly Financial Evolution
  const userClub = updatedClubs.find(c => c.id === userClubId) || null;
  const userSquad = updatedPlayers.filter(p => p.clubId === userClubId);
  const isHomeMatch = userMatch ? userMatch.homeId === userClubId : false;
  const gateReceipts = userMatch?.gateReceipts || null;

  const finances = calculateWeeklyFinances({
    userSquad,
    userClub,
    isHomeMatch,
    gateReceipts
  });

  const nextBudget = Math.max(0, budget + finances.netIncome);

  // 7. Contextual Simulation News
  const generatedNews = generateSimulationNews({
    currentRound: roundNumber,
    roundMatches: finishedRoundMatches,
    standings: updatedStandings,
    prevStandings: standings,
    clubs: updatedClubs,
    players: updatedPlayers,
    userClubId,
    transferEvents,
    youthEvents,
    currentDate: gameDate,
    existingNews: news
  });

  const nextNews = deduplicateNews(news, generatedNews);

  // 8. Assemble Pure Immutable Next State
  return {
    ...careerState,
    clubs: updatedClubs,
    players: updatedPlayers,
    leagueRounds: updatedLeagueRounds,
    standings: updatedStandings,
    budget: nextBudget,
    news: nextNews,
    processedRounds: [...(processedRounds || []), roundNumber],
    lastFinances: finances,
    currentRound: roundNumber + 1
  };
}
