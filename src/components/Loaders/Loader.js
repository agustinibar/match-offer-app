// src/components/Loader.js
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function Loader() {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
