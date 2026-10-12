const fs = require('fs');
const path = require('path');

function generateFrame(t, width = 1280, height = 720) {
  // t is normalized 0.0 to 1.0 (looping smoothly)
  const angle = t * 2 * Math.PI;
  const pulse = (Math.sin(angle) + 1) / 2; // 0 to 1
  const cameraZoom = 1 + 0.06 * Math.sin(angle); // subtle breathing dolly
  const cameraPanX = Math.sin(angle) * 15;
  const cameraPanY = Math.cos(angle) * 8;

  // Key elements positions (focused towards right & center-right)
  const originX = width * 0.62 + cameraPanX;
  const originY = height * 0.58 + cameraPanY;

  // Dynamic light pulse along circuit traces
  const tracePulse1 = (t * 3) % 1;
  const tracePulse2 = ((t * 3) + 0.5) % 1;
  const gearRotation = t * 360;

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Gradients -->
      <radialGradient id="bgGlow" cx="68%" cy="52%" r="65%">
        <stop offset="0%" stop-color="#2a2008" stop-opacity="0.8"/>
        <stop offset="40%" stop-color="#141106" stop-opacity="0.5"/>
        <stop offset="80%" stop-color="#0a0a0a" stop-opacity="0.95"/>
        <stop offset="100%" stop-color="#0a0a0a" stop-opacity="1"/>
      </radialGradient>

      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFE58F"/>
        <stop offset="50%" stop-color="#D4AF37"/>
        <stop offset="100%" stop-color="#997A15"/>
      </linearGradient>

      <linearGradient id="goldBright" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FFF3C4"/>
        <stop offset="60%" stop-color="#E5C158"/>
        <stop offset="100%" stop-color="#B28C1E"/>
      </linearGradient>

      <linearGradient id="metalDark" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#2A2A2E"/>
        <stop offset="50%" stop-color="#18181B"/>
        <stop offset="100%" stop-color="#0F0F12"/>
      </linearGradient>

      <linearGradient id="panelGlass" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#1C1A14" stop-opacity="0.92"/>
        <stop offset="100%" stop-color="#0D0C09" stop-opacity="0.96"/>
      </linearGradient>

      <!-- Glow filter for neon traces -->
      <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>

      <filter id="intenseGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="8" result="blur2"/>
        <feGaussianBlur stdDeviation="3" result="blur1"/>
        <feMerge>
          <feMergeNode in="blur2"/>
          <feMergeNode in="blur1"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <!-- Deep obsidian background -->
    <rect width="${width}" height="${height}" fill="#0A0A0A"/>
    <rect width="${width}" height="${height}" fill="url(#bgGlow)"/>

    <!-- Subtle Isometric Floor Grid -->
    <g opacity="0.18" stroke="#D4AF37" stroke-width="0.75">
      ${Array.from({ length: 16 }).map((_, i) => {
        const y = 300 + i * 30;
        return `<line x1="200" y1="${y}" x2="${width + 100}" y2="${y + 120}" />
                <line x1="${width + 100}" y1="${y - 80}" x2="200" y2="${y + 200}" />`;
      }).join('\n')}
    </g>

    <!-- World Map Constellation Network in Upper Right Horizon -->
    <g opacity="${0.45 + pulse * 0.15}" transform="translate(${originX - 220}, 70)">
      <!-- Constellation connection lines -->
      <path d="M 0,40 L 40,25 L 80,45 L 130,20 L 190,35 L 240,15 L 290,40 L 350,25 L 420,50 L 480,30" 
            fill="none" stroke="#D4AF37" stroke-width="1" stroke-dasharray="3,3" opacity="0.6"/>
      <path d="M 40,25 L 70,75 L 140,85 L 200,60 L 260,80 L 330,65 L 400,90" 
            fill="none" stroke="#D4AF37" stroke-width="0.8" stroke-dasharray="2,3" opacity="0.4"/>
      <path d="M 130,20 L 140,85 M 240,15 L 260,80 M 350,25 L 330,65" 
            fill="none" stroke="#DFC067" stroke-width="0.6" opacity="0.35"/>
      <!-- Glowing constellation nodes -->
      ${[
        [0,40], [40,25], [80,45], [130,20], [190,35], [240,15], [290,40], [350,25], [420,50], [480,30],
        [70,75], [140,85], [200,60], [260,80], [330,65], [400,90]
      ].map(([nx, ny], idx) => `
        <circle cx="${nx}" cy="${ny}" r="2" fill="#FFE58F" />
        <circle cx="${nx}" cy="${ny}" r="${3 + Math.sin(angle + idx) * 1.5}" fill="#D4AF37" opacity="0.5" filter="url(#goldGlow)"/>
      `).join('')}
    </g>

    <!-- Floor Circuit Board Traces (Glowing Golden PCB lines with travelling light pulses) -->
    <g filter="url(#goldGlow)">
      <!-- Main circuit spine -->
      <path d="M ${originX - 380},${originY + 140} 
               L ${originX - 220},${originY + 140} 
               L ${originX - 140},${originY + 80} 
               L ${originX + 80},${originY + 80} 
               L ${originX + 160},${originY + 140} 
               L ${originX + 380},${originY + 140}" 
            fill="none" stroke="#997A15" stroke-width="2.5" opacity="0.75" />
      
      <path d="M ${originX - 380},${originY + 140} 
               L ${originX - 220},${originY + 140} 
               L ${originX - 140},${originY + 80} 
               L ${originX + 80},${originY + 80} 
               L ${originX + 160},${originY + 140} 
               L ${originX + 380},${originY + 140}" 
            fill="none" stroke="#FFE58F" stroke-width="1.2" opacity="0.9" />

      <!-- Branch circuits leading to database, server blocks, and shield -->
      <path d="M ${originX - 220},${originY + 140} L ${originX - 220},${originY - 30} L ${originX - 170},${originY - 30}" 
            fill="none" stroke="#D4AF37" stroke-width="2" opacity="0.85" />
      <path d="M ${originX - 140},${originY + 80} L ${originX - 60},${originY + 80} L ${originX - 20},${originY + 40}" 
            fill="none" stroke="#D4AF37" stroke-width="2" opacity="0.85" />
      <path d="M ${originX + 80},${originY + 80} L ${originX + 130},${originY + 20} L ${originX + 220},${originY + 20}" 
            fill="none" stroke="#D4AF37" stroke-width="2" opacity="0.85" />
      <path d="M ${originX + 160},${originY + 140} L ${originX + 260},${originY + 140} L ${originX + 300},${originY + 90}" 
            fill="none" stroke="#D4AF37" stroke-width="2" opacity="0.85" />

      <!-- Circuit terminal pads / vias -->
      ${[
        [originX - 380, originY + 140],
        [originX - 220, originY + 140],
        [originX - 170, originY - 30],
        [originX - 140, originY + 80],
        [originX - 20, originY + 40],
        [originX + 80, originY + 80],
        [originX + 220, originY + 20],
        [originX + 160, originY + 140],
        [originX + 300, originY + 90],
        [originX + 380, originY + 140]
      ].map(([cx, cy]) => `
        <circle cx="${cx}" cy="${cy}" r="4" fill="#0A0A0A" stroke="#FFE58F" stroke-width="2"/>
        <circle cx="${cx}" cy="${cy}" r="1.5" fill="#FFE58F"/>
      `).join('')}

      <!-- Flowing Light Energy Packets along circuit lines -->
      <circle cx="${originX - 380 + tracePulse1 * 760}" cy="${originY + 140}" r="3.5" fill="#FFFFFF" filter="url(#intenseGlow)"/>
      <circle cx="${originX - 380 + tracePulse2 * 760}" cy="${originY + 140}" r="2.5" fill="#FFE58F" filter="url(#intenseGlow)"/>
    </g>

    <!-- 3D Database Cylinders on the Left/Mid (Servers with glowing golden status rings) -->
    <g transform="translate(${originX - 260}, ${originY - 80})">
      <!-- Shadow -->
      <ellipse cx="40" cy="140" rx="36" ry="14" fill="#000000" opacity="0.6"/>

      <!-- Cylinder 1 (Main Stack) -->
      ${[0, 32, 64, 96].map((offsetY, idx) => `
        <g transform="translate(0, ${offsetY})">
          <!-- Cylinder body -->
          <path d="M 8,20 A 32 12 0 0 0 72,20 L 72,42 A 32 12 0 0 1 8,42 Z" fill="url(#metalDark)" stroke="#1F1F24" stroke-width="1"/>
          <!-- Glowing status ring -->
          <ellipse cx="40" cy="40" rx="32" ry="11" fill="none" stroke="#D4AF37" stroke-width="2.5" opacity="${0.75 + Math.sin(angle + idx) * 0.2}" filter="url(#goldGlow)"/>
          <!-- Top lid highlight -->
          <ellipse cx="40" cy="20" rx="32" ry="12" fill="#1C1C20" stroke="#333338" stroke-width="1"/>
          <ellipse cx="40" cy="19" rx="28" ry="9" fill="#141417"/>
        </g>
      `).join('')}

      <!-- Smaller Database Cylinder Adjacent -->
      <g transform="translate(-50, 45)">
        ${[0, 26, 52].map((offsetY) => `
          <g transform="translate(0, ${offsetY})">
            <path d="M 6,15 A 24 9 0 0 0 54,15 L 54,32 A 24 9 0 0 1 6,32 Z" fill="url(#metalDark)"/>
            <ellipse cx="30" cy="30" rx="24" ry="8" fill="none" stroke="#DFC067" stroke-width="1.8" opacity="0.8" filter="url(#goldGlow)"/>
            <ellipse cx="30" cy="15" rx="24" ry="9" fill="#1C1C20"/>
          </g>
        `).join('')}
      </g>
    </g>

    <!-- Floating Enterprise UI Dashboard Panels (IDE Code & Telemetry Analytics) -->
    <!-- Panel 1: Code Window (Left-Center) -->
    <g transform="translate(${originX - 160}, ${originY - 210})" filter="url(#goldGlow)">
      <!-- Glassmorphic panel backdrop -->
      <rect x="0" y="0" width="190" height="150" rx="8" fill="url(#panelGlass)" stroke="#D4AF37" stroke-width="1.2" opacity="0.95"/>
      <!-- Header bar -->
      <rect x="0" y="0" width="190" height="22" rx="8" fill="#1A1812"/>
      <circle cx="12" cy="11" r="3" fill="#D4AF37"/>
      <circle cx="22" cy="11" r="3" fill="#887020"/>
      <circle cx="32" cy="11" r="3" fill="#443810"/>
      <text x="44" y="14" fill="#A1A1AA" font-family="monospace" font-size="8">CoreEngine.ts</text>

      <!-- Code lines (syntax highlights in gold & white) -->
      <text x="12" y="38" fill="#DFC067" font-family="monospace" font-size="7.5" font-weight="bold">export class</text>
      <text x="75" y="38" fill="#FFFFFF" font-family="monospace" font-size="7.5">DigitalCore {</text>

      <text x="20" y="52" fill="#71717A" font-family="monospace" font-size="7">private readonly auth: Key;</text>

      <text x="20" y="66" fill="#DFC067" font-family="monospace" font-size="7.5" font-weight="bold">async</text>
      <text x="50" y="66" fill="#FFE58F" font-family="monospace" font-size="7.5">verifyIdentity() {</text>

      <text x="28" y="80" fill="#E5C158" font-family="monospace" font-size="7">await</text>
      <text x="56" y="80" fill="#D4D4D8" font-family="monospace" font-size="7">shield.handshake();</text>

      <text x="28" y="94" fill="#E5C158" font-family="monospace" font-size="7">return</text>
      <text x="60" y="94" fill="#4ADE80" font-family="monospace" font-size="7">Status.OPTIMAL;</text>

      <text x="20" y="108" fill="#FFFFFF" font-family="monospace" font-size="7.5">}</text>

      <!-- Mini telemetry line graph inside code panel -->
      <path d="M 16,134 L 40,126 L 70,132 L 100,120 L 130,128 L 160,116 L 180,122" 
            fill="none" stroke="#FFE58F" stroke-width="1.5" />
      <path d="M 16,134 L 40,126 L 70,132 L 100,120 L 130,128 L 160,116 L 180,122 L 180,140 L 16,140 Z" 
            fill="#D4AF37" opacity="0.12"/>
    </g>

    <!-- Panel 2: Telemetry Analytics Dashboard (Center-Right) -->
    <g transform="translate(${originX + 45}, ${originY - 230})" filter="url(#goldGlow)">
      <!-- Glassmorphic panel backdrop -->
      <rect x="0" y="0" width="220" height="155" rx="8" fill="url(#panelGlass)" stroke="#D4AF37" stroke-width="1.2" opacity="0.95"/>
      <!-- Header -->
      <rect x="0" y="0" width="220" height="22" rx="8" fill="#1A1812"/>
      <text x="14" y="14" fill="#DFC067" font-family="sans-serif" font-size="9" font-weight="bold">SYSTEM TELEMETRY</text>
      <circle cx="198" cy="11" r="3.5" fill="#4ADE80" filter="url(#goldGlow)"/>

      <!-- Bar Chart (Gold bars) -->
      <g transform="translate(18, 40)">
        <text x="0" y="0" fill="#A1A1AA" font-family="sans-serif" font-size="8">Throughput / QPS</text>
        ${[45, 68, 52, 85, 96, 74, 92, 108].map((barH, i) => `
          <rect x="${i * 12}" y="${65 - (barH * 0.45)}" width="8" height="${barH * 0.45}" rx="2" 
                fill="${i === 4 || i === 7 ? 'url(#goldBright)' : 'url(#goldGrad)'}" opacity="0.9"/>
        `).join('')}
        <line x1="0" y1="65" x2="100" y2="65" stroke="#333333" stroke-width="1"/>
      </g>

      <!-- Circular Donut Progress Meter (83.3%) -->
      <g transform="translate(160, 68)">
        <circle cx="0" cy="0" r="24" fill="none" stroke="#262626" stroke-width="5"/>
        <circle cx="0" cy="0" r="24" fill="none" stroke="#FFE58F" stroke-width="5" 
                stroke-dasharray="125 150" stroke-dashoffset="10" stroke-linecap="round" filter="url(#goldGlow)"/>
        <text x="0" y="4" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-size="10" font-weight="bold">83.3%</text>
        <text x="0" y="38" text-anchor="middle" fill="#A1A1AA" font-family="sans-serif" font-size="7.5">UPTIME ACCEL</text>
      </g>

      <!-- Realtime pulse graph -->
      <g transform="translate(18, 120)">
        <path d="M 0,15 L 30,12 L 60,18 L 85,5 L 110,14 L 140,8 L 180,12" 
              fill="none" stroke="#D4AF37" stroke-width="1.8" />
        <text x="140" y="24" fill="#DFC067" font-family="monospace" font-size="8">00:01:00</text>
      </g>
    </g>

    <!-- Floating 3D Cloud Computing Icon with Gears (Top Right) -->
    <g transform="translate(${originX + 160}, ${originY - 110})" filter="url(#goldGlow)">
      <!-- Cloud base -->
      <path d="M 20,40 
               A 16 16 0 0 1 45,26 
               A 22 22 0 0 1 82,24 
               A 16 16 0 0 1 100,40 
               A 12 12 0 0 1 96,56 
               L 18,56 
               A 14 14 0 0 1 20,40 Z" 
            fill="url(#panelGlass)" stroke="#D4AF37" stroke-width="2"/>
      
      <!-- Interlocking gears inside/above cloud -->
      <g transform="translate(48, 36) rotate(${gearRotation})">
        <circle cx="0" cy="0" r="10" fill="none" stroke="#FFE58F" stroke-width="3"/>
        <circle cx="0" cy="0" r="4" fill="#D4AF37"/>
        ${[0, 60, 120, 180, 240, 300].map(deg => `
          <rect x="-2" y="-14" width="4" height="4" fill="#FFE58F" transform="rotate(${deg})"/>
        `).join('')}
      </g>
      <g transform="translate(68, 44) rotate(${-gearRotation * 1.5})">
        <circle cx="0" cy="0" r="7" fill="none" stroke="#DFC067" stroke-width="2.5"/>
        <circle cx="0" cy="0" r="3" fill="#D4AF37"/>
      </g>
    </g>

    <!-- 3D Rotating Metallic Gears in Middle Space -->
    <g transform="translate(${originX - 10}, ${originY - 20}) rotate(${gearRotation})">
      <circle cx="0" cy="0" r="16" fill="url(#metalDark)" stroke="#FFE58F" stroke-width="2.5" filter="url(#goldGlow)"/>
      <circle cx="0" cy="0" r="6" fill="#18181B" stroke="#D4AF37" stroke-width="1.5"/>
      ${[0, 45, 90, 135, 180, 225, 270, 315].map(deg => `
        <rect x="-3" y="-22" width="6" height="7" rx="1" fill="#FFE58F" transform="rotate(${deg})"/>
      `).join('')}
    </g>

    <!-- 3D Modular Server Cubes on Center Floor (Black with Gold Tops) -->
    <g transform="translate(${originX - 70}, ${originY + 40})">
      <!-- Shadow -->
      <ellipse cx="40" cy="50" rx="45" ry="18" fill="#000000" opacity="0.6"/>

      <!-- Cube 1 (Dark) -->
      <g transform="translate(0, 0)">
        <!-- Top polygon -->
        <polygon points="25,5 50,18 25,31 0,18" fill="#1F1F24" stroke="#333338" stroke-width="1"/>
        <!-- Left face -->
        <polygon points="0,18 25,31 25,62 0,49" fill="#121214"/>
        <!-- Right face -->
        <polygon points="25,31 50,18 50,49 25,62" fill="#18181C"/>
      </g>

      <!-- Cube 2 (Gold Top Cap - Glowing) -->
      <g transform="translate(32, -14)">
        <!-- Top polygon (Gold) -->
        <polygon points="25,5 50,18 25,31 0,18" fill="url(#goldBright)" stroke="#FFF3C4" stroke-width="1.5" filter="url(#goldGlow)"/>
        <!-- Left face -->
        <polygon points="0,18 25,31 25,62 0,49" fill="#8C6E14"/>
        <!-- Right face -->
        <polygon points="25,31 50,18 50,49 25,62" fill="#B28C1E"/>
      </g>

      <!-- Cube 3 (Black) -->
      <g transform="translate(20, 22)">
        <polygon points="25,5 50,18 25,31 0,18" fill="#24242A"/>
        <polygon points="0,18 25,31 25,55 0,42" fill="#0F0F12"/>
        <polygon points="25,31 50,18 50,42 25,55" fill="#16161A"/>
      </g>
    </g>

    <!-- 3D Golden Cybersecurity Shield with Padlock (The Main Centerpiece on Right) -->
    <g transform="translate(${originX + 130}, ${originY - 10})" filter="url(#intenseGlow)">
      <!-- Illuminated Hexagonal Pedestal on Floor -->
      <g transform="translate(50, 95)">
        <ellipse cx="0" cy="0" rx="65" ry="24" fill="#000000" opacity="0.5"/>
        <polygon points="0,-18 54,-8 54,12 0,22 -54,12 -54,-8" 
                 fill="none" stroke="#D4AF37" stroke-width="2.5" opacity="${0.8 + pulse * 0.2}" filter="url(#goldGlow)"/>
        <polygon points="0,-12 40,-5 40,8 0,15 -40,8 -40,-5" 
                 fill="#1A1810" stroke="#FFE58F" stroke-width="1.5"/>
        <!-- Radiating light ground rings -->
        <ellipse cx="0" cy="2" rx="${35 + pulse * 15}" ry="${12 + pulse * 5}" 
                 fill="none" stroke="#FFE58F" stroke-width="1" opacity="${0.6 - pulse * 0.4}"/>
      </g>

      <!-- 3D Gold Shield Body -->
      <g transform="translate(0, 0)">
        <!-- Outer Shield Glow Outline -->
        <path d="M 50,-55 
                 L 95,-38 
                 C 95,20 80,68 50,90 
                 C 20,68 5,20 5,-38 Z" 
              fill="url(#goldBright)" stroke="#FFFBEB" stroke-width="3" filter="url(#intenseGlow)"/>

        <!-- Shield Inner Recess -->
        <path d="M 50,-46 
                 L 86,-32 
                 C 86,16 74,56 50,76 
                 C 26,56 14,16 14,-32 Z" 
              fill="#18150D" stroke="#D4AF37" stroke-width="1.8"/>

        <!-- Shield Central Emblem: Glowing Padlock -->
        <g transform="translate(50, 14)">
          <!-- Padlock Shackle -->
          <path d="M -10,-8 A 10 10 0 0 1 10,-8 L 10,2 L -10,2 Z" 
                fill="none" stroke="#FFE58F" stroke-width="3.5" stroke-linecap="round"/>
          <!-- Padlock Body -->
          <rect x="-14" y="2" width="28" height="22" rx="4" fill="url(#goldBright)" stroke="#FFFBEB" stroke-width="1.5"/>
          <!-- Keyhole -->
          <circle cx="0" cy="10" r="3" fill="#18150D"/>
          <polygon points="-1.5,10 1.5,10 2.5,17 -2.5,17" fill="#18150D"/>
        </g>
      </g>
    </g>

    <!-- Soft Golden Atmospheric Glow Overlay focused on Right -->
    <circle cx="${originX + 120}" cy="${originY - 30}" r="${180 + pulse * 20}" 
            fill="#D4AF37" opacity="${0.08 + pulse * 0.04}" filter="url(#intenseGlow)"/>

    <!-- Left Side Dark Vignette: Blends smoothly so the left side text is crystal clear -->
    <rect width="${width * 0.42}" height="${height}" 
          fill="url(#leftGradientScrim)"/>
    <defs>
      <linearGradient id="leftGradientScrim" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#0A0A0A" stop-opacity="1"/>
        <stop offset="65%" stop-color="#0A0A0A" stop-opacity="0.95"/>
        <stop offset="100%" stop-color="#0A0A0A" stop-opacity="0"/>
      </linearGradient>
    </defs>
  </svg>`;
}

async function main() {
  const framesDir = '/tmp/hero_video_frames';
  if (!fs.existsSync(framesDir)) {
    fs.mkdirSync(framesDir, { recursive: true });
  }

  const fps = 30;
  const durationSec = 6; // 6-second seamless loop
  const totalFrames = fps * durationSec; // 180 frames

  console.log(`Generating ${totalFrames} high-detail SVG frames...`);
  const startTime = Date.now();

  for (let i = 0; i < totalFrames; i++) {
    const t = i / totalFrames;
    const svg = generateFrame(t, 1280, 720);
    const filename = path.join(framesDir, `frame_${String(i).padStart(4, '0')}.svg`);
    fs.writeFileSync(filename, svg, 'utf8');
  }

  console.log(`Generated all ${totalFrames} frames in ${(Date.now() - startTime) / 1000}s`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
