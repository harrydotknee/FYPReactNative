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
import LoginForm from './src/components/LoginForm';
import WorkoutsPage from './src/components/WorkoutsPage';
import EditWorkoutPage from './src/components/EditWorkoutPage';

const rootReducer = combineReducers({...reducers});
const store = createStore(rootReducer, applyMiddleware(thunk));
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <StoreProvider store={store}>
        <PaperProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Login" component={LoginForm} />
              <Stack.Screen name="Workouts" component={WorkoutsPage} />
              <Stack.Screen name="EditWorkout" component={EditWorkoutPage} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </StoreProvider>
    </>
  );
};

export default App;
