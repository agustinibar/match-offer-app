import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from '../screens/LoginSignUpScreen/RegisterScreen';
import LoginScreen from '../screens/LoginSignUpScreen/LoginScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import UserTypeSelectionScreen from '../screens/UserTypeSelectionScreen/UserTypeSelectionScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Type">
      <Stack.Screen name="Type" component={UserTypeSelectionScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
