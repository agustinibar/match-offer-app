import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { AppContext } from '../../context/AppContext';
import CreateOffer from '../../components/CreateOffer/CreateOffer';
import { AuthContext } from '../../context/AuthContext';

const ProfileScreen = () => {
  const { user } = useContext(AuthContext);
  const profileData = user?.company || user?.customer;
  console.log(user);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.title}>Perfil</Text>
      
          <Image
            source={{ uri: profileData.profileImage }} 
            style={styles.profileImage}
          />
       
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.value}>{profileData?.name || 'No disponible'}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{profileData?.email || 'No disponible'}</Text>
        </View>
        
        {user?.company && (
          <View style={styles.createOfferContainer}>
            <CreateOffer />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  profileContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 16,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  profileImage: {
    width: 100,  // Ajusta el ancho según tu diseño
    height: 100, // Ajusta la altura según tu diseño
    borderRadius: 50, // Para hacer la imagen circular
    alignSelf: 'center',
    marginBottom: 16, // Espaciado debajo de la imagen
  },
  infoContainer: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginTop: 4,
  },
  createOfferContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#DDD',
    paddingTop: 20,
  },
});

export default ProfileScreen;
