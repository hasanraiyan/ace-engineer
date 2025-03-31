// src/navigation/AppNavigator.js
import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

// Import Screens
import BranchListScreen from '../screens/BranchListScreen';
import SemesterListScreen from '../screens/SemesterListScreen';
import SubjectListScreen from '../screens/SubjectListScreen';
import SubjectDetailScreen from '../screens/SubjectDetailScreen';

// Import Theme
import { COLORS } from '../styles/theme';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="BranchList"
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: COLORS.separatorLight,
          elevation: 0,
          shadowOpacity: 0,
          backgroundColor: COLORS.card,
        },
        headerTintColor: COLORS.primary,
        headerTitleStyle: {
          color: COLORS.text,
          fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
        },
        cardStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen
        name="BranchList"
        component={BranchListScreen}
        options={{ title: 'Engineering' }}
      />
      <Stack.Screen name="SemesterList" component={SemesterListScreen} />
      <Stack.Screen name="SubjectList" component={SubjectListScreen} />
      <Stack.Screen name="SubjectDetail" component={SubjectDetailScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;