// components/OfferCard.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const OfferCard = ({ offer }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: offer.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{offer.title}</Text>
        <Text style={styles.description}>{offer.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  image: {
    height: 150,
    width: '100%',
  },
  info: {
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  description: {
    color: '#888',
    marginTop: 4,
  },
});

export default OfferCard;
