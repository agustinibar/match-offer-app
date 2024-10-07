import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import MatchOfferScreen from '../screens/MatchScreen/MatchScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import OfferScreen from '../screens/OffersScreen/OfferScreen';
import DetailOfferScreen from '../screens/DetailScren/DetailScreen';
import { AuthContext } from '../context/AuthContext';
import { BottomNavigation } from 'react-native-paper';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const OfferStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Offers" component={OfferScreen} />
    <Stack.Screen name="DetailOffer" component={DetailOfferScreen} />
  </Stack.Navigator>
);

const MainTabNavigator = () => {
  const { user } = useContext(AuthContext);
  console.log("Este es el user en el MainNavigator", user)
  const isCompany = user?.type === 'company';
  console.log("isCompany:", isCompany)

   return (
    <Tab.Navigator
      // screenOptions={{
      //   tabBarStyle: { backgroundColor: 'blue' }, // Cambia el color de fondo
      // }}
    >
      {isCompany ? (
        <Tab.Screen name="Home" component={OfferStack} />
      ) : (
        <>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="MatchOffer" component={MatchOfferScreen} />
        </>
      )}
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
