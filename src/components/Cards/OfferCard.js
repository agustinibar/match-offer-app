import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import logo from '../../assets/t.jpg'; // Asegúrate de que esta ruta sea correcta

const OfferCard = ({ offer, onPass, onMatch }) => {
  return (
    <View style={styles.card}>
      <Image source={logo} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{offer.title}</Text>
        <Text style={styles.description}>{offer.description}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={onPass}>
          <Text style={styles.buttonText}>Pasar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onMatch}>
          <Text style={styles.buttonText}>Matchear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff', // Fondo blanco para el card
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000', // Sombra para una mejor visibilidad
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Solo en Android
  },
  image: {
    height: 150,
    width: '100%',
    resizeMode: 'cover', // Mantiene la relación de aspecto de la imagen
  },
  info: {
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333', 
  },
  description: {
    color: '#666', 
    marginTop: 4,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0', 
  },
  button: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 4,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', 
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OfferCard;
