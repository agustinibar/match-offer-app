// src/screens/HomeScreen.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import OfferCard from '../../components/Cards/OfferCard';
import { AppContext } from '../../context/AppContext';

const HomeScreen = () => {
  const { offers, loadingOffers, currentOfferIndex, passOffer, matchOffer } = useContext(AppContext);

  if (loadingOffers) {
    return <Text>Cargando ofertas...</Text>;
  }

  const handlePass = () => {
    passOffer();
  };

  const handleMatch = () => {
    if (offers[currentOfferIndex]) {
      matchOffer(offers[currentOfferIndex]._id);
    }
  };

  if (offers.length === 0) {
    return <Text>No hay ofertas disponibles</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {offers.length > 0 && offers[currentOfferIndex] ? (
        <OfferCard
          offer={offers[currentOfferIndex]}
          onPass={handlePass}
          onMatch={handleMatch}
        />
      ) : (
        <Text>No hay más ofertas por el momento</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default HomeScreen;
