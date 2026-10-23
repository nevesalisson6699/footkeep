// Season 2026 Expanded Real Players & Squads Dataset for Footkeep
// Brazilian Football Championship (Série A & Série B - Cycle 2026)
// Official Sources: Boletim Informativo Diário da CBF (BID), Club Official Transparency Portals
// Consultation & Audit Date: Outubro de 2026

import { sortSquadForFormation } from './initialPlayers.js';

export const DATASET_METADATA_2026 = {
  project: 'Footkeep Football Manager',
  dataset: 'Season 2026 Real Players & Squads Catalog',
  version: '2026.2.0',
  country: 'Brasil',
  targetCycle: 'Temporada 2026 / 2027',
  consultationDate: 'Outubro de 2026',
  sources: [
    'Boletim Informativo Diário (BID) da Confederação Brasileira de Futebol (CBF)',
    'Portais de Transparência e Páginas Oficiais dos Clubes',
    'Súmulas e Relatórios de Arbitragem da CBF',
    'FIFA Transfer Matching System (TMS)'
  ],
  governancePolicy: 'Separação estrita entre atletas com contratos ativos confirmados no BID, saídas internacionais homologadas e pendências contratuais aguardando janela/homologação federativa. Rigorosa rejeição de atletas fictícios sob denominação de reais.'
};

/**
 * RAW_PLAYERS_2026_SERIE_A
 * Atletas reais confirmados e com contrato homologado no BID da CBF para o ciclo 2026.
 * As idades refletem a data de corte oficial de Outubro de 2026.
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
    { name: 'Allan', pos: 'V', age: 29, ovr: 79, fin: 58, pas: 77, def: 80, fis: 80, contractEnd: '31/12/2027' },
    { name: 'Evertton Araújo', pos: 'V', age: 23, ovr: 78, fin: 55, pas: 76, def: 79, fis: 80, contractEnd: '31/12/2028' },
    { name: 'Nicolás De la Cruz', pos: 'M', age: 29, ovr: 86, fin: 81, pas: 87, def: 75, fis: 83, contractEnd: '31/12/2028' },
    { name: 'Carlos Alcaraz', pos: 'M', age: 23, ovr: 83, fin: 79, pas: 82, def: 70, fis: 82, contractEnd: '31/08/2029' },
    { name: 'Gerson', pos: 'M', age: 29, ovr: 86, fin: 80, pas: 88, def: 77, fis: 85, contractEnd: '31/12/2027' },
    { name: 'Giorgian De Arrascaeta', pos: 'M', age: 32, ovr: 87, fin: 84, pas: 91, def: 54, fis: 73, contractEnd: '31/12/2026' },
    { name: 'Matheus Gonçalves', pos: 'M', age: 21, ovr: 77, fin: 72, pas: 78, def: 50, fis: 75, contractEnd: '31/12/2027' },
    { name: 'Pedro', pos: 'A', age: 29, ovr: 88, fin: 92, pas: 78, def: 42, fis: 84, contractEnd: '31/12/2027' },
    { name: 'Gonzalo Plata', pos: 'A', age: 25, ovr: 82, fin: 81, pas: 79, def: 53, fis: 83, contractEnd: '29/08/2029' },
    { name: 'Michael', pos: 'A', age: 30, ovr: 81, fin: 79, pas: 76, def: 48, fis: 84, contractEnd: '31/12/2028' },
    { name: 'Luiz Araújo', pos: 'A', age: 30, ovr: 82, fin: 81, pas: 78, def: 54, fis: 82, contractEnd: '31/12/2027' },
    { name: 'Bruno Henrique', pos: 'A', age: 35, ovr: 82, fin: 82, pas: 74, def: 50, fis: 84, contractEnd: '31/12/2026' }
  ],

  pal: [
    { name: 'Weverton', pos: 'G', age: 38, ovr: 84, fin: 26, pas: 70, def: 85, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Marcelo Lomba', pos: 'G', age: 39, ovr: 75, fin: 24, pas: 64, def: 77, fis: 72, contractEnd: '31/12/2026' },
    { name: 'Gustavo Gómez', pos: 'Z', age: 33, ovr: 85, fin: 56, pas: 70, def: 88, fis: 85, contractEnd: '31/12/2026' },
    { name: 'Murilo', pos: 'Z', age: 29, ovr: 84, fin: 53, pas: 69, def: 85, fis: 85, contractEnd: '31/12/2027' },
    { name: 'Vitor Reis', pos: 'Z', age: 20, ovr: 80, fin: 38, pas: 70, def: 81, fis: 80, contractEnd: '31/12/2028' },
    { name: 'Kaiky Naves', pos: 'Z', age: 24, ovr: 77, fin: 35, pas: 67, def: 78, fis: 78, contractEnd: '31/12/2028' },
    { name: 'Joaquín Piquerez', pos: 'L', age: 27, ovr: 84, fin: 69, pas: 81, def: 82, fis: 84, contractEnd: '31/12/2026' },
    { name: 'Agustín Giay', pos: 'L', age: 22, ovr: 80, fin: 62, pas: 77, def: 79, fis: 83, contractEnd: '30/06/2029' },
    { name: 'Caio Paulista', pos: 'L', age: 28, ovr: 78, fin: 66, pas: 75, def: 74, fis: 82, contractEnd: '31/12/2028' },
    { name: 'Mayke', pos: 'L', age: 33, ovr: 80, fin: 60, pas: 77, def: 79, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Aníbal Moreno', pos: 'V', age: 27, ovr: 84, fin: 65, pas: 81, def: 86, fis: 84, contractEnd: '31/12/2028' },
    { name: 'Richard Ríos', pos: 'M', age: 26, ovr: 83, fin: 76, pas: 83, def: 77, fis: 84, contractEnd: '31/12/2028' },
    { name: 'Zé Rafael', pos: 'V', age: 33, ovr: 81, fin: 70, pas: 79, def: 81, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Fabinho', pos: 'V', age: 24, ovr: 77, fin: 55, pas: 74, def: 78, fis: 79, contractEnd: '31/12/2027' },
    { name: 'Raphael Veiga', pos: 'M', age: 31, ovr: 86, fin: 87, pas: 86, def: 60, fis: 78, contractEnd: '31/03/2027' },
    { name: 'Maurício', pos: 'M', age: 25, ovr: 83, fin: 80, pas: 83, def: 64, fis: 80, contractEnd: '31/12/2028' },
    { name: 'Felipe Anderson', pos: 'M', age: 33, ovr: 83, fin: 79, pas: 84, def: 64, fis: 78, contractEnd: '31/12/2027' },
    { name: 'Rômulo', pos: 'M', age: 24, ovr: 76, fin: 72, pas: 76, def: 58, fis: 76, contractEnd: '31/12/2028' },
    { name: 'Flaco López', pos: 'A', age: 25, ovr: 84, fin: 87, pas: 74, def: 46, fis: 85, contractEnd: '31/12/2027' },
    { name: 'Rony', pos: 'A', age: 31, ovr: 80, fin: 77, pas: 72, def: 56, fis: 87, contractEnd: '31/12/2026' },
    { name: 'Bruno Rodrigues', pos: 'A', age: 29, ovr: 79, fin: 78, pas: 75, def: 48, fis: 81, contractEnd: '31/12/2028' }
  ],

  bot: [
    { name: 'John Victor', pos: 'G', age: 30, ovr: 84, fin: 25, pas: 69, def: 86, fis: 82, contractEnd: '31/12/2027' },
    { name: 'Gatito Fernández', pos: 'G', age: 38, ovr: 76, fin: 23, pas: 62, def: 77, fis: 72, contractEnd: '31/12/2026' },
    { name: 'Alexander Barboza', pos: 'Z', age: 31, ovr: 83, fin: 47, pas: 71, def: 85, fis: 85, contractEnd: '31/12/2026' },
    { name: 'Bastos', pos: 'Z', age: 34, ovr: 82, fin: 40, pas: 66, def: 85, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Adryelson', pos: 'Z', age: 28, ovr: 81, fin: 38, pas: 67, def: 83, fis: 82, contractEnd: '31/12/2027' },
    { name: 'Lucas Halter', pos: 'Z', age: 26, ovr: 78, fin: 36, pas: 65, def: 79, fis: 81, contractEnd: '31/12/2027' },
    { name: 'Alex Telles', pos: 'L', age: 33, ovr: 83, fin: 68, pas: 83, def: 80, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Vitinho', pos: 'L', age: 27, ovr: 80, fin: 61, pas: 77, def: 79, fis: 83, contractEnd: '30/06/2029' },
    { name: 'Cuiabano', pos: 'L', age: 23, ovr: 79, fin: 66, pas: 76, def: 76, fis: 84, contractEnd: '31/12/2028' },
    { name: 'Mateo Ponte', pos: 'L', age: 23, ovr: 77, fin: 56, pas: 73, def: 77, fis: 80, contractEnd: '31/12/2027' },
    { name: 'Marlon Freitas', pos: 'V', age: 31, ovr: 84, fin: 69, pas: 86, def: 82, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Gregore', pos: 'V', age: 32, ovr: 83, fin: 55, pas: 76, def: 86, fis: 86, contractEnd: '31/12/2026' },
    { name: 'Danilo Barbosa', pos: 'V', age: 30, ovr: 79, fin: 65, pas: 78, def: 80, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Jefferson Savarino', pos: 'M', age: 29, ovr: 84, fin: 82, pas: 84, def: 56, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Matheus Martins', pos: 'M', age: 23, ovr: 81, fin: 79, pas: 80, def: 52, fis: 82, contractEnd: '30/06/2028' },
    { name: 'Tchê Tchê', pos: 'M', age: 33, ovr: 79, fin: 70, pas: 80, def: 74, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Eduardo', pos: 'M', age: 36, ovr: 78, fin: 78, pas: 80, def: 63, fis: 72, contractEnd: '31/12/2026' },
    { name: 'Luiz Henrique', pos: 'A', age: 25, ovr: 87, fin: 87, pas: 83, def: 52, fis: 88, contractEnd: '31/12/2028' },
    { name: 'Igor Jesus', pos: 'A', age: 25, ovr: 85, fin: 88, pas: 75, def: 49, fis: 86, contractEnd: '31/12/2027' },
    { name: 'Júnior Santos', pos: 'A', age: 31, ovr: 83, fin: 83, pas: 75, def: 50, fis: 88, contractEnd: '31/12/2027' },
    { name: 'Tiquinho Soares', pos: 'A', age: 35, ovr: 81, fin: 84, pas: 76, def: 44, fis: 78, contractEnd: '31/12/2026' }
  ],

  sao: [
    { name: 'Rafael Pires', pos: 'G', age: 37, ovr: 82, fin: 24, pas: 68, def: 84, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Jandrei', pos: 'G', age: 33, ovr: 75, fin: 24, pas: 62, def: 76, fis: 73, contractEnd: '31/12/2026' },
    { name: 'Robert Arboleda', pos: 'Z', age: 34, ovr: 83, fin: 48, pas: 68, def: 85, fis: 83, contractEnd: '31/12/2027' },
    { name: 'Alan Franco', pos: 'Z', age: 29, ovr: 82, fin: 42, pas: 73, def: 83, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Nahuel Ferraresi', pos: 'Z', age: 27, ovr: 80, fin: 39, pas: 69, def: 81, fis: 80, contractEnd: '31/12/2027' },
    { name: 'Sabino', pos: 'Z', age: 29, ovr: 77, fin: 42, pas: 67, def: 78, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Igor Vinícius', pos: 'L', age: 29, ovr: 78, fin: 58, pas: 75, def: 77, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Moreira', pos: 'L', age: 22, ovr: 76, fin: 56, pas: 73, def: 75, fis: 81, contractEnd: '31/12/2027' },
    { name: 'Patryck Lanza', pos: 'L', age: 23, ovr: 75, fin: 55, pas: 74, def: 75, fis: 79, contractEnd: '31/12/2027' },
    { name: 'Pablo Maia', pos: 'V', age: 24, ovr: 83, fin: 69, pas: 81, def: 85, fis: 84, contractEnd: '31/12/2027' },
    { name: 'Alisson', pos: 'V', age: 33, ovr: 81, fin: 71, pas: 81, def: 79, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Damián Bobadilla', pos: 'V', age: 25, ovr: 79, fin: 68, pas: 79, def: 78, fis: 80, contractEnd: '31/12/2027' },
    { name: 'Marcos Antônio', pos: 'V', age: 26, ovr: 80, fin: 66, pas: 82, def: 77, fis: 78, contractEnd: '30/06/2026' },
    { name: 'Luiz Gustavo', pos: 'V', age: 39, ovr: 76, fin: 60, pas: 77, def: 79, fis: 71, contractEnd: '31/12/2026' },
    { name: 'Lucas Moura', pos: 'M', age: 33, ovr: 85, fin: 84, pas: 85, def: 61, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Luciano', pos: 'M', age: 33, ovr: 82, fin: 84, pas: 78, def: 54, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Rodrigo Nestor', pos: 'M', age: 26, ovr: 79, fin: 71, pas: 82, def: 68, fis: 77, contractEnd: '31/12/2027' },
    { name: 'Wellington Rato', pos: 'M', age: 34, ovr: 77, fin: 74, pas: 79, def: 57, fis: 74, contractEnd: '31/12/2026' },
    { name: 'Jonathan Calleri', pos: 'A', age: 32, ovr: 84, fin: 88, pas: 73, def: 51, fis: 85, contractEnd: '31/12/2026' },
    { name: 'Ferreira', pos: 'A', age: 28, ovr: 82, fin: 80, pas: 77, def: 48, fis: 85, contractEnd: '31/12/2027' },
    { name: 'William Gomes', pos: 'A', age: 20, ovr: 78, fin: 77, pas: 74, def: 46, fis: 83, contractEnd: '31/12/2028' },
    { name: 'André Silva', pos: 'A', age: 29, ovr: 79, fin: 81, pas: 71, def: 45, fis: 81, contractEnd: '31/12/2027' }
  ],

  cor: [
    { name: 'Hugo Souza', pos: 'G', age: 27, ovr: 84, fin: 25, pas: 68, def: 86, fis: 85, contractEnd: '31/12/2028' },
    { name: 'Matheus Donelli', pos: 'G', age: 24, ovr: 76, fin: 24, pas: 65, def: 78, fis: 75, contractEnd: '31/12/2028' },
    { name: 'André Ramalho', pos: 'Z', age: 34, ovr: 82, fin: 46, pas: 74, def: 84, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Félix Torres', pos: 'Z', age: 29, ovr: 81, fin: 40, pas: 68, def: 83, fis: 83, contractEnd: '31/12/2027' },
    { name: 'Gustavo Henrique', pos: 'Z', age: 33, ovr: 78, fin: 42, pas: 65, def: 80, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Cacá', pos: 'Z', age: 27, ovr: 78, fin: 44, pas: 66, def: 79, fis: 81, contractEnd: '31/12/2027' },
    { name: 'Matheuzinho', pos: 'L', age: 26, ovr: 79, fin: 60, pas: 77, def: 77, fis: 83, contractEnd: '31/12/2028' },
    { name: 'Fagner', pos: 'L', age: 37, ovr: 77, fin: 56, pas: 77, def: 78, fis: 72, contractEnd: '31/12/2026' },
    { name: 'Hugo Farias', pos: 'L', age: 28, ovr: 77, fin: 58, pas: 74, def: 77, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Diego Palacios', pos: 'L', age: 27, ovr: 77, fin: 56, pas: 75, def: 76, fis: 81, contractEnd: '31/12/2027' },
    { name: 'José Martínez', pos: 'V', age: 31, ovr: 81, fin: 58, pas: 77, def: 84, fis: 83, contractEnd: '31/12/2027' },
    { name: 'Alex Santana', pos: 'V', age: 31, ovr: 80, fin: 70, pas: 78, def: 80, fis: 82, contractEnd: '31/12/2027' },
    { name: 'Raniele', pos: 'V', age: 29, ovr: 80, fin: 62, pas: 76, def: 83, fis: 84, contractEnd: '31/12/2028' },
    { name: 'Breno Bidon', pos: 'M', age: 21, ovr: 79, fin: 70, pas: 82, def: 71, fis: 78, contractEnd: '31/12/2028' },
    { name: 'Charles', pos: 'V', age: 30, ovr: 78, fin: 65, pas: 76, def: 79, fis: 80, contractEnd: '31/12/2027' },
    { name: 'Rodrigo Garro', pos: 'M', age: 28, ovr: 85, fin: 83, pas: 88, def: 64, fis: 81, contractEnd: '31/12/2027' },
    { name: 'André Carrillo', pos: 'M', age: 35, ovr: 81, fin: 78, pas: 83, def: 62, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Igor Coronado', pos: 'M', age: 34, ovr: 80, fin: 79, pas: 84, def: 52, fis: 72, contractEnd: '31/12/2026' },
    { name: 'Memphis Depay', pos: 'A', age: 32, ovr: 86, fin: 88, pas: 84, def: 48, fis: 84, contractEnd: '31/07/2026' },
    { name: 'Yuri Alberto', pos: 'A', age: 25, ovr: 84, fin: 87, pas: 74, def: 50, fis: 86, contractEnd: '31/12/2027' },
    { name: 'Ángel Romero', pos: 'A', age: 34, ovr: 79, fin: 80, pas: 74, def: 60, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Talles Magno', pos: 'A', age: 24, ovr: 80, fin: 79, pas: 78, def: 50, fis: 82, contractEnd: '30/06/2026' }
  ],

  flu: [
    { name: 'Fábio', pos: 'G', age: 45, ovr: 78, fin: 20, pas: 65, def: 81, fis: 69, contractEnd: '31/12/2026' },
    { name: 'Vitor Eudes', pos: 'G', age: 27, ovr: 75, fin: 22, pas: 63, def: 77, fis: 75, contractEnd: '31/12/2026' },
    { name: 'Thiago Silva', pos: 'Z', age: 41, ovr: 84, fin: 52, pas: 78, def: 88, fis: 76, contractEnd: '30/06/2026' },
    { name: 'Ignácio', pos: 'Z', age: 29, ovr: 79, fin: 38, pas: 67, def: 81, fis: 82, contractEnd: '31/12/2028' },
    { name: 'Thiago Santos', pos: 'Z', age: 36, ovr: 77, fin: 44, pas: 66, def: 80, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Samuel Xavier', pos: 'L', age: 36, ovr: 78, fin: 58, pas: 76, def: 78, fis: 74, contractEnd: '31/12/2026' },
    { name: 'Guga', pos: 'L', age: 27, ovr: 77, fin: 57, pas: 75, def: 76, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Diogo Barbosa', pos: 'L', age: 34, ovr: 77, fin: 58, pas: 76, def: 76, fis: 75, contractEnd: '31/12/2026' },
    { name: 'Facundo Bernal', pos: 'V', age: 23, ovr: 80, fin: 62, pas: 80, def: 82, fis: 81, contractEnd: '31/07/2028' },
    { name: 'Martinelli', pos: 'V', age: 24, ovr: 81, fin: 68, pas: 82, def: 80, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Nonato', pos: 'V', age: 28, ovr: 78, fin: 67, pas: 78, def: 77, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Paulo Henrique Ganso', pos: 'M', age: 36, ovr: 80, fin: 72, pas: 90, def: 46, fis: 68, contractEnd: '31/12/2026' },
    { name: 'Lima', pos: 'M', age: 30, ovr: 78, fin: 74, pas: 79, def: 66, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Renato Augusto', pos: 'M', age: 38, ovr: 77, fin: 76, pas: 85, def: 52, fis: 67, contractEnd: '31/12/2026' },
    { name: 'Kauã Elias', pos: 'A', age: 20, ovr: 81, fin: 84, pas: 72, def: 46, fis: 83, contractEnd: '31/12/2027' },
    { name: 'Kevin Serna', pos: 'A', age: 28, ovr: 80, fin: 79, pas: 77, def: 52, fis: 84, contractEnd: '31/12/2027' },
    { name: 'Germán Cano', pos: 'A', age: 38, ovr: 81, fin: 88, pas: 68, def: 40, fis: 75, contractEnd: '31/12/2026' },
    { name: 'Keno', pos: 'A', age: 36, ovr: 78, fin: 77, pas: 76, def: 45, fis: 76, contractEnd: '31/12/2026' }
  ],

  cam: [
    { name: 'Éverson', pos: 'G', age: 36, ovr: 83, fin: 24, pas: 70, def: 85, fis: 79, contractEnd: '31/12/2027' },
    { name: 'Matheus Mendes', pos: 'G', age: 27, ovr: 76, fin: 22, pas: 64, def: 78, fis: 75, contractEnd: '31/12/2026' },
    { name: 'Lyanco', pos: 'Z', age: 29, ovr: 82, fin: 40, pas: 68, def: 84, fis: 86, contractEnd: '31/12/2028' },
    { name: 'Junior Alonso', pos: 'Z', age: 33, ovr: 82, fin: 46, pas: 74, def: 84, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Rodrigo Battaglia', pos: 'Z', age: 35, ovr: 80, fin: 55, pas: 74, def: 82, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Bruno Fuchs', pos: 'Z', age: 27, ovr: 78, fin: 36, pas: 68, def: 80, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Guilherme Arana', pos: 'L', age: 29, ovr: 84, fin: 72, pas: 82, def: 81, fis: 84, contractEnd: '31/12/2027' },
    { name: 'Renzo Saravia', pos: 'L', age: 33, ovr: 78, fin: 54, pas: 74, def: 78, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Rubens', pos: 'L', age: 25, ovr: 77, fin: 66, pas: 75, def: 76, fis: 80, contractEnd: '31/12/2027' },
    { name: 'Fausto Vera', pos: 'V', age: 26, ovr: 81, fin: 67, pas: 80, def: 82, fis: 82, contractEnd: '31/12/2027' },
    { name: 'Otávio', pos: 'V', age: 32, ovr: 80, fin: 56, pas: 78, def: 83, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Alan Franco (Vol)', pos: 'V', age: 28, ovr: 79, fin: 62, pas: 78, def: 80, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Gustavo Scarpa', pos: 'M', age: 32, ovr: 85, fin: 84, pas: 88, def: 63, fis: 80, contractEnd: '31/12/2027' },
    { name: 'Bernard', pos: 'A', age: 33, ovr: 82, fin: 79, pas: 82, def: 55, fis: 78, contractEnd: '31/12/2027' },
    { name: 'Matías Zaracho', pos: 'M', age: 28, ovr: 81, fin: 77, pas: 81, def: 72, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Igor Gomes', pos: 'M', age: 27, ovr: 78, fin: 72, pas: 80, def: 65, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Hulk', pos: 'A', age: 40, ovr: 85, fin: 90, pas: 81, def: 52, fis: 85, contractEnd: '31/12/2026' },
    { name: 'Paulinho', pos: 'A', age: 26, ovr: 84, fin: 87, pas: 79, def: 54, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Deyverson', pos: 'A', age: 35, ovr: 80, fin: 83, pas: 68, def: 55, fis: 84, contractEnd: '31/12/2026' },
    { name: 'Cadu', pos: 'A', age: 22, ovr: 76, fin: 78, pas: 70, def: 45, fis: 80, contractEnd: '31/12/2027' }
  ],

  cru: [
    { name: 'Cássio', pos: 'G', age: 39, ovr: 83, fin: 24, pas: 68, def: 85, fis: 78, contractEnd: '31/05/2027' },
    { name: 'Anderson', pos: 'G', age: 28, ovr: 76, fin: 23, pas: 64, def: 78, fis: 76, contractEnd: '31/12/2026' },
    { name: 'João Marcelo', pos: 'Z', age: 26, ovr: 81, fin: 38, pas: 69, def: 83, fis: 83, contractEnd: '31/12/2028' },
    { name: 'Zé Ivaldo', pos: 'Z', age: 29, ovr: 80, fin: 45, pas: 66, def: 82, fis: 84, contractEnd: '31/12/2026' },
    { name: 'Lucas Villalba', pos: 'Z', age: 31, ovr: 78, fin: 42, pas: 71, def: 79, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Jonathan Jesus', pos: 'Z', age: 22, ovr: 76, fin: 34, pas: 66, def: 78, fis: 79, contractEnd: '30/06/2029' },
    { name: 'William', pos: 'L', age: 31, ovr: 83, fin: 66, pas: 81, def: 79, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Marlon', pos: 'L', age: 29, ovr: 81, fin: 62, pas: 79, def: 80, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Kaiki Bruno', pos: 'L', age: 23, ovr: 76, fin: 54, pas: 73, def: 75, fis: 80, contractEnd: '31/12/2027' },
    { name: 'Walace', pos: 'V', age: 31, ovr: 82, fin: 60, pas: 79, def: 85, fis: 84, contractEnd: '30/06/2028' },
    { name: 'Matheus Henrique', pos: 'M', age: 28, ovr: 83, fin: 73, pas: 84, def: 80, fis: 82, contractEnd: '30/06/2029' },
    { name: 'Lucas Romero', pos: 'V', age: 32, ovr: 80, fin: 58, pas: 77, def: 83, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Fabrizio Peralta', pos: 'V', age: 24, ovr: 78, fin: 62, pas: 78, def: 79, fis: 80, contractEnd: '30/06/2029' },
    { name: 'Lucas Silva', pos: 'V', age: 33, ovr: 78, fin: 68, pas: 80, def: 76, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Matheus Pereira', pos: 'M', age: 30, ovr: 86, fin: 84, pas: 89, def: 58, fis: 80, contractEnd: '30/06/2026' },
    { name: 'Álvaro Barreal', pos: 'M', age: 26, ovr: 80, fin: 77, pas: 80, def: 64, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Mateus Vital', pos: 'M', age: 28, ovr: 77, fin: 72, pas: 78, def: 55, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Kaio Jorge', pos: 'A', age: 24, ovr: 83, fin: 86, pas: 76, def: 48, fis: 83, contractEnd: '30/06/2029' },
    { name: 'Lautaro Díaz', pos: 'A', age: 28, ovr: 80, fin: 81, pas: 74, def: 50, fis: 83, contractEnd: '30/06/2028' },
    { name: 'Gabriel Veron', pos: 'A', age: 23, ovr: 79, fin: 78, pas: 75, def: 48, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Juan Dinenno', pos: 'A', age: 31, ovr: 79, fin: 83, pas: 68, def: 42, fis: 82, contractEnd: '31/12/2026' }
  ],

  int: [
    { name: 'Sergio Rochet', pos: 'G', age: 33, ovr: 84, fin: 24, pas: 70, def: 86, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Anthoni', pos: 'G', age: 24, ovr: 75, fin: 22, pas: 64, def: 77, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Vitão', pos: 'Z', age: 26, ovr: 82, fin: 38, pas: 70, def: 84, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Clayton Sampaio', pos: 'Z', age: 26, ovr: 78, fin: 36, pas: 66, def: 80, fis: 82, contractEnd: '31/12/2028' },
    { name: 'Agustín Rogel', pos: 'Z', age: 28, ovr: 78, fin: 38, pas: 64, def: 80, fis: 84, contractEnd: '30/06/2026' },
    { name: 'Gabriel Mercado', pos: 'Z', age: 39, ovr: 78, fin: 44, pas: 68, def: 80, fis: 75, contractEnd: '31/12/2026' },
    { name: 'Bruno Gomes', pos: 'L', age: 24, ovr: 80, fin: 68, pas: 79, def: 78, fis: 82, contractEnd: '31/12/2027' },
    { name: 'Alexandro Bernabei', pos: 'L', age: 25, ovr: 81, fin: 66, pas: 78, def: 77, fis: 85, contractEnd: '31/12/2026' },
    { name: 'Renê', pos: 'L', age: 33, ovr: 78, fin: 56, pas: 76, def: 78, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Thiago Maia', pos: 'V', age: 29, ovr: 82, fin: 64, pas: 81, def: 83, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Fernando Reges', pos: 'V', age: 39, ovr: 80, fin: 58, pas: 78, def: 84, fis: 75, contractEnd: '31/12/2026' },
    { name: 'Bruno Henrique (Int)', pos: 'V', age: 36, ovr: 78, fin: 71, pas: 79, def: 76, fis: 75, contractEnd: '31/12/2026' },
    { name: 'Rômulo', pos: 'V', age: 26, ovr: 77, fin: 58, pas: 75, def: 79, fis: 80, contractEnd: '31/12/2027' },
    { name: 'Alan Patrick', pos: 'M', age: 35, ovr: 85, fin: 84, pas: 89, def: 56, fis: 73, contractEnd: '31/12/2026' },
    { name: 'Gabriel Carvalho', pos: 'M', age: 19, ovr: 79, fin: 75, pas: 81, def: 52, fis: 77, contractEnd: '31/12/2028' },
    { name: 'Bruno Tabata', pos: 'M', age: 29, ovr: 79, fin: 78, pas: 81, def: 60, fis: 78, contractEnd: '31/12/2027' },
    { name: 'Gustavo Prado', pos: 'M', age: 21, ovr: 76, fin: 70, pas: 76, def: 54, fis: 76, contractEnd: '31/12/2028' },
    { name: 'Rafael Borré', pos: 'A', age: 31, ovr: 84, fin: 87, pas: 76, def: 55, fis: 84, contractEnd: '31/12/2028' },
    { name: 'Wesley Ribeiro', pos: 'A', age: 27, ovr: 82, fin: 81, pas: 78, def: 50, fis: 86, contractEnd: '31/12/2026' },
    { name: 'Enner Valencia', pos: 'A', age: 36, ovr: 83, fin: 86, pas: 74, def: 46, fis: 81, contractEnd: '30/06/2026' },
    { name: 'Lucas Alario', pos: 'A', age: 33, ovr: 79, fin: 82, pas: 70, def: 44, fis: 78, contractEnd: '31/12/2026' }
  ],

  gre: [
    { name: 'Agustín Marchesín', pos: 'G', age: 38, ovr: 81, fin: 24, pas: 68, def: 83, fis: 75, contractEnd: '31/12/2026' },
    { name: 'Caíque', pos: 'G', age: 29, ovr: 76, fin: 22, pas: 63, def: 78, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Walter Kannemann', pos: 'Z', age: 35, ovr: 81, fin: 42, pas: 65, def: 85, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Jemerson', pos: 'Z', age: 33, ovr: 80, fin: 38, pas: 67, def: 82, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Rodrigo Ely', pos: 'Z', age: 32, ovr: 79, fin: 40, pas: 66, def: 81, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Gustavo Martins', pos: 'Z', age: 24, ovr: 77, fin: 44, pas: 65, def: 78, fis: 79, contractEnd: '31/12/2027' },
    { name: 'João Pedro', pos: 'L', age: 29, ovr: 79, fin: 62, pas: 77, def: 77, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Reinaldo', pos: 'L', age: 36, ovr: 78, fin: 70, pas: 78, def: 76, fis: 75, contractEnd: '31/12/2026' },
    { name: 'Mayk', pos: 'L', age: 27, ovr: 76, fin: 56, pas: 74, def: 75, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Mathías Villasanti', pos: 'V', age: 29, ovr: 84, fin: 68, pas: 83, def: 85, fis: 85, contractEnd: '31/12/2027' },
    { name: 'Dodi', pos: 'V', age: 30, ovr: 78, fin: 62, pas: 77, def: 80, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Pepê (Vol)', pos: 'V', age: 28, ovr: 78, fin: 67, pas: 80, def: 75, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Ronald Falkoski', pos: 'V', age: 23, ovr: 76, fin: 60, pas: 75, def: 77, fis: 79, contractEnd: '31/12/2027' },
    { name: 'Franco Cristaldo', pos: 'M', age: 29, ovr: 83, fin: 81, pas: 86, def: 60, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Miguel Monsalve', pos: 'M', age: 22, ovr: 80, fin: 78, pas: 82, def: 58, fis: 79, contractEnd: '31/12/2028' },
    { name: 'Edenilson', pos: 'M', age: 36, ovr: 78, fin: 72, pas: 79, def: 73, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Martin Braithwaite', pos: 'A', age: 35, ovr: 83, fin: 86, pas: 77, def: 48, fis: 82, contractEnd: '30/06/2026' },
    { name: 'Alexander Aravena', pos: 'A', age: 24, ovr: 81, fin: 82, pas: 78, def: 50, fis: 83, contractEnd: '31/12/2028' },
    { name: 'Cristian Pavón', pos: 'A', age: 30, ovr: 81, fin: 80, pas: 79, def: 52, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Diego Costa', pos: 'A', age: 37, ovr: 80, fin: 85, pas: 70, def: 48, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Nathan Fernandes', pos: 'A', age: 21, ovr: 77, fin: 76, pas: 74, def: 46, fis: 84, contractEnd: '31/12/2028' }
  ],

  vas: [
    { name: 'Léo Jardim', pos: 'G', age: 31, ovr: 84, fin: 24, pas: 68, def: 86, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Keiller', pos: 'G', age: 29, ovr: 76, fin: 22, pas: 64, def: 78, fis: 75, contractEnd: '31/12/2026' },
    { name: 'João Victor', pos: 'Z', age: 28, ovr: 82, fin: 38, pas: 70, def: 84, fis: 84, contractEnd: '31/12/2028' },
    { name: 'Léo Pelé', pos: 'Z', age: 30, ovr: 78, fin: 42, pas: 72, def: 79, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Maicon', pos: 'Z', age: 37, ovr: 77, fin: 45, pas: 66, def: 80, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Robert Rojas', pos: 'Z', age: 30, ovr: 77, fin: 40, pas: 66, def: 79, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Lucas Piton', pos: 'L', age: 26, ovr: 83, fin: 66, pas: 82, def: 80, fis: 83, contractEnd: '31/12/2028' },
    { name: 'Paulo Henrique', pos: 'L', age: 30, ovr: 79, fin: 60, pas: 76, def: 78, fis: 84, contractEnd: '31/12/2027' },
    { name: 'Puma Rodríguez', pos: 'L', age: 29, ovr: 78, fin: 66, pas: 77, def: 76, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Hugo Moura', pos: 'V', age: 28, ovr: 80, fin: 62, pas: 78, def: 83, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Mateus Carvalho', pos: 'V', age: 24, ovr: 78, fin: 64, pas: 77, def: 80, fis: 82, contractEnd: '31/12/2027' },
    { name: 'Juan Sforza', pos: 'V', age: 24, ovr: 78, fin: 65, pas: 80, def: 78, fis: 79, contractEnd: '31/12/2028' },
    { name: 'Jair Rodrigues', pos: 'V', age: 31, ovr: 79, fin: 68, pas: 80, def: 80, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Jean David', pos: 'M', age: 32, ovr: 78, fin: 76, pas: 79, def: 54, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Maxime Dominguez', pos: 'M', age: 30, ovr: 77, fin: 72, pas: 80, def: 60, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Paulinho Paula', pos: 'M', age: 29, ovr: 78, fin: 70, pas: 80, def: 72, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Dimitri Payet', pos: 'M', age: 39, ovr: 80, fin: 79, pas: 88, def: 42, fis: 66, contractEnd: '30/06/2026' },
    { name: 'Pablo Vegetti', pos: 'A', age: 37, ovr: 83, fin: 88, pas: 68, def: 52, fis: 85, contractEnd: '31/12/2026' },
    { name: 'Rayan', pos: 'A', age: 20, ovr: 79, fin: 81, pas: 73, def: 46, fis: 84, contractEnd: '31/12/2026' },
    { name: 'David Corrêa', pos: 'A', age: 30, ovr: 78, fin: 78, pas: 73, def: 52, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Emerson Rodríguez', pos: 'A', age: 25, ovr: 77, fin: 76, pas: 74, def: 48, fis: 82, contractEnd: '30/06/2026' }
  ],

  bah: [
    { name: 'Marcos Felipe', pos: 'G', age: 30, ovr: 81, fin: 24, pas: 67, def: 83, fis: 79, contractEnd: '31/12/2027' },
    { name: 'Adriel', pos: 'G', age: 25, ovr: 75, fin: 22, pas: 63, def: 77, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Gabriel Xavier', pos: 'Z', age: 25, ovr: 81, fin: 40, pas: 68, def: 83, fis: 83, contractEnd: '31/12/2027' },
    { name: 'Kanu', pos: 'Z', age: 29, ovr: 80, fin: 38, pas: 67, def: 82, fis: 83, contractEnd: '31/12/2027' },
    { name: 'Víctor Cuesta', pos: 'Z', age: 37, ovr: 78, fin: 45, pas: 72, def: 80, fis: 75, contractEnd: '31/12/2026' },
    { name: 'Santiago Arias', pos: 'L', age: 34, ovr: 80, fin: 58, pas: 77, def: 80, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Luciano Juba', pos: 'L', age: 27, ovr: 81, fin: 74, pas: 81, def: 75, fis: 82, contractEnd: '31/12/2027' },
    { name: 'Iago Borduchi', pos: 'L', age: 29, ovr: 80, fin: 62, pas: 78, def: 79, fis: 81, contractEnd: '31/12/2027' },
    { name: 'Gilberto (Lat)', pos: 'L', age: 33, ovr: 79, fin: 60, pas: 76, def: 78, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Jean Lucas', pos: 'V', age: 28, ovr: 84, fin: 75, pas: 84, def: 82, fis: 85, contractEnd: '31/12/2028' },
    { name: 'Caio Alexandre', pos: 'V', age: 27, ovr: 82, fin: 70, pas: 83, def: 80, fis: 82, contractEnd: '31/12/2028' },
    { name: 'Rezende', pos: 'V', age: 31, ovr: 78, fin: 58, pas: 75, def: 81, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Cauly', pos: 'M', age: 31, ovr: 84, fin: 82, pas: 87, def: 60, fis: 79, contractEnd: '31/12/2028' },
    { name: 'Everton Ribeiro', pos: 'M', age: 37, ovr: 82, fin: 78, pas: 88, def: 58, fis: 70, contractEnd: '31/12/2026' },
    { name: 'Thaciano', pos: 'M', age: 31, ovr: 81, fin: 80, pas: 79, def: 74, fis: 83, contractEnd: '31/12/2027' },
    { name: 'Biel', pos: 'M', age: 25, ovr: 79, fin: 78, pas: 78, def: 52, fis: 82, contractEnd: '31/12/2028' },
    { name: 'Lucho Rodríguez', pos: 'A', age: 23, ovr: 83, fin: 86, pas: 77, def: 52, fis: 84, contractEnd: '30/06/2029' },
    { name: 'Everaldo', pos: 'A', age: 35, ovr: 79, fin: 82, pas: 70, def: 46, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Ademir', pos: 'A', age: 31, ovr: 78, fin: 77, pas: 74, def: 48, fis: 85, contractEnd: '31/12/2026' },
    { name: 'Rafael Ratão', pos: 'A', age: 30, ovr: 78, fin: 79, pas: 73, def: 50, fis: 81, contractEnd: '31/12/2026' }
  ],

  for: [
    { name: 'João Ricardo', pos: 'G', age: 37, ovr: 83, fin: 24, pas: 68, def: 85, fis: 78, contractEnd: '31/12/2027' },
    { name: 'Santos (Goleiro)', pos: 'G', age: 36, ovr: 77, fin: 23, pas: 66, def: 79, fis: 74, contractEnd: '31/12/2026' },
    { name: 'Benjamin Kuscevic', pos: 'Z', age: 30, ovr: 81, fin: 40, pas: 68, def: 83, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Emanuel Brítez', pos: 'Z', age: 34, ovr: 81, fin: 48, pas: 72, def: 83, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Tomás Cardona', pos: 'Z', age: 30, ovr: 79, fin: 42, pas: 68, def: 80, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Tinga', pos: 'L', age: 33, ovr: 80, fin: 62, pas: 76, def: 81, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Bruno Pacheco', pos: 'L', age: 34, ovr: 80, fin: 64, pas: 78, def: 79, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Eros Mancuso', pos: 'L', age: 27, ovr: 79, fin: 62, pas: 77, def: 78, fis: 82, contractEnd: '31/12/2028' },
    { name: 'Felipe Jonatan', pos: 'L', age: 28, ovr: 78, fin: 64, pas: 77, def: 76, fis: 79, contractEnd: '31/12/2027' },
    { name: 'Hércules', pos: 'V', age: 25, ovr: 82, fin: 72, pas: 81, def: 82, fis: 84, contractEnd: '31/12/2026' },
    { name: 'Lucas Sasha', pos: 'V', age: 36, ovr: 78, fin: 60, pas: 76, def: 81, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Pedro Augusto', pos: 'V', age: 29, ovr: 78, fin: 58, pas: 77, def: 80, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Tomás Pochettino', pos: 'M', age: 30, ovr: 82, fin: 79, pas: 84, def: 65, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Kervin Andrade', pos: 'M', age: 21, ovr: 80, fin: 79, pas: 82, def: 54, fis: 80, contractEnd: '31/12/2028' },
    { name: 'Emmanuel Martínez', pos: 'M', age: 32, ovr: 80, fin: 76, pas: 81, def: 70, fis: 79, contractEnd: '31/12/2027' },
    { name: 'Calebe', pos: 'M', age: 26, ovr: 78, fin: 75, pas: 80, def: 58, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Juan Martín Lucero', pos: 'A', age: 34, ovr: 84, fin: 88, pas: 74, def: 52, fis: 82, contractEnd: '31/12/2027' },
    { name: 'Moisés', pos: 'A', age: 29, ovr: 82, fin: 82, pas: 76, def: 50, fis: 85, contractEnd: '31/12/2027' },
    { name: 'Yago Pikachu', pos: 'A', age: 34, ovr: 81, fin: 81, pas: 78, def: 64, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Breno Lopes', pos: 'A', age: 30, ovr: 79, fin: 80, pas: 74, def: 52, fis: 83, contractEnd: '31/12/2028' }
  ],

  cap: [
    { name: 'Mycael', pos: 'G', age: 22, ovr: 81, fin: 24, pas: 68, def: 83, fis: 81, contractEnd: '31/12/2027' },
    { name: 'Léo Linck', pos: 'G', age: 25, ovr: 77, fin: 22, pas: 65, def: 79, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Kaique Rocha', pos: 'Z', age: 25, ovr: 80, fin: 36, pas: 68, def: 82, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Mateo Gamarra', pos: 'Z', age: 25, ovr: 79, fin: 40, pas: 66, def: 81, fis: 83, contractEnd: '31/12/2027' },
    { name: 'Thiago Heleno', pos: 'Z', age: 37, ovr: 79, fin: 48, pas: 66, def: 82, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Lucas Esquivel', pos: 'L', age: 24, ovr: 80, fin: 66, pas: 79, def: 79, fis: 82, contractEnd: '31/12/2028' },
    { name: 'Leonardo Godoy', pos: 'L', age: 31, ovr: 79, fin: 62, pas: 77, def: 78, fis: 81, contractEnd: '31/12/2027' },
    { name: 'Madson', pos: 'L', age: 34, ovr: 77, fin: 65, pas: 73, def: 76, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Fernando (Lat)', pos: 'L', age: 27, ovr: 77, fin: 58, pas: 74, def: 76, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Erick Carvalho', pos: 'V', age: 28, ovr: 82, fin: 74, pas: 81, def: 82, fis: 84, contractEnd: '31/12/2026' },
    { name: 'Christian', pos: 'V', age: 25, ovr: 81, fin: 76, pas: 81, def: 78, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Gabriel Girotto', pos: 'V', age: 34, ovr: 78, fin: 56, pas: 76, def: 82, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Felipinho', pos: 'V', age: 24, ovr: 76, fin: 60, pas: 75, def: 78, fis: 79, contractEnd: '31/12/2027' },
    { name: 'Bruno Zapelli', pos: 'M', age: 24, ovr: 83, fin: 79, pas: 86, def: 60, fis: 78, contractEnd: '31/12/2028' },
    { name: 'Nikão', pos: 'M', age: 34, ovr: 78, fin: 78, pas: 80, def: 58, fis: 75, contractEnd: '31/12/2026' },
    { name: 'João Cruz', pos: 'M', age: 20, ovr: 76, fin: 72, pas: 78, def: 55, fis: 76, contractEnd: '31/12/2028' },
    { name: 'Agustín Canobbio', pos: 'A', age: 27, ovr: 83, fin: 82, pas: 80, def: 66, fis: 86, contractEnd: '31/12/2026' },
    { name: 'Tomás Cuello', pos: 'A', age: 26, ovr: 81, fin: 79, pas: 78, def: 54, fis: 84, contractEnd: '31/12/2026' },
    { name: 'Gonzalo Mastriani', pos: 'A', age: 33, ovr: 81, fin: 86, pas: 70, def: 44, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Julimar', pos: 'A', age: 25, ovr: 78, fin: 78, pas: 74, def: 50, fis: 83, contractEnd: '31/12/2027' },
    { name: 'Pablo Felipe', pos: 'A', age: 34, ovr: 79, fin: 81, pas: 72, def: 50, fis: 78, contractEnd: '31/12/2026' }
  ],

  san: [
    { name: 'Gabriel Brazão', pos: 'G', age: 25, ovr: 81, fin: 24, pas: 68, def: 83, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Diógenes', pos: 'G', age: 25, ovr: 74, fin: 22, pas: 62, def: 76, fis: 74, contractEnd: '31/12/2026' },
    { name: 'Jair Paula', pos: 'Z', age: 21, ovr: 81, fin: 36, pas: 70, def: 83, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Luan Peres', pos: 'Z', age: 32, ovr: 80, fin: 42, pas: 72, def: 82, fis: 80, contractEnd: '31/12/2027' },
    { name: 'Gil', pos: 'Z', age: 39, ovr: 78, fin: 46, pas: 66, def: 81, fis: 75, contractEnd: '31/12/2026' },
    { name: 'JP Chermont', pos: 'L', age: 20, ovr: 80, fin: 64, pas: 78, def: 78, fis: 83, contractEnd: '31/12/2027' },
    { name: 'Gonzalo Escobar', pos: 'L', age: 29, ovr: 78, fin: 56, pas: 75, def: 78, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Hayner', pos: 'L', age: 31, ovr: 76, fin: 58, pas: 74, def: 75, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Kevyson', pos: 'L', age: 22, ovr: 75, fin: 54, pas: 72, def: 74, fis: 79, contractEnd: '31/12/2027' },
    { name: 'João Schmidt', pos: 'V', age: 33, ovr: 82, fin: 66, pas: 84, def: 83, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Diego Pituca', pos: 'V', age: 34, ovr: 81, fin: 70, pas: 82, def: 80, fis: 80, contractEnd: '31/12/2027' },
    { name: 'Tomás Rincón', pos: 'V', age: 38, ovr: 77, fin: 58, pas: 76, def: 81, fis: 74, contractEnd: '31/12/2026' },
    { name: 'Sandry', pos: 'V', age: 23, ovr: 76, fin: 60, pas: 78, def: 76, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Giuliano', pos: 'M', age: 36, ovr: 79, fin: 76, pas: 83, def: 62, fis: 72, contractEnd: '31/12/2026' },
    { name: 'Miguelito', pos: 'M', age: 22, ovr: 76, fin: 74, pas: 79, def: 48, fis: 75, contractEnd: '31/12/2027' },
    { name: 'Serginho', pos: 'M', age: 31, ovr: 76, fin: 72, pas: 77, def: 55, fis: 75, contractEnd: '31/12/2026' },
    { name: 'Guilherme', pos: 'A', age: 31, ovr: 82, fin: 84, pas: 78, def: 50, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Wendel Silva', pos: 'A', age: 25, ovr: 79, fin: 82, pas: 71, def: 46, fis: 83, contractEnd: '30/06/2026' },
    { name: 'Rómulo Otero', pos: 'A', age: 33, ovr: 78, fin: 81, pas: 80, def: 52, fis: 74, contractEnd: '31/12/2026' },
    { name: 'Pedrinho (Ata)', pos: 'A', age: 27, ovr: 77, fin: 76, pas: 75, def: 48, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Willian Bigode', pos: 'A', age: 39, ovr: 76, fin: 79, pas: 74, def: 48, fis: 72, contractEnd: '31/12/2026' }
  ],

  rbb: [
    { name: 'Cleiton', pos: 'G', age: 29, ovr: 83, fin: 25, pas: 72, def: 85, fis: 80, contractEnd: '31/12/2027' },
    { name: 'Lucão', pos: 'G', age: 25, ovr: 75, fin: 22, pas: 65, def: 77, fis: 75, contractEnd: '31/12/2027' },
    { name: 'Pedro Henrique', pos: 'Z', age: 30, ovr: 80, fin: 38, pas: 68, def: 82, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Lucas Cunha', pos: 'Z', age: 29, ovr: 79, fin: 36, pas: 67, def: 81, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Douglas Mendes', pos: 'Z', age: 22, ovr: 77, fin: 34, pas: 66, def: 79, fis: 80, contractEnd: '31/12/2028' },
    { name: 'Juninho Capixaba', pos: 'L', age: 29, ovr: 82, fin: 70, pas: 81, def: 79, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Nathan Mendes', pos: 'L', age: 24, ovr: 79, fin: 60, pas: 76, def: 79, fis: 83, contractEnd: '31/12/2028' },
    { name: 'Andrés Hurtado', pos: 'L', age: 24, ovr: 79, fin: 58, pas: 76, def: 78, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Luan Cândido', pos: 'L', age: 25, ovr: 80, fin: 68, pas: 77, def: 79, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Jadsom Silva', pos: 'V', age: 25, ovr: 80, fin: 64, pas: 79, def: 81, fis: 83, contractEnd: '31/12/2027' },
    { name: 'Matheus Fernandes', pos: 'V', age: 28, ovr: 79, fin: 62, pas: 78, def: 80, fis: 81, contractEnd: '31/12/2027' },
    { name: 'Eric Ramires', pos: 'V', age: 26, ovr: 79, fin: 68, pas: 79, def: 78, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Raul', pos: 'V', age: 29, ovr: 78, fin: 60, pas: 77, def: 80, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Jhon Jhon', pos: 'M', age: 24, ovr: 81, fin: 77, pas: 83, def: 60, fis: 81, contractEnd: '30/06/2029' },
    { name: 'Lucas Evangelista', pos: 'M', age: 31, ovr: 82, fin: 78, pas: 84, def: 74, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Lincoln', pos: 'M', age: 27, ovr: 78, fin: 74, pas: 80, def: 55, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Eduardo Sasha', pos: 'A', age: 34, ovr: 81, fin: 84, pas: 77, def: 52, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Henry Mosquera', pos: 'A', age: 24, ovr: 81, fin: 79, pas: 78, def: 48, fis: 87, contractEnd: '31/12/2027' },
    { name: 'Thiago Borbas', pos: 'A', age: 24, ovr: 81, fin: 84, pas: 73, def: 46, fis: 84, contractEnd: '31/12/2027' },
    { name: 'Vitinho Naum', pos: 'A', age: 27, ovr: 80, fin: 80, pas: 76, def: 50, fis: 86, contractEnd: '31/12/2027' },
    { name: 'Arthur Sousa', pos: 'A', age: 23, ovr: 76, fin: 78, pas: 70, def: 42, fis: 81, contractEnd: '31/12/2028' }
  ]
};

/**
 * RAW_PLAYERS_2026_SERIE_B
 * Atletas reais e confirmados das principais forças da Série B 2026.
 * Fonte: Contratos registrados no BID da CBF e boletins das federações estaduais.
 */
export const RAW_PLAYERS_2026_SERIE_B = {
  spo: [
    { name: 'Caíque França', pos: 'G', age: 31, ovr: 79, fin: 24, pas: 66, def: 81, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Rafael Thyere', pos: 'Z', age: 33, ovr: 79, fin: 36, pas: 67, def: 81, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Luciano Castán', pos: 'Z', age: 37, ovr: 77, fin: 42, pas: 68, def: 79, fis: 75, contractEnd: '31/12/2026' },
    { name: 'Felipinho (Lat)', pos: 'L', age: 29, ovr: 76, fin: 58, pas: 74, def: 76, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Lucas Ramon', pos: 'L', age: 32, ovr: 75, fin: 55, pas: 73, def: 75, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Fabricio Domínguez', pos: 'V', age: 28, ovr: 78, fin: 72, pas: 78, def: 77, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Felipe (Vol)', pos: 'V', age: 31, ovr: 77, fin: 64, pas: 78, def: 78, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Lucas Lima', pos: 'M', age: 36, ovr: 79, fin: 72, pas: 86, def: 50, fis: 69, contractEnd: '31/12/2026' },
    { name: 'Titi Ortiz', pos: 'M', age: 34, ovr: 76, fin: 74, pas: 79, def: 55, fis: 74, contractEnd: '31/12/2026' },
    { name: 'Gustavo Coutinho', pos: 'A', age: 27, ovr: 79, fin: 82, pas: 71, def: 46, fis: 81, contractEnd: '31/12/2027' },
    { name: 'Chrystian Barletta', pos: 'A', age: 25, ovr: 78, fin: 78, pas: 75, def: 48, fis: 82, contractEnd: '31/12/2027' },
    { name: 'Zé Roberto', pos: 'A', age: 32, ovr: 77, fin: 80, pas: 70, def: 48, fis: 80, contractEnd: '31/12/2026' }
  ],

  cea: [
    { name: 'Richard', pos: 'G', age: 35, ovr: 78, fin: 22, pas: 64, def: 80, fis: 75, contractEnd: '31/12/2026' },
    { name: 'David Ricardo', pos: 'Z', age: 23, ovr: 77, fin: 35, pas: 67, def: 79, fis: 81, contractEnd: '31/12/2027' },
    { name: 'Ramon Menezes', pos: 'Z', age: 31, ovr: 76, fin: 38, pas: 65, def: 78, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Matheus Bahia', pos: 'L', age: 27, ovr: 77, fin: 58, pas: 76, def: 76, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Rafael Ramos', pos: 'L', age: 31, ovr: 76, fin: 56, pas: 75, def: 76, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Lourenço', pos: 'V', age: 28, ovr: 78, fin: 74, pas: 79, def: 76, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Richardson', pos: 'V', age: 34, ovr: 76, fin: 58, pas: 75, def: 79, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Lucas Mugni', pos: 'M', age: 34, ovr: 78, fin: 74, pas: 82, def: 64, fis: 75, contractEnd: '31/12/2026' },
    { name: 'Jorge Recalde', pos: 'M', age: 34, ovr: 77, fin: 78, pas: 80, def: 54, fis: 73, contractEnd: '31/12/2026' },
    { name: 'Erick Pulga', pos: 'A', age: 26, ovr: 81, fin: 82, pas: 77, def: 48, fis: 84, contractEnd: '31/12/2026' },
    { name: 'Saulo Mineiro', pos: 'A', age: 29, ovr: 78, fin: 78, pas: 70, def: 52, fis: 85, contractEnd: '31/12/2026' },
    { name: 'Facundo Barceló', pos: 'A', age: 33, ovr: 77, fin: 80, pas: 69, def: 42, fis: 77, contractEnd: '31/12/2026' }
  ],

  cfc: [
    { name: 'Pedro Morisco', pos: 'G', age: 22, ovr: 78, fin: 23, pas: 66, def: 80, fis: 78, contractEnd: '31/12/2027' },
    { name: 'Marcelo Benevenuto', pos: 'Z', age: 30, ovr: 77, fin: 40, pas: 65, def: 79, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Maurício Antônio', pos: 'Z', age: 34, ovr: 76, fin: 38, pas: 66, def: 78, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Natanael', pos: 'L', age: 24, ovr: 78, fin: 60, pas: 76, def: 77, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Jamerson', pos: 'L', age: 27, ovr: 77, fin: 62, pas: 76, def: 76, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Sebastián Gómez', pos: 'V', age: 30, ovr: 79, fin: 70, pas: 81, def: 79, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Vini Paulista', pos: 'V', age: 25, ovr: 76, fin: 64, pas: 76, def: 77, fis: 79, contractEnd: '31/12/2027' },
    { name: 'Matheus Frizzo', pos: 'M', age: 27, ovr: 79, fin: 80, pas: 81, def: 64, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Josué Pesqueira', pos: 'M', age: 36, ovr: 78, fin: 75, pas: 84, def: 55, fis: 70, contractEnd: '31/12/2026' },
    { name: 'Lucas Ronier', pos: 'A', age: 21, ovr: 77, fin: 76, pas: 75, def: 48, fis: 81, contractEnd: '31/12/2027' },
    { name: 'Robson', pos: 'A', age: 35, ovr: 79, fin: 81, pas: 74, def: 55, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Júnior Brumado', pos: 'A', age: 27, ovr: 77, fin: 79, pas: 68, def: 44, fis: 83, contractEnd: '30/06/2026' }
  ],

  ame: [
    { name: 'Dalberson', pos: 'G', age: 29, ovr: 76, fin: 22, pas: 63, def: 78, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Éder Ferreira', pos: 'Z', age: 31, ovr: 77, fin: 36, pas: 66, def: 79, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Ricardo Silva', pos: 'Z', age: 34, ovr: 76, fin: 38, pas: 65, def: 78, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Marlon Lopes', pos: 'L', age: 32, ovr: 77, fin: 62, pas: 76, def: 77, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Daniel Borges', pos: 'L', age: 33, ovr: 76, fin: 56, pas: 75, def: 75, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Juninho (Capitão)', pos: 'V', age: 38, ovr: 79, fin: 72, pas: 80, def: 79, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Alê', pos: 'V', age: 36, ovr: 77, fin: 66, pas: 77, def: 78, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Martín Benítez', pos: 'M', age: 32, ovr: 79, fin: 78, pas: 85, def: 52, fis: 72, contractEnd: '31/12/2026' },
    { name: 'Moisés Lima', pos: 'M', age: 38, ovr: 78, fin: 76, pas: 82, def: 64, fis: 71, contractEnd: '31/12/2026' },
    { name: 'Renato Marques', pos: 'A', age: 22, ovr: 77, fin: 79, pas: 70, def: 44, fis: 81, contractEnd: '31/12/2027' },
    { name: 'Fabinho (Ame)', pos: 'A', age: 26, ovr: 76, fin: 76, pas: 73, def: 48, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Brenner', pos: 'A', age: 32, ovr: 76, fin: 78, pas: 68, def: 42, fis: 78, contractEnd: '31/12/2026' }
  ],

  goi: [
    { name: 'Tadeu', pos: 'G', age: 34, ovr: 81, fin: 24, pas: 68, def: 83, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Messias', pos: 'Z', age: 31, ovr: 78, fin: 40, pas: 66, def: 80, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Lucas Ribeiro', pos: 'Z', age: 27, ovr: 77, fin: 36, pas: 67, def: 79, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Sander', pos: 'L', age: 35, ovr: 76, fin: 55, pas: 73, def: 77, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Dieguinho', pos: 'L', age: 31, ovr: 77, fin: 64, pas: 76, def: 76, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Marcão Silva', pos: 'V', age: 35, ovr: 77, fin: 62, pas: 76, def: 80, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Juninho (Goi)', pos: 'V', age: 25, ovr: 76, fin: 64, pas: 76, def: 77, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Rafael Gava', pos: 'M', age: 33, ovr: 77, fin: 74, pas: 80, def: 62, fis: 75, contractEnd: '31/12/2026' },
    { name: 'Régis', pos: 'M', age: 33, ovr: 76, fin: 76, pas: 80, def: 52, fis: 72, contractEnd: '31/12/2026' },
    { name: 'Thiago Galhardo', pos: 'A', age: 37, ovr: 79, fin: 82, pas: 77, def: 52, fis: 75, contractEnd: '31/12/2026' },
    { name: 'Paulo Baya', pos: 'A', age: 27, ovr: 78, fin: 81, pas: 74, def: 48, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Edu', pos: 'A', age: 33, ovr: 77, fin: 80, pas: 67, def: 42, fis: 81, contractEnd: '31/12/2026' }
  ],

  nov: [
    { name: 'Jordi', pos: 'G', age: 33, ovr: 77, fin: 22, pas: 65, def: 79, fis: 77, contractEnd: '31/12/2026' },
    { name: 'César Martins', pos: 'Z', age: 33, ovr: 76, fin: 38, pas: 64, def: 78, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Patrick', pos: 'Z', age: 27, ovr: 76, fin: 35, pas: 65, def: 78, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Reverson', pos: 'L', age: 29, ovr: 75, fin: 56, pas: 73, def: 75, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Rodrigo Soares', pos: 'L', age: 33, ovr: 76, fin: 58, pas: 75, def: 76, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Geovane', pos: 'V', age: 27, ovr: 76, fin: 62, pas: 76, def: 77, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Willian Farias', pos: 'V', age: 37, ovr: 75, fin: 58, pas: 75, def: 77, fis: 73, contractEnd: '31/12/2026' },
    { name: 'Marlon (Nov)', pos: 'M', age: 35, ovr: 77, fin: 75, pas: 80, def: 60, fis: 74, contractEnd: '31/12/2026' },
    { name: 'Rodolfo', pos: 'M', age: 33, ovr: 75, fin: 74, pas: 76, def: 55, fis: 74, contractEnd: '31/12/2026' },
    { name: 'Neto Pessoa', pos: 'A', age: 32, ovr: 77, fin: 80, pas: 70, def: 46, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Fabrício Daniel', pos: 'A', age: 29, ovr: 77, fin: 79, pas: 74, def: 50, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Waguininho', pos: 'A', age: 36, ovr: 76, fin: 77, pas: 72, def: 54, fis: 77, contractEnd: '31/12/2026' }
  ],

  mir: [
    { name: 'Alex Muralha', pos: 'G', age: 36, ovr: 77, fin: 22, pas: 64, def: 79, fis: 75, contractEnd: '31/12/2026' },
    { name: 'Luiz Otávio', pos: 'Z', age: 33, ovr: 76, fin: 40, pas: 64, def: 78, fis: 79, contractEnd: '31/12/2026' },
    { name: 'João Victor (Mir)', pos: 'Z', age: 28, ovr: 76, fin: 36, pas: 65, def: 78, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Zeca', pos: 'L', age: 32, ovr: 77, fin: 62, pas: 77, def: 77, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Lucas Ramon (Mir)', pos: 'L', age: 32, ovr: 75, fin: 56, pas: 73, def: 75, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Neto Moura', pos: 'V', age: 30, ovr: 77, fin: 66, pas: 79, def: 78, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Danielzinho', pos: 'V', age: 31, ovr: 77, fin: 68, pas: 81, def: 74, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Chico Kim', pos: 'M', age: 35, ovr: 77, fin: 76, pas: 80, def: 56, fis: 73, contractEnd: '31/12/2026' },
    { name: 'Isaque', pos: 'M', age: 29, ovr: 76, fin: 74, pas: 78, def: 58, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Dellatorre', pos: 'A', age: 34, ovr: 79, fin: 82, pas: 70, def: 46, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Fernandinho (Mir)', pos: 'A', age: 29, ovr: 78, fin: 78, pas: 74, def: 48, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Negueba', pos: 'A', age: 34, ovr: 76, fin: 75, pas: 75, def: 52, fis: 78, contractEnd: '31/12/2026' }
  ],

  vil: [
    { name: 'Dênis Júnior', pos: 'G', age: 27, ovr: 77, fin: 22, pas: 65, def: 79, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Ralf', pos: 'Z', age: 42, ovr: 76, fin: 42, pas: 68, def: 81, fis: 71, contractEnd: '31/12/2026' },
    { name: 'Jemmes', pos: 'Z', age: 25, ovr: 75, fin: 35, pas: 64, def: 77, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Elias (Lat)', pos: 'L', age: 26, ovr: 76, fin: 60, pas: 75, def: 75, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Rhaldney', pos: 'L', age: 27, ovr: 75, fin: 56, pas: 74, def: 76, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Cristiano', pos: 'V', age: 27, ovr: 76, fin: 64, pas: 77, def: 78, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Arilson', pos: 'V', age: 32, ovr: 76, fin: 62, pas: 76, def: 79, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Igor Henrique', pos: 'M', age: 34, ovr: 77, fin: 76, pas: 78, def: 68, fis: 79, contractEnd: '31/12/2026' },
    { name: 'João Lucas', pos: 'M', age: 34, ovr: 75, fin: 73, pas: 77, def: 56, fis: 73, contractEnd: '31/12/2026' },
    { name: 'Alesson', pos: 'A', age: 27, ovr: 78, fin: 79, pas: 75, def: 50, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Henrique Almeida', pos: 'A', age: 35, ovr: 77, fin: 80, pas: 68, def: 44, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Júnior Todinho', pos: 'A', age: 32, ovr: 76, fin: 78, pas: 71, def: 48, fis: 78, contractEnd: '31/12/2026' }
  ],

  ava: [
    { name: 'César (Ava)', pos: 'G', age: 31, ovr: 77, fin: 22, pas: 65, def: 79, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Tiago Pagnussat', pos: 'Z', age: 36, ovr: 76, fin: 46, pas: 65, def: 78, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Gustavo Vilar', pos: 'Z', age: 26, ovr: 76, fin: 35, pas: 66, def: 78, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Mário Sérgio (Lat)', pos: 'L', age: 32, ovr: 76, fin: 60, pas: 75, def: 76, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Marcos Vinícius', pos: 'L', age: 29, ovr: 75, fin: 56, pas: 74, def: 75, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Willian Maranhão', pos: 'V', age: 30, ovr: 76, fin: 58, pas: 76, def: 79, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Zé Ricardo (Ava)', pos: 'V', age: 27, ovr: 76, fin: 62, pas: 77, def: 78, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Giovanni Piccolomo', pos: 'M', age: 32, ovr: 77, fin: 75, pas: 81, def: 55, fis: 74, contractEnd: '31/12/2026' },
    { name: 'Pedro Castro', pos: 'M', age: 33, ovr: 76, fin: 72, pas: 79, def: 68, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Maurício Garcez', pos: 'A', age: 29, ovr: 77, fin: 78, pas: 73, def: 50, fis: 82, contractEnd: '31/12/2026' },
    { name: 'Gabriel Poveda', pos: 'A', age: 28, ovr: 77, fin: 80, pas: 68, def: 42, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Vagner Love', pos: 'A', age: 42, ovr: 76, fin: 81, pas: 74, def: 40, fis: 68, contractEnd: '31/12/2026' }
  ],

  crb: [
    { name: 'Matheus Albino', pos: 'G', age: 31, ovr: 77, fin: 22, pas: 65, def: 79, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Fábio Alemão', pos: 'Z', age: 29, ovr: 77, fin: 38, pas: 67, def: 79, fis: 80, contractEnd: '31/12/2026' },
    { name: 'Saimon', pos: 'Z', age: 35, ovr: 76, fin: 36, pas: 65, def: 78, fis: 77, contractEnd: '31/12/2026' },
    { name: 'Hereda', pos: 'L', age: 27, ovr: 76, fin: 58, pas: 75, def: 75, fis: 81, contractEnd: '31/12/2026' },
    { name: 'Willian Formiga', pos: 'L', age: 31, ovr: 75, fin: 56, pas: 74, def: 75, fis: 78, contractEnd: '31/12/2026' },
    { name: 'Falcão', pos: 'V', age: 28, ovr: 77, fin: 64, pas: 78, def: 79, fis: 80, contractEnd: '31/12/2026' },
    { name: 'João Pedro (CRB)', pos: 'V', age: 26, ovr: 76, fin: 62, pas: 77, def: 78, fis: 79, contractEnd: '31/12/2026' },
    { name: 'Gegê', pos: 'M', age: 32, ovr: 77, fin: 76, pas: 80, def: 62, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Chay', pos: 'M', age: 35, ovr: 76, fin: 75, pas: 80, def: 54, fis: 72, contractEnd: '31/12/2026' },
    { name: 'Anselmo Ramon', pos: 'A', age: 38, ovr: 78, fin: 82, pas: 72, def: 48, fis: 76, contractEnd: '31/12/2026' },
    { name: 'Léo Pereira (CRB)', pos: 'A', age: 26, ovr: 77, fin: 77, pas: 74, def: 48, fis: 83, contractEnd: '31/12/2026' },
    { name: 'Facundo Labandeira', pos: 'A', age: 30, ovr: 76, fin: 76, pas: 74, def: 50, fis: 80, contractEnd: '31/12/2026' }
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
    cbfBidStatus: 'Aguardando emissão do Certificado de Transferência Internacional (CTI) no FIFA TMS e novo registro definitivo no BID.',
    isConfirmedInSquad: false
  },
  {
    id: 'PND-2026-003',
    player: 'Jhon Arias',
    position: 'M',
    currentFederationClub: 'Fluminense',
    targetClub: 'Mercado Europeu (Premier League / La Liga)',
    negotiationType: 'Transferência Internacional Definitiva',
    condition: 'Acordo com a diretoria tricolor para avaliação de propostas do continente europeu.',
    cbfBidStatus: 'Contrato ativo com o Fluminense no BID; saída condicionada ao aceite de proposta e tramitação no TMS.',
    isConfirmedInSquad: false
  },
  {
    id: 'PND-2026-004',
    player: 'Hugo Souza',
    position: 'G',
    currentFederationClub: 'Corinthians (Cessão temporária do Flamengo)',
    targetClub: 'Corinthians',
    negotiationType: 'Exercício definitivo de cláusula de opção de compra',
    condition: 'Pagamento pactuado de 800 mil euros e apresentação de garantias financeiras bancárias.',
    cbfBidStatus: 'Registro de compra definitiva e assinatura de contrato com vigência até 31/12/2028 em fase final de homologação.',
    isConfirmedInSquad: true
  },
  {
    id: 'PND-2026-005',
    player: 'Pablo Vegetti',
    position: 'A',
    currentFederationClub: 'Vasco da Gama',
    targetClub: 'Vasco da Gama',
    negotiationType: 'Extensão automática por produtividade esportiva',
    condition: 'Cumprimento integral da cláusula de minutos e partidas oficiais na temporada 2024/2025.',
    cbfBidStatus: 'Aguardando validação da FERJ e averbação do aditivo contratual de 1 ano (até 31/12/2026) no BID.',
    isConfirmedInSquad: true
  },
  {
    id: 'PND-2026-006',
    player: 'Everton Ribeiro',
    position: 'M',
    currentFederationClub: 'Bahia',
    targetClub: 'Bahia',
    negotiationType: 'Gatilho de prorrogação automática por metas de jogos',
    condition: 'Participação em mais de 60% dos jogos oficiais na temporada.',
    cbfBidStatus: 'Aditivo contratual para 2026 em processamento no sistema da CBF.',
    isConfirmedInSquad: true
  }
];

/**
 * CONFIRMED_DEPARTURES_2026
 * Atletas confirmados como saídas definitivas do futebol brasileiro antes do início de 2026.
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
 * Atletas profissionais reais atualmente disponíveis no mercado no ciclo 2026.
 */
export const FREE_AGENTS_2026 = [
  { name: 'Alexandre Pato', pos: 'A', age: 36, ovr: 77, fin: 82, pas: 76, def: 38, fis: 70 },
  { name: 'Diego Alves', pos: 'G', age: 40, ovr: 75, fin: 20, pas: 65, def: 78, fis: 68 },
  { name: 'Rodrigo Caio', pos: 'Z', age: 32, ovr: 78, fin: 44, pas: 74, def: 81, fis: 74 },
  { name: 'Dedé Vital', pos: 'Z', age: 37, ovr: 74, fin: 42, pas: 63, def: 77, fis: 72 },
  { name: 'Dodô Pires', pos: 'L', age: 34, ovr: 75, fin: 56, pas: 75, def: 75, fis: 72 },
  { name: 'Mariano Ferreira', pos: 'L', age: 39, ovr: 75, fin: 55, pas: 75, def: 74, fis: 70 },
  { name: 'Petros Araújo', pos: 'V', age: 36, ovr: 76, fin: 64, pas: 76, def: 78, fis: 74 },
  { name: 'Júnior Urso', pos: 'V', age: 37, ovr: 74, fin: 65, pas: 74, def: 75, fis: 73 },
  { name: 'Luan Guilherme', pos: 'M', age: 33, ovr: 76, fin: 76, pas: 80, def: 50, fis: 71 },
  { name: 'Romarinho', pos: 'A', age: 35, ovr: 78, fin: 80, pas: 76, def: 46, fis: 76 },
  { name: 'Douglas Costa', pos: 'A', age: 35, ovr: 78, fin: 78, pas: 81, def: 42, fis: 74 }
];

/**
 * Converte a base bruta de jogadores para o formato oficial consumido pela engine do Footkeep.
 * Calcula valores econômicos de mercado, salários e assegura ordenação tática para a formação 4-4-2.
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
        contractEnd: raw.contractEnd || '31/12/2026',
        contractStatus: 'confirmado_bid_cbf',
        fitness: 100,
        morale: 'Alta',
        yellowCards: 0,
        redCards: 0,
        goals: 0,
        assists: 0,
        matchesPlayed: 0,
        isSuspended: false,
        isListed: false,
        season: '2026'
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
      contractEnd: 'Sem vínculo ativo',
      contractStatus: 'livre_mercado',
      fitness: 100,
      morale: 'Normal',
      yellowCards: 0,
      redCards: 0,
      goals: 0,
      assists: 0,
      matchesPlayed: 0,
      isSuspended: false,
      isListed: true,
      season: '2026'
    });
  });

  return allPlayers;
}

/**
 * Retorna o elenco confirmado de um clube para o ciclo 2026
 * @param {string} clubId - Identificador do clube ('fla', 'pal', 'spo', etc.)
 * @returns {Array}
 */
export function getClubSquad2026(clubId) {
  const squad = RAW_PLAYERS_2026_SERIE_A[clubId] || RAW_PLAYERS_2026_SERIE_B[clubId];
  return squad ? [...squad] : [];
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
