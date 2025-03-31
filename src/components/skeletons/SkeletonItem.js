// src/components/skeletons/SkeletonItem.js
import React, { memo } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { COLORS } from '../../styles/theme'; // Adjust path if needed

// Note: This Skeleton uses similar layout to ListItem for consistency
const SkeletonItemComponent = () => {
  return (
    <View style={styles.listItemContainer}>
      {/* Icon Placeholder */}
      <View style={[styles.listItemIconContainer, { backgroundColor: COLORS.skeleton }]} />
      {/* Text Placeholders */}
      <View style={styles.listItemTextContainer}>
        <View style={[styles.skeletonLine, styles.skeletonTitle]} />
        <View style={[styles.skeletonLine, styles.skeletonSubtitle]} />
      </View>
      {/* Chevron Placeholder (Optional) */}
      {/* <View style={styles.skeletonChevron} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  listItemContainer: { // Match ListItem styling
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card, // Match card background
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginVertical: 6,
    marginHorizontal: 16,
    borderRadius: 12,
    // Apply subtle shadow/elevation if desired, matching ListItem
    ...Platform.select({
      ios: {
        shadowColor: COLORS.cardShadow,
        shadowOffset: { width: 0, height: 2 }, // Lighter offset for skeleton
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 1, // Minimal elevation
        backgroundColor: COLORS.card,
      },
    }),
  },
  listItemIconContainer: { // Match ListItem icon size/shape
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
    // Background set inline
  },
  listItemTextContainer: { // Match ListItem text area
    flex: 1,
    justifyContent: 'center',
    marginRight: 8,
  },
  skeletonLine: {
    backgroundColor: COLORS.skeleton,
    borderRadius: 4,
    height: 14, // Default line height
  },
  skeletonTitle: {
    width: '70%',
    height: 16, // Slightly taller for title
    marginBottom: 8, // Space between lines
    backgroundColor: COLORS.skeletonHighlight, // Use highlight color for title
  },
  skeletonSubtitle: {
    width: '90%',
    height: 12, // Slightly shorter for subtitle
  },
  // Optional: Chevron placeholder
  // skeletonChevron: {
  //   width: 10,
  //   height: 16,
  //   borderRadius: 3,
  //   backgroundColor: COLORS.skeleton,
  //   marginLeft: 'auto',
  // },
});

export default memo(SkeletonItemComponent);