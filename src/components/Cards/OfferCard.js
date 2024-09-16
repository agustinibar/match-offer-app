// components/OfferCard.js
import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import logo from '../../assets/t.jpg';

const OfferCard = ({ offer, onPass, onMatch }) => {
  return (
    <View style={styles.card}>
      <Image source={logo} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{offer.title}</Text>
        <Text style={styles.description}>{offer.description}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button title="Pasar" onPress={onPass} />
        <Button title="Matchear" onPress={onMatch} />
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
});

export default OfferCard;
