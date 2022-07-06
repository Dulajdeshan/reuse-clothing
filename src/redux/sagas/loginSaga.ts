import { all, call, put, takeLatest } from 'redux-saga/effects';
import { auth } from '../../config/firebaseConfig';
import {
  handleLoginFailure,
  handleLoginSuccess,
  LoginActionTypes,
} from '../actions/loginActions';

const handleLoginAsync = async (email: string, password: string) => {
  return auth().signInWithEmailAndPassword(email, password);
};

const handleLogoutAsync = async () => {
  return auth().signOut();
};

function* watchHandleLogin({ payload }: any) {
  try {
    const { email, password } = payload;
    const user = yield call(handleLoginAsync, email, password);
    yield put(handleLoginSuccess(user));
  } catch (e) {
    yield put(handleLoginFailure());
    console.error(e);
  }
}

function* watchHandleLogout({ payload }: any) {
  try {
    yield call(handleLogoutAsync);
  } catch (e) {
    console.error(e);
  }
}

function* loginSaga() {
  yield all([
    takeLatest(LoginActionTypes.HANDLE_LOGIN, watchHandleLogin),
    takeLatest(LoginActionTypes.HANDLE_LOGOUT, watchHandleLogout),
  ]);
}

export default loginSaga;
