/* ==========================================================================
   MAIN APPLICATION CONTROLLER (IMAC & VINYL RECORD WALL PAPER)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const matrix = window.tileMatrix;
  const physics = window.antigravityPhysics;
  const synth = window.audioSynth;

  // DOM Elements
  const btnTriggerWave = document.getElementById('btn-trigger-wave');
  const btnSound = document.getElementById('btn-sound');
  const btnFullscreen = document.getElementById('btn-fullscreen');

  // Modal Elements
  const modalOverlay = document.getElementById('album-modal');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalArtWrapper = document.getElementById('modal-art-wrapper');
  const modalVinylLabel = document.getElementById('vinyl-label');
  const modalGenre = document.getElementById('modal-genre');
  const modalTitle = document.getElementById('modal-album-title');
  const modalArtist = document.getElementById('modal-artist-name');
  const modalYear = document.getElementById('modal-year');
  const modalPaletteSwatches = document.getElementById('modal-palette-swatches');
  const modalTracklist = document.getElementById('modal-tracklist');
  const btnPreviewAudio = document.getElementById('btn-preview-audio');
  const btnFlipThisTile = document.getElementById('btn-flip-this-tile');

  let activeInspectedTile = null;

  // 1. Initialize Sub-Engines
  physics.init('imac-container');
  matrix.init('matrix-container', 'vinyl-wall-grid', 'desk-screen-glow');

  // 2. Tile Click -> Open Album Detail Inspector Modal
  matrix.onTileClickCallback = (album, tileObj) => {
    activeInspectedTile = tileObj;

    modalArtWrapper.innerHTML = album.svg;
    modalVinylLabel.style.backgroundColor = album.dominantColor;
    modalGenre.textContent = album.genre.replace('_', ' ').toUpperCase();
    modalTitle.textContent = album.title;
    modalArtist.textContent = album.artist;
    modalYear.textContent = `Released ${album.year} • Mastered on Heavyweight Vinyl`;

    modalPaletteSwatches.innerHTML = album.palette.map(c => `
      <div class="swatch" style="background-color: ${c}; box-shadow: 0 0 6px ${c}"></div>
    `).join('');

    modalTracklist.innerHTML = album.tracklist.map(t => `
      <li>
        <span>${t}</span>
        <span style="opacity: 0.6; font-family: var(--font-mono)">3:${Math.floor(12 + Math.random() * 40)}</span>
      </li>
    `).join('');

    modalOverlay.classList.remove('hidden');
    synth.playFlipSound(1.2);
  };

  // Modal Actions
  modalCloseBtn.addEventListener('click', () => {
    modalOverlay.classList.add('hidden');
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.add('hidden');
    }
  });

  btnPreviewAudio.addEventListener('click', () => {
    if (activeInspectedTile) {
      synth.playAlbumPreviewSynth(activeInspectedTile.currentAlbum.genre);
    }
  });

  btnFlipThisTile.addEventListener('click', () => {
    if (activeInspectedTile) {
      matrix.flipTile(activeInspectedTile);
      modalOverlay.classList.add('hidden');
    }
  });

  // 3. Trigger Wave Button
  btnTriggerWave.addEventListener('click', () => {
    matrix.triggerWaveRipple();
  });

  // 4. Toggle Sound
  btnSound.addEventListener('click', () => {
    const soundOn = synth.toggleSound();
    btnSound.textContent = soundOn ? '🔊 SOUND ON' : '🔇 MUTED';
    btnSound.classList.toggle('active', soundOn);
  });

  // 5. Toggle Fullscreen Wallpaper Mode
  btnFullscreen.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  });
});
