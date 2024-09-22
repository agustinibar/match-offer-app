import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import MatchOfferScreen from '../screens/MatchScreen/MatchScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import OfferScreen from '../screens/OffersScreen/OfferScreen';
import DetailOfferScreen from '../screens/DetailScren/DetailScreen';
import { AuthContext } from '../context/AuthContext';

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
  const isCompany = user?.company.type === 'company';

  return (
    <Tab.Navigator>
      {isCompany ? (
        <Tab.Screen name="Offers" component={OfferStack} />
      ) : (
        <Tab.Screen name="Home" component={HomeScreen} />
      )}
      <Tab.Screen name="MatchOffer" component={MatchOfferScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
