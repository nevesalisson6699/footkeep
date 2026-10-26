// Youth Academy & Yearly Career Evolution Engine for Footkeep
// Generates realistic academy graduates (16-18 yo) and manages yearly player aging, attribute progression & retirements.
// Strict immutability and pure function design.

const BRAZIL_FIRST_NAMES = [
  'Kauã', 'Matheus', 'Arthur', 'Lucas', 'Gabriel', 'Biel', 'Davi', 'Samuel',
  'Bernardo', 'Murilo', 'Heitor', 'Nicolas', 'Felipe', 'Igor', 'Enzo', 'Vinicius',
  'Gustavo', 'Caio', 'Luan', 'Yuri', 'Renan', 'Rodrigo', 'Thiago', 'Bryan'
];

const BRAZIL_LAST_NAMES = [
  'Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira',
  'Lima', 'Gomes', 'Costa', 'Ribeiro', 'Martins', 'Carvalho', 'Almeida', 'Lopes',
  'Soares', 'Fernandes', 'Vieira', 'Barbosa', 'Rocha', 'Nascimento', 'Andrade', 'Mendes'
];

const EUROPE_FIRST_NAMES = [
  'Liam', 'Oliver', 'Noah', 'Leo', 'Lucas', 'Julian', 'Mateo', 'Hugo',
  'Arthur', 'Felix', 'Alexander', 'Theo', 'Max', 'Gabriel', 'Elias', 'Oscar'
];

const EUROPE_LAST_NAMES = [
  'Smith', 'Jones', 'Taylor', 'Brown', 'Williams', 'Davies', 'Evans', 'Wilson',
  'Garcia', 'Rodriguez', 'Fernandez', 'Lopez', 'Martinez', 'Sanchez', 'Perez', 'Gomez',
  'Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker'
];

const POSITIONS = ['G', 'Z', 'L', 'V', 'M', 'A'];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, Math.round(val)));
}

/**
 * Generates coherent attributes tailored to player position and overall
 */
function generateAttributesForPosition(position, overall) {
  const variance = () => Math.floor(Math.random() * 9) - 4; // -4 to +4

  switch (position) {
    case 'G':
      return {
        fin: clamp(25 + variance(), 15, 45),
        pas: clamp(55 + variance(), 40, 72),
        def: clamp(overall + variance(), 50, 95),
        fis: clamp(overall - 2 + variance(), 50, 95)
      };
    case 'Z':
      return {
        fin: clamp(35 + variance(), 20, 55),
        pas: clamp(overall - 8 + variance(), 45, 80),
        def: clamp(overall + 3 + variance(), 55, 96),
        fis: clamp(overall + 2 + variance(), 55, 96)
      };
    case 'L':
      return {
        fin: clamp(overall - 12 + variance(), 40, 78),
        pas: clamp(overall + 1 + variance(), 55, 88),
        def: clamp(overall - 2 + variance(), 50, 88),
        fis: clamp(overall + 3 + variance(), 55, 95)
      };
    case 'V':
      return {
        fin: clamp(overall - 10 + variance(), 45, 80),
        pas: clamp(overall + 2 + variance(), 55, 92),
        def: clamp(overall + 2 + variance(), 55, 92),
        fis: clamp(overall + 1 + variance(), 55, 94)
      };
    case 'M':
      return {
        fin: clamp(overall - 2 + variance(), 52, 90),
        pas: clamp(overall + 5 + variance(), 60, 96),
        def: clamp(overall - 14 + variance(), 35, 75),
        fis: clamp(overall - 2 + variance(), 50, 90)
      };
    case 'A':
      return {
        fin: clamp(overall + 5 + variance(), 60, 96),
        pas: clamp(overall - 4 + variance(), 50, 86),
        def: clamp(overall - 25 + variance(), 25, 60),
        fis: clamp(overall + 1 + variance(), 55, 92)
      };
    default:
      return {
        fin: overall,
        pas: overall,
        def: overall,
        fis: overall
      };
  }
}

/**
 * Calculates youth graduate market value based on age, overall and potential
 */
function calculateYouthValue(overall, potential, age) {
  const baseValue = Math.pow(overall / 10, 3.8) * 450;
  const potentialMultiplier = 1 + ((potential - overall) * 0.08);
  const youthBonus = age === 16 ? 1.4 : age === 17 ? 1.25 : 1.1;
  return Math.round((baseValue * potentialMultiplier * youthBonus) / 50000) * 50000;
}

/**
 * Generates a batch of youth academy prospects for a club
 * 
 * @param {string} clubId - Target club ID
 * @param {string} [competitionId] - 'brasileirao_serie_a' or 'premier_league'
 * @param {Object} [options]
 * @param {number} [options.count=3] - Number of graduates to generate (2 to 4)
 * @param {number} [options.clubReputation=72] - Club reputation (50 to 95)
 * @param {number} [options.seasonYear=2025] - Intake season year
 * @param {string} [options.clubName] - Club name for presentation
 * @returns {Array} List of newly created youth player objects
 */
export function generateYouthIntake(clubId, competitionId = 'brasileirao_serie_a', options = {}) {
  const {
    count = 3,
    clubReputation = 72,
    seasonYear = 2025,
    clubName = 'Clube'
  } = options;

  const isEuropean = String(competitionId).toLowerCase().includes('premier') || 
                    String(competitionId).toLowerCase().includes('laliga');

  const graduates = [];
  const assignedPositions = ['G', 'Z', 'L', 'V', 'M', 'A'].sort(() => Math.random() - 0.5);

  for (let i = 0; i < count; i++) {
    const age = Math.random() < 0.4 ? 16 : (Math.random() < 0.7 ? 17 : 18);
    const position = assignedPositions[i % assignedPositions.length];

    const firstName = isEuropean ? getRandomItem(EUROPE_FIRST_NAMES) : getRandomItem(BRAZIL_FIRST_NAMES);
    const lastName = isEuropean ? getRandomItem(EUROPE_LAST_NAMES) : getRandomItem(BRAZIL_LAST_NAMES);
    const fullName = `${firstName} ${lastName}`;

    // Overall calibrated to club reputation (reputation 60 -> ~62 ovr; reputation 85 -> ~71 ovr)
    const baseOvr = 58 + Math.round((clubReputation - 50) * 0.28) + Math.floor(Math.random() * 5);
    const overall = clamp(baseOvr, 58, 76);

    // Potential (typically +8 to +20 points above initial overall)
    const potentialGrowth = Math.floor(Math.random() * 11) + 8; // 8 to 18
    const potential = clamp(overall + potentialGrowth, overall + 5, 94);

    const attributes = generateAttributesForPosition(position, overall);
    const value = calculateYouthValue(overall, potential, age);
    const salary = Math.round((value * 0.0035) / 1000) * 1000; // Realistic modest youth contract

    const deterministicId = `ply_youth_${clubId}_${seasonYear}_${i + 1}`;

    graduates.push({
      id: deterministicId,
      name: fullName,
      clubId,
      clubName,
      age,
      position,
      overall,
      potential,
      fin: attributes.fin,
      pas: attributes.pas,
      def: attributes.def,
      fis: attributes.fis,
      value: Math.max(150000, value),
      salary: Math.max(8000, salary),
      matchesPlayed: 0,
      goals: 0,
      assists: 0,
      yellowCards: 0,
      redCards: 0,
      isSuspended: false,
      isYouthGraduate: true,
      intakeYear: seasonYear
    });
  }

  return graduates;
}

/**
 * Pure function that advances the age of all players by +1 year at the season transition,
 * processes realistic veteran retirements (35+ years old), and calculates attribute evolution/decay.
 * 
 * @param {Array} playersList - Current players array (never mutated)
 * @param {Object} [options]
 * @param {number} [options.transitionYear=2026] - Transition target year
 * @returns {Object} { updatedPlayers: Array, retiredPlayers: Array, summary: Object }
 */
export function processYearlyAgingAndRetirements(playersList = [], options = {}) {
  if (!Array.isArray(playersList)) {
    return { updatedPlayers: [], retiredPlayers: [], summary: { aged: 0, retired: 0, evolved: 0 } };
  }

  const { transitionYear = 2026 } = options;

  const updatedPlayers = [];
  const retiredPlayers = [];
  let evolvedCount = 0;

  playersList.forEach(player => {
    const newAge = (player.age || 24) + 1;
    const matches = player.matchesPlayed || 0;

    // Aposentadoria de Veteranos (35+ anos)
    let willRetire = false;
    let retirementReason = '';

    if (newAge >= 40) {
      willRetire = true;
      retirementReason = 'Idade avançada (40+ anos) - Pendurou as chuteiras';
    } else if (newAge >= 38) {
      // 38 ou 39 anos: 75% chance geral, 90% se jogou pouco
      const retireProb = matches < 10 ? 0.90 : 0.70;
      if (Math.random() < retireProb) {
        willRetire = true;
        retirementReason = matches < 10 
          ? 'Pouca minutagem e fim de carreira' 
          : 'Encerramento honroso de carreira como titular';
      }
    } else if (newAge >= 35) {
      // 35 a 37 anos: aposenta se quase não jogou (< 5 jogos) com chance de 45%
      if (matches < 5 && Math.random() < 0.45) {
        willRetire = true;
        retirementReason = 'Perda de espaço no elenco e decisão de aposentadoria precoce';
      }
    }

    if (willRetire) {
      retiredPlayers.push({
        ...player,
        age: newAge,
        retirementYear: transitionYear,
        retirementReason
      });
      return; // Atleta não segue para updatedPlayers
    }

    // Evolução ou declínio de atributos
    let ovrDelta = 0;
    let fisDelta = 0;

    if (newAge <= 21) {
      // Jovens evoluem (+1 a +3 se jogaram)
      ovrDelta = matches >= 15 ? 3 : matches >= 8 ? 2 : 1;
      fisDelta = 1;
      evolvedCount++;
    } else if (newAge <= 25) {
      // Entrada no auge (+0 a +2)
      ovrDelta = matches >= 15 ? 1 : 0;
      fisDelta = 0;
      if (ovrDelta > 0) evolvedCount++;
    } else if (newAge >= 33) {
      // Declínio físico de veteranos ativos
      ovrDelta = newAge >= 36 ? -2 : -1;
      fisDelta = newAge >= 36 ? -3 : -2;
    }

    const nextOverall = clamp((player.overall || 70) + ovrDelta, 45, 97);
    const nextFis = clamp((player.fis || 70) + fisDelta, 40, 98);
    const nextDef = clamp((player.def || 70) + (ovrDelta > 0 ? 1 : (ovrDelta < 0 ? -1 : 0)), 35, 98);
    const nextPas = clamp((player.pas || 70) + (ovrDelta > 0 ? 1 : (ovrDelta < 0 ? -1 : 0)), 35, 98);
    const nextFin = clamp((player.fin || 70) + (ovrDelta > 0 ? 1 : (ovrDelta < 0 ? -1 : 0)), 35, 98);

    // Ajuste de valor de mercado na virada de ano
    let nextValue = player.value || 1000000;
    if (newAge >= 33) {
      nextValue = Math.round((nextValue * 0.75) / 50000) * 50000;
    } else if (ovrDelta > 0) {
      nextValue = Math.round((nextValue * 1.2) / 50000) * 50000;
    }

    updatedPlayers.push({
      ...player,
      age: newAge,
      overall: nextOverall,
      fis: nextFis,
      def: nextDef,
      pas: nextPas,
      fin: nextFin,
      value: Math.max(100000, nextValue),
      // Reseta estatísticas da temporada passada para o novo ano
      matchesPlayed: 0,
      goals: 0,
      assists: 0,
      yellowCards: 0,
      redCards: 0,
      isSuspended: false
    });
  });

  return {
    updatedPlayers,
    retiredPlayers,
    summary: {
      aged: updatedPlayers.length + retiredPlayers.length,
      retired: retiredPlayers.length,
      evolved: evolvedCount
    }
  };
}
