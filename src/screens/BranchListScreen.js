// src/screens/BranchListScreen.js
import React, { useCallback, memo } from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';

import useDataFetching from '../hooks/useDataFetching';
import { fetchBranches } from '../api';
import { COLORS } from '../styles/theme';

import ListItem from '../components/ListItem';
import ListSeparator from '../components/ListSeparator';
import LoadingSkeleton from '../components/skeletons/LoadingSkeleton';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';

const BranchListScreenComponent = ({ navigation }) => {
  const { data: branches, loading, error, reload } = useDataFetching(fetchBranches);

  const renderBranchItem = useCallback(({ item }) => {
    const iconName = {
      "project-diagram": "project-diagram", "code": "code", "bolt": "bolt",
      "cogs": "cogs", "building": "building"
    }[item.icon] || "graduation-cap";
    const branchColor = item.color || COLORS.primary;

    return (
      <ListItem
        title={`${item.name} (${item.id})`}
        subtitle={item.description}
        iconName={iconName}
        iconColor={branchColor}
        onPress={() => navigation.push('SemesterList', {
          branchId: item.id,
          branchName: item.name,
          branchColor: branchColor
        })}
        accessibilityHint={`Navigates to semesters for ${item.name}`}
      />
    );
  }, [navigation]); // navigation is stable

  const renderEmptyState = useCallback(() => (
    <EmptyState
      message="No branches available. Please try again later."
      iconName="school"
    />
  ), []);

  // --- Render Logic ---
  if (loading && !branches) {
    // Show skeleton only on initial load
    return <LoadingSkeleton itemCount={6} />;
  }

  if (error && !branches) {
    // Show full screen error only if data never loaded
    return <ErrorMessage message={error} onRetry={() => reload({ retry: true })} />;
  }

  return (
    <SafeAreaView style={styles.screenContainer}>
      <FlatList
        data={branches || []}
        renderItem={renderBranchItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.listContentContainer,
          // Apply empty container styles if list is empty
          (!branches || branches.length === 0) && styles.emptyListContainer
        ]}
        ItemSeparatorComponent={ListSeparator}
        // Show pull-to-refresh indicator only when reloading existing data
        refreshing={loading && !!branches}
        // Pull-to-refresh is not a retry (don't clear data visually)
        onRefresh={() => reload({ retry: false })}
        ListEmptyComponent={!loading ? renderEmptyState : null} // Show empty state only when not loading
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
    flexGrow: 1, // Allows EmptyState component to center vertically
    justifyContent: 'center',
    paddingBottom: 50, // Add some padding if centered
  },
});

export default memo(BranchListScreenComponent);