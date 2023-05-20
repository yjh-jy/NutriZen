import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DailyOverview from '../screens/DailyOverview'


const Stack = createStackNavigator();

export default function UserStack() {
    return (
        <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen options = {{headerShown: false}}name="DailyOverview" component={DailyOverview} />
        </Stack.Navigator>
        </NavigationContainer>
    );
  }