// src/App.js
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native'; // Import useColorScheme
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './src/navigation/AppNavigator';
import { getAppNavTheme, lightColors, darkColors } from './src/styles/theme'; // Adjust theme exports

export default function App() {
  const colorScheme = useColorScheme(); // 'light', 'dark', or null
  const isDarkMode = colorScheme === 'dark';
  const currentColors = isDarkMode ? darkColors : lightColors;
  const navTheme = getAppNavTheme(isDarkMode); // Function to get theme based on mode

  return (
    // Optional: Add a ThemeContext.Provider here to pass currentColors
    <NavigationContainer theme={navTheme}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={currentColors.card} // Use dynamic colors
      />
      <AppNavigator />
      {/* Pass currentColors via screenProps or context if needed in screens */}
    </NavigationContainer>
  );
}

