export const colors = {
  // Primary palette — deep outdoor tones
  navy: '#0B1D3A',
  navyLight: '#162d4d',
  navyDark: '#071425',
  forest: '#1b4332',
  forestLight: '#2d6a4f',
  forestMuted: '#3a5a40',

  // Warm accents — earthy golds and terracotta
  gold: '#c9956b',
  goldLight: '#e0c4a8',
  goldDark: '#a0734d',
  terracotta: '#c87941',
  terracottaLight: '#e8a87c',

  // Warm neutrals — REI-inspired cream backgrounds
  cream: '#faf7f2',
  creamDark: '#f0ebe3',
  warmGray: '#e8e2d9',

  // Neutral grays
  white: '#ffffff',
  gray50: '#fafaf9',
  gray100: '#f5f3f0',
  gray200: '#e5e2dc',
  gray300: '#d1cdc6',
  gray400: '#a8a29e',
  gray600: '#57534e',
  gray700: '#44403c',
  gray800: '#292524',
};

export const gradients = {
  navyForest: `linear-gradient(135deg, ${colors.navy} 0%, ${colors.navyLight} 40%, ${colors.forest} 100%)`,
  gold: `linear-gradient(to right, ${colors.gold}, ${colors.goldLight})`,
  warmFade: `linear-gradient(180deg, ${colors.cream} 0%, ${colors.white} 100%)`,
  heroOverlay: `linear-gradient(180deg, rgba(11,29,58,0.95) 0%, rgba(27,67,50,0.9) 100%)`,
};

// Typography helpers
export const fonts = {
  serif: "'Playfair Display', Georgia, 'Times New Roman', serif",
  sans: "'Inter', system-ui, -apple-system, sans-serif",
};
