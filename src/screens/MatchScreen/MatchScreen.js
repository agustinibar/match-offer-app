import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { AppContext } from '../../context/AppContext';

const MatchScreen = () => {
  const { matches } = useContext(AppContext);

  return (
    <View style={styles.container}>
      {matches.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image source={require('../../assets/t.jpg')} style={styles.emptyImage} />
          <Text style={styles.emptyText}>No hay matches disponibles</Text>
        </View>
      ) : (
        <FlatList
          data={matches}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.matchCard}>
              <Image source={require('../../assets/t.jpg')} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.title}>{item.offer.title}</Text>
                <Text style={styles.description}>{item.offer.description}</Text>
                <Text style={styles.price}>${item.offer.price}</Text>
              </View>
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
    backgroundColor: '#f5f5f5',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
    tintColor: '#aaa',
  },
  emptyText: {
    fontSize: 18,
    color: '#888', 
  },
  matchCard: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff', 
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, 
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', 
  },
  description: {
    fontSize: 16,
    color: '#666', 
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    color: '#27ae60', 
    fontWeight: 'bold',
  },
});

export default MatchScreen;
