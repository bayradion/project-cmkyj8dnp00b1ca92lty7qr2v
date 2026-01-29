export const colors = {
  primary: '#4CAF50', // Changed to green shade
  primaryDark: '#2E7D32',
  primaryLight: '#81C784',
  secondary: '#FF9800',
  secondaryLight: '#FFB74D',
  background: '#F8F9FA',
  surface: '#FFFFFF',
  text: '#212121',
  textLight: '#757575',
  textDark: '#000000',
  error: '#F44336',
  warning: '#FF9800',
  success: '#4CAF50',
  info: '#2196F3',
  border: '#E0E0E0',
  shadow: 'rgba(0, 0, 0, 0.1)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 50,
};

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 28,
};

export const theme = {
  colors: {
    ...colors,
    primary: colors.primary,
    accent: colors.secondary,
    background: colors.background,
    surface: colors.surface,
    text: colors.text,
    disabled: colors.textLight,
    placeholder: colors.textLight,
    backdrop: 'rgba(0, 0, 0, 0.5)',
  },
  fonts: {
    regular: {
      fontFamily: 'System',
      fontWeight: 'normal' as const,
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500' as const,
    },
    bold: {
      fontFamily: 'System',
      fontWeight: 'bold' as const,
    },
  },
  roundness: borderRadius.md,
};