/* ==========================================================================
   WEB AUDIO API SYNTHESIZER & BEAT DETECTOR
   Generates tactile flip clicks, ambient synth pads, vinyl crackle, and beat triggers
   ========================================================================== */

class AudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isAmbientPlaying = false;
    this.ambientOsc = null;
    this.ambientGain = null;
    this.beatListeners = [];
    this.beatInterval = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleSound() {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.isAmbientPlaying) {
      this.stopAmbientPad();
    }
    return !this.isMuted;
  }

  /**
   * Play tactile 3D card flip pop / click sound
   */
  playFlipSound(pitch = 1.0) {
    if (this.isMuted) return;
    this.init();

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // FM Synth Click
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320 * pitch, now);
      osc.frequency.exponentialRampToValueAtTime(60 * pitch, now + 0.08);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.frequency.exponentialRampToValueAtTime(200, now + 0.08);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {
      // Ignore audio context errors
    }
  }

  /**
   * Play rich synth pad chord preview when user inspects an album
   */
  playAlbumPreviewSynth(genre = 'synthwave') {
    if (this.isMuted) return;
    this.init();

    try {
      const now = this.ctx.currentTime;
      const baseFreqs = genre === 'synthwave' ? [130.81, 164.81, 196.00, 246.94] // C3 maj7
                      : genre === 'psychedelic' ? [146.83, 174.61, 220.00, 261.63] // D minor 7
                      : [110.00, 138.59, 164.81, 207.65]; // A3 maj7

      baseFreqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = idx % 2 === 0 ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, now);
        filter.frequency.linearRampToValueAtTime(2200, now + 1.2);
        filter.frequency.linearRampToValueAtTime(300, now + 3.0);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.12, now + 0.4);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 3.5);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 3.6);
      });
    } catch (e) {
      console.warn('Synth playback interrupted', e);
    }
  }

  /**
   * Start Beat Pulse Generator for Audio Beat trigger mode
   */
  startBeatSync(onBeatCallback) {
    this.stopBeatSync();
    // Simulate 124 BPM beat pulse (every ~483ms)
    this.beatInterval = setInterval(() => {
      if (onBeatCallback) onBeatCallback();
    }, 483);
  }

  stopBeatSync() {
    if (this.beatInterval) {
      clearInterval(this.beatInterval);
      this.beatInterval = null;
    }
  }
}

// Global Export
window.audioSynth = new AudioSynthesizer();
