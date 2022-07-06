import { all, fork } from 'redux-saga/effects';
import loginSaga from './sagas/loginSaga';
import registerSaga from './sagas/registerSaga';
import customerSaga from './sagas/customerSaga';

export default function* rootSaga() {
  yield all([fork(loginSaga), fork(registerSaga), fork(customerSaga)]);
}
