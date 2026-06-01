/**
 * Formation definitions and metadata
 * Used by FormationBoard and lineup logic
 */

export const FORMATIONS = {
  '4-3-3': {
    id: '4-3-3',
    label: '4-3-3',
    description: 'Classic defensive formation',
    positions: {
      goalkeeper: 1,
      defender: 4,
      midfielder: 3,
      forward: 3,
    },
    positionMap: [
      // GK (1)
      { position: 'GK', x: 50, y: 10 },
      // DEF (4)
      { position: 'DEF', x: 20, y: 30 },
      { position: 'DEF', x: 40, y: 30 },
      { position: 'DEF', x: 60, y: 30 },
      { position: 'DEF', x: 80, y: 30 },
      // MID (3)
      { position: 'MID', x: 25, y: 55 },
      { position: 'MID', x: 50, y: 55 },
      { position: 'MID', x: 75, y: 55 },
      // FWD (3)
      { position: 'FWD', x: 20, y: 80 },
      { position: 'FWD', x: 50, y: 80 },
      { position: 'FWD', x: 80, y: 80 },
    ],
  },
  '3-5-2': {
    id: '3-5-2',
    label: '3-5-2',
    description: 'Wing-heavy attacking formation',
    positions: {
      goalkeeper: 1,
      defender: 3,
      midfielder: 5,
      forward: 2,
    },
    positionMap: [
      { position: 'GK', x: 50, y: 10 },
      { position: 'DEF', x: 30, y: 30 },
      { position: 'DEF', x: 50, y: 30 },
      { position: 'DEF', x: 70, y: 30 },
      { position: 'MID', x: 15, y: 50 },
      { position: 'MID', x: 40, y: 50 },
      { position: 'MID', x: 60, y: 50 },
      { position: 'MID', x: 85, y: 50 },
      { position: 'MID', x: 50, y: 65 },
      { position: 'FWD', x: 35, y: 85 },
      { position: 'FWD', x: 65, y: 85 },
    ],
  },
  '5-3-2': {
    id: '5-3-2',
    label: '5-3-2',
    description: 'Conservative defensive formation',
    positions: {
      goalkeeper: 1,
      defender: 5,
      midfielder: 3,
      forward: 2,
    },
    positionMap: [
      { position: 'GK', x: 50, y: 10 },
      { position: 'DEF', x: 15, y: 30 },
      { position: 'DEF', x: 35, y: 30 },
      { position: 'DEF', x: 50, y: 30 },
      { position: 'DEF', x: 65, y: 30 },
      { position: 'DEF', x: 85, y: 30 },
      { position: 'MID', x: 30, y: 55 },
      { position: 'MID', x: 50, y: 55 },
      { position: 'MID', x: 70, y: 55 },
      { position: 'FWD', x: 35, y: 80 },
      { position: 'FWD', x: 65, y: 80 },
    ],
  },
  '4-4-2': {
    id: '4-4-2',
    label: '4-4-2',
    description: 'Classic balanced formation',
    positions: {
      goalkeeper: 1,
      defender: 4,
      midfielder: 4,
      forward: 2,
    },
    positionMap: [
      { position: 'GK', x: 50, y: 10 },
      { position: 'DEF', x: 20, y: 30 },
      { position: 'DEF', x: 40, y: 30 },
      { position: 'DEF', x: 60, y: 30 },
      { position: 'DEF', x: 80, y: 30 },
      { position: 'MID', x: 15, y: 55 },
      { position: 'MID', x: 40, y: 55 },
      { position: 'MID', x: 60, y: 55 },
      { position: 'MID', x: 85, y: 55 },
      { position: 'FWD', x: 35, y: 80 },
      { position: 'FWD', x: 65, y: 80 },
    ],
  },
  '3-4-3': {
    id: '3-4-3',
    label: '3-4-3',
    description: 'Attacking formation with wing play',
    positions: {
      goalkeeper: 1,
      defender: 3,
      midfielder: 4,
      forward: 3,
    },
    positionMap: [
      { position: 'GK', x: 50, y: 10 },
      { position: 'DEF', x: 30, y: 30 },
      { position: 'DEF', x: 50, y: 30 },
      { position: 'DEF', x: 70, y: 30 },
      { position: 'MID', x: 15, y: 50 },
      { position: 'MID', x: 40, y: 50 },
      { position: 'MID', x: 60, y: 50 },
      { position: 'MID', x: 85, y: 50 },
      { position: 'FWD', x: 20, y: 75 },
      { position: 'FWD', x: 50, y: 75 },
      { position: 'FWD', x: 80, y: 75 },
    ],
  },
};

export const TACTICAL_STYLES = {
  'defensive': {
    label: 'Defensive',
    description: 'Focus on defense, counter-attacks',
    color: '#ff6b6b',
  },
  'balanced': {
    label: 'Balanced',
    description: 'Equal emphasis on offense and defense',
    color: '#4a9eff',
  },
  'attacking': {
    label: 'Attacking',
    description: 'Push forward, high pressing',
    color: '#51cf66',
  },
  'counter': {
    label: 'Counter Attack',
    description: 'Defensive with fast transitions',
    color: '#f9ca24',
  },
};
