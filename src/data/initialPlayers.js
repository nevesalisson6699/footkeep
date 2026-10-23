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

export const POSITIONS = [
  { code: 'G', name: 'Goleiro' },
  { code: 'Z', name: 'Zagueiro' },
  { code: 'L', name: 'Lateral' },
  { code: 'V', name: 'Volante' },
  { code: 'M', name: 'Meia' },
  { code: 'A', name: 'Atacante' }
];

export const FORMATION_ROLES = {
  '4-4-2': ['G', 'Z', 'Z', 'L', 'L', 'V', 'V', 'M', 'M', 'A', 'A'],
  '4-3-3': ['G', 'Z', 'Z', 'L', 'L', 'V', 'M', 'M', 'A', 'A', 'A'],
  '3-5-2': ['G', 'Z', 'Z', 'Z', 'L', 'L', 'V', 'V', 'M', 'A', 'A'],
  '4-2-3-1': ['G', 'Z', 'Z', 'L', 'L', 'V', 'V', 'M', 'M', 'M', 'A']
};

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

// Reorders a squad so that indices 0..10 match the requested formation roles with the best available players
export function sortSquadForFormation(squad, formation = '4-4-2') {
  if (!squad || squad.length === 0) return squad;

  const roles = FORMATION_ROLES[formation] || FORMATION_ROLES['4-4-2'];
  const pool = [...squad].sort((a, b) => b.overall - a.overall);
  const starters = [];
  const usedIds = new Set();

  // For each required role, select the best unassigned player
  roles.forEach(role => {
    // 1. Try exact position
    let candidate = pool.find(p => !usedIds.has(p.id) && p.position === role);

    // 2. If no exact match, fallback to compatible position
    if (!candidate) {
      if (role === 'M' || role === 'V') {
        candidate = pool.find(p => !usedIds.has(p.id) && (p.position === 'M' || p.position === 'V' || p.position === 'L'));
      } else if (role === 'A') {
        candidate = pool.find(p => !usedIds.has(p.id) && (p.position === 'A' || p.position === 'M'));
      } else if (role === 'Z' || role === 'L') {
        candidate = pool.find(p => !usedIds.has(p.id) && (p.position === 'Z' || p.position === 'L' || p.position === 'V'));
      }
    }

    // 3. Fallback to any best available player
    if (!candidate) {
      candidate = pool.find(p => !usedIds.has(p.id));
    }

    if (candidate) {
      starters.push(candidate);
      usedIds.add(candidate.id);
    }
  });

  // Bench: all remaining players sorted by overall
  const bench = pool.filter(p => !usedIds.has(p.id));

  return [...starters, ...bench];
}

export function generateAllPlayers(clubs) {
  const allPlayers = [];
  let currentId = 1001;

  // Generate 20 players for each club
  clubs.forEach(club => {
    const baseRep = club.reputation || 75;
    const clubPlayers = [];
    
    // Squad structure: 2 G, 4 Z, 3 L, 4 V, 4 M, 4 A (Total 21 players)
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
        clubPlayers.push(generatePlayer(currentId++, club.id, group.pos, baseRep));
      }
    });

    // Automatically sort each club's squad so top 11 are balanced 4-4-2 starters!
    const balancedSquad = sortSquadForFormation(clubPlayers, '4-4-2');
    allPlayers.push(...balancedSquad);
  });

  // Generate Free Agents (Agentes Livres para contratação)
  for (let i = 0; i < 25; i++) {
    const freeAgent = generatePlayer(currentId++, null, null, 68);
    freeAgent.isListed = true;
    allPlayers.push(freeAgent);
  }

  return allPlayers;
}
