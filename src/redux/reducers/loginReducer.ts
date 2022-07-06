import firebase from 'firebase/compat/app';
import { LoginActionTypes } from '../actions/loginActions';

interface LoginState {
  loading: boolean;
  user: firebase.User | null;
}

const initialState: LoginState = {
  loading: false,
  user: null,
};

export default function reducer(state = initialState, action: any = {}) {
  switch (action.type) {
    case LoginActionTypes.HANDLE_LOGIN:
      return {
        ...state,
        loading: true,
      };
    case LoginActionTypes.HANDLE_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case LoginActionTypes.HANDLE_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
