// src/screens/SubjectListScreen.js
import React, { useEffect, useCallback, memo } from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';

import useDataFetching from '../hooks/useDataFetching';
import { fetchSubjects } from '../api';
import { COLORS } from '../styles/theme';

import ListItem from '../components/ListItem';
import ListSeparator from '../components/ListSeparator';
import LoadingSkeleton from '../components/skeletons/LoadingSkeleton';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';

const SubjectListScreenComponent = ({ route, navigation }) => {
  const { branchId, semesterId, semesterName, branchColor } = route.params;
  const { data: subjects, loading, error, reload } = useDataFetching(fetchSubjects, branchId, semesterId);

  // Effect to set the header title
  useEffect(() => {
    navigation.setOptions({ title: semesterName });
  }, [semesterName, navigation]);

  const renderSubjectItem = useCallback(({ item }) => {
    const iconName = item.type === 'Theory' ? 'book' : 'flask'; // Icon based on subject type
    return (
      <ListItem
        title={item.name}
        subtitle={`Code: ${item.course_code} | Credits: ${item.credits} | ${item.type}`}
        iconName={iconName}
        iconColor={branchColor || COLORS.primary} // Use passed branch color
        onPress={() => navigation.push('SubjectDetail', {
          branchId,
          semesterId,
          subjectCode: item.course_code,
          subjectName: item.name
        })}
        accessibilityHint={`Navigates to details for subject ${item.name}`}
      />
    );
  }, [navigation, branchId, semesterId, branchColor]);

  const renderEmptyState = useCallback(() => (
    <EmptyState
      message="No subjects available for this semester."
      iconName="book"
    />
  ), []);

  // --- Render Logic ---
  if (loading && !subjects) {
    return <LoadingSkeleton itemCount={10} />;
  }

  if (error && !subjects) {
    return <ErrorMessage message={error} onRetry={() => reload({ retry: true })} />;
  }

  return (
    <SafeAreaView style={styles.screenContainer}>
      <FlatList
        data={subjects || []}
        renderItem={renderSubjectItem}
        keyExtractor={(item) => item.course_code.toString()}
        contentContainerStyle={[
          styles.listContentContainer,
          (!subjects || subjects.length === 0) && styles.emptyListContainer
        ]}
        ItemSeparatorComponent={ListSeparator}
        refreshing={loading && !!subjects}
        onRefresh={() => reload({ retry: false })}
        ListEmptyComponent={!loading ? renderEmptyState : null}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContentContainer: {
    paddingVertical: 12,
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 50,
  },
});

export default memo(SubjectListScreenComponent);