import React, { useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import styles from '../styles/style';

import DataContext from '../context/DataContext';

const SemesterScreen = ({ route, navigation }) => {
  // State to hold semesters
  const [semesters, setSemesters] = useState([]);

  const { branchName } = route.params || {};
  const { data } = useContext(DataContext);

  const branchIcons = Object.fromEntries(
    data?.branches?.map(branch => [branch.name, branch.icon])
  )

  const branchIcon = branchIcons[branchName] || 'graduation-cap';

  const getBranchColor = () => data?.branches?.find(b => b.name === branchName)?.gradientColors || ['#1976D2', '#42a5f5'];
  const branchColor = getBranchColor()

  useEffect(() => {
    try {
      const branchData = data?.branches?.find(b => b.name === branchName);
      const semesterData = branchData?.semsters || [];
      setSemesters(semesterData);
    } catch (err) {
      console.error("Error processing semester data:", err);
      setSemesters([]);
    }
  }, [branchName]);

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
