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
    backgroundColor: '#3498db',
    elevation: 4,
    shadowColor: '#000',
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