// VPD Technologies Official Brand Asset Metrics & Motion Trajectories
// Exact measurements derived from official logo (1040 x 520)
// Preserves original proportions, spacing, alignment, and brand palette.

export const VPD_LOGO_METRICS = {
  viewBox: "0 0 1040 520",
  width: 1040,
  height: 520,

  // Letter bounding boxes in the 1040x520 canvas
  vBox: { x: 24, y: 37, width: 316, height: 316 },
  pBox: { x: 320, y: 37, width: 360, height: 316 },
  dBox: { x: 680, y: 37, width: 322, height: 316 },
  technologiesBox: { x: 85, y: 442, width: 857, height: 43 },

  // Precise trajectories for stroke-dasharray and light-trail animations
  trajectories: {
    // 1. Initial traversing light beam across screen
    lightBeam: "M 0 195 Q 260 145 520 195 T 1040 195",

    // 2. V letter construction stroke: sweeps from top-left, hits vertex, rebounds to top-right
    vLeftArm: "M 54 39 L 217 352",
    vRightArm: "M 217 352 L 310 39",
    vCombined: "M 54 39 L 217 352 L 310 39",
    vGoldTip: "M 184 39 L 329 39 L 260 135 Z",
    vOuterEdge: "M 24 39 L 217 352 L 329 39",

    // 3. P letter construction stroke: stem shoots downwards, then loop sweeps out
    pStem: "M 410 39 L 410 350",
    pLoop: "M 410 90 L 585 90 C 665 90 665 215 585 215 L 410 215",
    pOuterEdge: "M 366 350 L 366 39 L 595 39 C 670 45 679 110 679 175 C 679 230 635 266 455 266",

    // 4. D letter construction stroke: spine shoots downwards, grand loop sweeps
    dStem: "M 720 39 L 720 350",
    dLoop: "M 720 90 C 950 90 970 195 950 300 L 720 300",
    dGoldArc: "M 710 348 L 880 348 C 950 340 960 290 920 275",
    dOuterEdge: "M 710 350 L 710 39 L 865 39 C 998 45 998 195 998 220 C 998 280 880 350 710 350",
  },

  // 12 letters of TECHNOLOGIES with exact horizontal spans & centers
  technologiesLetters: [
    { char: "T", startX: 85, endX: 120, width: 35, center: 102 },
    { char: "E", startX: 161, endX: 193, width: 32, center: 176 },
    { char: "C", startX: 233, endX: 271, width: 38, center: 252 },
    { char: "H", startX: 313, endX: 349, width: 36, center: 330 },
    { char: "N", startX: 392, endX: 428, width: 36, center: 410 },
    { char: "O", startX: 469, endX: 511, width: 42, center: 490 },
    { char: "L", startX: 551, endX: 582, width: 31, center: 566 },
    { char: "O", startX: 619, endX: 662, width: 43, center: 640 },
    { char: "G", startX: 701, endX: 740, width: 39, center: 720 },
    { char: "I", startX: 782, endX: 793, width: 11, center: 787 },
    { char: "E", startX: 837, endX: 869, width: 32, center: 852 },
    { char: "S", startX: 909, endX: 942, width: 33, center: 925 },
  ]
};
