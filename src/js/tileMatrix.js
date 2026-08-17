/* ==========================================================================
   TILE MATRIX ENGINE (IMAC 8x5 SCREEN & BACKGROUND VINYL RECORD WALL)
   Manages digital screen matrix, physical wall grid, 3D card flips, and desk glow
   ========================================================================== */

class TileMatrixEngine {
  constructor() {
    this.containerEl = null;
    this.wallGridEl = null;
    this.deskGlowEl = null;
    this.cols = 8;
    this.rows = 5;
    this.totalTiles = 40;
    this.tiles = []; // Screen tile objects

    this.triggerMode = 'random';
    this.isPaused = false;

    this.flipTimer = null;
    this.catalog = window.ALBUM_CATALOG || [];

    this.onTileClickCallback = null;
    this.onStatsUpdateCallback = null;
  }

  init(containerId, wallGridId, deskGlowId) {
    this.containerEl = document.getElementById(containerId);
    this.wallGridEl = document.getElementById(wallGridId);
    this.deskGlowEl = document.getElementById(deskGlowId);

    this.buildPhysicalVinylWall();
    this.buildScreenGrid();
    this.startContinuousFlipEngine();
  }

  getRandomAlbum() {
    return this.catalog[Math.floor(Math.random() * this.catalog.length)];
  }

  /**
   * Builds Background Static Physical Framed Vinyl Wall (Meta Grid-within-a-Grid)
   */
  buildPhysicalVinylWall() {
    if (!this.wallGridEl) return;
    this.wallGridEl.innerHTML = '';

    // Render 112 static framed vinyl record covers on the wall behind the iMac
    for (let i = 0; i < 112; i++) {
      const album = this.getRandomAlbum();
      const wallTile = document.createElement('div');
      wallTile.className = 'wall-frame-tile';
      wallTile.innerHTML = album.svg;
      this.wallGridEl.appendChild(wallTile);
    }
  }

  /**
   * Builds Digital 8x5 iMac Screen Grid Matrix
   */
  buildScreenGrid() {
    if (!this.containerEl) return;
    this.containerEl.innerHTML = '';
    this.tiles = [];

    this.containerEl.style.setProperty('--grid-cols', this.cols);
    this.containerEl.style.setProperty('--grid-rows', this.rows);

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const index = r * this.cols + c;
        const frontAlbum = this.getRandomAlbum();
        const backAlbum = this.getRandomAlbum();

        const cell = document.createElement('div');
        cell.className = 'tile-cell';
        cell.dataset.row = r;
        cell.dataset.col = c;
        cell.dataset.index = index;

        cell.innerHTML = `
          <div class="tile-gi-glow"></div>
          <div class="tile-card state-stationary" style="--tile-dominant-color: ${frontAlbum.dominantColor}">
            <!-- Front Face -->
            <div class="tile-face front">
              ${frontAlbum.svg}
            </div>
            <!-- Back Face -->
            <div class="tile-face back">
              ${backAlbum.svg}
            </div>
            <!-- 3D Bevel Edge Thickness -->
            <div class="tile-edge top"></div>
            <div class="tile-edge bottom"></div>
            <div class="tile-edge left"></div>
            <div class="tile-edge right"></div>
            <!-- Specular Shine -->
            <div class="tile-shine"></div>
          </div>
        `;

        const cardEl = cell.querySelector('.tile-card');
        const frontFaceEl = cell.querySelector('.tile-face.front');
        const backFaceEl = cell.querySelector('.tile-face.back');
        const giGlowEl = cell.querySelector('.tile-gi-glow');

        const tileObj = {
          id: `tile-${index}`,
          index,
          row: r,
          col: c,
          cellEl: cell,
          cardEl: cardEl,
          frontFaceEl: frontFaceEl,
          backFaceEl: backFaceEl,
          giGlowEl: giGlowEl,
          currentAlbum: frontAlbum,
          backAlbum: backAlbum,
          state: 'stationary',
          isFlipped: false,
          isFlipping: false
        };

        // Click Event -> Inspect Album
        cell.addEventListener('click', () => {
          if (this.onTileClickCallback) {
            this.onTileClickCallback(tileObj.currentAlbum, tileObj);
          }
        });

        // Hover Event -> Play Flip Click Sound
        cell.addEventListener('mouseenter', () => {
          window.audioSynth.playFlipSound(1.3);
        });

        this.containerEl.appendChild(cell);
        this.tiles.push(tileObj);
      }
    }

    this.updateDeskLightGlow();
    this.updateStats();
  }

  /**
   * Flip single tile in 3D space (rotates horizontally or vertically)
   */
  flipTile(tileObj) {
    if (!tileObj || tileObj.isFlipping || this.isPaused) return;

    tileObj.isFlipping = true;
    tileObj.state = 'flipping';
    this.updateStats();

    // Select 3D flip axis
    const flipAxisChoice = Math.random();
    const flipClass = flipAxisChoice < 0.6 ? 'state-flipping-y'
                    : flipAxisChoice < 0.85 ? 'state-flipping-x'
                    : 'state-flipping-diag';

    window.audioSynth.playFlipSound(0.85 + Math.random() * 0.35);

    tileObj.cardEl.classList.remove('state-stationary', 'state-revealed');
    tileObj.cardEl.classList.add(flipClass);

    const newAlbum = tileObj.isFlipped ? tileObj.currentAlbum : tileObj.backAlbum;
    tileObj.giGlowEl.style.setProperty('--tile-glow-color', `${newAlbum.dominantColor}99`);

    // Mid-way artwork swap (at 375ms into 750ms animation)
    setTimeout(() => {
      tileObj.isFlipped = !tileObj.isFlipped;
      tileObj.currentAlbum = newAlbum;
      tileObj.backAlbum = this.getRandomAlbum();
      if (tileObj.isFlipped) {
        tileObj.frontFaceEl.innerHTML = tileObj.backAlbum.svg;
      } else {
        tileObj.backFaceEl.innerHTML = tileObj.backAlbum.svg;
      }
    }, 375);

    // End of 3D flip transition
    setTimeout(() => {
      tileObj.cardEl.classList.remove(flipClass);
      tileObj.cardEl.classList.add('state-revealed');
      tileObj.state = 'revealed';
      tileObj.isFlipping = false;

      this.updateDeskLightGlow();
      this.updateStats();

      // Return to stationary after 2.5-4.5s
      setTimeout(() => {
        if (tileObj.state === 'revealed') {
          tileObj.cardEl.classList.remove('state-revealed');
          tileObj.cardEl.classList.add('state-stationary');
          tileObj.state = 'stationary';
          this.updateStats();
        }
      }, 2500 + Math.random() * 2000);

    }, 800);
  }

  /**
   * Continuous loop maintaining ~20% active 3D flips across 8x5 grid (8 tiles flipping at once)
   */
  startContinuousFlipEngine() {
    if (this.flipTimer) clearInterval(this.flipTimer);

    this.flipTimer = setInterval(() => {
      if (this.isPaused || this.tiles.length === 0) return;

      const flippingCount = this.tiles.filter(t => t.state === 'flipping').length;
      const targetFlippingCount = Math.ceil(this.totalTiles * 0.20); // Exactly 20% active 3D flips (8 tiles)

      if (flippingCount < targetFlippingCount) {
        const candidates = this.tiles.filter(t => t.state === 'stationary');
        if (candidates.length > 0) {
          const countToFlip = Math.min(candidates.length, targetFlippingCount - flippingCount);
          for (let i = 0; i < countToFlip; i++) {
            const idx = Math.floor(Math.random() * candidates.length);
            const targetTile = candidates.splice(idx, 1)[0];
            this.flipTile(targetTile);
          }
        }
      }
    }, 400);
  }

  /**
   * Wave Ripple Trigger
   */
  triggerWaveRipple() {
    const r0 = Math.floor(this.rows / 2);
    const c0 = Math.floor(this.cols / 2);

    this.tiles.forEach(tile => {
      const distance = Math.sqrt(Math.pow(tile.row - r0, 2) + Math.pow(tile.col - c0, 2));
      const delay = distance * 110;
      setTimeout(() => {
        this.flipTile(tile);
      }, delay);
    });
  }

  /**
   * Desk Light Casting: Screen light emission onto dark desk surface
   */
  updateDeskLightGlow() {
    if (!this.deskGlowEl || this.tiles.length === 0) return;
    const activeTiles = this.tiles.filter(t => t.state !== 'stationary');
    if (activeTiles.length > 0) {
      const c1 = activeTiles[0].currentAlbum.dominantColor;
      const c2 = activeTiles[Math.floor(activeTiles.length / 2)].currentAlbum.dominantColor;
      this.deskGlowEl.style.background = `radial-gradient(ellipse at top center, ${c1}44 0%, ${c2}22 50%, transparent 85%)`;
    }
  }

  updateStats() {
    if (!this.onStatsUpdateCallback) return;
    const total = this.totalTiles;
    const stationary = this.tiles.filter(t => t.state === 'stationary').length;
    const flipping = this.tiles.filter(t => t.state === 'flipping').length;
    const revealed = this.tiles.filter(t => t.state === 'revealed').length;

    this.onStatsUpdateCallback({
      stationaryPct: Math.round((stationary / total) * 100),
      flippingPct: Math.round((flipping / total) * 100),
      revealedPct: Math.round((revealed / total) * 100),
      cols: this.cols,
      rows: this.rows
    });
  }
}

// Global Export
window.tileMatrix = new TileMatrixEngine();
