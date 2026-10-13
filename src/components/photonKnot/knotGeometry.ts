import * as THREE from 'three';

/**
 * Procedural 3D Knot Ribbon Geometry Generator.
 * Generates continuous, watertight 3D ribbon strips with parallel transport frames,
 * seamless seam closure, and optimized UV coordinates for flowing photon shaders.
 */

export interface KnotRibbonOptions {
  segments?: number;
  width?: number;
  extraTwists?: number;
  radiusMajor?: number;
  radiusMinor?: number;
  height?: number;
  p?: number; // winding number p
  q?: number; // winding number q
  yFlatten?: number; // aspect flattening for logo framing
}

/**
 * Creates a watertight 3D torus knot ribbon buffer geometry.
 */
export function createKnotRibbonGeometry(options: KnotRibbonOptions = {}): THREE.BufferGeometry {
  const {
    segments = 280,
    width = 0.38,
    extraTwists = 2,
    radiusMajor = 2.4,
    radiusMinor = 0.95,
    height = 1.1,
    p = 2,
    q = 3,
    yFlatten = 0.72,
  } = options;

  const points: THREE.Vector3[] = [];
  const tangents: THREE.Vector3[] = [];

  // 1. Sample space curve positions & tangents
  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * Math.PI * 2;
    const ct = Math.cos(q * t);
    const rad = radiusMajor + radiusMinor * ct;
    const x = rad * Math.cos(p * t);
    const y = rad * Math.sin(p * t) * yFlatten;
    const z = -height * Math.sin(q * t);
    points.push(new THREE.Vector3(x, y, z));

    // Numerical tangent via forward difference
    const dt = 0.0001;
    const tNext = t + dt;
    const ctNext = Math.cos(q * tNext);
    const radNext = radiusMajor + radiusMinor * ctNext;
    const xNext = radNext * Math.cos(p * tNext);
    const yNext = radNext * Math.sin(p * tNext) * yFlatten;
    const zNext = -height * Math.sin(q * tNext);
    const tangent = new THREE.Vector3(xNext - x, yNext - y, zNext - z).normalize();
    tangents.push(tangent);
  }

  // 2. Parallel transport frame propagation
  const normals: THREE.Vector3[] = [];
  const binormals: THREE.Vector3[] = [];

  // Initial normal orthogonal to tangent 0
  const initialNormal = new THREE.Vector3(0, 0, 1);
  initialNormal.sub(tangents[0].clone().multiplyScalar(initialNormal.dot(tangents[0]))).normalize();
  normals.push(initialNormal);
  binormals.push(new THREE.Vector3().crossVectors(tangents[0], initialNormal).normalize());

  for (let i = 1; i <= segments; i++) {
    const T_curr = tangents[i];
    const N_prev = normals[i - 1];

    // Project N_prev onto plane orthogonal to T_curr
    const N_curr = N_prev.clone().sub(T_curr.clone().multiplyScalar(N_prev.dot(T_curr))).normalize();
    const B_curr = new THREE.Vector3().crossVectors(T_curr, N_curr).normalize();
    normals.push(N_curr);
    binormals.push(B_curr);
  }

  // 3. Exact closure angle correction (holonomy compensation)
  const N_last = normals[segments];
  const N_first = normals[0];
  const B_first = binormals[0];
  const angleMismatch = Math.atan2(N_last.dot(B_first), N_last.dot(N_first));

  // 4. Construct ribbon vertices and UV coordinates
  const positions: number[] = [];
  const normalsArr: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= segments; i++) {
    const frac = i / segments;
    // Holonomy correction + integer extra twists
    const twistAngle = -angleMismatch * frac + extraTwists * Math.PI * 2 * frac;
    const cosA = Math.cos(twistAngle);
    const sinA = Math.sin(twistAngle);

    const N_twisted = normals[i].clone().multiplyScalar(cosA).add(binormals[i].clone().multiplyScalar(sinA));
    const B_twisted = new THREE.Vector3().crossVectors(tangents[i], N_twisted).normalize();

    // Subtle aesthetic width modulation
    const w = width * (1.0 + 0.22 * Math.sin(q * frac * Math.PI * 2));

    const pLeft = points[i].clone().sub(N_twisted.clone().multiplyScalar(w * 0.5));
    const pRight = points[i].clone().add(N_twisted.clone().multiplyScalar(w * 0.5));

    positions.push(pLeft.x, pLeft.y, pLeft.z);
    positions.push(pRight.x, pRight.y, pRight.z);

    // Surface normal (facing outward from ribbon flat side)
    normalsArr.push(B_twisted.x, B_twisted.y, B_twisted.z);
    normalsArr.push(B_twisted.x, B_twisted.y, B_twisted.z);

    // UVs: x = 0..1 along ribbon length, y = 0..1 across ribbon width
    uvs.push(frac, 0.0);
    uvs.push(frac, 1.0);
  }

  // 5. Generate index buffer for two-sided triangle strips
  for (let i = 0; i < segments; i++) {
    const i0 = i * 2;
    const i1 = i * 2 + 1;
    const i2 = (i + 1) * 2;
    const i3 = (i + 1) * 2 + 1;

    indices.push(i0, i1, i2);
    indices.push(i1, i3, i2);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normalsArr, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return geometry;
}

/**
 * Creates a secondary, slender harmonic energy filament that loops around
 * the primary knot to produce multilayered depth and optical complexity.
 */
export function createSecondaryFilamentGeometry(): THREE.BufferGeometry {
  const segments = 180;
  const width = 0.09;
  const points: THREE.Vector3[] = [];
  const tangents: THREE.Vector3[] = [];

  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * Math.PI * 2;
    // Harmonic Lissajous / Trefoil variant
    const x = 2.1 * Math.sin(t * 2.0);
    const y = 1.6 * Math.sin(t * 3.0) * 0.7;
    const z = 1.3 * Math.cos(t * 2.0);
    points.push(new THREE.Vector3(x, y, z));

    const dt = 0.0001;
    const tNext = t + dt;
    const xNext = 2.1 * Math.sin(tNext * 2.0);
    const yNext = 1.6 * Math.sin(tNext * 3.0) * 0.7;
    const zNext = 1.3 * Math.cos(tNext * 2.0);
    tangents.push(new THREE.Vector3(xNext - x, yNext - y, zNext - z).normalize());
  }

  const normals: THREE.Vector3[] = [];
  const binormals: THREE.Vector3[] = [];

  const initialNormal = new THREE.Vector3(0, 1, 0);
  initialNormal.sub(tangents[0].clone().multiplyScalar(initialNormal.dot(tangents[0]))).normalize();
  normals.push(initialNormal);
  binormals.push(new THREE.Vector3().crossVectors(tangents[0], initialNormal).normalize());

  for (let i = 1; i <= segments; i++) {
    const T_curr = tangents[i];
    const N_prev = normals[i - 1];
    const N_curr = N_prev.clone().sub(T_curr.clone().multiplyScalar(N_prev.dot(T_curr))).normalize();
    const B_curr = new THREE.Vector3().crossVectors(T_curr, N_curr).normalize();
    normals.push(N_curr);
    binormals.push(B_curr);
  }

  const N_last = normals[segments];
  const N_first = normals[0];
  const B_first = binormals[0];
  const angleMismatch = Math.atan2(N_last.dot(B_first), N_last.dot(N_first));

  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= segments; i++) {
    const frac = i / segments;
    const twistAngle = -angleMismatch * frac + 1 * Math.PI * 2 * frac;
    const cosA = Math.cos(twistAngle);
    const sinA = Math.sin(twistAngle);

    const N_twisted = normals[i].clone().multiplyScalar(cosA).add(binormals[i].clone().multiplyScalar(sinA));
    const pLeft = points[i].clone().sub(N_twisted.clone().multiplyScalar(width * 0.5));
    const pRight = points[i].clone().add(N_twisted.clone().multiplyScalar(width * 0.5));

    positions.push(pLeft.x, pLeft.y, pLeft.z);
    positions.push(pRight.x, pRight.y, pRight.z);

    uvs.push(frac, 0.0);
    uvs.push(frac, 1.0);
  }

  for (let i = 0; i < segments; i++) {
    const i0 = i * 2;
    const i1 = i * 2 + 1;
    const i2 = (i + 1) * 2;
    const i3 = (i + 1) * 2 + 1;
    indices.push(i0, i1, i2);
    indices.push(i1, i3, i2);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return geometry;
}

/**
 * Creates subtle floating 3D photon dust particles in space.
 */
export function createPhotonDustGeometry(count = 55): THREE.BufferGeometry {
  const positions = new Float32Array(count * 3);
  const phases = new Float32Array(count);
  const scales = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    // Distribute in a spherical/elliptical cloud around the knot
    const theta = Math.random() * Math.PI * 2;
    const phi = (Math.random() - 0.5) * Math.PI * 0.7;
    const radius = 2.0 + Math.random() * 2.2;

    positions[i * 3 + 0] = radius * Math.cos(theta) * Math.cos(phi);
    positions[i * 3 + 1] = radius * Math.sin(theta) * Math.cos(phi) * 0.7;
    positions[i * 3 + 2] = radius * Math.sin(phi) * 1.2;

    phases[i] = Math.random() * Math.PI * 2;
    scales[i] = 0.5 + Math.random() * 0.8;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1));
  geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

  return geometry;
}

