import * as types from '../actionTypes/workouts';

export function fetchWorkouts() {  
    return async dispatch => {
        dispatch({type: types.FETCH_WORKOUTS});
        try {
            let response = await fetch('localhost:3000/workouts');
            if(response.status !== 200) {
                throw new Error('FETCH_ERROR');
            }
            response = await response.json();
            dispatch({type: types.FETCH_WORKOUTS_SUCCESS, payload: response});

        } catch(error) {
            dispatch({type: types.FETCH_WORKOUTS_FAILURE, payload: error});
        }
};}

export function createWorkout(workout) {  
    return async dispatch => {
        dispatch({type: types.CREATE_WORKOUT});
        try {
            let response = await fetch('localhost:3000/workouts', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({workout}),
            });

            if(response.status !== 200) {
                throw new Error('CREATE_ERROR');
            }
            response = await response.json();
            dispatch({type: types.CREATE_WORKOUT_SUCCESS, payload: response});

        } catch(error) {
            dispatch({type: types.CREATE_WORKOUT_FAILURE, payload: error});
        }
};}