import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Onboarding1 from '../screens/onboarding/Onboarding1'
import Onboarding2 from '../screens/onboarding/Onboarding2'
import Onboarding3 from '../screens/onboarding/Onboarding3'
import Onboarding4 from '../screens/onboarding/Onboarding4'
import Onboarding5 from '../screens/onboarding/Onboarding5'


const Stack = createStackNavigator();

export default function OnboardingStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen options = {{headerShown: false}}name="Onboarding1" component={Onboarding1}/>
                <Stack.Screen options = {{headerShown: false}}name="Onboarding2" component={Onboarding2} />
                <Stack.Screen options = {{headerShown: false}}name="Onboarding3" component={Onboarding3} />
                <Stack.Screen options = {{headerShown: false}}name="Onboarding4" component={Onboarding4} />
                <Stack.Screen options = {{headerShown: false}}name="Onboarding5" component={Onboarding5} />
            </Stack.Navigator>
        </NavigationContainer>
    );
  }