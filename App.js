// src/App.js
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './src/navigation/AppNavigator';
import { AppNavTheme, IS_DARK_MODE, COLORS } from './src/styles/theme';

export default function App() {
  return (
    <NavigationContainer theme={AppNavTheme}>
      <StatusBar
        barStyle={IS_DARK_MODE ? "light-content" : "dark-content"}
        backgroundColor={COLORS.card} // Match header background explicitly
      />
      <AppNavigator />
    </NavigationContainer>
  );
}