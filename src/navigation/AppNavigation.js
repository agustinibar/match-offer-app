import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import OfferScreen from '../screens/OffersScreen/OfferScreen';
import MatchScreen from '../screens/MatchScreen/MatchScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import LoginScreen from '../screens/LoginSignUpScreen/LoginScreen';
import RegisterScreen from '../screens/LoginSignUpScreen/RegisterScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Offer" component={OfferScreen} />
        <Stack.Screen name="Match" component={MatchScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
