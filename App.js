/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createNativeStackNavigator, createSwitchNavigator} from '@react-navigation/native-stack';
import thunk from 'redux-thunk';
import {Provider as StoreProvider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import reducers from './src/app/reducers';
import LoginForm from './src/pages/LoginForm';
import WorkoutsPage from './src/pages/WorkoutsPage';
import EditWorkoutPage from './src/pages/EditWorkoutPage';
import CreateWorkoutPage from './src/pages/CreateWorkoutPage';
import ShowWorkoutPage from './src/pages/ShowWorkoutPage';
import PlayWorkout from './src/pages/PlayWorkout';
import SettingsPage from './src/pages/SettingsPage';
import {store, persistor} from './src/app/store';
import {navigationRef} from './src/RootNavigation';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {WorkoutsScreenNavigator} from './src/CustomNavigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as SecureStore from 'expo-secure-store';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const workoutsSectionName = 'Workouts Section';
const settingsName = 'Settings';

const checkLoggedIn = async () => {
  const token = await SecureStore.getItemAsync('credentials');
  if (token) {
    return true;
  } else {
    return false;
  }
};

const AppContainer = () => {
  return (
    <Tab.Navigator
      initialRouteName={workoutsSectionName}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let routeName = route.name;

          if (routeName === workoutsSectionName) {
            iconName = focused ? 'barbell' : 'barbell-outline';
          } else if (routeName === settingsName) {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen
        name={workoutsSectionName}
        component={WorkoutsScreenNavigator}
      />
      <Tab.Screen name={settingsName} component={SettingsPage} />
      {/* <Stack.Screen name="Login" component={LoginForm} />
      <Stack.Screen name="EditWorkout" component={EditWorkoutPage} />
      <Stack.Screen name="ShowWorkout" component={ShowWorkoutPage} />
      <Stack.Screen
        name="CreateWorkout"
        component={CreateWorkoutPage}
      />
      <Stack.Screen name="Play" component={PlayWorkout} /> */}
    </Tab.Navigator>
  );
};

const App = () => {
  useEffect(() => {
    checkLoggedIn().then((loggedIn) => {
      if (loggedIn) {
        navigationRef.current?.dispatch(StackActions.replace('App'));
      } else {
        navigationRef.current?.dispatch(StackActions.replace('Login'));
      }
    });
  }, []);
  return (
    <>
      <StoreProvider store={store}>
        <PaperProvider>
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="Login" component={LoginForm} />
              <Stack.Screen name="App" component={AppContainer} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </StoreProvider>
    </>
  );
};

export default App;
