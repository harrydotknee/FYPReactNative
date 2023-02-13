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
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import reducers from './src/app/reducers';
import LoginForm from './src/components/LoginForm';
import WorkoutsPage from './src/components/WorkoutsPage';

const rootReducer = combineReducers({...reducers});
const store = createStore(rootReducer, applyMiddleware(thunk));
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <Provider store={store} />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginForm} />
          <Stack.Screen name="Workouts" component={WorkoutsPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
