// Match Simulator: Mathematical probabilities, tactical influence, narrative commentary
import { getRefereeForMatch } from '../data/refereesData.js';

const COMMENTARY_TEMPLATES = {
  goal: [
    "{player} recebe belo passe de {assist}, invade a área e bate firme no canto! GOLAÇO!",
    "QUE PINTURA! {player} dribla a marcação e manda uma bomba no ângulo sem chances para o goleiro!",
    "Gol de oportunismo! Após bate-rebate na grande área, {player} empurra para o fundo das redes!",
    "Cruzamento perfeito de {assist} na cabeça de {player}, que testa com autoridade para o gol!",
    "PÊNALTI convertido com frieza por {player}! Deslocou o goleiro com categoria!"
  ],
  miss: [
    "{player} arrisca de fora da área com perigo, mas a bola sai raspando a trave!",
    "Incrível defesa do goleiro adversário impedindo o gol claro de {player}!",
    "{player} cabeceia livre após cobrança de escanteio, mas a bola sobe demais e vai por cima.",
    "Bateu na trave! {player} acerta um petardo no poste e a torcida vai à loucura!"
  ],
  card_yellow: [
    "Falta tática no meio de campo. Cartão amarelo justo para {player}.",
    "Entrada mais dura de {player} para parar o contra-ataque. O árbitro aplica o cartão amarelo.",
    "Reclamação acintosa com o juiz. {player} é advertido com cartão amarelo."
  ],
  card_red: [
    "ENTRADA VIOLENTA! O árbitro não hesita e mostra o cartão VERMELHO DIRETO para {player}!",
    "Segundo cartão amarelo para {player}! EXPULSO de campo! O time jogará com um a menos!"
  ]
};

export const FORMATION_MODIFIERS = {
  '4-4-2': {
    name: '4-4-2 Clássico',
    atk: 1.00,
    mid: 1.05,
    def: 1.00
  },
  '4-3-3': {
    name: '4-3-3 Ofensivo',
    atk: 1.12,
    mid: 0.98,
    def: 0.94
  },
  '3-5-2': {
    name: '3-5-2 Equilibrado',
    atk: 0.95,
    mid: 1.12,
    def: 1.03
  },
  '4-2-3-1': {
    name: '4-2-3-1 Moderno',
    atk: 1.04,
    mid: 1.08,
    def: 0.96
  }
};

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Compute team ratings from player list and tactics
export function computeTeamRating(players, formation = '4-4-2', mentality = 'Equilibrada', isHome = false) {
  if (!players || players.length === 0) {
    return { atk: 65, mid: 65, def: 65, overall: 65, starters: [] };
  }

  const starters = players.slice(0, 11);
  let atkTotal = 0, midTotal = 0, defTotal = 0;

  starters.forEach(p => {
    switch (p.position) {
      case 'A':
        atkTotal += (p.fin * 0.7) + (p.overall * 0.3);
        break;
      case 'M':
        midTotal += (p.pas * 0.6) + (p.overall * 0.4);
        atkTotal += (p.fin * 0.3);
        break;
      case 'V':
        midTotal += (p.pas * 0.4) + (p.def * 0.3) + (p.fis * 0.3);
        defTotal += (p.def * 0.4);
        break;
      case 'L':
        midTotal += (p.fis * 0.4) + (p.pas * 0.3);
        defTotal += (p.def * 0.5) + (p.overall * 0.5);
        break;
      case 'Z':
        defTotal += (p.def * 0.7) + (p.fis * 0.3);
        break;
      case 'G':
        defTotal += (p.def * 0.8) + (p.overall * 0.2);
        break;
      default:
        atkTotal += p.overall;
        midTotal += p.overall;
        defTotal += p.overall;
    }
  });

  let atk = Math.round(atkTotal / 3.5);
  let mid = Math.round(midTotal / 4.0);
  let def = Math.round(defTotal / 4.5);

  // Formation influence
  const formMod = FORMATION_MODIFIERS[formation] || FORMATION_MODIFIERS['4-4-2'];
  atk = Math.round(atk * formMod.atk);
  mid = Math.round(mid * formMod.mid);
  def = Math.round(def * formMod.def);

  // Tactical Mentality Modifiers
  if (mentality === 'Ofensiva') {
    atk = Math.round(atk * 1.15);
    def = Math.round(def * 0.88);
  } else if (mentality === 'Defensiva') {
    def = Math.round(def * 1.20);
    atk = Math.round(atk * 0.85);
  }

  // Home Advantage (+5% boost)
  if (isHome) {
    atk = Math.round(atk * 1.05);
    mid = Math.round(mid * 1.05);
    def = Math.round(def * 1.05);
  }

  const overall = Math.round((atk + mid + def) / 3);
  return { atk, mid, def, overall, starters, formation, mentality };
}

// Simulates a complete match and returns timeline, final score, and player statistics
export function simulateFullMatch({
  homeClub,
  awayClub,
  homePlayers,
  awayPlayers,
  homeTactics = { formation: '4-4-2', mentality: 'Equilibrada' },
  awayTactics = { formation: '4-4-2', mentality: 'Equilibrada' },
  isCup = false,
  matchId = null,
  referee = null
}) {
  const activeReferee = referee || getRefereeForMatch(matchId || `${homeClub.id}_${awayClub.id}`, isCup);
  const homeStats = computeTeamRating(homePlayers, homeTactics.formation, homeTactics.mentality, true);
  const awayStats = computeTeamRating(awayPlayers, awayTactics.formation, awayTactics.mentality, false);

  const events = [];
  let homeScore = 0;
  let awayScore = 0;
  let homeRedCards = 0;
  let awayRedCards = 0;
  const matchYellows = {}; // playerId -> yellow count in this game
  const matchRedSet = new Set(); // set of playerIds sent off

  // Base possession ratio based on midfield ratings
  const totalMid = (homeStats.mid || 50) + (awayStats.mid || 50);
  let homePossession = Math.round((homeStats.mid / totalMid) * 100);

  // Simulate 90 minutes of gameplay with key chances at intervals
  const keyMinutes = [7, 14, 23, 31, 39, 44, 52, 60, 68, 75, 82, 88, 92];

  keyMinutes.forEach(minute => {
    // Dynamic possession adjustment if either team has red cards (-8% per red card advantage)
    let currentHomePossession = homePossession;
    if (homeRedCards > awayRedCards) {
      currentHomePossession = Math.max(20, homePossession - (homeRedCards - awayRedCards) * 8);
    } else if (awayRedCards > homeRedCards) {
      currentHomePossession = Math.min(80, homePossession + (awayRedCards - homeRedCards) * 8);
    }

    const isHomeAttacking = (Math.random() * 100) < currentHomePossession;
    const attackingStats = isHomeAttacking ? homeStats : awayStats;
    const defendingStats = isHomeAttacking ? awayStats : homeStats;
    const attackerClub = isHomeAttacking ? homeClub : awayClub;
    const defenderClub = isHomeAttacking ? awayClub : homeClub;

    // Filter available active players (excluding players with red cards)
    const activeStarters = attackingStats.starters.filter(p => !matchRedSet.has(p.id));
    const activeDefenders = defendingStats.starters.filter(p => !matchRedSet.has(p.id));

    const poolAttackers = activeStarters.length > 0 ? activeStarters : attackingStats.starters;
    const forwardPlayers = poolAttackers.filter(p => p.position === 'A' || p.position === 'M');
    const primaryAttacker = forwardPlayers.length > 0 ? randomItem(forwardPlayers) : randomItem(poolAttackers);
    const assistPool = poolAttackers.filter(p => p.id !== primaryAttacker.id);
    const assistPlayer = assistPool.length > 0 ? randomItem(assistPool) : primaryAttacker;

    // Effective stats with red card penalties (18% penalty per red card)
    const atkRedCards = isHomeAttacking ? homeRedCards : awayRedCards;
    const defRedCards = isHomeAttacking ? awayRedCards : homeRedCards;
    const effectiveAtk = attackingStats.atk * Math.pow(0.82, atkRedCards);
    const effectiveDef = defendingStats.def * Math.pow(0.82, defRedCards);

    const goalProb = Math.max(0.12, Math.min(0.50, (effectiveAtk / (effectiveAtk + effectiveDef)) * 0.45));
    const roll = Math.random();

    if (roll < goalProb) {
      // GOAL!
      if (isHomeAttacking) homeScore++;
      else awayScore++;

      primaryAttacker.goals = (primaryAttacker.goals || 0) + 1;
      primaryAttacker.overall = Math.min(99, primaryAttacker.overall + 0.1);

      const template = randomItem(COMMENTARY_TEMPLATES.goal);
      const text = template
        .replace('{player}', primaryAttacker.name)
        .replace('{assist}', assistPlayer.name);

      events.push({
        minute,
        type: 'goal',
        clubId: attackerClub.id,
        clubName: attackerClub.name,
        badgeEmoji: attackerClub.badgeEmoji,
        playerName: primaryAttacker.name,
        assistName: assistPlayer.name,
        homeScore,
        awayScore,
        text
      });
    } else if (roll < goalProb + 0.28) {
      // Dangerous Miss
      const template = randomItem(COMMENTARY_TEMPLATES.miss);
      const text = template.replace('{player}', primaryAttacker.name);

      events.push({
        minute,
        type: 'miss',
        clubId: attackerClub.id,
        clubName: attackerClub.name,
        badgeEmoji: attackerClub.badgeEmoji,
        playerName: primaryAttacker.name,
        homeScore,
        awayScore,
        text
      });
    } else if (roll > 0.87) {
      // Foul by defending team
      const eligibleFoulPlayers = activeDefenders.length > 0 ? activeDefenders : defendingStats.starters;
      const defendersOnly = eligibleFoulPlayers.filter(p => p.position === 'Z' || p.position === 'V' || p.position === 'L');
      const foulPlayer = defendersOnly.length > 0 ? randomItem(defendersOnly) : randomItem(eligibleFoulPlayers);

      const playerYellows = matchYellows[foulPlayer.id] || 0;
      const isSevereFoul = roll > 0.985; // Violent foul roll -> direct red

      if (isSevereFoul && !matchRedSet.has(foulPlayer.id)) {
        // Direct Red Card!
        matchRedSet.add(foulPlayer.id);
        if (isHomeAttacking) awayRedCards++;
        else homeRedCards++;
        foulPlayer.redCards = (foulPlayer.redCards || 0) + 1;
        foulPlayer.isSuspended = true;

        const text = COMMENTARY_TEMPLATES.card_red[0].replace('{player}', foulPlayer.name);
        events.push({
          minute,
          type: 'card_red',
          isDirectRed: true,
          clubId: defenderClub.id,
          clubName: defenderClub.name,
          badgeEmoji: defenderClub.badgeEmoji,
          playerName: foulPlayer.name,
          homeScore,
          awayScore,
          text
        });
      } else if (playerYellows === 1 && !matchRedSet.has(foulPlayer.id)) {
        // Second Yellow Card -> Expulsion!
        matchYellows[foulPlayer.id] = 2;
        matchRedSet.add(foulPlayer.id);
        if (isHomeAttacking) awayRedCards++;
        else homeRedCards++;
        foulPlayer.redCards = (foulPlayer.redCards || 0) + 1;
        foulPlayer.isSuspended = true;

        const text = COMMENTARY_TEMPLATES.card_red[1].replace('{player}', foulPlayer.name);
        events.push({
          minute,
          type: 'card_red',
          isDirectRed: false,
          clubId: defenderClub.id,
          clubName: defenderClub.name,
          badgeEmoji: defenderClub.badgeEmoji,
          playerName: foulPlayer.name,
          homeScore,
          awayScore,
          text
        });
      } else if (playerYellows === 0 && !matchRedSet.has(foulPlayer.id)) {
        // First Yellow Card
        matchYellows[foulPlayer.id] = 1;
        foulPlayer.yellowCards = (foulPlayer.yellowCards || 0) + 1;

        const template = randomItem(COMMENTARY_TEMPLATES.card_yellow);
        const text = template.replace('{player}', foulPlayer.name);

        events.push({
          minute,
          type: 'card_yellow',
          clubId: defenderClub.id,
          clubName: defenderClub.name,
          badgeEmoji: defenderClub.badgeEmoji,
          playerName: foulPlayer.name,
          homeScore,
          awayScore,
          text
        });
      }
    }
  });

  // Shootout for tied Cup match
  let winnerId = null;
  let homePenalties = null;
  let awayPenalties = null;

  if (homeScore > awayScore) {
    winnerId = homeClub.id;
  } else if (awayScore > homeScore) {
    winnerId = awayClub.id;
  } else if (isCup) {
    // Sudden-death penalties
    homePenalties = 0;
    awayPenalties = 0;
    for (let p = 0; p < 5; p++) {
      if (Math.random() > 0.3) homePenalties++;
      if (Math.random() > 0.3) awayPenalties++;
    }
    while (homePenalties === awayPenalties) {
      if (Math.random() > 0.4) homePenalties++;
      if (Math.random() > 0.4) awayPenalties++;
    }
    winnerId = homePenalties > awayPenalties ? homeClub.id : awayClub.id;

    events.push({
      minute: 120,
      type: 'penalties',
      text: `Decisão nos Pênaltis! ${homeClub.name} ${homePenalties} x ${awayPenalties} ${awayClub.name}. Classificado: ${winnerId === homeClub.id ? homeClub.name : awayClub.name}!`,
      homeScore,
      awayScore,
      homePenalties,
      awayPenalties
    });
  }

  // Financial Gate Receipts (Bilheteria)
  const homeCapacity = homeClub.stadiumCapacity || 30000;
  const attendance = Math.round(homeCapacity * (0.65 + (homeClub.reputation / 300)));
  const ticketPrice = 45;
  const gateReceipts = Math.round(attendance * ticketPrice);

  const finalHomePossession = homeRedCards > awayRedCards 
    ? Math.max(25, homePossession - (homeRedCards - awayRedCards) * 6)
    : (awayRedCards > homeRedCards ? Math.min(75, homePossession + (awayRedCards - homeRedCards) * 6) : homePossession);

  return {
    homeId: homeClub.id,
    awayId: awayClub.id,
    homeScore,
    awayScore,
    homePenalties,
    awayPenalties,
    winnerId,
    homeRedCards,
    awayRedCards,
    played: true,
    events,
    possession: { home: finalHomePossession, away: 100 - finalHomePossession },
    attendance,
    gateReceipts,
    referee: activeReferee
  };
}