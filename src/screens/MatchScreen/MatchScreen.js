import React, { useContext, useCallback, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Button, Modal } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { useFocusEffect } from '@react-navigation/native';
import Chat from '../../components/Chat/Chat'; // Importamos el componente Chat

const MatchScreen = () => {
  const { matches, fetchMatches } = useContext(AppContext);
  const [selectedMatch, setSelectedMatch] = useState(null); // Para manejar el match seleccionado
  const [isChatVisible, setIsChatVisible] = useState(false); // Para controlar el estado del modal

  // Hook para ejecutar cuando la pantalla toma foco
  useFocusEffect(
    useCallback(() => {
      fetchMatches();
    }, [])
  );

  const openChat = (match) => {
    setSelectedMatch(match); // Guardamos el match seleccionado
    setIsChatVisible(true);  // Abrimos el modal
  };

  const closeChat = () => {
    setIsChatVisible(false); // Cerramos el modal
    setSelectedMatch(null);  // Limpiamos el match seleccionado
  };

  return (
    <View style={styles.container}>
      {matches.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image source={require('../../assets/t.jpg')} style={styles.emptyImage} />
          <Text style={styles.emptyText}>No hay matches disponibles</Text>
        </View>
      ) : (
        <FlatList
          data={matches}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.matchCard}>
              <Image source={require('../../assets/t.jpg')} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.title}>{item.offer.title}</Text>
                <Text style={styles.description}>{item.offer.description}</Text>
                <Text style={styles.price}>${item.offer.price}</Text>
                {/* Botón para abrir el chat */}
                <Button
                  title="Chat"
                  onPress={() => openChat(item)} // Al hacer clic pasamos el match seleccionado
                />
              </View>
            </View>
          )}
        />
      )}

      {/* Modal para el chat */}
      <Modal
        visible={isChatVisible}
        animationType="slide"
        onRequestClose={closeChat} // Al presionar 'atrás' en Android cierra el modal
        transparent={true} // Hace el fondo del modal semi-transparente
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            {selectedMatch && ( // Solo mostramos el chat si hay un match seleccionado
              <Chat match={selectedMatch} closeChat={closeChat} />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
    tintColor: '#aaa',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
  },
  matchCard: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    color: '#27ae60',
    fontWeight: 'bold',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente
  },
  modalContainer: {
    width: '80%', // El modal ocupa el 80% del ancho
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});

export default MatchScreen;
