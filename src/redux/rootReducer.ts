import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import loginReducer from './reducers/loginReducer';
import registerReducer from './reducers/registerReducer';
import customerReducer from './reducers/customerReducer';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
  login: loginReducer,
  register: registerReducer,
  customer: customerReducer,
});

export default rootReducer;
