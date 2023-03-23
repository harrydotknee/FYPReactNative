/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
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
import store from './src/app/store';
import {navigationRef} from './src/RootNavigation';

const rootReducer = combineReducers({...reducers});
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <StoreProvider store={store}>
        <PaperProvider>
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator>
              <Stack.Screen name="Login" component={LoginForm} />
              <Stack.Screen name="Workouts" component={WorkoutsPage} />
              <Stack.Screen name="EditWorkout" component={EditWorkoutPage} />
              <Stack.Screen name="ShowWorkout" component={ShowWorkoutPage} />
              <Stack.Screen
                name="CreateWorkout"
                component={CreateWorkoutPage}
              />
              <Stack.Screen name="Play" component={PlayWorkout} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </StoreProvider>
    </>
  );
};

export default App;
