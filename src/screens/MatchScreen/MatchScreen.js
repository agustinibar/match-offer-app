import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { AppContext } from '../../context/AppContext';

const MatchScreen = () => {
  const { matches } = useContext(AppContext); // Obtenemos matches directamente

  return (
    <View style={styles.container}>
      {matches.length === 0 ? (
        <Text>No hay matches disponibles</Text>
      ) : (
        <FlatList
          data={matches}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.matchCard}>
              <Text style={styles.title}>{item.offer.title}</Text>
              <Text style={styles.description}>{item.offer.description}</Text>
              <Text style={styles.price}>${item.offer.price}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  matchCard: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginVertical: 5,
  },
  price: {
    fontSize: 14,
    color: 'green',
  },
});

export default MatchScreen;
