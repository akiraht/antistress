// Web Audio & Sound File Player Engine
// Sử dụng trực tiếp file âm thanh trong thư mục public/sound/ để người dùng dễ dàng nâng cấp, thay thế
// Hỗ trợ cả file .mp3 và .wav với audio pooling zero-latency

import { ToolId } from '../types/game';

// Danh sách đường dẫn file âm thanh trong public/sound
const TOOL_SOUND_MAP: Record<string, string[]> = {
  honeycomb_slipper: ['/sound/slipper.mp3', '/sound/slipper.wav'],
  feather_duster: ['/sound/feather_duster.mp3', '/sound/feather_duster.wav'],
  frying_pan: ['/sound/pan.mp3', '/sound/pan.wav'],
  rubber_hammer: ['/sound/hammer.mp3', '/sound/hammer.wav'],
};

class SoundSynthesizer {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  // Pool audio instances để phát dồn dập nhiều cú đập cùng lúc
  private audioCache: Map<string, HTMLAudioElement[]> = new Map();
  private poolSize: number = 6;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('dtn_sound_muted');
        if (saved !== null) {
          this.isMuted = saved === 'true';
        }
      } catch {
        // Safe catch
      }

      // Preload audio files trong public/sound
      this.preloadToolSounds();
    }
  }

  private preloadToolSounds() {
    if (typeof window === 'undefined') return;

    Object.entries(TOOL_SOUND_MAP).forEach(([toolId, urls]) => {
      const primaryUrl = urls[0];
      const pool: HTMLAudioElement[] = [];

      for (let i = 0; i < this.poolSize; i++) {
        const audio = new Audio(primaryUrl);
        audio.preload = 'auto';
        pool.push(audio);
      }

      this.audioCache.set(toolId, pool);
    });
  }

  private initContext() {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('dtn_sound_muted', String(muted));
      } catch {
        // Safe catch
      }
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public triggerHaptic(durationMs: number = 15) {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(durationMs);
      } catch {
        // Safe catch
      }
    }
  }

  /**
   * Phát âm thanh công cụ từ thư mục public/sound/
   * Dễ dàng nâng cấp hoặc thay thế file mà không cần sửa code
   */
  public playHitSound(toolId: ToolId | string, multiplier: number = 1) {
    this.triggerHaptic(multiplier >= 3 ? 28 : 14);
    if (this.isMuted) return;

    let playedFromFile = false;
    const pool = this.audioCache.get(toolId);

    if (pool && pool.length > 0) {
      // Tìm audio instance đang rảnh hoặc lấy instance đầu tiên
      let audioToPlay = pool.find((a) => a.paused || a.ended);
      if (!audioToPlay) {
        audioToPlay = pool[0];
      }

      try {
        audioToPlay.currentTime = 0;
        // Tăng nhẹ âm lượng theo combo
        audioToPlay.volume = Math.min(0.75 + (multiplier - 1) * 0.05, 1);
        const playPromise = audioToPlay.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              playedFromFile = true;
            })
            .catch(() => {
              // Fallback qua Web Audio Synth nếu trình duyệt chặn
              this.playHitSynthFallback(toolId, multiplier);
            });
          return;
        }
      } catch {
        // Tiếp tục fallback
      }
    }

    if (!playedFromFile) {
      this.playHitSynthFallback(toolId, multiplier);
    }
  }

  /**
   * Fallback Web Audio Synthesizer nếu file audio chưa kịp tải
   */
  private playHitSynthFallback(toolId: ToolId | string, multiplier: number = 1) {
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const boost = Math.min(1 + (multiplier - 1) * 0.08, 1.4);

      if (toolId === 'honeycomb_slipper') {
        // 1. DÉP TỔ ONG: Tiếng bẹp dẹt cao su
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220 * boost, now);
        osc.frequency.exponentialRampToValueAtTime(48, now + 0.11);
        gain.gain.setValueAtTime(0.58, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.13);
      } else if (toolId === 'feather_duster') {
        // 2. CHỔI LÔNG GÀ: Tiếng vút xé gió
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(980 * boost, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.14);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.28, now + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.16);
      } else if (toolId === 'frying_pan') {
        // 3. CHẢO: Tiếng kim loại vang "keeng"
        const freqs = [330 * boost, 520 * boost, 860 * boost, 1340 * boost];
        freqs.forEach((f, idx) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = idx === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(f, now);
          osc.frequency.exponentialRampToValueAtTime(f * 0.96, now + 0.38);
          gain.gain.setValueAtTime(0.3 / (idx + 1), now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.4);
        });
      } else if (toolId === 'rubber_hammer') {
        // 4. BÚA CAO SU: Tiếng thùm nảy lò xo
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(140 * boost, now);
        osc.frequency.exponentialRampToValueAtTime(38, now + 0.14);
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.17);
      }
    } catch {
      // AudioContext safe catch
    }
  }

  // Harmonic chime cho phần thưởng và mở bánh
  public playRewardChime() {
    this.triggerHaptic(30);
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const chord = [523.25, 659.25, 783.99, 1046.5];
      chord.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + idx * 0.06;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.18 / (idx + 1), startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.7);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.75);
      });
    } catch {
      // AudioContext safe catch
    }
  }

  public playWhooshSound() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.35);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.42);
    } catch {
      // AudioContext safe catch
    }
  }
}

export const soundManager = new SoundSynthesizer();
