'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  createKnotRibbonGeometry,
  createSecondaryFilamentGeometry,
  createPhotonDustGeometry,
} from './knotGeometry';
import {
  PhotonRibbonVertexShader,
  PhotonRibbonFragmentShader,
  SecondaryFilamentVertexShader,
  SecondaryFilamentFragmentShader,
  PhotonDustVertexShader,
  PhotonDustFragmentShader,
  createPhotonRibbonUniforms,
} from './photonKnotShaders';

interface VpdPhotonKnotSceneProps {
  phase: 'intro' | 'tracing' | 'resolving' | 'ambient';
  progress: number; // 0 to 1
  mouseX: number;   // -1 to 1
  mouseY: number;   // -1 to 1
  isPaused?: boolean;
  shouldReduceMotion?: boolean;
  onWebGlError?: () => void;
  className?: string;
}

export const VpdPhotonKnotScene: React.FC<VpdPhotonKnotSceneProps> = ({
  phase,
  progress,
  mouseX,
  mouseY,
  isPaused = false,
  shouldReduceMotion = false,
  onWebGlError,
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Keep latest props in refs for the RAF loop
  const propsRef = useRef({ phase, progress, mouseX, mouseY, isPaused, shouldReduceMotion });
  useEffect(() => {
    propsRef.current = { phase, progress, mouseX, mouseY, isPaused, shouldReduceMotion };
  }, [phase, progress, mouseX, mouseY, isPaused, shouldReduceMotion]);

  useEffect(() => {
    const mountEl = mountRef.current;
    const canvas = canvasRef.current;
    if (!mountEl || !canvas) return;

    // 1. Initialize WebGL Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(mountEl.clientWidth, mountEl.clientHeight);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
    } catch (err) {
      console.warn('WebGL initialization failed, using static fallback:', err);
      if (onWebGlError) onWebGlError();
      return;
    }

    // Context loss handling
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      console.warn('WebGL context lost');
      if (onWebGlError) onWebGlError();
    };
    canvas.addEventListener('webglcontextlost', handleContextLost);

    // 2. Scene & Camera Setup
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      42,
      mountEl.clientWidth / mountEl.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 6.4);

    // 3. Lighting Setup (Cinematic VPD Gold & White Scheme)
    const ambientLight = new THREE.AmbientLight(0xffeedd, 0.45);
    scene.add(ambientLight);

    // Key light: champagne white
    const keyLight = new THREE.PointLight(0xfff8ee, 3.2, 18, 1.4);
    keyLight.position.set(3.2, 2.8, 4.2);
    scene.add(keyLight);

    // Fill light: primary gold
    const fillLight = new THREE.PointLight(0xd4af37, 2.4, 16, 1.4);
    fillLight.position.set(-3.5, -2.2, 3.2);
    scene.add(fillLight);

    // Rim light: cool white edge backlighting
    const rimLight = new THREE.PointLight(0xffffff, 2.2, 14, 2.0);
    rimLight.position.set(0, 3.0, -3.2);
    scene.add(rimLight);

    // 4. Primary Knot Ribbon Mesh
    const knotGroup = new THREE.Group();
    scene.add(knotGroup);

    const ribbonGeo = createKnotRibbonGeometry({
      segments: 280,
      width: 0.38,
      extraTwists: 2,
      radiusMajor: 2.35,
      radiusMinor: 0.95,
      height: 1.15,
      yFlatten: 0.74,
    });

    const ribbonUniforms = createPhotonRibbonUniforms();
    const ribbonMat = new THREE.ShaderMaterial({
      vertexShader: PhotonRibbonVertexShader,
      fragmentShader: PhotonRibbonFragmentShader,
      uniforms: ribbonUniforms,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    const ribbonMesh = new THREE.Mesh(ribbonGeo, ribbonMat);
    knotGroup.add(ribbonMesh);

    // 5. Secondary Slender Harmonic Filament Mesh
    const filamentGeo = createSecondaryFilamentGeometry();
    const filamentMat = new THREE.ShaderMaterial({
      vertexShader: SecondaryFilamentVertexShader,
      fragmentShader: SecondaryFilamentFragmentShader,
      uniforms: {
        uTime: { value: 0.0 },
        uOpacity: { value: 0.65 },
        uColor: { value: new THREE.Color('#D4AF37') },
      },
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const filamentMesh = new THREE.Mesh(filamentGeo, filamentMat);
    knotGroup.add(filamentMesh);

    // 6. Floating Photon Stardust Particles
    const dustGeo = createPhotonDustGeometry(48);
    const dustMat = new THREE.ShaderMaterial({
      vertexShader: PhotonDustVertexShader,
      fragmentShader: PhotonDustFragmentShader,
      uniforms: {
        uTime: { value: 0.0 },
        uOpacity: { value: 0.7 },
        uColor: { value: new THREE.Color('#F2D98D') },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const dustParticles = new THREE.Points(dustGeo, dustMat);
    scene.add(dustParticles);

    // 7. Animation Loop with Smooth Parallax & Visibility Throttling
    let animationFrameId: number;
    let lastTime = performance.now();
    let isVisible = true;

    // Smoothed parallax rotations
    let currentTiltX = 0;
    let currentTiltY = 0;

    // IntersectionObserver to pause RAF when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(mountEl);

    // Render loop
    const render = (timeNow: number) => {
      animationFrameId = requestAnimationFrame(render);

      if (!isVisible) {
        lastTime = timeNow;
        return;
      }

      const delta = Math.min((timeNow - lastTime) / 1000, 0.1);
      lastTime = timeNow;

      const { isPaused: paused, shouldReduceMotion: reduced, phase: currentPhase, mouseX: mX, mouseY: mY } = propsRef.current;

      if (!paused && !reduced) {
        const timeSec = timeNow * 0.001;
        ribbonUniforms.uTime.value = timeSec;
        filamentMat.uniforms.uTime.value = timeSec;
        dustMat.uniforms.uTime.value = timeSec;

        // Base continuous 3D knot tumbling rotation
        knotGroup.rotation.y += delta * 0.14;
        knotGroup.rotation.x = Math.sin(timeSec * 0.22) * 0.12;
        knotGroup.rotation.z = Math.cos(timeSec * 0.18) * 0.08;

        dustParticles.rotation.y -= delta * 0.04;
      }

      // Smooth interactive mouse parallax
      const targetTiltX = reduced ? 0 : mY * 0.18;
      const targetTiltY = reduced ? 0 : mX * 0.25;
      currentTiltX += (targetTiltX - currentTiltX) * 0.06;
      currentTiltY += (targetTiltY - currentTiltY) * 0.06;

      camera.position.x = currentTiltY * 0.8;
      camera.position.y = -currentTiltX * 0.6;
      camera.lookAt(0, 0, 0);

      // Phase-specific adjustments
      if (currentPhase === 'intro') {
        // Grow into the scene
        const prog = propsRef.current.progress;
        const scaleVal = THREE.MathUtils.lerp(0.35, 1.0, Math.min(prog * 1.5, 1.0));
        knotGroup.scale.setScalar(scaleVal);
        ribbonUniforms.uOpacity.value = Math.min(prog * 2.0, 0.88);
      } else {
        knotGroup.scale.setScalar(1.0);
        ribbonUniforms.uOpacity.value = 0.88;
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(render);

    // 8. Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries[0]) return;
      const { width, height } = entries[0].contentRect;
      if (width === 0 || height === 0) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    resizeObserver.observe(mountEl);

    // 9. Cleanup Resources on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      resizeObserver.disconnect();
      canvas.removeEventListener('webglcontextlost', handleContextLost);

      // Dispose geometries
      ribbonGeo.dispose();
      filamentGeo.dispose();
      dustGeo.dispose();

      // Dispose materials
      ribbonMat.dispose();
      filamentMat.dispose();
      dustMat.dispose();

      // Dispose renderer
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, [onWebGlError]);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
};

