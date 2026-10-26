/**
 * Footkeep Global Regions Competitions & Squads Catalog (Temporada 2025/2026)
 * Módulo de Expansão Continental: Américas, Ásia, Oceania, África e Seleções Mundiais
 * 
 * Regiões e Competições Suportadas:
 * 1. Américas:
 *    - Major League Soccer (MLS - EUA/Canadá)
 *    - Liga MX (México)
 *    - CONMEBOL Copa Libertadores (América do Sul)
 *    - Eliminatórias da Copa do Mundo - América do Sul (CONMEBOL)
 * 2. Ásia e Oceania:
 *    - Indian Super League (Índia)
 *    - Chinese Super League (China)
 *    - J1 League (Japão)
 *    - K League 2 (Coreia do Sul)
 *    - A-League Men (Austrália)
 *    - Eliminatórias da Copa do Mundo - Ásia (AFC)
 *    - AFC Champions League Elite (Ásia / Arábia Saudita / EAU)
 * 3. África e Global:
 *    - Premier League da África do Sul (Betway Premiership / PSL)
 *    - Amistosos Internacionais (FIFA Friendly International)
 * 
 * Governança e Integridade:
 * - Todos os valores de passe e salários possuem a flag isEstimate: true.
 * - Todos os atletas nascem com estatísticas zeradas para a carreira simulada.
 */

export const GLOBAL_REGIONS_METADATA = {
  season: '2025/26',
  auditDate: 'Outubro de 2026',
  provider: 'Footkeep Global Scouting Network',
  regionsCovered: ['Américas', 'Ásia & Oceania', 'África', 'Seleções Globais FIFA'],
  legalNotice: 'Registros para equilíbrio competitivo e simulação desportiva. Identidades e marcas respeitadas conforme legislação vigente.'
};

/**
 * Catálogo Estruturado de Metadados das Novas Competições
 */
export const GLOBAL_COMPETITIONS_METADATA = {
  // --- AMÉRICAS ---
  mls: {
    id: 'mls',
    name: 'Major League Soccer',
    shortName: 'MLS',
    region: 'Américas',
    country: 'Estados Unidos',
    countryFlag: '🇺🇸',
    confederation: 'CONCACAF',
    type: 'league',
    season: '2025/26',
    teamsCount: 29,
    tier: 1,
    source: 'MLS Official Squad Registry / FIFA TMS'
  },
  liga_mx: {
    id: 'liga_mx',
    name: 'Liga MX',
    shortName: 'Liga MX',
    region: 'Américas',
    country: 'México',
    countryFlag: '🇲🇽',
    confederation: 'CONCACAF',
    type: 'league',
    season: '2025/26',
    teamsCount: 18,
    tier: 1,
    source: 'FMF / Liga BBVA MX Official'
  },
  copa_libertadores: {
    id: 'copa_libertadores',
    name: 'CONMEBOL Copa Libertadores',
    shortName: 'Libertadores',
    region: 'Américas',
    country: 'América do Sul',
    countryFlag: '🌎',
    confederation: 'CONMEBOL',
    type: 'continental_cup',
    season: '2025/26',
    teamsCount: 32,
    tier: 1,
    source: 'CONMEBOL Official Club Competitions'
  },
  eliminatorias_conmebol: {
    id: 'eliminatorias_conmebol',
    name: 'Eliminatórias da Copa do Mundo — América do Sul',
    shortName: 'Eliminatórias CONMEBOL',
    region: 'Américas',
    country: 'América do Sul',
    countryFlag: '🌎',
    confederation: 'CONMEBOL',
    type: 'national_qualifiers',
    season: '2025/26',
    teamsCount: 10,
    tier: 1,
    source: 'FIFA / CONMEBOL World Cup Qualifying'
  },

  // --- ÁSIA E OCEANIA ---
  indian_super_league: {
    id: 'indian_super_league',
    name: 'Indian Super League',
    shortName: 'ISL Índia',
    region: 'Ásia & Oceania',
    country: 'Índia',
    countryFlag: '🇮🇳',
    confederation: 'AFC',
    type: 'league',
    season: '2025/26',
    teamsCount: 13,
    tier: 1,
    source: 'AIFF / Indian Super League'
  },
  chinese_super_league: {
    id: 'chinese_super_league',
    name: 'Chinese Super League',
    shortName: 'CSL China',
    region: 'Ásia & Oceania',
    country: 'China',
    countryFlag: '🇨🇳',
    confederation: 'AFC',
    type: 'league',
    season: '2025/26',
    teamsCount: 16,
    tier: 1,
    source: 'CFA / Chinese Super League'
  },
  j_league: {
    id: 'j_league',
    name: 'J1 League',
    shortName: 'J-League',
    region: 'Ásia & Oceania',
    country: 'Japão',
    countryFlag: '🇯🇵',
    confederation: 'AFC',
    type: 'league',
    season: '2025/26',
    teamsCount: 20,
    tier: 1,
    source: 'JFA / J.League Official'
  },
  k_league_2: {
    id: 'k_league_2',
    name: 'K League 2',
    shortName: 'K League 2',
    region: 'Ásia & Oceania',
    country: 'Coreia do Sul',
    countryFlag: '🇰🇷',
    confederation: 'AFC',
    type: 'league',
    season: '2025/26',
    teamsCount: 13,
    tier: 2,
    source: 'KFA / K League Official'
  },
  a_league: {
    id: 'a_league',
    name: 'A-League Men',
    shortName: 'A-League',
    region: 'Ásia & Oceania',
    country: 'Austrália',
    countryFlag: '🇦🇺',
    confederation: 'AFC',
    type: 'league',
    season: '2025/26',
    teamsCount: 13,
    tier: 1,
    source: 'Football Australia / A-Leagues'
  },
  eliminatorias_afc: {
    id: 'eliminatorias_afc',
    name: 'Eliminatórias da Copa do Mundo — Ásia',
    shortName: 'Eliminatórias AFC',
    region: 'Ásia & Oceania',
    country: 'Ásia',
    countryFlag: '🌏',
    confederation: 'AFC',
    type: 'national_qualifiers',
    season: '2025/26',
    teamsCount: 18,
    tier: 1,
    source: 'FIFA / AFC World Cup Qualifying'
  },
  afc_champions_league: {
    id: 'afc_champions_league',
    name: 'AFC Champions League Elite',
    shortName: 'AFC Champions',
    region: 'Ásia & Oceania',
    country: 'Ásia',
    countryFlag: '⭐',
    confederation: 'AFC',
    type: 'continental_cup',
    season: '2025/26',
    teamsCount: 24,
    tier: 1,
    source: 'Asian Football Confederation'
  },

  // --- ÁFRICA E GLOBAL ---
  south_african_psl: {
    id: 'south_african_psl',
    name: 'South African Premier Division',
    shortName: 'PSL África do Sul',
    region: 'África',
    country: 'África do Sul',
    countryFlag: '🇿🇦',
    confederation: 'CAF',
    type: 'league',
    season: '2025/26',
    teamsCount: 16,
    tier: 1,
    source: 'PSL / SAFA Official'
  },
  friendly_international: {
    id: 'friendly_international',
    name: 'Amistosos Internacionais FIFA',
    shortName: 'Amistosos FIFA',
    region: 'Global',
    country: 'Global',
    countryFlag: '🌐',
    confederation: 'FIFA',
    type: 'international_friendly',
    season: '2025/26',
    teamsCount: 32,
    tier: 1,
    source: 'FIFA International Match Calendar'
  }
};

/**
 * Clubes e Atletas das Competições Regionais
 */
export const GLOBAL_REGIONS_CLUBS = [
  // ==========================================
  // AMÉRICAS: MLS (EUA / CANADÁ)
  // ==========================================
  {
    id: 'mia',
    name: 'Inter Miami CF',
    shortName: 'MIA',
    country: 'Estados Unidos',
    countryFlag: '🇺🇸',
    leagueId: 'mls',
    leagueName: 'Major League Soccer',
    badgeEmoji: '🦩',
    colors: { primary: '#f7b5cd', secondary: '#231f20', accent: '#ffffff' },
    budget: 65000000,
    reputation: 89,
    players: [
      { name: 'Lionel Messi', pos: 'A', age: 38, ovr: 88, fin: 91, pas: 92, def: 35, fis: 68 },
      { name: 'Luis Suárez', pos: 'A', age: 38, ovr: 83, fin: 88, pas: 79, def: 44, fis: 72 },
      { name: 'Sergio Busquets', pos: 'V', age: 37, ovr: 82, fin: 62, pas: 88, def: 80, fis: 66 },
      { name: 'Jordi Alba', pos: 'L', age: 36, ovr: 81, fin: 68, pas: 84, def: 77, fis: 74 },
      { name: 'Federico Redondo', pos: 'V', age: 22, ovr: 78, fin: 65, pas: 81, def: 78, fis: 79 },
      { name: 'Drake Callender', pos: 'G', age: 28, ovr: 77, fin: 20, pas: 66, def: 78, fis: 78 }
    ]
  },
  {
    id: 'lafc',
    name: 'Los Angeles FC',
    shortName: 'LAFC',
    country: 'Estados Unidos',
    countryFlag: '🇺🇸',
    leagueId: 'mls',
    leagueName: 'Major League Soccer',
    badgeEmoji: '🦅',
    colors: { primary: '#000000', secondary: '#c39e5c', accent: '#ffffff' },
    budget: 45000000,
    reputation: 83,
    players: [
      { name: 'Denis Bouanga', pos: 'A', age: 30, ovr: 82, fin: 85, pas: 76, def: 45, fis: 83 },
      { name: 'Olivier Giroud', pos: 'A', age: 39, ovr: 81, fin: 86, pas: 74, def: 42, fis: 76 },
      { name: 'Hugo Lloris', pos: 'G', age: 38, ovr: 80, fin: 22, pas: 70, def: 81, fis: 74 },
      { name: 'Eduard Atuesta', pos: 'M', age: 28, ovr: 78, fin: 70, pas: 80, def: 74, fis: 77 }
    ]
  },
  {
    id: 'lag',
    name: 'LA Galaxy',
    shortName: 'LAG',
    country: 'Estados Unidos',
    countryFlag: '🇺🇸',
    leagueId: 'mls',
    leagueName: 'Major League Soccer',
    badgeEmoji: '⭐',
    colors: { primary: '#00245d', secondary: '#ffd200', accent: '#ffffff' },
    budget: 42000000,
    reputation: 82,
    players: [
      { name: 'Riqui Puig', pos: 'M', age: 26, ovr: 82, fin: 76, pas: 86, def: 62, fis: 72 },
      { name: 'Gabriel Pec', pos: 'A', age: 24, ovr: 79, fin: 80, pas: 76, def: 52, fis: 81 },
      { name: 'Joseph Paintsil', pos: 'A', age: 27, ovr: 79, fin: 81, pas: 74, def: 46, fis: 86 },
      { name: 'Maya Yoshida', pos: 'Z', age: 37, ovr: 76, fin: 40, pas: 65, def: 78, fis: 74 }
    ]
  },

  // ==========================================
  // AMÉRICAS: LIGA MX (MÉXICO)
  // ==========================================
  {
    id: 'ame_mx',
    name: 'Club América',
    shortName: 'AME-MX',
    country: 'México',
    countryFlag: '🇲🇽',
    leagueId: 'liga_mx',
    leagueName: 'Liga MX',
    badgeEmoji: '🦅',
    colors: { primary: '#002956', secondary: '#fbee21', accent: '#c62026' },
    budget: 48000000,
    reputation: 85,
    players: [
      { name: 'Henry Martín', pos: 'A', age: 32, ovr: 81, fin: 84, pas: 74, def: 46, fis: 82 },
      { name: 'Álvaro Fidalgo', pos: 'M', age: 28, ovr: 81, fin: 74, pas: 85, def: 68, fis: 76 },
      { name: 'Alejandro Zendejas', pos: 'A', age: 27, ovr: 79, fin: 79, pas: 78, def: 55, fis: 79 },
      { name: 'Luis Malagón', pos: 'G', age: 28, ovr: 80, fin: 20, pas: 68, def: 81, fis: 79 },
      { name: 'Sebastián Cáceres', pos: 'Z', age: 26, ovr: 78, fin: 35, pas: 68, def: 80, fis: 81 }
    ]
  },
  {
    id: 'mon',
    name: 'CF Monterrey',
    shortName: 'MON',
    country: 'México',
    countryFlag: '🇲🇽',
    leagueId: 'liga_mx',
    leagueName: 'Liga MX',
    badgeEmoji: '🤠',
    colors: { primary: '#001944', secondary: '#ffffff', accent: '#0083ca' },
    budget: 52000000,
    reputation: 84,
    players: [
      { name: 'Sergio Canales', pos: 'M', age: 34, ovr: 83, fin: 82, pas: 86, def: 62, fis: 74 },
      { name: 'Lucas Ocampos', pos: 'A', age: 31, ovr: 81, fin: 81, pas: 78, def: 62, fis: 83 },
      { name: 'Óliver Torres', pos: 'M', age: 30, ovr: 79, fin: 74, pas: 82, def: 65, fis: 75 },
      { name: 'Germán Berterame', pos: 'A', age: 26, ovr: 79, fin: 81, pas: 72, def: 48, fis: 80 }
    ]
  },
  {
    id: 'tig',
    name: 'Tigres UANL',
    shortName: 'TIG',
    country: 'México',
    countryFlag: '🇲🇽',
    leagueId: 'liga_mx',
    leagueName: 'Liga MX',
    badgeEmoji: '🐯',
    colors: { primary: '#f6b21b', secondary: '#00549f', accent: '#ffffff' },
    budget: 50000000,
    reputation: 84,
    players: [
      { name: 'André-Pierre Gignac', pos: 'A', age: 39, ovr: 81, fin: 87, pas: 74, def: 40, fis: 76 },
      { name: 'Juan Brunetta', pos: 'M', age: 28, ovr: 81, fin: 80, pas: 83, def: 60, fis: 78 },
      { name: 'Fernando Gorriarán', pos: 'V', age: 30, ovr: 79, fin: 72, pas: 80, def: 79, fis: 81 },
      { name: 'Nahuel Guzmán', pos: 'G', age: 39, ovr: 78, fin: 25, pas: 68, def: 79, fis: 76 }
    ]
  },

  // ==========================================
  // AMÉRICAS: COPA LIBERTADORES (SUL-AMERICANOS)
  // ==========================================
  {
    id: 'riv',
    name: 'River Plate',
    shortName: 'RIV',
    country: 'Argentina',
    countryFlag: '🇦🇷',
    leagueId: 'copa_libertadores',
    leagueName: 'Copa Libertadores',
    badgeEmoji: '⚪',
    colors: { primary: '#ffffff', secondary: '#eb1c24', accent: '#000000' },
    budget: 55000000,
    reputation: 88,
    players: [
      { name: 'Miguel Borja', pos: 'A', age: 32, ovr: 81, fin: 85, pas: 68, def: 42, fis: 84 },
      { name: 'Franco Armani', pos: 'G', age: 39, ovr: 80, fin: 20, pas: 65, def: 81, fis: 77 },
      { name: 'Germán Pezzella', pos: 'Z', age: 34, ovr: 81, fin: 45, pas: 70, def: 83, fis: 80 },
      { name: 'Marcos Acuña', pos: 'L', age: 33, ovr: 82, fin: 72, pas: 82, def: 80, fis: 81 },
      { name: 'Manuel Lanzini', pos: 'M', age: 32, ovr: 79, fin: 78, pas: 82, def: 55, fis: 74 },
      { name: 'Facundo Colidio', pos: 'A', age: 25, ovr: 78, fin: 79, pas: 75, def: 48, fis: 78 }
    ]
  },
  {
    id: 'boc',
    name: 'Boca Juniors',
    shortName: 'BOC',
    country: 'Argentina',
    countryFlag: '🇦🇷',
    leagueId: 'copa_libertadores',
    leagueName: 'Copa Libertadores',
    badgeEmoji: '🟡',
    colors: { primary: '#003366', secondary: '#ffcc00', accent: '#ffffff' },
    budget: 50000000,
    reputation: 87,
    players: [
      { name: 'Edinson Cavani', pos: 'A', age: 38, ovr: 82, fin: 87, pas: 74, def: 50, fis: 76 },
      { name: 'Marcos Rojo', pos: 'Z', age: 35, ovr: 79, fin: 52, pas: 68, def: 81, fis: 82 },
      { name: 'Miguel Merentiel', pos: 'A', age: 29, ovr: 80, fin: 82, pas: 72, def: 48, fis: 82 },
      { name: 'Kevin Zenón', pos: 'M', age: 24, ovr: 79, fin: 77, pas: 81, def: 66, fis: 80 },
      { name: 'Sergio Romero', pos: 'G', age: 38, ovr: 78, fin: 22, pas: 65, def: 79, fis: 75 }
    ]
  },
  {
    id: 'pen',
    name: 'Peñarol',
    shortName: 'PEN',
    country: 'Uruguai',
    countryFlag: '🇺🇾',
    leagueId: 'copa_libertadores',
    leagueName: 'Copa Libertadores',
    badgeEmoji: '⚫',
    colors: { primary: '#000000', secondary: '#f8d21c', accent: '#ffffff' },
    budget: 25000000,
    reputation: 81,
    players: [
      { name: 'Leonardo Fernández', pos: 'M', age: 26, ovr: 80, fin: 82, pas: 83, def: 54, fis: 75 },
      { name: 'Gastón Ramírez', pos: 'M', age: 34, ovr: 77, fin: 76, pas: 80, def: 58, fis: 73 },
      { name: 'Maximiliano Silvera', pos: 'A', age: 27, ovr: 77, fin: 79, pas: 70, def: 45, fis: 80 },
      { name: 'Guzmán Rodríguez', pos: 'Z', age: 25, ovr: 76, fin: 35, pas: 65, def: 78, fis: 80 }
    ]
  },

  // ==========================================
  // ÁSIA: AFC CHAMPIONS LEAGUE & ARÁBIA SAUDITA
  // ==========================================
  {
    id: 'hil',
    name: 'Al Hilal',
    shortName: 'HIL',
    country: 'Arábia Saudita',
    countryFlag: '🇸🇦',
    leagueId: 'afc_champions_league',
    leagueName: 'AFC Champions League',
    badgeEmoji: '🌙',
    colors: { primary: '#003896', secondary: '#ffffff', accent: '#0052cc' },
    budget: 95000000,
    reputation: 91,
    players: [
      { name: 'Neymar Jr', pos: 'A', age: 33, ovr: 88, fin: 87, pas: 90, def: 42, fis: 72 },
      { name: 'Aleksandar Mitrović', pos: 'A', age: 31, ovr: 85, fin: 89, pas: 72, def: 46, fis: 88 },
      { name: 'Rúben Neves', pos: 'V', age: 28, ovr: 85, fin: 79, pas: 88, def: 82, fis: 81 },
      { name: 'Sergej Milinković-Savić', pos: 'M', age: 30, ovr: 85, fin: 82, pas: 85, def: 80, fis: 86 },
      { name: 'Malcom', pos: 'A', age: 28, ovr: 84, fin: 83, pas: 83, def: 52, fis: 81 },
      { name: 'João Cancelo', pos: 'L', age: 31, ovr: 84, fin: 74, pas: 85, def: 79, fis: 80 },
      { name: 'Yassine Bounou', pos: 'G', age: 34, ovr: 86, fin: 24, pas: 74, def: 87, fis: 80 },
      { name: 'Kalidou Koulibaly', pos: 'Z', age: 34, ovr: 83, fin: 38, pas: 70, def: 85, fis: 84 }
    ]
  },
  {
    id: 'nas',
    name: 'Al Nassr',
    shortName: 'NAS',
    country: 'Arábia Saudita',
    countryFlag: '🇸🇦',
    leagueId: 'afc_champions_league',
    leagueName: 'AFC Champions League',
    badgeEmoji: '👑',
    colors: { primary: '#ffea00', secondary: '#002060', accent: '#ffffff' },
    budget: 90000000,
    reputation: 90,
    players: [
      { name: 'Cristiano Ronaldo', pos: 'A', age: 40, ovr: 87, fin: 92, pas: 78, def: 40, fis: 81 },
      { name: 'Sadio Mané', pos: 'A', age: 33, ovr: 84, fin: 83, pas: 80, def: 55, fis: 82 },
      { name: 'Aymeric Laporte', pos: 'Z', age: 31, ovr: 84, fin: 45, pas: 78, def: 85, fis: 82 },
      { name: 'Marcelo Brozović', pos: 'V', age: 32, ovr: 83, fin: 74, pas: 85, def: 82, fis: 84 },
      { name: 'Otávio', pos: 'M', age: 30, ovr: 82, fin: 78, pas: 83, def: 74, fis: 81 },
      { name: 'Bento', pos: 'G', age: 26, ovr: 81, fin: 25, pas: 75, def: 82, fis: 80 }
    ]
  },

  // ==========================================
  // ÁSIA: J-LEAGUE (JAPÃO)
  // ==========================================
  {
    id: 'vis',
    name: 'Vissel Kobe',
    shortName: 'VIS',
    country: 'Japão',
    countryFlag: '🇯🇵',
    leagueId: 'j_league',
    leagueName: 'J1 League',
    badgeEmoji: '⚓',
    colors: { primary: '#8a0026', secondary: '#ffffff', accent: '#000000' },
    budget: 32000000,
    reputation: 80,
    players: [
      { name: 'Yuya Osako', pos: 'A', age: 35, ovr: 79, fin: 82, pas: 76, def: 48, fis: 78 },
      { name: 'Yoshinori Muto', pos: 'A', age: 33, ovr: 78, fin: 80, pas: 74, def: 52, fis: 80 },
      { name: 'Hotaru Yamaguchi', pos: 'V', age: 34, ovr: 77, fin: 68, pas: 78, def: 78, fis: 79 },
      { name: 'Daiju Sasaki', pos: 'M', age: 25, ovr: 76, fin: 75, pas: 77, def: 62, fis: 78 }
    ]
  },
  {
    id: 'yfm',
    name: 'Yokohama F. Marinos',
    shortName: 'YFM',
    country: 'Japão',
    countryFlag: '🇯🇵',
    leagueId: 'j_league',
    leagueName: 'J1 League',
    badgeEmoji: '🌊',
    colors: { primary: '#002b66', secondary: '#c8102e', accent: '#ffffff' },
    budget: 28000000,
    reputation: 79,
    players: [
      { name: 'Anderson Lopes', pos: 'A', age: 32, ovr: 80, fin: 83, pas: 72, def: 42, fis: 82 },
      { name: 'Yan Matheus', pos: 'A', age: 26, ovr: 78, fin: 78, pas: 76, def: 46, fis: 82 },
      { name: 'Elber', pos: 'A', age: 33, ovr: 77, fin: 77, pas: 75, def: 48, fis: 79 },
      { name: 'Takuya Kida', pos: 'V', age: 31, ovr: 76, fin: 60, pas: 76, def: 78, fis: 78 }
    ]
  },

  // ==========================================
  // ÁSIA: CHINESE SUPER LEAGUE (CHINA)
  // ==========================================
  {
    id: 'shp',
    name: 'Shanghai Port',
    shortName: 'SHP',
    country: 'China',
    countryFlag: '🇨🇳',
    leagueId: 'chinese_super_league',
    leagueName: 'Chinese Super League',
    badgeEmoji: '🚢',
    colors: { primary: '#d21417', secondary: '#000000', accent: '#ffffff' },
    budget: 35000000,
    reputation: 80,
    players: [
      { name: 'Oscar', pos: 'M', age: 34, ovr: 82, fin: 78, pas: 87, def: 58, fis: 72 },
      { name: 'Wu Lei', pos: 'A', age: 33, ovr: 80, fin: 83, pas: 74, def: 46, fis: 81 },
      { name: 'Matías Vargas', pos: 'A', age: 28, ovr: 78, fin: 77, pas: 78, def: 48, fis: 80 },
      { name: 'Gustavo Henrique', pos: 'A', age: 31, ovr: 77, fin: 80, pas: 68, def: 42, fis: 82 }
    ]
  },

  // ==========================================
  // ÁSIA: INDIAN SUPER LEAGUE (ÍNDIA)
  // ==========================================
  {
    id: 'mbsg',
    name: 'Mohun Bagan Super Giant',
    shortName: 'MBSG',
    country: 'Índia',
    countryFlag: '🇮🇳',
    leagueId: 'indian_super_league',
    leagueName: 'Indian Super League',
    badgeEmoji: '⛵',
    colors: { primary: '#6e1d24', secondary: '#005432', accent: '#ffffff' },
    budget: 15000000,
    reputation: 75,
    players: [
      { name: 'Jason Cummings', pos: 'A', age: 30, ovr: 77, fin: 80, pas: 72, def: 44, fis: 79 },
      { name: 'Dimitri Petratos', pos: 'A', age: 32, ovr: 77, fin: 79, pas: 76, def: 48, fis: 78 },
      { name: 'Sahal Abdul Samad', pos: 'M', age: 28, ovr: 74, fin: 72, pas: 76, def: 55, fis: 75 },
      { name: 'Subhasish Bose', pos: 'L', age: 30, ovr: 73, fin: 50, pas: 68, def: 75, fis: 77 }
    ]
  },
  {
    id: 'bfc',
    name: 'Bengaluru FC',
    shortName: 'BFC',
    country: 'Índia',
    countryFlag: '🇮🇳',
    leagueId: 'indian_super_league',
    leagueName: 'Indian Super League',
    badgeEmoji: '🏰',
    colors: { primary: '#1f3563', secondary: '#e41f26', accent: '#ffffff' },
    budget: 14000000,
    reputation: 74,
    players: [
      { name: 'Sunil Chhetri', pos: 'A', age: 41, ovr: 76, fin: 81, pas: 72, def: 40, fis: 70 },
      { name: 'Ryan Williams', pos: 'A', age: 31, ovr: 75, fin: 76, pas: 73, def: 46, fis: 79 },
      { name: 'Gurpreet Singh Sandhu', pos: 'G', age: 33, ovr: 75, fin: 20, pas: 66, def: 77, fis: 80 }
    ]
  },

  // ==========================================
  // ÁSIA: K LEAGUE 2 (COREIA DO SUL)
  // ==========================================
  {
    id: 'ssb',
    name: 'Suwon Samsung Bluewings',
    shortName: 'SSB',
    country: 'Coreia do Sul',
    countryFlag: '🇰🇷',
    leagueId: 'k_league_2',
    leagueName: 'K League 2',
    badgeEmoji: '🔵',
    colors: { primary: '#0033a0', secondary: '#ffffff', accent: '#d21417' },
    budget: 18000000,
    reputation: 76,
    players: [
      { name: 'Stanislav Iljutcenko', pos: 'A', age: 35, ovr: 77, fin: 80, pas: 70, def: 42, fis: 81 },
      { name: 'Kazuki Kozuka', pos: 'M', age: 31, ovr: 76, fin: 70, pas: 81, def: 60, fis: 73 },
      { name: 'Yang Hyung-mo', pos: 'G', age: 34, ovr: 75, fin: 20, pas: 66, def: 76, fis: 77 }
    ]
  },

  // ==========================================
  // OCEANIA: A-LEAGUE (AUSTRÁLIA)
  // ==========================================
  {
    id: 'syd',
    name: 'Sydney FC',
    shortName: 'SYD',
    country: 'Austrália',
    countryFlag: '🇦🇺',
    leagueId: 'a_league',
    leagueName: 'A-League Men',
    badgeEmoji: '🦘',
    colors: { primary: '#59b3e6', secondary: '#00205b', accent: '#ffffff' },
    budget: 20000000,
    reputation: 77,
    players: [
      { name: 'Douglas Costa', pos: 'A', age: 35, ovr: 78, fin: 79, pas: 81, def: 44, fis: 74 },
      { name: 'Joe Lolley', pos: 'A', age: 33, ovr: 77, fin: 78, pas: 76, def: 50, fis: 78 },
      { name: 'Patryk Klimala', pos: 'A', age: 27, ovr: 76, fin: 78, pas: 68, def: 42, fis: 81 },
      { name: 'Andrew Redmayne', pos: 'G', age: 36, ovr: 75, fin: 20, pas: 65, def: 76, fis: 76 }
    ]
  },
  {
    id: 'wsk',
    name: 'Western Sydney Wanderers',
    shortName: 'WSW',
    country: 'Austrália',
    countryFlag: '🇦🇺',
    leagueId: 'a_league',
    leagueName: 'A-League Men',
    badgeEmoji: '🔴',
    colors: { primary: '#d21034', secondary: '#000000', accent: '#ffffff' },
    budget: 18000000,
    reputation: 76,
    players: [
      { name: 'Juan Mata', pos: 'M', age: 37, ovr: 78, fin: 77, pas: 85, def: 48, fis: 68 },
      { name: 'Nicolas Milanovic', pos: 'M', age: 23, ovr: 75, fin: 74, pas: 75, def: 55, fis: 78 },
      { name: 'Brandon Borrello', pos: 'A', age: 30, ovr: 75, fin: 76, pas: 73, def: 48, fis: 80 }
    ]
  },

  // ==========================================
  // ÁFRICA: PREMIER LEAGUE DA ÁFRICA DO SUL (PSL)
  // ==========================================
  {
    id: 'msd',
    name: 'Mamelodi Sundowns',
    shortName: 'MSD',
    country: 'África do Sul',
    countryFlag: '🇿🇦',
    leagueId: 'south_african_psl',
    leagueName: 'PSL África do Sul',
    badgeEmoji: '☀️',
    colors: { primary: '#f6b21b', secondary: '#00549f', accent: '#ffffff' },
    budget: 25000000,
    reputation: 79,
    players: [
      { name: 'Ronwen Williams', pos: 'G', age: 33, ovr: 81, fin: 24, pas: 75, def: 83, fis: 79 },
      { name: 'Peter Shalulile', pos: 'A', age: 31, ovr: 79, fin: 82, pas: 70, def: 45, fis: 82 },
      { name: 'Themba Zwane', pos: 'M', age: 36, ovr: 78, fin: 76, pas: 82, def: 55, fis: 74 },
      { name: 'Lucas Ribeiro Costa', pos: 'A', age: 26, ovr: 78, fin: 80, pas: 76, def: 48, fis: 80 },
      { name: 'Teboho Mokoena', pos: 'V', age: 28, ovr: 79, fin: 76, pas: 80, def: 79, fis: 82 }
    ]
  },
  {
    id: 'orl_pir',
    name: 'Orlando Pirates',
    shortName: 'ORL-P',
    country: 'África do Sul',
    countryFlag: '🇿🇦',
    leagueId: 'south_african_psl',
    leagueName: 'PSL África do Sul',
    badgeEmoji: '🏴‍☠️',
    colors: { primary: '#000000', secondary: '#ffffff', accent: '#c8102e' },
    budget: 22000000,
    reputation: 78,
    players: [
      { name: 'Patrick Maswanganyi', pos: 'M', age: 27, ovr: 78, fin: 76, pas: 80, def: 58, fis: 79 },
      { name: 'Monnapule Saleng', pos: 'A', age: 27, ovr: 77, fin: 79, pas: 74, def: 46, fis: 82 },
      { name: 'Relebohile Mofokeng', pos: 'A', age: 20, ovr: 76, fin: 75, pas: 77, def: 44, fis: 80 },
      { name: 'Sipho Chaine', pos: 'G', age: 28, ovr: 75, fin: 20, pas: 65, def: 76, fis: 77 }
    ]
  }
];

/**
 * Constrói e retorna todos os atletas das ligas regionais com valores de mercado calibrados
 * @returns {Array<Object>}
 */
export function buildGlobalRegionsPlayers() {
  const allPlayers = [];
  let currentId = 12001;

  GLOBAL_REGIONS_CLUBS.forEach(club => {
    club.players.forEach(raw => {
      const ageFactor = raw.age < 24 ? 1.45 : (raw.age > 31 ? 0.65 : 1.0);
      const baseValue = Math.pow(raw.ovr - 40, 2.78) * 1400 * ageFactor;
      const value = Math.round(baseValue / 10000) * 10000;
      const salary = Math.round((value * 0.0065) / 1000) * 1000 + 8000;

      allPlayers.push({
        id: `glb_${club.leagueId}_${currentId++}`,
        name: raw.name,
        clubId: club.id,
        clubName: club.name,
        leagueId: club.leagueId,
        leagueName: club.leagueName,
        country: club.country,
        countryFlag: club.countryFlag,
        position: raw.pos,
        age: raw.age,
        overall: raw.ovr,
        fin: raw.fin,
        pas: raw.pas,
        def: raw.def,
        fis: raw.fis,
        value,
        salary,
        contractUntil: '2026/2027',
        status: 'confirmado',
        source: `${club.leagueName} Official Registry / Footkeep Global`,
        auditDate: 'Outubro de 2026',
        isEstimate: true,
        fitness: 100,
        morale: 'Alta',
        yellowCards: 0,
        redCards: 0,
        goals: 0,
        assists: 0,
        matchesPlayed: 0,
        cleanSheets: 0,
        isSuspended: false,
        isListed: false
      });
    });
  });

  return allPlayers;
}
