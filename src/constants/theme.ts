import { MD3LightTheme } from 'react-native-paper';

export const colors = {
  primary: '#4CAF50', // Changed from red to a friendly green
  secondary: '#4ECDC4',
  accent: '#45B7D1',
  background: '#E8F5E8', // Light green background
  surface: '#F0FFF0', // Very light green for surfaces
  text: '#2C3E50',
  textLight: '#7F8C8D',
  success: '#2ECC71',
  warning: '#F39C12',
  error: '#E74C3C',
  
  // Child-friendly colors
  pink: '#FF69B4',
  purple: '#9B59B6',
  blue: '#3498DB',
  green: '#2ECC71',
  yellow: '#F1C40F',
  orange: '#FF8C42',
  coral: '#FF7F7F',
  mint: '#98FB98',
  lavender: '#E6E6FA',
  peach: '#FFCBA4',
  
  // Additional green shades for the theme
  lightGreen: '#E8F5E8',
  paleGreen: '#F0FFF0',
  forestGreen: '#228B22',
  springGreen: '#00FF7F',
};

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
    secondary: colors.secondary,
    background: colors.background,
    surface: colors.surface,
    onSurface: colors.text,
    onBackground: colors.text,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};