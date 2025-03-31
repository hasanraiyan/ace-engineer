// src/screens/SemesterListScreen.js
import React, { useEffect, useCallback, memo } from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';

import useDataFetching from '../hooks/useDataFetching';
import { fetchSemesters } from '../api';
import { COLORS } from '../styles/theme';

import ListItem from '../components/ListItem';
import ListSeparator from '../components/ListSeparator';
import LoadingSkeleton from '../components/skeletons/LoadingSkeleton';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';

const SemesterListScreenComponent = ({ route, navigation }) => {
  const { branchId, branchName, branchColor } = route.params;
  const { data: semesters, loading, error, reload } = useDataFetching(fetchSemesters, branchId);

  // Effect to set the header title
  useEffect(() => {
    navigation.setOptions({ title: branchName });
  }, [branchName, navigation]);

  const renderSemesterItem = useCallback(({ item }) => (
    <ListItem
      title={item.name}
      subtitle={`Subjects: ${item.subjectsCount ?? 'N/A'} | Credits: ${item.credits ?? 'N/A'}`}
      iconName="layer-group" // Consistent icon for semesters
      iconColor={branchColor || COLORS.primary} // Use passed branch color
      onPress={() => navigation.push('SubjectList', {
        branchId: branchId,
        semesterId: item.id,
        branchName: branchName,
        semesterName: item.name,
        branchColor: branchColor // Pass color down
      })}
      accessibilityHint={`Navigates to subjects in ${item.name}`}
    />
  ), [navigation, branchId, branchName, branchColor]);

  const renderEmptyState = useCallback(() => (
    <EmptyState
      message="No semesters available for this branch."
      iconName="calendar-alt"
    />
  ), []);

  // --- Render Logic ---
  if (loading && !semesters) {
    return <LoadingSkeleton itemCount={8} />;
  }

  if (error && !semesters) {
    return <ErrorMessage message={error} onRetry={() => reload({ retry: true })} />;
  }

  return (
    <SafeAreaView style={styles.screenContainer}>
      <FlatList
        data={semesters || []}
        renderItem={renderSemesterItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[
          styles.listContentContainer,
          (!semesters || semesters.length === 0) && styles.emptyListContainer
        ]}
        ItemSeparatorComponent={ListSeparator}
        refreshing={loading && !!semesters}
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

export default memo(SemesterListScreenComponent);