// screens/ProfileScreen.js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Input from '../../components/Inputs/Input';
import Button from '../../components/Buttons/Button';
import CreateOffer from '../../components/CreateOffer/CreateOffer';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSave = () => {
    console.log('Profile updated!');
  };

  return (
    <View style={styles.container}>
      <CreateOffer/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default ProfileScreen;
