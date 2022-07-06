import { all, call, put, takeLatest } from 'redux-saga/effects';
import { auth, firestore } from '../../config/firebaseConfig';
import {
  handleRegisterSuccess,
  handleRegisterFailure,
  RegisterActionTypes,
} from '../actions/registerActions';

const handleRegisterAsync = async (email: string, password: string) => {
  return auth().createUserWithEmailAndPassword(email, password);
};

const saveUserToFirestoreAsync = async (id: string, data: any) => {
  return firestore().collection('users').doc(id).set(data);
};

function* watchHandleRegister({ payload }: any) {
  try {
    const {
      email,
      password,
      role,
      firstName,
      lastName,
      mobile,
      shopName,
      address,
      district,
    } = payload;
    const response = yield call(handleRegisterAsync, email, password);
    const data: any = {
      email,
      role,
      firstName,
      lastName,
      mobile,
      district,
    };
    if (role === 'Seller') {
      data.shopName = shopName;
      data.address = address;
    }
    yield call(saveUserToFirestoreAsync, response.user.uid, {
      id: response.user.uid,
      ...data,
    });
    yield put(handleRegisterSuccess(response.user));
  } catch (e) {
    yield put(handleRegisterFailure());
    console.error(e);
  }
}

function* registerSaga() {
  yield all([
    takeLatest(RegisterActionTypes.HANDLE_REGISTER, watchHandleRegister),
  ]);
}

export default registerSaga;
