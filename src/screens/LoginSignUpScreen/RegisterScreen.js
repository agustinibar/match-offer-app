import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Input from '../../components/Inputs/Input';
import { AuthContext } from '../../context/AuthContext';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState(null); 
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

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true, // Aseguramos que se obtenga la imagen en base64
    });
  
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0].base64; // Accedemos a la imagen en base64 correctamente
      setImage(selectedImage);
    }
  };

  const handleRegister = (type) => {
    if (validateForm()) {
      const userData = {
        name,
        email,
        password,
        profileImage: image ? `data:image/jpeg;base64,${image}` : null, // Formato base64 para enviar al backend
      };
      console.log(userData)
      register(userData, type);
      navigation.replace('Type');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/t.jpg')} style={styles.logo} />
      <Text style={styles.title}>Registro</Text>

      <Input
        label="Nombre"
        value={name}
        onChangeText={setName}
        placeholder="Ingrese su nombre o el nombre de la empresa"
        style={styles.input}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

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

      <Input
        label="Confirmar Contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirme su contraseña"
        secureTextEntry
        style={styles.input}
      />
      {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

      <Button title="Seleccionar Imagen" onPress={handleImagePick} />

      {image && <Image source={{ uri: `data:image/jpeg;base64,${image}` }} style={{ width: 100, height: 100, marginTop: 10 }} />}

      <Button title="Registrar Cliente" onPress={() => handleRegister('customer')} style={styles.button} />
      <Button title="Registrar Empresa" onPress={() => handleRegister('company')} style={styles.button} />

      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginButton}>
        <Text style={styles.loginText}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#ffffff', 
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
    color: '#333333', 
  },
  input: {
    marginBottom: 12,
  },
  errorText: {
    color: '#e74c3c', 
    fontSize: 12,
    marginBottom: 12,
  },
  button: {
    marginVertical: 8,
  },
  loginButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
  loginText: {
    color: '#3498db', 
    fontSize: 16,
  },
});

export default RegisterScreen;