import {
  ADD_WORKOUT,
  WORKOUTS_LOADED,
  ADD_SELECTED_EXERCISE,
  REMOVE_SELECTED_EXERCISE,
  EDIT_WORKOUT_NAME,
  SELECT_WORKOUT,
} from '../constants';

const initialState = {
  workouts: [],
  remoteWorkouts: [],
  selectedWorkout: {name: 'bob', exercises: [{name: 'wob'}]},
  selectedExercises: [],
};

const rootReducer = (state = initialState, action) => {
  if (action.type === ADD_WORKOUT) {
    return Object.assign({}, state, {
      workouts: state.workouts.concat(action.payload),
    });
  }

  if (action.type === WORKOUTS_LOADED) {
    return Object.assign({}, state, {
      remoteWorkouts: action.payload,
    });
  }

  if (action.type === SELECT_WORKOUT) {
    return Object.assign({}, state, {
      selectedWorkout: action.payload,
    });
  }

  if (action.type === ADD_SELECTED_EXERCISE) {
    const updatedWorkout = {
      ...state.selectedWorkout,
      exercises: state.selectedWorkout.exercises.concat(action.payload),
    };
    return {...state, selectedWorkout: updatedWorkout};
  }

  if (action.type === REMOVE_SELECTED_EXERCISE) {
    const updatedWorkout = {
      ...state.selectedWorkout,
      exercises: state.selectedWorkout.exercises.filter(
        exercise => exercise.id !== action.payload.id,
      ),
    };
    return {...state, selectedWorkout: updatedWorkout};
  }

  if (action.type === EDIT_WORKOUT_NAME) {
    const name = action.payload;
    const updatedWorkout = {...state.selectedWorkout, name: name};
    return {...state, selectedWorkout: updatedWorkout};
  }

  return state;
};

export default rootReducer;
