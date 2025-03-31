// src/components/ErrorMessage.js
import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '../styles/theme'; // Adjust path if needed

const ErrorMessage = ({ message, onRetry }) => (
  <View style={styles.centerContainer}>
    <FontAwesome5 name="exclamation-triangle" size={40} color={COLORS.warning} style={styles.icon} />
    <Text style={styles.errorTitle}>Oops!</Text>
    <Text style={styles.errorText}>{message || "An unknown error occurred."}</Text>
    {onRetry && (
      <TouchableOpacity onPress={onRetry} style={styles.retryButton}>
        <Text style={styles.retryButtonText}>Try Again</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30, // Horizontal padding for text centering
    paddingVertical: 20,
    backgroundColor: COLORS.background,
  },
  icon: {
    marginBottom: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  errorText: {
    fontSize: 15,
    color: COLORS.subtleText,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 25,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25, // Pill shape
    marginTop: 10,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
        backgroundColor: COLORS.primary,
      },
    }),
  },
  retryButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default memo(ErrorMessage);