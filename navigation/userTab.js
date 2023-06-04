import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../assets/colors/colors';

import DailyOverview from '../screens/DailyOverview';
import AddMeal from '../screens/AddMeal';
import Profile from '../screens/Profile';
import Calendar from '../screens/Calendar'


const Tab = createBottomTabNavigator();

export default function UserTab() {
    return (
        <NavigationContainer>
        <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                      let iconName;
          
                      if (route.name === 'DailyOverview') {
                        iconName = 'home-outline';
                      } else if (route.name === 'AddMeal') {
                        iconName = 'add-outline';
                      } else if (route.name === "Profile") {
                        iconName = 'person-circle-outline'
                      }
           
                      // You can return any component that you like here!
                      return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'black',
                    tabBarInactiveTintColor: 'gray',
                    tabBarShowLabel: false,
                  })}>
            <Tab.Screen options = {{headerShown: false}}name="DailyOverview" component={DailyOverview} />
            <Tab.Screen options = {{headerShown: false}}name="AddMeal" component={AddMeal} />
            <Tab.Screen options = {{headerShown: false}}name="Profile" component={Profile} />
        </Tab.Navigator>
        </NavigationContainer>
    );
  }