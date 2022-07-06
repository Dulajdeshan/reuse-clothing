import firebase from 'firebase/compat/app';
import { RegisterActionTypes } from '../actions/registerActions';

interface RegisterState {
  loading: boolean;
  user: firebase.User | null;
}

const initialState: RegisterState = {
  loading: false,
  user: null,
};

export default function reducer(state = initialState, action: any = {}) {
  switch (action.type) {
    case RegisterActionTypes.HANDLE_REGISTER:
      return {
        ...state,
        loading: true,
      };
    case RegisterActionTypes.HANDLE_REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case RegisterActionTypes.HANDLE_REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
