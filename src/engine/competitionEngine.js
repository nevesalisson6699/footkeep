// Competition Engine: Round-Robin League & Knockout Cup Bracket

// Generates 30 rounds (Turno e Returno) for 16 clubs
export function generateLeagueFixtures(clubs) {
  const clubIds = clubs.map(c => c.id);
  const n = clubIds.length;
  const rounds = [];
  const totalRoundsFirstLeg = n - 1; // 15 rounds

  const teams = [...clubIds];

  // Circle method round-robin
  for (let roundIdx = 0; roundIdx < totalRoundsFirstLeg; roundIdx++) {
    const matches = [];
    for (let i = 0; i < n / 2; i++) {
      const home = teams[i];
      const away = teams[n - 1 - i];

      // Alternate home/away to balance
      if (roundIdx % 2 === 1) {
        matches.push({ homeId: away, awayId: home, played: false, homeScore: null, awayScore: null, events: [] });
      } else {
        matches.push({ homeId: home, awayId: away, played: false, homeScore: null, awayScore: null, events: [] });
      }
    }
    rounds.push({
      roundNumber: roundIdx + 1,
      type: 'league',
      name: `Rodada ${roundIdx + 1}`,
      matches
    });

    // Rotate teams keeping index 0 fixed
    const fixed = teams[0];
    const rest = teams.slice(1);
    const last = rest.pop();
    rest.unshift(last);
    teams.splice(0, teams.length, fixed, ...rest);
  }

  // Second leg (Returno - reverse home/away)
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

// Calculate standings table from played league rounds
export function calculateStandings(clubs, rounds) {
  const table = {};

  clubs.forEach(c => {
    table[c.id] = {
      clubId: c.id,
      name: c.name,
      badgeEmoji: c.badgeEmoji,
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

  rounds.forEach(round => {
    round.matches.forEach(m => {
      if (!m.played || m.homeScore === null || m.awayScore === null) return;

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

  // Sort: Points DESC, Goal Difference DESC, Goals For DESC, Name ASC
  return Object.values(table).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
    return a.name.localeCompare(b.name);
  });
}
