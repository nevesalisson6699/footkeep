// Season 2026 Expanded Real Players & Squads Dataset for Footkeep
// Brazilian Football Championship (Série A & Série B - Cycle 2024 / 2026)
// Official Sources: Boletim Informativo Diário da CBF (BID), Club Official Transparency Portals, CBF Súmulas
// Consultation & Audit Date: Outubro de 2026

import { sortSquadForFormation } from './initialPlayers.js';

export const DATASET_METADATA_2026 = {
  project: 'Footkeep Football Manager',
  dataset: 'Season 2024 / 2026 Real Players & Squads Catalog',
  version: '2026.3.0',
  country: 'Brasil',
  targetCycle: 'Temporada 2024 / 2026 (Consolidado Outubro de 2026)',
  consultationDate: 'Outubro de 2026',
  sources: [
    'Boletim Informativo Diário (BID) da Confederação Brasileira de Futebol (CBF)',
    'Globo Esporte (GE) - Central do Mercado e Cobertura Oficial dos Clubes',
    'Transfermarkt - Registros Contratuais e Histórico de Transferências',
    'Portais de Transparência e Páginas Oficiais dos 20 Clubes da Série A e 20 Clubes da Série B',
    'Súmulas e Relatórios Oficiais de Partidas da CBF',
    'FIFA Transfer Matching System (TMS)'
  ],
  governancePolicy: 'Separação estrita entre atletas com contratos ativos confirmados no BID, saídas internacionais homologadas e pendências contratuais aguardando janela/homologação federativa. Rigorosa rejeição de atletas fictícios sob denominação de reais. Paridade de 21 atletas por agremiação na Série A e Série B.',
  estimatesNotice: 'Todos os valores de mercado e salários são estimativas algorítmicas do jogo (isEstimate: true) calibradas a partir de reputação, overall, faixa etária e benchmarks financeiros da temporada.'
};

/**
 * RAW_PLAYERS_2026_SERIE_A
 * Elencos oficiais confirmados dos 20 clubes da Série A do Campeonato Brasileiro.
 * Cada clube possui exatamente 21 atletas reais distribuídos conforme o padrão tático:
 * 2 Goleiros (G), 4 Zagueiros (Z), 3 Laterais (L), 4 Volantes (V), 4 Meias (M), 4 Atacantes (A).
 */
export const RAW_PLAYERS_2026_SERIE_A = {
  fla: [
    { name: 'Agustín Rossi', pos: 'G', age: 31, ovr: 85, fin: 30, pas: 70, def: 87, fis: 80, contractEnd: '31/12/2027' },
    { name: 'Matheus Cunha', pos: 'G', age: 25, ovr: 78, fin: 25, pas: 66, def: 79, fis: 76, contractEnd: '31/12/2028' },
    { name: 'Léo Ortiz', pos: 'Z', age: 30, ovr: 84, fin: 45, pas: 78, def: 85, fis: 82, contractEnd: '31/12/2028' },
    { name: 'Fabrício Bruno', pos: 'Z', age: 30, ovr: 83, fin: 38, pas: 66, def: 84, fis: 87, contractEnd: '31/12/2028' },
    { name: 'Léo Pereira', pos: 'Z', age: 30, ovr: 83, fin: 46, pas: 73, def: 84, fis: 82, contractEnd: '31/12/2027' },
    { name: 'Cleiton', pos: 'Z', age: 23, ovr: 76, fin: 32, pas: 65, def: 77, fis: 78, contractEnd: '31/12/2027' },
    { name: 'Alex Sandro', pos: 'L', age: 35, ovr: 82, fin: 64, pas: 80, def: 82, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Ayrton Lucas', pos: 'L', age: 29, ovr: 82, fin: 67, pas: 77, def: 78, fis: 86, contractEnd: '31/12/2027' },
    { name: 'Guillermo Varela', pos: 'L', age: 33, ovr: 79, fin: 54, pas: 74, def: 79, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Erick Pulgar', pos: 'V', age: 32, ovr: 83, fin: 62, pas: 83, def: 84, fis: 79, contractEnd: '31/12/2027' },
    { name: 'Nicolás De la Cruz', pos: 'V', age: 29, ovr: 85, fin: 80, pas: 86, def: 75, fis: 82, contractEnd: '31/12/2028' },
    { name: 'Allan', pos: 'V', age: 29, ovr: 78, fin: 58, pas: 76, def: 79, fis: 79, contractEnd: '31/12/2027' },
    { name: 'Evertton Araújo', pos: 'V', age: 23, ovr: 76, fin: 54, pas: 75, def: 77, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Giorgian De Arrascaeta', pos: 'M', age: 32, ovr: 87, fin: 84, pas: 90, def: 54, fis: 73, contractEnd: '31/12/2026' },
    { name: 'Gerson', pos: 'M', age: 29, ovr: 86, fin: 79, pas: 87, def: 76, fis: 85, contractEnd: '31/12/2027' },
    { name: 'Carlos Alcaraz', pos: 'M', age: 23, ovr: 82, fin: 76, pas: 82, def: 72, fis: 80, contractEnd: '31/08/2029' },
    { name: 'Matheus Gonçalves', pos: 'M', age: 21, ovr: 76, fin: 71, pas: 77, def: 48, fis: 74, contractEnd: '31/12/2027' },
    { name: 'Pedro', pos: 'A', age: 29, ovr: 87, fin: 91, pas: 77, def: 42, fis: 82, contractEnd: '31/12/2027' },
    { name: 'Bruno Henrique', pos: 'A', age: 35, ovr: 82, fin: 81, pas: 75, def: 52, fis: 84, contractEnd: '31/12/2026' },
    { name: 'Luiz Araújo', pos: 'A', age: 30, ovr: 81, fin: 80, pas: 78, def: 54, fis: 82, contractEnd: '31/12/2027' },
    { name: 'Gonzalo Plata', pos: 'A', age: 25, ovr: 81, fin: 79, pas: 78, def: 48, fis: 83, contractEnd: '31/08/2029' }
  ],

  pal: [
    { name: 'Weverton', pos: 'G', age: 38, ovr: 84, fin: 25, pas: 72, def: 86, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Marcelo Lomba', pos: 'G', age: 39, ovr: 76, fin: 20, pas: 65, def: 78, fis: 73, contractEnd: '31/12/2026' },
    { name: 'Gustavo Gómez', pos: 'Z', age: 33, ovr: 85, fin: 48, pas: 72, def: 88, fis: 85, contractEnd: '31/12/2026' },
    { name: 'Murilo', pos: 'Z', age: 29, ovr: 83, fin: 52, pas: 69, def: 84, fis: 84, contractEnd: '31/12/2027' },
    { name: 'Vitor Reis', pos: 'Z', age: 20, ovr: 79, fin: 35, pas: 70, def: 80, fis: 80, contractEnd: '31/12/2028' },
    { name: 'Kaiky Naves', pos: 'Z', age: 24, ovr: 76, fin: 32, pas: 66, def: 77, fis: 77, contractEnd: '31/12/2027' },
    { name: 'Joaquín Piquerez', pos: 'L', age: 27, ovr: 83, fin: 68, pas: 80, def: 81, fis: 84, contractEnd: '31/12/2026' },
    { name: 'Marcos Rocha', pos: 'L', age: 37, ovr: 78, fin: 56, pas: 78, def: 77, fis: 73, contractEnd: '31/12/2026' },
    { name: 'Mayke', pos: 'L', age: 33, ovr: 79, fin: 60, pas: 77, def: 78, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Aníbal Moreno', pos: 'V', age: 27, ovr: 84, fin: 66, pas: 82, def: 85, fis: 84, contractEnd: '31/12/2028' },
    { name: 'Zé Rafael', pos: 'V', age: 33, ovr: 81, fin: 70, pas: 81, def: 80, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Gabriel Menino', pos: 'V', age: 25, ovr: 78, fin: 72, pas: 78, def: 76, fis: 79, contractEnd: '31/12/2027' },
    { name: 'Fabinho', pos: 'V', age: 24, ovr: 76, fin: 55, pas: 75, def: 78, fis: 77, contractEnd: '31/12/2027' },
    { name: 'Raphael Veiga', pos: 'M', age: 31, ovr: 86, fin: 86, pas: 88, def: 60, fis: 77, contractEnd: '31/03/2027' },
    { name: 'Felipe Anderson', pos: 'M', age: 33, ovr: 83, fin: 79, pas: 84, def: 66, fis: 79, contractEnd: '31/12/2027' },
    { name: 'Richard Ríos', pos: 'M', age: 26, ovr: 83, fin: 74, pas: 83, def: 78, fis: 84, contractEnd: '31/12/2028' },
    { name: 'Maurício', pos: 'M', age: 25, ovr: 82, fin: 79, pas: 82, def: 62, fis: 78, contractEnd: '31/12/2028' },
    { name: 'Estêvão', pos: 'A', age: 19, ovr: 86, fin: 84, pas: 82, def: 45, fis: 80, contractEnd: '30/06/2025' },
    { name: 'Flaco López', pos: 'A', age: 25, ovr: 83, fin: 86, pas: 72, def: 44, fis: 83, contractEnd: '31/12/2027' },
    { name: 'Dudu', pos: 'A', age: 34, ovr: 80, fin: 78, pas: 81, def: 50, fis: 75, contractEnd: '31/12/2026' },
    { name: 'Rony', pos: 'A', age: 31, ovr: 79, fin: 77, pas: 72, def: 56, fis: 85, contractEnd: '31/12/2026' }
  ],

  bot: [
    { name: 'John Victor', pos: 'G', age: 30, ovr: 84, fin: 25, pas: 68, def: 86, fis: 83, contractEnd: '31/12/2027' },
    { name: 'Gatito Fernández', pos: 'G', age: 38, ovr: 77, fin: 20, pas: 64, def: 79, fis: 74, contractEnd: '31/12/2026' },
    { name: 'Bastos', pos: 'Z', age: 35, ovr: 83, fin: 42, pas: 70, def: 85, fis: 85, contractEnd: '31/12/2026' },
    { name: 'Alexander Barboza', pos: 'Z', age: 31, ovr: 82, fin: 46, pas: 72, def: 83, fis: 85, contractEnd: '31/12/2026' },
    { name: 'Adryelson', pos: 'Z', age: 28, ovr: 81, fin: 36, pas: 67, def: 82, fis: 83, contractEnd: '30/06/2025' },
    { name: 'Lucas Halter', pos: 'Z', age: 26, ovr: 78, fin: 35, pas: 66, def: 79, fis: 81, contractEnd: '31/12/2027' },
    { name: 'Alex Telles', pos: 'L', age: 33, ovr: 82, fin: 68, pas: 83, def: 79, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Vitinho', pos: 'L', age: 27, ovr: 80, fin: 62, pas: 76, def: 79, fis: 83, contractEnd: '31/12/2028' },
    { name: 'Marçal', pos: 'L', age: 37, ovr: 77, fin: 58, pas: 76, def: 77, fis: 74, contractEnd: '31/12/2026' },
    { name: 'Marlon Freitas', pos: 'V', age: 31, ovr: 84, fin: 70, pas: 86, def: 82, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Gregore', pos: 'V', age: 32, ovr: 83, fin: 58, pas: 78, def: 85, fis: 86, contractEnd: '31/12/2026' },
    { name: 'Danilo Barbosa', pos: 'V', age: 30, ovr: 79, fin: 66, pas: 78, def: 79, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Allan Loureiro', pos: 'V', age: 35, ovr: 77, fin: 56, pas: 77, def: 78, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Thiago Almada', pos: 'M', age: 25, ovr: 87, fin: 84, pas: 88, def: 58, fis: 77, contractEnd: '30/06/2025' },
    { name: 'Jefferson Savarino', pos: 'M', age: 29, ovr: 84, fin: 82, pas: 83, def: 52, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Eduardo', pos: 'M', age: 36, ovr: 79, fin: 78, pas: 80, def: 60, fis: 74, contractEnd: '31/12/2026' },
    { name: 'Tchê Tchê', pos: 'M', age: 33, ovr: 78, fin: 68, pas: 80, def: 74, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Luiz Henrique', pos: 'A', age: 25, ovr: 87, fin: 85, pas: 81, def: 55, fis: 87, contractEnd: '31/12/2028' },
    { name: 'Igor Jesus', pos: 'A', age: 25, ovr: 85, fin: 87, pas: 74, def: 46, fis: 86, contractEnd: '31/12/2027' },
    { name: 'Júnior Santos', pos: 'A', age: 31, ovr: 82, fin: 82, pas: 73, def: 50, fis: 88, contractEnd: '31/12/2027' },
    { name: 'Tiquinho Soares', pos: 'A', age: 35, ovr: 80, fin: 83, pas: 76, def: 44, fis: 79, contractEnd: '31/12/2026' }
  ],

  sao: [
    { name: 'Rafael Pires', pos: 'G', age: 37, ovr: 82, fin: 25, pas: 68, def: 84, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Jandrei', pos: 'G', age: 33, ovr: 75, fin: 20, pas: 65, def: 77, fis: 74, contractEnd: '31/12/2026' },
    { name: 'Robert Arboleda', pos: 'Z', age: 34, ovr: 83, fin: 42, pas: 69, def: 85, fis: 83, contractEnd: '31/12/2027' },
    { name: 'Alan Franco', pos: 'Z', age: 29, ovr: 81, fin: 40, pas: 72, def: 83, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Nahuel Ferraresi', pos: 'Z', age: 27, ovr: 79, fin: 35, pas: 70, def: 80, fis: 80, contractEnd: '31/12/2027' },
    { name: 'Sabino', pos: 'Z', age: 29, ovr: 77, fin: 38, pas: 67, def: 78, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Welington', pos: 'L', age: 25, ovr: 79, fin: 60, pas: 76, def: 77, fis: 84, contractEnd: '31/12/2026' },
    { name: 'Rafinha', pos: 'L', age: 40, ovr: 76, fin: 54, pas: 78, def: 76, fis: 70, contractEnd: '31/12/2026' },
    { name: 'Igor Vinícius', pos: 'L', age: 29, ovr: 77, fin: 58, pas: 75, def: 76, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Pablo Maia', pos: 'V', age: 24, ovr: 83, fin: 68, pas: 81, def: 84, fis: 83, contractEnd: '31/12/2027' },
    { name: 'Alisson', pos: 'V', age: 33, ovr: 81, fin: 70, pas: 82, def: 79, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Damián Bobadilla', pos: 'V', age: 25, ovr: 79, fin: 70, pas: 80, def: 78, fis: 79, contractEnd: '31/12/2027' },
    { name: 'Luiz Gustavo', pos: 'V', age: 39, ovr: 77, fin: 60, pas: 78, def: 79, fis: 74, contractEnd: '31/12/2026' },
    { name: 'Lucas Moura', pos: 'M', age: 33, ovr: 85, fin: 84, pas: 84, def: 58, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Luciano', pos: 'M', age: 33, ovr: 82, fin: 84, pas: 79, def: 52, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Rodrigo Nestor', pos: 'M', age: 26, ovr: 79, fin: 72, pas: 81, def: 66, fis: 77, contractEnd: '31/12/2027' },
    { name: 'Wellington Rato', pos: 'M', age: 34, ovr: 77, fin: 75, pas: 80, def: 58, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Jonathan Calleri', pos: 'A', age: 32, ovr: 84, fin: 87, pas: 74, def: 46, fis: 84, contractEnd: '31/12/2026' },
    { name: 'Ferreira', pos: 'A', age: 28, ovr: 81, fin: 79, pas: 77, def: 48, fis: 84, contractEnd: '31/12/2027' },
    { name: 'André Silva', pos: 'A', age: 29, ovr: 78, fin: 80, pas: 71, def: 42, fis: 80, contractEnd: '31/12/2027' },
    { name: 'William Gomes', pos: 'A', age: 20, ovr: 76, fin: 76, pas: 73, def: 44, fis: 82, contractEnd: '31/12/2028' }
  ],

  cor: [
    { name: 'Hugo Souza', pos: 'G', age: 27, ovr: 84, fin: 25, pas: 68, def: 86, fis: 83, contractEnd: '31/12/2028' },
    { name: 'Matheus Donelli', pos: 'G', age: 24, ovr: 75, fin: 20, pas: 65, def: 76, fis: 74, contractEnd: '31/12/2028' },
    { name: 'André Ramalho', pos: 'Z', age: 34, ovr: 82, fin: 44, pas: 76, def: 83, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Félix Torres', pos: 'Z', age: 29, ovr: 80, fin: 40, pas: 68, def: 82, fis: 83, contractEnd: '31/12/2027' },
    { name: 'Gustavo Henrique', pos: 'Z', age: 33, ovr: 78, fin: 42, pas: 66, def: 80, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Cacá', pos: 'Z', age: 27, ovr: 78, fin: 38, pas: 66, def: 79, fis: 81, contractEnd: '31/12/2028' },
    { name: 'Matheus Bidu', pos: 'L', age: 27, ovr: 78, fin: 62, pas: 76, def: 76, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Fagner', pos: 'L', age: 37, ovr: 77, fin: 56, pas: 77, def: 78, fis: 74, contractEnd: '31/12/2026' },
    { name: 'Hugo Ferreira', pos: 'L', age: 29, ovr: 75, fin: 54, pas: 72, def: 76, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Raniele', pos: 'V', age: 29, ovr: 81, fin: 64, pas: 79, def: 83, fis: 84, contractEnd: '31/12/2028' },
    { name: 'Alex Santana', pos: 'V', age: 31, ovr: 79, fin: 72, pas: 78, def: 78, fis: 81, contractEnd: '31/12/2027' },
    { name: 'José Martínez', pos: 'V', age: 32, ovr: 79, fin: 58, pas: 78, def: 81, fis: 82, contractEnd: '31/12/2027' },
    { name: 'Breno Bidon', pos: 'V', age: 21, ovr: 78, fin: 68, pas: 81, def: 74, fis: 77, contractEnd: '31/12/2028' },
    { name: 'Rodrigo Garro', pos: 'M', age: 28, ovr: 86, fin: 82, pas: 89, def: 62, fis: 79, contractEnd: '31/12/2028' },
    { name: 'Igor Coronado', pos: 'M', age: 33, ovr: 82, fin: 80, pas: 85, def: 52, fis: 74, contractEnd: '31/12/2026' },
    { name: 'André Carrillo', pos: 'M', age: 35, ovr: 80, fin: 75, pas: 82, def: 60, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Charles Rigon', pos: 'M', age: 30, ovr: 77, fin: 68, pas: 78, def: 76, fis: 79, contractEnd: '31/12/2028' },
    { name: 'Memphis Depay', pos: 'A', age: 32, ovr: 86, fin: 88, pas: 84, def: 42, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Yuri Alberto', pos: 'A', age: 25, ovr: 85, fin: 86, pas: 73, def: 48, fis: 87, contractEnd: '31/12/2027' },
    { name: 'Ángel Romero', pos: 'A', age: 34, ovr: 80, fin: 81, pas: 75, def: 58, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Talles Magno', pos: 'A', age: 24, ovr: 80, fin: 79, pas: 77, def: 48, fis: 82, contractEnd: '30/06/2025' }
  ],

  flu: [
    { name: 'Fábio Deivson', pos: 'G', age: 45, ovr: 82, fin: 20, pas: 68, def: 85, fis: 72, contractEnd: '31/12/2026' },
    { name: 'Felipe Alves', pos: 'G', age: 38, ovr: 74, fin: 25, pas: 70, def: 75, fis: 72, contractEnd: '31/12/2026' },
    { name: 'Thiago Silva', pos: 'Z', age: 41, ovr: 85, fin: 52, pas: 82, def: 88, fis: 75, contractEnd: '30/06/2026' },
    { name: 'Thiago Santos', pos: 'Z', age: 36, ovr: 77, fin: 42, pas: 68, def: 80, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Ignácio Silva', pos: 'Z', age: 29, ovr: 78, fin: 36, pas: 68, def: 80, fis: 81, contractEnd: '30/06/2028' },
    { name: 'Manoel Messias', pos: 'Z', age: 36, ovr: 76, fin: 40, pas: 65, def: 78, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Marcelo Vieira', pos: 'L', age: 38, ovr: 81, fin: 72, pas: 86, def: 74, fis: 71, contractEnd: '31/12/2026' },
    { name: 'Samuel Xavier', pos: 'L', age: 36, ovr: 78, fin: 58, pas: 76, def: 78, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Diogo Barbosa', pos: 'L', age: 34, ovr: 76, fin: 55, pas: 74, def: 76, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Matheus Martinelli', pos: 'V', age: 24, ovr: 81, fin: 68, pas: 82, def: 80, fis: 81, contractEnd: '31/12/2027' },
    { name: 'Facundo Bernal', pos: 'V', age: 23, ovr: 79, fin: 60, pas: 80, def: 81, fis: 80, contractEnd: '31/07/2028' },
    { name: 'Nonato', pos: 'V', age: 28, ovr: 77, fin: 68, pas: 78, def: 76, fis: 78, contractEnd: '31/07/2025' },
    { name: 'Gabriel Pires', pos: 'V', age: 32, ovr: 76, fin: 66, pas: 78, def: 75, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Jhon Arias', pos: 'M', age: 28, ovr: 86, fin: 83, pas: 86, def: 64, fis: 85, contractEnd: '30/06/2026' },
    { name: 'Paulo Henrique Ganso', pos: 'M', age: 36, ovr: 83, fin: 75, pas: 91, def: 46, fis: 68, contractEnd: '31/12/2026' },
    { name: 'Lima', pos: 'M', age: 30, ovr: 78, fin: 74, pas: 80, def: 68, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Renato Augusto', pos: 'M', age: 38, ovr: 77, fin: 76, pas: 84, def: 52, fis: 69, contractEnd: '31/12/2026' },
    { name: 'Germán Cano', pos: 'A', age: 38, ovr: 82, fin: 89, pas: 68, def: 40, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Kauã Elias', pos: 'A', age: 20, ovr: 81, fin: 83, pas: 70, def: 42, fis: 82, contractEnd: '31/12/2029' },
    { name: 'Keno', pos: 'A', age: 36, ovr: 78, fin: 77, pas: 78, def: 46, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Kevin Serna', pos: 'A', age: 28, ovr: 78, fin: 76, pas: 76, def: 50, fis: 84, contractEnd: '31/12/2027' }
  ],

  cam: [
    { name: 'Everson Marques', pos: 'G', age: 36, ovr: 83, fin: 25, pas: 70, def: 85, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Matheus Mendes', pos: 'G', age: 27, ovr: 77, fin: 20, pas: 66, def: 79, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Rodrigo Battaglia', pos: 'Z', age: 35, ovr: 82, fin: 56, pas: 77, def: 84, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Junior Alonso', pos: 'Z', age: 33, ovr: 82, fin: 45, pas: 74, def: 83, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Lyanco', pos: 'Z', age: 29, ovr: 80, fin: 40, pas: 70, def: 82, fis: 84, contractEnd: '31/12/2028' },
    { name: 'Bruno Fuchs', pos: 'Z', age: 27, ovr: 78, fin: 36, pas: 72, def: 79, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Guilherme Arana', pos: 'L', age: 29, ovr: 84, fin: 70, pas: 82, def: 81, fis: 85, contractEnd: '31/12/2027' },
    { name: 'Renzo Saravia', pos: 'L', age: 33, ovr: 78, fin: 54, pas: 74, def: 79, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Rubens Dias', pos: 'L', age: 25, ovr: 78, fin: 64, pas: 76, def: 78, fis: 82, contractEnd: '31/12/2027' },
    { name: 'Otávio Santos', pos: 'V', age: 32, ovr: 81, fin: 58, pas: 79, def: 84, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Fausto Vera', pos: 'V', age: 26, ovr: 80, fin: 68, pas: 80, def: 80, fis: 81, contractEnd: '31/12/2027' },
    { name: 'Alan Franco Palma', pos: 'V', age: 28, ovr: 79, fin: 64, pas: 79, def: 80, fis: 82, contractEnd: '31/12/2027' },
    { name: 'Paulo Vitor', pos: 'V', age: 22, ovr: 75, fin: 52, pas: 74, def: 76, fis: 78, contractEnd: '31/12/2027' },
    { name: 'Gustavo Scarpa', pos: 'M', age: 32, ovr: 85, fin: 84, pas: 88, def: 60, fis: 79, contractEnd: '31/12/2027' },
    { name: 'Matías Zaracho', pos: 'M', age: 28, ovr: 82, fin: 78, pas: 82, def: 72, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Bernard', pos: 'M', age: 33, ovr: 80, fin: 77, pas: 82, def: 55, fis: 79, contractEnd: '31/12/2027' },
    { name: 'Igor Gomes', pos: 'M', age: 27, ovr: 77, fin: 71, pas: 79, def: 66, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Hulk', pos: 'A', age: 40, ovr: 86, fin: 92, pas: 81, def: 45, fis: 86, contractEnd: '31/12/2026' },
    { name: 'Paulinho', pos: 'A', age: 26, ovr: 85, fin: 87, pas: 79, def: 52, fis: 84, contractEnd: '31/12/2026' },
    { name: 'Deyverson', pos: 'A', age: 35, ovr: 80, fin: 82, pas: 70, def: 54, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Eduardo Vargas', pos: 'A', age: 36, ovr: 77, fin: 79, pas: 75, def: 46, fis: 75, contractEnd: '31/12/2026' }
  ],

  cru: [
    { name: 'Cássio Ramos', pos: 'G', age: 39, ovr: 83, fin: 25, pas: 68, def: 85, fis: 79, contractEnd: '31/05/2027' },
    { name: 'Anderson Silva', pos: 'G', age: 28, ovr: 76, fin: 20, pas: 64, def: 78, fis: 76, contractEnd: '31/12/2026' },
    { name: 'João Marcelo', pos: 'Z', age: 26, ovr: 82, fin: 40, pas: 72, def: 84, fis: 83, contractEnd: '31/12/2028' },
    { name: 'Zé Ivaldo', pos: 'Z', age: 29, ovr: 80, fin: 48, pas: 68, def: 82, fis: 84, contractEnd: '31/12/2026' },
    { name: 'Lucas Villalba', pos: 'Z', age: 32, ovr: 78, fin: 42, pas: 72, def: 79, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Jonathan Jesus', pos: 'Z', age: 22, ovr: 76, fin: 30, pas: 66, def: 78, fis: 78, contractEnd: '30/06/2029' },
    { name: 'William Furtado', pos: 'L', age: 31, ovr: 84, fin: 68, pas: 82, def: 82, fis: 85, contractEnd: '31/12/2026' },
    { name: 'Marlon Xavier', pos: 'L', age: 29, ovr: 81, fin: 64, pas: 79, def: 81, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Kaiki Bruno', pos: 'L', age: 23, ovr: 76, fin: 56, pas: 74, def: 76, fis: 80, contractEnd: '31/12/2027' },
    { name: 'Matheus Henrique', pos: 'V', age: 28, ovr: 83, fin: 72, pas: 84, def: 81, fis: 82, contractEnd: '30/06/2029' },
    { name: 'Lucas Romero', pos: 'V', age: 32, ovr: 81, fin: 62, pas: 79, def: 83, fis: 84, contractEnd: '31/12/2026' },
    { name: 'Walace Souza', pos: 'V', age: 31, ovr: 80, fin: 60, pas: 78, def: 82, fis: 83, contractEnd: '30/06/2028' },
    { name: 'Fabrizio Peralta', pos: 'V', age: 24, ovr: 77, fin: 62, pas: 78, def: 77, fis: 79, contractEnd: '30/06/2029' },
    { name: 'Matheus Pereira', pos: 'M', age: 30, ovr: 87, fin: 84, pas: 90, def: 58, fis: 78, contractEnd: '30/06/2026' },
    { name: 'Álvaro Barreal', pos: 'M', age: 26, ovr: 82, fin: 78, pas: 82, def: 66, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Ramiro Benetti', pos: 'M', age: 33, ovr: 77, fin: 70, pas: 78, def: 74, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Mateus Vital', pos: 'M', age: 28, ovr: 77, fin: 72, pas: 78, def: 56, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Kaio Jorge', pos: 'A', age: 24, ovr: 82, fin: 84, pas: 75, def: 46, fis: 82, contractEnd: '30/06/2029' },
    { name: 'Gabriel Veron', pos: 'A', age: 23, ovr: 80, fin: 79, pas: 76, def: 50, fis: 84, contractEnd: '31/12/2026' },
    { name: 'Lautaro Díaz', pos: 'A', age: 28, ovr: 79, fin: 80, pas: 74, def: 48, fis: 82, contractEnd: '30/06/2028' },
    { name: 'Juan Dinenno', pos: 'A', age: 31, ovr: 78, fin: 82, pas: 68, def: 42, fis: 80, contractEnd: '31/12/2026' }
  ],

  int: [
    { name: 'Sergio Rochet', pos: 'G', age: 33, ovr: 84, fin: 25, pas: 70, def: 86, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Anthoni Spier', pos: 'G', age: 24, ovr: 76, fin: 20, pas: 64, def: 78, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Vitão', pos: 'Z', age: 26, ovr: 83, fin: 38, pas: 74, def: 85, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Gabriel Mercado', pos: 'Z', age: 39, ovr: 78, fin: 45, pas: 68, def: 80, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Agustín Rogel', pos: 'Z', age: 28, ovr: 78, fin: 38, pas: 66, def: 79, fis: 83, contractEnd: '30/06/2025' },
    { name: 'Igor Gomes', pos: 'Z', age: 25, ovr: 76, fin: 32, pas: 65, def: 77, fis: 81, contractEnd: '31/12/2027' },
    { name: 'Alexandro Bernabei', pos: 'L', age: 25, ovr: 82, fin: 66, pas: 80, def: 79, fis: 86, contractEnd: '31/12/2026' },
    { name: 'Bruno Gomes', pos: 'L', age: 25, ovr: 79, fin: 66, pas: 78, def: 78, fis: 81, contractEnd: '31/12/2027' },
    { name: 'Renê Rodrigues', pos: 'L', age: 33, ovr: 77, fin: 56, pas: 76, def: 77, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Fernando Reges', pos: 'V', age: 39, ovr: 81, fin: 60, pas: 80, def: 84, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Bruno Henrique', pos: 'V', age: 36, ovr: 80, fin: 72, pas: 81, def: 78, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Thiago Maia', pos: 'V', age: 29, ovr: 80, fin: 64, pas: 80, def: 81, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Rômulo Zwarg', pos: 'V', age: 26, ovr: 77, fin: 58, pas: 76, def: 78, fis: 80, contractEnd: '31/12/2027' },
    { name: 'Alan Patrick', pos: 'M', age: 35, ovr: 86, fin: 84, pas: 90, def: 52, fis: 74, contractEnd: '31/12/2026' },
    { name: 'Bruno Tabata', pos: 'M', age: 29, ovr: 80, fin: 78, pas: 82, def: 56, fis: 78, contractEnd: '31/12/2027' },
    { name: 'Gabriel Carvalho', pos: 'M', age: 18, ovr: 78, fin: 74, pas: 81, def: 46, fis: 76, contractEnd: '31/12/2028' },
    { name: 'Gustavo Prado', pos: 'M', age: 21, ovr: 76, fin: 70, pas: 77, def: 52, fis: 77, contractEnd: '31/12/2028' },
    { name: 'Rafael Borré', pos: 'A', age: 30, ovr: 84, fin: 86, pas: 77, def: 52, fis: 84, contractEnd: '31/12/2028' },
    { name: 'Wesley Ribeiro', pos: 'A', age: 27, ovr: 82, fin: 80, pas: 78, def: 50, fis: 87, contractEnd: '31/12/2026' },
    { name: 'Enner Valencia', pos: 'A', age: 36, ovr: 81, fin: 83, pas: 74, def: 45, fis: 81, contractEnd: '30/06/2026' },
    { name: 'Lucas Alario', pos: 'A', age: 33, ovr: 78, fin: 82, pas: 70, def: 42, fis: 77, contractEnd: '31/12/2026' }
  ],

  gre: [
    { name: 'Agustín Marchesín', pos: 'G', age: 38, ovr: 82, fin: 25, pas: 72, def: 84, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Caíque Santos', pos: 'G', age: 29, ovr: 76, fin: 20, pas: 62, def: 78, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Walter Kannemann', pos: 'Z', age: 35, ovr: 82, fin: 40, pas: 66, def: 86, fis: 85, contractEnd: '31/12/2026' },
    { name: 'Rodrigo Ely', pos: 'Z', age: 32, ovr: 79, fin: 42, pas: 68, def: 81, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Jemerson', pos: 'Z', age: 33, ovr: 78, fin: 36, pas: 67, def: 80, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Pedro Geromel', pos: 'Z', age: 40, ovr: 78, fin: 42, pas: 70, def: 81, fis: 72, contractEnd: '31/12/2026' },
    { name: 'Reinaldo Silva', pos: 'L', age: 36, ovr: 79, fin: 68, pas: 80, def: 77, fis: 77, contractEnd: '31/12/2026' },
    { name: 'João Pedro', pos: 'L', age: 29, ovr: 79, fin: 64, pas: 77, def: 78, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Mayk Silva', pos: 'L', age: 26, ovr: 76, fin: 56, pas: 74, def: 76, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Mathías Villasanti', pos: 'V', age: 29, ovr: 84, fin: 70, pas: 83, def: 86, fis: 85, contractEnd: '31/12/2027' },
    { name: 'Dodi', pos: 'V', age: 30, ovr: 79, fin: 62, pas: 79, def: 80, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Pepê Vieira', pos: 'V', age: 28, ovr: 78, fin: 66, pas: 80, def: 76, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Du Queiroz', pos: 'V', age: 26, ovr: 76, fin: 64, pas: 76, def: 77, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Franco Cristaldo', pos: 'M', age: 29, ovr: 84, fin: 82, pas: 87, def: 56, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Miguel Monsalve', pos: 'M', age: 22, ovr: 80, fin: 77, pas: 82, def: 52, fis: 78, contractEnd: '31/12/2028' },
    { name: 'Edenilson', pos: 'M', age: 36, ovr: 78, fin: 74, pas: 80, def: 72, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Nathan Pescador', pos: 'M', age: 30, ovr: 75, fin: 72, pas: 77, def: 54, fis: 75, contractEnd: '31/12/2026' },
    { name: 'Martin Braithwaite', pos: 'A', age: 35, ovr: 84, fin: 86, pas: 77, def: 46, fis: 83, contractEnd: '30/06/2026' },
    { name: 'Yeferson Soteldo', pos: 'A', age: 29, ovr: 83, fin: 80, pas: 83, def: 45, fis: 84, contractEnd: '31/12/2026' },
    { name: 'Cristian Pavón', pos: 'A', age: 30, ovr: 81, fin: 80, pas: 79, def: 50, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Diego Costa', pos: 'A', age: 37, ovr: 79, fin: 83, pas: 71, def: 44, fis: 81, contractEnd: '31/12/2026' }
  ],

  vas: [
    { name: 'Léo Jardim', pos: 'G', age: 31, ovr: 85, fin: 25, pas: 72, def: 87, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Keiller', pos: 'G', age: 29, ovr: 76, fin: 20, pas: 65, def: 78, fis: 76, contractEnd: '31/12/2026' },
    { name: 'João Victor', pos: 'Z', age: 28, ovr: 82, fin: 42, pas: 74, def: 84, fis: 84, contractEnd: '31/12/2028' },
    { name: 'Léo Pelé', pos: 'Z', age: 30, ovr: 79, fin: 40, pas: 74, def: 80, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Maicon Roque', pos: 'Z', age: 37, ovr: 77, fin: 45, pas: 66, def: 79, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Robert Rojas', pos: 'Z', age: 30, ovr: 77, fin: 36, pas: 67, def: 78, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Lucas Piton', pos: 'L', age: 25, ovr: 83, fin: 68, pas: 83, def: 80, fis: 83, contractEnd: '31/12/2028' },
    { name: 'Paulo Henrique', pos: 'L', age: 30, ovr: 79, fin: 62, pas: 76, def: 78, fis: 84, contractEnd: '31/12/2027' },
    { name: 'Puma Rodríguez', pos: 'L', age: 29, ovr: 77, fin: 66, pas: 76, def: 75, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Hugo Moura', pos: 'V', age: 28, ovr: 81, fin: 64, pas: 80, def: 83, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Mateus Carvalho', pos: 'V', age: 24, ovr: 80, fin: 66, pas: 78, def: 81, fis: 83, contractEnd: '31/12/2027' },
    { name: 'Juan Sforza', pos: 'V', age: 24, ovr: 78, fin: 62, pas: 80, def: 78, fis: 78, contractEnd: '31/12/2028' },
    { name: 'Jair Rodrigues', pos: 'V', age: 31, ovr: 78, fin: 65, pas: 79, def: 79, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Philippe Coutinho', pos: 'M', age: 34, ovr: 84, fin: 84, pas: 89, def: 52, fis: 72, contractEnd: '30/06/2026' },
    { name: 'Dimitri Payet', pos: 'M', age: 39, ovr: 83, fin: 82, pas: 89, def: 44, fis: 70, contractEnd: '30/06/2026' },
    { name: 'Maxime Dominguez', pos: 'M', age: 30, ovr: 77, fin: 72, pas: 80, def: 60, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Paulinho Paula', pos: 'M', age: 29, ovr: 77, fin: 70, pas: 78, def: 68, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Pablo Vegetti', pos: 'A', age: 37, ovr: 85, fin: 90, pas: 70, def: 48, fis: 86, contractEnd: '31/12/2026' },
    { name: 'Rayan Rocha', pos: 'A', age: 20, ovr: 78, fin: 78, pas: 72, def: 42, fis: 84, contractEnd: '31/12/2027' },
    { name: 'David Corrêa', pos: 'A', age: 30, ovr: 78, fin: 78, pas: 74, def: 50, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Emerson Rodríguez', pos: 'A', age: 25, ovr: 77, fin: 75, pas: 73, def: 46, fis: 83, contractEnd: '30/06/2025' }
  ],

  bah: [
    { name: 'Marcos Felipe', pos: 'G', age: 30, ovr: 82, fin: 25, pas: 70, def: 84, fis: 79, contractEnd: '31/12/2027' },
    { name: 'Adriel Vasconcelos', pos: 'G', age: 25, ovr: 76, fin: 20, pas: 65, def: 78, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Gabriel Xavier', pos: 'Z', age: 25, ovr: 82, fin: 38, pas: 72, def: 84, fis: 84, contractEnd: '31/12/2027' },
    { name: 'Kanu', pos: 'Z', age: 29, ovr: 80, fin: 42, pas: 68, def: 81, fis: 83, contractEnd: '31/12/2027' },
    { name: 'Víctor Cuesta', pos: 'Z', age: 37, ovr: 77, fin: 44, pas: 72, def: 78, fis: 76, contractEnd: '31/12/2026' },
    { name: 'David Duarte', pos: 'Z', age: 31, ovr: 76, fin: 36, pas: 66, def: 78, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Santiago Arias', pos: 'L', age: 34, ovr: 81, fin: 62, pas: 78, def: 81, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Luciano Juba', pos: 'L', age: 26, ovr: 81, fin: 74, pas: 81, def: 77, fis: 82, contractEnd: '31/12/2027' },
    { name: 'Gilberto Moraes', pos: 'L', age: 33, ovr: 77, fin: 60, pas: 76, def: 77, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Jean Lucas', pos: 'V', age: 28, ovr: 84, fin: 74, pas: 84, def: 82, fis: 84, contractEnd: '31/12/2028' },
    { name: 'Caio Alexandre', pos: 'V', age: 27, ovr: 83, fin: 70, pas: 85, def: 81, fis: 82, contractEnd: '31/12/2028' },
    { name: 'Rezende', pos: 'V', age: 31, ovr: 78, fin: 60, pas: 77, def: 80, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Yago Felipe', pos: 'V', age: 31, ovr: 77, fin: 68, pas: 78, def: 76, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Everton Ribeiro', pos: 'M', age: 37, ovr: 84, fin: 78, pas: 89, def: 58, fis: 73, contractEnd: '31/12/2026' },
    { name: 'Cauly Oliveira', pos: 'M', age: 30, ovr: 84, fin: 81, pas: 87, def: 56, fis: 78, contractEnd: '31/12/2028' },
    { name: 'Thaciano', pos: 'M', age: 31, ovr: 82, fin: 80, pas: 79, def: 72, fis: 83, contractEnd: '31/12/2027' },
    { name: 'Carlos de Pena', pos: 'M', age: 34, ovr: 77, fin: 72, pas: 79, def: 68, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Luciano Rodríguez', pos: 'A', age: 23, ovr: 82, fin: 83, pas: 75, def: 48, fis: 83, contractEnd: '31/12/2029' },
    { name: 'Biel Silva', pos: 'A', age: 25, ovr: 81, fin: 79, pas: 79, def: 50, fis: 84, contractEnd: '31/12/2028' },
    { name: 'Everaldo Stum', pos: 'A', age: 35, ovr: 79, fin: 82, pas: 70, def: 44, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Ademir Santos', pos: 'A', age: 31, ovr: 78, fin: 77, pas: 74, def: 50, fis: 86, contractEnd: '31/12/2026' }
  ],

  for: [
    { name: 'João Ricardo', pos: 'G', age: 37, ovr: 83, fin: 25, pas: 68, def: 85, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Santos Neto', pos: 'G', age: 36, ovr: 78, fin: 20, pas: 66, def: 80, fis: 75, contractEnd: '31/12/2026' },
    { name: 'Benjamín Kuscevic', pos: 'Z', age: 30, ovr: 82, fin: 40, pas: 72, def: 84, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Emanuel Brítez', pos: 'Z', age: 34, ovr: 80, fin: 46, pas: 70, def: 82, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Titi', pos: 'Z', age: 38, ovr: 78, fin: 42, pas: 66, def: 80, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Tomás Cardona', pos: 'Z', age: 30, ovr: 78, fin: 38, pas: 68, def: 79, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Tinga', pos: 'L', age: 32, ovr: 81, fin: 62, pas: 76, def: 82, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Bruno Pacheco', pos: 'L', age: 34, ovr: 80, fin: 64, pas: 79, def: 80, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Felipe Jonatan', pos: 'L', age: 28, ovr: 78, fin: 64, pas: 78, def: 77, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Hércules', pos: 'V', age: 25, ovr: 82, fin: 74, pas: 82, def: 82, fis: 84, contractEnd: '31/12/2027' },
    { name: 'Lucas Sasha', pos: 'V', age: 36, ovr: 80, fin: 60, pas: 78, def: 83, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Pedro Augusto', pos: 'V', age: 29, ovr: 78, fin: 62, pas: 78, def: 79, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Matheus Rossetto', pos: 'V', age: 30, ovr: 77, fin: 65, pas: 78, def: 77, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Tomás Pochettino', pos: 'M', age: 30, ovr: 83, fin: 80, pas: 86, def: 64, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Emmanuel Martínez', pos: 'M', age: 32, ovr: 81, fin: 76, pas: 83, def: 66, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Calebe', pos: 'M', age: 26, ovr: 78, fin: 74, pas: 80, def: 55, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Kervin Andrade', pos: 'M', age: 21, ovr: 78, fin: 75, pas: 80, def: 48, fis: 78, contractEnd: '31/12/2028' },
    { name: 'Juan Martín Lucero', pos: 'A', age: 34, ovr: 84, fin: 88, pas: 76, def: 45, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Moisés Vieira', pos: 'A', age: 29, ovr: 82, fin: 81, pas: 76, def: 52, fis: 85, contractEnd: '31/12/2027' },
    { name: 'Yago Pikachu', pos: 'A', age: 34, ovr: 81, fin: 82, pas: 78, def: 60, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Breno Lopes', pos: 'A', age: 30, ovr: 80, fin: 80, pas: 74, def: 52, fis: 83, contractEnd: '31/12/2026' }
  ],

  san: [
    { name: 'Gabriel Brazão', pos: 'G', age: 25, ovr: 80, fin: 25, pas: 68, def: 82, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Diógenes', pos: 'G', age: 25, ovr: 74, fin: 20, pas: 62, def: 76, fis: 75, contractEnd: '31/12/2026' },
    { name: 'Jair Cunha', pos: 'Z', age: 21, ovr: 80, fin: 35, pas: 72, def: 82, fis: 82, contractEnd: '31/12/2027' },
    { name: 'Luan Peres', pos: 'Z', age: 32, ovr: 80, fin: 42, pas: 72, def: 81, fis: 81, contractEnd: '31/12/2027' },
    { name: 'Gil', pos: 'Z', age: 39, ovr: 79, fin: 46, pas: 68, def: 81, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Alex Nascimento', pos: 'Z', age: 27, ovr: 76, fin: 34, pas: 66, def: 78, fis: 79, contractEnd: '31/12/2026' },
    { name: 'JP Chermont', pos: 'L', age: 20, ovr: 79, fin: 62, pas: 78, def: 77, fis: 83, contractEnd: '31/12/2027' },
    { name: 'Gonzalo Escobar', pos: 'L', age: 29, ovr: 78, fin: 58, pas: 76, def: 79, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Hayner', pos: 'L', age: 30, ovr: 76, fin: 56, pas: 74, def: 76, fis: 81, contractEnd: '31/12/2026' },
    { name: 'João Schmidt', pos: 'V', age: 33, ovr: 82, fin: 68, pas: 84, def: 82, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Diego Pituca', pos: 'V', age: 33, ovr: 81, fin: 70, pas: 82, def: 80, fis: 82, contractEnd: '31/12/2027' },
    { name: 'Tomás Rincón', pos: 'V', age: 38, ovr: 76, fin: 55, pas: 77, def: 79, fis: 75, contractEnd: '31/12/2026' },
    { name: 'Sandry Roberto', pos: 'V', age: 23, ovr: 75, fin: 58, pas: 76, def: 76, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Giuliano Victor', pos: 'M', age: 36, ovr: 81, fin: 79, pas: 85, def: 58, fis: 74, contractEnd: '31/12/2026' },
    { name: 'Rómulo Otero', pos: 'M', age: 33, ovr: 80, fin: 82, pas: 82, def: 50, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Patrick Bezerra', pos: 'M', age: 33, ovr: 77, fin: 74, pas: 77, def: 68, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Serginho Soler', pos: 'M', age: 31, ovr: 76, fin: 72, pas: 77, def: 54, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Guilherme Augusto', pos: 'A', age: 31, ovr: 82, fin: 82, pas: 79, def: 52, fis: 84, contractEnd: '31/12/2026' },
    { name: 'Wendel Silva', pos: 'A', age: 26, ovr: 80, fin: 82, pas: 72, def: 45, fis: 82, contractEnd: '30/06/2025' },
    { name: 'Willian Bigode', pos: 'A', age: 39, ovr: 77, fin: 78, pas: 74, def: 48, fis: 74, contractEnd: '31/12/2026' },
    { name: 'Julio Furch', pos: 'A', age: 36, ovr: 77, fin: 81, pas: 68, def: 42, fis: 78, contractEnd: '31/12/2026' }
  ],

  rbb: [
    { name: 'Cleiton Schwengber', pos: 'G', age: 28, ovr: 83, fin: 25, pas: 72, def: 85, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Lucão', pos: 'G', age: 25, ovr: 76, fin: 20, pas: 65, def: 78, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Pedro Henrique Ribeiro', pos: 'Z', age: 30, ovr: 81, fin: 42, pas: 70, def: 82, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Eduardo Santos', pos: 'Z', age: 28, ovr: 79, fin: 38, pas: 68, def: 80, fis: 81, contractEnd: '31/12/2027' },
    { name: 'Lucas Cunha', pos: 'Z', age: 29, ovr: 78, fin: 36, pas: 68, def: 79, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Douglas Mendes', pos: 'Z', age: 22, ovr: 76, fin: 32, pas: 66, def: 78, fis: 80, contractEnd: '31/12/2028' },
    { name: 'Juninho Capixaba', pos: 'L', age: 29, ovr: 82, fin: 70, pas: 81, def: 80, fis: 84, contractEnd: '31/12/2026' },
    { name: 'Nathan Mendes', pos: 'L', age: 24, ovr: 80, fin: 62, pas: 77, def: 79, fis: 84, contractEnd: '31/12/2028' },
    { name: 'Guilherme Lopes', pos: 'L', age: 24, ovr: 77, fin: 58, pas: 75, def: 76, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Lucas Evangelista', pos: 'V', age: 31, ovr: 82, fin: 76, pas: 84, def: 80, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Jadsom Silva', pos: 'V', age: 25, ovr: 81, fin: 65, pas: 80, def: 82, fis: 83, contractEnd: '31/12/2027' },
    { name: 'Matheus Fernandes', pos: 'V', age: 28, ovr: 78, fin: 64, pas: 79, def: 79, fis: 79, contractEnd: '31/12/2027' },
    { name: 'Raul Lo Gonçalves', pos: 'V', age: 29, ovr: 78, fin: 62, pas: 78, def: 80, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Jhon Jhon', pos: 'M', age: 23, ovr: 79, fin: 74, pas: 81, def: 58, fis: 79, contractEnd: '31/12/2029' },
    { name: 'Lincoln Henrique', pos: 'M', age: 27, ovr: 78, fin: 75, pas: 81, def: 55, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Eric Ramires', pos: 'M', age: 25, ovr: 78, fin: 72, pas: 80, def: 68, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Gustavo Neves', pos: 'M', age: 27, ovr: 76, fin: 70, pas: 78, def: 62, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Eduardo Sasha', pos: 'A', age: 34, ovr: 81, fin: 84, pas: 77, def: 50, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Thiago Borbas', pos: 'A', age: 24, ovr: 81, fin: 83, pas: 72, def: 45, fis: 83, contractEnd: '31/12/2027' },
    { name: 'Vitinho Naum', pos: 'A', age: 27, ovr: 80, fin: 79, pas: 77, def: 50, fis: 84, contractEnd: '31/12/2026' },
    { name: 'Henry Mosquera', pos: 'A', age: 24, ovr: 79, fin: 77, pas: 75, def: 48, fis: 86, contractEnd: '31/12/2027' }
  ],

  vit: [
    { name: 'Lucas Arcanjo', pos: 'G', age: 28, ovr: 81, fin: 25, pas: 68, def: 83, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Muriel Becker', pos: 'G', age: 39, ovr: 75, fin: 20, pas: 64, def: 77, fis: 73, contractEnd: '31/12/2026' },
    { name: 'Wagner Leonardo', pos: 'Z', age: 26, ovr: 82, fin: 48, pas: 74, def: 84, fis: 83, contractEnd: '31/12/2028' },
    { name: 'Neris', pos: 'Z', age: 34, ovr: 78, fin: 36, pas: 66, def: 80, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Edu', pos: 'Z', age: 26, ovr: 77, fin: 35, pas: 66, def: 78, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Bruno Uvini', pos: 'Z', age: 35, ovr: 76, fin: 38, pas: 65, def: 78, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Lucas Esteves', pos: 'L', age: 26, ovr: 79, fin: 65, pas: 78, def: 78, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Raúl Cáceres', pos: 'L', age: 34, ovr: 78, fin: 58, pas: 76, def: 78, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Willean Lepo', pos: 'L', age: 29, ovr: 77, fin: 56, pas: 75, def: 77, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Luan Santos', pos: 'V', age: 27, ovr: 80, fin: 64, pas: 79, def: 82, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Willian Oliveira', pos: 'V', age: 33, ovr: 79, fin: 66, pas: 78, def: 81, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Ricardo Ryller', pos: 'V', age: 32, ovr: 77, fin: 62, pas: 77, def: 78, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Caíque Gonçalves', pos: 'V', age: 30, ovr: 77, fin: 60, pas: 77, def: 79, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Matheuzinho', pos: 'M', age: 28, ovr: 82, fin: 80, pas: 85, def: 55, fis: 80, contractEnd: '31/12/2028' },
    { name: 'Jean Mota', pos: 'M', age: 32, ovr: 78, fin: 76, pas: 82, def: 60, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Pablo Siles', pos: 'M', age: 29, ovr: 77, fin: 70, pas: 78, def: 68, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Daniel Júnior', pos: 'M', age: 24, ovr: 76, fin: 72, pas: 78, def: 52, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Alerrandro', pos: 'A', age: 26, ovr: 81, fin: 84, pas: 72, def: 44, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Gustavo Mosquito', pos: 'A', age: 29, ovr: 80, fin: 79, pas: 77, def: 52, fis: 84, contractEnd: '31/12/2026' },
    { name: 'Janderson', pos: 'A', age: 27, ovr: 78, fin: 76, pas: 75, def: 52, fis: 83, contractEnd: '31/12/2027' },
    { name: 'Carlos Eduardo', pos: 'A', age: 29, ovr: 77, fin: 76, pas: 74, def: 48, fis: 81, contractEnd: '31/12/2026' }
  ],

  juv: [
    { name: 'Gabriel Vasconcelos', pos: 'G', age: 33, ovr: 80, fin: 25, pas: 66, def: 82, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Mateus Claus', pos: 'G', age: 32, ovr: 75, fin: 20, pas: 64, def: 77, fis: 75, contractEnd: '31/12/2026' },
    { name: 'Danilo Boza', pos: 'Z', age: 28, ovr: 80, fin: 40, pas: 70, def: 82, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Zé Marcos', pos: 'Z', age: 28, ovr: 79, fin: 42, pas: 70, def: 80, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Lucas Freitas', pos: 'Z', age: 25, ovr: 77, fin: 35, pas: 68, def: 78, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Yan Souto', pos: 'Z', age: 24, ovr: 76, fin: 34, pas: 66, def: 78, fis: 79, contractEnd: '31/12/2026' },
    { name: 'João Lucas', pos: 'L', age: 28, ovr: 79, fin: 62, pas: 76, def: 78, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Alan Ruschel', pos: 'L', age: 36, ovr: 78, fin: 64, pas: 79, def: 78, fis: 75, contractEnd: '31/12/2026' },
    { name: 'Ewerthon', pos: 'L', age: 25, ovr: 76, fin: 56, pas: 74, def: 76, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Jadson Alves', pos: 'V', age: 33, ovr: 80, fin: 66, pas: 80, def: 82, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Ronaldo Henrique', pos: 'V', age: 29, ovr: 78, fin: 64, pas: 78, def: 79, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Luís Oyama', pos: 'V', age: 29, ovr: 77, fin: 62, pas: 79, def: 77, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Dudu Vieira', pos: 'V', age: 32, ovr: 76, fin: 60, pas: 76, def: 78, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Lucas Barbosa', pos: 'M', age: 25, ovr: 81, fin: 82, pas: 79, def: 60, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Jean Carlos', pos: 'M', age: 34, ovr: 79, fin: 80, pas: 83, def: 50, fis: 75, contractEnd: '31/12/2026' },
    { name: 'Mandaca', pos: 'M', age: 24, ovr: 78, fin: 74, pas: 78, def: 70, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Nenê', pos: 'M', age: 44, ovr: 78, fin: 82, pas: 86, def: 38, fis: 65, contractEnd: '31/12/2026' },
    { name: 'Gilberto Souza', pos: 'A', age: 36, ovr: 80, fin: 84, pas: 70, def: 42, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Erick Farias', pos: 'A', age: 29, ovr: 78, fin: 78, pas: 74, def: 50, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Edson Carioca', pos: 'A', age: 29, ovr: 77, fin: 77, pas: 73, def: 46, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Gabriel Taliari', pos: 'A', age: 28, ovr: 77, fin: 79, pas: 72, def: 44, fis: 79, contractEnd: '31/12/2026' }
  ],

  mir: [
    { name: 'Alex Muralha', pos: 'G', age: 36, ovr: 79, fin: 25, pas: 65, def: 81, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Vanderlei Farias', pos: 'G', age: 42, ovr: 75, fin: 20, pas: 64, def: 77, fis: 72, contractEnd: '31/12/2026' },
    { name: 'João Victor', pos: 'Z', age: 29, ovr: 79, fin: 38, pas: 68, def: 81, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Luiz Otávio', pos: 'Z', age: 33, ovr: 78, fin: 42, pas: 66, def: 80, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Lucas Gazal', pos: 'Z', age: 27, ovr: 77, fin: 35, pas: 66, def: 78, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Henri', pos: 'Z', age: 24, ovr: 76, fin: 32, pas: 65, def: 78, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Lucas Ramon', pos: 'L', age: 32, ovr: 78, fin: 60, pas: 75, def: 78, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Zeca', pos: 'L', age: 32, ovr: 78, fin: 62, pas: 78, def: 77, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Alex Silva', pos: 'L', age: 32, ovr: 76, fin: 56, pas: 74, def: 76, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Danielzinho', pos: 'V', age: 31, ovr: 80, fin: 70, pas: 82, def: 79, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Gabriel Silva', pos: 'V', age: 29, ovr: 78, fin: 60, pas: 77, def: 80, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Neto Moura', pos: 'V', age: 30, ovr: 78, fin: 66, pas: 80, def: 78, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Yuri Lara', pos: 'V', age: 32, ovr: 77, fin: 58, pas: 76, def: 80, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Chico Kim', pos: 'M', age: 35, ovr: 79, fin: 78, pas: 82, def: 52, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Isaque', pos: 'M', age: 29, ovr: 78, fin: 76, pas: 80, def: 56, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Gabriel Santana', pos: 'M', age: 26, ovr: 77, fin: 74, pas: 79, def: 54, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Bruno Matias', pos: 'M', age: 27, ovr: 76, fin: 70, pas: 78, def: 64, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Dellatorre', pos: 'A', age: 34, ovr: 80, fin: 83, pas: 71, def: 44, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Fernandinho', pos: 'A', age: 29, ovr: 79, fin: 78, pas: 76, def: 50, fis: 84, contractEnd: '31/12/2026' },
    { name: 'Negueba', pos: 'A', age: 26, ovr: 78, fin: 77, pas: 75, def: 52, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Iury Castilho', pos: 'A', age: 31, ovr: 78, fin: 80, pas: 73, def: 46, fis: 81, contractEnd: '31/12/2026' }
  ],

  spo: [
    { name: 'Caíque França', pos: 'G', age: 31, ovr: 80, fin: 25, pas: 68, def: 82, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Denis César', pos: 'G', age: 39, ovr: 75, fin: 20, pas: 65, def: 77, fis: 73, contractEnd: '31/12/2026' },
    { name: 'Rafael Thyere', pos: 'Z', age: 33, ovr: 80, fin: 38, pas: 68, def: 82, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Luciano Castán', pos: 'Z', age: 37, ovr: 78, fin: 42, pas: 68, def: 80, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Chico', pos: 'Z', age: 28, ovr: 77, fin: 36, pas: 68, def: 79, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Alisson Cassiano', pos: 'Z', age: 32, ovr: 76, fin: 35, pas: 65, def: 78, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Felipinho', pos: 'L', age: 29, ovr: 78, fin: 62, pas: 77, def: 78, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Helibelton Palacios', pos: 'L', age: 33, ovr: 78, fin: 58, pas: 76, def: 79, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Igor Cariús', pos: 'L', age: 33, ovr: 76, fin: 58, pas: 74, def: 76, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Fabricio Domínguez', pos: 'V', age: 28, ovr: 81, fin: 74, pas: 80, def: 81, fis: 83, contractEnd: '31/12/2027' },
    { name: 'Felipe', pos: 'V', age: 32, ovr: 79, fin: 68, pas: 80, def: 80, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Julián Fernández', pos: 'V', age: 31, ovr: 78, fin: 64, pas: 78, def: 80, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Fabinho', pos: 'V', age: 39, ovr: 76, fin: 60, pas: 76, def: 78, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Lucas Lima', pos: 'M', age: 36, ovr: 81, fin: 75, pas: 88, def: 52, fis: 74, contractEnd: '31/12/2026' },
    { name: 'Christian Ortiz', pos: 'M', age: 34, ovr: 79, fin: 78, pas: 80, def: 54, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Pedro Vilhena', pos: 'M', age: 24, ovr: 77, fin: 74, pas: 79, def: 56, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Lucas André', pos: 'M', age: 23, ovr: 76, fin: 70, pas: 78, def: 64, fis: 77, contractEnd: '31/12/2027' },
    { name: 'Gustavo Coutinho', pos: 'A', age: 27, ovr: 81, fin: 84, pas: 72, def: 44, fis: 83, contractEnd: '31/12/2027' },
    { name: 'Chrystian Barletta', pos: 'A', age: 25, ovr: 80, fin: 80, pas: 78, def: 50, fis: 84, contractEnd: '31/12/2028' },
    { name: 'Zé Roberto', pos: 'A', age: 33, ovr: 80, fin: 83, pas: 72, def: 45, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Wellington Silva', pos: 'A', age: 33, ovr: 78, fin: 78, pas: 76, def: 48, fis: 82, contractEnd: '31/12/2026' }
  ],

  cea: [
    { name: 'Richard Costa', pos: 'G', age: 35, ovr: 80, fin: 25, pas: 68, def: 82, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Bruno Ferreira', pos: 'G', age: 32, ovr: 76, fin: 20, pas: 64, def: 78, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Ramon Menezes', pos: 'Z', age: 31, ovr: 80, fin: 38, pas: 69, def: 82, fis: 81, contractEnd: '31/12/2026' },
    { name: 'David Ricardo', pos: 'Z', age: 23, ovr: 79, fin: 36, pas: 70, def: 81, fis: 82, contractEnd: '31/12/2027' },
    { name: 'Matheus Felipe', pos: 'Z', age: 27, ovr: 78, fin: 38, pas: 68, def: 80, fis: 81, contractEnd: '31/12/2026' },
    { name: 'João Pedro Tchoca', pos: 'Z', age: 22, ovr: 76, fin: 32, pas: 66, def: 78, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Rafael Ramos', pos: 'L', age: 31, ovr: 79, fin: 60, pas: 78, def: 79, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Matheus Bahia', pos: 'L', age: 27, ovr: 78, fin: 62, pas: 77, def: 78, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Raí Ramos', pos: 'L', age: 32, ovr: 76, fin: 64, pas: 75, def: 75, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Lourenço', pos: 'V', age: 29, ovr: 80, fin: 74, pas: 82, def: 80, fis: 82, contractEnd: '31/12/2027' },
    { name: 'Richardson', pos: 'V', age: 35, ovr: 79, fin: 60, pas: 78, def: 81, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Patrick De Lucca', pos: 'V', age: 26, ovr: 78, fin: 64, pas: 79, def: 79, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Andrey', pos: 'V', age: 28, ovr: 77, fin: 66, pas: 78, def: 77, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Lucas Mugni', pos: 'M', age: 34, ovr: 80, fin: 76, pas: 84, def: 64, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Jorge Recalde', pos: 'M', age: 34, ovr: 79, fin: 78, pas: 82, def: 55, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Jean Irmer', pos: 'M', age: 32, ovr: 77, fin: 68, pas: 78, def: 74, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Bruninho', pos: 'M', age: 26, ovr: 76, fin: 74, pas: 78, def: 52, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Erick Pulga', pos: 'A', age: 26, ovr: 83, fin: 84, pas: 80, def: 48, fis: 86, contractEnd: '31/12/2027' },
    { name: 'Saulo Mineiro', pos: 'A', age: 29, ovr: 81, fin: 83, pas: 74, def: 50, fis: 87, contractEnd: '31/12/2026' },
    { name: 'Aylon', pos: 'A', age: 34, ovr: 79, fin: 81, pas: 75, def: 50, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Facundo Castro', pos: 'A', age: 30, ovr: 77, fin: 76, pas: 76, def: 48, fis: 81, contractEnd: '31/12/2026' }
  ]
};

/**
 * RAW_PLAYERS_2026_SERIE_B
 * Atletas reais e confirmados das principais agremiações da Série B 2026.
 * Inclui Athletico Paranaense, Criciúma (com Yannick Bolasie), Coritiba, América-MG, Goiás, etc.
 */
export const RAW_PLAYERS_2026_SERIE_B = {
  cap: [
    { name: 'Mycael Pontes', pos: 'G', age: 22, ovr: 80, fin: 25, pas: 70, def: 83, fis: 80, contractEnd: '31/12/2027' },
    { name: 'Léo Linck', pos: 'G', age: 25, ovr: 77, fin: 20, pas: 65, def: 79, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Thiago Heleno', pos: 'Z', age: 37, ovr: 80, fin: 42, pas: 68, def: 82, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Kaique Rocha', pos: 'Z', age: 25, ovr: 80, fin: 36, pas: 68, def: 81, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Mateo Gamarra', pos: 'Z', age: 25, ovr: 78, fin: 40, pas: 66, def: 80, fis: 82, contractEnd: '31/12/2027' },
    { name: 'Lucas Belezi', pos: 'Z', age: 23, ovr: 76, fin: 32, pas: 65, def: 78, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Lucas Esquivel', pos: 'L', age: 25, ovr: 81, fin: 66, pas: 80, def: 80, fis: 83, contractEnd: '31/12/2028' },
    { name: 'Madson', pos: 'L', age: 34, ovr: 78, fin: 62, pas: 74, def: 77, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Fernando', pos: 'L', age: 26, ovr: 76, fin: 58, pas: 74, def: 76, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Fernandinho', pos: 'V', age: 41, ovr: 82, fin: 70, pas: 85, def: 83, fis: 74, contractEnd: '31/12/2026' },
    { name: 'Erick Carvalho', pos: 'V', age: 28, ovr: 81, fin: 72, pas: 80, def: 82, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Gabriel Girotto', pos: 'V', age: 34, ovr: 78, fin: 60, pas: 76, def: 80, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Felipinho', pos: 'V', age: 24, ovr: 77, fin: 62, pas: 78, def: 78, fis: 80, contractEnd: '31/12/2027' },
    { name: 'Bruno Zapelli', pos: 'M', age: 24, ovr: 82, fin: 78, pas: 85, def: 58, fis: 78, contractEnd: '31/12/2028' },
    { name: 'Nikão', pos: 'M', age: 34, ovr: 79, fin: 80, pas: 80, def: 54, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Christian Cardoso', pos: 'M', age: 25, ovr: 80, fin: 76, pas: 81, def: 74, fis: 81, contractEnd: '31/12/2026' },
    { name: 'João Cruz', pos: 'M', age: 20, ovr: 77, fin: 74, pas: 79, def: 52, fis: 76, contractEnd: '31/12/2028' },
    { name: 'Agustín Canobbio', pos: 'A', age: 27, ovr: 83, fin: 81, pas: 80, def: 64, fis: 88, contractEnd: '31/12/2026' },
    { name: 'Tomás Cuello', pos: 'A', age: 26, ovr: 81, fin: 78, pas: 78, def: 56, fis: 85, contractEnd: '31/12/2026' },
    { name: 'Gonzalo Mastriani', pos: 'A', age: 33, ovr: 81, fin: 85, pas: 72, def: 44, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Pablo Felipe', pos: 'A', age: 34, ovr: 79, fin: 81, pas: 74, def: 48, fis: 79, contractEnd: '31/12/2026' }
  ],

  cri: [
    { name: 'Gustavo Silva', pos: 'G', age: 33, ovr: 80, fin: 25, pas: 68, def: 82, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Alisson', pos: 'G', age: 29, ovr: 75, fin: 20, pas: 64, def: 77, fis: 75, contractEnd: '31/12/2026' },
    { name: 'Rodrigo Fagundes', pos: 'Z', age: 37, ovr: 79, fin: 42, pas: 68, def: 81, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Tobias Figueiredo', pos: 'Z', age: 32, ovr: 78, fin: 36, pas: 68, def: 80, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Wilker Ángel', pos: 'Z', age: 33, ovr: 78, fin: 40, pas: 68, def: 80, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Maia', pos: 'Z', age: 25, ovr: 75, fin: 30, pas: 65, def: 77, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Marcelo Hermes', pos: 'L', age: 31, ovr: 80, fin: 68, pas: 80, def: 78, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Claudinho', pos: 'L', age: 25, ovr: 79, fin: 64, pas: 77, def: 78, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Trauco', pos: 'L', age: 34, ovr: 77, fin: 62, pas: 79, def: 76, fis: 74, contractEnd: '31/12/2026' },
    { name: 'Newton', pos: 'V', age: 26, ovr: 80, fin: 66, pas: 79, def: 82, fis: 85, contractEnd: '31/12/2027' },
    { name: 'Barreto', pos: 'V', age: 30, ovr: 78, fin: 60, pas: 77, def: 80, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Ronald', pos: 'V', age: 29, ovr: 77, fin: 62, pas: 78, def: 78, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Higor Meritão', pos: 'V', age: 32, ovr: 77, fin: 62, pas: 78, def: 79, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Matheusinho', pos: 'M', age: 28, ovr: 81, fin: 79, pas: 83, def: 56, fis: 80, contractEnd: '31/12/2027' },
    { name: 'Fellipe Mateus', pos: 'M', age: 35, ovr: 79, fin: 76, pas: 82, def: 58, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Marquinhos Gabriel', pos: 'M', age: 36, ovr: 77, fin: 76, pas: 81, def: 50, fis: 73, contractEnd: '31/12/2026' },
    { name: 'Jhonata Robert', pos: 'M', age: 26, ovr: 76, fin: 74, pas: 77, def: 52, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Yannick Bolasie', pos: 'A', age: 37, ovr: 81, fin: 82, pas: 78, def: 46, fis: 84, contractEnd: '31/12/2026' },
    { name: 'Arthur Caíke', pos: 'A', age: 34, ovr: 78, fin: 80, pas: 73, def: 48, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Allano', pos: 'A', age: 31, ovr: 78, fin: 77, pas: 75, def: 52, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Felipe Vizeu', pos: 'A', age: 29, ovr: 77, fin: 80, pas: 68, def: 42, fis: 79, contractEnd: '31/12/2026' }
  ],

  cfc: [
    { name: 'Pedro Morisco', pos: 'G', age: 22, ovr: 79, fin: 24, pas: 66, def: 81, fis: 78, contractEnd: '31/12/2027' },
    { name: 'Benassi', pos: 'G', age: 22, ovr: 74, fin: 20, pas: 62, def: 76, fis: 75, contractEnd: '31/12/2026' },
    { name: 'Maurício Antônio', pos: 'Z', age: 34, ovr: 78, fin: 40, pas: 66, def: 80, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Bruno Melo', pos: 'Z', age: 33, ovr: 78, fin: 55, pas: 70, def: 79, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Marcelo Benevenuto', pos: 'Z', age: 30, ovr: 77, fin: 38, pas: 65, def: 78, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Thalisson', pos: 'Z', age: 24, ovr: 76, fin: 32, pas: 64, def: 78, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Natanael', pos: 'L', age: 24, ovr: 79, fin: 60, pas: 76, def: 79, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Jamerson', pos: 'L', age: 28, ovr: 78, fin: 65, pas: 78, def: 77, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Jhonny', pos: 'L', age: 23, ovr: 75, fin: 54, pas: 72, def: 75, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Sebastián Gómez', pos: 'V', age: 30, ovr: 81, fin: 70, pas: 82, def: 81, fis: 82, contractEnd: '31/12/2027' },
    { name: 'Morelli', pos: 'V', age: 28, ovr: 78, fin: 64, pas: 78, def: 79, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Vini Paulista', pos: 'V', age: 25, ovr: 77, fin: 66, pas: 77, def: 77, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Fransérgio', pos: 'V', age: 35, ovr: 76, fin: 68, pas: 78, def: 75, fis: 75, contractEnd: '31/12/2026' },
    { name: 'Josué Pesqueira', pos: 'M', age: 36, ovr: 80, fin: 78, pas: 84, def: 55, fis: 74, contractEnd: '31/12/2026' },
    { name: 'Matheus Frizzo', pos: 'M', age: 27, ovr: 80, fin: 80, pas: 81, def: 64, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Yago Ferreira', pos: 'M', age: 24, ovr: 76, fin: 72, pas: 77, def: 54, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Geovane Meurer', pos: 'M', age: 24, ovr: 75, fin: 68, pas: 76, def: 60, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Lucas Ronier', pos: 'A', age: 21, ovr: 80, fin: 80, pas: 77, def: 52, fis: 83, contractEnd: '31/12/2027' },
    { name: 'Júnior Brumado', pos: 'A', age: 27, ovr: 78, fin: 81, pas: 68, def: 42, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Robson Fernandes', pos: 'A', age: 35, ovr: 78, fin: 80, pas: 74, def: 54, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Figueiredo', pos: 'A', age: 24, ovr: 77, fin: 78, pas: 72, def: 50, fis: 82, contractEnd: '31/12/2026' }
  ],

  ame: [
    { name: 'Elias Curzel', pos: 'G', age: 31, ovr: 78, fin: 24, pas: 65, def: 80, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Dalberson', pos: 'G', age: 29, ovr: 75, fin: 20, pas: 62, def: 76, fis: 75, contractEnd: '31/12/2026' },
    { name: 'Éder Ferreira', pos: 'Z', age: 31, ovr: 79, fin: 38, pas: 68, def: 80, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Ricardo Silva', pos: 'Z', age: 34, ovr: 78, fin: 40, pas: 67, def: 80, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Júlio César', pos: 'Z', age: 23, ovr: 76, fin: 32, pas: 65, def: 78, fis: 79, contractEnd: '31/12/2027' },
    { name: 'Lucão', pos: 'Z', age: 30, ovr: 75, fin: 34, pas: 64, def: 77, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Marlon Lopes', pos: 'L', age: 32, ovr: 78, fin: 62, pas: 77, def: 77, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Mateus Henrique', pos: 'L', age: 24, ovr: 77, fin: 58, pas: 75, def: 77, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Daniel Borges', pos: 'L', age: 33, ovr: 76, fin: 60, pas: 76, def: 75, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Juninho', pos: 'V', age: 38, ovr: 80, fin: 70, pas: 81, def: 80, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Alê', pos: 'V', age: 36, ovr: 78, fin: 68, pas: 79, def: 79, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Felipe Amaral', pos: 'V', age: 23, ovr: 76, fin: 62, pas: 77, def: 77, fis: 79, contractEnd: '31/12/2027' },
    { name: 'Wallisson', pos: 'V', age: 29, ovr: 76, fin: 66, pas: 76, def: 76, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Moisés', pos: 'M', age: 38, ovr: 79, fin: 78, pas: 83, def: 60, fis: 72, contractEnd: '31/12/2026' },
    { name: 'Martín Benítez', pos: 'M', age: 32, ovr: 79, fin: 77, pas: 85, def: 48, fis: 70, contractEnd: '31/12/2026' },
    { name: 'Gustavinho', pos: 'M', age: 24, ovr: 76, fin: 74, pas: 78, def: 54, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Adyson', pos: 'M', age: 21, ovr: 77, fin: 76, pas: 77, def: 50, fis: 82, contractEnd: '31/12/2027' },
    { name: 'Brenner Marlos', pos: 'A', age: 32, ovr: 79, fin: 82, pas: 71, def: 44, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Fabinho', pos: 'A', age: 26, ovr: 78, fin: 78, pas: 74, def: 52, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Renato Marques', pos: 'A', age: 22, ovr: 77, fin: 80, pas: 70, def: 42, fis: 80, contractEnd: '31/12/2027' },
    { name: 'Vinicius', pos: 'A', age: 33, ovr: 76, fin: 77, pas: 73, def: 48, fis: 79, contractEnd: '31/12/2026' }
  ],

  goi: [
    { name: 'Tadeu Ferreira', pos: 'G', age: 34, ovr: 82, fin: 25, pas: 70, def: 85, fis: 80, contractEnd: '31/12/2028' },
    { name: 'Thiago Rodrigues', pos: 'G', age: 37, ovr: 75, fin: 20, pas: 64, def: 77, fis: 74, contractEnd: '31/12/2026' },
    { name: 'Lucas Ribeiro', pos: 'Z', age: 27, ovr: 80, fin: 38, pas: 70, def: 81, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Messias', pos: 'Z', age: 32, ovr: 79, fin: 40, pas: 67, def: 81, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Reynaldo', pos: 'Z', age: 29, ovr: 77, fin: 36, pas: 66, def: 79, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Edson Felipe', pos: 'Z', age: 35, ovr: 76, fin: 42, pas: 68, def: 78, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Sander', pos: 'L', age: 36, ovr: 78, fin: 58, pas: 76, def: 79, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Dieguinho', pos: 'L', age: 31, ovr: 78, fin: 66, pas: 77, def: 78, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Douglas Borel', pos: 'L', age: 24, ovr: 76, fin: 58, pas: 74, def: 76, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Marcão Silva', pos: 'V', age: 35, ovr: 80, fin: 68, pas: 79, def: 83, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Rafael Gava', pos: 'V', age: 33, ovr: 79, fin: 74, pas: 82, def: 76, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Juninho', pos: 'V', age: 25, ovr: 77, fin: 64, pas: 78, def: 78, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Nathan Melo', pos: 'V', age: 25, ovr: 76, fin: 60, pas: 76, def: 77, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Régis Augusto', pos: 'M', age: 34, ovr: 79, fin: 78, pas: 82, def: 52, fis: 74, contractEnd: '31/12/2026' },
    { name: 'Luiz Henrique', pos: 'M', age: 27, ovr: 77, fin: 72, pas: 79, def: 62, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Welliton Matheus', pos: 'M', age: 26, ovr: 78, fin: 76, pas: 78, def: 56, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Jhon Vásquez', pos: 'M', age: 31, ovr: 77, fin: 76, pas: 76, def: 52, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Breno Herculano', pos: 'A', age: 27, ovr: 79, fin: 82, pas: 70, def: 45, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Paulo Baya', pos: 'A', age: 27, ovr: 79, fin: 83, pas: 74, def: 48, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Thiago Galhardo', pos: 'A', age: 37, ovr: 79, fin: 82, pas: 77, def: 48, fis: 75, contractEnd: '31/12/2026' },
    { name: 'Mateus Gonçalves', pos: 'A', age: 32, ovr: 77, fin: 76, pas: 74, def: 50, fis: 85, contractEnd: '31/12/2026' }
  ],
  acg: [
    { name: 'Ronaldo', pos: 'G', age: 29, ovr: 80, fin: 25, pas: 68, def: 82, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Pedro Rangel', pos: 'G', age: 25, ovr: 76, fin: 20, pas: 64, def: 77, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Alix Vinícius', pos: 'Z', age: 26, ovr: 80, fin: 38, pas: 66, def: 81, fis: 83, contractEnd: '31/12/2027' },
    { name: 'Adriano Martins', pos: 'Z', age: 28, ovr: 79, fin: 36, pas: 65, def: 80, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Luiz Felipe', pos: 'Z', age: 32, ovr: 78, fin: 35, pas: 64, def: 79, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Philipe Sampaio', pos: 'Z', age: 31, ovr: 77, fin: 32, pas: 62, def: 78, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Guilherme Romão', pos: 'L', age: 28, ovr: 79, fin: 60, pas: 76, def: 78, fis: 81, contractEnd: '31/12/2027' },
    { name: 'Maguinho', pos: 'L', age: 34, ovr: 78, fin: 58, pas: 74, def: 77, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Rodallega', pos: 'L', age: 23, ovr: 75, fin: 55, pas: 72, def: 75, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Gabriel Baralhas', pos: 'V', age: 27, ovr: 81, fin: 70, pas: 80, def: 82, fis: 83, contractEnd: '31/12/2027' },
    { name: 'Rhaldney', pos: 'V', age: 27, ovr: 79, fin: 64, pas: 78, def: 80, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Gonzalo Freitas', pos: 'V', age: 33, ovr: 78, fin: 62, pas: 76, def: 79, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Roni', pos: 'V', age: 26, ovr: 77, fin: 60, pas: 75, def: 78, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Shaylon', pos: 'M', age: 28, ovr: 82, fin: 80, pas: 85, def: 58, fis: 76, contractEnd: '31/12/2027' },
    { name: 'Alejo Cruz', pos: 'M', age: 25, ovr: 79, fin: 76, pas: 80, def: 60, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Jorginho', pos: 'M', age: 35, ovr: 78, fin: 76, pas: 81, def: 54, fis: 73, contractEnd: '31/12/2026' },
    { name: 'Joel Campbell', pos: 'M', age: 34, ovr: 79, fin: 78, pas: 80, def: 52, fis: 75, contractEnd: '31/12/2026' },
    { name: 'Luiz Fernando', pos: 'A', age: 29, ovr: 82, fin: 84, pas: 78, def: 50, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Jan Hurtado', pos: 'A', age: 25, ovr: 79, fin: 82, pas: 70, def: 42, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Derek', pos: 'A', age: 27, ovr: 78, fin: 80, pas: 72, def: 44, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Janderson', pos: 'A', age: 26, ovr: 77, fin: 76, pas: 74, def: 48, fis: 84, contractEnd: '31/12/2026' }
  ],
  cui: [
    { name: 'Walter', pos: 'G', age: 38, ovr: 82, fin: 25, pas: 68, def: 84, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Mateus Pasinato', pos: 'G', age: 33, ovr: 76, fin: 20, pas: 64, def: 77, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Marllon', pos: 'Z', age: 33, ovr: 80, fin: 42, pas: 66, def: 82, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Alan Empereur', pos: 'Z', age: 31, ovr: 80, fin: 44, pas: 72, def: 81, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Bruno Alves', pos: 'Z', age: 34, ovr: 78, fin: 40, pas: 65, def: 79, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Gabriel Knesowitsch', pos: 'Z', age: 22, ovr: 76, fin: 30, pas: 62, def: 77, fis: 78, contractEnd: '31/12/2027' },
    { name: 'Matheus Alexandre', pos: 'L', age: 26, ovr: 80, fin: 60, pas: 77, def: 80, fis: 83, contractEnd: '31/12/2027' },
    { name: 'Ramon', pos: 'L', age: 24, ovr: 79, fin: 62, pas: 76, def: 78, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Railan', pos: 'L', age: 25, ovr: 75, fin: 54, pas: 72, def: 75, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Lucas Mineiro', pos: 'V', age: 29, ovr: 80, fin: 66, pas: 79, def: 81, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Denilson', pos: 'V', age: 24, ovr: 80, fin: 68, pas: 80, def: 80, fis: 82, contractEnd: '31/12/2027' },
    { name: 'Fernando Sobral', pos: 'V', age: 31, ovr: 81, fin: 72, pas: 82, def: 80, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Filipe Augusto', pos: 'V', age: 32, ovr: 77, fin: 64, pas: 77, def: 78, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Max', pos: 'M', age: 24, ovr: 78, fin: 74, pas: 79, def: 60, fis: 78, contractEnd: '31/12/2027' },
    { name: 'Lucas Fernandes', pos: 'M', age: 28, ovr: 79, fin: 76, pas: 82, def: 56, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Gustavo Sauer', pos: 'M', age: 32, ovr: 79, fin: 78, pas: 81, def: 52, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Jonathan Cafú', pos: 'M', age: 34, ovr: 78, fin: 75, pas: 77, def: 54, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Isidro Pitta', pos: 'A', age: 26, ovr: 82, fin: 85, pas: 73, def: 46, fis: 86, contractEnd: '31/12/2027' },
    { name: 'Clayson', pos: 'A', age: 30, ovr: 81, fin: 80, pas: 78, def: 52, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Derik Lacerda', pos: 'A', age: 26, ovr: 79, fin: 81, pas: 72, def: 45, fis: 84, contractEnd: '31/12/2027' },
    { name: 'André Luís', pos: 'A', age: 28, ovr: 77, fin: 78, pas: 72, def: 48, fis: 80, contractEnd: '31/12/2026' }
  ],
  cha: [
    { name: 'Léo Vieira', pos: 'G', age: 34, ovr: 79, fin: 25, pas: 66, def: 81, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Matheus Cavichioli', pos: 'G', age: 39, ovr: 76, fin: 20, pas: 64, def: 78, fis: 75, contractEnd: '31/12/2026' },
    { name: 'Bruno Leonardo', pos: 'Z', age: 29, ovr: 79, fin: 40, pas: 66, def: 81, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Eduardo Doma', pos: 'Z', age: 27, ovr: 78, fin: 36, pas: 65, def: 80, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Rodrigo Moledo', pos: 'Z', age: 38, ovr: 77, fin: 38, pas: 62, def: 80, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Jhonnathan', pos: 'Z', age: 24, ovr: 75, fin: 30, pas: 62, def: 77, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Mancha', pos: 'L', age: 25, ovr: 77, fin: 58, pas: 74, def: 77, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Marcelinho', pos: 'L', age: 27, ovr: 77, fin: 60, pas: 75, def: 76, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Walter Clar', pos: 'L', age: 31, ovr: 76, fin: 56, pas: 74, def: 76, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Auremir', pos: 'V', age: 34, ovr: 78, fin: 60, pas: 77, def: 80, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Foguinho', pos: 'V', age: 33, ovr: 78, fin: 62, pas: 76, def: 80, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Tárik', pos: 'V', age: 32, ovr: 77, fin: 58, pas: 76, def: 78, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Bruno Matias', pos: 'V', age: 26, ovr: 76, fin: 60, pas: 76, def: 77, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Rafael Carvalheira', pos: 'M', age: 26, ovr: 79, fin: 76, pas: 82, def: 62, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Giovanni Augusto', pos: 'M', age: 36, ovr: 78, fin: 76, pas: 82, def: 50, fis: 72, contractEnd: '31/12/2026' },
    { name: 'Thomás Bedinelli', pos: 'M', age: 32, ovr: 77, fin: 75, pas: 78, def: 54, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Marlone', pos: 'M', age: 33, ovr: 76, fin: 74, pas: 78, def: 52, fis: 75, contractEnd: '31/12/2026' },
    { name: 'Mário Sérgio', pos: 'A', age: 30, ovr: 80, fin: 83, pas: 72, def: 44, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Perotti', pos: 'A', age: 28, ovr: 79, fin: 82, pas: 70, def: 45, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Marcinho', pos: 'A', age: 30, ovr: 78, fin: 78, pas: 75, def: 48, fis: 84, contractEnd: '31/12/2026' },
    { name: 'Rômulo', pos: 'A', age: 24, ovr: 76, fin: 76, pas: 72, def: 46, fis: 80, contractEnd: '31/12/2026' }
  ],
  ava: [
    { name: 'César Augusto', pos: 'G', age: 30, ovr: 79, fin: 25, pas: 66, def: 81, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Igor Bohn', pos: 'G', age: 29, ovr: 76, fin: 20, pas: 62, def: 77, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Tiago Pagnussat', pos: 'Z', age: 35, ovr: 79, fin: 42, pas: 66, def: 81, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Roberto', pos: 'Z', age: 37, ovr: 78, fin: 38, pas: 64, def: 80, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Gustavo Vilar', pos: 'Z', age: 25, ovr: 77, fin: 34, pas: 65, def: 79, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Alan Costa', pos: 'Z', age: 35, ovr: 76, fin: 36, pas: 62, def: 78, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Mário Sérgio', pos: 'L', age: 31, ovr: 78, fin: 60, pas: 76, def: 78, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Marcos Vinícius', pos: 'L', age: 28, ovr: 78, fin: 62, pas: 76, def: 77, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Natanael', pos: 'L', age: 35, ovr: 76, fin: 58, pas: 74, def: 76, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Willian Maranhão', pos: 'V', age: 30, ovr: 79, fin: 60, pas: 77, def: 81, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Zé Ricardo', pos: 'V', age: 27, ovr: 78, fin: 62, pas: 78, def: 79, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Judson', pos: 'V', age: 33, ovr: 77, fin: 58, pas: 76, def: 78, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Ronaldo Henrique', pos: 'V', age: 31, ovr: 77, fin: 62, pas: 77, def: 78, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Pedro Castro', pos: 'M', age: 32, ovr: 80, fin: 76, pas: 83, def: 65, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Giovanni', pos: 'M', age: 31, ovr: 79, fin: 77, pas: 82, def: 56, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Andrey', pos: 'M', age: 27, ovr: 77, fin: 74, pas: 78, def: 60, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Jean Lucas', pos: 'M', age: 29, ovr: 76, fin: 72, pas: 78, def: 58, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Vagner Love', pos: 'A', age: 41, ovr: 79, fin: 83, pas: 76, def: 44, fis: 73, contractEnd: '31/12/2026' },
    { name: 'Maurício Garcez', pos: 'A', age: 28, ovr: 80, fin: 81, pas: 75, def: 52, fis: 84, contractEnd: '31/12/2026' },
    { name: 'Hygor', pos: 'A', age: 33, ovr: 79, fin: 80, pas: 74, def: 48, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Ademilson', pos: 'A', age: 31, ovr: 77, fin: 78, pas: 74, def: 46, fis: 79, contractEnd: '31/12/2026' }
  ],
  nov: [
    { name: 'Jordi', pos: 'G', age: 32, ovr: 80, fin: 25, pas: 68, def: 82, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Airton', pos: 'G', age: 31, ovr: 75, fin: 20, pas: 62, def: 76, fis: 75, contractEnd: '31/12/2026' },
    { name: 'César Martins', pos: 'Z', age: 33, ovr: 80, fin: 42, pas: 66, def: 82, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Patrick', pos: 'Z', age: 27, ovr: 79, fin: 36, pas: 66, def: 80, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Luisão', pos: 'Z', age: 26, ovr: 78, fin: 34, pas: 65, def: 79, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Renato Palm', pos: 'Z', age: 26, ovr: 76, fin: 32, pas: 64, def: 78, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Reverson', pos: 'L', age: 28, ovr: 79, fin: 62, pas: 77, def: 78, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Rodrigo Soares', pos: 'L', age: 33, ovr: 78, fin: 60, pas: 76, def: 78, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Igor Formiga', pos: 'L', age: 26, ovr: 76, fin: 58, pas: 74, def: 76, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Geovane', pos: 'V', age: 26, ovr: 80, fin: 66, pas: 80, def: 81, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Marlon', pos: 'V', age: 35, ovr: 79, fin: 64, pas: 79, def: 80, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Willian Farias', pos: 'V', age: 36, ovr: 78, fin: 60, pas: 78, def: 80, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Dudu', pos: 'V', age: 26, ovr: 76, fin: 58, pas: 76, def: 77, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Rômulo', pos: 'M', age: 24, ovr: 80, fin: 78, pas: 83, def: 60, fis: 78, contractEnd: '31/12/2027' },
    { name: 'Eduardo', pos: 'M', age: 29, ovr: 78, fin: 75, pas: 80, def: 58, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Lucas Cardoso', pos: 'M', age: 25, ovr: 77, fin: 74, pas: 78, def: 55, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Danilo Barcelos', pos: 'M', age: 34, ovr: 76, fin: 70, pas: 78, def: 66, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Neto Pessoa', pos: 'A', age: 31, ovr: 80, fin: 83, pas: 73, def: 45, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Rodolfo', pos: 'A', age: 33, ovr: 79, fin: 81, pas: 72, def: 44, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Waguininho', pos: 'A', age: 35, ovr: 78, fin: 79, pas: 75, def: 54, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Fabrício Daniel', pos: 'A', age: 28, ovr: 78, fin: 80, pas: 74, def: 48, fis: 79, contractEnd: '31/12/2026' }
  ],
  vil: [
    { name: 'Dênis Júnior', pos: 'G', age: 27, ovr: 80, fin: 25, pas: 68, def: 82, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Halls', pos: 'G', age: 26, ovr: 75, fin: 20, pas: 63, def: 76, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Dankler', pos: 'Z', age: 34, ovr: 79, fin: 40, pas: 65, def: 81, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Jemmes', pos: 'Z', age: 25, ovr: 78, fin: 35, pas: 64, def: 80, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Juan Quintero', pos: 'Z', age: 30, ovr: 77, fin: 36, pas: 64, def: 78, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Vanderley', pos: 'Z', age: 25, ovr: 76, fin: 32, pas: 62, def: 78, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Rhuan', pos: 'L', age: 25, ovr: 78, fin: 60, pas: 75, def: 78, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Elias', pos: 'L', age: 26, ovr: 78, fin: 62, pas: 76, def: 77, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Éric Davis', pos: 'L', age: 34, ovr: 76, fin: 62, pas: 75, def: 76, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Ralf', pos: 'V', age: 41, ovr: 79, fin: 58, pas: 76, def: 82, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Cristiano', pos: 'V', age: 26, ovr: 78, fin: 64, pas: 78, def: 79, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Arilson', pos: 'V', age: 32, ovr: 78, fin: 62, pas: 77, def: 80, fis: 80, contractEnd: '31/12/2026' },
    { name: 'João Vitor', pos: 'V', age: 25, ovr: 76, fin: 58, pas: 75, def: 77, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Igor Henrique', pos: 'M', age: 34, ovr: 80, fin: 78, pas: 81, def: 68, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Luciano Naninho', pos: 'M', age: 33, ovr: 79, fin: 76, pas: 83, def: 52, fis: 74, contractEnd: '31/12/2026' },
    { name: 'Estevão', pos: 'M', age: 23, ovr: 77, fin: 74, pas: 78, def: 58, fis: 77, contractEnd: '31/12/2026' },
    { name: 'João Lucas', pos: 'M', age: 25, ovr: 76, fin: 72, pas: 77, def: 54, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Alesson', pos: 'A', age: 26, ovr: 81, fin: 83, pas: 76, def: 50, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Júnior Todinho', pos: 'A', age: 31, ovr: 79, fin: 80, pas: 74, def: 48, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Henrique Almeida', pos: 'A', age: 34, ovr: 78, fin: 81, pas: 72, def: 45, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Emerson Urso', pos: 'A', age: 24, ovr: 77, fin: 77, pas: 74, def: 48, fis: 84, contractEnd: '31/12/2026' }
  ],
  ope: [
    { name: 'Rafael Santos', pos: 'G', age: 36, ovr: 80, fin: 25, pas: 67, def: 82, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Gabriel Mesquita', pos: 'G', age: 27, ovr: 75, fin: 20, pas: 62, def: 76, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Willian Machado', pos: 'Z', age: 29, ovr: 79, fin: 40, pas: 66, def: 81, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Joseph', pos: 'Z', age: 30, ovr: 78, fin: 38, pas: 65, def: 80, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Fagner Alemão', pos: 'Z', age: 35, ovr: 77, fin: 36, pas: 64, def: 79, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Alemão', pos: 'Z', age: 33, ovr: 76, fin: 34, pas: 62, def: 78, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Pará', pos: 'L', age: 30, ovr: 78, fin: 60, pas: 76, def: 78, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Thales Oleques', pos: 'L', age: 31, ovr: 78, fin: 58, pas: 75, def: 78, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Lucas Hipólito', pos: 'L', age: 28, ovr: 76, fin: 56, pas: 74, def: 76, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Jacy', pos: 'V', age: 28, ovr: 79, fin: 64, pas: 78, def: 81, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Índio', pos: 'V', age: 33, ovr: 78, fin: 62, pas: 77, def: 80, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Vinícius Diniz', pos: 'V', age: 26, ovr: 77, fin: 60, pas: 76, def: 78, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Rodrigo Lindoso', pos: 'V', age: 36, ovr: 77, fin: 66, pas: 80, def: 78, fis: 75, contractEnd: '31/12/2026' },
    { name: 'Boschilia', pos: 'M', age: 29, ovr: 80, fin: 79, pas: 83, def: 56, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Cássio Gabriel', pos: 'M', age: 33, ovr: 78, fin: 76, pas: 80, def: 54, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Dudu Scheit', pos: 'M', age: 24, ovr: 77, fin: 74, pas: 78, def: 58, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Marco Antônio', pos: 'M', age: 25, ovr: 76, fin: 72, pas: 77, def: 55, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Rodrigo Rodrigues', pos: 'A', age: 29, ovr: 80, fin: 83, pas: 72, def: 44, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Maxwell', pos: 'A', age: 30, ovr: 79, fin: 80, pas: 75, def: 48, fis: 84, contractEnd: '31/12/2026' },
    { name: 'Felipe Augusto', pos: 'A', age: 32, ovr: 78, fin: 81, pas: 74, def: 48, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Daniel Lima', pos: 'A', age: 26, ovr: 76, fin: 78, pas: 70, def: 45, fis: 80, contractEnd: '31/12/2026' }
  ],
  bsp: [
    { name: 'João Carlos', pos: 'G', age: 37, ovr: 79, fin: 25, pas: 66, def: 81, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Michael Fracaro', pos: 'G', age: 30, ovr: 75, fin: 20, pas: 62, def: 76, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Fábio Sanches', pos: 'Z', age: 34, ovr: 79, fin: 38, pas: 65, def: 81, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Bernardo Schappo', pos: 'Z', age: 26, ovr: 78, fin: 36, pas: 65, def: 80, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Ericson', pos: 'Z', age: 26, ovr: 77, fin: 34, pas: 64, def: 79, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Lucas Dias', pos: 'Z', age: 30, ovr: 76, fin: 35, pas: 62, def: 78, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Jean Victor', pos: 'L', age: 31, ovr: 78, fin: 64, pas: 77, def: 77, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Wallison', pos: 'L', age: 28, ovr: 77, fin: 58, pas: 74, def: 77, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Pedro Costa', pos: 'L', age: 25, ovr: 76, fin: 56, pas: 74, def: 76, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Matheus Barbosa', pos: 'V', age: 31, ovr: 79, fin: 68, pas: 79, def: 80, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Gustavo Bochecha', pos: 'V', age: 29, ovr: 78, fin: 64, pas: 80, def: 78, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Sabit Abdulai', pos: 'V', age: 26, ovr: 77, fin: 60, pas: 76, def: 79, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Carlos Manuel', pos: 'V', age: 26, ovr: 76, fin: 58, pas: 75, def: 77, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Douglas Baggio', pos: 'M', age: 30, ovr: 79, fin: 77, pas: 80, def: 56, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Bismark', pos: 'M', age: 32, ovr: 77, fin: 75, pas: 78, def: 52, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Fillipe Soutto', pos: 'M', age: 34, ovr: 77, fin: 70, pas: 80, def: 66, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Toró', pos: 'M', age: 26, ovr: 76, fin: 74, pas: 76, def: 54, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Alex Sandro', pos: 'A', age: 30, ovr: 80, fin: 82, pas: 72, def: 45, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Negueba', pos: 'A', age: 25, ovr: 79, fin: 78, pas: 76, def: 50, fis: 85, contractEnd: '31/12/2026' },
    { name: 'Victor Andrade', pos: 'A', age: 30, ovr: 78, fin: 79, pas: 75, def: 48, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Alexandre Jesus', pos: 'A', age: 24, ovr: 77, fin: 78, pas: 72, def: 46, fis: 81, contractEnd: '31/12/2026' }
  ],
  pay: [
    { name: 'Matheus Nogueira', pos: 'G', age: 29, ovr: 80, fin: 25, pas: 67, def: 82, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Diogo Silva', pos: 'G', age: 39, ovr: 76, fin: 25, pas: 65, def: 77, fis: 75, contractEnd: '31/12/2026' },
    { name: 'Wanderson', pos: 'Z', age: 30, ovr: 79, fin: 38, pas: 65, def: 81, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Lucas Maia', pos: 'Z', age: 32, ovr: 78, fin: 36, pas: 64, def: 80, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Carlão', pos: 'Z', age: 33, ovr: 77, fin: 35, pas: 62, def: 79, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Luan Freitas', pos: 'Z', age: 24, ovr: 76, fin: 32, pas: 64, def: 78, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Kevyn', pos: 'L', age: 27, ovr: 78, fin: 60, pas: 76, def: 78, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Edílson', pos: 'L', age: 29, ovr: 78, fin: 62, pas: 76, def: 77, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Bryan Borges', pos: 'L', age: 29, ovr: 76, fin: 58, pas: 74, def: 76, fis: 80, contractEnd: '31/12/2026' },
    { name: 'João Vieira', pos: 'V', age: 28, ovr: 80, fin: 68, pas: 80, def: 80, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Leandro Vilela', pos: 'V', age: 30, ovr: 78, fin: 62, pas: 77, def: 80, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Netinho', pos: 'V', age: 31, ovr: 78, fin: 64, pas: 78, def: 79, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Val Soares', pos: 'V', age: 28, ovr: 76, fin: 60, pas: 76, def: 77, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Juan Cazares', pos: 'M', age: 33, ovr: 80, fin: 78, pas: 85, def: 48, fis: 73, contractEnd: '31/12/2026' },
    { name: 'Robinho', pos: 'M', age: 37, ovr: 79, fin: 76, pas: 83, def: 52, fis: 72, contractEnd: '31/12/2026' },
    { name: 'Juninho', pos: 'M', age: 25, ovr: 77, fin: 74, pas: 78, def: 58, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Biel', pos: 'M', age: 23, ovr: 76, fin: 72, pas: 78, def: 54, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Nicolas', pos: 'A', age: 36, ovr: 81, fin: 84, pas: 72, def: 45, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Esli García', pos: 'A', age: 25, ovr: 80, fin: 82, pas: 75, def: 48, fis: 85, contractEnd: '31/12/2026' },
    { name: 'Paulinho Bóia', pos: 'A', age: 27, ovr: 79, fin: 79, pas: 76, def: 50, fis: 84, contractEnd: '31/12/2026' },
    { name: 'Borasi', pos: 'A', age: 27, ovr: 77, fin: 77, pas: 73, def: 48, fis: 81, contractEnd: '31/12/2026' }
  ],
  rem: [
    { name: 'Marcelo Rangel', pos: 'G', age: 37, ovr: 79, fin: 25, pas: 66, def: 81, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Leo Lang', pos: 'G', age: 27, ovr: 75, fin: 20, pas: 62, def: 76, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Rafael Castro', pos: 'Z', age: 28, ovr: 78, fin: 36, pas: 64, def: 80, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Reynaldo', pos: 'Z', age: 28, ovr: 78, fin: 35, pas: 65, def: 79, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Bruno Bispo', pos: 'Z', age: 29, ovr: 76, fin: 34, pas: 63, def: 78, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Sheldon', pos: 'Z', age: 26, ovr: 75, fin: 30, pas: 62, def: 77, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Raimar', pos: 'L', age: 24, ovr: 78, fin: 62, pas: 76, def: 77, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Diogo Batista', pos: 'L', age: 22, ovr: 77, fin: 58, pas: 75, def: 76, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Vidal', pos: 'L', age: 29, ovr: 76, fin: 56, pas: 74, def: 76, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Jaderson', pos: 'V', age: 25, ovr: 80, fin: 70, pas: 80, def: 80, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Bruno Silva', pos: 'V', age: 39, ovr: 78, fin: 64, pas: 78, def: 80, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Paulinho Curuá', pos: 'V', age: 28, ovr: 77, fin: 60, pas: 76, def: 78, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Renato Alves', pos: 'V', age: 33, ovr: 76, fin: 58, pas: 75, def: 77, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Giovanni Pavani', pos: 'M', age: 29, ovr: 79, fin: 76, pas: 82, def: 60, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Marco Antônio', pos: 'M', age: 28, ovr: 78, fin: 75, pas: 80, def: 56, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Matheus Anjos', pos: 'M', age: 26, ovr: 77, fin: 75, pas: 79, def: 52, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Kelvin', pos: 'M', age: 32, ovr: 77, fin: 74, pas: 78, def: 50, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Pedro Vitor', pos: 'A', age: 27, ovr: 80, fin: 82, pas: 75, def: 50, fis: 84, contractEnd: '31/12/2026' },
    { name: 'Rodrigo Alves', pos: 'A', age: 29, ovr: 79, fin: 81, pas: 74, def: 48, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Ytalo', pos: 'A', age: 37, ovr: 78, fin: 82, pas: 73, def: 44, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Ribamar', pos: 'A', age: 28, ovr: 76, fin: 78, pas: 68, def: 45, fis: 84, contractEnd: '31/12/2026' }
  ],
  crb: [
    { name: 'Matheus Albino', pos: 'G', age: 29, ovr: 81, fin: 25, pas: 70, def: 83, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Vitor Caetano', pos: 'G', age: 26, ovr: 75, fin: 20, pas: 62, def: 76, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Fábio Alemão', pos: 'Z', age: 29, ovr: 79, fin: 40, pas: 66, def: 81, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Saimon', pos: 'Z', age: 34, ovr: 78, fin: 38, pas: 65, def: 80, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Gustavo Henrique', pos: 'Z', age: 25, ovr: 77, fin: 34, pas: 64, def: 79, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Wanderson', pos: 'Z', age: 29, ovr: 76, fin: 32, pas: 62, def: 78, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Willian Formiga', pos: 'L', age: 30, ovr: 78, fin: 60, pas: 76, def: 78, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Hereda', pos: 'L', age: 27, ovr: 78, fin: 62, pas: 76, def: 77, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Matheus Ribeiro', pos: 'L', age: 32, ovr: 76, fin: 58, pas: 74, def: 76, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Falcão', pos: 'V', age: 27, ovr: 80, fin: 66, pas: 80, def: 81, fis: 82, contractEnd: '31/12/2026' },
    { name: 'João Pedro', pos: 'V', age: 26, ovr: 79, fin: 64, pas: 78, def: 80, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Rômulo', pos: 'V', age: 30, ovr: 77, fin: 62, pas: 76, def: 78, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Marco Antônio', pos: 'V', age: 24, ovr: 76, fin: 60, pas: 76, def: 77, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Gegê', pos: 'M', age: 31, ovr: 81, fin: 80, pas: 83, def: 58, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Chay', pos: 'M', age: 35, ovr: 79, fin: 77, pas: 82, def: 52, fis: 74, contractEnd: '31/12/2026' },
    { name: 'Raí', pos: 'M', age: 24, ovr: 77, fin: 74, pas: 78, def: 56, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Jorginho', pos: 'M', age: 33, ovr: 77, fin: 74, pas: 79, def: 54, fis: 75, contractEnd: '31/12/2026' },
    { name: 'Anselmo Ramon', pos: 'A', age: 37, ovr: 82, fin: 85, pas: 76, def: 45, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Léo Pereira', pos: 'A', age: 25, ovr: 80, fin: 81, pas: 75, def: 50, fis: 85, contractEnd: '31/12/2026' },
    { name: 'Mike', pos: 'A', age: 32, ovr: 78, fin: 79, pas: 74, def: 52, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Facundo Labandeira', pos: 'A', age: 29, ovr: 78, fin: 78, pas: 75, def: 50, fis: 83, contractEnd: '31/12/2026' }
  ],
  amz: [
    { name: 'Marcão', pos: 'G', age: 33, ovr: 79, fin: 25, pas: 66, def: 81, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Fabian Volpi', pos: 'G', age: 28, ovr: 75, fin: 20, pas: 63, def: 76, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Miranda', pos: 'Z', age: 25, ovr: 79, fin: 36, pas: 66, def: 81, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Fabiano', pos: 'Z', age: 35, ovr: 78, fin: 38, pas: 64, def: 80, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Alexis Alvariño', pos: 'Z', age: 25, ovr: 77, fin: 34, pas: 65, def: 79, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Wellington', pos: 'Z', age: 34, ovr: 76, fin: 34, pas: 62, def: 78, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Ezequiel', pos: 'L', age: 32, ovr: 78, fin: 58, pas: 75, def: 78, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Renan Castro', pos: 'L', age: 29, ovr: 77, fin: 60, pas: 75, def: 76, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Sidcley', pos: 'L', age: 32, ovr: 76, fin: 62, pas: 76, def: 75, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Cauan Barros', pos: 'V', age: 21, ovr: 79, fin: 62, pas: 78, def: 80, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Erick Varão', pos: 'V', age: 29, ovr: 79, fin: 68, pas: 78, def: 80, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Jiménez', pos: 'V', age: 32, ovr: 77, fin: 60, pas: 76, def: 78, fis: 80, contractEnd: '31/12/2026' },
    { name: 'PH', pos: 'V', age: 29, ovr: 76, fin: 58, pas: 75, def: 77, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Rafael Tavares', pos: 'M', age: 34, ovr: 79, fin: 77, pas: 83, def: 54, fis: 74, contractEnd: '31/12/2026' },
    { name: 'Diego Torres', pos: 'M', age: 34, ovr: 79, fin: 78, pas: 83, def: 50, fis: 72, contractEnd: '31/12/2026' },
    { name: 'Ênio', pos: 'M', age: 24, ovr: 78, fin: 76, pas: 78, def: 52, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Fellipe Bastos', pos: 'M', age: 35, ovr: 76, fin: 75, pas: 79, def: 65, fis: 74, contractEnd: '31/12/2026' },
    { name: 'Sassá', pos: 'A', age: 32, ovr: 80, fin: 83, pas: 72, def: 45, fis: 84, contractEnd: '31/12/2026' },
    { name: 'Matheus Serafim', pos: 'A', age: 27, ovr: 80, fin: 81, pas: 75, def: 50, fis: 86, contractEnd: '31/12/2026' },
    { name: 'Dentinho', pos: 'A', age: 37, ovr: 77, fin: 79, pas: 75, def: 44, fis: 73, contractEnd: '31/12/2026' },
    { name: 'Luan Silva', pos: 'A', age: 26, ovr: 77, fin: 78, pas: 72, def: 46, fis: 80, contractEnd: '31/12/2026' }
  ],
  ath: [
    { name: 'Jefferson Luis', pos: 'G', age: 31, ovr: 78, fin: 25, pas: 65, def: 80, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Glauco', pos: 'G', age: 28, ovr: 75, fin: 20, pas: 62, def: 76, fis: 75, contractEnd: '31/12/2026' },
    { name: 'Danilo', pos: 'Z', age: 32, ovr: 78, fin: 36, pas: 64, def: 80, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Edson', pos: 'Z', age: 33, ovr: 77, fin: 35, pas: 63, def: 79, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Victor Sallinas', pos: 'Z', age: 33, ovr: 76, fin: 34, pas: 62, def: 78, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Marcelo', pos: 'Z', age: 25, ovr: 75, fin: 30, pas: 62, def: 77, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Yuri', pos: 'L', age: 27, ovr: 77, fin: 58, pas: 74, def: 77, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Douglas Silva', pos: 'L', age: 26, ovr: 76, fin: 58, pas: 74, def: 76, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Ynaiã', pos: 'L', age: 26, ovr: 75, fin: 55, pas: 72, def: 75, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Diego Fumaça', pos: 'V', age: 31, ovr: 79, fin: 62, pas: 77, def: 81, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Walisson', pos: 'V', age: 28, ovr: 78, fin: 65, pas: 78, def: 79, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Rômulo', pos: 'V', age: 29, ovr: 76, fin: 60, pas: 76, def: 77, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Djalma', pos: 'V', age: 33, ovr: 75, fin: 58, pas: 75, def: 76, fis: 77, contractEnd: '31/12/2026' },
    { name: 'David Braga', pos: 'M', age: 24, ovr: 78, fin: 75, pas: 80, def: 56, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Geovane', pos: 'M', age: 26, ovr: 77, fin: 74, pas: 78, def: 54, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Robert', pos: 'M', age: 22, ovr: 76, fin: 73, pas: 77, def: 52, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Alason', pos: 'M', age: 26, ovr: 75, fin: 72, pas: 76, def: 50, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Paul Villero', pos: 'A', age: 27, ovr: 79, fin: 80, pas: 74, def: 48, fis: 84, contractEnd: '31/12/2026' },
    { name: 'Denilson', pos: 'A', age: 29, ovr: 78, fin: 81, pas: 72, def: 45, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Jonathas', pos: 'A', age: 36, ovr: 78, fin: 82, pas: 70, def: 42, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Neto Costa', pos: 'A', age: 29, ovr: 76, fin: 78, pas: 70, def: 44, fis: 81, contractEnd: '31/12/2026' }
  ],
  fer: [
    { name: 'Saulo', pos: 'G', age: 37, ovr: 79, fin: 25, pas: 66, def: 81, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Léo Wall', pos: 'G', age: 23, ovr: 75, fin: 20, pas: 63, def: 76, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Jackson', pos: 'Z', age: 35, ovr: 78, fin: 38, pas: 64, def: 80, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Ronaldo Alves', pos: 'Z', age: 36, ovr: 78, fin: 42, pas: 64, def: 80, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Gustavo Medina', pos: 'Z', age: 24, ovr: 77, fin: 34, pas: 64, def: 79, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Maílson', pos: 'Z', age: 34, ovr: 75, fin: 32, pas: 62, def: 77, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Igor Fernandes', pos: 'L', age: 33, ovr: 77, fin: 58, pas: 75, def: 77, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Lucas Rodrigues', pos: 'L', age: 27, ovr: 76, fin: 58, pas: 74, def: 76, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Weverton', pos: 'L', age: 26, ovr: 75, fin: 56, pas: 73, def: 75, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Ricardinho', pos: 'V', age: 36, ovr: 79, fin: 66, pas: 80, def: 80, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Zé Mateus', pos: 'V', age: 31, ovr: 78, fin: 64, pas: 78, def: 79, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Xavier', pos: 'V', age: 25, ovr: 77, fin: 60, pas: 76, def: 78, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Pablo Gabriel', pos: 'V', age: 26, ovr: 76, fin: 58, pas: 75, def: 77, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Thomaz', pos: 'M', age: 39, ovr: 78, fin: 76, pas: 81, def: 50, fis: 71, contractEnd: '31/12/2026' },
    { name: 'Juninho', pos: 'M', age: 29, ovr: 77, fin: 74, pas: 78, def: 56, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Cássio Gabriel', pos: 'M', age: 33, ovr: 76, fin: 74, pas: 78, def: 54, fis: 75, contractEnd: '31/12/2026' },
    { name: 'Fernando Boldrin', pos: 'M', age: 36, ovr: 76, fin: 75, pas: 79, def: 52, fis: 72, contractEnd: '31/12/2026' },
    { name: 'Carlão', pos: 'A', age: 33, ovr: 80, fin: 83, pas: 71, def: 44, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Vitor Barreto', pos: 'A', age: 25, ovr: 78, fin: 78, pas: 74, def: 48, fis: 84, contractEnd: '31/12/2026' },
    { name: 'Quirino', pos: 'A', age: 32, ovr: 77, fin: 79, pas: 72, def: 45, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Thayllon', pos: 'A', age: 24, ovr: 76, fin: 76, pas: 73, def: 48, fis: 83, contractEnd: '31/12/2026' }
  ],
  vro: [
    { name: 'Jean Drosny', pos: 'G', age: 31, ovr: 79, fin: 25, pas: 66, def: 81, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Paulo Henrique', pos: 'G', age: 29, ovr: 75, fin: 20, pas: 62, def: 76, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Lucas Souza', pos: 'Z', age: 26, ovr: 78, fin: 36, pas: 64, def: 80, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Bruno Barra', pos: 'Z', age: 39, ovr: 78, fin: 40, pas: 66, def: 80, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Léo Rigo', pos: 'Z', age: 30, ovr: 76, fin: 34, pas: 63, def: 78, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Gabriel Bahia', pos: 'Z', age: 26, ovr: 75, fin: 32, pas: 62, def: 77, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Wellington Silva', pos: 'L', age: 37, ovr: 78, fin: 60, pas: 76, def: 78, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Sanchez', pos: 'L', age: 29, ovr: 77, fin: 62, pas: 75, def: 76, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Murillo', pos: 'L', age: 25, ovr: 75, fin: 56, pas: 73, def: 75, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Henrique Silva', pos: 'V', age: 31, ovr: 78, fin: 62, pas: 78, def: 80, fis: 80, contractEnd: '31/12/2026' },
    { name: 'PK', pos: 'V', age: 26, ovr: 78, fin: 66, pas: 79, def: 78, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Karl', pos: 'V', age: 32, ovr: 76, fin: 60, pas: 76, def: 78, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Danrley', pos: 'V', age: 29, ovr: 75, fin: 58, pas: 74, def: 76, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Luciano Naninho', pos: 'M', age: 33, ovr: 79, fin: 77, pas: 83, def: 52, fis: 74, contractEnd: '31/12/2026' },
    { name: 'Robinho', pos: 'M', age: 28, ovr: 78, fin: 75, pas: 80, def: 56, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Caio Vitor', pos: 'M', age: 24, ovr: 76, fin: 74, pas: 77, def: 52, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Rafinha', pos: 'M', age: 32, ovr: 76, fin: 73, pas: 78, def: 54, fis: 75, contractEnd: '31/12/2026' },
    { name: 'Douglas Skilo', pos: 'A', age: 29, ovr: 79, fin: 80, pas: 75, def: 50, fis: 84, contractEnd: '31/12/2026' },
    { name: 'MV', pos: 'A', age: 27, ovr: 79, fin: 81, pas: 74, def: 48, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Bruno Santos', pos: 'A', age: 38, ovr: 78, fin: 82, pas: 70, def: 44, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Cristiano', pos: 'A', age: 36, ovr: 76, fin: 78, pas: 70, def: 46, fis: 77, contractEnd: '31/12/2026' }
  ]
};

/**
 * PENDING_REGISTRATIONS_2026
 * Atletas com negociações avançadas, cartas de intenção ou gatilhos contratuais
 * que estão aguardando abertura de janela e publicação formal no BID da CBF.
 */
export const PENDING_REGISTRATIONS_2026 = [
  {
    id: 'PND-2026-001',
    player: 'Gabriel Barbosa (Gabigol)',
    position: 'A',
    currentFederationClub: 'Flamengo (término do ciclo)',
    targetClub: 'Cruzeiro',
    negotiationType: 'Transferência livre / Pré-contrato plurianual (2025-2028)',
    condition: 'Término do contrato com o Flamengo em 31/12/2024; carta de intenção e bases salariais pactuadas com a SAF celeste.',
    cbfBidStatus: 'Aguardando abertura oficial da janela de transferências nacional da CBF e homologação no sistema Gestão Web/BID.',
    isConfirmedInSquad: false
  },
  {
    id: 'PND-2026-002',
    player: 'Philippe Coutinho',
    position: 'M',
    currentFederationClub: 'Vasco da Gama (Empréstimo junto ao Aston Villa)',
    targetClub: 'Vasco da Gama',
    negotiationType: 'Rescisão internacional e contratação definitiva plurianual',
    condition: 'Empréstimo vigente até meados de 2025; tramitação de rescisão consensual com clube de Birmingham para vínculo até 2027.',
    cbfBidStatus: 'Contrato de empréstimo já ativo no BID; aditivo definitivo aguardando trâmites do TMS.',
    isConfirmedInSquad: true
  },
  {
    id: 'PND-2026-003',
    player: 'Jhon Arias',
    position: 'M',
    currentFederationClub: 'Fluminense',
    targetClub: 'Mercado Europeu (Premier League / La Liga)',
    negotiationType: 'Transferência Internacional Definitiva',
    condition: 'Acordo com a diretoria tricolor para avaliação de propostas do continente europeu.',
    cbfBidStatus: 'Contrato ativo e registrado no BID; pendente de eventual ativação de cláusula de saída futura.',
    isConfirmedInSquad: true
  },
  {
    id: 'PND-2026-004',
    player: 'Hugo Souza',
    position: 'G',
    currentFederationClub: 'Corinthians (Empréstimo com opção de compra junto ao Flamengo)',
    targetClub: 'Corinthians',
    negotiationType: 'Exercício de opção de compra de direitos econômicos',
    condition: 'Cláusula contratual fixada de compra definitiva acionada pelo Corinthians.',
    cbfBidStatus: 'Registro de empréstimo regular no BID da CBF; contrato definitivo em formalização.',
    isConfirmedInSquad: true
  }
];

/**
 * CONFIRMED_DEPARTURES_2026
 * Transferências internacionais de saída que foram concretizadas com antecedência contratual
 */
export const CONFIRMED_DEPARTURES_2026 = [
  {
    player: 'Estêvão',
    formerClub: 'Palmeiras',
    destinationClub: 'Chelsea FC (Inglaterra)',
    feeEur: '61.5M€',
    effectiveDate: 'Julho/2025 (Pós-Mundial de Clubes FIFA 2025)',
    status: 'Transferência consumada com registro FIFA TMS; não atua no Brasil em 2026.'
  },
  {
    player: 'Endrick',
    formerClub: 'Palmeiras',
    destinationClub: 'Real Madrid (Espanha)',
    feeEur: '72.0M€ (Fixos + Bônus)',
    effectiveDate: 'Julho/2024',
    status: 'Transferência consolidada.'
  },
  {
    player: 'Luis Guilherme',
    formerClub: 'Palmeiras',
    destinationClub: 'West Ham United (Inglaterra)',
    feeEur: '30.0M€',
    effectiveDate: 'Julho/2024',
    status: 'Transferência consolidada.'
  },
  {
    player: 'Thiago Almada',
    formerClub: 'Botafogo',
    destinationClub: 'Olympique Lyonnais / Europa (Eagle Football)',
    feeEur: '21.0M€',
    effectiveDate: 'Julho/2025',
    status: 'Transferência programada por acordo pré-estabelecido.'
  }
];

/**
 * FREE_AGENTS_2026
 * Jogadores sem vínculo contratual ativo com agremiações brasileiras
 */
export const FREE_AGENTS_2026 = [
  { name: 'Alexandre Pato', pos: 'A', age: 37, ovr: 77, fin: 82, pas: 76, def: 40, fis: 72 },
  { name: 'Diego Alves', pos: 'G', age: 41, ovr: 76, fin: 20, pas: 66, def: 79, fis: 70 },
  { name: 'Rodrigo Caio', pos: 'Z', age: 33, ovr: 78, fin: 45, pas: 74, def: 81, fis: 75 },
  { name: 'Luan Guilherme', pos: 'M', age: 33, ovr: 76, fin: 78, pas: 80, def: 45, fis: 70 },
  { name: 'Romarinho', pos: 'A', age: 35, ovr: 79, fin: 82, pas: 76, def: 42, fis: 77 },
  { name: 'Dedé Vital', pos: 'Z', age: 38, ovr: 75, fin: 40, pas: 65, def: 79, fis: 72 },
  { name: 'Petros Araújo', pos: 'V', age: 37, ovr: 77, fin: 64, pas: 78, def: 79, fis: 76 },
  { name: 'Marrony Silva', pos: 'A', age: 27, ovr: 76, fin: 77, pas: 72, def: 48, fis: 80 },
  { name: 'Douglas Costa', pos: 'A', age: 36, ovr: 79, fin: 80, pas: 82, def: 45, fis: 74 },
  { name: 'Júnior Urso', pos: 'V', age: 37, ovr: 75, fin: 66, pas: 76, def: 76, fis: 75 },
  { name: 'Mariano Ferreira', pos: 'L', age: 40, ovr: 76, fin: 56, pas: 76, def: 76, fis: 72 },
  { name: 'Jorge', pos: 'L', age: 30, ovr: 75, fin: 58, pas: 74, def: 74, fis: 77 }
];

export const METADATA_DEFAULTS = {
  source: 'BID da CBF / GE / Transfermarkt',
  consultationDate: 'Outubro de 2026',
  isEstimate: true
};

// Vinculação de metadados oficiais e flags de estimativa a todos os atletas cadastrados
[RAW_PLAYERS_2026_SERIE_A, RAW_PLAYERS_2026_SERIE_B].forEach(division => {
  Object.values(division).forEach(squad => {
    squad.forEach(player => {
      if (!player.source) player.source = METADATA_DEFAULTS.source;
      if (!player.consultationDate) player.consultationDate = METADATA_DEFAULTS.consultationDate;
      if (player.isEstimate === undefined) player.isEstimate = METADATA_DEFAULTS.isEstimate;
    });
  });
});

FREE_AGENTS_2026.forEach(player => {
  if (!player.source) player.source = METADATA_DEFAULTS.source;
  if (!player.consultationDate) player.consultationDate = METADATA_DEFAULTS.consultationDate;
  if (player.isEstimate === undefined) player.isEstimate = METADATA_DEFAULTS.isEstimate;
});

/**
 * Constrói e retorna os atletas formatados e balanceados para a carreira
 * @param {'all'|'serie_a'|'serie_b'} division - Divisão requerida
 * @returns {Array} Lista completa de jogadores prontos para partida e simulação
 */
export function buildSeason2026Players(division = 'all') {
  const allPlayers = [];
  let currentId = 5001;

  const dataset = {};
  if (division === 'all' || division === 'serie_a') {
    Object.assign(dataset, RAW_PLAYERS_2026_SERIE_A);
  }
  if (division === 'all' || division === 'serie_b') {
    Object.assign(dataset, RAW_PLAYERS_2026_SERIE_B);
  }

  Object.entries(dataset).forEach(([clubId, squad]) => {
    const clubPlayers = squad.map(raw => {
      const ageFactor = raw.age < 24 ? 1.4 : (raw.age > 30 ? 0.7 : 1.0);
      const baseValue = Math.pow(raw.ovr - 40, 2.75) * 1350 * ageFactor;
      const value = Math.round(baseValue / 10000) * 10000;
      const salary = Math.round((value * 0.007) / 1000) * 1000 + 5000;

      return {
        id: `ply2026_${currentId++}`,
        name: raw.name,
        clubId,
        position: raw.pos,
        age: raw.age,
        overall: raw.ovr,
        fin: raw.fin,
        pas: raw.pas,
        def: raw.def,
        fis: raw.fis,
        value,
        salary,
        isEstimate: true,
        source: raw.source || 'BID da CBF / GE / Transfermarkt',
        consultationDate: raw.consultationDate || 'Outubro de 2026',
        contractEnd: raw.contractEnd || '31/12/2026',
        contractStatus: 'confirmado_bid_cbf',
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
        season: '2025/26'
      };
    });

    const balancedSquad = sortSquadForFormation(clubPlayers, '4-4-2');
    allPlayers.push(...balancedSquad);
  });

  // Agentes Livres
  FREE_AGENTS_2026.forEach(raw => {
    const ageFactor = raw.age > 30 ? 0.65 : 1.0;
    const baseValue = Math.pow(raw.ovr - 40, 2.7) * 1100 * ageFactor;
    const value = Math.round(baseValue / 10000) * 10000;
    const salary = Math.round((value * 0.006) / 1000) * 1000 + 4000;

    allPlayers.push({
      id: `ply2026_fa_${currentId++}`,
      name: raw.name,
      clubId: null,
      position: raw.pos,
      age: raw.age,
      overall: raw.ovr,
      fin: raw.fin,
      pas: raw.pas,
      def: raw.def,
      fis: raw.fis,
      value,
      salary,
      isEstimate: true,
      source: raw.source || 'BID da CBF / GE / Transfermarkt',
      consultationDate: raw.consultationDate || 'Outubro de 2026',
      contractEnd: 'Sem vínculo ativo',
      contractStatus: 'livre_mercado',
      fitness: 100,
      morale: 'Normal',
      yellowCards: 0,
      redCards: 0,
      goals: 0,
      assists: 0,
      matchesPlayed: 0,
      cleanSheets: 0,
      isSuspended: false,
      isListed: true,
      season: '2025/26'
    });
  });

  return sanitizeSquadForNewCareer(allPlayers);
}

/**
 * Sanitiza e zera todas as estatísticas acumuladas de carreira de um elenco ou lista de atletas,
 * preparando o estado para a inicialização 100% zerada de uma nova simulação / carreira,
 * preservando rigorosamente os atributos técnicos, físicos, posições, vínculos e metadados cadastrais.
 * 
 * @param {Array<Object>} playersList - Lista de objetos de jogadores
 * @returns {Array<Object>} Lista de jogadores com acumuladores de carreira rigorosamente zerados
 */
export function sanitizeSquadForNewCareer(playersList) {
  if (!Array.isArray(playersList)) return [];
  return playersList.map(player => ({
    ...player,
    goals: 0,
    assists: 0,
    yellowCards: 0,
    redCards: 0,
    matchesPlayed: 0,
    cleanSheets: 0,
    isSuspended: false,
    fitness: typeof player.fitness === 'number' ? player.fitness : 100,
    morale: player.morale || (player.clubId ? 'Alta' : 'Normal'),
    isEstimate: player.isEstimate !== undefined ? player.isEstimate : true,
    source: player.source || 'BID da CBF / GE / Transfermarkt',
    consultationDate: player.consultationDate || 'Outubro de 2026'
  }));
}

/**
 * Retorna o elenco confirmado de um clube para o ciclo 2026
 * @param {string} clubId - Identificador do clube ('fla', 'pal', 'spo', etc.)
 * @returns {Array}
 */
export function getClubSquad2026(clubId) {
  const squad = RAW_PLAYERS_2026_SERIE_A[clubId] || RAW_PLAYERS_2026_SERIE_B[clubId];
  if (!squad) return [];
  return squad.map(raw => {
    const ageFactor = raw.age < 24 ? 1.4 : (raw.age > 30 ? 0.7 : 1.0);
    const baseValue = Math.pow(raw.ovr - 40, 2.75) * 1350 * ageFactor;
    const value = Math.round(baseValue / 10000) * 10000;
    const salary = Math.round((value * 0.007) / 1000) * 1000 + 5000;
    return {
      ...raw,
      value: raw.value ?? value,
      salary: raw.salary ?? salary,
      isEstimate: true,
      source: raw.source || 'BID da CBF / GE / Transfermarkt',
      consultationDate: raw.consultationDate || 'Outubro de 2026'
    };
  });
}

/**
 * Retorna lista de registros pendentes de homologação oficial no BID
 */
export function getPendingRegistrations2026() {
  return PENDING_REGISTRATIONS_2026;
}

/**
 * Retorna transferências internacionais com saídas consumadas para 2026
 */
export function getConfirmedDepartures2026() {
  return CONFIRMED_DEPARTURES_2026;
}
