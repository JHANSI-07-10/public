import * as THREE from 'three';

/**
 * Custom GLSL Shaders for the VPD Photon Knot 3D Ribbon.
 * Simulates a high-end flowing ribbon of translucent light with Fresnel edge glow,
 * travelling photon pulses, champagne-gold highlights, and subtle metallic reflections.
 */

export const PhotonRibbonVertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec3 vWorldPosition;

  uniform float uTime;
  uniform float uWaveAmp;

  void main() {
    vUv = uv;

    // Harmonic wave breathing along the ribbon
    vec3 transformed = position;
    float wave = sin(uv.x * 18.8495 + uTime * 2.2) * 0.024 * uWaveAmp;
    transformed += normal * wave;

    vec4 worldPos = modelMatrix * vec4(transformed, 1.0);
    vWorldPosition = worldPos.xyz;

    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
    vViewPosition = -mvPosition.xyz;

    vNormal = normalize(normalMatrix * normal);

    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const PhotonRibbonFragmentShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec3 vWorldPosition;

  uniform float uTime;
  uniform float uOpacity;
  uniform float uPulseSpeed;
  uniform float uFresnelPower;
  uniform float uEnergyIntensity;

  // VPD Brand Color Palette
  uniform vec3 uColorCore;       // White #FFFFFF
  uniform vec3 uColorGold;       // Primary Gold #D4AF37
  uniform vec3 uColorChampagne;  // Champagne Gold #F2D98D
  uniform vec3 uColorBrightGold; // Bright Gold #E5C15D
  uniform vec3 uColorCharcoal;   // Charcoal #181818

  void main() {
    // Coordinate along ribbon length: vUv.x in [0..1]
    // Coordinate across ribbon width: vUv.y in [0..1], 0.5 at center spine
    float dCenter = abs(vUv.y - 0.5) * 2.0; // 0.0 at spine, 1.0 at outer edges

    // 1. Double-sided Fresnel Rim Glow (glass/luminous energy look)
    vec3 V = normalize(vViewPosition);
    vec3 N = normalize(vNormal);
    float NdotV = abs(dot(N, V));
    float fresnel = pow(1.0 - NdotV, uFresnelPower);

    // 2. Fine Luminous Edges (VPD Gold Rim)
    float edgeGlow = smoothstep(0.72, 0.98, dCenter);

    // 3. Central White Photon Energy Spine
    float spine = pow(clamp(1.0 - dCenter, 0.0, 1.0), 4.2);

    // 4. Travelling Photon Energy Packets (flowing light pulses)
    float tSpeed = uTime * uPulseSpeed;
    // Primary forward packet
    float pulse1 = exp(-pow(mod(vUv.x - tSpeed, 1.0) - 0.5, 2.0) * 110.0);
    // Secondary counter/offset packet
    float pulse2 = exp(-pow(mod(vUv.x * 2.0 + tSpeed * 0.75 + 0.33, 1.0) - 0.5, 2.0) * 140.0);
    // Micro-ripple wave
    float ripple = sin(vUv.x * 37.699 - tSpeed * 4.0) * 0.5 + 0.5;
    ripple = pow(ripple, 3.0) * 0.35;

    float combinedPulses = (pulse1 * 1.3 + pulse2 * 0.85 + ripple) * uEnergyIntensity;

    // 5. Specular / Metallic Highlight
    vec3 lightDir = normalize(vec3(0.5, 0.8, 1.0));
    vec3 H = normalize(lightDir + V);
    float spec = pow(max(abs(dot(N, H)), 0.0), 28.0) * 0.5;

    // 6. Color Composition in VPD Palette
    // Base body: dark translucent smoked gold
    vec3 bodyColor = mix(uColorCharcoal, uColorGold * 0.45, fresnel * 0.6);

    // Gold rim accents
    vec3 edgeColor = mix(uColorGold, uColorBrightGold, dCenter);

    // Photon highlights
    vec3 photonGlow = mix(uColorChampagne, uColorCore, spine * 0.85 + combinedPulses * 0.7);

    // Composite final color
    vec3 finalColor = bodyColor;
    finalColor += edgeColor * (edgeGlow * 1.6 + fresnel * 0.8);
    finalColor += photonGlow * (spine * 1.2 + combinedPulses * 1.4);
    finalColor += uColorChampagne * spec;

    // Controlled Translucent Opacity
    float alpha = (0.28 + fresnel * 0.55 + edgeGlow * 0.45 + spine * 0.65 + combinedPulses * 0.4) * uOpacity;
    alpha = clamp(alpha, 0.0, 0.95);

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

export const SecondaryFilamentVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const SecondaryFilamentFragmentShader = /* glsl */ `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uOpacity;
  uniform vec3 uColor;

  void main() {
    float dCenter = abs(vUv.y - 0.5) * 2.0;
    float spine = pow(clamp(1.0 - dCenter, 0.0, 1.0), 3.0);

    // Fast traveling light dash
    float dash = sin(vUv.x * 30.0 - uTime * 3.5) * 0.5 + 0.5;
    dash = pow(dash, 4.0);

    vec3 col = mix(uColor * 0.6, vec3(1.0), dash * 0.7);
    float alpha = (spine * 0.7 + dash * 0.5) * uOpacity;

    gl_FragColor = vec4(col, clamp(alpha, 0.0, 0.85));
  }
`;

export const PhotonDustVertexShader = /* glsl */ `
  attribute float phase;
  attribute float scale;
  varying float vAlpha;
  uniform float uTime;

  void main() {
    // Subtle organic floating motion
    vec3 pos = position;
    pos.x += sin(uTime * 0.8 + phase) * 0.12;
    pos.y += cos(uTime * 0.6 + phase) * 0.10;
    pos.z += sin(uTime * 1.1 + phase * 2.0) * 0.08;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Size attenuation with distance
    gl_PointSize = (scale * 24.0) * (1.0 / -mvPosition.z);

    // Twinkle modulation
    vAlpha = (sin(uTime * 1.5 + phase) * 0.5 + 0.5) * 0.6 + 0.2;
  }
`;

export const PhotonDustFragmentShader = /* glsl */ `
  varying float vAlpha;
  uniform vec3 uColor;
  uniform float uOpacity;

  void main() {
    // Circular particle shape with soft Gaussian falloff
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;

    float glow = pow(1.0 - dist * 2.0, 2.0);
    vec3 col = mix(uColor, vec3(1.0), glow * 0.4);

    gl_FragColor = vec4(col, glow * vAlpha * uOpacity);
  }
`;

/**
 * Creates uniform objects initialized with VPD brand colors.
 */
export function createPhotonRibbonUniforms() {
  return {
    uTime: { value: 0.0 },
    uOpacity: { value: 0.88 },
    uPulseSpeed: { value: 0.18 },
    uFresnelPower: { value: 2.6 },
    uEnergyIntensity: { value: 1.0 },
    uWaveAmp: { value: 1.0 },

    uColorCore: { value: new THREE.Color('#FFFFFF') },
    uColorGold: { value: new THREE.Color('#D4AF37') },
    uColorChampagne: { value: new THREE.Color('#F2D98D') },
    uColorBrightGold: { value: new THREE.Color('#E5C15D') },
    uColorCharcoal: { value: new THREE.Color('#181818') },
  };
}

