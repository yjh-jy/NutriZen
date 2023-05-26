import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Onboarding1 from '../screens/Onboarding/Onboarding1'
import Onboarding2 from '../screens/Onboarding/Onboarding2'
import Onboarding3 from '../screens/Onboarding/Onboarding3'
import Onboarding4 from '../screens/Onboarding/Onboarding4'


const Stack = createStackNavigator();

export default function OnboardingStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen options = {{headerShown: false}}name="Onboarding1" component={Onboarding1}/>
                <Stack.Screen options = {{headerShown: false}}name="Onboarding2" component={Onboarding2} />
                <Stack.Screen options = {{headerShown: false}}name="Onboarding3" component={Onboarding3} />
                <Stack.Screen options = {{headerShown: false}}name="Onboarding4" component={Onboarding4} />
            </Stack.Navigator>
        </NavigationContainer>
    );
  }