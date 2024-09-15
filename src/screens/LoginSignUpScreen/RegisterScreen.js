// src/screens/RegisterScreen.js
import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Input from '../../components/Inputs/Input';
import Button from '../../components/Buttons/Button';
import { AuthContext } from '../../context/AuthContext';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleRegister = () => {
    // Aquí puedes agregar la lógica de registro
    login(email, password);
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
      />
      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default RegisterScreen;
