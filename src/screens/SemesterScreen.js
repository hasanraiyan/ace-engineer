import React, { useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, ActivityIndicator, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { DataContext } from '../context/DataProvider';
import {styles} from '../styles/style';

const SemesterScreen = ({ route, navigation }) => {
  const [semesters, setSemesters] = useState([]);
  const { branchName, branchId } = route.params || {};
  const { data, loading, error, updateData } = useContext(DataContext);
  const [headerHeight, setHeaderHeight] = useState(0);

  const branchIcons = Object.fromEntries(
    data?.branches?.map(branch => [branch.name, branch.icon])
  );
  const branchIcon = branchIcons[branchName] || 'graduation-cap';

  const getBranchColor = () => data?.branches?.find(b => b.name === branchName)?.gradientColors || ['#1976D2', '#42a5f5'];
  const branchColor = getBranchColor();

  useEffect(() => {
    try {
      const branchData = data?.branches?.find(b => b.name === branchName);
      const semesterData = branchData?.semesters || [];
      setSemesters(semesterData);
    } catch (err) {
      console.error("Error processing semester data:", err);
      setSemesters([]);
    }
  }, [branchName]);

  const SemesterCard = ({ semesterName, semesterId, subjectsCount, credits, onPress }) => {

    return (
      <View style={styles.branchCardContainer}>
        <TouchableOpacity
          style={[styles.semesterButton, { borderLeftColor: branchColor[0] }]}
          onPress={onPress}
          activeOpacity={0.8}
        >
          <View style={styles.semesterInfo}>
            <Text style={styles.semesterText}>{semesterName}</Text>
            <Text style={styles.semesterDetails}>
              {subjectsCount} Subjects
              {credits && credits !== 0 ? ` • ${credits} Credits` : null}
            </Text>
          </View>
          <View style={[styles.semesterNumberCircle, { backgroundColor: branchColor[0] }]}>
            <Text style={[styles.semesterNumber]}>
              {subjectsCount}
            </Text>
          </View>
          <FontAwesome5 name="chevron-right" size={14} color={branchColor[1]} style={styles.chevron} />
        </TouchableOpacity>
      </View>
    )
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2962FF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={[styles.headerContent, { backgroundColor: branchColor[0] }]} onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}>
        <View style={styles.headerTitleContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.7} accessibilityLabel="Go back" accessibilityRole="button">
            <View style={styles.backButtonCircle}>
              <FontAwesome5 name="chevron-left" size={18} color={branchColor[0]} />
            </View>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{branchId}</Text>
        </View>
        <View style={styles.headerSubtitleContainer}>
          <Text style={styles.subtitle}>{branchName}</Text>
          <Text style={styles.welcomeText}>Choose a semester to view subjects and resources</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={[styles.scrollContent, { marginTop: headerHeight }]}>
        {semesters.map((semester) => {
          return (
            <SemesterCard
              key={semester.id} // Ensure each child has a unique key
              semesterName={semester.name}
              semesterId={semester.id}
              subjectsCount={semester.subjectsCount}
              credits={semester.credits}
              onPress={() => { // Consider using useCallback to prevent unnecessary re-renders
                if (data) {
                  navigation.navigate('Subject', { semester, branchName, semesterId: semester?.semesterId });
                } else {
                  console.warn('Data is not yet loaded, navigation prevented.');
                }
              }}
            />
          )
        })}
      </ScrollView>

    </SafeAreaView>
  );
};

export default SemesterScreen;
