// src/styles/theme.js
import { Appearance } from 'react-native';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';

// --- Theme Colors (Tailwind-inspired) ---
export const lightColors = {
  primary: '#2563EB', // Blue 600
  background: '#F9FAFB', // Gray 50
  card: '#FFFFFF', // White
  text: '#111827', // Gray 900
  subtleText: '#6B7280', // Gray 500
  separator: '#E5E7EB', // Gray 200
  separatorLight: '#F3F4F6', // Gray 100
  error: '#EF4444', // Red 500
  success: '#10B981', // Emerald 500
  warning: '#F59E0B', // Amber 500
  white: '#FFFFFF',
  black: '#000000',
  disabled: '#D1D5DB', // Gray 300
  accentBackground: '#DBEAFE', // Blue 100
  cardShadow: 'rgba(0, 0, 0, 0.05)',
  skeleton: '#E5E7EB',
  skeletonHighlight: '#F3F4F6',
};

export const darkColors = {
  primary: '#3B82F6', // Blue 500
  background: '#111827', // Gray 900
  card: '#1F2937', // Gray 800
  text: '#F9FAFB', // Gray 50
  subtleText: '#9CA3AF', // Gray 400
  separator: '#374151', // Gray 700
  separatorLight: '#4B5563', // Gray 600
  error: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B',
  white: '#FFFFFF',
  black: '#000000',
  disabled: '#4B5563',
  accentBackground: '#1E3A8A', // Blue 900
  cardShadow: 'rgba(0, 0, 0, 0.3)',
  skeleton: '#374151',
  skeletonHighlight: '#4B5563',
};

// --- App Theme Setup ---
const colorScheme = Appearance.getColorScheme();
export const IS_DARK_MODE = colorScheme === 'dark';
export const COLORS = IS_DARK_MODE ? darkColors : lightColors;

// --- Navigation Theme ---
export const AppNavTheme = {
  ...(IS_DARK_MODE ? DarkTheme : DefaultTheme),
  colors: {
    ...(IS_DARK_MODE ? DarkTheme.colors : DefaultTheme.colors),
    primary: COLORS.primary,
    background: COLORS.background,
    card: COLORS.card,
    text: COLORS.text,
    border: COLORS.separator, // Used for header bottom border
  },
};

// Export a function to generate the nav theme
export const getAppNavTheme = (isDarkMode) => {
  const themeColors = isDarkMode ? darkColors : lightColors;
  const baseNavTheme = isDarkMode ? DarkTheme : DefaultTheme;
  return {
    ...baseNavTheme,
    colors: {
      ...baseNavTheme.colors,
      primary: themeColors.primary,
      background: themeColors.background,
      card: themeColors.card,
      text: themeColors.text,
      border: themeColors.separator,
    },
  };
};