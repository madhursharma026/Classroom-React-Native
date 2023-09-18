import {REMOVE_AUTH_TOKEN, SET_AUTH_TOKEN} from '../actions/authActions';

const initialState = {
  authToken: '',
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_AUTH_TOKEN: {
      return {
        ...state,
        authToken: action.payload,
      };
    }
    case REMOVE_AUTH_TOKEN: {
      return {
        ...state,
        authToken: '',
      };
    }

    default:
      return state;
  }
};

export default authReducer;

export const setAuthTokenAction = (value = '') => ({
  type: SET_AUTH_TOKEN,
  payload: value,
});

export const removeAuthTokenAction = () => ({
  type: REMOVE_AUTH_TOKEN,
});
