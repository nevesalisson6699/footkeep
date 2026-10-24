/**
 * Footkeep Procedural Audio Service (Web Audio API)
 * 
 * Sistema nativo de efeitos sonoros sintetizados proceduralmente:
 * - Zero dependências de arquivos de áudio externos (sem risco de erro 404).
 * - Desbloqueio automático de AudioContext na primeira interação do usuário.
 * - Respeito estrito às preferências do jogador ('footkeep_settings_v1').
 * - Simulação acústica de apito do árbitro, chute na bola, gol/torcida, cartões e cliques táteis.
 */

export const SETTINGS_STORAGE_KEY = 'footkeep_settings_v1';

let audioCtx = null;
let isUnlocked = false;

/**
 * Consulta as preferências do usuário no localStorage para verificar se o som está ativo.
 * @returns {boolean}
 */
export function isSoundEnabled() {
  if (typeof window === 'undefined') return false;
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return true; // Padrão: som ativado
    const parsed = JSON.parse(raw);
    return parsed.soundEffects !== false;
  } catch {
    return true;
  }
}

/**
 * Obtém ou cria a instância singleton do AudioContext.
 * Retoma o contexto caso esteja suspenso pelas políticas de autoplay do navegador.
 * @returns {AudioContext|null}
 */
export function getAudioContext() {
  if (typeof window === 'undefined') return null;

  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }

  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().then(() => {
      isUnlocked = true;
    }).catch(() => {});
  }

  return audioCtx;
}

/**
 * Desbloqueio automático do AudioContext no primeiro gesto do usuário (clique, toque ou tecla).
 */
export function setupAudioUnlock() {
  if (typeof window === 'undefined') return;

  const unlock = () => {
    const ctx = getAudioContext();
    if (ctx) {
      if (ctx.state === 'suspended') {
        ctx.resume().then(() => {
          isUnlocked = true;
          removeListeners();
        }).catch(() => {});
      } else if (ctx.state === 'running') {
        isUnlocked = true;
        removeListeners();
      }
    }
  };

  const removeListeners = () => {
    window.removeEventListener('click', unlock);
    window.removeEventListener('touchstart', unlock);
    window.removeEventListener('keydown', unlock);
  };

  window.addEventListener('click', unlock, { passive: true });
  window.addEventListener('touchstart', unlock, { passive: true });
  window.addEventListener('keydown', unlock, { passive: true });
}

// Inicializa os ouvintes de desbloqueio automaticamente ao importar o módulo
if (typeof window !== 'undefined') {
  setupAudioUnlock();
}

/**
 * Emite um sopro de apito com oscilador duplo (heterodinação acústica) e vibrato.
 * @param {AudioContext} ctx 
 * @param {number} startTime 
 * @param {number} duration 
 * @param {number} intensity 
 */
function emitWhistleBlast(ctx, startTime, duration, intensity = 0.22) {
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.001, startTime);
  masterGain.gain.linearRampToValueAtTime(intensity, startTime + 0.02);
  masterGain.gain.setValueAtTime(intensity, startTime + duration - 0.03);
  masterGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  // LFO de vibrato (simula a oscilação da esfera plástica interna do apito Fox 40)
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.frequency.setValueAtTime(32, startTime);
  lfoGain.gain.setValueAtTime(120, startTime);
  lfo.connect(lfoGain);

  // Oscilador 1 (tom fundamental ~2600Hz)
  const osc1 = ctx.createOscillator();
  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(2620, startTime);
  lfoGain.connect(osc1.frequency);

  // Oscilador 2 (harmônico próximo ~2860Hz para gerar batimento acústico)
  const osc2 = ctx.createOscillator();
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(2880, startTime);
  lfoGain.connect(osc2.frequency);

  // Filtro Passa-Faixa para suavizar chiados excessivos
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(2750, startTime);
  filter.Q.setValueAtTime(3.5, startTime);

  osc1.connect(filter);
  osc2.connect(filter);
  filter.connect(masterGain);
  masterGain.connect(ctx.destination);

  lfo.start(startTime);
  osc1.start(startTime);
  osc2.start(startTime);

  lfo.stop(startTime + duration);
  osc1.stop(startTime + duration);
  osc2.stop(startTime + duration);
}

/**
 * 1. Apito do Árbitro
 * Padrões:
 * - 'start': Início de jogo ou reinício (sopro firme e prolongado).
 * - 'foul' | 'short': Falta ou parada técnica (dois silvos curtos e enérgicos).
 * - 'end' | 'final': Fim de partida (três silvos: curto, curto e longo final).
 * 
 * @param {'start'|'foul'|'end'|'short'} pattern
 */
export function playWhistle(pattern = 'start') {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime + 0.01;

  if (pattern === 'start') {
    // Um silvo firme de início
    emitWhistleBlast(ctx, now, 0.55, 0.25);
  } else if (pattern === 'end' || pattern === 'final') {
    // Três silvos clássicos de encerramento: curto, curto, longo
    emitWhistleBlast(ctx, now, 0.18, 0.22);
    emitWhistleBlast(ctx, now + 0.26, 0.18, 0.22);
    emitWhistleBlast(ctx, now + 0.52, 0.85, 0.26);
  } else {
    // 'foul' ou 'short': dois silvos rápidos
    emitWhistleBlast(ctx, now, 0.15, 0.22);
    emitWhistleBlast(ctx, now + 0.22, 0.25, 0.24);
  }
}

/**
 * 2. Chute na Bola (Impacto grave e decaimento dinâmico)
 */
export function playKick() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime + 0.005;

  // Oscilador com queda rápida de frequência (pitch dive)
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(140, now);
  osc.frequency.exponentialRampToValueAtTime(38, now + 0.12);

  gain.gain.setValueAtTime(0.35, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

  // Transient de estalo do couro da bola
  const snapOsc = ctx.createOscillator();
  const snapGain = ctx.createGain();
  snapOsc.type = 'triangle';
  snapOsc.frequency.setValueAtTime(260, now);
  snapOsc.frequency.exponentialRampToValueAtTime(80, now + 0.04);
  snapGain.gain.setValueAtTime(0.2, now);
  snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

  osc.connect(gain);
  gain.connect(ctx.destination);
  snapOsc.connect(snapGain);
  snapGain.connect(ctx.destination);

  osc.start(now);
  snapOsc.start(now);
  osc.stop(now + 0.13);
  snapOsc.stop(now + 0.05);
}

/**
 * 3. Síntese de Gol e Torcida
 * Combina acorde comemorativo triunfante (Fá Maior) com ruído sintetizado filtrado
 * que emula o rugido ascendente da multidão no estádio.
 */
export function playGoal() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime + 0.01;

  // A. Rugido de Torcida (Ruído Branco com Filtro Dinâmico Sweep)
  try {
    const bufferSize = ctx.sampleRate * 2.2; // 2.2 segundos de áudio
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    // Geração de ruído com peso acústico
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.05 * white)) / 1.05; // Ruído amarronzado/pink
      lastOut = output[i];
      output[i] *= 2.5;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(320, now);
    noiseFilter.frequency.exponentialRampToValueAtTime(1400, now + 0.45); // Ascensão da torcida
    noiseFilter.frequency.exponentialRampToValueAtTime(450, now + 2.1);
    noiseFilter.Q.setValueAtTime(2.2, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.01, now);
    noiseGain.gain.linearRampToValueAtTime(0.32, now + 0.35);
    noiseGain.gain.setValueAtTime(0.32, now + 1.1);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    whiteNoise.start(now);
    whiteNoise.stop(now + 2.2);
  } catch {
    // Fallback caso buffer falhe em runtime restrito
  }

  // B. Acorde Triunfal Comemorativo: Fá Maior (F4, A4, C5, F5)
  const notes = [349.23, 440.00, 523.25, 698.46];
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 1.5);
  });
}

/**
 * 4. Alerta de Cartão (Amarelo ou Vermelho)
 * @param {'yellow'|'red'} type 
 */
export function playCard(type = 'yellow') {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime + 0.01;

  if (type === 'red') {
    // Cartão Vermelho: Tom dramático descendente em dois estágios
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(580, now);
    osc1.frequency.exponentialRampToValueAtTime(280, now + 0.28);

    gain1.gain.setValueAtTime(0.18, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(900, now);

    osc1.connect(filter);
    filter.connect(gain1);
    gain1.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.32);
  } else {
    // Cartão Amarelo: Sinal sonoro duplo de advertência ascendente
    [520, 680].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = now + (i * 0.11);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.16, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.1);
    });
  }
}

/**
 * 5. Clique Tátil de Interface
 * Som sutil de confirmação para botões, switches e tabs.
 */
export function playClick() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime + 0.002;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(1050, now);
  osc.frequency.exponentialRampToValueAtTime(420, now + 0.035);

  gain.gain.setValueAtTime(0.1, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.04);
}

// Exportação padrão agrupada
export const audioService = {
  isSoundEnabled,
  getAudioContext,
  setupAudioUnlock,
  playWhistle,
  playKick,
  playGoal,
  playCard,
  playClick
};

export default audioService;
