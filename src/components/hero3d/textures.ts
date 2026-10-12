import * as THREE from 'three';

/**
 * Generates crisp, procedural canvas textures for the 3D application panels.
 * Zero external image dependencies, ultra-fast generation, high sharpness.
 */

export function createDashboardTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext('2d')!;

  // Background - Dark metallic obsidian
  ctx.fillStyle = '#121212';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Top Title Bar
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, 0, canvas.width, 68);

  // Window control dots
  const drawDot = (x: number, y: number, color: string) => {
    ctx.beginPath();
    ctx.arc(x, y, 7, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  };
  drawDot(36, 34, '#ef4444');
  drawDot(60, 34, '#f59e0b');
  drawDot(84, 34, '#22c55e');

  // Address Bar
  ctx.fillStyle = '#242424';
  ctx.beginPath();
  ctx.roundRect(120, 18, 520, 32, 6);
  ctx.fill();

  ctx.fillStyle = '#888888';
  ctx.font = '500 15px monospace';
  ctx.fillText('https://core.vpdtechnologies.com/cluster-active', 135, 40);

  // Gold Live Status Badge
  ctx.fillStyle = 'rgba(201, 168, 76, 0.15)';
  ctx.strokeStyle = 'rgba(201, 168, 76, 0.4)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(860, 18, 130, 32, 6);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#c9a84c';
  ctx.font = 'bold 13px sans-serif';
  ctx.fillText('• 99.9% UPTIME', 878, 39);

  // Inner Dashboard Content
  // Metric Card 1
  ctx.fillStyle = '#181818';
  ctx.strokeStyle = '#282828';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(36, 96, 280, 140, 12);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#777777';
  ctx.font = '13px sans-serif';
  ctx.fillText('TOTAL TRANSACTIONS / SEC', 56, 126);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px sans-serif';
  ctx.fillText('12,480', 56, 175);
  ctx.fillStyle = '#22c55e';
  ctx.font = 'bold 14px sans-serif';
  ctx.fillText('+34.2% Peak Velocity', 56, 210);

  // Metric Card 2
  ctx.fillStyle = '#181818';
  ctx.beginPath();
  ctx.roundRect(340, 96, 300, 140, 12);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#777777';
  ctx.font = '13px sans-serif';
  ctx.fillText('SYNC LATENCY (P99)', 360, 126);
  ctx.fillStyle = '#c9a84c';
  ctx.font = 'bold 36px monospace';
  ctx.fillText('38.4 ms', 360, 175);
  ctx.fillStyle = '#aaaaaa';
  ctx.font = '13px sans-serif';
  ctx.fillText('Edge Runtime Active', 360, 210);

  // Metric Card 3
  ctx.fillStyle = '#181818';
  ctx.beginPath();
  ctx.roundRect(664, 96, 324, 140, 12);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#777777';
  ctx.font = '13px sans-serif';
  ctx.fillText('MICROSERVICES STATUS', 684, 126);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px sans-serif';
  ctx.fillText('32 / 32 OK', 684, 175);
  ctx.fillStyle = '#22c55e';
  ctx.font = 'bold 14px sans-serif';
  ctx.fillText('Zero Fault Invariants', 684, 210);

  // Main Bar Chart Area
  ctx.fillStyle = '#161616';
  ctx.beginPath();
  ctx.roundRect(36, 260, 952, 340, 14);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('Live Event Streaming Throughput (MB/s)', 60, 300);

  // Graph Grid Lines
  ctx.strokeStyle = '#222222';
  for (let y = 340; y <= 540; y += 50) {
    ctx.beginPath();
    ctx.moveTo(60, y);
    ctx.lineTo(950, y);
    ctx.stroke();
  }

  // Draw Gold Wave Line
  ctx.beginPath();
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = '#c9a84c';
  const points = [
    [60, 500], [140, 480], [220, 420], [300, 440],
    [380, 390], [460, 410], [540, 350], [620, 370],
    [700, 330], [780, 340], [860, 310], [940, 320]
  ];
  ctx.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i][0], points[i][1]);
  }
  ctx.stroke();

  // Shaded area under curve
  ctx.lineTo(940, 540);
  ctx.lineTo(60, 540);
  ctx.closePath();
  ctx.fillStyle = 'rgba(201, 168, 76, 0.08)';
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

export function createApiConsoleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 480;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#0f0f0f';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Header bar
  ctx.fillStyle = '#181818';
  ctx.fillRect(0, 0, canvas.width, 50);

  // Dots
  const drawDot = (x: number, y: number, color: string) => {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  };
  drawDot(25, 25, '#ef4444');
  drawDot(42, 25, '#f59e0b');
  drawDot(59, 25, '#22c55e');

  ctx.fillStyle = '#aaaaaa';
  ctx.font = 'bold 12px monospace';
  ctx.fillText('API Gateway · WebSockets Runtime', 85, 30);

  // Code / Log stream
  ctx.font = '13px monospace';
  const lines = [
    { text: '→ POST /api/v2/auth/handshake [TLS 1.3]', color: '#c9a84c' },
    { text: '  ✓ Response: 200 OK (3.2ms)', color: '#22c55e' },
    { text: '→ WS /stream/events [Connected 10,000 clients]', color: '#60a5fa' },
    { text: '  ✓ Frame rate: 60 fps state sync', color: '#aaaaaa' },
    { text: '→ DB POOL: HikariCP 48 connections idle: 4', color: '#e5c068' },
    { text: '  ✓ Read Replica: synched (lag: 0ms)', color: '#22c55e' },
    { text: '→ SPRING BOOT 3.4.1 [JDK 21 - GraalVM Native]', color: '#f59e0b' },
    { text: '  ✓ Memory RSS: 142 MB · Thread Virtual: OK', color: '#aaaaaa' },
    { text: '→ REDIS CLUSTER: cache hit ratio 98.4%', color: '#22c55e' },
    { text: '→ SYSTEM HEALTH: 100% NOMINAL', color: '#c9a84c' },
  ];

  let y = 90;
  for (const line of lines) {
    ctx.fillStyle = line.color;
    ctx.fillText(line.text, 25, y);
    y += 34;
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

export function createDatabaseCapTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#1c1c1c';
  ctx.fillRect(0, 0, 256, 256);

  // Circular rings
  ctx.strokeStyle = '#c9a84c';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(128, 128, 100, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(201, 168, 76, 0.4)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(128, 128, 70, 0, Math.PI * 2);
  ctx.stroke();

  // Core icon
  ctx.fillStyle = '#c9a84c';
  ctx.font = 'bold 24px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('SQL', 128, 128);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}
