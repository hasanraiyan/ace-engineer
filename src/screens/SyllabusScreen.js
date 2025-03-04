import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SyllabusScreen = () => {
  return (
    <View style={styles.container}>
      <Text>SyllabusScreen</Text>
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

export default SyllabusScreen;
