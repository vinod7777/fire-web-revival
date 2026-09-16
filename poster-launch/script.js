/**
 * AVISHKAAR SEASON 4 - OFFICIAL POSTER LAUNCH & WEBSITE MERGE
 * Interactive Stage Orchestration Script
 */

// ================= AUDIO SYNTHESIZER ENGINE =================
class SoundFXEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playPowerUp(duration = 3.0) {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(80, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + duration);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(300, now);
      filter.frequency.exponentialRampToValueAtTime(3200, now + duration);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.2, now + duration * 0.7);
      gain.gain.linearRampToValueAtTime(0.0, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {}
  }

  playImpactBoom() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.8);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.85);
    } catch (e) {}
  }

  playFanfareChord() {
    if (!this.enabled || !this.ctx) return;
    try {
      const freqs = [130.81, 196.00, 261.63, 329.63, 392.00, 523.25];
      const now = this.ctx.currentTime;

      freqs.forEach((f, index) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = index % 2 === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(f, now);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.12, now + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.0);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 3.0);
      });
    } catch (e) {}
  }

  playCountdownTick(seconds) {
    if (!this.enabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const pitchMap = { 5: 650, 4: 750, 3: 880, 2: 1050, 1: 1300, 0: 1600 };
      const freq = pitchMap[seconds] || 880;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) {}
  }
}

const sfx = new SoundFXEngine();

// ================= FLOATING BUBBLES CANVAS =================
function initBubbleCanvas() {
  const canvas = document.getElementById('bubble-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const bubbles = [];
  const bubbleCount = 40;

  for (let i = 0; i < bubbleCount; i++) {
    bubbles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 3.5 + 1,
      speedY: Math.random() * 0.8 + 0.3,
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.2,
      glow: Math.random() > 0.6
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < bubbles.length; i++) {
      const b = bubbles[i];
      b.y -= b.speedY;
      b.x += b.speedX;

      if (b.y < -10) {
        b.y = height + 10;
        b.x = Math.random() * width;
      }
      if (b.x < -10) b.x = width + 10;
      if (b.x > width + 10) b.x = -10;

      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(34, 211, 238, ${b.opacity})`;
      if (b.glow) {
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(34, 211, 238, 0.8)';
      } else {
        ctx.shadowBlur = 0;
      }
      ctx.fill();
    }

    requestAnimationFrame(render);
  }

  render();
}

// ================= STAGE ORCHESTRATION =================
function initStage() {
  initBubbleCanvas();

  // DOM Elements
  const standbyStage = document.getElementById('standby-stage');
  const posterStage = document.getElementById('poster-stage') || document.getElementById('video-stage');

  const launchBtn = document.getElementById('launch-button') || document.getElementById('launch-poster-btn');
  const launchBgm = document.getElementById('launch-bgm');
  const spinEmblem = document.getElementById('spin-emblem');

  const posterVideo = document.getElementById('poster-video');
  const posterMediaFrame = document.querySelector('.poster-media-frame') || document.getElementById('poster-card');
  const posterActionBar = document.getElementById('poster-action-bar');
  const skipVideoBtn = document.getElementById('skip-video-btn');
  const replayVideoBtn = document.getElementById('replay-video-btn');
  const viewFullscreenBtn = document.getElementById('view-fullscreen-btn');

  // Poster Lightbox Modal Elements
  const posterZoomTrigger = document.getElementById('poster-zoom-trigger');
  const posterModal = document.getElementById('poster-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalCloseBackdrop = document.getElementById('modal-close-backdrop');

  let isModalOpen = false;

  function openPosterModal() {
    if (posterModal) {
      posterModal.classList.remove('hidden');
      isModalOpen = true;
    }
  }

  function closePosterModal() {
    if (posterModal) {
      posterModal.classList.add('hidden');
      isModalOpen = false;
    }
  }

  if (posterZoomTrigger) {
    posterZoomTrigger.addEventListener('click', () => {
      if (hasMerged) {
        openPosterModal();
      }
    });
  }
  if (viewFullscreenBtn) {
    viewFullscreenBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openPosterModal();
    });
  }
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closePosterModal);
  }
  if (modalCloseBackdrop) {
    modalCloseBackdrop.addEventListener('click', closePosterModal);
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isModalOpen) {
      closePosterModal();
    }
  });

  const soundBtn = document.getElementById('sound-btn');
  const soundIconOn = document.getElementById('sound-icon-on');
  const soundIconOff = document.getElementById('sound-icon-off');
  const soundLabel = document.getElementById('sound-label');
  const fullscreenBtn = document.getElementById('fullscreen-btn');

  // Audio Toggle
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      sfx.init();
      sfx.enabled = !sfx.enabled;
      if (posterVideo) {
        posterVideo.muted = !sfx.enabled;
      }
      if (launchBgm) {
        launchBgm.muted = !sfx.enabled;
      }

      if (sfx.enabled) {
        if (soundIconOn) soundIconOn.classList.remove('hidden');
        if (soundIconOff) soundIconOff.classList.add('hidden');
        if (soundLabel) soundLabel.textContent = 'Audio ON';
        soundBtn.classList.add('active');
      } else {
        if (soundIconOn) soundIconOn.classList.add('hidden');
        if (soundIconOff) soundIconOff.classList.remove('hidden');
        if (soundLabel) soundLabel.textContent = 'Muted';
        soundBtn.classList.remove('active');
      }
    });
  }

  // Fullscreen Toggle
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => console.log(err));
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    });
  }

  let hasLaunched = false;
  let hasMerged = false;

  // ================= 1. MAIN POSTER LAUNCH TRIGGER =================
  if (launchBtn) {
    launchBtn.addEventListener('click', () => {
      if (hasLaunched) return;
      hasLaunched = true;
      sfx.init();

      // Remove the nav bar after launch
      const headerNav = document.getElementById('launch-header') || document.querySelector('.launch-header');
      if (headerNav) {
        headerNav.classList.add('nav-hidden');
      }

      // Play Victory Launch BGM if present
      if (launchBgm && sfx.enabled) {
        launchBgm.currentTime = 0;
        launchBgm.volume = 0.85;
        launchBgm.play().catch(e => console.warn('BGM play warning:', e));
      }

      // Disable button
      launchBtn.disabled = true;
      launchBtn.style.opacity = '0.75';
      const btnText = launchBtn.querySelector('.btn-text');
      if (btnText) btnText.textContent = 'LAUNCHING...';

      // Play Power-Up sound & Spin 25 Years Emblem for 3.5 seconds
      sfx.playPowerUp(4.0);
      if (spinEmblem) {
        spinEmblem.classList.add('hyper-spin');
      }

      // After 3.5 seconds -> Transition smoothly to Poster Theater Stage!
      setTimeout(() => {
        standbyStage.classList.remove('active');
        posterStage.classList.add('active');

        startPosterVideoPlayback();
      }, 3500);
    });
  }

  // ================= 2. VIDEO PLAYBACK CONTROLLER =================
  function startPosterVideoPlayback() {
    if (!posterVideo) return;

    // Fade out launch BGM so video's native audio is crisp
    if (launchBgm) {
      launchBgm.pause();
    }

    if (posterMediaFrame) {
      posterMediaFrame.classList.remove('revealed');
    }
    if (posterActionBar) {
      posterActionBar.classList.remove('visible');
    }
    if (skipVideoBtn) {
      skipVideoBtn.style.opacity = '1';
      skipVideoBtn.style.pointerEvents = 'auto';
    }

    posterVideo.currentTime = 0;
    posterVideo.muted = !sfx.enabled;
    posterVideo.volume = 1.0;

    const playPromise = posterVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        console.warn('Video autoplay prevented with audio, retrying muted:', err);
        posterVideo.muted = true;
        posterVideo.play();
      });
    }

    // When video concludes -> trigger seamless poster dissolve!
    posterVideo.onended = () => {
      revealPosterSeamlessly();
    };
  }

  // Skip button
  if (skipVideoBtn) {
    skipVideoBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      revealPosterSeamlessly();
    });
  }

  // ================= 3. SEAMLESS POSTER PHOTO DISSOLVE & FANFARE =================
  function revealPosterSeamlessly() {
    if (hasMerged) return;
    hasMerged = true;

    // Pause video at final frame
    if (posterVideo) {
      posterVideo.pause();
    }

    // Seamlessly crossfade the high-resolution poster image right over the video!
    if (posterMediaFrame) {
      posterMediaFrame.classList.add('revealed');
    }

    // Hide skip button, show action bar
    if (skipVideoBtn) {
      skipVideoBtn.style.opacity = '0';
      skipVideoBtn.style.pointerEvents = 'none';
    }
    if (posterActionBar) {
      posterActionBar.classList.add('visible');
    }

    // Deep sub-bass boom + Fanfare Chords!
    sfx.playImpactBoom();
    setTimeout(() => sfx.playFanfareChord(), 200);

    // Multi-cannon Confetti Extravaganza
    fireCelebrationConfetti();
  }

  // Confetti Show
  function fireCelebrationConfetti() {
    if (typeof confetti !== 'function') return;

    const count = 220;
    const defaults = {
      origin: { y: 0.65 },
      colors: ['#22d3ee', '#38bdf8', '#fbbf24', '#ffffff', '#34d399']
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 28, startVelocity: 55 });
    fire(0.2, { spread: 65 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });

    // Side celebratory cannons
    setTimeout(() => {
      confetti({
        particleCount: 90,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.75 },
        colors: ['#22d3ee', '#fbbf24', '#ffffff']
      });
      confetti({
        particleCount: 90,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.75 },
        colors: ['#22d3ee', '#fbbf24', '#ffffff']
      });
    }, 700);
  }

  // Replay Video Handler
  if (replayVideoBtn) {
    replayVideoBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      hasMerged = false;
      closePosterModal();
      startPosterVideoPlayback();
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initStage);
} else {
  initStage();
}
