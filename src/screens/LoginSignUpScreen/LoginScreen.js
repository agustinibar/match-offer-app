import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import Input from '../../components/Inputs/Input';
import Button from '../../components/Buttons/Button';
import { AuthContext } from '../../context/AuthContext';

const LoginScreen = ({ navigation, route }) => {
  const { userType } = route.params; // Recibe el tipo de usuario desde la ruta
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
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
      login(email, password, userType); // Pasa el tipo de usuario a la función de login
      navigation.replace('Home');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/t.jpg')} style={styles.logo} />
      <Text style={styles.title}>Iniciar Sesión {userType === 'company' ? 'como Empresa' : 'como Cliente'}</Text>

      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Ingrese su email"
        style={styles.input}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <Input
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
        placeholder="Ingrese su contraseña"
        secureTextEntry
        style={styles.input}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      <Button title="Iniciar Sesión" onPress={handleLogin} style={styles.button} />

      <TouchableOpacity onPress={() => navigation.navigate('Register', { userType })} style={styles.registerButton}>
        <Text style={styles.registerText}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#ffffff', // Fondo blanco limpio
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333333', // Color de texto oscuro
  },
  input: {
    marginBottom: 12,
  },
  errorText: {
    color: '#e74c3c', // Rojo para errores
    fontSize: 12,
    marginBottom: 12,
  },
  button: {
    marginVertical: 16,
  },
  registerButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
  registerText: {
    color: '#3498db', // Color de texto azul para el botón de registro
    fontSize: 16,
  },
});

export default LoginScreen;
