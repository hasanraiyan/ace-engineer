// src/components/ListItem.js
import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '../styles/theme'; // Adjust path if needed

const ListItemComponent = ({
  title,
  subtitle,
  onPress,
  iconName,
  iconColor,
  accessibilityLabel,
  accessibilityHint,
  useChevron = true
}) => {
  const defaultIconColor = iconColor || COLORS.primary;

  return (
    <TouchableOpacity
      style={styles.listItemContainer}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint || `Navigates to ${title} details`}
    >
      {iconName && (
        <View style={[styles.listItemIconContainer, { backgroundColor: `${defaultIconColor}20` }]}>
          <FontAwesome5 name={iconName} size={18} color={defaultIconColor} />
        </View>
      )}
      <View style={styles.listItemTextContainer}>
        <Text style={styles.listItemTitle} numberOfLines={1}>{title}</Text>
        {subtitle && <Text style={styles.listItemSubtitle} numberOfLines={1}>{subtitle}</Text>}
      </View>
      {useChevron && (
        <FontAwesome5 name="chevron-right" size={16} color={COLORS.subtleText} style={styles.listItemChevron} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginVertical: 6,
    marginHorizontal: 16,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.cardShadow,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
        backgroundColor: COLORS.card, // Needed for shadow on Android
      },
    }),
  },
  listItemIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  listItemTextContainer: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 8,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: Platform.OS === 'ios' ? '500' : 'bold',
    color: COLORS.text,
    marginBottom: 3,
  },
  listItemSubtitle: {
    fontSize: 13,
    color: COLORS.subtleText,
  },
  listItemChevron: {
    marginLeft: 'auto',
    opacity: 0.6,
    color: COLORS.subtleText,
  },
});

export default memo(ListItemComponent);