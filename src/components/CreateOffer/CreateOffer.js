import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { AuthContext } from '../../context/AuthContext';

const CreateOffer = () => {
  const { setOffers } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
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

  const handleSubmit = async () => {
    if (validateForm()) {
      const offerData = {
        title,
        description,
        price: Number(price),
        category,
      };

      try {
        const response = await fetch('http://localhost:3001/offers/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`, 
          },
          body: JSON.stringify(offerData),
        });

        if (response.ok) {
          const newOffer = await response.json();
          Alert.alert('Éxito', 'Oferta creada exitosamente');
          setOffers(prevOffers => [...prevOffers, newOffer.offer]);
        } else {
          const errorData = await response.json();
          Alert.alert('Error', errorData.message || 'Error al crear la oferta');
        }
      } catch (error) {
        Alert.alert('Error', 'Error al conectar con el servidor');
      }
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
