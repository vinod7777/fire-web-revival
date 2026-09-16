/**
 * AVISHKAAR SEASON 4 - GRAND LAUNCH CEREMONY
 * Interactive Orchestration Script
 */

// ================= AUDIO ENGINE (Web Audio API Synthesizer) =================
class SoundFXEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
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
      osc.frequency.exponentialRampToValueAtTime(1400, now + duration);

      // Low pass filter for smooth cinematic synth sound
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(300, now);
      filter.frequency.exponentialRampToValueAtTime(3500, now + duration);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.25, now + duration * 0.7);
      gain.gain.linearRampToValueAtTime(0.0, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      console.warn('Audio play error', e);
    }
  }

  playImpactBoom() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.8);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.9);
    } catch (e) {}
  }

  playWhoosh() {
    if (!this.enabled || !this.ctx) return;
    try {
      const bufferSize = this.ctx.sampleRate * 0.4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 600;
      filter.Q.value = 2;

      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.15);
      gain.gain.linearRampToValueAtTime(0.0, now + 0.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 0.4);
    } catch (e) {}
  }

  playFanfareChord() {
    if (!this.enabled || !this.ctx) return;
    try {
      // Majestic chord: C, G, C, E, G
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

  playCameraShutter() {
    if (!this.enabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.06;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 1200;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 0.06);
    } catch (e) {}
  }

  playCountdownTick(seconds) {
    if (!this.enabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;

      // 1. Sharp mechanical click / snap
      const bufferSize = this.ctx.sampleRate * 0.035;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 1800;

      const clickGain = this.ctx.createGain();
      clickGain.gain.setValueAtTime(0.35, now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      noise.connect(filter);
      filter.connect(clickGain);
      clickGain.connect(this.ctx.destination);
      noise.start(now);
      noise.stop(now + 0.035);

      // 2. Resonant acoustic beep tone pitching up as countdown nears 0
      const pitchMap = { 5: 650, 4: 750, 3: 880, 2: 1050, 1: 1300, 0: 1600 };
      const freq = pitchMap[seconds] || 880;

      const osc = this.ctx.createOscillator();
      const toneGain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      toneGain.gain.setValueAtTime(0.18, now);
      toneGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(toneGain);
      toneGain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) {}
  }
}

const sfx = new SoundFXEngine();

// ================= BGM ENGINE (Two Steps From Hell - Victory) =================
// Play audio right from the very beginning (0s)
const BGM_START_SECONDS = 0;

class LaunchBGMController {
  constructor() {
    this.audio = null;
    this.enabled = true;
    this.volume = 0.95;
    this.isTesting = false;
    this.hasStarted = false;
  }

  init() {
    if (!this.audio) {
      this.audio = document.getElementById('launch-bgm');
      if (this.audio) {
        this.audio.volume = this.volume;
      }
    }
  }

  getCueTime() {
    return BGM_START_SECONDS;
  }

  playLaunchBGM() {
    this.init();
    if (!this.audio || !this.enabled) return;
    try {
      this.stopTest();
      this.audio.currentTime = 0;
      this.audio.volume = this.volume;
      const promise = this.audio.play();
      if (promise !== undefined) {
        promise.then(() => {
          this.hasStarted = true;
          this.updateEqualizer(true);
        }).catch(err => {
          console.warn('Launch BGM play warning:', err);
        });
      }
    } catch (e) {
      console.warn('Launch BGM error:', e);
    }
  }

  boostForClimax() {
    if (!this.audio || !this.enabled) return;
    this.audio.volume = 1.0;
  }

  toggleTest() {
    this.init();
    if (!this.audio) return;
    if (this.isTesting) {
      this.stopTest();
    } else {
      this.startTest();
    }
  }

  startTest() {
    this.init();
    if (!this.audio) return;
    try {
      this.audio.currentTime = this.getCueTime();
      this.audio.volume = this.volume;
      this.audio.play().then(() => {
        this.isTesting = true;
        this.updateTestUI(true);
        this.updateEqualizer(true);
      }).catch(e => console.warn('BGM test play error:', e));
    } catch (e) {}
  }

  stopTest() {
    if (!this.audio) return;
    if (this.isTesting) {
      this.audio.pause();
      this.isTesting = false;
      this.updateTestUI(false);
      this.updateEqualizer(false);
    }
  }

  updateTestUI(isPlaying) {
    const playIcon = document.getElementById('test-icon-play');
    const pauseIcon = document.getElementById('test-icon-pause');
    const label = document.getElementById('test-bgm-label');
    const btn = document.getElementById('test-bgm-btn');

    if (isPlaying) {
      if (playIcon) playIcon.classList.add('hidden');
      if (pauseIcon) pauseIcon.classList.remove('hidden');
      if (label) label.textContent = 'Pause BGM';
      if (btn) btn.classList.add('active');
    } else {
      if (playIcon) playIcon.classList.remove('hidden');
      if (pauseIcon) pauseIcon.classList.add('hidden');
      if (label) label.textContent = 'Test BGM';
      if (btn) btn.classList.remove('active');
    }
  }

  updateEqualizer(isPlaying) {
    const eq = document.querySelector('.bgm-equalizer');
    if (eq) {
      if (isPlaying) {
        eq.classList.add('playing');
      } else {
        eq.classList.remove('playing');
      }
    }
  }

  setMuted(muted) {
    this.enabled = !muted;
    if (this.audio) {
      this.audio.muted = muted;
    }
    if (muted) {
      if (this.isTesting) this.stopTest();
      this.updateEqualizer(false);
    } else if (this.hasStarted && !this.audio.paused) {
      this.updateEqualizer(true);
    }
  }
}

const bgm = new LaunchBGMController();

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
  const bubbleCount = 45;

  for (let i = 0; i < bubbleCount; i++) {
    bubbles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 3.5 + 1,
      speedY: Math.random() * 0.9 + 0.3,
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

// ================= COMPLETE 56-IMAGE CINEMATIC GALLERY DATA =================
const allGalleryImages = [
  "hackthon_kickoff.jpg", "APC_0138.JPG", "AMC_0308.JPG",
  "coding_session.jpg", "AMC_1608.JPG", "APC_0267.JPG",
  "mentor_hour.jpg", "APC_0393.JPG", "AMC_1628.JPG",
  "team_collaboration.jpg", "APC_0494.JPG", "AMC_1892.JPG",
  "workshop_session.jpg", "APC_0542.JPG", "AMC_2237.JPG",
  "demo_day.jpg", "APC_0637.JPG", "AMC_2789.JPG",
  "prize_ceremony.jpg", "APC_0862.JPG", "AMC_2919.JPG",
  "networking_event.jpg", "APC_1025.JPG", "AMC_2947.JPG",
  "APC_1047.JPG", "APC_1052.JPG", "AMC_3344.JPG",
  "APC_1101.JPG", "2I.jpg", "APC_1572.JPG",
  "APC_1580.JPG", "APC_1858.JPG", "APC_1911.JPG",
  "APC_1922.JPG", "APC_1950.JPG", "APC_2003.JPG",
  "ARU_2880.JPG", "APC_2050.JPG", "APC_8289.JPG",
  "APC_8662.JPG", "APC_9433.JPG", "APC_9458.JPG",
  "APC_9489.JPG", "APC_9495.JPG", "APC_9510.JPG",
  "APC_9532.JPG", "APC_9536.JPG", "APC_9547.JPG",
  "APC_9577.JPG", "APC_9588.JPG", "APC_9610.JPG",
  "APC_9620.JPG", "APC_9639.JPG", "APC_9667.JPG",
  "APC_9712.JPG", "APC_9820.JPG"
];
const all59GalleryImages = allGalleryImages; // Alias for backward compatibility

// Chunk into groups of 3 (total 19 groups for all 56 images)
const triptychGroups = [];
for (let i = 0; i < allGalleryImages.length; i += 3) {
  triptychGroups.push(allGalleryImages.slice(i, i + 3));
}

// Cinematic themes for each group
const groupThemes = [
  { left: "AUDITORIUM STAGE", center: "SEASON KEYNOTE", right: "INNOVATORS ASSEMBLE" },
  { left: "48-HR CLOCK TICKING", center: "MIDNIGHT SPRINT", right: "CODE ARCHITECTURE" },
  { left: "EXPERT MENTORSHIP", center: "INDUSTRY GUIDANCE", right: "TECH CONSULTATION" },
  { left: "TEAM STRATEGY", center: "CROSS-DOMAIN SYNERGY", right: "IDEATION BOARD" },
  { left: "HARDWARE LAB", center: "IOT & EMBEDDED", right: "CIRCUITS & SENSORS" },
  { left: "RAPID ITERATION", center: "PROTOTYPE BUILD", right: "SYSTEM DEBUGGING" },
  { left: "JURY ASSESSMENT", center: "PROJECT PITCH", right: "LIVE DEMO ARENA" },
  { left: "CHAMPIONS PODIUM", center: "GRAND VICTORY", right: "LEGACY TROPHY" },
  { left: "CREATIVE THINKING", center: "TALENT NETWORKING", right: "SOLUTIONS IN ACTION" },
  { left: "CAMPUS ENERGY", center: "NATIONAL PARTICIPATION", right: "HACKATHON SPIRIT" },
  { left: "ALGORITHM DESIGN", center: "AI & SOFTWARE", right: "CLOUD PLATFORMS" },
  { left: "HIGH VELOCITY", center: "INTO THE NIGHT", right: "PUSHING THE LIMITS" },
  { left: "HARDWARE WELDING", center: "SMART ROBOTICS", right: "PROTOTYPE VALIDATION" },
  { left: "CRITICAL REVIEWS", center: "MENTOR SESSIONS", right: "FEATURE POLISH" },
  { left: "FINAL COUNTDOWN", center: "48-HOUR FINALE", right: "CODE FREEZE" },
  { left: "STAGE SHOWCASE", center: "DIRECTOR EVALUATION", right: "KEYNOTE REACTION" },
  { left: "HONOR & APPLAUSE", center: "AWARDS CEREMONY", right: "CELEBRATION OF TALENT" },
  { left: "UNFORGETTABLE BONDS", center: "STUDENT INNOVATION", right: "MEMORIES CREATED" },
  { left: "25 YEARS STRONG", center: "AITAM PRIDE", right: "LEGACY OF EXCELLENCE" },
  { left: "SEASON 1-3 GLORY", center: "AVISHKAAR SEASON 4", right: "READY FOR LAUNCH" }
];

// Pre-decodes an image completely in memory before displaying
function predecodeImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    if (img.decode) {
      img.decode().then(() => resolve(src)).catch(() => resolve(src));
    } else {
      img.onload = () => resolve(src);
      img.onerror = () => resolve(src);
    }
  });
}

// Preload photos ahead of time so playback is 100% lag-free and instant
function preloadMovieReel() {
  allGalleryImages.forEach(filename => {
    predecodeImage(`assets/gallery/${filename}`);
  });
}
preloadMovieReel();

// ================= STAGE ORCHESTRATION =================
document.addEventListener('DOMContentLoaded', () => {
  initBubbleCanvas();

  // Elements
  const standbyStage = document.getElementById('standby-stage');
  const sloganStage = document.getElementById('slogan-stage');
  const galleryStage = document.getElementById('gallery-stage');
  const climaxStage = document.getElementById('climax-stage');

  const launchBtn = document.getElementById('launch-button');
  const spinEmblem = document.getElementById('spin-emblem');
  const dynamicWord = document.getElementById('dynamic-slogan-word');
  const progressFill = document.getElementById('slogan-progress-fill');
  const galleryTitleCard = document.getElementById('gallery-title-card');
  const movieReelStage = document.getElementById('movie-reel-stage');
  const redirectTimer = document.getElementById('redirect-timer');
  const immediateRedirectBtn = document.getElementById('immediate-redirect-btn');

  const soundBtn = document.getElementById('sound-btn');
  const soundIconOn = document.getElementById('sound-icon-on');
  const soundIconOff = document.getElementById('sound-icon-off');
  const soundLabel = document.getElementById('sound-label');
  const fullscreenBtn = document.getElementById('fullscreen-btn');

  // Configure target redirect URL
  const REDIRECT_TARGET = 'http://localhost:8080/';

  if (immediateRedirectBtn) {
    immediateRedirectBtn.href = REDIRECT_TARGET;
  }

  // Preload and initialize BGM
  bgm.init();

  // Test / Soundcheck Button
  const testBgmBtn = document.getElementById('test-bgm-btn');
  if (testBgmBtn) {
    testBgmBtn.addEventListener('click', () => {
      bgm.toggleTest();
    });
  }

  // Audio Toggle (SFX + BGM)
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      sfx.init();
      sfx.enabled = !sfx.enabled;
      bgm.setMuted(!sfx.enabled);

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

  // Fullscreen Toggle (if present)
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

  // ================= MAIN LAUNCH TRIGGER =================
  if (launchBtn) {
    launchBtn.addEventListener('click', () => {
    if (hasLaunched) return;
    hasLaunched = true;
    sfx.init();

    // 1. Play Two Steps From Hell - Victory Launch BGM!
    bgm.playLaunchBGM();

    // 2. Disable button and trigger 3D Hyper-Spin
    launchBtn.disabled = true;
    launchBtn.style.opacity = '0.7';
    launchBtn.querySelector('.btn-text').textContent = 'LAUNCHING...';
    
    // Play sci-fi rising sound for 4 seconds
    sfx.playPowerUp(4.0);

    // Spin the 25 Years Emblem for exactly 4 seconds!
    spinEmblem.classList.add('hyper-spin');

    // 3. After 4 seconds -> Transition to Stage 1: Slogan Switch
    setTimeout(() => {
      standbyStage.classList.remove('active');
      sloganStage.classList.add('active');

      runSloganSequence();
    }, 4000);
    });
  }

  // Global state for gallery flow and skipping
  let isGallerySkipped = false;
  let galleryTimerId = null;
  let titleCardTimer = null;
  let titleExitTimer = null;

  // ================= STAGE 1 & 2: SLOGAN SEQUENCE =================
  function runSloganSequence() {
    sfx.playImpactBoom();
    
    // Slogan 1: BRAND (visible for 2.0 seconds)
    dynamicWord.textContent = 'BRAND';
    dynamicWord.className = 'dynamic-word word-brand';
    progressFill.style.width = '33%';

    // Slogan 2: PRIDE (at 2.0s, visible for 2.0 seconds)
    setTimeout(() => {
      sfx.playImpactBoom();
      dynamicWord.textContent = 'PRIDE';
      dynamicWord.className = 'dynamic-word word-pride';
      progressFill.style.width = '66%';
    }, 2000);

    // Slogan 3: FEST (at 4.0s, visible for 2.0 seconds)
    setTimeout(() => {
      sfx.playImpactBoom();
      dynamicWord.textContent = 'FEST';
      dynamicWord.className = 'dynamic-word word-fest';
      progressFill.style.width = '100%';
    }, 4000);

    // After 6.0s total -> Move smoothly to Gallery Stage!
    setTimeout(() => {
      sloganStage.classList.remove('active');
      galleryStage.classList.add('active');

      runGalleryGlimpse();
    }, 6000);
  }

  // ================= STAGE 3: CINEMATIC MOVIE TRAILER MONTAGE =================
  function runGalleryGlimpse() {
    // 1. Clear movie viewport and reset states
    if (movieReelStage) movieReelStage.innerHTML = '';
    isGallerySkipped = false;

    // Hook up skip button immediately so clicking anytime cancels timers and jumps to climax
    const skipGalleryBtn = document.getElementById('skip-gallery-btn');
    if (skipGalleryBtn) {
      skipGalleryBtn.onclick = () => {
        if (isGallerySkipped) return;
        isGallerySkipped = true;
        if (titleCardTimer) clearTimeout(titleCardTimer);
        if (titleExitTimer) clearTimeout(titleExitTimer);
        if (galleryTimerId) clearTimeout(galleryTimerId);
        if (galleryTitleCard) galleryTitleCard.style.display = 'none';
        galleryStage.classList.remove('active');
        climaxStage.classList.add('active');
        runGrandClimax();
      };
    }

    // 2. Display the Standalone Prologue Title Card BEFORE any photos are shown
    if (galleryTitleCard) {
      galleryTitleCard.style.display = 'flex';
      galleryTitleCard.className = 'gallery-title-card card-enter';
    }

    // Play deep dramatic sub-bass boom for the legacy intro slate
    sfx.playImpactBoom();

    // 3. Title Card stays visible for 3.2 seconds so audience can read all 3 lines clearly!
    titleCardTimer = setTimeout(() => {
      if (isGallerySkipped) return;

      // Exit animation: smoothly blur and scale up
      if (galleryTitleCard) {
        galleryTitleCard.className = 'gallery-title-card card-exit';
      }
      sfx.playWhoosh();

      // 4. After 400ms exit fade finishes, HIDE THE TITLE COMPLETELY!
      titleExitTimer = setTimeout(() => {
        if (isGallerySkipped) return;
        if (galleryTitleCard) {
          galleryTitleCard.style.display = 'none';
        }

        // 5. NOW AND ONLY NOW: Start the Movie Trailer Photo Montage!
        startCinematicReelMontage();
      }, 400);
    }, 3200);
  }

  function startCinematicReelMontage() {
    let groupIndex = 0;
    const groupDuration = 500; // Keep 800ms as set by user
    const animStyles = ['triptych-anim-shift', 'triptych-anim-glide', 'triptych-anim-zoom'];

    const skipGalleryBtn = document.getElementById('skip-gallery-btn');
    const reelCounterBadge = document.getElementById('reel-counter-badge');

    if (skipGalleryBtn) {
      skipGalleryBtn.onclick = () => {
        if (isGallerySkipped) return;
        isGallerySkipped = true;
        if (titleCardTimer) clearTimeout(titleCardTimer);
        if (titleExitTimer) clearTimeout(titleExitTimer);
        if (galleryTimerId) clearTimeout(galleryTimerId);
        if (galleryTitleCard) galleryTitleCard.style.display = 'none';
        galleryStage.classList.remove('active');
        climaxStage.classList.add('active');
        runGrandClimax();
      };
    }

    async function nextGroup() {
      if (isGallerySkipped) return;
      if (groupIndex >= triptychGroups.length) {
        // All 59 images shown! Transition smoothly to Grand Climax Reveal
        galleryTimerId = setTimeout(() => {
          if (isGallerySkipped) return;
          galleryStage.classList.remove('active');
          climaxStage.classList.add('active');
          runGrandClimax();
        }, 500);
        return;
      }

      const images = triptychGroups[groupIndex];
      const theme = groupThemes[groupIndex % groupThemes.length];
      const animClass = animStyles[groupIndex % animStyles.length];
      groupIndex++;

      // 1. GUARANTEED PRE-DECODE: Ensure all 3 images in this group are 100% decoded in memory BEFORE rendering!
      await Promise.all(images.map(file => predecodeImage(`assets/gallery/${file}`)));
      if (isGallerySkipped) return;

      // 2. Background lookahead pre-decode for the next 2 batches
      for (let p = 0; p <= 2; p++) {
        const nextBatch = triptychGroups[groupIndex + p];
        if (nextBatch) {
          nextBatch.forEach(file => predecodeImage(`assets/gallery/${file}`));
        }
      }

      const photoNumStart = (groupIndex - 1) * 3 + 1;
      const photoNumEnd = Math.min(groupIndex * 3, allGalleryImages.length);

      if (reelCounterBadge) {
        reelCounterBadge.textContent = `MEMORIES // ${photoNumEnd} OF ${allGalleryImages.length} MOMENTS`;
      }

      if (images.length === 3) {
        movieReelStage.innerHTML = `
          <div class="movie-triptych-container ${animClass}">
            <!-- Left Wing -->
            <div class="triptych-card card-wing-left">
              <img src="assets/gallery/${images[0]}" alt="Avishkaar Previous Season" loading="eager" decoding="async" />
              <div class="triptych-hud-top">
                <span class="rec-dot"></span>
                <span>REC // #${photoNumStart}</span>
              </div>
              <div class="triptych-hud-bottom">
                <span class="triptych-tag">${theme.left}</span>
                <span class="triptych-pill">MEMORY</span>
              </div>
            </div>

            <!-- Center Hero -->
            <div class="triptych-card card-hero-center">
              <img src="assets/gallery/${images[1]}" alt="Avishkaar Previous Season" loading="eager" decoding="async" />
              <div class="triptych-hud-top">
                <span class="rec-dot"></span>
                <span>REC // #${photoNumStart + 1} OF ${allGalleryImages.length}</span>
              </div>
              <div class="triptych-hud-bottom">
                <span class="triptych-tag">${theme.center}</span>
                <span class="triptych-pill">SEASON LEGACY</span>
              </div>
            </div>

            <!-- Right Wing -->
            <div class="triptych-card card-wing-right">
              <img src="assets/gallery/${images[2]}" alt="Avishkaar Previous Season" loading="eager" decoding="async" />
              <div class="triptych-hud-top">
                <span class="rec-dot"></span>
                <span>REC // #${photoNumEnd}</span>
              </div>
              <div class="triptych-hud-bottom">
                <span class="triptych-tag">${theme.right}</span>
                <span class="triptych-pill">ARCHIVE</span>
              </div>
            </div>
          </div>
        `;
      } else if (images.length === 2) {
        movieReelStage.innerHTML = `
          <div class="movie-triptych-container ${animClass}">
            <!-- Left Card -->
            <div class="triptych-card card-hero-center">
              <img src="assets/gallery/${images[0]}" alt="Avishkaar Previous Season" loading="eager" decoding="async" />
              <div class="triptych-hud-top">
                <span class="rec-dot"></span>
                <span>REC // #${photoNumStart} OF ${allGalleryImages.length}</span>
              </div>
              <div class="triptych-hud-bottom">
                <span class="triptych-tag">${theme.left}</span>
                <span class="triptych-pill">SEASON LEGACY</span>
              </div>
            </div>

            <!-- Right Card -->
            <div class="triptych-card card-hero-center">
              <img src="assets/gallery/${images[1]}" alt="Avishkaar Previous Season" loading="eager" decoding="async" />
              <div class="triptych-hud-top">
                <span class="rec-dot"></span>
                <span>REC // #${photoNumEnd} OF ${allGalleryImages.length}</span>
              </div>
              <div class="triptych-hud-bottom">
                <span class="triptych-tag">${theme.center}</span>
                <span class="triptych-pill">SEASON 4 AHEAD</span>
              </div>
            </div>
          </div>
        `;
      } else if (images.length === 1) {
        movieReelStage.innerHTML = `
          <div class="movie-triptych-container ${animClass}">
            <!-- Solo Grand Finale Card: Award Ceremony -->
            <div class="triptych-card card-hero-center" style="max-width: 720px; width: 85%;">
              <img src="assets/gallery/${images[0]}" alt="Avishkaar Awards Ceremony" loading="eager" decoding="async" />
              <div class="triptych-hud-top">
                <span class="rec-dot"></span>
                <span>REC // #${photoNumStart} OF ${allGalleryImages.length}</span>
              </div>
              <div class="triptych-hud-bottom">
                <span class="triptych-tag">AWARDS CEREMONY</span>
                <span class="triptych-pill">GRAND FINALE</span>
              </div>
            </div>
          </div>
        `;
      }

      // Dynamic cinematic sound effects synced to cuts
      if (groupIndex % 2 === 0) {
        sfx.playCameraShutter();
      } else {
        sfx.playWhoosh();
      }

      galleryTimerId = setTimeout(nextGroup, groupDuration);
    }

    nextGroup();
  }

  // ================= STAGE 4: GRAND CLIMAX & CELEBRATION =================
  function runGrandClimax() {
    // Boost Victory BGM to 100% volume for the Grand Reveal!
    bgm.boostForClimax();

    // Fanfare sound
    sfx.playFanfareChord();

    // Massive Confetti Explosion
    fireConfettiShow();

    // 5-Second Countdown to Redirect with Audio Clicks
    let remaining = 5;
    if (redirectTimer) {
      redirectTimer.textContent = remaining;
      redirectTimer.classList.add('tick-pulse');
      setTimeout(() => redirectTimer && redirectTimer.classList.remove('tick-pulse'), 280);
    }
    sfx.playCountdownTick(remaining);

    const interval = setInterval(() => {
      remaining--;
      if (remaining >= 0) {
        if (redirectTimer) {
          redirectTimer.textContent = remaining;
          redirectTimer.classList.remove('tick-pulse');
          void redirectTimer.offsetWidth; // Trigger reflow for pulse animation
          redirectTimer.classList.add('tick-pulse');
          setTimeout(() => redirectTimer && redirectTimer.classList.remove('tick-pulse'), 280);
        }
        // Play click / counting sound on every single decrement!
        sfx.playCountdownTick(remaining);
      }
      if (remaining <= 0) {
        clearInterval(interval);
        sfx.playWhoosh();
        // Execute redirect!
        window.location.href = REDIRECT_TARGET;
      }
    }, 1000);
  }

  // Confetti Animation Burst
  function fireConfettiShow() {
    if (typeof confetti !== 'function') return;

    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#22d3ee', '#38bdf8', '#fbbf24', '#ffffff', '#34d399']
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });

    // Secondary side cannons
    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ['#22d3ee', '#fbbf24', '#ffffff']
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ['#22d3ee', '#fbbf24', '#ffffff']
      });
    }, 800);
  }
});
