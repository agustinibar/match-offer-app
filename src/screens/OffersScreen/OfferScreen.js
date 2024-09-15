import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppContext } from '../../context/AppContext';

export default function OfferScreen() {
  const { selectedOffer } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <Text>Here are your offers!</Text>
      {selectedOffer ? <Text>Selected Offer: {selectedOffer}</Text> : <Text>No offer selected</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
