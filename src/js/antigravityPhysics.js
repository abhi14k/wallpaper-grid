/* ==========================================================================
   ANTIGRAVITY PHYSICS ENGINE (IMAC 3D PARALLAX & ROOM DRIFT)
   ========================================================================== */

class AntigravityEngine {
  constructor() {
    this.imacEl = null;
    this.targetTiltX = 0;
    this.targetTiltY = 0;
    this.currentTiltX = 0;
    this.currentTiltY = 0;
    this.time = 0;
  }

  init(imacId) {
    this.imacEl = document.getElementById(imacId);

    // Mouse Parallax tracking over room
    window.addEventListener('mousemove', (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;

      this.targetTiltX = -dy * 5; // Degrees X
      this.targetTiltY = dx * 8;   // Degrees Y
    });

    this.startLoop();
  }

  startLoop() {
    const loop = () => {
      this.time += 0.02;

      // Smooth interpolation for 3D iMac tilt
      this.currentTiltX += (this.targetTiltX - this.currentTiltX) * 0.05;
      this.currentTiltY += (this.targetTiltY - this.currentTiltY) * 0.05;

      // Microscopic sinusoidal buoyancy drift
      const microFloatY = Math.sin(this.time) * 3;
      const microFloatZ = Math.cos(this.time * 0.8) * 4;

      if (this.imacEl) {
        this.imacEl.style.transform = `
          rotateX(${this.currentTiltX}deg) 
          rotateY(${this.currentTiltY}deg) 
          translateY(${microFloatY}px) 
          translateZ(${microFloatZ}px)
        `;
      }

      requestAnimationFrame(loop);
    };

    loop();
  }
}

// Global Export
window.antigravityPhysics = new AntigravityEngine();
