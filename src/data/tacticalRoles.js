// Tactical Roles and Regional Pitch Mapping for Footkeep
// Defines the 18 official tactical roles with Portuguese nomenclature and regional pitch compatibility.

export const TACTICAL_ROLES = {
  GK:  { code: 'GK',  name: 'Goleiro',                abbr: 'GOL', category: 'DEF_GOAL', basePos: 'G', description: 'Proteção sob as traves, saídas de gol e reposição rápida de bola.' },
  CB:  { code: 'CB',  name: 'Zagueiro',               abbr: 'ZAG', category: 'DEF_CENTRAL', basePos: 'Z', description: 'Combate direto, desarme na área e interceptações aéreas.' },
  RB:  { code: 'RB',  name: 'Lateral-Direito',        abbr: 'LD',  category: 'DEF_FLANK', basePos: 'L', description: 'Marcação pelo corredor direito com subidas de apoio.' },
  LB:  { code: 'LB',  name: 'Lateral-Esquerdo',       abbr: 'LE',  category: 'DEF_FLANK', basePos: 'L', description: 'Marcação pelo corredor esquerdo com subidas de apoio.' },
  RWB: { code: 'RWB', name: 'Ala-Direito',            abbr: 'ADD', category: 'MID_FLANK', basePos: 'L', description: 'Liberdade para apoiar toda a extensão da ala direita.' },
  LWB: { code: 'LWB', name: 'Ala-Esquerdo',           abbr: 'ADE', category: 'MID_FLANK', basePos: 'L', description: 'Liberdade para apoiar toda a extensão da ala esquerda.' },
  SW:  { code: 'SW',  name: 'Líbero',                 abbr: 'LIB', category: 'DEF_CENTRAL', basePos: 'Z', description: 'Cobertura defensiva e início de construção limpa da jogada.' },
  CDM: { code: 'CDM', name: 'Volante',                abbr: 'VOL', category: 'MID_DEF', basePos: 'V', description: 'Proteção à frente da zaga, desarmes e distribuição rápida.' },
  CM:  { code: 'CM',  name: 'Meio-Campista',          abbr: 'MC',  category: 'MID_CENTRAL', basePos: 'M', description: 'Conexão entre defesa e ataque com passes e dinâmica de jogo.' },
  CAM: { code: 'CAM', name: 'Meia-Atacante',          abbr: 'MEI', category: 'MID_OFF', basePos: 'M', description: 'Criação ofensiva, passes decisivos e chutes de média distância.' },
  RM:  { code: 'RM',  name: 'Meia-Direita',           abbr: 'MD',  category: 'MID_FLANK', basePos: 'M', description: 'Construção e recomposição pelo lado direito do meio-campo.' },
  LM:  { code: 'LM',  name: 'Meia-Esquerda',          abbr: 'ME',  category: 'MID_FLANK', basePos: 'M', description: 'Construção e recomposição pelo lado esquerdo do meio-campo.' },
  RW:  { code: 'RW',  name: 'Ponta-Direita',          abbr: 'PTD', category: 'ATK_WING', basePos: 'A', description: 'Velocidade, dribles e cruzamentos pela ponta direita.' },
  LW:  { code: 'LW',  name: 'Ponta-Esquerda',         abbr: 'PTE', category: 'ATK_WING', basePos: 'A', description: 'Velocidade, dribles e infiltrações pela ponta esquerda.' },
  CF:  { code: 'CF',  name: 'Segundo Atacante',       abbr: 'SA',  category: 'ATK_CENTRAL', basePos: 'A', description: 'Mobilidade em torno do centroavante com faro de gol e assistências.' },
  ST:  { code: 'ST',  name: 'Centroavante',           abbr: 'CA',  category: 'ATK_CENTRAL', basePos: 'A', description: 'Ponto focal de ataque, presença de área e finalizações letais.' },
  RF:  { code: 'RF',  name: 'Atacante pela Direita',  abbr: 'ATD', category: 'ATK_WING', basePos: 'A', description: 'Ataque incisivo e finalização partindo da meia-direita.' },
  LF:  { code: 'LF',  name: 'Atacante pela Esquerda', abbr: 'ATE', category: 'ATK_WING', basePos: 'A', description: 'Ataque incisivo e finalização partindo da meia-esquerda.' }
};

/**
 * Returns compatible tactical roles based on pitch coordinates (x: 0-100%, y: 0-100%).
 * y: 0 is top (attacking goal), y: 100 is bottom (defending goal).
 * x: 0 is left flank, x: 100 is right flank.
 */
export function getCompatibleRoles(x, y) {
  const cx = Math.max(5, Math.min(95, x));
  const cy = Math.max(5, Math.min(95, y));

  // 1. Defending Goalmouth / Deep Defensive Zone (cy >= 80)
  if (cy >= 80) {
    if (cx >= 32 && cx <= 68) {
      return ['GK', 'SW', 'CB'];
    }
    if (cx < 32) {
      return ['LB', 'CB', 'LWB'];
    }
    return ['RB', 'CB', 'RWB'];
  }

  // 2. Defensive Backline (62 <= cy < 80)
  if (cy >= 62) {
    if (cx < 28) {
      return ['LB', 'LWB', 'CB'];
    }
    if (cx > 72) {
      return ['RB', 'RWB', 'CB'];
    }
    if (cx >= 28 && cx <= 45) {
      return ['CB', 'SW', 'LB', 'CDM'];
    }
    if (cx >= 55 && cx <= 72) {
      return ['CB', 'SW', 'RB', 'CDM'];
    }
    return ['CB', 'SW', 'CDM'];
  }

  // 3. Defensive Midfield / Wings (48 <= cy < 62)
  if (cy >= 48) {
    if (cx < 26) {
      return ['LWB', 'LM', 'LB'];
    }
    if (cx > 74) {
      return ['RWB', 'RM', 'RB'];
    }
    if (cx < 42) {
      return ['CDM', 'CM', 'LWB'];
    }
    if (cx > 58) {
      return ['CDM', 'CM', 'RWB'];
    }
    return ['CDM', 'CM'];
  }

  // 4. Central / Attacking Midfield (30 <= cy < 48)
  if (cy >= 30) {
    if (cx < 28) {
      return ['LM', 'LW', 'LWB'];
    }
    if (cx > 72) {
      return ['RM', 'RW', 'RWB'];
    }
    if (cx >= 40 && cx <= 60) {
      return ['CAM', 'CM', 'CF', 'CDM'];
    }
    if (cx < 40) {
      return ['CAM', 'CM', 'LM', 'LF'];
    }
    return ['CAM', 'CM', 'RM', 'RF'];
  }

  // 5. Attacking Third / Penalty Box (cy < 30)
  if (cx < 32) {
    return ['LW', 'LF', 'LM', 'CF'];
  }
  if (cx > 68) {
    return ['RW', 'RF', 'RM', 'CF'];
  }
  if (cx >= 40 && cx <= 60) {
    return ['ST', 'CF', 'CAM'];
  }
  if (cx < 40) {
    return ['CF', 'ST', 'LF', 'LW'];
  }
  return ['CF', 'ST', 'RF', 'RW'];
}

/**
 * Returns default pitch slots for standard formations
 */
export const FORMATION_PRESETS = {
  '4-4-2': {
    name: '4-4-2 Clássico',
    slots: [
      { role: 'GK', x: 50, y: 88, name: 'Goleiro' },
      { role: 'LB', x: 15, y: 70, name: 'Lateral-Esquerdo' },
      { role: 'CB', x: 38, y: 73, name: 'Zagueiro' },
      { role: 'CB', x: 62, y: 73, name: 'Zagueiro' },
      { role: 'RB', x: 85, y: 70, name: 'Lateral-Direito' },
      { role: 'LM', x: 18, y: 46, name: 'Meia-Esquerda' },
      { role: 'CDM', x: 38, y: 52, name: 'Volante' },
      { role: 'CDM', x: 62, y: 52, name: 'Volante' },
      { role: 'RM', x: 82, y: 46, name: 'Meia-Direita' },
      { role: 'CF', x: 36, y: 22, name: 'Segundo Atacante' },
      { role: 'ST', x: 64, y: 22, name: 'Centroavante' }
    ]
  },
  '4-3-3': {
    name: '4-3-3 Ofensivo',
    slots: [
      { role: 'GK', x: 50, y: 88, name: 'Goleiro' },
      { role: 'LB', x: 15, y: 70, name: 'Lateral-Esquerdo' },
      { role: 'CB', x: 38, y: 73, name: 'Zagueiro' },
      { role: 'CB', x: 62, y: 73, name: 'Zagueiro' },
      { role: 'RB', x: 85, y: 70, name: 'Lateral-Direito' },
      { role: 'CDM', x: 50, y: 54, name: 'Volante' },
      { role: 'CM', x: 32, y: 42, name: 'Meio-Campista' },
      { role: 'CAM', x: 68, y: 42, name: 'Meia-Atacante' },
      { role: 'LW', x: 18, y: 22, name: 'Ponta-Esquerda' },
      { role: 'ST', x: 50, y: 18, name: 'Centroavante' },
      { role: 'RW', x: 82, y: 22, name: 'Ponta-Direita' }
    ]
  },
  '3-5-2': {
    name: '3-5-2 Equilibrado',
    slots: [
      { role: 'GK', x: 50, y: 88, name: 'Goleiro' },
      { role: 'CB', x: 28, y: 72, name: 'Zagueiro' },
      { role: 'SW', x: 50, y: 74, name: 'Líbero' },
      { role: 'CB', x: 72, y: 72, name: 'Zagueiro' },
      { role: 'LWB', x: 12, y: 48, name: 'Ala-Esquerdo' },
      { role: 'CDM', x: 38, y: 52, name: 'Volante' },
      { role: 'CDM', x: 62, y: 52, name: 'Volante' },
      { role: 'CAM', x: 50, y: 38, name: 'Meia-Atacante' },
      { role: 'RWB', x: 88, y: 48, name: 'Ala-Direito' },
      { role: 'CF', x: 36, y: 20, name: 'Segundo Atacante' },
      { role: 'ST', x: 64, y: 20, name: 'Centroavante' }
    ]
  },
  '4-2-3-1': {
    name: '4-2-3-1 Moderno',
    slots: [
      { role: 'GK', x: 50, y: 88, name: 'Goleiro' },
      { role: 'LB', x: 15, y: 70, name: 'Lateral-Esquerdo' },
      { role: 'CB', x: 38, y: 73, name: 'Zagueiro' },
      { role: 'CB', x: 62, y: 73, name: 'Zagueiro' },
      { role: 'RB', x: 85, y: 70, name: 'Lateral-Direito' },
      { role: 'CDM', x: 38, y: 56, name: 'Volante' },
      { role: 'CDM', x: 62, y: 56, name: 'Volante' },
      { role: 'LM', x: 20, y: 36, name: 'Meia-Esquerda' },
      { role: 'CAM', x: 50, y: 34, name: 'Meia-Atacante' },
      { role: 'RM', x: 80, y: 36, name: 'Meia-Direita' },
      { role: 'ST', x: 50, y: 18, name: 'Centroavante' }
    ]
  }
};
