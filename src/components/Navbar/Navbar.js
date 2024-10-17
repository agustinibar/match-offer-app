import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DistanceFilter from '../DistanceFilter/DistanceFilter';

const Navbar = () => {
  return (
    <View style={styles.navbar}>
      <Text style={styles.title}>Ofertas Cercanas</Text>
      <DistanceFilter />
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#3498db', // Puedes ajustar el color para que coincida con el tema de tu app
    elevation: 4, // Sombra para dispositivos Android
    shadowColor: '#000', // Sombra para dispositivos iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Navbar;