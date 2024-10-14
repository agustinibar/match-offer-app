import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Button from '../../components/Buttons/Button'; // Asegúrate de usar tu componente de botón personalizado
import { AppContext } from '../../context/AppContext';
import * as Location from 'expo-location';

const UserTypeSelectionScreen = ({ navigation }) => {
  const { setUserLocation } = useContext(AppContext);
  const [errorMsg, setErrorMsg] = useState(null);


  const handleUserTypeSelection = (type) => {
    navigation.navigate('Login', { userType: type });
  };

  useEffect(()=>{
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
    })();
  },[])
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/t.jpg')} style={styles.heroImage} />
      <Text style={styles.title}>¿Cómo deseas usar la aplicación?</Text>
      <Button
        title="Usar como Empresa"
        onPress={() => handleUserTypeSelection('company')}
        style={styles.button}
      />
      <Button
        title="Usar como Cliente"
        onPress={() => handleUserTypeSelection('customer')}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa', // Color de fondo suave
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#343a40', // Color de texto oscuro para mejor contraste
  },
  heroImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 24,
  },
  button: {
    width: '80%',
    marginVertical: 10,
  },
});

export default UserTypeSelectionScreen;
