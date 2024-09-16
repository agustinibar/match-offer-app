import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text, Button as RNButton } from 'react-native';
import Input from '../../components/Inputs/Input';
import Button from '../../components/Buttons/Button';
import { AuthContext } from '../../context/AuthContext';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { register } = useContext(AuthContext);

  const validateForm = () => {
    const newErrors = {};

    if (!name) {
      newErrors.name = 'El nombre es obligatorio';
    }

    if (!email) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email inválido';
    }

    if (!password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = (type) => {
    if (validateForm()) {
      const userData = {
        name,
        email,
        password,
      };
      register(userData, type);
      navigation.replace('Home');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <Input
        label="Nombre"
        value={name}
        onChangeText={setName}
        placeholder="Ingrese su nombre o el nombre de la empresa"
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

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

      <Input
        label="Confirmar Contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirme su contraseña"
        secureTextEntry
      />
      {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

      <Button title="Registrar Cliente" onPress={() => handleRegister('customer')} />
      <Button title="Registrar Empresa" onPress={() => handleRegister('company')} />
      <RNButton title="Iniciar sesión" onPress={() => navigation.navigate('Login')} />
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
    marginBottom: 8,
  },
});

export default RegisterScreen;
