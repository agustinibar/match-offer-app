import React, { useCallback, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import OfferCard from '../../components/Cards/OfferCard';
import { AppContext } from '../../context/AppContext';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../../components/Navbar/Navbar';

const HomeScreen = () => {
  const { offers, loadingOffers, currentOfferIndex, passOffer, matchOffer, fetchMatches } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const { userLocation } = useContext(AppContext);



  const handlePass = () => {
    passOffer();
  };

  useFocusEffect(
    useCallback(() => {
      fetchMatches();
    }, [])
  );

  const handleMatch = () => {
    if (offers[currentOfferIndex]) {
      matchOffer(offers[currentOfferIndex]._id);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Navbar />
      {loadingOffers ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498db" />
          <Text style={styles.loadingText}>Cargando ofertas...</Text>
        </View>
      ) : offers.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay ofertas disponibles</Text>
        </View>
      ) : (
        <OfferCard
          offer={offers[currentOfferIndex]}
          onPass={handlePass}
          onMatch={handleMatch}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#3498db',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
  },
});

export default HomeScreen;