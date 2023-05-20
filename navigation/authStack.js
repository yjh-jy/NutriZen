import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Entrance from '../screens/Entrance'
import Login from '../screens/Login'
import Registration from '../screens/Registration'
import PasswordRetrival from '../screens/PasswordRetrival'
import Onboarding from '../screens/Onboarding';
const Stack = createStackNavigator();

export default function AuthStack() {
    return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options = {{headerShown: false}}name="Entrance" component={Entrance} />
        <Stack.Screen options = {{headerShown: false}}name="Login" component={Login} />
        <Stack.Screen options = {{headerShown: false}}name="PasswordRetrival" component={PasswordRetrival} />
        <Stack.Screen options = {{headerShown: false}}name="Registration" component={Registration} />
        <Stack.Screen options = {{headerShown: false}}name="Onboarding" component={Onboarding} />
      </Stack.Navigator>
      </NavigationContainer>
    );
  }
