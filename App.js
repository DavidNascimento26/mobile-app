import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/app/navigation/AppNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#0F0F1A" />
      <AppNavigator />
    </NavigationContainer>
  );
}
