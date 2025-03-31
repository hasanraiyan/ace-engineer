// src/components/EmptyState.js
import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '../styles/theme'; // Adjust path if needed

const EmptyStateComponent = ({ message, iconName }) => (
  <View style={styles.centerContainer}>
    <FontAwesome5 name={iconName || "list"} size={40} color={COLORS.subtleText} style={styles.icon} />
    <Text style={styles.emptyStateTitle}>Nothing to show</Text>
    <Text style={styles.emptyStateText}>{message || "No items found."}</Text>
  </View>
);

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1, // Necessary for centering within FlatList's ListEmptyComponent container
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 40, // Add some padding from the bottom
    // backgroundColor: COLORS.background, // Background set by parent screen
  },
  icon: {
    marginBottom: 20,
    opacity: 0.7,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: COLORS.subtleText,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default memo(EmptyStateComponent);