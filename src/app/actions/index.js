import {
  ADD_WORKOUT,
  ADD_EXERCISE,
  ADD_SELECTED_EXERCISE,
  REMOVE_SELECTED_EXERCISE,
  WORKOUTS_LOADED,
  EDIT_WORKOUT_LOADED,
  SELECT_WORKOUT,
  EDIT_WORKOUT_NAME
} from '../constants';
import * as SecureStore from 'expo-secure-store';

const API_URL = 'https://3e3a-85-255-236-173.eu.ngrok.io';

export const addExercise = exercise => {
  return {
    type: ADD_EXERCISE,
    payload: exercise,
  };
};

export const addWorkout = workout => {
  return {
    type: ADD_WORKOUT,
    payload: workout,
  };
};

export const addSelectedExercise = selectedExercise => {
  return {
    type: ADD_SELECTED_EXERCISE,
    payload: selectedExercise,
  };
};

export const removeSelectedExercise = selectedExercise => {
  return {
    type: REMOVE_SELECTED_EXERCISE,
    payload: selectedExercise,
  };
};

export const editWorkout = workout => {
  return {
    type: EDIT_WORKOUT_LOADED,
    payload: workout,
  };
};

export const selectWorkout = workout => {
  return {
    type: SELECT_WORKOUT,
    payload: workout,
  };
};

export const editWorkoutName = name => {
  return {
    type: EDIT_WORKOUT_NAME,
    payload: name,
  };
};

export function fetchWorkouts() {
  console.log('fetchWorkouts');
  return async function (dispatch) {
    const getCredentials = await SecureStore.getItemAsync('credentials');
    const credentialsObject = JSON.parse(getCredentials);
    const credentials = {
      'access-token': credentialsObject['access-token'],
      'client': credentialsObject['client'],
      'uid': credentialsObject['uid'],
    };
    return fetch(`${API_URL}/workouts?` + new URLSearchParams(credentials), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.status === 200 && res.headers.has('access-token')) {
          const newAccessToken = res.headers.get('access-token');
          if (newAccessToken) {
            credentialsObject['access-token'] = newAccessToken;
            return SecureStore.setItemAsync(
              'credentials',
              JSON.stringify(credentialsObject),
            ).then(() => {
              return res.json();
            });
          }
        }
        return res.json();
      })
      .then(json => {
        dispatch({type: WORKOUTS_LOADED, payload: json});
      })
      .catch(error => {
        console.log(error);
      });
  };
}
