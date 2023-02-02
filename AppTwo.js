/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import reducers from './src/app/reducers';

const rootReducer = combineReducers({...reducers});
const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  const [workoutData, setWorkoutData] = useState([]);
  const workouts = async () => {
    try {
      const response = await fetch('https://1d6e-81-106-97-58.eu.ngrok.io/workouts');
      const data = await response.json();
      setWorkoutData(data);
      console.log("hello");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    workouts();
  }, []);
  return (
    <>
      <Provider store={store}></Provider>
      <View>
        {workoutData.map(_workout => (
          <Text key={_workout.id}>{_workout.name}</Text>
        ))}
      </View>
    </>
  );
};

export default App;
