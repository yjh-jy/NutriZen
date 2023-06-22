import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CardStyleInterpolators, TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import DailyOverview from '../screens/main/DailyOverview';
import AddMeal from '../screens/main/AddMeal';
import Profile from '../screens/main/Profile';
import Calendar from '../screens/main/Calendar';
import IndividualMeals from '../screens/main/IndividualMeals';
import AddMealEntry from '../screens/main/AddMealEntry';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const EmptyScreen = () => {
  return null
}
const DailyOverviewStack = createStackNavigator();

function DailyOverviewStackScreen() {
  return (
    <DailyOverviewStack.Navigator>
      <Stack.Screen name="DailyOverview" component={DailyOverview} options = {{headerShown: false, gestureEnabled:false}}/>
      <Stack.Screen name="IndividualMeals" component={IndividualMeals} 
      options = {{headerShown: false, gestureEnabled:false, cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid}}/>
    </DailyOverviewStack.Navigator>
  )
}

function MainTabs() {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'DailyOverviewStackScreen') {
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
          <Tab.Screen name="DailyOverviewStackScreen" component={DailyOverviewStackScreen} options = {{headerShown: false}} />
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
const RootStack = createStackNavigator();


export default function UserTab() {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <RootStack.Navigator>
            <Stack.Screen name="MainTabs" component={MainTabs}  options = {{headerShown: false}}/>
            <Stack.Screen name="AddMeal" component={AddMeal} options = {{headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS, gestureEnabled:false}} />
            <Stack.Screen name="AddMealEntry" component={AddMealEntry} options = {{headerShown: false, gestureEnabled:false}} />
            <Stack.Screen name="Calendar" component={Calendar} options = {{headerShown: false}} />
          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }