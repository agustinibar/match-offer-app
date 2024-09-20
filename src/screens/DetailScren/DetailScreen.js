import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DetailOfferScreen({ offerId, navigation }) {
   // Agrega este log para ver qué params se están pasando
     // Verifica si route.params existe

  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (offerId) {
      const fetchOfferDetails = async () => {
        try {
          const response = await fetch(`http://localhost:3001/offers/${offerId}`);
          const data = await response.json();
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{offer.title}</Text>
      <Text>{offer.description}</Text>
      <Text>{offer.price} USD</Text>
      <Text>Category: {offer.category}</Text>
      <Text>Company: {offer.company.companyName}</Text>
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
