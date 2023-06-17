import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Entrance from '../screens/authentication/Entrance';
import Login from '../screens/authentication/Login';
import Registration from '../screens/authentication/Registration';
import PasswordRetrival from '../screens/authentication/PasswordRetrival';

const Stack = createStackNavigator();

export default function AuthStack() {
    return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options = {{headerShown: false}}name="Entrance" component={Entrance} />
        <Stack.Screen options = {{headerShown: false}}name="Login" component={Login} />
        <Stack.Screen options = {{headerShown: false}}name="PasswordRetrival" component={PasswordRetrival} />
        <Stack.Screen options = {{headerShown: false}}name="Registration" component={Registration} />
      </Stack.Navigator>
      </NavigationContainer>
    );
  }
