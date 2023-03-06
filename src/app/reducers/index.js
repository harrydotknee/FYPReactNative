import {ADD_WORKOUT, WORKOUTS_LOADED} from '../constants';

const initialState = {
  workouts: [{name: 'Workout 1'}, {name: 'Workout 2'}],
  remoteWorkouts: [],
};

const rootReducer = (state = initialState, action) => {
  if (action.type === ADD_WORKOUT) {
    return Object.assign({}, state, {
      workouts: state.workouts.concat(action.payload),
    });
  }

  if (action.type === WORKOUTS_LOADED) {
    return Object.assign({}, state, {
      remoteWorkouts: state.remoteWorkouts.concat(action.payload),
    });
  }
  return state;
};

export default rootReducer;
