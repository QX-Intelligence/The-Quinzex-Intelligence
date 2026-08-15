// Web Audio API ambient audio synthesizer for atmospheric experience
class SoundEngine {
    constructor() {
        this.ctx = null;
        this.isPlaying = false;
        this.oscillators = [];
        this.gainNode = null;
        this.filterNode = null;
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioCtx();
            
            this.gainNode = this.ctx.createGain();
            this.gainNode.gain.setValueAtTime(0.001, this.ctx.currentTime);

            this.filterNode = this.ctx.createBiquadFilter();
            this.filterNode.type = 'lowpass';
            this.filterNode.frequency.setValueAtTime(450, this.ctx.currentTime);
            this.filterNode.Q.setValueAtTime(4, this.ctx.currentTime);

            this.gainNode.connect(this.filterNode);
            this.filterNode.connect(this.ctx.destination);
        }
    }

    start() {
        this.init();
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }

        if (this.isPlaying) return;
        this.isPlaying = true;

        // Cinematic drone frequencies (subtle low harmonic chord in D Minor)
        const freqs = [55, 110, 164.81, 220, 329.63];
        this.oscillators = freqs.map((f, i) => {
            const osc = this.ctx.createOscillator();
            const oscGain = this.ctx.createGain();
            
            osc.type = i % 2 === 0 ? 'sine' : 'triangle';
            osc.frequency.setValueAtTime(f, this.ctx.currentTime);
            
            // Subtle detune for rich atmospheric resonance
            osc.detune.setValueAtTime((i - 2) * 4, this.ctx.currentTime);
            
            const individualVol = 0.04 / (i + 1);
            oscGain.gain.setValueAtTime(individualVol, this.ctx.currentTime);

            osc.connect(oscGain);
            oscGain.connect(this.gainNode);
            osc.start();
            return { osc, oscGain };
        });

        // Smooth fade-in
        this.gainNode.gain.setTargetAtTime(0.12, this.ctx.currentTime, 2.5);
    }

    stop() {
        if (!this.isPlaying || !this.gainNode) return;
        this.gainNode.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.8);
        setTimeout(() => {
            this.oscillators.forEach(({ osc }) => {
                try { osc.stop(); } catch (e) {}
            });
            this.oscillators = [];
            this.isPlaying = false;
        }, 900);
    }

    playChime(pitch = 587.33) {
        if (!this.isPlaying) return;
        try {
            const chimeOsc = this.ctx.createOscillator();
            const chimeGain = this.ctx.createGain();
            
            chimeOsc.type = 'sine';
            chimeOsc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
            
            chimeGain.gain.setValueAtTime(0.06, this.ctx.currentTime);
            chimeGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.8);
            
            chimeOsc.connect(chimeGain);
            chimeGain.connect(this.ctx.destination);
            
            chimeOsc.start();
            chimeOsc.stop(this.ctx.currentTime + 1.9);
        } catch (e) {
            // Audio context not initialized or blocked
        }
    }
}

export const soundEngine = new SoundEngine();
