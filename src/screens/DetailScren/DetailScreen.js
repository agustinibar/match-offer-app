import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Modal } from 'react-native';
import Chat from '../../components/Chat/Chat'; // Importamos el componente de chat

export default function DetailOfferScreen({ route, navigation }) {
  const { offerId } = route.params;

  const [offer, setOffer] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chatVisible, setChatVisible] = useState(false); 
  const [selectedMatch, setSelectedMatch] = useState(null); 

  useEffect(() => {
    if (offerId) {
      const fetchOfferDetails = async () => {
        try {
          const offerResponse = await fetch(`http://localhost:3001/offers/${offerId}`);
          const offerData = await offerResponse.json();
          setOffer(offerData);

          const matchesResponse = await fetch(`http://localhost:3001/match/${offerId}`);
          const matchesData = await matchesResponse.json();
          setMatches(matchesData.matches);

          setLoading(false);
        } catch (error) {
          console.error('Error fetching offer details or matches:', error);
          setLoading(false);
        }
      };
      fetchOfferDetails();
    } else {
      console.error('No offerId provided');
      navigation.goBack();
    }
  }, [offerId]);

  const openChat = (match) => {
    setSelectedMatch(match); 
    setChatVisible(true);    
  };

  const closeChat = () => {
    setChatVisible(false);  
    // setSelectedMatch(null);  
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading offer details...</Text>
      </View>
    );
  }

  if (!offer) {
    return (
      <View style={styles.container}>
        <Text>No offer details found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{offer?.offer.title || 'Título no disponible'}</Text>
      <Text>{offer?.offer.description || 'Descripción no disponible'}</Text>
      <Text>{offer?.offer.price ? `Precio: ${offer.offer.price} USD` : 'Precio no disponible'}</Text>
      <Text>Category: {offer?.offer.category || 'Categoría no disponible'}</Text>
      <Text>Company: {offer?.company?.name || 'Compañía no disponible'}</Text>

      <Text style={styles.subtitle}>Matches: {matches?.length}</Text>

      {matches && matches.length > 0 ? (
        matches.map((match) => (
          <View key={match._id} style={styles.matchContainer}>
            <Text>Cliente: {match.customer?.name || 'Nombre no disponible'}</Text>
            <Text>Email: {match.customer?.email || 'Email no disponible'}</Text>
            <Text>Matched At: {new Date(match.matchedAt).toLocaleDateString()}</Text>
            <Button title="Chat" onPress={() => openChat(match)} />
          </View>
        ))
      ) : (
        <Text>No hay matches</Text>
      )}

      {/* Componente emergente del chat */}
      <Modal
        visible={chatVisible}
        animationType="slide"
        onRequestClose={closeChat}
        transparent={true} 
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Chat match={selectedMatch} closeChat={closeChat} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  matchContainer: {
    marginTop: 10,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
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
