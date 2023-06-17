import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import DailyOverview from '../screens/DailyOverview';
import AddMeal from '../screens/AddMeal';
import Profile from '../screens/Profile';
import Calendar from '../screens/Calendar';
import IndividualMeals from '../screens/IndividualMeals';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const EmptyScreen = () => {
  return null
}

function MainTabs() {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'DailyOverview') {
                iconName = 'home-outline';
              } else if (route.name === 'AddMealContainer') {
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
          <Tab.Screen name="DailyOverview" component={DailyOverview} options = {{headerShown: false}} />
          <Tab.Screen name="AddMealContainer" component={EmptyScreen} options = {{headerShown: false}}
            listeners={({navigation})=> ({
              tabPress : e => {
                e.preventDefault();
                navigation.navigate('AddMeal')
              }
              })}/>
          <Tab.Screen options = {{headerShown: false}}name="Profile" component={Profile} />
  </Tab.Navigator>
  )
}

export default function UserTab() {
    return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="MainTabs" component={MainTabs}  options = {{headerShown: false}}/>
            <Stack.Screen name="AddMeal" component={AddMeal} options = {{headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS, gestureEnabled:false}} />
            <Stack.Screen name="Calendar" component={Calendar} options = {{headerShown: false}} />
            <Stack.Screen name="IndividualMeals" component={IndividualMeals} options = {{headerShown: false}} />
          </Stack.Navigator>
        </NavigationContainer>
    );
  }