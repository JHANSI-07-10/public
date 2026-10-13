'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from 'motion/react';
import { Play, Pause, RotateCcw, Compass, Layers, ShieldCheck, Zap } from 'lucide-react';
import { createCubeTextures, CubeTexturesSet } from './hero3d/cubeTextures';
import { SceneFallback } from './hero3d/SceneFallback';

interface TechnologyCubeProps {
  className?: string;
  onOpenConsultation?: () => void;
}

// Face metadata definitions for interactive HUD
export interface FaceMeta {
  id: 'front' | 'right' | 'back' | 'left' | 'top' | 'bottom';
  code: string;
  title: string;
  shortLabel: string;
  badge: string;
  description: string;
  rotX: number;
  rotY: number;
}

const CUBE_FACES: FaceMeta[] = [
  {
    id: 'front',
    code: 'CORE-01',
    title: 'VPD Brand & Digital Core',
    shortLabel: 'Brand Core',
    badge: 'Official Identity',
    description: 'Mission-critical enterprise software architecture and digital core engineering.',
    rotX: 0,
    rotY: 0,
  },
  {
    id: 'right',
    code: 'APP-02',
    title: 'Web & Application Engineering',
    shortLabel: 'Web & Apps',
    badge: 'React 19 · Vite · Edge',
    description: 'High-performance interactive dashboards, micro-frontends, and conversion-focused web apps.',
    rotX: 0,
    rotY: -Math.PI / 2,
  },
  {
    id: 'back',
    code: 'CLOUD-03',
    title: 'Cloud & Infrastructure DevOps',
    shortLabel: 'Cloud & DevOps',
    badge: '99.99% Multi-Region Mesh',
    description: 'Zero-downtime Kubernetes orchestration, Anycast load balancing, and automated pipelines.',
    rotX: 0,
    rotY: Math.PI,
  },
  {
    id: 'left',
    code: 'DATA-04',
    title: 'Database Clusters & API Systems',
    shortLabel: 'Database & APIs',
    badge: 'Sub-Millisecond P99',
    description: 'Distributed persistence, Redis edge cache, ACID compliance, and resilient REST/GraphQL nodes.',
    rotX: 0,
    rotY: Math.PI / 2,
  },
  {
    id: 'top',
    code: 'AI-05',
    title: 'AI Systems & Neural Architecture',
    shortLabel: 'AI & Neural',
    badge: 'Vector Embeddings',
    description: 'Private LLM fine-tuning, automated decision workflows, and deterministic guardrails.',
    rotX: Math.PI / 2,
    rotY: 0,
  },
  {
    id: 'bottom',
    code: 'SCALE-06',
    title: 'Startup Lifecycle & Scale Engine',
    shortLabel: 'Startup Scale',
    badge: '16 Engineering Pillars',
    description: 'From rapid prototyping to scalable enterprise scale: Build, Test, Deploy, Launch, and Scale.',
    rotX: -Math.PI / 2,
    rotY: 0,
  },
];

export const TechnologyCube: React.FC<TechnologyCubeProps> = ({
  className = '',
  onOpenConsultation,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [hasWebGl, setHasWebGl] = useState(true);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [activeFaceIndex, setActiveFaceIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const prefersReducedMotion = useReducedMotion();

  // Three.js scene refs
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    cubeGroup: THREE.Group;
    targetRotation: { x: number; y: number };
    currentRotation: { x: number; y: number };
    velocity: { x: number; y: number };
    mouseOffset: { x: number; y: number };
    isDragging: boolean;
    isSnapping: boolean;
    snapProgress: number;
    snapStartRotation: { x: number; y: number };
    snapTargetRotation: { x: number; y: number };
    texturesSet: CubeTexturesSet | null;
    disposables: { dispose: () => void }[];
    animId: number | null;
  } | null>(null);

  // Initialize Three.js 3D Scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Verify WebGL support
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

    const width = container.clientWidth || 540;
    const height = container.clientHeight || 520;

    // --- Scene & Camera ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.04);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.8);

    // --- High-Performance WebGL Renderer ---
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current || undefined,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    if (!canvasRef.current) {
      container.appendChild(renderer.domElement);
    }

    const disposables: { dispose: () => void }[] = [];
    const track = <T extends { dispose: () => void }>(item: T): T => {
      disposables.push(item);
      return item;
    };

    // Root Group for 3D Cube & its accessories
    const rootAssembly = new THREE.Group();
    scene.add(rootAssembly);

    const cubeGroup = new THREE.Group();
    // Default pleasant isometric tilt on start: slight tilt down to reveal top & front face
    cubeGroup.rotation.set(0.18, -0.32, 0);
    rootAssembly.add(cubeGroup);

    // --- Studio Lighting with Rich Gold Tonalities ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.15);
    scene.add(ambientLight);

    // Key Directional Light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(5.5, 7.5, 6.0);
    scene.add(keyLight);

    // Gold Rim Backlight
    const goldRimLight = new THREE.DirectionalLight(0xd4af37, 4.2);
    goldRimLight.position.set(-6.0, -3.5, -4.5);
    scene.add(goldRimLight);

    // Secondary Warm Gold Fill
    const goldFillLight = new THREE.DirectionalLight(0xdfc067, 1.8);
    goldFillLight.position.set(4.0, -5.0, 3.0);
    scene.add(goldFillLight);

    // Dynamic point light that follows cursor for metallic glint
    const interactivePointLight = new THREE.PointLight(0xdfc067, 2.2, 12);
    interactivePointLight.position.set(0, 0, 5);
    scene.add(interactivePointLight);

    // --- Generate 6 High-Definition Face Textures ---
    const texturesSet = createCubeTextures(() => {
      setIsLoaded(true);
    });

    // Three.js BoxGeometry material order: [+X, -X, +Y, -Y, +Z, -Z]
    // 0: Right  (+X: Web & App)
    // 1: Left   (-X: Database & APIs)
    // 2: Top    (+Y: AI Systems)
    // 3: Bottom (-Y: Startup Scale)
    // 4: Front  (+Z: VPD Brand Core)
    // 5: Back   (-Z: Cloud & DevOps)
    const faceMaterials = [
      track(
        new THREE.MeshStandardMaterial({
          map: texturesSet.right,
          roughness: 0.28,
          metalness: 0.72,
          emissive: new THREE.Color(0x18140a),
          emissiveIntensity: 0.4,
        })
      ),
      track(
        new THREE.MeshStandardMaterial({
          map: texturesSet.left,
          roughness: 0.28,
          metalness: 0.72,
          emissive: new THREE.Color(0x18140a),
          emissiveIntensity: 0.4,
        })
      ),
      track(
        new THREE.MeshStandardMaterial({
          map: texturesSet.top,
          roughness: 0.28,
          metalness: 0.72,
          emissive: new THREE.Color(0x18140a),
          emissiveIntensity: 0.4,
        })
      ),
      track(
        new THREE.MeshStandardMaterial({
          map: texturesSet.bottom,
          roughness: 0.28,
          metalness: 0.72,
          emissive: new THREE.Color(0x18140a),
          emissiveIntensity: 0.4,
        })
      ),
      track(
        new THREE.MeshStandardMaterial({
          map: texturesSet.front,
          roughness: 0.26,
          metalness: 0.75,
          emissive: new THREE.Color(0x221a0c),
          emissiveIntensity: 0.5,
        })
      ),
      track(
        new THREE.MeshStandardMaterial({
          map: texturesSet.back,
          roughness: 0.28,
          metalness: 0.72,
          emissive: new THREE.Color(0x18140a),
          emissiveIntensity: 0.4,
        })
      ),
    ];

    // Primary Cube Mesh
    const cubeDim = 3.2;
    const cubeGeo = track(new THREE.BoxGeometry(cubeDim, cubeDim, cubeDim));
    const cubeMesh = new THREE.Mesh(cubeGeo, faceMaterials);
    cubeGroup.add(cubeMesh);

    // --- Luminous Gold Wireframe & Chamfer Edges ---
    const edgesGeo = track(new THREE.EdgesGeometry(cubeGeo));
    const edgeMaterial = track(
      new THREE.LineBasicMaterial({
        color: 0xd4af37,
        linewidth: 2,
        transparent: true,
        opacity: 0.85,
      })
    );
    const edgesMesh = new THREE.LineSegments(edgesGeo, edgeMaterial);
    cubeGroup.add(edgesMesh);

    // 8 Golden Vertex Spheres at corners
    const vertexRadius = 0.07;
    const vertexGeo = track(new THREE.SphereGeometry(vertexRadius, 16, 16));
    const vertexMaterial = track(
      new THREE.MeshStandardMaterial({
        color: 0xdfc067,
        emissive: 0xd4af37,
        emissiveIntensity: 2.2,
        roughness: 0.15,
        metalness: 0.9,
      })
    );

    const half = cubeDim / 2;
    const cornerPositions = [
      [-half, -half, -half],
      [half, -half, -half],
      [-half, half, -half],
      [half, half, -half],
      [-half, -half, half],
      [half, -half, half],
      [-half, half, half],
      [half, half, half],
    ];

    cornerPositions.forEach(([cx, cy, cz]) => {
      const vNode = new THREE.Mesh(vertexGeo, vertexMaterial);
      vNode.position.set(cx, cy, cz);
      cubeGroup.add(vNode);
    });

    // --- Inner Luminous Core (Pulsing Octahedron) ---
    const innerCoreGeo = track(new THREE.OctahedronGeometry(1.15, 0));
    const innerCoreMaterial = track(
      new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        emissive: 0xd4af37,
        emissiveIntensity: 2.5,
        wireframe: true,
        transparent: true,
        opacity: 0.75,
      })
    );
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMaterial);
    cubeGroup.add(innerCoreMesh);

    // Core central warm light
    const corePointLight = new THREE.PointLight(0xd4af37, 2.0, 4.5);
    cubeGroup.add(corePointLight);

    // --- Dual Orbital Trajectory Rings around Cube ---
    const ringGroup = new THREE.Group();
    rootAssembly.add(ringGroup);

    const ringRadius = 3.15;
    const ringTube = 0.018;
    const orbitRingGeo = track(new THREE.TorusGeometry(ringRadius, ringTube, 16, 100));

    const ringMaterial1 = track(
      new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        emissive: 0xd4af37,
        emissiveIntensity: 0.8,
        roughness: 0.2,
        metalness: 0.8,
        transparent: true,
        opacity: 0.7,
      })
    );

    const ring1 = new THREE.Mesh(orbitRingGeo, ringMaterial1);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    ringGroup.add(ring1);

    const ringMaterial2 = track(
      new THREE.MeshStandardMaterial({
        color: 0xdfc067,
        emissive: 0xd4af37,
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.8,
        transparent: true,
        opacity: 0.5,
      })
    );

    const ring2 = new THREE.Mesh(orbitRingGeo, ringMaterial2);
    ring2.rotation.x = -Math.PI / 3.5;
    ring2.rotation.y = -Math.PI / 4;
    ringGroup.add(ring2);

    // 4 Orbiting micro-satellite nodes on rings
    const satelliteGeo = track(new THREE.OctahedronGeometry(0.12, 0));
    const satelliteMaterial = track(
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xd4af37,
        emissiveIntensity: 2.0,
        roughness: 0.2,
      })
    );

    const satellites: THREE.Mesh[] = [];
    for (let i = 0; i < 4; i++) {
      const sat = new THREE.Mesh(satelliteGeo, satelliteMaterial);
      satellites.push(sat);
      rootAssembly.add(sat);
    }

    // --- Ambient 3D Gold Particle Field ---
    const particleCount = 55;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 11;
      particlePositions[i + 1] = (Math.random() - 0.5) * 10;
      particlePositions[i + 2] = (Math.random() - 0.5) * 8;
    }

    const particleGeo = track(new THREE.BufferGeometry());
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Custom circle particle texture for rounded gold particles
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d')!;
    const pGrad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    pGrad.addColorStop(0, 'rgba(223, 192, 103, 1)');
    pGrad.addColorStop(0.5, 'rgba(212, 175, 55, 0.6)');
    pGrad.addColorStop(1, 'rgba(212, 175, 55, 0)');
    pCtx.fillStyle = pGrad;
    pCtx.beginPath();
    pCtx.arc(16, 16, 16, 0, Math.PI * 2);
    pCtx.fill();
    const pTexture = track(new THREE.CanvasTexture(pCanvas));

    const particleMaterial = track(
      new THREE.PointsMaterial({
        color: 0xdfc067,
        size: 0.16,
        map: pTexture,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    const particlePoints = new THREE.Points(particleGeo, particleMaterial);
    rootAssembly.add(particlePoints);

    // Save scene state to ref
    sceneRef.current = {
      renderer,
      scene,
      camera,
      cubeGroup,
      targetRotation: { x: 0.18, y: -0.32 },
      currentRotation: { x: 0.18, y: -0.32 },
      velocity: { x: 0, y: 0 },
      mouseOffset: { x: 0, y: 0 },
      isDragging: false,
      isSnapping: false,
      snapProgress: 0,
      snapStartRotation: { x: 0, y: 0 },
      snapTargetRotation: { x: 0, y: 0 },
      texturesSet,
      disposables,
      animId: null,
    };

    // --- Face Normal Vectors to Determine Visible Face ---
    // In Three.js:
    // Front:  (0, 0, 1)  [index 4 / CUBE_FACES[0]]
    // Right:  (1, 0, 0)  [index 0 / CUBE_FACES[1]]
    // Back:   (0, 0, -1) [index 5 / CUBE_FACES[2]]
    // Left:   (-1, 0, 0) [index 1 / CUBE_FACES[3]]
    // Top:    (0, 1, 0)  [index 2 / CUBE_FACES[4]]
    // Bottom: (0, -1, 0) [index 3 / CUBE_FACES[5]]
    const faceNormals = [
      { faceIndex: 0, vector: new THREE.Vector3(0, 0, 1) },  // Front: Brand Core
      { faceIndex: 1, vector: new THREE.Vector3(1, 0, 0) },  // Right: Web & App
      { faceIndex: 2, vector: new THREE.Vector3(0, 0, -1) }, // Back: Cloud & DevOps
      { faceIndex: 3, vector: new THREE.Vector3(-1, 0, 0) }, // Left: Database & APIs
      { faceIndex: 4, vector: new THREE.Vector3(0, 1, 0) },  // Top: AI Systems
      { faceIndex: 5, vector: new THREE.Vector3(0, -1, 0) }, // Bottom: Startup Scale
    ];

    const cameraDir = new THREE.Vector3(0, 0, 1);
    let lastFaceCheckTime = 0;

    // --- Real-Time Render Loop ---
    let clock = new THREE.Clock();

    const animate = () => {
      const state = sceneRef.current;
      if (!state) return;

      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsedTime = clock.getElapsedTime();

      // 1. Hover floating oscillation
      const hoverY = prefersReducedMotion ? 0 : Math.sin(elapsedTime * 1.3) * 0.12;
      rootAssembly.position.y = hoverY;

      // 2. Inner core counter-rotation & pulsing
      innerCoreMesh.rotation.x = elapsedTime * 0.4;
      innerCoreMesh.rotation.y = elapsedTime * 0.6;
      const corePulse = 1.0 + Math.sin(elapsedTime * 3) * 0.08;
      innerCoreMesh.scale.set(corePulse, corePulse, corePulse);

      // 3. Orbiting rings subtle counter-motion
      ringGroup.rotation.y = -elapsedTime * 0.15;

      // 4. Update 4 micro-satellites along orbital paths
      satellites.forEach((sat, idx) => {
        const ringAngle = elapsedTime * (0.8 + idx * 0.15) + (idx * Math.PI) / 2;
        const radius = ringRadius;
        if (idx < 2) {
          // Ring 1 orbit plane
          const x = Math.cos(ringAngle) * radius;
          const y = Math.sin(ringAngle) * radius * Math.cos(Math.PI / 3);
          const z = Math.sin(ringAngle) * radius * Math.sin(Math.PI / 3);
          sat.position.set(x, y, z);
        } else {
          // Ring 2 orbit plane
          const x = Math.cos(ringAngle) * radius;
          const y = -Math.sin(ringAngle) * radius * Math.cos(Math.PI / 3.5);
          const z = Math.sin(ringAngle) * radius * Math.sin(Math.PI / 3.5);
          sat.position.set(x, y, z);
        }
        sat.rotation.x = elapsedTime * 2;
        sat.rotation.y = elapsedTime * 2;
      });

      // 5. Light follows mouse offset
      interactivePointLight.position.x = state.mouseOffset.x * 4;
      interactivePointLight.position.y = -state.mouseOffset.y * 4;

      // 6. Cube Rotation Physics & Interaction Handling
      if (state.isSnapping) {
        // Smooth easing towards target snap orientation
        state.snapProgress += delta * 3.2;
        const t = Math.min(state.snapProgress, 1.0);
        // Ease-out cubic formula
        const easeT = 1 - Math.pow(1 - t, 3);

        state.currentRotation.x =
          state.snapStartRotation.x + (state.snapTargetRotation.x - state.snapStartRotation.x) * easeT;
        state.currentRotation.y =
          state.snapStartRotation.y + (state.snapTargetRotation.y - state.snapStartRotation.y) * easeT;

        if (t >= 1.0) {
          state.isSnapping = false;
          state.velocity.x = 0;
          state.velocity.y = 0;
        }
      } else if (state.isDragging) {
        // Dragging mode: smoothly approach target drag rotation
        state.currentRotation.x += (state.targetRotation.x - state.currentRotation.x) * 0.28;
        state.currentRotation.y += (state.targetRotation.y - state.currentRotation.y) * 0.28;
      } else {
        // Inertia decay
        state.targetRotation.x += state.velocity.x;
        state.targetRotation.y += state.velocity.y;
        state.velocity.x *= 0.94;
        state.velocity.y *= 0.94;

        // Auto-rotation when not dragging
        if (isAutoRotating && !prefersReducedMotion) {
          state.targetRotation.y += delta * 0.32;
        }

        // Magnetic tilt towards cursor position
        const targetTiltX = state.mouseOffset.y * 0.22;
        const targetTiltY = state.mouseOffset.x * 0.22;

        state.currentRotation.x +=
          (state.targetRotation.x + targetTiltX - state.currentRotation.x) * 0.08;
        state.currentRotation.y +=
          (state.targetRotation.y + targetTiltY - state.currentRotation.y) * 0.08;
      }

      // Apply rotations to cube
      cubeGroup.rotation.x = state.currentRotation.x;
      cubeGroup.rotation.y = state.currentRotation.y;

      // 7. Calculate Active Visible Face (throttled to ~10 times/sec)
      if (elapsedTime - lastFaceCheckTime > 0.1) {
        lastFaceCheckTime = elapsedTime;

        // Transform face normals by current cube rotation matrix
        const normalMatrix = new THREE.Matrix3().getNormalMatrix(cubeGroup.matrixWorld);
        let bestDot = -Infinity;
        let bestFaceIndex = 0;

        faceNormals.forEach(({ faceIndex, vector }) => {
          const transformedNormal = vector.clone().applyMatrix3(normalMatrix).normalize();
          const dot = transformedNormal.dot(cameraDir);
          if (dot > bestDot) {
            bestDot = dot;
            bestFaceIndex = faceIndex;
          }
        });

        setActiveFaceIndex(bestFaceIndex);
      }

      // 8. Render Scene
      renderer.render(scene, camera);

      state.animId = requestAnimationFrame(animate);
    };

    stateRefSetup: {
      const animId = requestAnimationFrame(animate);
      if (sceneRef.current) {
        sceneRef.current.animId = animId;
      }
    }

    // --- Resize Handling with ResizeObserver & RAF Throttling ---
    let resizeRafId: number | null = null;
    let prevW = 0;
    let prevH = 0;

    const handleResize = () => {
      if (resizeRafId !== null) {
        cancelAnimationFrame(resizeRafId);
      }
      resizeRafId = requestAnimationFrame(() => {
        if (!container || !sceneRef.current) return;
        const newWidth = Math.floor(container.clientWidth || 540);
        const newHeight = Math.floor(container.clientHeight || 520);
        if (newWidth <= 0 || newHeight <= 0) return;
        if (newWidth === prevW && newHeight === prevH) return;

        prevW = newWidth;
        prevH = newHeight;

        sceneRef.current.camera.aspect = newWidth / newHeight;
        sceneRef.current.camera.updateProjectionMatrix();
        sceneRef.current.renderer.setSize(newWidth, newHeight, false);
      });
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    return () => {
      if (resizeRafId !== null) {
        cancelAnimationFrame(resizeRafId);
      }
      resizeObserver.disconnect();
      if (sceneRef.current?.animId) {
        cancelAnimationFrame(sceneRef.current.animId);
      }
      sceneRef.current?.texturesSet?.disposeAll();
      sceneRef.current?.disposables.forEach((d) => d.dispose());
      sceneRef.current?.renderer.dispose();
      sceneRef.current = null;
    };
  }, [isAutoRotating, prefersReducedMotion]);

  // Pointer drag event handlers for real-time 3D rotation
  const pointerStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const state = sceneRef.current;
    if (!state) return;

    // Capture pointer
    e.currentTarget.setPointerCapture(e.pointerId);

    state.isDragging = true;
    state.isSnapping = false;
    state.velocity = { x: 0, y: 0 };
    pointerStartPos.current = { x: e.clientX, y: e.clientY };

    if (!hasInteracted) {
      setHasInteracted(true);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const state = sceneRef.current;
    if (!state) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    state.mouseOffset = { x: nx, y: ny };

    if (!state.isDragging) return;

    const deltaX = e.clientX - pointerStartPos.current.x;
    const deltaY = e.clientY - pointerStartPos.current.y;
    pointerStartPos.current = { x: e.clientX, y: e.clientY };

    const sensitivity = 0.0072;
    state.targetRotation.y += deltaX * sensitivity;
    state.targetRotation.x += deltaY * sensitivity;

    state.velocity = {
      x: deltaY * sensitivity * 0.4,
      y: deltaX * sensitivity * 0.4,
    };
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const state = sceneRef.current;
    if (!state) return;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore if already released
    }

    state.isDragging = false;
  };

  // Snap to specific Face
  const snapToFace = useCallback((face: FaceMeta) => {
    const state = sceneRef.current;
    if (!state) return;

    setHasInteracted(true);
    setIsAutoRotating(false); // Pause auto-rotation while user inspects

    state.isDragging = false;
    state.isSnapping = true;
    state.snapProgress = 0;
    state.snapStartRotation = { ...state.currentRotation };

    // Find nearest congruent angle to prevent huge spins
    let targetX = face.rotX;
    let targetY = face.rotY;

    // Wrap targetY closest to currentRotation.y
    const diffY = targetY - state.currentRotation.y;
    const wrappedDiffY = Math.atan2(Math.sin(diffY), Math.cos(diffY));
    targetY = state.currentRotation.y + wrappedDiffY;

    state.snapTargetRotation = { x: targetX, y: targetY };
    state.targetRotation = { x: targetX, y: targetY };
  }, []);

  // Keyboard navigation for full accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const state = sceneRef.current;
    if (!state) return;

    setHasInteracted(true);
    const step = Math.PI / 4;

    if (e.key === 'ArrowRight') {
      state.targetRotation.y += step;
      e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
      state.targetRotation.y -= step;
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      state.targetRotation.x -= step;
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      state.targetRotation.x += step;
      e.preventDefault();
    } else if (e.key === ' ' || e.key === 'Spacebar') {
      setIsAutoRotating((prev) => !prev);
      e.preventDefault();
    }
  };

  // Reset to initial isometric perspective
  const resetOrientation = () => {
    snapToFace(CUBE_FACES[0]);
    setIsAutoRotating(true);
  };

  if (!hasWebGl) {
    return <SceneFallback />;
  }

  const activeFace = CUBE_FACES[activeFaceIndex] || CUBE_FACES[0];

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="VPD Technologies Interactive 3D Technology Cube. Use mouse or touch to rotate, or select faces below."
      className={`relative w-full max-w-[560px] aspect-square flex flex-col items-center justify-between select-none outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-3xl ${className}`}
    >
      {/* Subtle outer gold ambient glow aura */}
      <div className="absolute inset-0 bg-radial-gradient from-[#D4AF37]/10 via-[#0A0A0A]/40 to-transparent pointer-events-none rounded-3xl" />

      {/* Top HUD Bar — Status & Active Domain Kicker */}
      <div className="relative z-20 w-full px-4 pt-3 flex items-center justify-between text-xs pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141416]/90 border border-[#2A2A2A] shadow-md backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
          <span className="font-mono font-bold text-[#DFC067] tracking-wider uppercase text-xs">
            {activeFace.code} // {activeFace.badge}
          </span>
        </div>

        {/* Quick HUD Controls */}
        <div className="flex items-center gap-1.5 pointer-events-auto">
          <button
            onClick={() => setIsAutoRotating((prev) => !prev)}
            aria-label={isAutoRotating ? 'Pause auto-rotation' : 'Play auto-rotation'}
            title={isAutoRotating ? 'Pause auto-rotation' : 'Play auto-rotation'}
            className="w-8 h-8 rounded-xl bg-[#141416]/90 hover:bg-[#202024] border border-[#2A2A2A] hover:border-[#D4AF37]/50 text-[#A1A1AA] hover:text-[#DFC067] transition-all flex items-center justify-center focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
          >
            {isAutoRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </button>

          <button
            onClick={resetOrientation}
            aria-label="Reset orientation to Brand Core"
            title="Reset orientation"
            className="w-8 h-8 rounded-xl bg-[#141416]/90 hover:bg-[#202024] border border-[#2A2A2A] hover:border-[#D4AF37]/50 text-[#A1A1AA] hover:text-[#DFC067] transition-all flex items-center justify-center focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Canvas Viewport for Three.js 3D Rendering */}
      <div className="relative w-full flex-1 flex items-center justify-center overflow-visible cursor-grab active:cursor-grabbing">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="w-full h-full block touch-none z-10"
        />

        {/* Interactive Drag Hint (fades out after first interaction) */}
        {!hasInteracted && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111114]/90 border border-[#D4AF37]/40 shadow-xl backdrop-blur-md animate-bounce">
            <Compass className="w-3.5 h-3.5 text-[#D4AF37] animate-spin" style={{ animationDuration: '6s' }} />
            <span className="text-xs font-semibold text-white tracking-wide">
              Drag to explore 3D core
            </span>
          </div>
        )}
      </div>

      {/* Bottom HUD Bar — Face Navigator & Active Domain Description */}
      <div className="relative z-20 w-full px-3 pb-3 flex flex-col gap-2.5">
        {/* Dynamic Domain Information Card */}
        <div className="w-full px-4 py-2.5 rounded-2xl bg-[#121216]/95 border border-[#26262A] shadow-xl backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                <span className="text-[#D4AF37]">✦</span> {activeFace.title}
              </span>
            </div>
            <p className="text-xs text-[#A1A1AA] leading-snug line-clamp-1 mt-0.5">
              {activeFace.description}
            </p>
          </div>

          {onOpenConsultation && (
            <button
              onClick={onOpenConsultation}
              className="shrink-0 self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold text-[#D4AF37] hover:text-white bg-[#1A1A20] hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
            >
              <Zap className="w-3 h-3 text-[#DFC067]" />
              <span>Audit Architecture</span>
            </button>
          )}
        </div>

        {/* 6-Facet Quick Snap-to-Face Segmented Control */}
        <div className="w-full grid grid-cols-3 sm:grid-cols-6 gap-1 p-1 rounded-xl bg-[#0D0D10]/90 border border-[#202024] backdrop-blur-md">
          {CUBE_FACES.map((face, idx) => {
            const isActive = activeFaceIndex === idx;
            return (
              <button
                key={face.id}
                onClick={() => snapToFace(face)}
                className={`px-2 py-1.5 text-xs font-medium rounded-lg transition-all text-center truncate ${
                  isActive
                    ? 'bg-[#22222A] text-[#DFC067] font-bold shadow-sm border border-[#D4AF37]/50'
                    : 'text-[#888890] hover:text-white hover:bg-[#16161C]'
                }`}
                title={`Inspect ${face.title}`}
              >
                {face.shortLabel}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
