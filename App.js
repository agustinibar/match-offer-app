import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigation';
import { AppProvider } from './src/context/AppContext'; // Importar el proveedor de contexto
import { AuthContext, AuthProvider } from './src/context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
    <AppProvider>
      <AppNavigator />
      <StatusBar style="auto" />
    </AppProvider>
    </AuthProvider>
  );
}
