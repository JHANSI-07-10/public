import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createDashboardTexture, createApiConsoleTexture, createDatabaseCapTexture } from './textures';
import { SceneFallback } from './SceneFallback';

interface SoftwareArchitectureSceneProps {
  className?: string;
}

export const SoftwareArchitectureScene: React.FC<SoftwareArchitectureSceneProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGl, setHasWebGl] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGl(false);
        return;
      }
    } catch {
      setHasWebGl(false);
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.05);

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 540;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.8, 7.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Root Assembly Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // --- Lights ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);

    const goldRimLight = new THREE.DirectionalLight(0xc9a84c, 3.5);
    goldRimLight.position.set(-6, -2, 3);
    scene.add(goldRimLight);

    const dbPointLight = new THREE.PointLight(0xe5c068, 3.0, 8);
    dbPointLight.position.set(1.8, -0.8, 0.8);
    scene.add(dbPointLight);

    const cloudPointLight = new THREE.PointLight(0x60a5fa, 2.0, 8);
    cloudPointLight.position.set(0.2, 0.2, -0.2);
    scene.add(cloudPointLight);

    // Resource tracking for clean disposal
    const disposables: { dispose: () => void }[] = [];
    const track = <T extends { dispose: () => void }>(item: T): T => {
      disposables.push(item);
      return item;
    };

    // Shared Materials
    const goldGlowMaterial = track(
      new THREE.MeshStandardMaterial({
        color: 0xc9a84c,
        emissive: 0xc9a84c,
        emissiveIntensity: 0.8,
        roughness: 0.2,
        metalness: 0.8,
      })
    );

    const darkMetalMaterial = track(
      new THREE.MeshStandardMaterial({
        color: 0x181818,
        roughness: 0.35,
        metalness: 0.85,
      })
    );

    const glassEdgeMaterial = track(
      new THREE.MeshStandardMaterial({
        color: 0x2e2e2e,
        roughness: 0.2,
        metalness: 0.6,
      })
    );

    // ==========================================
    // 1. APPLICATION INTERFACE PANELS
    // ==========================================
    const panels: { mesh: THREE.Group; basePos: THREE.Vector3; speed: number; phase: number }[] = [];

    // Panel 1: Primary React Client Dashboard
    const panel1Group = new THREE.Group();
    const p1Width = 3.2;
    const p1Height = 2.0;

    const p1Texture = track(createDashboardTexture());
    const p1FaceMaterial = track(
      new THREE.MeshBasicMaterial({
        map: p1Texture,
        transparent: true,
        opacity: 0.95,
      })
    );
    const p1BackMaterial = track(
      new THREE.MeshStandardMaterial({
        color: 0x141414,
        roughness: 0.3,
        metalness: 0.7,
      })
    );
    const p1BorderMaterial = track(
      new THREE.MeshStandardMaterial({
        color: 0xc9a84c,
        emissive: 0xc9a84c,
        emissiveIntensity: 0.3,
        roughness: 0.4,
      })
    );

    const p1Materials = [
      glassEdgeMaterial, // Right
      glassEdgeMaterial, // Left
      glassEdgeMaterial, // Top
      glassEdgeMaterial, // Bottom
      p1FaceMaterial,    // Front
      p1BackMaterial,    // Back
    ];

    const p1Geo = track(new THREE.BoxGeometry(p1Width, p1Height, 0.05));
    const p1Mesh = new THREE.Mesh(p1Geo, p1Materials);
    panel1Group.add(p1Mesh);

    // Subtle hairline gold border around Panel 1
    const p1BorderGeo = track(new THREE.EdgesGeometry(p1Geo));
    const p1Line = new THREE.LineSegments(
      p1BorderGeo,
      track(new THREE.LineBasicMaterial({ color: 0xc9a84c, transparent: true, opacity: 0.5 }))
    );
    panel1Group.add(p1Line);

    const p1BasePos = new THREE.Vector3(-1.2, 0.75, 0.6);
    panel1Group.position.copy(p1BasePos);
    panel1Group.rotation.set(0.1, 0.22, -0.04);
    rootGroup.add(panel1Group);
    panels.push({ mesh: panel1Group, basePos: p1BasePos, speed: 1.1, phase: 0 });

    // Panel 2: Real-time API & Microservice Terminal Console
    const panel2Group = new THREE.Group();
    const p2Width = 2.4;
    const p2Height = 1.8;

    const p2Texture = track(createApiConsoleTexture());
    const p2FaceMaterial = track(
      new THREE.MeshBasicMaterial({
        map: p2Texture,
        transparent: true,
        opacity: 0.92,
      })
    );
    const p2Materials = [
      glassEdgeMaterial,
      glassEdgeMaterial,
      glassEdgeMaterial,
      glassEdgeMaterial,
      p2FaceMaterial,
      p1BackMaterial,
    ];

    const p2Geo = track(new THREE.BoxGeometry(p2Width, p2Height, 0.04));
    const p2Mesh = new THREE.Mesh(p2Geo, p2Materials);
    panel2Group.add(p2Mesh);

    const p2BasePos = new THREE.Vector3(1.6, 1.35, -0.6);
    panel2Group.position.copy(p2BasePos);
    panel2Group.rotation.set(-0.08, -0.28, 0.05);
    rootGroup.add(panel2Group);
    panels.push({ mesh: panel2Group, basePos: p2BasePos, speed: 0.9, phase: 1.8 });

    // ==========================================
    // 2. DATABASE CLUSTER (Tiered Cylinders with Gold Rings)
    // ==========================================
    const dbGroup = new THREE.Group();
    const dbBasePos = new THREE.Vector3(1.7, -1.0, 0.8);
    dbGroup.position.copy(dbBasePos);

    const diskRadius = 0.8;
    const diskHeight = 0.26;
    const diskGap = 0.12;
    const diskGeo = track(new THREE.CylinderGeometry(diskRadius, diskRadius, diskHeight, 32));
    const glowRingGeo = track(new THREE.TorusGeometry(diskRadius + 0.03, 0.03, 16, 48));
    const dbCapTexture = track(createDatabaseCapTexture());
    const dbCapMaterial = track(
      new THREE.MeshStandardMaterial({
        map: dbCapTexture,
        roughness: 0.3,
        metalness: 0.8,
      })
    );

    // 3 Stacked database tiers
    for (let i = 0; i < 3; i++) {
      const yOffset = (i - 1) * (diskHeight + diskGap);

      // Main disk cylinder
      const materials = [
        darkMetalMaterial, // Side
        i === 2 ? dbCapMaterial : darkMetalMaterial, // Top
        darkMetalMaterial, // Bottom
      ];
      const disk = new THREE.Mesh(diskGeo, materials);
      disk.position.y = yOffset;
      dbGroup.add(disk);

      // Gold luminous accent ring between disks
      const ring = new THREE.Mesh(glowRingGeo, goldGlowMaterial);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = yOffset + diskHeight / 2 + 0.02;
      dbGroup.add(ring);
    }

    // Outer wireframe boundary for high-tech look
    const dbWireGeo = track(new THREE.CylinderGeometry(diskRadius + 0.06, diskRadius + 0.06, 1.15, 8, 1, true));
    const dbWireframe = new THREE.LineSegments(
      track(new THREE.WireframeGeometry(dbWireGeo)),
      track(new THREE.LineBasicMaterial({ color: 0xc9a84c, transparent: true, opacity: 0.25 }))
    );
    dbGroup.add(dbWireframe);

    rootGroup.add(dbGroup);

    // Secondary Event Broker Node (Redis/Kafka)
    const cacheGroup = new THREE.Group();
    const cacheBasePos = new THREE.Vector3(2.6, 0.1, -1.2);
    cacheGroup.position.copy(cacheBasePos);

    const cacheDiskGeo = track(new THREE.CylinderGeometry(0.48, 0.48, 0.22, 24));
    for (let i = 0; i < 2; i++) {
      const cDisk = new THREE.Mesh(cacheDiskGeo, darkMetalMaterial);
      cDisk.position.y = (i - 0.5) * 0.32;
      cacheGroup.add(cDisk);

      const cRing = new THREE.Mesh(
        track(new THREE.TorusGeometry(0.5, 0.02, 12, 32)),
        goldGlowMaterial
      );
      cRing.rotation.x = Math.PI / 2;
      cRing.position.y = (i - 0.5) * 0.32;
      cacheGroup.add(cRing);
    }
    rootGroup.add(cacheGroup);

    // ==========================================
    // 3. CENTRAL CLUSTER / CLOUD INFRASTRUCTURE CORE
    // ==========================================
    const cloudCoreGroup = new THREE.Group();
    const cloudBasePos = new THREE.Vector3(0.15, -0.15, -0.2);
    cloudCoreGroup.position.copy(cloudBasePos);

    // Inner glowing octahedral server core
    const coreGeo = track(new THREE.OctahedronGeometry(0.65, 0));
    const coreMesh = new THREE.Mesh(coreGeo, goldGlowMaterial);
    cloudCoreGroup.add(coreMesh);

    // Outer wireframe crystal
    const outerCoreGeo = track(new THREE.IcosahedronGeometry(0.9, 0));
    const outerWireframe = new THREE.LineSegments(
      track(new THREE.WireframeGeometry(outerCoreGeo)),
      track(new THREE.LineBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.45 }))
    );
    cloudCoreGroup.add(outerWireframe);

    // Orbital gimbal rings (Representing distributed consensus / service mesh)
    const orbitRing1 = new THREE.Mesh(
      track(new THREE.TorusGeometry(1.2, 0.02, 16, 64)),
      goldGlowMaterial
    );
    cloudCoreGroup.add(orbitRing1);

    const orbitRing2 = new THREE.Mesh(
      track(new THREE.TorusGeometry(1.35, 0.02, 16, 64)),
      track(new THREE.MeshStandardMaterial({ color: 0x60a5fa, emissive: 0x60a5fa, emissiveIntensity: 0.6 }))
    );
    orbitRing2.rotation.x = Math.PI / 3;
    cloudCoreGroup.add(orbitRing2);

    rootGroup.add(cloudCoreGroup);

    // ==========================================
    // 4. MICROSERVICE MODULES (Floating Geometric Components)
    // ==========================================
    const modules: { mesh: THREE.Mesh; basePos: THREE.Vector3; speed: number; phase: number }[] = [];
    const modulePositions = [
      new THREE.Vector3(-2.1, -0.9, 0.4),
      new THREE.Vector3(-0.6, 1.9, -0.8),
      new THREE.Vector3(-2.4, 0.3, -1.0),
      new THREE.Vector3(0.9, -1.7, 0.2),
    ];

    const moduleCubeGeo = track(new THREE.BoxGeometry(0.42, 0.42, 0.42));
    const moduleEdgeGeo = track(new THREE.EdgesGeometry(moduleCubeGeo));

    modulePositions.forEach((pos, idx) => {
      const cubeMesh = new THREE.Mesh(moduleCubeGeo, darkMetalMaterial);
      cubeMesh.position.copy(pos);

      // Gold highlight edge
      const edgeLines = new THREE.LineSegments(
        moduleEdgeGeo,
        track(new THREE.LineBasicMaterial({ color: 0xc9a84c, transparent: true, opacity: 0.7 }))
      );
      cubeMesh.add(edgeLines);

      // Glowing center node
      const centerDot = new THREE.Mesh(
        track(new THREE.SphereGeometry(0.08, 12, 12)),
        goldGlowMaterial
      );
      cubeMesh.add(centerDot);

      rootGroup.add(cubeMesh);
      modules.push({ mesh: cubeMesh, basePos: pos, speed: 1.2 + idx * 0.2, phase: idx * 1.5 });
    });

    // ==========================================
    // 5. API CONNECTION LINES & FLOWING DATA PARTICLES
    // ==========================================
    interface ConnectionPath {
      curve: THREE.CatmullRomCurve3;
      particles: THREE.Mesh[];
    }

    const connectionConfigs: [THREE.Vector3, THREE.Vector3, THREE.Vector3][] = [
      // Panel 1 -> Central Cloud Core
      [new THREE.Vector3(-0.1, 0.75, 0.6), new THREE.Vector3(0.0, 0.4, 0.2), cloudBasePos],
      // Panel 2 -> Central Cloud Core
      [new THREE.Vector3(1.0, 1.2, -0.5), new THREE.Vector3(0.7, 0.5, -0.3), cloudBasePos],
      // Central Cloud Core -> Database Cluster
      [cloudBasePos, new THREE.Vector3(1.0, -0.5, 0.4), new THREE.Vector3(1.5, -0.6, 0.8)],
      // Central Cloud Core -> Secondary Cache
      [cloudBasePos, new THREE.Vector3(1.5, 0.0, -0.8), cacheBasePos],
      // Microservice 1 -> Panel 1
      [modulePositions[0], new THREE.Vector3(-1.6, -0.1, 0.5), new THREE.Vector3(-1.2, 0.3, 0.6)],
      // Database Cluster -> Secondary Cache
      [new THREE.Vector3(1.7, -0.6, 0.8), new THREE.Vector3(2.2, -0.3, -0.2), cacheBasePos],
    ];

    const connections: ConnectionPath[] = [];
    const particleGeo = track(new THREE.SphereGeometry(0.05, 12, 12));
    const particleMaterial = track(
      new THREE.MeshBasicMaterial({ color: 0xffe28a })
    );

    connectionConfigs.forEach(([p1, pMid, p2]) => {
      const curve = new THREE.CatmullRomCurve3([p1, pMid, p2]);
      const tubeGeo = track(new THREE.TubeGeometry(curve, 32, 0.015, 8, false));
      const tubeMat = track(
        new THREE.MeshStandardMaterial({
          color: 0xc9a84c,
          emissive: 0xc9a84c,
          emissiveIntensity: 0.6,
          transparent: true,
          opacity: 0.75,
        })
      );
      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      rootGroup.add(tubeMesh);

      // Data particles per connection line
      const pathParticles: THREE.Mesh[] = [];
      const particleCount = 2;
      for (let pIdx = 0; pIdx < particleCount; pIdx++) {
        const particle = new THREE.Mesh(particleGeo, particleMaterial);
        rootGroup.add(particle);
        pathParticles.push(particle);
      }

      connections.push({ curve, particles: pathParticles });
    });

    // Connection Junction Dots
    const junctionGeo = track(new THREE.SphereGeometry(0.08, 16, 16));
    [cloudBasePos, dbBasePos, cacheBasePos, ...modulePositions].forEach((pos) => {
      const junction = new THREE.Mesh(junctionGeo, goldGlowMaterial);
      junction.position.copy(pos);
      rootGroup.add(junction);
    });

    // ==========================================
    // 6. POINTER INTERACTION & PARALLAX TRACKING
    // ==========================================
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = Math.max(-1, Math.min(1, x));
      targetMouseY = Math.max(-1, Math.min(1, y));
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 600;
      const h = container.clientHeight || 540;
      camera.aspect = w / h;

      // Adjust scale dynamically on narrow devices
      if (w < 500) {
        rootGroup.scale.set(0.72, 0.72, 0.72);
        camera.position.z = 7.8;
      } else if (w < 800) {
        rootGroup.scale.set(0.85, 0.85, 0.85);
        camera.position.z = 7.4;
      } else {
        rootGroup.scale.set(1.0, 1.0, 1.0);
        camera.position.z = 7.2;
      }

      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };

    let resizeRafId: number | null = null;
    const debouncedResize = () => {
      if (resizeRafId !== null) {
        cancelAnimationFrame(resizeRafId);
      }
      resizeRafId = requestAnimationFrame(() => {
        handleResize();
      });
    };

    const resizeObserver = new ResizeObserver(() => {
      debouncedResize();
    });
    resizeObserver.observe(container);
    debouncedResize();

    // Pause rendering when tab is hidden
    let isTabVisible = !document.hidden;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Initial Stagger Entrance
    let entranceProgress = prefersReducedMotion ? 1 : 0;

    // ==========================================
    // 7. ANIMATION LOOP
    // ==========================================
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isTabVisible) return;

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Entrance ease-in glide
      if (entranceProgress < 1) {
        entranceProgress += delta * 1.5;
        if (entranceProgress > 1) entranceProgress = 1;
        const scaleVal = 0.85 + 0.15 * entranceProgress;
        rootGroup.scale.multiplyScalar(scaleVal / rootGroup.scale.x);
      }

      if (!prefersReducedMotion) {
        // Continuous gentle rotation of composition
        rootGroup.rotation.y = Math.sin(elapsedTime * 0.25) * 0.08;
        rootGroup.rotation.x = Math.cos(elapsedTime * 0.2) * 0.04;

        // Floating Application Panels
        panels.forEach(({ mesh, basePos, speed, phase }) => {
          mesh.position.y = basePos.y + Math.sin(elapsedTime * speed + phase) * 0.08;
          mesh.rotation.z = Math.sin(elapsedTime * (speed * 0.5) + phase) * 0.02;
        });

        // Database rotation around vertical axis
        dbGroup.rotation.y += 0.008;
        cacheGroup.rotation.y -= 0.012;

        // Cloud Core orbital animation
        cloudCoreGroup.rotation.y += 0.015;
        coreMesh.rotation.x += 0.01;
        coreMesh.rotation.z += 0.008;
        orbitRing1.rotation.z -= 0.018;
        orbitRing2.rotation.y += 0.014;

        // Microservice cubes floating & subtle spin
        modules.forEach(({ mesh, basePos, speed, phase }) => {
          mesh.position.y = basePos.y + Math.sin(elapsedTime * speed + phase) * 0.06;
          mesh.rotation.x += 0.008;
          mesh.rotation.y += 0.01;
        });

        // Moving Data Particles along API Connection Curves
        connections.forEach(({ curve, particles }, cIdx) => {
          particles.forEach((p, pIdx) => {
            const speed = 0.28;
            const t = (elapsedTime * speed + (pIdx / particles.length) + (cIdx * 0.15)) % 1;
            const pos = curve.getPoint(t);
            p.position.copy(pos);

            // Pulse particle scale slightly
            const pScale = 0.8 + 0.4 * Math.sin(t * Math.PI);
            p.scale.set(pScale, pScale, pScale);
          });
        });
      }

      // Smooth pointer parallax lerping
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      camera.position.x = currentMouseX * 0.8;
      camera.position.y = 0.8 + currentMouseY * 0.6;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    // ==========================================
    // 8. TEARDOWN & DISPOSAL
    // ==========================================
    return () => {
      if (resizeRafId !== null) {
        cancelAnimationFrame(resizeRafId);
      }
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      resizeObserver.disconnect();

      disposables.forEach((item) => {
        try {
          item.dispose();
        } catch {
          // Ignore
        }
      });

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  if (!hasWebGl) {
    return <SceneFallback />;
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[460px] sm:h-[520px] lg:h-[580px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none ${className}`}
      style={{ touchAction: 'pan-y' }}
      aria-label="Interactive 3D Software Architecture Visualization"
      role="img"
    >
      {/* Subtle background ambient radial bloom */}
      <div className="absolute inset-0 bg-radial-gradient from-[#c9a84c]/10 via-transparent to-transparent pointer-events-none" />

      {/* Floating status pill for authentic enterprise polish */}
      <div className="absolute bottom-4 right-4 z-10 hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141414]/90 backdrop-blur-md border border-[#262626] text-[11px] font-mono text-[#aaaaaa] pointer-events-none shadow-xl">
        <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
        <span>Live WebGL Architecture Runtime</span>
      </div>

      {!isLoaded && <SceneFallback />}
    </div>
  );
};
