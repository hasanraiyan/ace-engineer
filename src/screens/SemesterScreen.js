import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SemesterScreen = () => {
  return (
    <View style={styles.container}>
      <Text>SemesterScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SemesterScreen;
