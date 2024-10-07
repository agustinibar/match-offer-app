import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AppContext } from '../../context/AppContext';
import { AuthContext } from '../../context/AuthContext';

const CreateOffer = () => {
  const { createOffer } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!title) {
      newErrors.title = 'El título es obligatorio';
    }
    if (!description) {
      newErrors.description = 'La descripción es obligatoria';
    }
    if (!price || isNaN(price) || Number(price) <= 0) {
      newErrors.price = 'El precio debe ser mayor a 0';
    }
    if (!category) {
      newErrors.category = 'La categoría es obligatoria';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });
    console.log(result.assets);
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0].base64;
      setImage(selectedImage);
      console.log(image);
    }
  };
  
  

  const handleSubmit = async () => {
    if (validateForm()) {
    
      const offerData = {
        title,
        description,
        price: Number(price),
        category,
        image: image ? `data:image/jpeg;base64,${image}` : null,
      };
      console.log('Datos de la oferta que se envían:', offerData);
      await createOffer(offerData);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Oferta</Text>

      <TextInput
        style={[styles.input, errors.title && styles.errorInput]}
        placeholder="Título de la oferta"
        value={title}
        onChangeText={setTitle}
      />
      {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

      <TextInput
        style={[styles.input, errors.description && styles.errorInput]}
        placeholder="Descripción de la oferta"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />
      {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

      <TextInput
        style={[styles.input, errors.price && styles.errorInput]}
        placeholder="Precio"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}

      <TextInput
        style={[styles.input, errors.category && styles.errorInput]}
        placeholder="Categoría"
        value={category}
        onChangeText={setCategory}
      />
      {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}

      <Button title='Seleccionar imagen' onPress={pickImage} styles={styles.imageButton}/>
      {/* <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.imageButtonText}>Seleccionar Imagen</Text>
      </TouchableOpacity> */}

      {image && <Image source={{ uri: `data:image/jpeg;base64,${image}` }} style={{ width: 100, height: 100, marginTop: 10 }} />} 

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Crear Oferta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  errorInput: {
    borderColor: '#E94F4F',
  },
  errorText: {
    color: '#E94F4F',
    fontSize: 12,
    marginBottom: 10,
  },
  imageButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  imageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagePreview: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginVertical: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateOffer;
