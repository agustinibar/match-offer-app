import React, { useContext, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AppContext } from '../../context/AppContext';
import { useNavigation } from '@react-navigation/native'; 

export default function OfferScreen() {
  const { companyOffers, loadingOffers, fetchCompanyOffers } = useContext(AppContext);
  const navigation = useNavigation(); 

  useEffect(() => {
    fetchCompanyOffers();
    console.log(companyOffers);
  }, []);

  if (loadingOffers) {
    return (
      <View style={styles.container}>
        <Text>Loading offers...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ofertas Activas</Text>
      {companyOffers.length > 0 ? (
        <FlatList
          data={companyOffers}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('DetailOffer', { offerId: item._id })} 
              style={styles.offerCard}
            >
              <Image source={item.imageUrl}  style={styles.offerImage}  />
              <Text style={styles.offerTitle}>{item.title}</Text>
              <Text>{item.description}</Text>
              <Text>{item.price} USD</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text>No active offers at the moment.</Text>
      )}
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
  offerCard: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  offerImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
