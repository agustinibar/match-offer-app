// screens/MatchScreen.js
import React, { useContext } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { AppContext } from '../../context/AppContext'; 
import OfferCard from '../../components/Cards/OfferCard';

const MatchScreen = () => {
  const { offers, loadingOffers } = useContext(AppContext);

  if (loadingOffers) {
    return <Text>Cargando ofertas...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {offers.length > 0 ? (
        offers.map((offer) => (
          <OfferCard key={offer._id} offer={offer} />
        ))
      ) : (
        <Text>No hay ofertas disponibles</Text>
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

export default MatchScreen;

