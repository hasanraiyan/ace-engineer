import React from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import styles from '../styles/style';

const SemesterScreen = ({ route }) => {
  const { branchName, data } = route.params; 

  console.log("Branch Name:", branchName);
  console.log("Data:", data);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
      <StatusBar barStyle="light-content" />
      <Text style={{ fontSize: 24, color: 'white', fontWeight: 'bold' }}>Semester Screen</Text>
      <Text style={{ fontSize: 18, color: 'white' }}>Branch: {branchName}</Text>
    </SafeAreaView>
  );
};

export default SemesterScreen;
