// Season 2026/2027 Contractual Status & Transfers Dataset for Footkeep
// Brazilian Football (Superliga Brasileira / Série A & G-16)
// Sources: Boletim Informativo Diário CBF (BID), Club Transparency Portals, Institutional Releases

export const DATASET_VERSION_METADATA = {
  project: 'Footkeep Football Manager',
  dataset: 'Season 2026 / 2027 Contractual Framework & Transfer Ledger',
  version: '2026.1.0',
  country: 'Brasil',
  targetSeason: '2026 / 2027',
  queryDate: 'Outubro de 2026',
  source: 'Boletim Informativo Diário CBF, páginas oficiais dos clubes, portais institucionais',
  methodology: {
    contractStatusCategories: [
      { id: 'confirmado', label: 'Vínculo Confirmado (Longo Prazo)', description: 'Contrato ativo com término em 2027, 2028 ou 2029 registrado no BID/TMS.' },
      { id: 'renovacao_em_andamento', label: 'Renovação em Andamento / Gatilho de Metas', description: 'Tratativas contratuais em curso, extensão priorizada ou cláusula automática de metas.' },
      { id: 'contrato_expirando', label: 'Contrato Expirando em 2026', description: 'Vínculo federativo com término previsto para o meio de 2026 (junho/julho) ou final de 2026 (dezembro).' },
      { id: 'transferido_exterior', label: 'Transferência Internacional Confirmada', description: 'Transação concluída e anunciada, atleta não atuará no clube na temporada 2026.' }
    ],
    governanceRules: 'Separação rigorosa entre vínculos federativos de cumprimento obrigatório, janelas de prorrogação e rumores pendentes de formalização cartorária/CBF.'
  }
};

/**
 * CONFIRMED_TRANSFERS_2026
 * Transferências oficiais com registro no BID/TMS e anúncios institucionais consumados
 * que impactam diretamente a composição dos elencos para a temporada 2026/2027.
 */
export const CONFIRMED_TRANSFERS_2026 = [
  {
    id: 'TRF-2026-001',
    player: 'Estêvão',
    fromClubId: 'pal',
    fromClubName: 'Palmeiras',
    toClubName: 'Chelsea FC (Inglaterra)',
    destinationType: 'exterior',
    announcedDate: 'Junho/2024',
    effectiveDate: 'Julho/2025 (Pós-Mundial de Clubes FIFA 2025)',
    status: 'confirmado_oficial',
    transferType: 'definitiva',
    feeEstimatedEur: '61.5M€ (34M fixos + 27.5M em metas)',
    impact2026: 'Atleta não integra o elenco do Palmeiras em 2026; passa a atuar exclusivamente na Premier League.',
    cbfBidStatus: 'Transferência internacional autorizada com emissão de CTI via FIFA TMS.'
  },
  {
    id: 'TRF-2026-002',
    player: 'Nicolás De la Cruz',
    fromClubName: 'River Plate (Argentina)',
    toClubId: 'fla',
    toClubName: 'Flamengo',
    destinationType: 'nacional',
    announcedDate: 'Dezembro/2023',
    effectiveDate: 'Janeiro/2024',
    contractExpiry: '31/12/2028',
    status: 'confirmado_oficial',
    transferType: 'definitiva',
    feeEstimatedEur: '14.5M€ (Pagamento integral de cláusula rescisória)',
    impact2026: 'Contrato plurianual em vigor com validade estendida até dezembro de 2028. Peça central do meio-campo.',
    cbfBidStatus: 'Registrado regularmente no BID da CBF.'
  },
  {
    id: 'TRF-2026-003',
    player: 'Felipe Anderson',
    fromClubName: 'SS Lazio (Itália)',
    toClubId: 'pal',
    toClubName: 'Palmeiras',
    destinationType: 'nacional',
    announcedDate: 'Abril/2024',
    effectiveDate: 'Julho/2024',
    contractExpiry: '31/12/2027',
    status: 'confirmado_oficial',
    transferType: 'livre_pre_contrato',
    feeEstimatedEur: 'Custo de aquisição zero (salários e luvas contratuais)',
    impact2026: 'Vínculo ativo de longo prazo até 31 de dezembro de 2027.',
    cbfBidStatus: 'Registrado no BID da CBF.'
  },
  {
    id: 'TRF-2026-004',
    player: 'Carlos Alcaraz',
    fromClubName: 'Southampton FC (Inglaterra)',
    toClubId: 'fla',
    toClubName: 'Flamengo',
    destinationType: 'nacional',
    announcedDate: 'Agosto/2024',
    effectiveDate: 'Agosto/2024',
    contractExpiry: '31/08/2029',
    status: 'confirmado_oficial',
    transferType: 'definitiva',
    feeEstimatedEur: '18M€ (Contratação mais cara da história do clube)',
    impact2026: 'Vínculo ativo de 5 temporadas até agosto de 2029.',
    cbfBidStatus: 'Registrado no BID da CBF e homologado no TMS.'
  },
  {
    id: 'TRF-2026-005',
    player: 'Thiago Almada',
    fromClubId: 'bot',
    fromClubName: 'Botafogo',
    toClubName: 'Olympique Lyonnais (França) / Eagle Football Holdings',
    destinationType: 'exterior',
    announcedDate: 'Julho/2024',
    effectiveDate: '2025 (Transição planejada para a Europa via rede multiclubes)',
    status: 'confirmado_oficial',
    transferType: 'definitiva_com_ponte_internacional',
    feeEstimatedEur: '21M€ (25M USD)',
    impact2026: 'Transição estruturada para a Ligue 1 europeia.',
    cbfBidStatus: 'Vínculo associado aos direitos patrimoniais da Eagle Football com programação de cessão.'
  },
  {
    id: 'TRF-2026-006',
    player: 'Matheus Henrique',
    fromClubName: 'US Sassuolo (Itália)',
    toClubId: 'cru',
    toClubName: 'Cruzeiro',
    destinationType: 'nacional',
    announcedDate: 'Junho/2024',
    effectiveDate: 'Julho/2024',
    contractExpiry: '30/06/2029',
    status: 'confirmado_oficial',
    transferType: 'definitiva',
    feeEstimatedEur: '8.5M€',
    impact2026: 'Contrato plurianual de 5 anos até junho de 2029, consolidado na espinha dorsal celeste.',
    cbfBidStatus: 'Registrado no BID da CBF.'
  },
  {
    id: 'TRF-2026-007',
    player: 'Kaio Jorge',
    fromClubName: 'Juventus FC (Itália)',
    toClubId: 'cru',
    toClubName: 'Cruzeiro',
    destinationType: 'nacional',
    announcedDate: 'Junho/2024',
    effectiveDate: 'Julho/2024',
    contractExpiry: '30/06/2029',
    status: 'confirmado_oficial',
    transferType: 'definitiva',
    feeEstimatedEur: '7.2M€',
    impact2026: 'Contrato ativo até meados de 2029 como titular do ataque.',
    cbfBidStatus: 'Registrado no BID da CBF.'
  },
  {
    id: 'TRF-2026-008',
    player: 'Walace',
    fromClubName: 'Udinese Calcio (Itália)',
    toClubId: 'cru',
    toClubName: 'Cruzeiro',
    destinationType: 'nacional',
    announcedDate: 'Junho/2024',
    effectiveDate: 'Julho/2024',
    contractExpiry: '30/06/2028',
    status: 'confirmado_oficial',
    transferType: 'definitiva',
    feeEstimatedEur: '6.0M€',
    impact2026: 'Contrato até 2028 atuando no meio-campo.',
    cbfBidStatus: 'Registrado no BID da CBF.'
  },
  {
    id: 'TRF-2026-009',
    player: 'Agustín Giay',
    fromClubName: 'San Lorenzo (Argentina)',
    toClubId: 'pal',
    toClubName: 'Palmeiras',
    destinationType: 'nacional',
    announcedDate: 'Junho/2024',
    effectiveDate: 'Julho/2024',
    contractExpiry: '30/06/2029',
    status: 'confirmado_oficial',
    transferType: 'definitiva',
    feeEstimatedEur: '7.5M USD',
    impact2026: 'Contrato até junho de 2029 garantindo estabilidade na lateral-direita.',
    cbfBidStatus: 'Registrado no BID da CBF.'
  },
  {
    id: 'TRF-2026-010',
    player: 'Alex Sandro',
    fromClubName: 'Juventus FC (Itália)',
    toClubId: 'fla',
    toClubName: 'Flamengo',
    destinationType: 'nacional',
    announcedDate: 'Agosto/2024',
    effectiveDate: 'Agosto/2024',
    contractExpiry: '31/12/2026',
    status: 'confirmado_oficial',
    transferType: 'livre',
    feeEstimatedEur: 'Sem taxa de transferência',
    impact2026: 'Ano final de contrato em 2026; líder e titular na lateral-esquerda.',
    cbfBidStatus: 'Registrado no BID da CBF.'
  },
  {
    id: 'TRF-2026-011',
    player: 'Gonzalo Plata',
    fromClubName: 'Al-Sadd SC (Catar)',
    toClubId: 'fla',
    toClubName: 'Flamengo',
    destinationType: 'nacional',
    announcedDate: 'Agosto/2024',
    effectiveDate: 'Agosto/2024',
    contractExpiry: '29/08/2029',
    status: 'confirmado_oficial',
    transferType: 'definitiva',
    feeEstimatedEur: '8.5M€ (Mais bonificações)',
    impact2026: 'Contrato de 5 anos até 2029 com vínculo consolidado.',
    cbfBidStatus: 'Registrado no BID da CBF.'
  },
  {
    id: 'TRF-2026-012',
    player: 'Lucho Rodríguez',
    fromClubName: 'Liverpool FC (Uruguai)',
    toClubId: 'bah',
    toClubName: 'Bahia',
    destinationType: 'nacional',
    announcedDate: 'Julho/2024',
    effectiveDate: 'Julho/2024',
    contractExpiry: '30/06/2029',
    status: 'confirmado_oficial',
    transferType: 'definitiva',
    feeEstimatedEur: '12M USD (Maior contratação do futebol nordestino)',
    impact2026: 'Contrato de longo prazo com o Grupo City até meados de 2029.',
    cbfBidStatus: 'Registrado no BID da CBF.'
  },
  {
    id: 'TRF-2026-013',
    player: 'Memphis Depay',
    fromClubName: 'Atlético de Madrid (Espanha)',
    toClubId: 'cor',
    toClubName: 'Corinthians',
    destinationType: 'nacional',
    announcedDate: 'Setembro/2024',
    effectiveDate: 'Setembro/2024',
    contractExpiry: '31/07/2026',
    status: 'confirmado_oficial',
    transferType: 'livre',
    feeEstimatedEur: 'Sem taxa de transferência (pacote de marketing e patrocínio máster)',
    impact2026: 'Contrato expira no segundo semestre de 2026 (31/07/2026); momento decisivo de prorrogação ou término.',
    cbfBidStatus: 'Registrado no BID da CBF.'
  },
  {
    id: 'TRF-2026-014',
    player: 'Martin Braithwaite',
    fromClubName: 'RCD Espanyol (Espanha)',
    toClubId: 'gre',
    toClubName: 'Grêmio',
    destinationType: 'nacional',
    announcedDate: 'Julho/2024',
    effectiveDate: 'Julho/2024',
    contractExpiry: '30/06/2026',
    status: 'confirmado_oficial',
    transferType: 'livre',
    feeEstimatedEur: 'Sem taxa de transferência',
    impact2026: 'Contrato ativo com encerramento previsto para 30/06/2026.',
    cbfBidStatus: 'Registrado no BID da CBF.'
  }
];

/**
 * CONTRACT_STATUS_2026
 * Mapeamento pormenorizado do status contratual dos atletas dos 16 principais clubes do futebol brasileiro
 * para a temporada 2026/2027.
 */
export const CONTRACT_STATUS_2026 = {
  fla: {
    clubName: 'Flamengo',
    shortName: 'FLA',
    players: [
      { name: 'Agustín Rossi', pos: 'G', contractEnd: '31/12/2027', status: 'confirmado', notes: 'Goleiro titular absoluto com contrato até o final de 2027.' },
      { name: 'Matheus Cunha', pos: 'G', contractEnd: '31/12/2025', status: 'renovacao_em_andamento', notes: 'Goleiro reserva com proposta de renovação até 2028.' },
      { name: 'Léo Ortiz', pos: 'Z', contractEnd: '31/12/2028', status: 'confirmado', notes: 'Vínculo de longo prazo assinado em 2024.' },
      { name: 'Léo Pereira', pos: 'Z', contractEnd: '31/12/2027', status: 'confirmado', notes: 'Contrato renovado em 2023 com vigência até 2027.' },
      { name: 'Fabrício Bruno', pos: 'Z', contractEnd: '31/12/2028', status: 'confirmado', notes: 'Renovação recente com valorização salarial após sondagens da Europa.' },
      { name: 'David Luiz', pos: 'Z', contractEnd: '31/12/2024', status: 'contrato_expirando', notes: 'Encerramento de ciclo contratual no fim de 2024 / transição.' },
      { name: 'Alex Sandro', pos: 'L', contractEnd: '31/12/2026', status: 'contrato_expirando', notes: 'Temporada final do contrato assinado em agosto de 2024.' },
      { name: 'Ayrton Lucas', pos: 'L', contractEnd: '31/12/2027', status: 'confirmado', notes: 'Vínculo consolidado até dezembro de 2027.' },
      { name: 'Guillermo Varela', pos: 'L', contractEnd: '31/12/2025', status: 'renovacao_em_andamento', notes: 'Cláusula de opção para prorrogação até fim de 2026.' },
      { name: 'Erick Pulgar', pos: 'V', contractEnd: '31/12/2025', status: 'renovacao_em_andamento', notes: 'Negociação aberta para extensão até dezembro de 2027.' },
      { name: 'Nicolás De la Cruz', pos: 'M', contractEnd: '31/12/2028', status: 'confirmado', notes: 'Contrato plurianual de referência até 2028.' },
      { name: 'Carlos Alcaraz', pos: 'M', contractEnd: '31/08/2029', status: 'confirmado', notes: 'Vínculo de 5 anos até agosto de 2029.' },
      { name: 'Gerson', pos: 'M', contractEnd: '31/12/2027', status: 'confirmado', notes: 'Capitão com vínculo garantido até 2027.' },
      { name: 'Giorgian De Arrascaeta', pos: 'M', contractEnd: '31/12/2026', status: 'contrato_expirando', notes: 'Ano final do vínculo assinado em 2022; ídolo histórico com conversas para extensão.' },
      { name: 'Matheus Gonçalves', pos: 'M', contractEnd: '31/12/2027', status: 'confirmado', notes: 'Cria do ninho com multa rescisória internacional de 100M€.' },
      { name: 'Pedro', pos: 'A', contractEnd: '31/12/2027', status: 'confirmado', notes: 'Artilheiro do time com vínculo garantido até 31/12/2027.' },
      { name: 'Gonzalo Plata', pos: 'A', contractEnd: '29/08/2029', status: 'confirmado', notes: 'Contrato longo de 5 anos assinado em 2024.' },
      { name: 'Michael', pos: 'A', contractEnd: '31/12/2028', status: 'confirmado', notes: 'Retorno ao clube com contrato até 2028.' },
      { name: 'Luiz Araújo', pos: 'A', contractEnd: '31/12/2027', status: 'confirmado', notes: 'Contrato ativo com estabilidade no ataque.' },
      { name: 'Bruno Henrique', pos: 'A', contractEnd: '31/12/2026', status: 'contrato_expirando', notes: 'Renovado no fim de 2023 por 3 temporadas até o término de 2026.' }
    ]
  },

  pal: {
    clubName: 'Palmeiras',
    shortName: 'PAL',
    players: [
      { name: 'Weverton', pos: 'G', contractEnd: '31/12/2026', status: 'contrato_expirando', notes: 'Contrato vigente até o final da temporada 2026.' },
      { name: 'Marcelo Lomba', pos: 'G', contractEnd: '31/12/2025', status: 'renovacao_em_andamento', notes: 'Renovações anuais por produtividade.' },
      { name: 'Gustavo Gómez', pos: 'Z', contractEnd: '31/12/2026', status: 'contrato_expirando', notes: 'Capitão e líder com contrato até dezembro de 2026.' },
      { name: 'Murilo', pos: 'Z', contractEnd: '31/12/2027', status: 'confirmado', notes: 'Contrato estendido no início de 2024 até 2027.' },
      { name: 'Vitor Reis', pos: 'Z', contractEnd: '31/12/2028', status: 'confirmado', notes: 'Jovem zagueiro com renovação até dez/2028 e multa de 100M€.' },
      { name: 'Kaiky Naves', pos: 'Z', contractEnd: '31/12/2028', status: 'confirmado', notes: 'Renovado até 2028.' },
      { name: 'Joaquín Piquerez', pos: 'L', contractEnd: '31/12/2026', status: 'renovacao_em_andamento', notes: 'Destaque com conversas preliminares para prorrogação até 2028.' },
      { name: 'Agustín Giay', pos: 'L', contractEnd: '30/06/2029', status: 'confirmado', notes: 'Lateral jovem contratado até 2029.' },
      { name: 'Mayke', pos: 'L', contractEnd: '31/12/2025', status: 'renovacao_em_andamento', notes: 'Gatilho para extensão até o fim de 2026.' },
      { name: 'Aníbal Moreno', pos: 'V', contractEnd: '31/12/2028', status: 'confirmado', notes: 'Contrato assinado até o encerramento de 2028.' },
      { name: 'Richard Ríos', pos: 'M', contractEnd: '31/12/2028', status: 'confirmado', notes: 'Renovação com aumento salarial até 2028 após Copa América.' },
      { name: 'Maurício', pos: 'M', contractEnd: '31/12/2028', status: 'confirmado', notes: 'Contrato de 5 temporadas assinado em junho de 2024.' },
      { name: 'Felipe Anderson', pos: 'M', contractEnd: '31/12/2027', status: 'confirmado', notes: 'Contrato de alto rendimento com validade até dezembro de 2027.' },
      { name: 'Raphael Veiga', pos: 'M', contractEnd: '31/03/2027', status: 'confirmado', notes: 'Vínculo ativo até março de 2027.' },
      { name: 'Estêvão', pos: 'A', contractEnd: '30/06/2025', status: 'transferido_exterior', notes: 'Vendido oficialmente ao Chelsea FC por ~61.5M€; se apresenta em julho de 2025.' },
      { name: 'Flaco López', pos: 'A', contractEnd: '31/12/2027', status: 'confirmado', notes: 'Artilheiro do clube com contrato estendido até dezembro de 2027.' },
      { name: 'Dudu', pos: 'A', contractEnd: '31/12/2025', status: 'renovacao_em_andamento', notes: 'Contrato com meta de renovação automática para 2026.' },
      { name: 'Rony', pos: 'A', contractEnd: '31/12/2026', status: 'contrato_expirando', notes: 'Contrato vigente até dezembro de 2026.' }
    ]
  },

  bot: {
    clubName: 'Botafogo',
    shortName: 'BOT',
    players: [
      { name: 'John Victor', pos: 'G', contractEnd: '31/12/2027', status: 'confirmado', notes: 'Contrato definitivo com o goleiro até o fim de 2027.' },
      { name: 'Alexander Barboza', pos: 'Z', contractEnd: '31/12/2026', status: 'contrato_expirando', notes: 'Contrato firmado até o término da temporada 2026.' },
      { name: 'Bastos', pos: 'Z', contractEnd: '31/12/2025', status: 'renovacao_em_andamento', notes: 'Conversas para extensão até dezembro de 2026 pelo alto rendimento.' },
      { name: 'Alex Telles', pos: 'L', contractEnd: '31/12/2026', status: 'contrato_expirando', notes: 'Contrato firmado em setembro de 2024 por duas temporadas e meia.' },
      { name: 'Vitinho', pos: 'L', contractEnd: '30/06/2029', status: 'confirmado', notes: 'Contrato assinado em agosto de 2024 com 5 anos de duração.' },
      { name: 'Marlon Freitas', pos: 'V', contractEnd: '31/12/2026', status: 'renovacao_em_andamento', notes: 'Líder técnico do meio-campo com negociação para estender até 2027.' },
      { name: 'Gregore', pos: 'V', contractEnd: '31/12/2026', status: 'contrato_expirando', notes: 'Contrato regular até 31/12/2026.' },
      { name: 'Jefferson Savarino', pos: 'M', contractEnd: '31/12/2026', status: 'renovacao_em_andamento', notes: 'Destaque ofensivo; clube estuda extensão do vínculo.' },
      { name: 'Matheus Martins', pos: 'M', contractEnd: '30/06/2028', status: 'confirmado', notes: 'Contrato longo adquirido junto à Udinese até 2028.' },
      { name: 'Igor Jesus', pos: 'A', contractEnd: '31/12/2027', status: 'confirmado', notes: 'Destaque e convocado à Seleção Brasileira, vínculo até 2027.' },
      { name: 'Luiz Henrique', pos: 'A', contractEnd: '31/12/2028', status: 'confirmado', notes: 'Contrato até 2028 com cláusula de opção para o futebol europeu (Eagle Football).' }
    ]
  },

  sao: {
    clubName: 'São Paulo',
    shortName: 'SAO',
    players: [
      { name: 'Lucas Moura', pos: 'M', contractEnd: '31/12/2026', status: 'contrato_expirando', notes: 'Contrato renovado por 3 anos com término em 31/12/2026.' },
      { name: 'Jonathan Calleri', pos: 'A', contractEnd: '31/12/2026', status: 'contrato_expirando', notes: 'Referência ofensiva com término de contrato previsto para o final de 2026.' },
      { name: 'Luciano', pos: 'A', contractEnd: '31/12/2026', status: 'contrato_expirando', notes: 'Contrato estendido até dezembro de 2026.' },
      { name: 'Nahuel Ferraresi', pos: 'Z', contractEnd: '31/12/2027', status: 'confirmado', notes: 'Comprado em definitivo com contrato até o final de 2027.' },
      { name: 'Damián Bobadilla', pos: 'M', contractEnd: '31/12/2027', status: 'confirmado', notes: 'Volante paraguaio contratado com vínculo até 2027.' },
      { name: 'William Gomes', pos: 'A', contractEnd: '31/12/2028', status: 'confirmado', notes: 'Jovem joia de Cotia com renovação recente e multa milionária até 2028.' },
      { name: 'Pablo Maia', pos: 'V', contractEnd: '31/12/2027', status: 'confirmado', notes: 'Contrato sólido até 31/12/2027.' },
      { name: 'Rodrigo Nestor', pos: 'M', contractEnd: '31/12/2027', status: 'confirmado', notes: 'Autor do gol do título da Copa do Brasil com contrato até 2027.' },
      { name: 'Rafael', pos: 'G', contractEnd: '31/12/2025', status: 'renovacao_em_andamento', notes: 'Conversas para estender o vínculo do goleiro até dezembro de 2026/2027.' }
    ]
  },

  cor: {
    clubName: 'Corinthians',
    shortName: 'COR',
    players: [
      { name: 'Memphis Depay', pos: 'A', contractEnd: '31/07/2026', status: 'contrato_expirando', notes: 'Maior estrela internacional do clube; contrato termina em julho de 2026.' },
      { name: 'Rodrigo Garro', pos: 'M', contractEnd: '31/12/2027', status: 'confirmado', notes: 'Renovado com aumento salarial e extensão contratual até o fim de 2027.' },
      { name: 'Yuri Alberto', pos: 'A', contractEnd: '31/12/2027', status: 'confirmado', notes: 'Contrato de 5 temporadas vigente até dezembro de 2027.' },
      { name: 'André Ramalho', pos: 'Z', contractEnd: '31/12/2026', status: 'contrato_expirando', notes: 'Zagueiro titular com contrato válido até o encerramento de 2026.' },
      { name: 'José Martínez', pos: 'V', contractEnd: '31/12/2027', status: 'confirmado', notes: 'Volante venezuelano contratado em 2024 até o fim de 2027.' },
      { name: 'Alex Santana', pos: 'V', contractEnd: '31/12/2027', status: 'confirmado', notes: 'Contrato assinado em julho de 2024 até 2027.' },
      { name: 'Breno Bidon', pos: 'M', contractEnd: '31/12/2028', status: 'confirmado', notes: 'Eleito melhor jogador da Copinha, renovou com multa europeia até 2028.' },
      { name: 'Hugo Souza', pos: 'G', contractEnd: '31/12/2028', status: 'confirmado', notes: 'Aquisição em definitivo junto ao Flamengo com contrato firmado até 2028.' },
      { name: 'Félix Torres', pos: 'Z', contractEnd: '31/12/2027', status: 'confirmado', notes: 'Zagueiro equatoriano com contrato longo até dezembro de 2027.' },
      { name: 'Ángel Romero', pos: 'A', contractEnd: '31/12/2025', status: 'renovacao_em_andamento', notes: 'Artilheiro da Neo Química Arena em negociação para estender até fim de 2026.' }
    ]
  },

  flu: {
    clubName: 'Fluminense',
    shortName: 'FLU',
    players: [
      { name: 'Thiago Silva', pos: 'Z', contractEnd: '30/06/2026', status: 'contrato_expirando', notes: 'Contrato histórico de retorno assinado em 2024 válido até 30/06/2026.' },
      { name: 'Kauã Elias', pos: 'A', contractEnd: '31/12/2027', status: 'confirmado', notes: 'Jovem centroavante revelação com contrato até o final de 2027.' },
      { name: 'Facundo Bernal', pos: 'V', contractEnd: '31/07/2028', status: 'confirmado', notes: 'Promessa uruguaia adquirida em 2024 com contrato de 4 anos.' },
      { name: 'Kevin Serna', pos: 'A', contractEnd: '31/12/2027', status: 'confirmado', notes: 'Contrato de 3 anos e meio assinado em julho de 2024.' },
      { name: 'Jhon Arias', pos: 'M', contractEnd: '30/06/2026', status: 'contrato_expirando', notes: 'Destaque tricolor com contrato até meados de 2026 e tratativas de renovação ou venda internacional.' },
      { name: 'Paulo Henrique Ganso', pos: 'M', contractEnd: '31/12/2025', status: 'renovacao_em_andamento', notes: 'Camisa 10 com conversas adiantadas para estender até o final de 2026.' },
      { name: 'Fábio', pos: 'G', contractEnd: '31/12/2025', status: 'renovacao_em_andamento', notes: 'Avaliação física anual para possível prorrogação comemorativa até 2026.' },
      { name: 'Martinelli', pos: 'V', contractEnd: '31/12/2026', status: 'contrato_expirando', notes: 'Vínculo vigente até o término da temporada 2026.' }
    ]
  },

  cam: {
    clubName: 'Atlético Mineiro',
    shortName: 'CAM',
    players: [
      { name: 'Hulk', pos: 'A', contractEnd: '31/12/2026', status: 'confirmado', notes: 'Renovação assinada até o final de 2026 com gatilho para 2027.' },
      { name: 'Gustavo Scarpa', pos: 'M', contractEnd: '31/12/2027', status: 'confirmado', notes: 'Contrato assinado em janeiro de 2024 com término em dezembro de 2027.' },
      { name: 'Bernard', pos: 'A', contractEnd: '31/12/2027', status: 'confirmado', notes: 'Retorno anunciado em 2024 com contrato de 3 anos e meio até 2027.' },
      { name: 'Lyanco', pos: 'Z', contractEnd: '31/12/2028', status: 'confirmado', notes: 'Zagueiro contratado junto ao Southampton com vínculo até 2028.' },
      { name: 'Fausto Vera', pos: 'V', contractEnd: '31/12/2027', status: 'confirmado', notes: 'Vínculo adquirido em definitivo com contrato até dezembro de 2027.' },
      { name: 'Guilherme Arana', pos: 'L', contractEnd: '31/12/2027', status: 'confirmado', notes: 'Lateral da Seleção com contrato renovado até 31/12/2027.' },
      { name: 'Paulinho', pos: 'A', contractEnd: '31/12/2026', status: 'contrato_expirando', notes: 'Artilheiro com contrato até fim de 2026 e clube preparando renovação prioritária.' },
      { name: 'Deyverson', pos: 'A', contractEnd: '31/12/2025', status: 'renovacao_em_andamento', notes: 'Contrato até o fim de 2025 com meta de extensão automática para 2026.' },
      { name: 'Éverson', pos: 'G', contractEnd: '31/12/2025', status: 'renovacao_em_andamento', notes: 'Goleiro titular em tratativas para estender por mais dois anos (até 2027).' }
    ]
  },

  cru: {
    clubName: 'Cruzeiro',
    shortName: 'CRU',
    players: [
      { name: 'Matheus Pereira', pos: 'M', contractEnd: '30/06/2026', status: 'contrato_expirando', notes: 'Camisa 10 adquirido em definitivo em 2024 com contrato de 2 anos até junho de 2026.' },
      { name: 'Matheus Henrique', pos: 'M', contractEnd: '30/06/2029', status: 'confirmado', notes: 'Contrato longo de 5 anos até meados de 2029.' },
      { name: 'Kaio Jorge', pos: 'A', contractEnd: '30/06/2029', status: 'confirmado', notes: 'Vínculo contratual de 5 anos até 2029.' },
      { name: 'Walace', pos: 'V', contractEnd: '30/06/2028', status: 'confirmado', notes: 'Contrato de 4 anos até meados de 2028.' },
      { name: 'Cássio', pos: 'G', contractEnd: '31/05/2027', status: 'confirmado', notes: 'Contrato de 3 anos assinado em maio de 2024 com validade até maio de 2027.' },
      { name: 'Fabrizio Peralta', pos: 'M', contractEnd: '30/06/2029', status: 'confirmado', notes: 'Volante da seleção paraguaia adquirido até junho de 2029.' },
      { name: 'William', pos: 'L', contractEnd: '31/12/2026', status: 'renovacao_em_andamento', notes: 'Lateral-direito convocado à Seleção; proposta de ampliação até 2028.' },
      { name: 'Lucas Romero', pos: 'V', contractEnd: '31/12/2025', status: 'renovacao_em_andamento', notes: 'Cláusula de renovação por metas esportivas para 2026.' }
    ]
  },

  int: {
    clubName: 'Internacional',
    shortName: 'INT',
    players: [
      { name: 'Rafael Borré', pos: 'A', contractEnd: '31/12/2028', status: 'confirmado', notes: 'Atacante colombiano com contrato plurianual até dezembro de 2028.' },
      { name: 'Alan Patrick', pos: 'M', contractEnd: '31/12/2026', status: 'contrato_expirando', notes: 'Capitão e maestro com renovação até o término da temporada 2026.' },
      { name: 'Enner Valencia', pos: 'A', contractEnd: '30/06/2026', status: 'contrato_expirando', notes: 'Contrato assinado em 2023 válido por 3 anos até 30 de junho de 2026.' },
      { name: 'Gabriel Carvalho', pos: 'M', contractEnd: '31/12/2028', status: 'confirmado', notes: 'Revelação da base com renovação até 2028 e multa internacional de 60M€.' },
      { name: 'Thiago Maia', pos: 'V', contractEnd: '31/12/2026', status: 'confirmado', notes: 'Adquirido em definitivo com contrato até dezembro de 2026.' },
      { name: 'Bruno Gomes', pos: 'M', contractEnd: '31/12/2027', status: 'confirmado', notes: 'Contrato até o final de 2027.' },
      { name: 'Sergio Rochet', pos: 'G', contractEnd: '31/12/2026', status: 'contrato_expirando', notes: 'Goleiro titular da seleção uruguaia com vínculo até dezembro de 2026.' },
      { name: 'Vitão', pos: 'Z', contractEnd: '31/12/2026', status: 'renovacao_em_andamento', notes: 'Contrato definitivo com o Inter após término de suspensão da FIFA.' }
    ]
  },

  gre: {
    clubName: 'Grêmio',
    shortName: 'GRE',
    players: [
      { name: 'Martin Braithwaite', pos: 'A', contractEnd: '30/06/2026', status: 'contrato_expirando', notes: 'Atacante dinamarquês com vínculo de 2 anos até 30/06/2026.' },
      { name: 'Alexander Aravena', pos: 'A', contractEnd: '31/12/2028', status: 'confirmado', notes: 'Atacante chileno com contrato de 4 anos e meio até o término de 2028.' },
      { name: 'Mathías Villasanti', pos: 'V', contractEnd: '31/12/2027', status: 'confirmado', notes: 'Renovado no início de 2024 com vínculo firme até dezembro de 2027.' },
      { name: 'Miguel Monsalve', pos: 'M', contractEnd: '31/12/2028', status: 'confirmado', notes: 'Meia colombiano contratado em 2024 com contrato de longo prazo até 2028.' },
      { name: 'Franco Cristaldo', pos: 'M', contractEnd: '31/12/2026', status: 'renovacao_em_andamento', notes: 'Camisa 10 em processo de revisão salarial e ampliação do contrato.' },
      { name: 'Walter Kannemann', pos: 'Z', contractEnd: '31/12/2025', status: 'renovacao_em_andamento', notes: 'Cláusula de metas e conversas para renovação anual até 2026.' },
      { name: 'Agustín Marchesín', pos: 'G', contractEnd: '31/12/2025', status: 'renovacao_em_andamento', notes: 'Goleiro titular com opção de extensão contratual para 2026.' }
    ]
  },

  vas: {
    clubName: 'Vasco da Gama',
    shortName: 'VAS',
    players: [
      { name: 'Lucas Piton', pos: 'L', contractEnd: '31/12/2028', status: 'confirmado', notes: 'Contrato renovado em 2024 até o término de 2028.' },
      { name: 'João Victor', pos: 'Z', contractEnd: '31/12/2028', status: 'confirmado', notes: 'Zagueiro contratado junto ao Benfica com vínculo de 5 anos até 2028.' },
      { name: 'Hugo Moura', pos: 'V', contractEnd: '31/12/2026', status: 'confirmado', notes: 'Opção de compra acionada com contrato definitivo até 2026.' },
      { name: 'Rayan', pos: 'A', contractEnd: '31/12/2026', status: 'renovacao_em_andamento', notes: 'Jovem promessa com alta procura internacional; clube busca ampliar vínculo.' },
      { name: 'Pablo Vegetti', pos: 'A', contractEnd: '31/12/2025', status: 'renovacao_em_andamento', notes: 'Gatilho automático de renovação até 31/12/2026 vinculado a número de partidas.' },
      { name: 'Philippe Coutinho', pos: 'M', contractEnd: '30/06/2025', status: 'renovacao_em_andamento', notes: 'Empréstimo vigente com negociação de extensão plurianual para consolidar permanência até 2026/2027.' },
      { name: 'Léo Jardim', pos: 'G', contractEnd: '31/12/2025', status: 'renovacao_em_andamento', notes: 'Destaque e convocado à Seleção; tratativas prioritárias para extensão até 2028.' },
      { name: 'Dimitri Payet', pos: 'M', contractEnd: '30/06/2025', status: 'contrato_expirando', notes: 'Vínculo até o meio de 2025; planejamento de transição ou término de ciclo.' }
    ]
  },

  bah: {
    clubName: 'Bahia',
    shortName: 'BAH',
    players: [
      { name: 'Jean Lucas', pos: 'V', contractEnd: '31/12/2028', status: 'confirmado', notes: 'Contrato de 5 temporadas adquirido em 2024 até o fim de 2028.' },
      { name: 'Cauly', pos: 'M', contractEnd: '31/12/2028', status: 'confirmado', notes: 'Contrato renovado e blindado contra o assédio de rivais até dezembro de 2028.' },
      { name: 'Lucho Rodríguez', pos: 'A', contractEnd: '30/06/2029', status: 'confirmado', notes: 'Investimento histórico do City Football Group com contrato de 5 anos.' },
      { name: 'Luciano Juba', pos: 'L', contractEnd: '31/12/2027', status: 'confirmado', notes: 'Lateral/ponta com vínculo garantido até o encerramento de 2027.' },
      { name: 'Thaciano', pos: 'M', contractEnd: '31/12/2027', status: 'confirmado', notes: 'Contrato renovado em 2024 com vigência estendida até 2027.' },
      { name: 'Everton Ribeiro', pos: 'M', contractEnd: '31/12/2025', status: 'renovacao_em_andamento', notes: 'Contrato com cláusula de renovação automática para 2026 vinculada a metas de participação.' },
      { name: 'Santiago Arias', pos: 'L', contractEnd: '31/12/2025', status: 'renovacao_em_andamento', notes: 'Lateral experiente com opção mútua de prorrogação para 2026.' }
    ]
  },

  for: {
    clubName: 'Fortaleza',
    shortName: 'FOR',
    players: [
      { name: 'Juan Martín Lucero', pos: 'A', contractEnd: '31/12/2027', status: 'confirmado', notes: 'Contrato renovado em 2024 estendendo o vínculo até o fim de 2027.' },
      { name: 'Kervin Andrade', pos: 'M', contractEnd: '31/12/2028', status: 'confirmado', notes: 'Jovem talento venezuelano comprado em definitivo até o encerramento de 2028.' },
      { name: 'Moisés', pos: 'A', contractEnd: '31/12/2027', status: 'confirmado', notes: 'Retorno ao clube com contrato firmado até o final de 2027.' },
      { name: 'João Ricardo', pos: 'G', contractEnd: '31/12/2027', status: 'confirmado', notes: 'Goleiro titular renovado até dezembro de 2027.' },
      { name: 'Hércules', pos: 'V', contractEnd: '31/12/2026', status: 'contrato_expirando', notes: 'Volante valorizado com contrato vigente até o encerramento de 2026.' },
      { name: 'Tomás Pochettino', pos: 'M', contractEnd: '31/12/2025', status: 'renovacao_em_andamento', notes: 'Conversas para adiantar prorrogação contratual até 2027.' },
      { name: 'Emanuel Brítez', pos: 'Z', contractEnd: '31/12/2025', status: 'renovacao_em_andamento', notes: 'Gatilhos de minutos jogados para ampliação do contrato até 2026.' }
    ]
  },

  cap: {
    clubName: 'Athletico Paranaense',
    shortName: 'CAP',
    players: [
      { name: 'Bruno Zapelli', pos: 'M', contractEnd: '31/12/2028', status: 'confirmado', notes: 'Camisa 10 contratado com vínculo de 5 temporadas até 2028.' },
      { name: 'Mycael', pos: 'G', contractEnd: '31/12/2027', status: 'confirmado', notes: 'Goleiro titular da base da Seleção Brasileira com contrato até 2027.' },
      { name: 'Tomás Cuello', pos: 'A', contractEnd: '31/12/2026', status: 'contrato_expirando', notes: 'Contrato ativo com encerramento previsto para dezembro de 2026.' },
      { name: 'Agustín Canobbio', pos: 'A', contractEnd: '31/12/2026', status: 'contrato_expirando', notes: 'Vínculo do atacante uruguaio válido até o fim de 2026.' },
      { name: 'Christian', pos: 'V', contractEnd: '31/12/2025', status: 'renovacao_em_andamento', notes: 'Tratativas para renovação plurianual ou transferência.' },
      { name: 'Fernandinho', pos: 'V', contractEnd: '31/12/2024', status: 'contrato_expirando', notes: 'Líder e veterano definindo permanência ano a ano.' }
    ]
  },

  san: {
    clubName: 'Santos',
    shortName: 'SAN',
    players: [
      { name: 'JP Chermont', pos: 'L', contractEnd: '31/12/2027', status: 'confirmado', notes: 'Lateral-direito da base blindado com contrato até o final de 2027 e multa de 70M€.' },
      { name: 'Jair Paula', pos: 'Z', contractEnd: '31/12/2026', status: 'confirmado', notes: 'Zagueiro titular e joia da Vila com contrato até dezembro de 2026.' },
      { name: 'Gabriel Brazão', pos: 'G', contractEnd: '31/12/2026', status: 'confirmado', notes: 'Goleiro contratado junto à Inter de Milão com contrato até 2026.' },
      { name: 'Guilherme', pos: 'A', contractEnd: '31/12/2026', status: 'confirmado', notes: 'Artilheiro do time na temporada com contrato até 31/12/2026.' },
      { name: 'João Schmidt', pos: 'V', contractEnd: '31/12/2025', status: 'renovacao_em_andamento', notes: 'Cláusula de renovação para 2026 com base no acesso à Série A.' },
      { name: 'Giuliano', pos: 'M', contractEnd: '31/12/2024', status: 'renovacao_em_andamento', notes: 'Contrato inicial de um ano com opção mútua de extensão para o biênio 2025/2026.' }
    ]
  },

  rbb: {
    clubName: 'Red Bull Bragantino',
    shortName: 'RBB',
    players: [
      { name: 'Jhon Jhon', pos: 'M', contractEnd: '30/06/2029', status: 'confirmado', notes: 'Contratado junto ao Palmeiras com contrato de 5 temporadas até 2029.' },
      { name: 'Henry Mosquera', pos: 'A', contractEnd: '31/12/2027', status: 'confirmado', notes: 'Atacante colombiano com vínculo federativo até dezembro de 2027.' },
      { name: 'Cleiton', pos: 'G', contractEnd: '31/12/2027', status: 'confirmado', notes: 'Goleiro e capitão com renovação estendida até 2027.' },
      { name: 'Juninho Capixaba', pos: 'L', contractEnd: '31/12/2026', status: 'contrato_expirando', notes: 'Lateral titular com contrato até 31 de dezembro de 2026.' },
      { name: 'Lucas Evangelista', pos: 'M', contractEnd: '31/12/2026', status: 'contrato_expirando', notes: 'Referência do meio-campo com contrato expirando no encerramento de 2026.' },
      { name: 'Eduardo Sasha', pos: 'A', contractEnd: '31/12/2025', status: 'renovacao_em_andamento', notes: 'Gatilho de metas para extensão de mais um ano cobrindo 2026.' }
    ]
  }
};

/**
 * PENDING_CONFIRMATION
 * Informações e negociações em andamento aguardando abertura oficial da janela de transferências,
 * publicação formal no Boletim Informativo Diário (BID) da CBF ou homologação internacional via TMS.
 */
export const PENDING_CONFIRMATION = [
  {
    id: 'PND-2026-001',
    player: 'Gabriel Barbosa (Gabigol)',
    currentClub: 'Flamengo',
    targetClubs: ['Cruzeiro', 'Santos', 'Mercado Internacional'],
    condition: 'Término de contrato em 31/12/2024 sem renovação assinada no Flamengo; acordos verbais e cartas de intenção para contrato plurianual de 4 temporadas (até 2028).',
    status: 'Aguardando publicação oficial no BID da CBF na janela de transferências de início de temporada.'
  },
  {
    id: 'PND-2026-002',
    player: 'Philippe Coutinho',
    currentClub: 'Vasco da Gama (Emprestado pelo Aston Villa)',
    targetClubs: ['Vasco da Gama'],
    condition: 'Vínculo de empréstimo válido até 30/06/2025; negociação em curso para rescisão consensual com clube inglês e assinatura de contrato em definitivo até 31/12/2026 ou 2027.',
    status: 'Aguardando encerramento do empréstimo e tramitação de novo registro definitivo no TMS.'
  },
  {
    id: 'PND-2026-003',
    player: 'Jhon Arias',
    currentClub: 'Fluminense',
    targetClubs: ['Mercado Europeu (Premier League / La Liga)'],
    condition: 'Pacto institucional estabelecido com o atleta para liberação perante proposta mínima na janela de meados de 2025.',
    status: 'Aguardando formalização de proposta oficial e compensação financeira aceita pela diretoria.'
  },
  {
    id: 'PND-2026-004',
    player: 'Hugo Souza',
    currentClub: 'Corinthians (Emprestado pelo Flamengo)',
    targetClubs: ['Corinthians'],
    condition: 'Exercício formal da cláusula de opção de compra de 800 mil euros; estruturação do pagamento e garantias financeiras bancárias.',
    status: 'Aguardando homologação de quitação e baixa no contrato original do Flamengo para registro do novo vínculo até 2028 no BID.'
  },
  {
    id: 'PND-2026-005',
    player: 'Everton Ribeiro',
    currentClub: 'Bahia',
    targetClubs: ['Bahia'],
    condition: 'Cláusula de prorrogação automática contratual de 1 ano (para 2026) dependente da participação em pelo menos 60% dos jogos oficiais na temporada.',
    status: 'Aguardando cômputo final da meta estatística de partidas ao término do calendário desportivo.'
  },
  {
    id: 'PND-2026-006',
    player: 'Pablo Vegetti',
    currentClub: 'Vasco da Gama',
    targetClubs: ['Vasco da Gama'],
    condition: 'Gatilho de extensão automática por mais um ano (até 31/12/2026) mediante cumprimento de metas de minutos jogados e gols.',
    status: 'Aguardando validação formal de cumprimento das metas na federação.'
  }
];

// Helper functions for easy consumption across Footkeep engine and UI

/**
 * Retorna os dados de contrato dos jogadores de um determinado clube
 * @param {string} clubId - ID abreviado do clube (ex: 'fla', 'pal', 'cor')
 * @returns {Array} Lista de jogadores e seus status contratuais
 */
export function getClubContractStatus(clubId) {
  if (!CONTRACT_STATUS_2026[clubId]) return [];
  return CONTRACT_STATUS_2026[clubId].players;
}

/**
 * Retorna os jogadores cujos contratos expiram durante o ano de 2026
 * @param {string|null} clubId - Filtro opcional por clube
 * @returns {Array}
 */
export function getExpiringContracts2026(clubId = null) {
  const result = [];
  const clubs = clubId && CONTRACT_STATUS_2026[clubId]
    ? [CONTRACT_STATUS_2026[clubId]]
    : Object.values(CONTRACT_STATUS_2026);

  clubs.forEach(c => {
    c.players.forEach(p => {
      if (p.status === 'contrato_expirando' || (p.contractEnd && p.contractEnd.includes('2026'))) {
        result.push({ club: c.clubName, clubId: c.shortName.toLowerCase(), ...p });
      }
    });
  });

  return result;
}

/**
 * Retorna atletas com vínculos de longo prazo (contratos até 2027, 2028 ou 2029)
 * @param {string|null} clubId
 * @returns {Array}
 */
export function getLongTermContracts2026(clubId = null) {
  const result = [];
  const clubs = clubId && CONTRACT_STATUS_2026[clubId]
    ? [CONTRACT_STATUS_2026[clubId]]
    : Object.values(CONTRACT_STATUS_2026);

  clubs.forEach(c => {
    c.players.forEach(p => {
      if (p.status === 'confirmado' && (p.contractEnd.includes('2027') || p.contractEnd.includes('2028') || p.contractEnd.includes('2029'))) {
        result.push({ club: c.clubName, clubId: c.shortName.toLowerCase(), ...p });
      }
    });
  });

  return result;
}

/**
 * Retorna todas as transferências confirmadas para 2026
 */
export function getConfirmedTransfers2026() {
  return CONFIRMED_TRANSFERS_2026;
}

/**
 * Retorna todas as pendências de confirmação ou registros aguardando janela
 */
export function getPendingConfirmations2026() {
  return PENDING_CONFIRMATION;
}
