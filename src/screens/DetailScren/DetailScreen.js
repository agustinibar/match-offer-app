import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DetailOfferScreen({ route, navigation }) {
  const { offerId } = route.params; // Desestructura `offerId` de `route.params`

  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (offerId) {
      const fetchOfferDetails = async () => {
        try {
          const response = await fetch(`http://localhost:3001/offers/${offerId}`);
          const data = await response.json();
          // console.log('Offer details:', data);  // Asegúrate de que estos datos son los correctos
          setOffer(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching offer details:', error);
          setLoading(false);
        }
      };
      fetchOfferDetails();
    } else {
      console.error('No offerId provided');
      navigation.goBack(); // Redirigir si no se pasó el offerId
    }
  }, [offerId]);

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
console.log('Esta es la oferta:', offer.company)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{offer?.offer.title || 'Título no disponible'}</Text>
      <Text>{offer?.offer.description || 'Descripción no disponible'}</Text>
      <Text>{offer?.offer.price ? `Precio: ${offer.offer.price} USD` : 'Precio no disponible'}</Text>
      <Text>Category: {offer?.offer.category || 'Categoría no disponible'}</Text>
      <Text>Company: {offer?.company?.name || 'Compañía no disponible'}</Text>
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
});
