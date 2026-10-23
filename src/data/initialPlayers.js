// Generator of original fictional players for Footkeep

const FIRST_NAMES = [
  'Lucas', 'Gabriel', 'Matheus', 'Rodrigo', 'Felipe', 'Rafael', 'Danilo', 'Arthur',
  'Thiago', 'Gustavo', 'Bruno', 'Diego', 'Leonardo', 'Vitor', 'Caio', 'Eduardo',
  'Marcos', 'Henrique', 'Igor', 'Renan', 'Bernardo', 'Murilo', 'Samuel', 'Renato',
  'Alexandre', 'Yuri', 'Alan', 'Everton', 'Pablo', 'Douglas', 'Erick', 'Davi'
];

const LAST_NAMES = [
  'Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira',
  'Lima', 'Gomes', 'Costa', 'Ribeiro', 'Martins', 'Carvalho', 'Almeida', 'Lopes',
  'Soares', 'Fernandes', 'Vieira', 'Barbosa', 'Rocha', 'Dias', 'Nascimento', 'Andrade',
  'Moreira', 'Nunes', 'Marques', 'Machado', 'Mendes', 'Freitas', 'Cardoso', 'Ramos'
];

const NICKNAMES = [
  'Canhota', 'Paredão', 'Foguete', 'Pitbull', 'Maestro', 'Flecha', 'Muralha',
  'Motorzinho', 'General', 'Artilheiro', 'Tanque', 'Raiô', 'Relâmpago', 'Mágico'
];

// Positions:
// G: Goleiro (GK)
// Z: Zagueiro (CB)
// L: Lateral (FB)
// V: Volante (DM)
// M: Meia (AM/CM)
// A: Atacante (ST/CF)
export const POSITIONS = [
  { code: 'G', name: 'Goleiro', min: 2, max: 3 },
  { code: 'Z', name: 'Zagueiro', min: 4, max: 5 },
  { code: 'L', name: 'Lateral', min: 3, max: 4 },
  { code: 'V', name: 'Volante', min: 3, max: 4 },
  { code: 'M', name: 'Meia', min: 3, max: 4 },
  { code: 'A', name: 'Atacante', min: 3, max: 5 }
];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generatePlayer(id, clubId = null, position = null, baseOverall = 70) {
  const firstName = FIRST_NAMES[randomInt(0, FIRST_NAMES.length - 1)];
  const lastName = LAST_NAMES[randomInt(0, LAST_NAMES.length - 1)];
  const hasNickname = Math.random() < 0.2;
  const name = hasNickname ? `${firstName} "${NICKNAMES[randomInt(0, NICKNAMES.length - 1)]}" ${lastName}` : `${firstName} ${lastName}`;

  const pos = position || POSITIONS[randomInt(0, POSITIONS.length - 1)].code;
  const age = randomInt(18, 35);
  
  // Overall variation based on club base
  const overall = Math.min(89, Math.max(50, Math.round(baseOverall + randomInt(-5, 6))));
  
  // Specific stats depending on position
  let def = pos === 'G' || pos === 'Z' || pos === 'V' ? randomInt(overall - 4, overall + 6) : randomInt(overall - 20, overall - 5);
  let fin = pos === 'A' ? randomInt(overall - 2, overall + 8) : (pos === 'M' ? randomInt(overall - 8, overall + 4) : randomInt(30, 60));
  let pas = pos === 'M' || pos === 'V' || pos === 'L' ? randomInt(overall - 4, overall + 7) : randomInt(overall - 15, overall + 2);
  let fis = randomInt(overall - 6, overall + 6);

  // Market value calculation
  const ageFactor = age < 24 ? 1.4 : (age > 30 ? 0.65 : 1.0);
  const baseValue = Math.pow(overall - 40, 2.7) * 1200 * ageFactor;
  const value = Math.round(baseValue / 10000) * 10000;
  const salary = Math.round((value * 0.007) / 1000) * 1000 + 4000;

  return {
    id: `ply_${id}`,
    name,
    clubId,
    position: pos,
    age,
    overall,
    fin: Math.min(99, Math.max(30, fin)),
    pas: Math.min(99, Math.max(30, pas)),
    def: Math.min(99, Math.max(30, def)),
    fis: Math.min(99, Math.max(30, fis)),
    value,
    salary,
    fitness: 100,
    morale: 'Alta',
    yellowCards: 0,
    redCards: 0,
    goals: 0,
    assists: 0,
    matchesPlayed: 0,
    isSuspended: false,
    isListed: false
  };
}

export function generateAllPlayers(clubs) {
  const players = [];
  let currentId = 1001;

  // Generate 20 players for each club
  clubs.forEach(club => {
    const baseRep = club.reputation || 75;
    
    // Squad structure: 2 G, 4 Z, 3 L, 4 V, 4 M, 4 A
    const squadDistribution = [
      { pos: 'G', count: 2 },
      { pos: 'Z', count: 4 },
      { pos: 'L', count: 3 },
      { pos: 'V', count: 4 },
      { pos: 'M', count: 4 },
      { pos: 'A', count: 4 }
    ];

    squadDistribution.forEach(group => {
      for (let i = 0; i < group.count; i++) {
        players.push(generatePlayer(currentId++, club.id, group.pos, baseRep));
      }
    });
  });

  // Generate Free Agents (Agentes Livres para contratação barata)
  for (let i = 0; i < 25; i++) {
    const freeAgent = generatePlayer(currentId++, null, null, 68);
    freeAgent.isListed = true;
    players.push(freeAgent);
  }

  return players;
}
