// screens/ProfileScreen.js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Input from '../../components/Inputs/Input';
import Button from '../../components/Buttons/Button';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSave = () => {
    console.log('Profile updated!');
  };

  return (
    <View style={styles.container}>
      <Input label="Name" value={name} onChangeText={setName} placeholder="Enter your name" />
      <Input label="Email" value={email} onChangeText={setEmail} placeholder="Enter your email" />
      <Button title="Save Profile" onPress={handleSave} />
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
