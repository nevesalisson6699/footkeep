// Competition Engine: Round-Robin League & Knockout Cup Bracket

/**
 * Generates full league fixtures (Turno e Returno com mando invertido)
 * Para 20 clubes da Série A: gera exatamente 38 rodadas (19 turno + 19 returno),
 * cada rodada com exatamente 10 partidas (total de 380 partidas).
 * Todas as partidas iniciam estritamente com played: false, homeScore: null, awayScore: null, events: [].
 * 
 * @param {Array} clubs - Lista de clubes participantes
 * @returns {Array} Lista completa de rodadas com partidas estruturadas
 */
export function generateLeagueFixtures(clubs) {
  if (!Array.isArray(clubs) || clubs.length < 2) return [];

  const clubIds = clubs.map(c => c.id);
  const n = clubIds.length;
  const isOdd = n % 2 !== 0;
  const teams = isOdd ? [...clubIds, null] : [...clubIds];
  const numTeams = teams.length;
  const totalRoundsFirstLeg = numTeams - 1; // 19 rodadas para 20 clubes (15 para 16 clubes)
  const matchesPerRound = numTeams / 2;     // 10 jogos por rodada para 20 clubes (8 para 16 clubes)
  const rounds = [];

  const pool = [...teams];

  // Turno (Primeira metade da competição)
  for (let roundIdx = 0; roundIdx < totalRoundsFirstLeg; roundIdx++) {
    const matches = [];
    for (let i = 0; i < matchesPerRound; i++) {
      const home = pool[i];
      const away = pool[numTeams - 1 - i];

      if (home === null || away === null) continue;

      // Alterna mando de campo entre as rodadas para equilíbrio de mando
      if (roundIdx % 2 === 1) {
        matches.push({
          homeId: away,
          awayId: home,
          played: false,
          homeScore: null,
          awayScore: null,
          events: []
        });
      } else {
        matches.push({
          homeId: home,
          awayId: away,
          played: false,
          homeScore: null,
          awayScore: null,
          events: []
        });
      }
    }

    rounds.push({
      roundNumber: roundIdx + 1,
      type: 'league',
      name: `Rodada ${roundIdx + 1}`,
      matches
    });

    // Rotação canônica do método circular (Circle method), mantendo o índice 0 fixo
    const fixed = pool[0];
    const rest = pool.slice(1);
    const last = rest.pop();
    rest.unshift(last);
    pool.splice(0, pool.length, fixed, ...rest);
  }

  // Returno (Segunda metade: espelho do turno com mandos rigorosamente invertidos)
  for (let roundIdx = 0; roundIdx < totalRoundsFirstLeg; roundIdx++) {
    const firstLegRound = rounds[roundIdx];
    const reverseMatches = firstLegRound.matches.map(m => ({
      homeId: m.awayId,
      awayId: m.homeId,
      played: false,
      homeScore: null,
      awayScore: null,
      events: []
    }));

    rounds.push({
      roundNumber: roundIdx + totalRoundsFirstLeg + 1,
      type: 'league',
      name: `Rodada ${roundIdx + totalRoundsFirstLeg + 1} (Returno)`,
      matches: reverseMatches
    });
  }

  return rounds;
}

// Generates the 16-team single-elimination Cup Bracket
export function generateInitialCup(clubs) {
  // Shuffle or seed 16 clubs into 8 initial matches
  const shuffled = [...clubs].sort(() => Math.random() - 0.5);
  const matches = [];

  for (let i = 0; i < 8; i++) {
    matches.push({
      matchId: `cup_r16_${i + 1}`,
      homeId: shuffled[i * 2].id,
      awayId: shuffled[i * 2 + 1].id,
      played: false,
      homeScore: null,
      awayScore: null,
      homePenalties: null,
      awayPenalties: null,
      winnerId: null,
      events: []
    });
  }

  return {
    currentPhase: 'oitavas', // oitavas -> quartas -> semi -> final
    phases: {
      oitavas: { name: 'Oitavas de Final', matches },
      quartas: { name: 'Quartas de Final', matches: [] },
      semi: { name: 'Semifinal', matches: [] },
      final: { name: 'Grande Final', matches: [] }
    },
    championId: null
  };
}

// Advances Cup to next phase once all matches in current phase are done
export function advanceCupPhase(cupState) {
  const current = cupState.currentPhase;
  const currentMatches = cupState.phases[current].matches;

  // Check if all played
  if (currentMatches.some(m => !m.played || !m.winnerId)) {
    return cupState;
  }

  const winners = currentMatches.map(m => m.winnerId);

  if (current === 'oitavas') {
    const nextMatches = [];
    for (let i = 0; i < 4; i++) {
      nextMatches.push({
        matchId: `cup_qf_${i + 1}`,
        homeId: winners[i * 2],
        awayId: winners[i * 2 + 1],
        played: false,
        homeScore: null,
        awayScore: null,
        homePenalties: null,
        awayPenalties: null,
        winnerId: null,
        events: []
      });
    }
    return {
      ...cupState,
      currentPhase: 'quartas',
      phases: {
        ...cupState.phases,
        quartas: { ...cupState.phases.quartas, matches: nextMatches }
      }
    };
  } else if (current === 'quartas') {
    const nextMatches = [];
    for (let i = 0; i < 2; i++) {
      nextMatches.push({
        matchId: `cup_sf_${i + 1}`,
        homeId: winners[i * 2],
        awayId: winners[i * 2 + 1],
        played: false,
        homeScore: null,
        awayScore: null,
        homePenalties: null,
        awayPenalties: null,
        winnerId: null,
        events: []
      });
    }
    return {
      ...cupState,
      currentPhase: 'semi',
      phases: {
        ...cupState.phases,
        semi: { ...cupState.phases.semi, matches: nextMatches }
      }
    };
  } else if (current === 'semi') {
    const finalMatch = [{
      matchId: 'cup_final',
      homeId: winners[0],
      awayId: winners[1],
      played: false,
      homeScore: null,
      awayScore: null,
      homePenalties: null,
      awayPenalties: null,
      winnerId: null,
      events: []
    }];
    return {
      ...cupState,
      currentPhase: 'final',
      phases: {
        ...cupState.phases,
        final: { ...cupState.phases.final, matches: finalMatch }
      }
    };
  } else if (current === 'final') {
    return {
      ...cupState,
      championId: winners[0]
    };
  }

  return cupState;
}

/**
 * Retorna imediatamente a tabela da liga zerada para todos os clubes informados.
 * Ordenação inicial alfabética limpa e determinística.
 * 
 * @param {Array} clubs - Lista de clubes participantes
 * @returns {Array} Tabela inicial com todas as estatísticas zeradas
 */
export function getInitialStandings(clubs) {
  if (!Array.isArray(clubs) || clubs.length === 0) return [];

  // Ordenação alfabética limpa e previsível para o estado inicial
  const sortedClubs = [...clubs].sort((a, b) => (a.name || '').localeCompare(b.name || ''));

  return sortedClubs.map(c => ({
    clubId: c.id,
    name: c.name,
    badgeEmoji: c.badgeEmoji || '⚽',
    points: 0,
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0
  }));
}

/**
 * Calcula a tabela de classificação da liga com base nas rodadas disputadas.
 * - Se nenhuma partida foi jogada, retorna todos os clubes com estatísticas zeradas.
 * - Apenas partidas com played: true e placar numérico não nulo somam estatísticas.
 * - Ordenação com zero jogos é estritamente limpa e determinística (alfabética).
 * 
 * @param {Array} clubs - Lista de clubes
 * @param {Array} rounds - Lista de rodadas da liga
 * @returns {Array} Tabela de classificação atualizada
 */
export function calculateStandings(clubs, rounds) {
  if (!Array.isArray(clubs) || clubs.length === 0) return [];

  const table = {};

  // Inicializa todos os clubes estritamente zerados
  clubs.forEach(c => {
    table[c.id] = {
      clubId: c.id,
      name: c.name,
      badgeEmoji: c.badgeEmoji || '⚽',
      points: 0,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0
    };
  });

  const safeRounds = Array.isArray(rounds) ? rounds : [];

  safeRounds.forEach(round => {
    if (!round || !Array.isArray(round.matches)) return;

    round.matches.forEach(m => {
      // Apenas partidas com played: true e placar não nulo somam estatísticas
      if (
        m.played !== true ||
        m.homeScore === null ||
        m.awayScore === null ||
        typeof m.homeScore !== 'number' ||
        typeof m.awayScore !== 'number' ||
        isNaN(m.homeScore) ||
        isNaN(m.awayScore)
      ) {
        return;
      }

      const home = table[m.homeId];
      const away = table[m.awayId];
      if (!home || !away) return;

      home.played += 1;
      away.played += 1;
      home.goalsFor += m.homeScore;
      home.goalsAgainst += m.awayScore;
      away.goalsFor += m.awayScore;
      away.goalsAgainst += m.homeScore;

      if (m.homeScore > m.awayScore) {
        home.won += 1;
        home.points += 3;
        away.lost += 1;
      } else if (m.homeScore < m.awayScore) {
        away.won += 1;
        away.points += 3;
        home.lost += 1;
      } else {
        home.drawn += 1;
        away.drawn += 1;
        home.points += 1;
        away.points += 1;
      }

      home.goalDifference = home.goalsFor - home.goalsAgainst;
      away.goalDifference = away.goalsFor - away.goalsAgainst;
    });
  });

  // Critérios de Desempate: Pontos DESC, Saldo de Gols DESC, Gols Pró DESC, Vitórias DESC, Nome ASC
  // Quando nenhuma partida foi jogada, todos empatam em zero e a ordenação alfabética garante tabela limpa e determinística
  return Object.values(table).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
    if (b.won !== a.won) return b.won - a.won;
    return (a.name || '').localeCompare(b.name || '');
  });
}
