import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SubjectScreen = () => {
  return (
    <View style={styles.container}>
      <Text>SubjectScreen</Text>
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

export default SubjectScreen;
