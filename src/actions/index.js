import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

export const signup = (formProps, callback) =>  async dispatch => {
    // With redux-thunk, we can return either a function or an object as an action
    // If we return a function, that function will be called with dispatch
    // We can dispatch({type: AUTH_USER}) any number of times
    // or wait for the Promise to resolve and then dispatch
    // With ReduxPromise, we can return only one action and that action has to have a 
    // Promise in the payload property
   
  try {
      const response = await axios.post('http://localhost:3090/signup', formProps);
      dispatch({ type: AUTH_USER, payload: response.data.token });
      localStorage.setItem('token', response.data.token);
      callback();
  } catch(e) {
      dispatch({ type: AUTH_ERROR, payload: 'Email in use' })
  }
};

export const signin = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:3090/signin', formProps);
        dispatch({ type: AUTH_USER, payload: response.data.token });
        localStorage.setItem('token', response.data.token);
        callback();
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' })
    }
};


export const signout = () => {
    localStorage.removeItem('token');

    return {
        type: AUTH_USER,
        payload: ''
    };
};