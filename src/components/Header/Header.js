// src/components/Header.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Header({ title, onBackPress }) {
  return (
    <View style={styles.header}>
      {onBackPress && (
        <TouchableOpacity onPress={onBackPress}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#007AFF',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    color: '#fff',
    fontSize: 16,
  },
});
