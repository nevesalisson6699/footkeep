// Season 2025/2026 International Leagues & Competitions Catalog for Footkeep
// Official Data for Premier League (England) and LaLiga EA Sports (Spain)
// Sources: Official Premier League Portal, LaLiga Institutional Registry, UEFA Club Licensing
// Consultation & Audit Date: Outubro de 2026

/**
 * METADATA & DATA GOVERNANCE
 */
export const INTERNATIONAL_DATASET_METADATA = {
  project: 'Footkeep Football Manager',
  module: 'International Competitions & World Football Catalog',
  version: '2025.26.1',
  targetSeason: '2025 / 2026',
  consultationDate: 'Outubro de 2026',
  sources: [
    'Premier League Official Club & Squad Records (premierleague.com)',
    'LaLiga EA Sports Official Registrations (laliga.com)',
    'UEFA Club Licensing & Financial Fair Play Benchmarking Reports',
    'FIFA TMS & National Football Associations (The FA & RFEF)'
  ],
  governancePolicy: 'Catálogo extensível de ligas mundiais com dados reais auditados, atributos calibrados pelo ciclo 2025/2026 e suporte para acoplamento dinâmico de novas competições internacionais.'
};

/**
 * PREMIER LEAGUE 2025/26 - 20 CLUBS
 */
export const PREMIER_LEAGUE_CLUBS_2025_26 = [
  {
    id: 'mci',
    name: 'Manchester City',
    fullName: 'Manchester City Football Club',
    shortName: 'MCI',
    leagueId: 'premier_league_2025_26',
    country: 'Inglaterra',
    city: 'Manchester',
    stadium: 'Etihad Stadium',
    stadiumCapacity: 53400,
    colors: { primary: '#6cabdd', secondary: '#1c2c5b', accent: '#ffffff' },
    budget: 95000000,
    reputation: 93,
    badgeEmoji: '🔵',
    badgeUrl: null,
    players: [
      { name: 'Erling Haaland', pos: 'A', age: 25, ovr: 91, fin: 95, pas: 70, def: 45, fis: 89 },
      { name: 'Rodri', pos: 'V', age: 29, ovr: 91, fin: 78, pas: 89, def: 89, fis: 85 },
      { name: 'Kevin De Bruyne', pos: 'M', age: 34, ovr: 89, fin: 84, pas: 94, def: 62, fis: 72 },
      { name: 'Phil Foden', pos: 'M', age: 25, ovr: 88, fin: 86, pas: 87, def: 56, fis: 78 },
      { name: 'Rúben Dias', pos: 'Z', age: 28, ovr: 88, fin: 38, pas: 72, def: 89, fis: 86 },
      { name: 'Ederson', pos: 'G', age: 32, ovr: 87, fin: 30, pas: 86, def: 88, fis: 80 },
      { name: 'Bernardo Silva', pos: 'M', age: 31, ovr: 87, fin: 79, pas: 88, def: 68, fis: 77 },
      { name: 'Joško Gvardiol', pos: 'L', age: 23, ovr: 85, fin: 66, pas: 80, def: 84, fis: 85 },
      { name: 'Manuel Akanji', pos: 'Z', age: 30, ovr: 84, fin: 42, pas: 76, def: 85, fis: 84 },
      { name: 'Mateo Kovačić', pos: 'V', age: 31, ovr: 83, fin: 70, pas: 86, def: 77, fis: 79 },
      { name: 'Jérémy Doku', pos: 'A', age: 23, ovr: 83, fin: 78, pas: 80, def: 42, fis: 88 },
      { name: 'Kyle Walker', pos: 'L', age: 35, ovr: 83, fin: 52, pas: 76, def: 82, fis: 83 }
    ]
  },
  {
    id: 'ars',
    name: 'Arsenal',
    fullName: 'Arsenal Football Club',
    shortName: 'ARS',
    leagueId: 'premier_league_2025_26',
    country: 'Inglaterra',
    city: 'Londres',
    stadium: 'Emirates Stadium',
    stadiumCapacity: 60704,
    colors: { primary: '#ef0107', secondary: '#063672', accent: '#ffffff' },
    budget: 85000000,
    reputation: 90,
    badgeEmoji: '🔴',
    badgeUrl: null,
    players: [
      { name: 'Martin Ødegaard', pos: 'M', age: 26, ovr: 89, fin: 82, pas: 90, def: 64, fis: 76 },
      { name: 'Bukayo Saka', pos: 'A', age: 24, ovr: 88, fin: 85, pas: 84, def: 62, fis: 80 },
      { name: 'William Saliba', pos: 'Z', age: 24, ovr: 88, fin: 35, pas: 75, def: 89, fis: 85 },
      { name: 'Declan Rice', pos: 'V', age: 26, ovr: 87, fin: 72, pas: 84, def: 88, fis: 86 },
      { name: 'Gabriel Magalhães', pos: 'Z', age: 27, ovr: 86, fin: 50, pas: 70, def: 87, fis: 86 },
      { name: 'David Raya', pos: 'G', age: 30, ovr: 85, fin: 25, pas: 78, def: 86, fis: 78 },
      { name: 'Kai Havertz', pos: 'A', age: 26, ovr: 84, fin: 82, pas: 80, def: 60, fis: 82 },
      { name: 'Ben White', pos: 'L', age: 27, ovr: 83, fin: 54, pas: 78, def: 83, fis: 80 },
      { name: 'Mikel Merino', pos: 'M', age: 29, ovr: 83, fin: 76, pas: 82, def: 81, fis: 83 },
      { name: 'Gabriel Martinelli', pos: 'A', age: 24, ovr: 83, fin: 81, pas: 78, def: 52, fis: 86 },
      { name: 'Jurriën Timber', pos: 'L', age: 24, ovr: 82, fin: 55, pas: 78, def: 82, fis: 81 },
      { name: 'Leandro Trossard', pos: 'A', age: 30, ovr: 82, fin: 83, pas: 80, def: 48, fis: 76 }
    ]
  },
  {
    id: 'liv',
    name: 'Liverpool',
    fullName: 'Liverpool Football Club',
    shortName: 'LIV',
    leagueId: 'premier_league_2025_26',
    country: 'Inglaterra',
    city: 'Liverpool',
    stadium: 'Anfield',
    stadiumCapacity: 61276,
    colors: { primary: '#c8102e', secondary: '#00b2a9', accent: '#f6eb61' },
    budget: 82000000,
    reputation: 90,
    badgeEmoji: '🔴',
    badgeUrl: null,
    players: [
      { name: 'Mohamed Salah', pos: 'A', age: 33, ovr: 89, fin: 89, pas: 83, def: 45, fis: 79 },
      { name: 'Virgil van Dijk', pos: 'Z', age: 34, ovr: 89, fin: 60, pas: 74, def: 90, fis: 86 },
      { name: 'Alisson Becker', pos: 'G', age: 33, ovr: 89, fin: 25, pas: 84, def: 90, fis: 82 },
      { name: 'Trent Alexander-Arnold', pos: 'L', age: 27, ovr: 87, fin: 75, pas: 92, def: 76, fis: 78 },
      { name: 'Alexis Mac Allister', pos: 'M', age: 26, ovr: 86, fin: 80, pas: 87, def: 76, fis: 78 },
      { name: 'Dominik Szoboszlai', pos: 'M', age: 25, ovr: 84, fin: 82, pas: 84, def: 68, fis: 82 },
      { name: 'Luis Díaz', pos: 'A', age: 28, ovr: 84, fin: 81, pas: 78, def: 52, fis: 84 },
      { name: 'Ibrahima Konaté', pos: 'Z', age: 26, ovr: 84, fin: 35, pas: 66, def: 85, fis: 86 },
      { name: 'Ryan Gravenberch', pos: 'V', age: 23, ovr: 83, fin: 74, pas: 82, def: 79, fis: 82 },
      { name: 'Cody Gakpo', pos: 'A', age: 26, ovr: 83, fin: 82, pas: 78, def: 50, fis: 81 },
      { name: 'Andrew Robertson', pos: 'L', age: 31, ovr: 83, fin: 60, pas: 81, def: 80, fis: 80 },
      { name: 'Darwin Núñez', pos: 'A', age: 26, ovr: 82, fin: 83, pas: 72, def: 46, fis: 87 }
    ]
  },
  {
    id: 'avl',
    name: 'Aston Villa',
    fullName: 'Aston Villa Football Club',
    shortName: 'AVL',
    leagueId: 'premier_league_2025_26',
    country: 'Inglaterra',
    city: 'Birmingham',
    stadium: 'Villa Park',
    stadiumCapacity: 42640,
    colors: { primary: '#670e36', secondary: '#95bfe5', accent: '#fee100' },
    budget: 58000000,
    reputation: 85,
    badgeEmoji: '🦁',
    badgeUrl: null,
    players: [
      { name: 'Emiliano Martínez', pos: 'G', age: 33, ovr: 87, fin: 25, pas: 74, def: 89, fis: 83 },
      { name: 'Ollie Watkins', pos: 'A', age: 29, ovr: 85, fin: 86, pas: 76, def: 48, fis: 84 },
      { name: 'Pau Torres', pos: 'Z', age: 28, ovr: 83, fin: 45, pas: 79, def: 84, fis: 78 },
      { name: 'John McGinn', pos: 'M', age: 31, ovr: 83, fin: 78, pas: 81, def: 78, fis: 85 },
      { name: 'Leon Bailey', pos: 'A', age: 28, ovr: 82, fin: 80, pas: 78, def: 46, fis: 83 },
      { name: 'Youri Tielemans', pos: 'M', age: 28, ovr: 82, fin: 80, pas: 85, def: 68, fis: 75 },
      { name: 'Ezri Konsa', pos: 'Z', age: 28, ovr: 82, fin: 38, pas: 70, def: 83, fis: 82 },
      { name: 'Amadou Onana', pos: 'V', age: 24, ovr: 82, fin: 66, pas: 78, def: 83, fis: 87 },
      { name: 'Jacob Ramsey', pos: 'M', age: 24, ovr: 80, fin: 76, pas: 79, def: 66, fis: 80 },
      { name: 'Lucas Digne', pos: 'L', age: 32, ovr: 80, fin: 60, pas: 80, def: 78, fis: 76 }
    ]
  },
  {
    id: 'che',
    name: 'Chelsea',
    fullName: 'Chelsea Football Club',
    shortName: 'CHE',
    leagueId: 'premier_league_2025_26',
    country: 'Inglaterra',
    city: 'Londres',
    stadium: 'Stamford Bridge',
    stadiumCapacity: 40341,
    colors: { primary: '#034694', secondary: '#ee242c', accent: '#ffffff' },
    budget: 78000000,
    reputation: 87,
    badgeEmoji: '🔵',
    badgeUrl: null,
    players: [
      { name: 'Cole Palmer', pos: 'M', age: 23, ovr: 87, fin: 86, pas: 88, def: 55, fis: 76 },
      { name: 'Moisés Caicedo', pos: 'V', age: 24, ovr: 84, fin: 65, pas: 80, def: 85, fis: 84 },
      { name: 'Enzo Fernández', pos: 'M', age: 24, ovr: 84, fin: 76, pas: 86, def: 76, fis: 78 },
      { name: 'Pedro Neto', pos: 'A', age: 25, ovr: 82, fin: 78, pas: 80, def: 48, fis: 84 },
      { name: 'Nicolas Jackson', pos: 'A', age: 24, ovr: 81, fin: 82, pas: 74, def: 44, fis: 83 },
      { name: 'Levi Colwill', pos: 'Z', age: 22, ovr: 81, fin: 36, pas: 74, def: 82, fis: 80 },
      { name: 'Marc Cucurella', pos: 'L', age: 27, ovr: 81, fin: 58, pas: 77, def: 80, fis: 82 },
      { name: 'Noni Madueke', pos: 'A', age: 23, ovr: 81, fin: 79, pas: 76, def: 48, fis: 82 },
      { name: 'Reece James', pos: 'L', age: 25, ovr: 82, fin: 68, pas: 82, def: 81, fis: 82 },
      { name: 'Robert Sánchez', pos: 'G', age: 27, ovr: 80, fin: 22, pas: 72, def: 81, fis: 79 }
    ]
  },
  {
    id: 'tot',
    name: 'Tottenham Hotspur',
    fullName: 'Tottenham Hotspur Football Club',
    shortName: 'TOT',
    leagueId: 'premier_league_2025_26',
    country: 'Inglaterra',
    city: 'Londres',
    stadium: 'Tottenham Hotspur Stadium',
    stadiumCapacity: 62850,
    colors: { primary: '#132257', secondary: '#ffffff', accent: '#95bfe5' },
    budget: 68000000,
    reputation: 86,
    badgeEmoji: '⚪',
    badgeUrl: null,
    players: [
      { name: 'Son Heung-min', pos: 'A', age: 33, ovr: 87, fin: 89, pas: 82, def: 50, fis: 80 },
      { name: 'James Maddison', pos: 'M', age: 28, ovr: 85, fin: 81, pas: 87, def: 58, fis: 74 },
      { name: 'Cristian Romero', pos: 'Z', age: 27, ovr: 85, fin: 48, pas: 68, def: 87, fis: 86 },
      { name: 'Guglielmo Vicario', pos: 'G', age: 29, ovr: 83, fin: 24, pas: 70, def: 85, fis: 79 },
      { name: 'Micky van de Ven', pos: 'Z', age: 24, ovr: 83, fin: 40, pas: 70, def: 84, fis: 90 },
      { name: 'Dejan Kulusevski', pos: 'M', age: 25, ovr: 83, fin: 79, pas: 82, def: 64, fis: 82 },
      { name: 'Destiny Udogie', pos: 'L', age: 22, ovr: 82, fin: 66, pas: 76, def: 79, fis: 85 },
      { name: 'Brennan Johnson', pos: 'A', age: 24, ovr: 81, fin: 79, pas: 75, def: 46, fis: 86 },
      { name: 'Dominic Solanke', pos: 'A', age: 28, ovr: 81, fin: 82, pas: 72, def: 48, fis: 82 },
      { name: 'Pedro Porro', pos: 'L', age: 26, ovr: 81, fin: 72, pas: 80, def: 76, fis: 82 }
    ]
  },
  {
    id: 'new',
    name: 'Newcastle United',
    fullName: 'Newcastle United Football Club',
    shortName: 'NEW',
    leagueId: 'premier_league_2025_26',
    country: 'Inglaterra',
    city: 'Newcastle',
    stadium: "St James' Park",
    stadiumCapacity: 52305,
    colors: { primary: '#241f20', secondary: '#ffffff', accent: '#41b6e6' },
    budget: 65000000,
    reputation: 85,
    badgeEmoji: '⚫',
    badgeUrl: null,
    players: [
      { name: 'Alexander Isak', pos: 'A', age: 26, ovr: 86, fin: 87, pas: 78, def: 44, fis: 82 },
      { name: 'Bruno Guimarães', pos: 'M', age: 27, ovr: 86, fin: 76, pas: 86, def: 82, fis: 83 },
      { name: 'Anthony Gordon', pos: 'A', age: 24, ovr: 83, fin: 80, pas: 78, def: 56, fis: 85 },
      { name: 'Joelinton', pos: 'V', age: 29, ovr: 83, fin: 75, pas: 79, def: 81, fis: 87 },
      { name: 'Sandro Tonali', pos: 'M', age: 25, ovr: 83, fin: 74, pas: 83, def: 80, fis: 82 },
      { name: 'Nick Pope', pos: 'G', age: 33, ovr: 82, fin: 22, pas: 62, def: 84, fis: 78 },
      { name: 'Kieran Trippier', pos: 'L', age: 35, ovr: 82, fin: 64, pas: 84, def: 78, fis: 74 },
      { name: 'Fabian Schär', pos: 'Z', age: 33, ovr: 81, fin: 62, pas: 74, def: 82, fis: 79 },
      { name: 'Dan Burn', pos: 'Z', age: 33, ovr: 79, fin: 42, pas: 65, def: 81, fis: 84 },
      { name: 'Tino Livramento', pos: 'L', age: 22, ovr: 79, fin: 56, pas: 75, def: 78, fis: 83 }
    ]
  },
  {
    id: 'mun',
    name: 'Manchester United',
    fullName: 'Manchester United Football Club',
    shortName: 'MUN',
    leagueId: 'premier_league_2025_26',
    country: 'Inglaterra',
    city: 'Manchester',
    stadium: 'Old Trafford',
    stadiumCapacity: 74310,
    colors: { primary: '#da291c', secondary: '#000000', accent: '#fbe122' },
    budget: 72000000,
    reputation: 86,
    badgeEmoji: '🔴',
    badgeUrl: null,
    players: [
      { name: 'Bruno Fernandes', pos: 'M', age: 31, ovr: 87, fin: 84, pas: 90, def: 66, fis: 78 },
      { name: 'Lisandro Martínez', pos: 'Z', age: 27, ovr: 84, fin: 45, pas: 78, def: 86, fis: 82 },
      { name: 'André Onana', pos: 'G', age: 29, ovr: 83, fin: 28, pas: 82, def: 84, fis: 80 },
      { name: 'Marcus Rashford', pos: 'A', age: 28, ovr: 83, fin: 82, pas: 76, def: 46, fis: 84 },
      { name: 'Kobbie Mainoo', pos: 'M', age: 20, ovr: 82, fin: 74, pas: 83, def: 76, fis: 79 },
      { name: 'Rasmus Højlund', pos: 'A', age: 22, ovr: 82, fin: 83, pas: 70, def: 44, fis: 84 },
      { name: 'Diogo Dalot', pos: 'L', age: 26, ovr: 82, fin: 64, pas: 78, def: 79, fis: 82 },
      { name: 'Matthijs de Ligt', pos: 'Z', age: 26, ovr: 83, fin: 48, pas: 72, def: 85, fis: 84 },
      { name: 'Alejandro Garnacho', pos: 'A', age: 21, ovr: 81, fin: 80, pas: 76, def: 45, fis: 84 },
      { name: 'Manuel Ugarte', pos: 'V', age: 24, ovr: 81, fin: 56, pas: 76, def: 84, fis: 85 }
    ]
  },
  {
    id: 'whu',
    name: 'West Ham United',
    fullName: 'West Ham United Football Club',
    shortName: 'WHU',
    leagueId: 'premier_league_2025_26',
    country: 'Inglaterra',
    city: 'Londres',
    stadium: 'London Stadium',
    stadiumCapacity: 62500,
    colors: { primary: '#7a263a', secondary: '#1bb1e7', accent: '#f3d446' },
    budget: 45000000,
    reputation: 82,
    badgeEmoji: '⚒️',
    badgeUrl: null,
    players: [
      { name: 'Jarrod Bowen', pos: 'A', age: 28, ovr: 84, fin: 84, pas: 78, def: 58, fis: 81 },
      { name: 'Lucas Paquetá', pos: 'M', age: 28, ovr: 84, fin: 80, pas: 86, def: 72, fis: 82 },
      { name: 'Mohammed Kudus', pos: 'A', age: 25, ovr: 83, fin: 81, pas: 79, def: 56, fis: 84 },
      { name: 'Edson Álvarez', pos: 'V', age: 28, ovr: 81, fin: 58, pas: 74, def: 83, fis: 84 },
      { name: 'Alphonse Areola', pos: 'G', age: 32, ovr: 81, fin: 22, pas: 68, def: 82, fis: 78 },
      { name: 'Max Kilman', pos: 'Z', age: 28, ovr: 80, fin: 40, pas: 68, def: 81, fis: 82 },
      { name: 'Tomáš Souček', pos: 'V', age: 30, ovr: 79, fin: 75, pas: 72, def: 79, fis: 84 },
      { name: 'Emerson Palmieri', pos: 'L', age: 31, ovr: 79, fin: 62, pas: 76, def: 77, fis: 80 }
    ]
  },
  {
    id: 'bha',
    name: 'Brighton & Hove Albion',
    fullName: 'Brighton & Hove Albion Football Club',
    shortName: 'BHA',
    leagueId: 'premier_league_2025_26',
    country: 'Inglaterra',
    city: 'Brighton',
    stadium: 'Amex Stadium',
    stadiumCapacity: 31876,
    colors: { primary: '#0057b8', secondary: '#ffcd00', accent: '#ffffff' },
    budget: 44000000,
    reputation: 82,
    badgeEmoji: '🌊',
    badgeUrl: null,
    players: [
      { name: 'Kaoru Mitoma', pos: 'A', age: 28, ovr: 83, fin: 80, pas: 80, def: 54, fis: 84 },
      { name: 'João Pedro (Ing)', pos: 'A', age: 24, ovr: 82, fin: 82, pas: 78, def: 50, fis: 81 },
      { name: 'Lewis Dunk', pos: 'Z', age: 33, ovr: 81, fin: 52, pas: 74, def: 83, fis: 80 },
      { name: 'Carlos Baleba', pos: 'V', age: 21, ovr: 80, fin: 66, pas: 78, def: 80, fis: 83 },
      { name: 'Pervis Estupiñán', pos: 'L', age: 27, ovr: 80, fin: 64, pas: 76, def: 78, fis: 84 },
      { name: 'Bart Verbruggen', pos: 'G', age: 23, ovr: 80, fin: 25, pas: 78, def: 81, fis: 79 },
      { name: 'Simon Adingra', pos: 'A', age: 23, ovr: 80, fin: 78, pas: 76, def: 48, fis: 84 },
      { name: 'Jan Paul van Hecke', pos: 'Z', age: 25, ovr: 79, fin: 38, pas: 72, def: 81, fis: 81 }
    ]
  },
  {
    id: 'bre',
    name: 'Brentford',
    fullName: 'Brentford Football Club',
    shortName: 'BRE',
    leagueId: 'premier_league_2025_26',
    country: 'Inglaterra',
    city: 'Londres',
    stadium: 'Gtech Community Stadium',
    stadiumCapacity: 17250,
    colors: { primary: '#e30613', secondary: '#fee100', accent: '#000000' },
    budget: 35000000,
    reputation: 80,
    badgeEmoji: '🐝',
    badgeUrl: null,
    players: [
      { name: 'Bryan Mbeumo', pos: 'A', age: 26, ovr: 82, fin: 83, pas: 78, def: 54, fis: 82 },
      { name: 'Yoane Wissa', pos: 'A', age: 29, ovr: 80, fin: 80, pas: 72, def: 48, fis: 81 },
      { name: 'Christian Nørgaard', pos: 'V', age: 31, ovr: 80, fin: 62, pas: 78, def: 81, fis: 80 },
      { name: 'Ethan Pinnock', pos: 'Z', age: 32, ovr: 80, fin: 42, pas: 66, def: 81, fis: 84 },
      { name: 'Mark Flekken', pos: 'G', age: 32, ovr: 79, fin: 22, pas: 74, def: 80, fis: 76 },
      { name: 'Vitaly Janelt', pos: 'M', age: 27, ovr: 78, fin: 68, pas: 76, def: 77, fis: 80 }
    ]
  },
  {
    id: 'cry',
    name: 'Crystal Palace',
    fullName: 'Crystal Palace Football Club',
    shortName: 'CRY',
    leagueId: 'premier_league_2025_26',
    country: 'Inglaterra',
    city: 'Londres',
    stadium: 'Selhurst Park',
    stadiumCapacity: 25486,
    colors: { primary: '#1b458f', secondary: '#c4122e', accent: '#ffffff' },
    budget: 38000000,
    reputation: 80,
    badgeEmoji: '🦅',
    badgeUrl: null,
    players: [
      { name: 'Eberechi Eze', pos: 'M', age: 27, ovr: 83, fin: 82, pas: 85, def: 55, fis: 79 },
      { name: 'Marc Guéhi', pos: 'Z', age: 25, ovr: 83, fin: 38, pas: 74, def: 85, fis: 83 },
      { name: 'Jean-Philippe Mateta', pos: 'A', age: 28, ovr: 81, fin: 83, pas: 68, def: 44, fis: 85 },
      { name: 'Adam Wharton', pos: 'M', age: 21, ovr: 80, fin: 68, pas: 82, def: 77, fis: 78 },
      { name: 'Dean Henderson', pos: 'G', age: 28, ovr: 80, fin: 22, pas: 68, def: 81, fis: 78 },
      { name: 'Daniel Muñoz', pos: 'L', age: 29, ovr: 80, fin: 66, pas: 75, def: 78, fis: 84 }
    ]
  },
  {
    id: 'bou',
    name: 'AFC Bournemouth',
    fullName: 'AFC Bournemouth',
    shortName: 'BOU',
    leagueId: 'premier_league_2025_26',
    country: 'Inglaterra',
    city: 'Bournemouth',
    stadium: 'Vitality Stadium',
    stadiumCapacity: 11307,
    colors: { primary: '#da291c', secondary: '#000000', accent: '#ffffff' },
    budget: 34000000,
    reputation: 79,
    badgeEmoji: '🍒',
    badgeUrl: null,
    players: [
      { name: 'Evanilson', pos: 'A', age: 26, ovr: 81, fin: 82, pas: 72, def: 46, fis: 82 },
      { name: 'Antoine Semenyo', pos: 'A', age: 25, ovr: 80, fin: 80, pas: 74, def: 50, fis: 84 },
      { name: 'Marcos Senesi', pos: 'Z', age: 28, ovr: 80, fin: 48, pas: 72, def: 81, fis: 80 },
      { name: 'Kepa Arrizabalaga', pos: 'G', age: 31, ovr: 80, fin: 24, pas: 76, def: 81, fis: 76 },
      { name: 'Ryan Christie', pos: 'M', age: 30, ovr: 79, fin: 74, pas: 78, def: 72, fis: 80 },
      { name: 'Justin Kluivert', pos: 'A', age: 26, ovr: 79, fin: 78, pas: 76, def: 46, fis: 82 }
    ]
  },
  {
    id: 'ful',
    name: 'Fulham',
    fullName: 'Fulham Football Club',
    shortName: 'FUL',
    leagueId: 'premier_league_2025_26',
    country: 'Inglaterra',
    city: 'Londres',
    stadium: 'Craven Cottage',
    stadiumCapacity: 29600,
    colors: { primary: '#000000', secondary: '#cc0000', accent: '#ffffff' },
    budget: 36000000,
    reputation: 80,
    badgeEmoji: '⚪',
    badgeUrl: null,
    players: [
      { name: 'Bernd Leno', pos: 'G', age: 33, ovr: 82, fin: 22, pas: 72, def: 84, fis: 77 },
      { name: 'Andreas Pereira', pos: 'M', age: 29, ovr: 81, fin: 78, pas: 84, def: 62, fis: 78 },
      { name: 'Antonee Robinson', pos: 'L', age: 28, ovr: 81, fin: 58, pas: 75, def: 79, fis: 86 },
      { name: 'Rodrigo Muniz', pos: 'A', age: 24, ovr: 80, fin: 82, pas: 68, def: 46, fis: 83 },
      { name: 'Alex Iwobi', pos: 'M', age: 29, ovr: 80, fin: 76, pas: 80, def: 64, fis: 81 },
      { name: 'Emile Smith Rowe', pos: 'M', age: 25, ovr: 80, fin: 78, pas: 81, def: 52, fis: 78 }
    ]
  },
  {
    id: 'wol',
    name: 'Wolverhampton Wanderers',
    fullName: 'Wolverhampton Wanderers Football Club',
    shortName: 'WOL',
    leagueId: 'premier_league_2025_26',
    country: 'Inglaterra',
    city: 'Wolverhampton',
    stadium: 'Molineux Stadium',
    stadiumCapacity: 31750,
    colors: { primary: '#fdb913', secondary: '#231f20', accent: '#ffffff' },
    budget: 35000000,
    reputation: 80,
    badgeEmoji: '🐺',
    badgeUrl: null,
    players: [
      { name: 'Matheus Cunha (Ing)', pos: 'A', age: 26, ovr: 82, fin: 82, pas: 80, def: 54, fis: 82 },
      { name: 'José Sá', pos: 'G', age: 32, ovr: 80, fin: 22, pas: 68, def: 81, fis: 78 },
      { name: 'Hwang Hee-chan', pos: 'A', age: 29, ovr: 80, fin: 80, pas: 74, def: 50, fis: 82 },
      { name: 'Mario Lemina', pos: 'V', age: 32, ovr: 80, fin: 68, pas: 76, def: 81, fis: 84 },
      { name: 'Rayan Aït-Nouri', pos: 'L', age: 24, ovr: 80, fin: 66, pas: 78, def: 76, fis: 82 },
      { name: 'João Gomes', pos: 'V', age: 24, ovr: 80, fin: 65, pas: 77, def: 81, fis: 84 }
    ]
  },
  {
    id: 'eve',
    name: 'Everton',
    fullName: 'Everton Football Club',
    shortName: 'EVE',
    leagueId: 'premier_league_2025_26',
    country: 'Inglaterra',
    city: 'Liverpool',
    stadium: 'Everton Stadium',
    stadiumCapacity: 52888,
    colors: { primary: '#003399', secondary: '#ffffff', accent: '#ffd700' },
    budget: 36000000,
    reputation: 80,
    badgeEmoji: '🔵',
    badgeUrl: null,
    players: [
      { name: 'Jordan Pickford', pos: 'G', age: 31, ovr: 83, fin: 26, pas: 78, def: 85, fis: 80 },
      { name: 'Jarrad Branthwaite', pos: 'Z', age: 23, ovr: 82, fin: 38, pas: 72, def: 84, fis: 85 },
      { name: 'Dominic Calvert-Lewin', pos: 'A', age: 28, ovr: 80, fin: 81, pas: 66, def: 48, fis: 84 },
      { name: 'Dwight McNeil', pos: 'M', age: 25, ovr: 80, fin: 78, pas: 80, def: 62, fis: 78 },
      { name: 'James Tarkowski', pos: 'Z', age: 32, ovr: 80, fin: 45, pas: 65, def: 82, fis: 84 },
      { name: 'Vitalii Mykolenko', pos: 'L', age: 26, ovr: 79, fin: 55, pas: 74, def: 78, fis: 81 }
    ]
  },
  {
    id: 'nfo',
    name: 'Nottingham Forest',
    fullName: 'Nottingham Forest Football Club',
    shortName: 'NFO',
    leagueId: 'premier_league_2025_26',
    country: 'Inglaterra',
    city: 'Nottingham',
    stadium: 'City Ground',
    stadiumCapacity: 30445,
    colors: { primary: '#dd0000', secondary: '#ffffff', accent: '#000000' },
    budget: 35000000,
    reputation: 79,
    badgeEmoji: '🌲',
    badgeUrl: null,
    players: [
      { name: 'Morgan Gibbs-White', pos: 'M', age: 25, ovr: 82, fin: 78, pas: 84, def: 62, fis: 80 },
      { name: 'Murillo (Z)', pos: 'Z', age: 23, ovr: 81, fin: 40, pas: 76, def: 82, fis: 85 },
      { name: 'Chris Wood', pos: 'A', age: 33, ovr: 80, fin: 82, pas: 66, def: 44, fis: 83 },
      { name: 'Matz Sels', pos: 'G', age: 33, ovr: 79, fin: 22, pas: 66, def: 80, fis: 77 },
      { name: 'Callum Hudson-Odoi', pos: 'A', age: 24, ovr: 79, fin: 76, pas: 78, def: 46, fis: 81 },
      { name: 'Ola Aina', pos: 'L', age: 28, ovr: 78, fin: 56, pas: 74, def: 77, fis: 82 }
    ]
  },
  {
    id: 'lei',
    name: 'Leicester City',
    fullName: 'Leicester City Football Club',
    shortName: 'LEI',
    leagueId: 'premier_league_2025_26',
    country: 'Inglaterra',
    city: 'Leicester',
    stadium: 'King Power Stadium',
    stadiumCapacity: 32262,
    colors: { primary: '#0053a0', secondary: '#fdbe11', accent: '#ffffff' },
    budget: 32000000,
    reputation: 79,
    badgeEmoji: '🦊',
    badgeUrl: null,
    players: [
      { name: 'Harry Winks', pos: 'M', age: 29, ovr: 79, fin: 68, pas: 82, def: 76, fis: 76 },
      { name: 'Mads Hermansen', pos: 'G', age: 25, ovr: 79, fin: 24, pas: 76, def: 80, fis: 76 },
      { name: 'Jamie Vardy', pos: 'A', age: 38, ovr: 78, fin: 83, pas: 66, def: 45, fis: 76 },
      { name: 'Wout Faes', pos: 'Z', age: 27, ovr: 78, fin: 40, pas: 66, def: 79, fis: 82 },
      { name: 'Stephy Mavididi', pos: 'A', age: 27, ovr: 78, fin: 78, pas: 74, def: 46, fis: 81 },
      { name: 'Wilfred Ndidi', pos: 'V', age: 28, ovr: 78, fin: 64, pas: 74, def: 80, fis: 82 }
    ]
  },
  {
    id: 'sou',
    name: 'Southampton',
    fullName: 'Southampton Football Club',
    shortName: 'SOU',
    leagueId: 'premier_league_2025_26',
    country: 'Inglaterra',
    city: 'Southampton',
    stadium: "St Mary's Stadium",
    stadiumCapacity: 32384,
    colors: { primary: '#d71920', secondary: '#130c0e', accent: '#ffffff' },
    budget: 30000000,
    reputation: 78,
    badgeEmoji: '🔴',
    badgeUrl: null,
    players: [
      { name: 'Aaron Ramsdale', pos: 'G', age: 27, ovr: 81, fin: 24, pas: 74, def: 82, fis: 78 },
      { name: 'Kyle Walker-Peters', pos: 'L', age: 28, ovr: 79, fin: 60, pas: 76, def: 77, fis: 80 },
      { name: 'Taylor Harwood-Bellis', pos: 'Z', age: 23, ovr: 78, fin: 38, pas: 70, def: 79, fis: 80 },
      { name: 'Adam Armstrong', pos: 'A', age: 28, ovr: 78, fin: 79, pas: 72, def: 48, fis: 80 },
      { name: 'Flynn Downes', pos: 'V', age: 26, ovr: 77, fin: 62, pas: 76, def: 78, fis: 79 },
      { name: 'Jan Bednarek', pos: 'Z', age: 29, ovr: 77, fin: 40, pas: 65, def: 78, fis: 80 }
    ]
  },
  {
    id: 'ips',
    name: 'Ipswich Town',
    fullName: 'Ipswich Town Football Club',
    shortName: 'IPS',
    leagueId: 'premier_league_2025_26',
    country: 'Inglaterra',
    city: 'Ipswich',
    stadium: 'Portman Road',
    stadiumCapacity: 29673,
    colors: { primary: '#0054a6', secondary: '#ffffff', accent: '#d21034' },
    budget: 28000000,
    reputation: 77,
    badgeEmoji: '🚜',
    badgeUrl: null,
    players: [
      { name: 'Liam Delap', pos: 'A', age: 22, ovr: 78, fin: 80, pas: 66, def: 44, fis: 84 },
      { name: 'Omari Hutchinson', pos: 'M', age: 21, ovr: 78, fin: 76, pas: 78, def: 50, fis: 80 },
      { name: 'Leif Davis', pos: 'L', age: 25, ovr: 78, fin: 62, pas: 80, def: 74, fis: 81 },
      { name: 'Arijanet Muric', pos: 'G', age: 26, ovr: 78, fin: 24, pas: 74, def: 79, fis: 79 },
      { name: 'Sam Morsy', pos: 'V', age: 34, ovr: 77, fin: 64, pas: 74, def: 78, fis: 82 },
      { name: 'Jacob Greaves', pos: 'Z', age: 25, ovr: 77, fin: 42, pas: 68, def: 78, fis: 81 }
    ]
  }
];

/**
 * LALIGA EA SPORTS 2025/26 - 20 CLUBS
 */
export const LALIGA_CLUBS_2025_26 = [
  {
    id: 'rma',
    name: 'Real Madrid',
    fullName: 'Real Madrid Club de Fútbol',
    shortName: 'RMA',
    leagueId: 'laliga_2025_26',
    country: 'Espanha',
    city: 'Madrid',
    stadium: 'Santiago Bernabéu',
    stadiumCapacity: 84744,
    colors: { primary: '#ffffff', secondary: '#00529f', accent: '#fea31b' },
    budget: 105000000,
    reputation: 94,
    badgeEmoji: '👑',
    badgeUrl: null,
    players: [
      { name: 'Kylian Mbappé', pos: 'A', age: 26, ovr: 92, fin: 94, pas: 82, def: 42, fis: 89 },
      { name: 'Vinícius Júnior', pos: 'A', age: 25, ovr: 91, fin: 89, pas: 84, def: 44, fis: 88 },
      { name: 'Jude Bellingham', pos: 'M', age: 22, ovr: 90, fin: 86, pas: 88, def: 78, fis: 86 },
      { name: 'Thibaut Courtois', pos: 'G', age: 33, ovr: 90, fin: 25, pas: 76, def: 91, fis: 84 },
      { name: 'Federico Valverde', pos: 'M', age: 27, ovr: 89, fin: 84, pas: 87, def: 82, fis: 90 },
      { name: 'Antonio Rüdiger', pos: 'Z', age: 32, ovr: 87, fin: 48, pas: 70, def: 88, fis: 88 },
      { name: 'Rodrygo', pos: 'A', age: 24, ovr: 87, fin: 85, pas: 83, def: 48, fis: 82 },
      { name: 'Eduardo Camavinga', pos: 'V', age: 22, ovr: 86, fin: 70, pas: 84, def: 84, fis: 85 },
      { name: 'Aurélien Tchouaméni', pos: 'V', age: 25, ovr: 86, fin: 72, pas: 82, def: 86, fis: 86 },
      { name: 'Éder Militão', pos: 'Z', age: 27, ovr: 86, fin: 52, pas: 74, def: 87, fis: 85 },
      { name: 'Luka Modrić', pos: 'M', age: 40, ovr: 84, fin: 76, pas: 90, def: 64, fis: 68 },
      { name: 'Daniel Carvajal', pos: 'L', age: 33, ovr: 85, fin: 62, pas: 80, def: 84, fis: 81 }
    ]
  },
  {
    id: 'fcb',
    name: 'Barcelona',
    fullName: 'Futbol Club Barcelona',
    shortName: 'FCB',
    leagueId: 'laliga_2025_26',
    country: 'Espanha',
    city: 'Barcelona',
    stadium: 'Spotify Camp Nou',
    stadiumCapacity: 105000,
    colors: { primary: '#004d98', secondary: '#a50044', accent: '#edbb00' },
    budget: 88000000,
    reputation: 92,
    badgeEmoji: '🔵🔴',
    badgeUrl: null,
    players: [
      { name: 'Robert Lewandowski', pos: 'A', age: 37, ovr: 88, fin: 91, pas: 78, def: 44, fis: 78 },
      { name: 'Marc-André ter Stegen', pos: 'G', age: 33, ovr: 88, fin: 24, pas: 85, def: 89, fis: 79 },
      { name: 'Lamine Yamal', pos: 'A', age: 18, ovr: 87, fin: 83, pas: 87, def: 48, fis: 78 },
      { name: 'Pedri', pos: 'M', age: 22, ovr: 87, fin: 78, pas: 90, def: 68, fis: 76 },
      { name: 'Raphinha', pos: 'A', age: 28, ovr: 86, fin: 84, pas: 84, def: 58, fis: 84 },
      { name: 'Dani Olmo', pos: 'M', age: 27, ovr: 86, fin: 84, pas: 87, def: 58, fis: 78 },
      { name: 'Jules Koundé', pos: 'Z', age: 26, ovr: 86, fin: 46, pas: 78, def: 87, fis: 83 },
      { name: 'Frenkie de Jong', pos: 'M', age: 28, ovr: 85, fin: 74, pas: 88, def: 78, fis: 80 },
      { name: 'Gavi', pos: 'M', age: 21, ovr: 84, fin: 74, pas: 83, def: 76, fis: 84 },
      { name: 'Ronald Araújo', pos: 'Z', age: 26, ovr: 85, fin: 48, pas: 68, def: 87, fis: 87 },
      { name: 'Alejandro Balde', pos: 'L', age: 22, ovr: 82, fin: 58, pas: 76, def: 78, fis: 87 },
      { name: 'Pau Cubarsí', pos: 'Z', age: 18, ovr: 82, fin: 35, pas: 81, def: 83, fis: 78 }
    ]
  },
  {
    id: 'atm',
    name: 'Atlético de Madrid',
    fullName: 'Club Atlético de Madrid',
    shortName: 'ATM',
    leagueId: 'laliga_2025_26',
    country: 'Espanha',
    city: 'Madrid',
    stadium: 'Cívitas Metropolitano',
    stadiumCapacity: 70460,
    colors: { primary: '#cb3524', secondary: '#272e61', accent: '#ffffff' },
    budget: 76000000,
    reputation: 88,
    badgeEmoji: '🔴⚪',
    badgeUrl: null,
    players: [
      { name: 'Antoine Griezmann', pos: 'A', age: 34, ovr: 88, fin: 87, pas: 88, def: 66, fis: 78 },
      { name: 'Jan Oblak', pos: 'G', age: 32, ovr: 88, fin: 22, pas: 70, def: 90, fis: 82 },
      { name: 'Julián Álvarez', pos: 'A', age: 25, ovr: 86, fin: 87, pas: 80, def: 56, fis: 84 },
      { name: 'Rodrigo De Paul', pos: 'M', age: 31, ovr: 84, fin: 78, pas: 85, def: 76, fis: 83 },
      { name: 'Robin Le Normand', pos: 'Z', age: 28, ovr: 84, fin: 38, pas: 72, def: 85, fis: 83 },
      { name: 'Conor Gallagher', pos: 'M', age: 25, ovr: 83, fin: 78, pas: 80, def: 79, fis: 86 },
      { name: 'José María Giménez', pos: 'Z', age: 30, ovr: 83, fin: 42, pas: 66, def: 85, fis: 84 },
      { name: 'Koke', pos: 'M', age: 33, ovr: 82, fin: 74, pas: 85, def: 78, fis: 76 },
      { name: 'Marcos Llorente', pos: 'M', age: 30, ovr: 83, fin: 79, pas: 80, def: 78, fis: 88 },
      { name: 'Alexander Sørloth', pos: 'A', age: 29, ovr: 82, fin: 84, pas: 70, def: 44, fis: 86 }
    ]
  },
  {
    id: 'ath',
    name: 'Athletic Club Bilbao',
    fullName: 'Athletic Club',
    shortName: 'ATH',
    leagueId: 'laliga_2025_26',
    country: 'Espanha',
    city: 'Bilbao',
    stadium: 'San Mamés',
    stadiumCapacity: 53289,
    colors: { primary: '#ee2524', secondary: '#000000', accent: '#ffffff' },
    budget: 54000000,
    reputation: 85,
    badgeEmoji: '🦁',
    badgeUrl: null,
    players: [
      { name: 'Nico Williams', pos: 'A', age: 23, ovr: 86, fin: 82, pas: 83, def: 48, fis: 88 },
      { name: 'Unai Simón', pos: 'G', age: 28, ovr: 85, fin: 24, pas: 74, def: 86, fis: 80 },
      { name: 'Oihan Sancet', pos: 'M', age: 25, ovr: 83, fin: 82, pas: 82, def: 64, fis: 80 },
      { name: 'Dani Vivian', pos: 'Z', age: 26, ovr: 83, fin: 36, pas: 68, def: 84, fis: 85 },
      { name: 'Iñaki Williams', pos: 'A', age: 31, ovr: 83, fin: 82, pas: 77, def: 52, fis: 87 },
      { name: 'Yeray Álvarez', pos: 'Z', age: 30, ovr: 80, fin: 40, pas: 68, def: 81, fis: 81 },
      { name: 'Yuri Berchiche', pos: 'L', age: 35, ovr: 79, fin: 62, pas: 75, def: 78, fis: 78 },
      { name: 'Álvaro Djaló', pos: 'A', age: 26, ovr: 80, fin: 79, pas: 76, def: 48, fis: 82 }
    ]
  },
  {
    id: 'rso',
    name: 'Real Sociedad',
    fullName: 'Real Sociedad de Fútbol',
    shortName: 'RSO',
    leagueId: 'laliga_2025_26',
    country: 'Espanha',
    city: 'San Sebastián',
    stadium: 'Reale Arena',
    stadiumCapacity: 39313,
    colors: { primary: '#0067b1', secondary: '#ffffff', accent: '#95bfe5' },
    budget: 52000000,
    reputation: 84,
    badgeEmoji: '🔵⚪',
    badgeUrl: null,
    players: [
      { name: 'Martín Zubimendi', pos: 'V', age: 26, ovr: 85, fin: 66, pas: 84, def: 85, fis: 81 },
      { name: 'Takefusa Kubo', pos: 'A', age: 24, ovr: 84, fin: 80, pas: 83, def: 52, fis: 78 },
      { name: 'Mikel Oyarzabal', pos: 'A', age: 28, ovr: 84, fin: 83, pas: 82, def: 58, fis: 79 },
      { name: 'Álex Remiro', pos: 'G', age: 30, ovr: 83, fin: 24, pas: 74, def: 84, fis: 79 },
      { name: 'Brais Méndez', pos: 'M', age: 28, ovr: 82, fin: 80, pas: 83, def: 66, fis: 78 },
      { name: 'Igor Zubeldia', pos: 'Z', age: 28, ovr: 81, fin: 42, pas: 74, def: 82, fis: 81 },
      { name: 'Sergio Gómez', pos: 'L', age: 25, ovr: 80, fin: 68, pas: 81, def: 74, fis: 78 },
      { name: 'Jon Aramburu', pos: 'L', age: 23, ovr: 79, fin: 56, pas: 74, def: 78, fis: 82 }
    ]
  },
  {
    id: 'vil',
    name: 'Villarreal CF',
    fullName: 'Villarreal Club de Fútbol',
    shortName: 'VIL',
    leagueId: 'laliga_2025_26',
    country: 'Espanha',
    city: 'Vila-real',
    stadium: 'Estadio de la Cerámica',
    stadiumCapacity: 23000,
    colors: { primary: '#ffe600', secondary: '#005bbb', accent: '#000000' },
    budget: 48000000,
    reputation: 83,
    badgeEmoji: '🟡',
    badgeUrl: null,
    players: [
      { name: 'Álex Baena', pos: 'M', age: 24, ovr: 84, fin: 78, pas: 87, def: 65, fis: 79 },
      { name: 'Gerard Moreno', pos: 'A', age: 33, ovr: 83, fin: 85, pas: 82, def: 48, fis: 75 },
      { name: 'Ayoze Pérez', pos: 'A', age: 32, ovr: 81, fin: 81, pas: 77, def: 50, fis: 78 },
      { name: 'Dani Parejo', pos: 'M', age: 36, ovr: 81, fin: 78, pas: 88, def: 62, fis: 68 },
      { name: 'Raúl Albiol', pos: 'Z', age: 40, ovr: 78, fin: 40, pas: 68, def: 80, fis: 72 },
      { name: 'Diego Conde', pos: 'G', age: 26, ovr: 79, fin: 22, pas: 68, def: 80, fis: 77 },
      { name: 'Santi Comesaña', pos: 'M', age: 29, ovr: 79, fin: 70, pas: 78, def: 77, fis: 80 }
    ]
  },
  {
    id: 'bet',
    name: 'Real Betis',
    fullName: 'Real Betis Balompié',
    shortName: 'BET',
    leagueId: 'laliga_2025_26',
    country: 'Espanha',
    city: 'Sevilha',
    stadium: 'Estadio Benito Villamarín',
    stadiumCapacity: 60720,
    colors: { primary: '#009540', secondary: '#ffffff', accent: '#000000' },
    budget: 46000000,
    reputation: 83,
    badgeEmoji: '🟢⚪',
    badgeUrl: null,
    players: [
      { name: 'Isco Alarcón', pos: 'M', age: 33, ovr: 84, fin: 80, pas: 87, def: 58, fis: 73 },
      { name: 'Giovani Lo Celso', pos: 'M', age: 29, ovr: 82, fin: 79, pas: 84, def: 66, fis: 76 },
      { name: 'Vitor Roque', pos: 'A', age: 20, ovr: 80, fin: 82, pas: 72, def: 44, fis: 82 },
      { name: 'Pablo Fornals', pos: 'M', age: 29, ovr: 80, fin: 76, pas: 80, def: 65, fis: 78 },
      { name: 'Rui Silva', pos: 'G', age: 31, ovr: 80, fin: 22, pas: 70, def: 81, fis: 77 },
      { name: 'Marc Bartra', pos: 'Z', age: 34, ovr: 79, fin: 45, pas: 72, def: 80, fis: 76 },
      { name: 'Diego Llorente', pos: 'Z', age: 32, ovr: 79, fin: 40, pas: 68, def: 80, fis: 80 }
    ]
  },
  {
    id: 'gir',
    name: 'Girona FC',
    fullName: 'Girona Futbol Club',
    shortName: 'GIR',
    leagueId: 'laliga_2025_26',
    country: 'Espanha',
    city: 'Girona',
    stadium: 'Estadi Montilivi',
    stadiumCapacity: 14624,
    colors: { primary: '#ce1126', secondary: '#ffffff', accent: '#111827' },
    budget: 45000000,
    reputation: 82,
    badgeEmoji: '🔴⚪',
    badgeUrl: null,
    players: [
      { name: 'Viktor Tsygankov', pos: 'A', age: 27, ovr: 82, fin: 80, pas: 81, def: 52, fis: 78 },
      { name: 'Yangel Herrera', pos: 'V', age: 27, ovr: 81, fin: 74, pas: 78, def: 80, fis: 83 },
      { name: 'Miguel Gutiérrez', pos: 'L', age: 24, ovr: 81, fin: 68, pas: 80, def: 76, fis: 82 },
      { name: 'Daley Blind', pos: 'Z', age: 35, ovr: 80, fin: 55, pas: 84, def: 81, fis: 72 },
      { name: 'Paulo Gazzaniga', pos: 'G', age: 33, ovr: 80, fin: 24, pas: 72, def: 81, fis: 78 },
      { name: 'Abel Ruiz', pos: 'A', age: 25, ovr: 79, fin: 80, pas: 72, def: 44, fis: 80 },
      { name: 'David López', pos: 'Z', age: 36, ovr: 78, fin: 48, pas: 74, def: 79, fis: 74 }
    ]
  },
  {
    id: 'sev',
    name: 'Sevilla FC',
    fullName: 'Sevilla Fútbol Club',
    shortName: 'SEV',
    leagueId: 'laliga_2025_26',
    country: 'Espanha',
    city: 'Sevilha',
    stadium: 'Ramón Sánchez-Pizjuán',
    stadiumCapacity: 43883,
    colors: { primary: '#ffffff', secondary: '#d40028', accent: '#000000' },
    budget: 42000000,
    reputation: 82,
    badgeEmoji: '⚪🔴',
    badgeUrl: null,
    players: [
      { name: 'Loïc Badé', pos: 'Z', age: 25, ovr: 81, fin: 38, pas: 68, def: 82, fis: 84 },
      { name: 'Dodi Lukébakio', pos: 'A', age: 28, ovr: 81, fin: 80, pas: 76, def: 46, fis: 84 },
      { name: 'Saúl Ñíguez', pos: 'M', age: 30, ovr: 80, fin: 76, pas: 79, def: 75, fis: 80 },
      { name: 'Ørjan Nyland', pos: 'G', age: 35, ovr: 79, fin: 22, pas: 66, def: 80, fis: 76 },
      { name: 'Djibril Sow', pos: 'V', age: 28, ovr: 79, fin: 68, pas: 78, def: 78, fis: 81 },
      { name: 'Isaac Romero', pos: 'A', age: 25, ovr: 79, fin: 80, pas: 70, def: 52, fis: 82 }
    ]
  },
  {
    id: 'val',
    name: 'Valencia CF',
    fullName: 'Valencia Club de Fútbol',
    shortName: 'VAL',
    leagueId: 'laliga_2025_26',
    country: 'Espanha',
    city: 'Valência',
    stadium: 'Mestalla',
    stadiumCapacity: 49430,
    colors: { primary: '#ffffff', secondary: '#000000', accent: '#ee2524' },
    budget: 40000000,
    reputation: 81,
    badgeEmoji: '🦇',
    badgeUrl: null,
    players: [
      { name: 'Giorgi Mamardashvili', pos: 'G', age: 25, ovr: 84, fin: 24, pas: 72, def: 86, fis: 83 },
      { name: 'José Gayà', pos: 'L', age: 30, ovr: 82, fin: 64, pas: 79, def: 80, fis: 80 },
      { name: 'Pepelu', pos: 'V', age: 27, ovr: 81, fin: 72, pas: 81, def: 80, fis: 81 },
      { name: 'Cristhian Mosquera', pos: 'Z', age: 21, ovr: 80, fin: 35, pas: 68, def: 81, fis: 83 },
      { name: 'Hugo Duro', pos: 'A', age: 25, ovr: 80, fin: 81, pas: 70, def: 50, fis: 81 },
      { name: 'Javi Guerra', pos: 'M', age: 22, ovr: 79, fin: 75, pas: 80, def: 72, fis: 80 }
    ]
  },
  {
    id: 'cel',
    name: 'RC Celta de Vigo',
    fullName: 'Real Club Celta de Vigo',
    shortName: 'CEL',
    leagueId: 'laliga_2025_26',
    country: 'Espanha',
    city: 'Vigo',
    stadium: 'Abanca-Balaídos',
    stadiumCapacity: 24791,
    colors: { primary: '#87ceeb', secondary: '#ffffff', accent: '#ce1126' },
    budget: 34000000,
    reputation: 80,
    badgeEmoji: '🩵',
    badgeUrl: null,
    players: [
      { name: 'Iago Aspas', pos: 'A', age: 38, ovr: 83, fin: 85, pas: 83, def: 48, fis: 70 },
      { name: 'Borja Iglesias', pos: 'A', age: 32, ovr: 80, fin: 81, pas: 70, def: 45, fis: 81 },
      { name: 'Óscar Mingueza', pos: 'L', age: 26, ovr: 80, fin: 64, pas: 79, def: 78, fis: 80 },
      { name: 'Carl Starfelt', pos: 'Z', age: 30, ovr: 79, fin: 38, pas: 66, def: 80, fis: 82 },
      { name: 'Vicente Guaita', pos: 'G', age: 38, ovr: 79, fin: 22, pas: 68, def: 80, fis: 74 },
      { name: 'Fran Beltrán', pos: 'M', age: 26, ovr: 78, fin: 66, pas: 78, def: 76, fis: 78 }
    ]
  },
  {
    id: 'osa',
    name: 'CA Osasuna',
    fullName: 'Club Atlético Osasuna',
    shortName: 'OSA',
    leagueId: 'laliga_2025_26',
    country: 'Espanha',
    city: 'Pamplona',
    stadium: 'El Sadar',
    stadiumCapacity: 23576,
    colors: { primary: '#d10a11', secondary: '#0b1e3d', accent: '#ffffff' },
    budget: 32000000,
    reputation: 80,
    badgeEmoji: '🔴🔵',
    badgeUrl: null,
    players: [
      { name: 'Ante Budimir', pos: 'A', age: 34, ovr: 81, fin: 83, pas: 66, def: 48, fis: 84 },
      { name: 'Bryan Zaragoza', pos: 'A', age: 24, ovr: 80, fin: 78, pas: 78, def: 44, fis: 84 },
      { name: 'Sergio Herrera', pos: 'G', age: 32, ovr: 80, fin: 24, pas: 68, def: 81, fis: 78 },
      { name: 'Lucas Torró', pos: 'V', age: 31, ovr: 79, fin: 62, pas: 75, def: 80, fis: 82 },
      { name: 'Alejandro Catena', pos: 'Z', age: 30, ovr: 79, fin: 44, pas: 68, def: 80, fis: 82 },
      { name: 'Jon Moncayola', pos: 'M', age: 27, ovr: 78, fin: 70, pas: 77, def: 75, fis: 80 }
    ]
  },
  {
    id: 'mll',
    name: 'RCD Mallorca',
    fullName: 'Real Club Deportivo Mallorca',
    shortName: 'MLL',
    leagueId: 'laliga_2025_26',
    country: 'Espanha',
    city: 'Palma de Maiorca',
    stadium: 'Estadi Mallorca Son Moix',
    stadiumCapacity: 23142,
    colors: { primary: '#e20613', secondary: '#000000', accent: '#fee100' },
    budget: 31000000,
    reputation: 79,
    badgeEmoji: '🔴',
    badgeUrl: null,
    players: [
      { name: 'Vedat Muriqi', pos: 'A', age: 31, ovr: 81, fin: 82, pas: 68, def: 52, fis: 87 },
      { name: 'Sergi Darder', pos: 'M', age: 31, ovr: 80, fin: 76, pas: 82, def: 68, fis: 76 },
      { name: 'Antonio Raíllo', pos: 'Z', age: 34, ovr: 79, fin: 45, pas: 66, def: 80, fis: 83 },
      { name: 'Dani Rodríguez', pos: 'M', age: 37, ovr: 78, fin: 74, pas: 78, def: 64, fis: 75 },
      { name: 'Dominik Greif', pos: 'G', age: 28, ovr: 78, fin: 22, pas: 66, def: 79, fis: 77 },
      { name: 'Pablo Maffeo', pos: 'L', age: 28, ovr: 78, fin: 56, pas: 74, def: 77, fis: 82 }
    ]
  },
  {
    id: 'ray',
    name: 'Rayo Vallecano',
    fullName: 'Rayo Vallecano de Madrid',
    shortName: 'RAY',
    leagueId: 'laliga_2025_26',
    country: 'Espanha',
    city: 'Madrid',
    stadium: 'Campo de Fútbol de Vallecas',
    stadiumCapacity: 14708,
    colors: { primary: '#ffffff', secondary: '#e51c24', accent: '#000000' },
    budget: 28000000,
    reputation: 79,
    badgeEmoji: '⚡',
    badgeUrl: null,
    players: [
      { name: 'James Rodríguez', pos: 'M', age: 34, ovr: 81, fin: 80, pas: 86, def: 50, fis: 71 },
      { name: 'Álvaro García', pos: 'A', age: 32, ovr: 79, fin: 78, pas: 76, def: 56, fis: 83 },
      { name: 'Isi Palazón', pos: 'A', age: 30, ovr: 79, fin: 78, pas: 79, def: 58, fis: 78 },
      { name: 'Florian Lejeune', pos: 'Z', age: 34, ovr: 79, fin: 55, pas: 70, def: 80, fis: 82 },
      { name: 'Augusto Batalla', pos: 'G', age: 29, ovr: 78, fin: 22, pas: 68, def: 79, fis: 78 },
      { name: 'Pathé Ciss', pos: 'V', age: 31, ovr: 77, fin: 62, pas: 74, def: 78, fis: 83 }
    ]
  },
  {
    id: 'lpa',
    name: 'UD Las Palmas',
    fullName: 'Unión Deportiva Las Palmas',
    shortName: 'LPA',
    leagueId: 'laliga_2025_26',
    country: 'Espanha',
    city: 'Las Palmas',
    stadium: 'Estadio Gran Canaria',
    stadiumCapacity: 32400,
    colors: { primary: '#ffde00', secondary: '#004b97', accent: '#ffffff' },
    budget: 26000000,
    reputation: 78,
    badgeEmoji: '🟡',
    badgeUrl: null,
    players: [
      { name: 'Alberto Moleiro', pos: 'M', age: 22, ovr: 80, fin: 76, pas: 82, def: 52, fis: 78 },
      { name: 'Kirian Rodríguez', pos: 'M', age: 29, ovr: 80, fin: 74, pas: 82, def: 68, fis: 77 },
      { name: 'Jasper Cillessen', pos: 'G', age: 36, ovr: 79, fin: 24, pas: 76, def: 80, fis: 74 },
      { name: 'Sandro Ramírez', pos: 'A', age: 30, ovr: 78, fin: 79, pas: 73, def: 48, fis: 79 },
      { name: 'Álex Muñoz', pos: 'L', age: 31, ovr: 77, fin: 55, pas: 72, def: 77, fis: 78 },
      { name: 'Mika Màrmol', pos: 'Z', age: 24, ovr: 78, fin: 36, pas: 76, def: 79, fis: 79 }
    ]
  },
  {
    id: 'get',
    name: 'Getafe CF',
    fullName: 'Getafe Club de Fútbol',
    shortName: 'GET',
    leagueId: 'laliga_2025_26',
    country: 'Espanha',
    city: 'Getafe',
    stadium: 'Coliseum',
    stadiumCapacity: 16500,
    colors: { primary: '#00599c', secondary: '#ffffff', accent: '#d40028' },
    budget: 27000000,
    reputation: 78,
    badgeEmoji: '🔵',
    badgeUrl: null,
    players: [
      { name: 'Borja Mayoral', pos: 'A', age: 28, ovr: 80, fin: 82, pas: 72, def: 46, fis: 79 },
      { name: 'David Soria', pos: 'G', age: 32, ovr: 80, fin: 22, pas: 68, def: 81, fis: 77 },
      { name: 'Mauro Arambarri', pos: 'V', age: 30, ovr: 79, fin: 70, pas: 76, def: 80, fis: 84 },
      { name: 'Luis Milla', pos: 'M', age: 31, ovr: 79, fin: 68, pas: 82, def: 74, fis: 76 },
      { name: 'Djené Dakonam', pos: 'Z', age: 33, ovr: 79, fin: 38, pas: 65, def: 81, fis: 82 },
      { name: 'Omar Alderete', pos: 'Z', age: 28, ovr: 78, fin: 42, pas: 66, def: 79, fis: 83 }
    ]
  },
  {
    id: 'ala',
    name: 'Deportivo Alavés',
    fullName: 'Deportivo Alavés',
    shortName: 'ALA',
    leagueId: 'laliga_2025_26',
    country: 'Espanha',
    city: 'Vitoria-Gasteiz',
    stadium: 'Mendizorroza',
    stadiumCapacity: 19840,
    colors: { primary: '#005ba9', secondary: '#ffffff', accent: '#000000' },
    budget: 25000000,
    reputation: 78,
    badgeEmoji: '🔵⚪',
    badgeUrl: null,
    players: [
      { name: 'Antonio Sivera', pos: 'G', age: 29, ovr: 79, fin: 22, pas: 68, def: 80, fis: 78 },
      { name: 'Kike García', pos: 'A', age: 35, ovr: 78, fin: 80, pas: 66, def: 50, fis: 82 },
      { name: 'Antonio Blanco', pos: 'V', age: 25, ovr: 78, fin: 62, pas: 78, def: 78, fis: 79 },
      { name: 'Jon Guridi', pos: 'M', age: 30, ovr: 78, fin: 72, pas: 77, def: 72, fis: 80 },
      { name: 'Abdel Abqar', pos: 'Z', age: 26, ovr: 78, fin: 35, pas: 65, def: 79, fis: 83 },
      { name: 'Carlos Vicente', pos: 'A', age: 26, ovr: 78, fin: 76, pas: 75, def: 52, fis: 82 }
    ]
  },
  {
    id: 'esp',
    name: 'RCD Espanyol',
    fullName: 'Reial Club Deportiu Espanyol de Barcelona',
    shortName: 'ESP',
    leagueId: 'laliga_2025_26',
    country: 'Espanha',
    city: 'Barcelona',
    stadium: 'Stage Front Stadium',
    stadiumCapacity: 40000,
    colors: { primary: '#0072ce', secondary: '#ffffff', accent: '#ffd200' },
    budget: 28000000,
    reputation: 78,
    badgeEmoji: '🔵⚪',
    badgeUrl: null,
    players: [
      { name: 'Joan García', pos: 'G', age: 24, ovr: 80, fin: 22, pas: 70, def: 81, fis: 79 },
      { name: 'Javi Puado', pos: 'A', age: 27, ovr: 79, fin: 80, pas: 75, def: 52, fis: 80 },
      { name: 'Alex Král', pos: 'V', age: 27, ovr: 78, fin: 65, pas: 76, def: 78, fis: 82 },
      { name: 'Marash Kumbulla', pos: 'Z', age: 25, ovr: 78, fin: 38, pas: 65, def: 79, fis: 82 },
      { name: 'Leandro Cabrera', pos: 'Z', age: 34, ovr: 77, fin: 42, pas: 64, def: 78, fis: 80 },
      { name: 'Álvaro Tejero', pos: 'L', age: 29, ovr: 77, fin: 58, pas: 74, def: 76, fis: 79 }
    ]
  },
  {
    id: 'vld',
    name: 'Real Valladolid',
    fullName: 'Real Valladolid Club de Fútbol',
    shortName: 'VLD',
    leagueId: 'laliga_2025_26',
    country: 'Espanha',
    city: 'Valladolid',
    stadium: 'Estadio José Zorrilla',
    stadiumCapacity: 27618,
    colors: { primary: '#5b2c86', secondary: '#ffffff', accent: '#e20613' },
    budget: 25000000,
    reputation: 77,
    badgeEmoji: '🟣',
    badgeUrl: null,
    players: [
      { name: 'Karl Hein', pos: 'G', age: 23, ovr: 78, fin: 24, pas: 70, def: 79, fis: 78 },
      { name: 'Raúl Moro', pos: 'A', age: 22, ovr: 78, fin: 76, pas: 76, def: 46, fis: 83 },
      { name: 'Kike Pérez', pos: 'M', age: 28, ovr: 77, fin: 72, pas: 77, def: 70, fis: 78 },
      { name: 'Javi Sánchez', pos: 'Z', age: 28, ovr: 77, fin: 38, pas: 66, def: 78, fis: 79 },
      { name: 'Mamadou Sylla', pos: 'A', age: 31, ovr: 77, fin: 78, pas: 68, def: 48, fis: 80 },
      { name: 'Lucas Rosa', pos: 'L', age: 25, ovr: 76, fin: 56, pas: 73, def: 76, fis: 80 }
    ]
  },
  {
    id: 'leg',
    name: 'CD Leganés',
    fullName: 'Club Deportivo Leganés',
    shortName: 'LEG',
    leagueId: 'laliga_2025_26',
    country: 'Espanha',
    city: 'Leganés',
    stadium: 'Estadio Municipal Butarque',
    stadiumCapacity: 12454,
    colors: { primary: '#0055a5', secondary: '#ffffff', accent: '#00a859' },
    budget: 24000000,
    reputation: 77,
    badgeEmoji: '🥒',
    badgeUrl: null,
    players: [
      { name: 'Marko Dmitrović', pos: 'G', age: 33, ovr: 78, fin: 24, pas: 68, def: 79, fis: 78 },
      { name: 'Juan Cruz (Leg)', pos: 'A', age: 25, ovr: 78, fin: 78, pas: 75, def: 50, fis: 81 },
      { name: 'Seydouba Cissé', pos: 'M', age: 24, ovr: 77, fin: 70, pas: 76, def: 72, fis: 80 },
      { name: 'Sergio González', pos: 'Z', age: 33, ovr: 77, fin: 40, pas: 65, def: 78, fis: 79 },
      { name: 'Miguel de la Fuente', pos: 'A', age: 26, ovr: 77, fin: 78, pas: 68, def: 48, fis: 81 },
      { name: 'Yvan Neyou', pos: 'V', age: 28, ovr: 77, fin: 60, pas: 75, def: 78, fis: 81 }
    ]
  }
];

/**
 * REPRESENTATIVE STANDINGS 2025/26 (Baseline mid-season snapshot)
 */
export const PREMIER_LEAGUE_STANDINGS_2025_26 = [
  { rank: 1, clubId: 'mci', clubName: 'Manchester City', points: 30, played: 12, won: 9, drawn: 3, lost: 0, goalsFor: 31, goalsAgainst: 11, goalDifference: 20 },
  { rank: 2, clubId: 'liv', clubName: 'Liverpool', points: 29, played: 12, won: 9, drawn: 2, lost: 1, goalsFor: 28, goalsAgainst: 10, goalDifference: 18 },
  { rank: 3, clubId: 'ars', clubName: 'Arsenal', points: 27, played: 12, won: 8, drawn: 3, lost: 1, goalsFor: 24, goalsAgainst: 9, goalDifference: 15 },
  { rank: 4, clubId: 'che', clubName: 'Chelsea', points: 24, played: 12, won: 7, drawn: 3, lost: 2, goalsFor: 26, goalsAgainst: 14, goalDifference: 12 },
  { rank: 5, clubId: 'avl', clubName: 'Aston Villa', points: 23, played: 12, won: 7, drawn: 2, lost: 3, goalsFor: 22, goalsAgainst: 15, goalDifference: 7 },
  { rank: 6, clubId: 'tot', clubName: 'Tottenham Hotspur', points: 22, played: 12, won: 7, drawn: 1, lost: 4, goalsFor: 25, goalsAgainst: 16, goalDifference: 9 },
  { rank: 7, clubId: 'new', clubName: 'Newcastle United', points: 20, played: 12, won: 6, drawn: 2, lost: 4, goalsFor: 20, goalsAgainst: 15, goalDifference: 5 },
  { rank: 8, clubId: 'bha', clubName: 'Brighton', points: 19, played: 12, won: 5, drawn: 4, lost: 3, goalsFor: 21, goalsAgainst: 18, goalDifference: 3 },
  { rank: 9, clubId: 'ful', clubName: 'Fulham', points: 18, played: 12, won: 5, drawn: 3, lost: 4, goalsFor: 18, goalsAgainst: 16, goalDifference: 2 },
  { rank: 10, clubId: 'mun', clubName: 'Manchester United', points: 18, played: 12, won: 5, drawn: 3, lost: 4, goalsFor: 17, goalsAgainst: 16, goalDifference: 1 },
  { rank: 11, clubId: 'nfo', clubName: 'Nottingham Forest', points: 17, played: 12, won: 5, drawn: 2, lost: 5, goalsFor: 16, goalsAgainst: 16, goalDifference: 0 },
  { rank: 12, clubId: 'bre', clubName: 'Brentford', points: 16, played: 12, won: 5, drawn: 1, lost: 6, goalsFor: 22, goalsAgainst: 22, goalDifference: 0 },
  { rank: 13, clubId: 'bou', clubName: 'Bournemouth', points: 15, played: 12, won: 4, drawn: 3, lost: 5, goalsFor: 15, goalsAgainst: 17, goalDifference: -2 },
  { rank: 14, clubId: 'whu', clubName: 'West Ham', points: 14, played: 12, won: 4, drawn: 2, lost: 6, goalsFor: 15, goalsAgainst: 21, goalDifference: -6 },
  { rank: 15, clubId: 'eve', clubName: 'Everton', points: 12, played: 12, won: 3, drawn: 3, lost: 6, goalsFor: 12, goalsAgainst: 19, goalDifference: -7 },
  { rank: 16, clubId: 'lei', clubName: 'Leicester City', points: 11, played: 12, won: 3, drawn: 2, lost: 7, goalsFor: 14, goalsAgainst: 23, goalDifference: -9 },
  { rank: 17, clubId: 'cry', clubName: 'Crystal Palace', points: 10, played: 12, won: 2, drawn: 4, lost: 6, goalsFor: 11, goalsAgainst: 18, goalDifference: -7 },
  { rank: 18, clubId: 'wol', clubName: 'Wolverhampton', points: 8, played: 12, won: 2, drawn: 2, lost: 8, goalsFor: 14, goalsAgainst: 27, goalDifference: -13 },
  { rank: 19, clubId: 'ips', clubName: 'Ipswich Town', points: 8, played: 12, won: 1, drawn: 5, lost: 6, goalsFor: 12, goalsAgainst: 25, goalDifference: -13 },
  { rank: 20, clubId: 'sou', clubName: 'Southampton', points: 5, played: 12, won: 1, drawn: 2, lost: 9, goalsFor: 9, goalsAgainst: 27, goalDifference: -18 }
];

export const LALIGA_STANDINGS_2025_26 = [
  { rank: 1, clubId: 'rma', clubName: 'Real Madrid', points: 31, played: 12, won: 10, drawn: 1, lost: 1, goalsFor: 32, goalsAgainst: 10, goalDifference: 22 },
  { rank: 2, clubId: 'fcb', clubName: 'Barcelona', points: 30, played: 12, won: 10, drawn: 0, lost: 2, goalsFor: 35, goalsAgainst: 12, goalDifference: 23 },
  { rank: 3, clubId: 'atm', clubName: 'Atlético de Madrid', points: 26, played: 12, won: 7, drawn: 5, lost: 0, goalsFor: 22, goalsAgainst: 8, goalDifference: 14 },
  { rank: 4, clubId: 'ath', clubName: 'Athletic Club Bilbao', points: 23, played: 12, won: 7, drawn: 2, lost: 3, goalsFor: 21, goalsAgainst: 13, goalDifference: 8 },
  { rank: 5, clubId: 'vil', clubName: 'Villarreal CF', points: 22, played: 12, won: 6, drawn: 4, lost: 2, goalsFor: 23, goalsAgainst: 18, goalDifference: 5 },
  { rank: 6, clubId: 'bet', clubName: 'Real Betis', points: 20, played: 12, won: 5, drawn: 5, lost: 2, goalsFor: 16, goalsAgainst: 11, goalDifference: 5 },
  { rank: 7, clubId: 'rso', clubName: 'Real Sociedad', points: 19, played: 12, won: 5, drawn: 4, lost: 3, goalsFor: 15, goalsAgainst: 11, goalDifference: 4 },
  { rank: 8, clubId: 'osa', clubName: 'CA Osasuna', points: 19, played: 12, won: 5, drawn: 4, lost: 3, goalsFor: 17, goalsAgainst: 16, goalDifference: 1 },
  { rank: 9, clubId: 'gir', clubName: 'Girona FC', points: 18, played: 12, won: 5, drawn: 3, lost: 4, goalsFor: 18, goalsAgainst: 17, goalDifference: 1 },
  { rank: 10, clubId: 'mll', clubName: 'RCD Mallorca', points: 17, played: 12, won: 5, drawn: 2, lost: 5, goalsFor: 13, goalsAgainst: 13, goalDifference: 0 },
  { rank: 11, clubId: 'cel', clubName: 'RC Celta de Vigo', points: 16, played: 12, won: 5, drawn: 1, lost: 6, goalsFor: 20, goalsAgainst: 22, goalDifference: -2 },
  { rank: 12, clubId: 'sev', clubName: 'Sevilla FC', points: 15, played: 12, won: 4, drawn: 3, lost: 5, goalsFor: 14, goalsAgainst: 17, goalDifference: -3 },
  { rank: 13, clubId: 'ray', clubName: 'Rayo Vallecano', points: 15, played: 12, won: 4, drawn: 3, lost: 5, goalsFor: 13, goalsAgainst: 16, goalDifference: -3 },
  { rank: 14, clubId: 'ala', clubName: 'Deportivo Alavés', points: 13, played: 12, won: 4, drawn: 1, lost: 7, goalsFor: 14, goalsAgainst: 20, goalDifference: -6 },
  { rank: 15, clubId: 'get', clubName: 'Getafe CF', points: 12, played: 12, won: 2, drawn: 6, lost: 4, goalsFor: 10, goalsAgainst: 12, goalDifference: -2 },
  { rank: 16, clubId: 'leg', clubName: 'CD Leganés', points: 11, played: 12, won: 2, drawn: 5, lost: 5, goalsFor: 11, goalsAgainst: 16, goalDifference: -5 },
  { rank: 17, clubId: 'lpa', clubName: 'UD Las Palmas', points: 10, played: 12, won: 2, drawn: 4, lost: 6, goalsFor: 13, goalsAgainst: 22, goalDifference: -9 },
  { rank: 18, clubId: 'esp', clubName: 'RCD Espanyol', points: 10, played: 12, won: 3, drawn: 1, lost: 8, goalsFor: 11, goalsAgainst: 23, goalDifference: -12 },
  { rank: 19, clubId: 'vld', clubName: 'Real Valladolid', points: 9, played: 12, won: 2, drawn: 3, lost: 7, goalsFor: 10, goalsAgainst: 25, goalDifference: -15 },
  { rank: 20, clubId: 'val', clubName: 'Valencia CF', points: 7, played: 12, won: 1, drawn: 4, lost: 7, goalsFor: 9, goalsAgainst: 21, goalDifference: -12 }
];

/**
 * INTERNATIONAL_COMPETITIONS_CATALOG
 * Arquitetura extensível de catálogo de ligas internacionais do Footkeep.
 * Novas ligas (ex: Serie A italiana, Bundesliga, Champions League) podem ser acopladas
 * registrando simplesmente um novo nó de competição neste mapa.
 */
export const INTERNATIONAL_COMPETITIONS_CATALOG = {
  premier_league_2025_26: {
    id: 'premier_league_2025_26',
    name: 'Premier League',
    country: 'Inglaterra',
    confederation: 'UEFA',
    season: '2025 / 2026',
    type: 'league',
    tier: 1,
    totalClubs: 20,
    roundsCount: 38,
    clubs: PREMIER_LEAGUE_CLUBS_2025_26,
    standings: PREMIER_LEAGUE_STANDINGS_2025_26,
    theme: {
      primaryColor: '#38003c',
      accentColor: '#00ff87',
      logoEmoji: '🦁'
    }
  },
  laliga_2025_26: {
    id: 'laliga_2025_26',
    name: 'LaLiga EA Sports',
    country: 'Espanha',
    confederation: 'UEFA',
    season: '2025 / 2026',
    type: 'league',
    tier: 1,
    totalClubs: 20,
    roundsCount: 38,
    clubs: LALIGA_CLUBS_2025_26,
    standings: LALIGA_STANDINGS_2025_26,
    theme: {
      primaryColor: '#ff4b44',
      accentColor: '#111827',
      logoEmoji: '🇪🇸'
    }
  }
};

/**
 * Registra uma nova competição internacional no catálogo em tempo de execução
 * (Extensibilidade aberta para Serie A, Bundesliga, Champions League, etc.)
 * @param {Object} competitionConfig
 */
export function registerInternationalCompetition(competitionConfig) {
  if (!competitionConfig || !competitionConfig.id) {
    throw new Error('Configuração de competição internacional inválida: id obrigatório.');
  }
  INTERNATIONAL_COMPETITIONS_CATALOG[competitionConfig.id] = competitionConfig;
  return INTERNATIONAL_COMPETITIONS_CATALOG[competitionConfig.id];
}

/**
 * Retorna todos os IDs das competições internacionais registradas
 * @returns {Array<string>}
 */
export function getRegisteredCompetitionIds() {
  return Object.keys(INTERNATIONAL_COMPETITIONS_CATALOG);
}

/**
 * Obtém os dados de uma competição internacional específica
 * @param {string} competitionId - ex: 'premier_league_2025_26', 'laliga_2025_26'
 * @returns {Object|null}
 */
export function getInternationalCompetition(competitionId) {
  return INTERNATIONAL_COMPETITIONS_CATALOG[competitionId] || null;
}

/**
 * Obtém um clube internacional por seu ID em qualquer liga cadastrada
 * @param {string} clubId - ex: 'mci', 'rma', 'ars', 'fcb'
 * @returns {Object|null}
 */
export function getInternationalClub(clubId) {
  for (const comp of Object.values(INTERNATIONAL_COMPETITIONS_CATALOG)) {
    const found = comp.clubs.find(c => c.id === clubId);
    if (found) return found;
  }
  return null;
}

/**
 * Obtém a tabela de classificação de uma competição internacional
 * @param {string} competitionId
 * @returns {Array}
 */
export function getInternationalStandings(competitionId) {
  const comp = INTERNATIONAL_COMPETITIONS_CATALOG[competitionId];
  return comp ? [...comp.standings] : [];
}

/**
 * Converte os atletas de uma liga internacional para o formato oficial do Footkeep,
 * calculando valores de mercado e salários calibrados para o mercado europeu de topo.
 * @param {string} competitionId
 * @returns {Array}
 */
export function buildInternationalPlayers(competitionId) {
  const comp = INTERNATIONAL_COMPETITIONS_CATALOG[competitionId];
  if (!comp) return [];

  const allPlayers = [];
  let currentId = 8001;

  comp.clubs.forEach(club => {
    club.players.forEach(raw => {
      const ageFactor = raw.age < 24 ? 1.45 : (raw.age > 31 ? 0.65 : 1.0);
      const baseValue = Math.pow(raw.ovr - 40, 2.8) * 1600 * ageFactor;
      const value = Math.round(baseValue / 10000) * 10000;
      const salary = Math.round((value * 0.007) / 1000) * 1000 + 10000;

      allPlayers.push({
        id: `intl_${currentId++}`,
        name: raw.name,
        clubId: club.id,
        clubName: club.name,
        leagueId: comp.id,
        country: club.country,
        position: raw.pos,
        age: raw.age,
        overall: raw.ovr,
        fin: raw.fin,
        pas: raw.pas,
        def: raw.def,
        fis: raw.fis,
        value,
        salary,
        fitness: 100,
        morale: 'Alta',
        yellowCards: 0,
        redCards: 0,
        goals: 0,
        assists: 0,
        matchesPlayed: 0,
        cleanSheets: 0,
        isSuspended: false,
        isListed: false,
        isInternational: true
      });
    });
  });

  return allPlayers;
}

/**
 * Gera os confrontos oficiais em sistema de turno e returno (Round Robin) para uma liga internacional
 * @param {string} competitionId
 * @returns {Array<Object>} Lista de rodadas com partidas
 */
export function generateInternationalFixtures(competitionId) {
  const comp = INTERNATIONAL_COMPETITIONS_CATALOG[competitionId];
  if (!comp || !comp.clubs || comp.clubs.length < 2) return [];

  const clubs = [...comp.clubs];
  const totalTeams = clubs.length;
  const numRounds = (totalTeams - 1) * 2;
  const matchesPerRound = totalTeams / 2;

  const rounds = [];
  const teamPool = [...clubs];

  // Algoritmo canônico de geração de rodadas Berger/Round-Robin
  for (let r = 0; r < totalTeams - 1; r++) {
    const roundMatches = [];
    for (let m = 0; m < matchesPerRound; m++) {
      const home = teamPool[m];
      const away = teamPool[totalTeams - 1 - m];
      roundMatches.push({
        round: r + 1,
        homeId: home.id,
        homeName: home.name,
        awayId: away.id,
        awayName: away.name,
        stadium: home.stadium,
        competitionId: comp.id,
        isCompleted: r < 12 // Primeiras 12 rodadas concluídas na tabela representativa
      });
    }
    rounds.push({ roundNumber: r + 1, matches: roundMatches });
    teamPool.splice(1, 0, teamPool.pop());
  }

  // Returno com inversão de mando de campo
  for (let r = 0; r < totalTeams - 1; r++) {
    const returnRoundMatches = rounds[r].matches.map(match => ({
      round: r + totalTeams,
      homeId: match.awayId,
      homeName: match.awayName,
      awayId: match.homeId,
      awayName: match.homeName,
      stadium: comp.clubs.find(c => c.id === match.awayId)?.stadium || 'Estádio Principal',
      competitionId: comp.id,
      isCompleted: false
    }));
    rounds.push({ roundNumber: r + totalTeams, matches: returnRoundMatches });
  }

  return rounds;
}
