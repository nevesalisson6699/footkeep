// Match Simulator: Mathematical probabilities, tactical influence, narrative commentary

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

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Compute team ratings from player list and tactics
export function computeTeamRating(players, formation = '4-4-2', mentality = 'Equilibrada', isHome = false) {
  if (!players || players.length === 0) {
    return { atk: 65, mid: 65, def: 65, overall: 65 };
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
  return { atk, mid, def, overall, starters };
}

// Simulates a complete match and returns timeline, final score, and player statistics
export function simulateFullMatch({
  homeClub,
  awayClub,
  homePlayers,
  awayPlayers,
  homeTactics = { formation: '4-4-2', mentality: 'Equilibrada' },
  awayTactics = { formation: '4-4-2', mentality: 'Equilibrada' },
  isCup = false
}) {
  const homeStats = computeTeamRating(homePlayers, homeTactics.formation, homeTactics.mentality, true);
  const awayStats = computeTeamRating(awayPlayers, awayTactics.formation, awayTactics.mentality, false);

  const events = [];
  let homeScore = 0;
  let awayScore = 0;
  let homeRedCards = 0;
  let awayRedCards = 0;

  // Possession ratio based on midfield ratings
  const totalMid = homeStats.mid + awayStats.mid;
  const homePossession = Math.round((homeStats.mid / totalMid) * 100);
  const awayPossession = 100 - homePossession;

  // Simulate 90 minutes of gameplay with key chances at intervals
  const keyMinutes = [7, 14, 23, 31, 39, 44, 52, 60, 68, 75, 82, 88, 92];

  keyMinutes.forEach(minute => {
    // Chance generation probability
    const isHomeAttacking = Math.random() * 100 < homePossession;
    const attackingStats = isHomeAttacking ? homeStats : awayStats;
    const defendingStats = isHomeAttacking ? awayStats : homeStats;
    const attackerClub = isHomeAttacking ? homeClub : awayClub;
    const defenderClub = isHomeAttacking ? awayClub : homeClub;

    const starters = attackingStats.starters;
    const forwardPlayers = starters.filter(p => p.position === 'A' || p.position === 'M');
    const primaryAttacker = forwardPlayers.length > 0 ? randomItem(forwardPlayers) : randomItem(starters);
    const assistPlayer = starters.find(p => p.id !== primaryAttacker.id) || randomItem(starters);

    // Goal probability
    const effectiveAtk = attackingStats.atk * (isHomeAttacking && homeRedCards > 0 ? 0.85 : 1);
    const effectiveDef = defendingStats.def * (!isHomeAttacking && awayRedCards > 0 ? 0.85 : 1);
    const goalProb = Math.max(0.12, Math.min(0.48, (effectiveAtk / (effectiveAtk + effectiveDef)) * 0.45));

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
    } else if (roll > 0.88) {
      // Yellow Card on defender
      const defenders = defendingStats.starters.filter(p => p.position === 'Z' || p.position === 'V' || p.position === 'L');
      const foulPlayer = defenders.length > 0 ? randomItem(defenders) : randomItem(defendingStats.starters);
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

  return {
    homeId: homeClub.id,
    awayId: awayClub.id,
    homeScore,
    awayScore,
    homePenalties,
    awayPenalties,
    winnerId,
    played: true,
    events,
    possession: { home: homePossession, away: awayPossession },
    attendance,
    gateReceipts
  };
}
