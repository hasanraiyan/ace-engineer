import React, { useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, ActivityIndicator, TouchableOpacity , ScrollView } from 'react-native';
import styles from '../styles/style';
import { FontAwesome5 } from '@expo/vector-icons';
import DataContext from '../context/DataContext';

const SemesterScreen = ({ route, navigation }) => {
  // State to hold semesters
  const [semesters, setSemesters] = useState([]);

  const { branchName } = route.params || {};
  const { data, loading, error, updateData } = useContext(DataContext);

  const [headerHeight, setHeaderHeight] = useState(0);
  const scrollContentStyle = {
    marginTop: headerHeight,
  };

  const branchIcons = Object.fromEntries(
    data?.branches?.map(branch => [branch.name, branch.icon])
  )

  const branchIcon = branchIcons[branchName] || 'graduation-cap';

  const getBranchColor = () => data?.branches?.find(b => b.name === branchName)?.gradientColors || ['#1976D2', '#42a5f5'];
  const branchColor = getBranchColor()

  useEffect(() => {
    try {
      const branchData = data?.branches?.find(b => b.name === branchName);
      console.log("branch data", branchData)
      const semesterData = branchData?.semesters || [];
      setSemesters(semesterData);
    } catch (err) {
      console.error("Error processing semester data:", err);
      setSemesters([]);
    }
  }, [branchName]);

  console.log("Branch Name:", branchName);
  console.log("Data:", data);



  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2962FF" />
      </View>
    )
  }


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.headerContent} onLayout={(e) => {
        setHeaderHeight(e.nativeEvent.layout.height);
      }}>

        <View style={styles.headerTitleContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
            accessibilityLabel="Go back"
            accessibilityRole="button"
          >
            <View style={styles.backButtonCircle}>
              <FontAwesome5 name="chevron-left" size={18} color={branchColor[0]} />
            </View>
          </TouchableOpacity>
          {/* <FontAwesome5 name={branchIcon} size={32} color="#fff" style={styles.headerIcon} /> */}
          <Text style={styles.headerTitle}>{branchName}</Text>
        </View>
        <Text style={styles.subtitle}>
          Select Your Semester
        </Text>
        <Text style={styles.welcomeText}>
          Choose a semester to view subjects and resources
        </Text>
      </View>

      <Text style={{marginTop:headerHeight}}> 
        {JSON.stringify(semesters.map((semester)=> [semester.id, semester.name, semester.credits]))}
      </Text>

      


    </SafeAreaView>
  );
};

export default SemesterScreen;
