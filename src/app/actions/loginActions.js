/*global fetch:false*/
export const emailChanged = (email) => {
  return {
    type: 'EMAIL_CHANGED',
    payload: email,
  };
};

export const passwordChanged = (password) => {
  return {
    type: 'PASSWORD_CHANGED',
    payload: password
  };
};

export const loginUser = ({email, password}) => {
  return dispatch => {
    dispatch({
      type: 'LOAD_SPINNER',
    });
    fetch('https://8815-81-106-97-58.ngrok-free.app/users/sign_in', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          email,
          password,
        },
      }),
    }).then(response => {
      if (response.status === 401) {
        console.log('AUTHENTICATION ERROR!!');
        dispatch({
          type: 'LOGIN_FAILED',
        });
      } else {
        console.log('SUCCESS!!');
        response.json().then(data => {
          dispatch({
            type: 'LOGIN_USER_SUCCESS',
            payload: data,
          });
        });
      }
    });
  };
};
