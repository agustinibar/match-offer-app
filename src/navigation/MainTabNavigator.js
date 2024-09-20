import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import MatchOfferScreen from '../screens/MatchScreen/MatchScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import OfferScreen from '../screens/OffersScreen/OfferScreen'; // Pantalla de ofertas para empresa
import { AuthContext } from '../context/AuthContext'; // Asegúrate de tener el contexto de autenticación
import { NavigationContainer } from '@react-navigation/native';
import DetailOfferScreen from '../screens/DetailScren/DetailScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const { user } = useContext(AuthContext); // Obtén el usuario del contexto de autenticación

  // Si el usuario es una empresa, mostrar su pantalla correspondiente
  const isCompany = user?.company.type === 'company';


  return (
    <Tab.Navigator>
      {isCompany ? (
        <Tab.Screen name="Offers" component={OfferScreen} />
      ) : (
        <Tab.Screen name="Home" component={HomeScreen} />
      )}
      <Tab.Screen name="MatchOffer" component={MatchOfferScreen} />
      <Tab.Screen name="DetailOffer" component={DetailOfferScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>

  );
};

export default MainTabNavigator;
