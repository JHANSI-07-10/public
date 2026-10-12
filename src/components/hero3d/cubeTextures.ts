import * as THREE from 'three';

/**
 * High-definition Canvas Texture Generator for the 6 faces of the 3D Technology Cube
 * Resolution: 1024 x 1024 for crisp retina typography and sharp vector lines.
 * Brand tokens:
 * - Background: #0B0B0E to #141418
 * - Primary Gold: #D4AF37
 * - Gold Highlight: #DFC067
 * - Text White: #FFFFFF
 * - Secondary Text: #A1A1AA
 * - Muted Text: #71717A
 * - Grid / Wire: #222228
 */

export interface CubeTexturesSet {
  front: THREE.CanvasTexture;  // +Z: VPD Technologies Official Brand Core
  right: THREE.CanvasTexture;  // +X: Web & Application Architecture
  back: THREE.CanvasTexture;   // -Z: Cloud Infrastructure & DevOps
  left: THREE.CanvasTexture;   // -X: Database Clusters & API Systems
  top: THREE.CanvasTexture;    // +Y: AI Systems & Neural Architecture
  bottom: THREE.CanvasTexture; // -Y: Startup Lifecycle & Scale Engine
  updateAll: () => void;
  disposeAll: () => void;
}

// Helper for drawing high-tech circuit grids and golden corner brackets
function drawTechFrame(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  faceCode: string,
  faceLabel: string
) {
  // Deep dark radial gradient background
  const bgGrad = ctx.createRadialGradient(
    width / 2,
    height / 2,
    50,
    width / 2,
    height / 2,
    width * 0.72
  );
  bgGrad.addColorStop(0, '#15151B');
  bgGrad.addColorStop(0.55, '#0E0E12');
  bgGrad.addColorStop(1, '#08080A');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle background dot matrix / grid
  ctx.fillStyle = 'rgba(212, 175, 55, 0.04)';
  const step = 48;
  for (let x = step; x < width; x += step) {
    for (let y = step; y < height; y += step) {
      ctx.beginPath();
      ctx.arc(x, y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Outer golden hairline border
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.28)';
  ctx.lineWidth = 2;
  ctx.strokeRect(36, 36, width - 72, height - 72);

  // Inner subtle secondary border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 1;
  ctx.strokeRect(48, 48, width - 96, height - 96);

  // 4 Golden Corner Reticles (L-brackets)
  const bracketSize = 28;
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 3.5;

  // Top-Left
  ctx.beginPath();
  ctx.moveTo(36, 36 + bracketSize);
  ctx.lineTo(36, 36);
  ctx.lineTo(36 + bracketSize, 36);
  ctx.stroke();

  // Top-Right
  ctx.beginPath();
  ctx.moveTo(width - 36 - bracketSize, 36);
  ctx.lineTo(width - 36, 36);
  ctx.lineTo(width - 36, 36 + bracketSize);
  ctx.stroke();

  // Bottom-Left
  ctx.beginPath();
  ctx.moveTo(36, height - 36 - bracketSize);
  ctx.lineTo(36, height - 36);
  ctx.lineTo(36 + bracketSize, height - 36);
  ctx.stroke();

  // Bottom-Right
  ctx.beginPath();
  ctx.moveTo(width - 36 - bracketSize, height - 36);
  ctx.lineTo(width - 36, height - 36);
  ctx.lineTo(width - 36, height - 36 - bracketSize);
  ctx.stroke();

  // Top Header Metadata Bar
  ctx.fillStyle = '#71717A';
  ctx.font = 'bold 15px "JetBrains Mono", monospace, monospace';
  ctx.textAlign = 'left';
  ctx.fillText(`SYS // ${faceCode}`, 56, 76);

  // Status Indicator
  ctx.fillStyle = '#22C55E';
  ctx.beginPath();
  ctx.arc(width - 150, 71, 4.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#DFC067';
  ctx.font = 'bold 14px "JetBrains Mono", monospace, monospace';
  ctx.textAlign = 'right';
  ctx.fillText('ONLINE // <1ms', width - 56, 76);

  // Horizontal separator under header
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.15)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(48, 96);
  ctx.lineTo(width - 48, 96);
  ctx.stroke();

  // Bottom Footer Label
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.15)';
  ctx.beginPath();
  ctx.moveTo(48, height - 86);
  ctx.lineTo(width - 48, height - 86);
  ctx.stroke();

  ctx.fillStyle = '#A1A1AA';
  ctx.font = '600 14px "JetBrains Mono", monospace, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(faceLabel, 56, height - 60);

  ctx.fillStyle = '#D4AF37';
  ctx.textAlign = 'right';
  ctx.fillText('VPD TECH 3D CORE', width - 56, height - 60);
}

/**
 * Creates the complete set of 6 canvas textures for the 3D Technology Cube
 */
export function createCubeTextures(onReady?: () => void): CubeTexturesSet {
  const size = 1024;

  // --- 1. FACE +Z: FRONT (VPD TECHNOLOGIES OFFICIAL BRAND CORE) ---
  const canvasFront = document.createElement('canvas');
  canvasFront.width = size;
  canvasFront.height = size;
  const ctxFront = canvasFront.getContext('2d')!;

  const textureFront = new THREE.CanvasTexture(canvasFront);
  textureFront.colorSpace = THREE.SRGBColorSpace;
  textureFront.anisotropy = 8;

  // Load official logo image asset
  const logoImg = new Image();
  logoImg.crossOrigin = 'anonymous';
  let logoLoaded = false;

  const renderFrontFace = () => {
    drawTechFrame(ctxFront, size, size, 'CORE-01', 'OFFICIAL BRAND CORE');

    // Central circular ambient gold glow
    const radialGlow = ctxFront.createRadialGradient(
      size / 2,
      size / 2 - 20,
      20,
      size / 2,
      size / 2 - 20,
      280
    );
    radialGlow.addColorStop(0, 'rgba(212, 175, 55, 0.22)');
    radialGlow.addColorStop(0.5, 'rgba(212, 175, 55, 0.06)');
    radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctxFront.fillStyle = radialGlow;
    ctxFront.beginPath();
    ctxFront.arc(size / 2, size / 2 - 20, 280, 0, Math.PI * 2);
    ctxFront.fill();

    // Concentric high-tech orbit rings behind logo
    ctxFront.strokeStyle = 'rgba(212, 175, 55, 0.22)';
    ctxFront.lineWidth = 1.5;
    ctxFront.beginPath();
    ctxFront.arc(size / 2, size / 2 - 20, 240, 0, Math.PI * 2);
    ctxFront.stroke();

    ctxFront.strokeStyle = 'rgba(212, 175, 55, 0.12)';
    ctxFront.setLineDash([8, 12]);
    ctxFront.beginPath();
    ctxFront.arc(size / 2, size / 2 - 20, 290, 0, Math.PI * 2);
    ctxFront.stroke();
    ctxFront.setLineDash([]);

    // Official Logo rendering
    if (logoLoaded && logoImg.width > 0) {
      // Draw authentic VPD Technologies logo
      const targetWidth = 560;
      const targetHeight = (targetWidth * logoImg.height) / logoImg.width;
      const logoX = (size - targetWidth) / 2;
      const logoY = (size - targetHeight) / 2 - 50;

      // Subtle backing plate to give depth
      ctxFront.fillStyle = 'rgba(18, 18, 22, 0.85)';
      ctxFront.strokeStyle = 'rgba(212, 175, 55, 0.35)';
      ctxFront.lineWidth = 1.5;
      const platePad = 24;
      ctxFront.beginPath();
      ctxFront.roundRect(
        logoX - platePad,
        logoY - platePad + 10,
        targetWidth + platePad * 2,
        targetHeight + platePad * 2 - 20,
        16
      );
      ctxFront.fill();
      ctxFront.stroke();

      ctxFront.drawImage(logoImg, logoX, logoY, targetWidth, targetHeight);
    } else {
      // Crisp fallback while loading
      ctxFront.fillStyle = '#FFFFFF';
      ctxFront.font = '900 78px "Inter", sans-serif';
      ctxFront.textAlign = 'center';
      ctxFront.fillText('VPD', size / 2, size / 2 - 60);

      ctxFront.fillStyle = '#D4AF37';
      ctxFront.font = 'bold 32px "JetBrains Mono", monospace';
      ctxFront.letterSpacing = '8px';
      ctxFront.fillText('TECHNOLOGIES', size / 2, size / 2 + 10);
    }

    // Secondary Enterprise Typography
    ctxFront.fillStyle = '#FFFFFF';
    ctxFront.font = 'bold 28px "Inter", sans-serif';
    ctxFront.textAlign = 'center';
    ctxFront.letterSpacing = '4px';
    ctxFront.fillText('DIGITAL CORE ARCHITECTURE', size / 2, size / 2 + 190);

    ctxFront.fillStyle = '#A1A1AA';
    ctxFront.font = '18px "Inter", sans-serif';
    ctxFront.letterSpacing = '1px';
    ctxFront.fillText('Enterprise Web Platforms · Scalable Systems', size / 2, size / 2 + 230);

    // Pill status below
    const badgeW = 340;
    const badgeH = 40;
    const badgeX = (size - badgeW) / 2;
    const badgeY = size / 2 + 270;
    ctxFront.fillStyle = 'rgba(212, 175, 55, 0.1)';
    ctxFront.strokeStyle = 'rgba(212, 175, 55, 0.4)';
    ctxFront.lineWidth = 1.5;
    ctxFront.beginPath();
    ctxFront.roundRect(badgeX, badgeY, badgeW, badgeH, 20);
    ctxFront.fill();
    ctxFront.stroke();

    ctxFront.fillStyle = '#DFC067';
    ctxFront.font = 'bold 15px "JetBrains Mono", monospace';
    ctxFront.textAlign = 'center';
    ctxFront.fillText('MISSION CRITICAL // STABLE', size / 2, badgeY + 25);

    textureFront.needsUpdate = true;
  };

  logoImg.onload = () => {
    logoLoaded = true;
    renderFrontFace();
    if (onReady) onReady();
  };
  logoImg.src = '/logo.webp';
  renderFrontFace();

  // --- 2. FACE +X: RIGHT (WEB & APPLICATION ARCHITECTURE) ---
  const canvasRight = document.createElement('canvas');
  canvasRight.width = size;
  canvasRight.height = size;
  const ctxRight = canvasRight.getContext('2d')!;

  const textureRight = new THREE.CanvasTexture(canvasRight);
  textureRight.colorSpace = THREE.SRGBColorSpace;
  textureRight.anisotropy = 8;

  const renderRightFace = () => {
    drawTechFrame(ctxRight, size, size, 'APP-02', 'WEB & APPLICATION CORE');

    // Title
    ctxRight.fillStyle = '#FFFFFF';
    ctxRight.font = 'bold 36px "Inter", sans-serif';
    ctxRight.textAlign = 'left';
    ctxRight.fillText('WEB & APP ENGINEERING', 76, 160);

    ctxRight.fillStyle = '#DFC067';
    ctxRight.font = 'bold 18px "JetBrains Mono", monospace';
    ctxRight.fillText('REACT 19 · TYPESCRIPT · TAILWIND V4', 76, 200);

    // Interactive UI mock layout card
    const cardX = 76;
    const cardY = 240;
    const cardW = size - 152;
    const cardH = 340;

    ctxRight.fillStyle = 'rgba(20, 20, 26, 0.9)';
    ctxRight.strokeStyle = 'rgba(212, 175, 55, 0.3)';
    ctxRight.lineWidth = 1.5;
    ctxRight.beginPath();
    ctxRight.roundRect(cardX, cardY, cardW, cardH, 14);
    ctxRight.fill();
    ctxRight.stroke();

    // Window controls
    ctxRight.fillStyle = '#EF4444';
    ctxRight.beginPath();
    ctxRight.arc(cardX + 24, cardY + 24, 6, 0, Math.PI * 2);
    ctxRight.fill();
    ctxRight.fillStyle = '#F59E0B';
    ctxRight.beginPath();
    ctxRight.arc(cardX + 44, cardY + 24, 6, 0, Math.PI * 2);
    ctxRight.fill();
    ctxRight.fillStyle = '#10B981';
    ctxRight.beginPath();
    ctxRight.arc(cardX + 64, cardY + 24, 6, 0, Math.PI * 2);
    ctxRight.fill();

    // Code lines inside mock card
    const codeLines = [
      { text: '// Core Architecture Definition', color: '#71717A' },
      { text: 'export const digitalCore = definePlatform({', color: '#D4AF37' },
      { text: '  framework: "React 19 + TypeScript",', color: '#A1A1AA' },
      { text: '  engine: "Vite SSR + Edge Workers",', color: '#A1A1AA' },
      { text: '  latencyTarget: "sub-10ms P95",', color: '#DFC067' },
      { text: '  resilience: "Autonomous Failover"', color: '#A1A1AA' },
      { text: '});', color: '#D4AF37' },
    ];

    ctxRight.font = '18px "JetBrains Mono", monospace';
    ctxRight.textAlign = 'left';
    codeLines.forEach((line, idx) => {
      ctxRight.fillStyle = line.color;
      ctxRight.fillText(line.text, cardX + 28, cardY + 70 + idx * 36);
    });

    // 3 Real-time Metric Boxes below card
    const metricBoxes = [
      { label: 'RENDER SPEED', value: '60 FPS', sub: 'Zero Frame Drops' },
      { label: 'HYDRATION', value: '0.4 ms', sub: 'Edge Compiled' },
      { label: 'LIGHTHOUSE', value: '100 / 100', sub: 'Performance & SEO' },
    ];

    const boxW = (size - 152 - 32) / 3;
    const boxH = 160;
    const boxY = 620;

    metricBoxes.forEach((box, i) => {
      const bx = 76 + i * (boxW + 16);
      ctxRight.fillStyle = 'rgba(18, 18, 22, 0.85)';
      ctxRight.strokeStyle = 'rgba(212, 175, 55, 0.2)';
      ctxRight.lineWidth = 1.5;
      ctxRight.beginPath();
      ctxRight.roundRect(bx, boxY, boxW, boxH, 12);
      ctxRight.fill();
      ctxRight.stroke();

      ctxRight.fillStyle = '#71717A';
      ctxRight.font = 'bold 13px "JetBrains Mono", monospace';
      ctxRight.fillText(box.label, bx + 20, boxY + 36);

      ctxRight.fillStyle = '#DFC067';
      ctxRight.font = 'bold 32px "Inter", sans-serif';
      ctxRight.fillText(box.value, bx + 20, boxY + 86);

      ctxRight.fillStyle = '#A1A1AA';
      ctxRight.font = '13px "Inter", sans-serif';
      ctxRight.fillText(box.sub, bx + 20, boxY + 124);
    });

    // Bottom banner
    ctxRight.fillStyle = '#FFFFFF';
    ctxRight.font = '600 18px "Inter", sans-serif';
    ctxRight.fillText('✦ Engineered for Conversion & Enterprise Resilience', 76, 830);

    textureRight.needsUpdate = true;
  };
  renderRightFace();

  // --- 3. FACE -Z: BACK (CLOUD & DEVOPS INFRASTRUCTURE) ---
  const canvasBack = document.createElement('canvas');
  canvasBack.width = size;
  canvasBack.height = size;
  const ctxBack = canvasBack.getContext('2d')!;

  const textureBack = new THREE.CanvasTexture(canvasBack);
  textureBack.colorSpace = THREE.SRGBColorSpace;
  textureBack.anisotropy = 8;

  const renderBackFace = () => {
    drawTechFrame(ctxBack, size, size, 'CLOUD-03', 'CLOUD & DEVOPS CORE');

    ctxBack.fillStyle = '#FFFFFF';
    ctxBack.font = 'bold 36px "Inter", sans-serif';
    ctxBack.textAlign = 'left';
    ctxBack.fillText('CLOUD & INFRASTRUCTURE', 76, 160);

    ctxBack.fillStyle = '#DFC067';
    ctxBack.font = 'bold 18px "JetBrains Mono", monospace';
    ctxBack.fillText('MULTI-REGION MESH · ZERO-DOWNTIME CI/CD', 76, 200);

    // Multi-Region Cluster Diagram
    const clusterX = 76;
    const clusterY = 240;
    const clusterW = size - 152;
    const clusterH = 340;

    ctxBack.fillStyle = 'rgba(18, 18, 24, 0.9)';
    ctxBack.strokeStyle = 'rgba(212, 175, 55, 0.3)';
    ctxBack.lineWidth = 1.5;
    ctxBack.beginPath();
    ctxBack.roundRect(clusterX, clusterY, clusterW, clusterH, 14);
    ctxBack.fill();
    ctxBack.stroke();

    // Node topology
    const nodes = [
      { name: 'US-EAST (Primary)', x: clusterX + 160, y: clusterY + 100, status: 'Active' },
      { name: 'EU-CENTRAL (Edge)', x: clusterX + clusterW - 160, y: clusterY + 100, status: 'Active' },
      { name: 'AP-SOUTH (Gateway)', x: clusterX + clusterW / 2, y: clusterY + 240, status: 'Active' },
    ];

    // Connecting golden telemetry lines
    ctxBack.strokeStyle = 'rgba(212, 175, 55, 0.5)';
    ctxBack.lineWidth = 2;
    ctxBack.beginPath();
    ctxBack.moveTo(nodes[0].x, nodes[0].y);
    ctxBack.lineTo(nodes[1].x, nodes[1].y);
    ctxBack.lineTo(nodes[2].x, nodes[2].y);
    ctxBack.closePath();
    ctxBack.stroke();

    // Draw nodes
    nodes.forEach((n) => {
      // Glow circle
      ctxBack.fillStyle = 'rgba(212, 175, 55, 0.2)';
      ctxBack.beginPath();
      ctxBack.arc(n.x, n.y, 36, 0, Math.PI * 2);
      ctxBack.fill();

      ctxBack.fillStyle = '#0F0F14';
      ctxBack.strokeStyle = '#D4AF37';
      ctxBack.lineWidth = 2.5;
      ctxBack.beginPath();
      ctxBack.arc(n.x, n.y, 22, 0, Math.PI * 2);
      ctxBack.fill();
      ctxBack.stroke();

      ctxBack.fillStyle = '#22C55E';
      ctxBack.beginPath();
      ctxBack.arc(n.x, n.y, 7, 0, Math.PI * 2);
      ctxBack.fill();

      ctxBack.fillStyle = '#FFFFFF';
      ctxBack.font = 'bold 15px "JetBrains Mono", monospace';
      ctxBack.textAlign = 'center';
      ctxBack.fillText(n.name, n.x, n.y + 48);
    });

    // Central Load Balancer node
    ctxBack.fillStyle = '#DFC067';
    ctxBack.font = 'bold 14px "JetBrains Mono", monospace';
    ctxBack.textAlign = 'center';
    ctxBack.fillText('DYNAMIC ANYCAST ROUTER', clusterX + clusterW / 2, clusterY + 160);

    // 3 Status metrics
    const backMetrics = [
      { label: 'SLA UPTIME', val: '99.99%', sub: 'High Availability' },
      { label: 'GLOBAL LATENCY', val: '18 ms', sub: 'P95 Anycast Route' },
      { label: 'DEPLOYMENTS', val: '0s DOWNTIME', sub: 'Blue-Green Sync' },
    ];

    const bBoxW = (size - 152 - 32) / 3;
    const bBoxH = 160;
    const bBoxY = 620;

    backMetrics.forEach((m, idx) => {
      const bx = 76 + idx * (bBoxW + 16);
      ctxBack.fillStyle = 'rgba(18, 18, 22, 0.85)';
      ctxBack.strokeStyle = 'rgba(212, 175, 55, 0.2)';
      ctxBack.lineWidth = 1.5;
      ctxBack.beginPath();
      ctxBack.roundRect(bx, bBoxY, bBoxW, bBoxH, 12);
      ctxBack.fill();
      ctxBack.stroke();

      ctxBack.fillStyle = '#71717A';
      ctxBack.font = 'bold 13px "JetBrains Mono", monospace';
      ctxBack.textAlign = 'left';
      ctxBack.fillText(m.label, bx + 20, bBoxY + 36);

      ctxBack.fillStyle = '#DFC067';
      ctxBack.font = 'bold 30px "Inter", sans-serif';
      ctxBack.fillText(m.val, bx + 20, bBoxY + 86);

      ctxBack.fillStyle = '#A1A1AA';
      ctxBack.font = '13px "Inter", sans-serif';
      ctxBack.fillText(m.sub, bx + 20, bBoxY + 124);
    });

    ctxBack.fillStyle = '#FFFFFF';
    ctxBack.font = '600 18px "Inter", sans-serif';
    ctxBack.textAlign = 'left';
    ctxBack.fillText('✦ Auto-scaling Kubernetes & Spring Boot Core Foundations', 76, 830);

    textureBack.needsUpdate = true;
  };
  renderBackFace();

  // --- 4. FACE -X: LEFT (DATABASE & HIGH-PERFORMANCE APIS) ---
  const canvasLeft = document.createElement('canvas');
  canvasLeft.width = size;
  canvasLeft.height = size;
  const ctxLeft = canvasLeft.getContext('2d')!;

  const textureLeft = new THREE.CanvasTexture(canvasLeft);
  textureLeft.colorSpace = THREE.SRGBColorSpace;
  textureLeft.anisotropy = 8;

  const renderLeftFace = () => {
    drawTechFrame(ctxLeft, size, size, 'DATA-04', 'DATABASE & API SYSTEMS');

    ctxLeft.fillStyle = '#FFFFFF';
    ctxLeft.font = 'bold 36px "Inter", sans-serif';
    ctxLeft.textAlign = 'left';
    ctxLeft.fillText('DATABASE & API SYSTEMS', 76, 160);

    ctxLeft.fillStyle = '#DFC067';
    ctxLeft.font = 'bold 18px "JetBrains Mono", monospace';
    ctxLeft.fillText('POSTGRESQL · REDIS · VECTOR EMBEDDINGS · GRAPHQL', 76, 200);

    // Database cluster visual plate
    const dbCardX = 76;
    const dbCardY = 240;
    const dbCardW = size - 152;
    const dbCardH = 340;

    ctxLeft.fillStyle = 'rgba(18, 18, 24, 0.9)';
    ctxLeft.strokeStyle = 'rgba(212, 175, 55, 0.3)';
    ctxLeft.lineWidth = 1.5;
    ctxLeft.beginPath();
    ctxLeft.roundRect(dbCardX, dbCardY, dbCardW, dbCardH, 14);
    ctxLeft.fill();
    ctxLeft.stroke();

    // Tiered Cylinder illustration on left side of card
    const cylX = dbCardX + 160;
    const cylY = dbCardY + 90;
    for (let i = 0; i < 3; i++) {
      const y = cylY + i * 55;
      // Disk base
      ctxLeft.fillStyle = '#1A1A22';
      ctxLeft.strokeStyle = '#D4AF37';
      ctxLeft.lineWidth = 2;
      ctxLeft.beginPath();
      ctxLeft.ellipse(cylX, y, 90, 25, 0, 0, Math.PI * 2);
      ctxLeft.fill();
      ctxLeft.stroke();

      // Cylinder body
      ctxLeft.fillStyle = '#14141A';
      ctxLeft.fillRect(cylX - 90, y, 180, 28);
      ctxLeft.strokeRect(cylX - 90, y, 180, 28);

      // Disk glow highlight
      ctxLeft.strokeStyle = '#DFC067';
      ctxLeft.lineWidth = 1.5;
      ctxLeft.beginPath();
      ctxLeft.ellipse(cylX, y + 28, 90, 25, 0, 0, Math.PI);
      ctxLeft.stroke();
    }

    // Right side of card: live API endpoints list
    const apiListX = dbCardX + 320;
    const endpoints = [
      { method: 'GET', path: '/api/v2/telemetry/stream', status: '200 OK', time: '1.2ms' },
      { method: 'POST', path: '/api/v2/auth/enterprise-jwt', status: '201 Created', time: '4.8ms' },
      { method: 'QUERY', path: '/graphql/catalog/nodes', status: 'Cached', time: '0.6ms' },
      { method: 'SYNC', path: '/ws/realtime/collaboration', status: 'Connected', time: '3.1ms' },
    ];

    endpoints.forEach((ep, idx) => {
      const ey = dbCardY + 65 + idx * 60;
      ctxLeft.fillStyle = 'rgba(255, 255, 255, 0.04)';
      ctxLeft.fillRect(apiListX, ey - 22, dbCardW - 350, 48);

      // Method pill
      ctxLeft.fillStyle = ep.method === 'GET' ? '#22C55E' : ep.method === 'POST' ? '#3B82F6' : '#D4AF37';
      ctxLeft.font = 'bold 13px "JetBrains Mono", monospace';
      ctxLeft.fillText(ep.method, apiListX + 16, ey + 7);

      ctxLeft.fillStyle = '#FFFFFF';
      ctxLeft.font = '14px "JetBrains Mono", monospace';
      ctxLeft.fillText(ep.path, apiListX + 80, ey + 7);

      ctxLeft.fillStyle = '#DFC067';
      ctxLeft.textAlign = 'right';
      ctxLeft.fillText(ep.time, dbCardX + dbCardW - 24, ey + 7);
      ctxLeft.textAlign = 'left';
    });

    // 3 Metrics
    const dbMetrics = [
      { label: 'THROUGHPUT', val: '240k req/s', sub: 'Non-blocking I/O' },
      { label: 'CACHE HIT RATIO', val: '99.4%', sub: 'Redis Distributed' },
      { label: 'QUERY LATENCY', val: '< 2.1 ms', sub: 'Indexed & Optimized' },
    ];

    const dbBoxW = (size - 152 - 32) / 3;
    const dbBoxH = 160;
    const dbBoxY = 620;

    dbMetrics.forEach((m, idx) => {
      const bx = 76 + idx * (dbBoxW + 16);
      ctxLeft.fillStyle = 'rgba(18, 18, 22, 0.85)';
      ctxLeft.strokeStyle = 'rgba(212, 175, 55, 0.2)';
      ctxLeft.lineWidth = 1.5;
      ctxLeft.beginPath();
      ctxLeft.roundRect(bx, dbBoxY, dbBoxW, dbBoxH, 12);
      ctxLeft.fill();
      ctxLeft.stroke();

      ctxLeft.fillStyle = '#71717A';
      ctxLeft.font = 'bold 13px "JetBrains Mono", monospace';
      ctxLeft.fillText(m.label, bx + 20, dbBoxY + 36);

      ctxLeft.fillStyle = '#DFC067';
      ctxLeft.font = 'bold 30px "Inter", sans-serif';
      ctxLeft.fillText(m.val, bx + 20, dbBoxY + 86);

      ctxLeft.fillStyle = '#A1A1AA';
      ctxLeft.font = '13px "Inter", sans-serif';
      ctxLeft.fillText(m.sub, bx + 20, dbBoxY + 124);
    });

    ctxLeft.fillStyle = '#FFFFFF';
    ctxLeft.font = '600 18px "Inter", sans-serif';
    ctxLeft.fillText('✦ Hardened ACID Reliability & Sub-Millisecond Cache Layers', 76, 830);

    textureLeft.needsUpdate = true;
  };
  renderLeftFace();

  // --- 5. FACE +Y: TOP (AI SYSTEMS & NEURAL ARCHITECTURE) ---
  const canvasTop = document.createElement('canvas');
  canvasTop.width = size;
  canvasTop.height = size;
  const ctxTop = canvasTop.getContext('2d')!;

  const textureTop = new THREE.CanvasTexture(canvasTop);
  textureTop.colorSpace = THREE.SRGBColorSpace;
  textureTop.anisotropy = 8;

  const renderTopFace = () => {
    drawTechFrame(ctxTop, size, size, 'AI-05', 'AI & NEURAL ARCHITECTURE');

    ctxTop.fillStyle = '#FFFFFF';
    ctxTop.font = 'bold 36px "Inter", sans-serif';
    ctxTop.textAlign = 'left';
    ctxTop.fillText('AI & INTELLIGENT SYSTEMS', 76, 160);

    ctxTop.fillStyle = '#DFC067';
    ctxTop.font = 'bold 18px "JetBrains Mono", monospace';
    ctxTop.fillText('VECTOR SEARCH · SEMANTIC EMBEDDINGS · REASONING PIPELINES', 76, 200);

    // Neural Lattice Plate
    const aiCardX = 76;
    const aiCardY = 240;
    const aiCardW = size - 152;
    const aiCardH = 340;

    ctxTop.fillStyle = 'rgba(18, 18, 24, 0.9)';
    ctxTop.strokeStyle = 'rgba(212, 175, 55, 0.3)';
    ctxTop.lineWidth = 1.5;
    ctxTop.beginPath();
    ctxTop.roundRect(aiCardX, aiCardY, aiCardW, aiCardH, 14);
    ctxTop.fill();
    ctxTop.stroke();

    // Neural Graph Nodes
    const neuralNodes = [
      { x: aiCardX + 160, y: aiCardY + 90, label: 'Input Vector' },
      { x: aiCardX + 160, y: aiCardY + 230, label: 'Context Tensor' },
      { x: aiCardX + aiCardW / 2, y: aiCardY + 160, label: 'VPD Neural Core' },
      { x: aiCardX + aiCardW - 160, y: aiCardY + 90, label: 'Inference Edge' },
      { x: aiCardX + aiCardW - 160, y: aiCardY + 230, label: 'Decision Action' },
    ];

    // Connect nodes
    ctxTop.strokeStyle = 'rgba(212, 175, 55, 0.4)';
    ctxTop.lineWidth = 2;
    for (let i = 0; i < neuralNodes.length; i++) {
      for (let j = i + 1; j < neuralNodes.length; j++) {
        ctxTop.beginPath();
        ctxTop.moveTo(neuralNodes[i].x, neuralNodes[i].y);
        ctxTop.lineTo(neuralNodes[j].x, neuralNodes[j].y);
        ctxTop.stroke();
      }
    }

    // Render nodes
    neuralNodes.forEach((n, idx) => {
      const isCenter = idx === 2;
      ctxTop.fillStyle = isCenter ? '#DFC067' : '#14141E';
      ctxTop.strokeStyle = '#D4AF37';
      ctxTop.lineWidth = isCenter ? 3 : 2;
      ctxTop.beginPath();
      ctxTop.arc(n.x, n.y, isCenter ? 30 : 20, 0, Math.PI * 2);
      ctxTop.fill();
      ctxTop.stroke();

      if (isCenter) {
        ctxTop.fillStyle = '#000000';
        ctxTop.font = 'bold 16px "Inter", sans-serif';
        ctxTop.textAlign = 'center';
        ctxTop.fillText('AI', n.x, n.y + 6);
      }

      ctxTop.fillStyle = '#FFFFFF';
      ctxTop.font = '13px "JetBrains Mono", monospace';
      ctxTop.textAlign = 'center';
      ctxTop.fillText(n.label, n.x, n.y + (isCenter ? 46 : 36));
    });

    // 3 Metrics
    const aiMetrics = [
      { label: 'INFERENCE SPEED', val: '42 ms', sub: 'Quantized LLM Engine' },
      { label: 'EMBEDDING DIMS', val: '1,536-D', sub: 'Semantic Clustering' },
      { label: 'TASK ACCURACY', val: '99.8%', sub: 'Deterministic Guardrails' },
    ];

    const aiBoxW = (size - 152 - 32) / 3;
    const aiBoxH = 160;
    const aiBoxY = 620;

    aiMetrics.forEach((m, idx) => {
      const bx = 76 + idx * (aiBoxW + 16);
      ctxTop.fillStyle = 'rgba(18, 18, 22, 0.85)';
      ctxTop.strokeStyle = 'rgba(212, 175, 55, 0.2)';
      ctxTop.lineWidth = 1.5;
      ctxTop.beginPath();
      ctxTop.roundRect(bx, aiBoxY, aiBoxW, aiBoxH, 12);
      ctxTop.fill();
      ctxTop.stroke();

      ctxTop.fillStyle = '#71717A';
      ctxTop.font = 'bold 13px "JetBrains Mono", monospace';
      ctxTop.textAlign = 'left';
      ctxTop.fillText(m.label, bx + 20, aiBoxY + 36);

      ctxTop.fillStyle = '#DFC067';
      ctxTop.font = 'bold 30px "Inter", sans-serif';
      ctxTop.fillText(m.val, bx + 20, aiBoxY + 86);

      ctxTop.fillStyle = '#A1A1AA';
      ctxTop.font = '13px "Inter", sans-serif';
      ctxTop.fillText(m.sub, bx + 20, aiBoxY + 124);
    });

    ctxTop.fillStyle = '#FFFFFF';
    ctxTop.font = '600 18px "Inter", sans-serif';
    ctxTop.textAlign = 'left';
    ctxTop.fillText('✦ Private Enterprise Fine-Tuning & Real-Time Agentic Orchestration', 76, 830);

    textureTop.needsUpdate = true;
  };
  renderTopFace();

  // --- 6. FACE -Y: BOTTOM (STARTUP LIFECYCLE & SCALE ENGINE) ---
  const canvasBottom = document.createElement('canvas');
  canvasBottom.width = size;
  canvasBottom.height = size;
  const ctxBottom = canvasBottom.getContext('2d')!;

  const textureBottom = new THREE.CanvasTexture(canvasBottom);
  textureBottom.colorSpace = THREE.SRGBColorSpace;
  textureBottom.anisotropy = 8;

  const renderBottomFace = () => {
    drawTechFrame(ctxBottom, size, size, 'SCALE-06', 'STARTUP LIFECYCLE & SCALE');

    ctxBottom.fillStyle = '#FFFFFF';
    ctxBottom.font = 'bold 36px "Inter", sans-serif';
    ctxBottom.textAlign = 'left';
    ctxBottom.fillText('STARTUP LIFECYCLE & SCALE', 76, 160);

    ctxBottom.fillStyle = '#DFC067';
    ctxBottom.font = 'bold 18px "JetBrains Mono", monospace';
    ctxBottom.fillText('FROM PROTOTYPE TO MARKET LEADERSHIP', 76, 200);

    // The Approved 16 Pillars Grid:
    // BUILD · TEST · DEPLOY · DESIGN · DEVELOP · LEARN · ITERATE · DATABASE ·
    // WEBSITE · APPLICATION · API · CLOUD · AUTOMATE · ANALYTICS · LAUNCH · SCALE
    const pillars = [
      'BUILD', 'TEST', 'DEPLOY', 'DESIGN',
      'DEVELOP', 'LEARN', 'ITERATE', 'DATABASE',
      'WEBSITE', 'APPLICATION', 'API', 'CLOUD',
      'AUTOMATE', 'ANALYTICS', 'LAUNCH', 'SCALE'
    ];

    const gridX = 76;
    const gridY = 240;
    const cols = 4;
    const rows = 4;
    const cellW = (size - 152 - (cols - 1) * 16) / cols;
    const cellH = 75;

    pillars.forEach((p, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      const cx = gridX + col * (cellW + 16);
      const cy = gridY + row * (cellH + 14);

      const isHighlight = ['BUILD', 'DEPLOY', 'LAUNCH', 'SCALE'].includes(p);

      ctxBottom.fillStyle = isHighlight ? 'rgba(212, 175, 55, 0.14)' : 'rgba(20, 20, 26, 0.85)';
      ctxBottom.strokeStyle = isHighlight ? '#D4AF37' : 'rgba(212, 175, 55, 0.2)';
      ctxBottom.lineWidth = 1.5;
      ctxBottom.beginPath();
      ctxBottom.roundRect(cx, cy, cellW, cellH, 8);
      ctxBottom.fill();
      ctxBottom.stroke();

      // Number kicker
      ctxBottom.fillStyle = isHighlight ? '#DFC067' : '#71717A';
      ctxBottom.font = 'bold 11px "JetBrains Mono", monospace';
      ctxBottom.textAlign = 'left';
      ctxBottom.fillText(String(idx + 1).padStart(2, '0'), cx + 14, cy + 24);

      // Pillar name
      ctxBottom.fillStyle = isHighlight ? '#FFFFFF' : '#A1A1AA';
      ctxBottom.font = 'bold 16px "Inter", sans-serif';
      ctxBottom.fillText(p, cx + 14, cy + 52);
    });

    // 3 Growth metrics below
    const scaleMetrics = [
      { label: 'TIME TO MARKET', val: '4x FASTER', sub: 'Pre-architected Core' },
      { label: 'SYSTEM RELIABILITY', val: 'ENTERPRISE', sub: 'Direct Senior Oversight' },
      { label: 'LONG-TERM VALUE', val: 'ZERO REWRITES', sub: 'Scalable Foundations' },
    ];

    const sBoxW = (size - 152 - 32) / 3;
    const sBoxH = 160;
    const sBoxY = 620;

    scaleMetrics.forEach((m, idx) => {
      const bx = 76 + idx * (sBoxW + 16);
      ctxBottom.fillStyle = 'rgba(18, 18, 22, 0.85)';
      ctxBottom.strokeStyle = 'rgba(212, 175, 55, 0.2)';
      ctxBottom.lineWidth = 1.5;
      ctxBottom.beginPath();
      ctxBottom.roundRect(bx, sBoxY, sBoxW, sBoxH, 12);
      ctxBottom.fill();
      ctxBottom.stroke();

      ctxBottom.fillStyle = '#71717A';
      ctxBottom.font = 'bold 13px "JetBrains Mono", monospace';
      ctxBottom.textAlign = 'left';
      ctxBottom.fillText(m.label, bx + 20, sBoxY + 36);

      ctxBottom.fillStyle = '#DFC067';
      ctxBottom.font = 'bold 28px "Inter", sans-serif';
      ctxBottom.fillText(m.val, bx + 20, sBoxY + 86);

      ctxBottom.fillStyle = '#A1A1AA';
      ctxBottom.font = '13px "Inter", sans-serif';
      ctxBottom.fillText(m.sub, bx + 20, sBoxY + 124);
    });

    ctxBottom.fillStyle = '#FFFFFF';
    ctxBottom.font = '600 18px "Inter", sans-serif';
    ctxBottom.textAlign = 'left';
    ctxBottom.fillText('✦ Accelerating Founders from Concept to Multi-Million Valuation', 76, 830);

    textureBottom.needsUpdate = true;
  };
  renderBottomFace();

  return {
    front: textureFront,
    right: textureRight,
    back: textureBack,
    left: textureLeft,
    top: textureTop,
    bottom: textureBottom,
    updateAll: () => {
      renderFrontFace();
      renderRightFace();
      renderBackFace();
      renderLeftFace();
      renderTopFace();
      renderBottomFace();
    },
    disposeAll: () => {
      textureFront.dispose();
      textureRight.dispose();
      textureBack.dispose();
      textureLeft.dispose();
      textureTop.dispose();
      textureBottom.dispose();
    },
  };
}
