const INITIAL_STATE = {
  data: [],
  status: null,
  error: null,
  createStatus: null,
  createError: null,
};

//reducer, takes in state and action and returns new state
const workoutsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
    case 'FETCH_WORKOUTS':
      return {
        ...state,
        status: 'loading',
        error: null,
      };
    case 'FETCH_WORKOUTS_SUCCESS':
      return {
        ...state,
        status: 'success',
        date: action.data,
        error: null,
      };
    case 'FETCH_WORKOUTS_FAILURE':
      return {
        ...state,
        status: 'failure',
        error: action.error,
      };
    case 'CREATE_WORKOUT':
      return {
        ...state,
        status: 'loading',
        error: null,
      };
    case 'CREATE_WORKOUT_SUCCESS':
      return {
        ...state,
        status: 'success',
        data: [...state.data, action.data],
        error: null,
      };
    case 'CREATE_WORKOUT_FAILURE':
      return {
        ...state,
        status: 'failure',
        error: action.error,
      };
  }
};
export default workoutsReducer;
