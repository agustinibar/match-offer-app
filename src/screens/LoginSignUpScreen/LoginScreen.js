import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text, Button as RNButton } from 'react-native';
import Input from '../../components/Inputs/Input';
import Button from '../../components/Buttons/Button';
import { AuthContext } from '../../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [userType, setUserType] = useState('customer'); // Default to 'customer'
  const { login } = useContext(AuthContext);

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email inválido';
    }

    if (!password) {
      newErrors.password = 'La contraseña es obligatoria';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (validateForm()) {
      login(email, password, userType);
      navigation.replace('Home');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Ingrese su email"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <Input
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
        placeholder="Ingrese su contraseña"
        secureTextEntry
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      <View style={styles.buttonContainer}>
        <Button title="Iniciar Sesión como Empresa" onPress={() => setUserType('company')} />
        <Button title="Iniciar Sesión como Cliente" onPress={() => setUserType('customer')} />
      </View>

      <Button title="Iniciar Sesión" onPress={handleLogin} />
      <RNButton title="Registrarse" onPress={() => navigation.navigate('Register')} />
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
});

export default LoginScreen;
