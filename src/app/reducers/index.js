import {
  ADD_WORKOUT,
  WORKOUTS_LOADED,
  ADD_SELECTED_EXERCISE,
  REMOVE_SELECTED_EXERCISE,
  EDIT_WORKOUT_NAME,
  SELECT_WORKOUT,
  EDIT_SELECTED_WORKOUT_EXERCISES_INDEXES,
  SELECT_EMPTY_WORKOUT,
  SET_CREATING,
} from '../constants';

const initialState = {
  workouts: [],
  remoteWorkouts: [],
  selectedWorkout: {name: '', exercises: []},
  // creating: false,
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

  if (action.type === EDIT_SELECTED_WORKOUT_EXERCISES_INDEXES) {
    const updatedWorkout = {
      ...state.selectedWorkout,
      exercises: action.payload,
    };
    return {...state, selectedWorkout: updatedWorkout};
  }

  if (action.type === SELECT_EMPTY_WORKOUT) {
    return {...state, selectedWorkout: {name: '', exercises: []}};
  }

  if (action.type === EDIT_WORKOUT_NAME) {
    const name = action.payload;
    const updatedWorkout = {...state.selectedWorkout, name: name};
    return {...state, selectedWorkout: updatedWorkout};
  }

  // if (action.type === SET_CREATING) {
  //   return {...state, creating: action.payload};
  // }

  return state;
};

export default rootReducer;
