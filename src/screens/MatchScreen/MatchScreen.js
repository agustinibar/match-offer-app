// screens/MatchScreen.js
import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import OfferCard from '../../components/Cards/OfferCard';

const offers = [
  { title: '50% off Pizza', description: 'Best pizza in town!', image: 'https://via.placeholder.com/150' },
  { title: 'Buy 1 Get 1 Free', description: 'Amazing burgers!', image: 'https://via.placeholder.com/150' },
];

const MatchScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {offers.map((offer, index) => (
        <OfferCard key={index} offer={offer} />
      ))}
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
