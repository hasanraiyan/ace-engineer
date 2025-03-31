// src/components/ListSeparator.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../styles/theme'; // Adjust path if needed

const ListSeparator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.separatorLight, // Use the lightest separator color
    // Indent past icon and padding: 16 (margin) + 40 (icon) + 16 (margin) = 72
    marginLeft: 72,
    // marginRight: 16, // Let parent container handle overall horizontal padding
  },
});

export default ListSeparator;