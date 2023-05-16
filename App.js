import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Entrance from './components/Entrance'
import Login from './components/Login'
import DailyOverview from './components/DailyOverview'
import Registration from './components/Registration'
import PasswordRetrival from './components/PasswordRetrival'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen options = {{headerShown: false}}name="Entrance" component={Entrance} />
        <Stack.Screen options = {{headerShown: false}}name="Login" component={Login} />
        <Stack.Screen options = {{headerShown: false}}name="Registration" component={Registration} />
        <Stack.Screen options = {{headerShown: false}}name="DailyOverview" component={DailyOverview} />
        <Stack.Screen options = {{headerShown: false}}name="PasswordRetrival" component={PasswordRetrival} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
