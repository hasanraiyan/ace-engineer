// src/components/skeletons/LoadingSkeleton.js
import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonItem from './SkeletonItem'; // Import the individual skeleton item

// This component simply renders multiple SkeletonItems
const LoadingSkeletonComponent = ({ itemCount = 5 }) => {
  // Create an array of the specified length to map over
  const skeletonItems = Array.from({ length: itemCount });

  return (
    <View style={styles.container}>
      {skeletonItems.map((_, index) => (
        <SkeletonItem key={index} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Take available space
    paddingTop: 12, // Match list container padding
  },
});

export default memo(LoadingSkeletonComponent);