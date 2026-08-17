/* ==========================================================================
   ALBUM DATA CATALOG & DIVERSE REALISTIC SVG ARTWORK GENERATOR
   Generates rich, realistic album art spanning Classic Rock, Jazz, 90s Indie, Electronic & Hip Hop
   ========================================================================== */

const ALBUM_GENRES = {
  CLASSIC_ROCK: 'classic_rock',
  JAZZ: 'jazz',
  INDIE: 'indie',
  ELECTRONIC: 'electronic',
  HIPHOP: 'hiphop'
};

// Rich Realistic Swatches
const REALISTIC_PALETTES = {
  PRISM_ROCK: ['#ff3366', '#ffaa00', '#00e5ff', '#0a0a0f'],
  BLUE_NOTE_JAZZ: ['#0077b6', '#00b4d8', '#90e0ef', '#03045e'],
  INDIE_GRUNGE: ['#d97706', '#b45309', '#fef3c7', '#1c1917'],
  ELECTRONIC_CHROME: ['#00f3ff', '#3b82f6', '#f8fafc', '#090a0f'],
  GOLD_HIPHOP: ['#eab308', '#ca8a04', '#fef08a', '#18181b'],
  PSYCHEDELIC_WARM: ['#f43f5e', '#8b5cf6', '#38bdf8', '#0f172a']
};

class RealisticAlbumGenerator {
  static generateSVG(style, title, artist, colors, idSeed) {
    const p1 = colors[0];
    const p2 = colors[1];
    const p3 = colors[2] || '#ffffff';
    const darkBg = colors[3] || '#090a0f';

    switch (style) {
      case 'prism_rock':
        // Classic Rock Prism Light Spectrum
        return `
          <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="400" fill="${darkBg}"/>
            <!-- White Light Beam -->
            <line x1="30" y1="260" x2="180" y2="180" stroke="#ffffff" stroke-width="4" opacity="0.9"/>
            <!-- Central Prism Triangle -->
            <polygon points="200,120 270,240 130,240" fill="none" stroke="#ffffff" stroke-width="5"/>
            <!-- Rainbow Spectrum Spectrum -->
            <path d="M 230 190 L 370 210" stroke="#ff0000" stroke-width="4"/>
            <path d="M 233 195 L 370 225" stroke="#ffaa00" stroke-width="4"/>
            <path d="M 236 200 L 370 240" stroke="#ffff00" stroke-width="4"/>
            <path d="M 239 205 L 370 255" stroke="#00ff00" stroke-width="4"/>
            <path d="M 242 210 L 370 270" stroke="#00f3ff" stroke-width="4"/>
            <path d="M 245 215 L 370 285" stroke="#9d4edd" stroke-width="4"/>
            <!-- Classic Rock Typography -->
            <text x="200" y="60" text-anchor="middle" fill="#ffffff" font-family="'Space Grotesk', sans-serif" font-size="20" font-weight="900" letter-spacing="4">${title.toUpperCase()}</text>
            <text x="200" y="365" text-anchor="middle" fill="${p2}" font-family="'Outfit', sans-serif" font-size="14" font-weight="700" letter-spacing="3">${artist.toUpperCase()}</text>
          </svg>
        `;

      case 'blue_note_jazz':
        // Classic 1960s Blue Note Duotone Jazz Portrait
        return `
          <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="400" fill="${darkBg}"/>
            <rect x="20" y="20" width="360" height="360" fill="${p1}" opacity="0.85"/>
            <!-- Duotone Silhouette & Jazz Saxophone -->
            <circle cx="200" cy="180" r="100" fill="${p2}" opacity="0.6"/>
            <path d="M 160 250 Q 200 120 240 250 T 280 290" fill="none" stroke="${darkBg}" stroke-width="12" stroke-linecap="round"/>
            <circle cx="280" cy="290" r="22" fill="${darkBg}"/>
            <!-- Bold Asymmetrical Jazz Typography -->
            <rect x="20" y="20" width="360" height="75" fill="${darkBg}"/>
            <text x="35" y="55" fill="${p3}" font-family="'Outfit', sans-serif" font-size="28" font-weight="900" letter-spacing="1">${title.toUpperCase()}</text>
            <text x="35" y="80" fill="${p2}" font-family="'Space Grotesk', sans-serif" font-size="14" font-weight="700" letter-spacing="2">${artist.toUpperCase()} SEXTET</text>
          </svg>
        `;

      case 'indie_grunge':
        // 90s Indie / Grunge Lo-Fi Photo Collage
        return `
          <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="400" fill="${darkBg}"/>
            <!-- Torn Photo Box -->
            <rect x="40" y="50" width="320" height="250" fill="${p1}" rx="2"/>
            <circle cx="200" cy="165" r="75" fill="${p2}"/>
            <polygon points="120,240 280,240 200,100" fill="${darkBg}" opacity="0.7"/>
            <line x1="40" y1="175" x2="360" y2="175" stroke="#ffffff" stroke-width="3" stroke-dasharray="8 6"/>
            <!-- Handwritten Style Stencil Tape -->
            <rect x="110" y="320" width="180" height="35" fill="#fef3c7" transform="rotate(-2 200 335)"/>
            <text x="200" y="343" text-anchor="middle" fill="#1c1917" font-family="'Space Grotesk', sans-serif" font-size="15" font-weight="800" letter-spacing="1">${title}</text>
          </svg>
        `;

      case 'electronic_chrome':
        // Modern Electronic / Ambient Minimal Geometry
        return `
          <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad-${idSeed}" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="${p1}"/>
                <stop offset="50%" stop-color="${p2}"/>
                <stop offset="100%" stop-color="${p3}"/>
              </linearGradient>
            </defs>
            <rect width="400" height="400" fill="${darkBg}"/>
            <!-- Glowing Wave Spheres -->
            <circle cx="200" cy="200" r="120" fill="url(#grad-${idSeed})" opacity="0.9"/>
            <g stroke="#ffffff" stroke-width="1.5" opacity="0.4">
              ${[...Array(10)].map((_, i) => `
                <circle cx="200" cy="200" r="${20 + i * 14}" fill="none"/>
              `).join('')}
            </g>
            <text x="40" y="60" fill="${p1}" font-family="'Space Grotesk', sans-serif" font-size="18" font-weight="800" letter-spacing="3">${title.toUpperCase()}</text>
            <text x="40" y="82" fill="#ffffff" font-family="'Outfit', sans-serif" font-size="12" font-weight="600" letter-spacing="2">${artist.toUpperCase()}</text>
          </svg>
        `;

      case 'hiphop_street':
      default:
        // Bold Vinyl Label Street Art / Modern Hip-Hop
        return `
          <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="400" fill="${darkBg}"/>
            <!-- Big Gold Vinyl Disc Center -->
            <circle cx="200" cy="200" r="150" fill="${p1}"/>
            <circle cx="200" cy="200" r="90" fill="${darkBg}"/>
            <circle cx="200" cy="200" r="35" fill="${p2}"/>
            <circle cx="200" cy="200" r="10" fill="#ffffff"/>
            <!-- Bold Crown / Graffiti Icon -->
            <path d="M 160 110 L 180 135 L 200 100 L 220 135 L 240 110 L 235 150 L 165 150 Z" fill="${p3}"/>
            <text x="200" y="340" text-anchor="middle" fill="${p1}" font-family="'Outfit', sans-serif" font-size="22" font-weight="900" letter-spacing="3">${title.toUpperCase()}</text>
            <text x="200" y="365" text-anchor="middle" fill="#ffffff" font-family="'Space Grotesk', sans-serif" font-size="13" font-weight="700" letter-spacing="2">${artist.toUpperCase()}</text>
          </svg>
        `;
    }
  }
}

// Generate Realistic Diverse 120 Album Covers Catalog
const REALISTIC_CATALOG = [];

const REALISTIC_GENRES = [
  ALBUM_GENRES.CLASSIC_ROCK,
  ALBUM_GENRES.JAZZ,
  ALBUM_GENRES.INDIE,
  ALBUM_GENRES.ELECTRONIC,
  ALBUM_GENRES.HIPHOP
];

const DIVERSE_ARTISTS = [
  'Pink Floyd', 'Miles Davis', 'Nirvana', 'Radiohead', 'Daft Punk',
  'Led Zeppelin', 'John Coltrane', 'Sonic Youth', 'Aphex Twin', 'Kendrick Lamar',
  'The Beatles', 'Thelonious Monk', 'Pixies', 'Kraftwerk', 'Outkast',
  'Fleetwood Mac', 'Bill Evans', 'Pavement', 'Chemical Brothers', 'A Tribe Called Quest'
];

const DIVERSE_TITLES = [
  'Dark Side of the Moon', 'Kind of Blue', 'Nevermind Odyssey', 'OK Computer Waves', 'Discovery 1997',
  'Led Zeppelin IV', 'Giant Steps Fusion', 'Daydream Nation', 'Selected Ambient Works', 'To Pimp A Butterfly',
  'Abbey Road Echoes', 'Monk\'s Dream', 'Doolittle Static', 'Trans-Europe Express', 'Aquemini Horizon',
  'Rumours in Analog', 'Waltz for Debby', 'Slanted and Enchanted', 'Dig Your Own Hole', 'Midnight Marauders'
];

const REALISTIC_STYLES = ['prism_rock', 'blue_note_jazz', 'indie_grunge', 'electronic_chrome', 'hiphop_street'];
const REALISTIC_KEYS = Object.keys(REALISTIC_PALETTES);

for (let i = 0; i < 120; i++) {
  const genre = REALISTIC_GENRES[i % REALISTIC_GENRES.length];
  const artist = DIVERSE_ARTISTS[i % DIVERSE_ARTISTS.length];
  const title = DIVERSE_TITLES[i % DIVERSE_TITLES.length];
  const style = REALISTIC_STYLES[i % REALISTIC_STYLES.length];
  const paletteKey = REALISTIC_KEYS[i % REALISTIC_KEYS.length];
  const palette = REALISTIC_PALETTES[paletteKey];
  const year = 1967 + (i * 4) % 55;

  const svgContent = RealisticAlbumGenerator.generateSVG(style, title, artist, palette, i);

  REALISTIC_CATALOG.push({
    id: `realistic-album-${i + 1}`,
    title: title,
    artist: artist,
    genre: genre,
    year: year,
    palette: palette,
    dominantColor: palette[0],
    style: style,
    svg: svgContent,
    tracklist: [
      `1. ${title} (Side A)`,
      `2. Analog Reverie (feat. ${artist})`,
      `3. Vinyl Groove #9`,
      `4. Midnight Sessions`,
      `5. Outro (Mastered 180g)`
    ]
  });
}

// Global Export
window.ALBUM_CATALOG = REALISTIC_CATALOG;
window.ALBUM_GENRES = ALBUM_GENRES;
