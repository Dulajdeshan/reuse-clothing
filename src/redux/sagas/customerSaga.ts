import { all, call, select, put, takeLatest } from 'redux-saga/effects';
import { firestore } from '../../config/firebaseConfig';
import {
  handleDonateSubmitSuccess,
  handleDonateSubmitFailure,
  CustomerActionsTypes,
  handleSaveDonations,
  handleGetDonations,
  handleSaveListings,
  handleUpdateProfileSuccess,
  handleUpdateProfileFailure,
  handleSaveSellers,
} from '../actions/customerActions';
import { AppState } from '../store';

const getLoggedInUserId = (state: AppState) => state.firebase.auth.uid;

const handleDonateSubmitAsync = async (data: any) => {
  return firestore().collection('donations').doc().set(data);
};

const handleGetDonationsAsync = async (userId: string) => {
  return firestore()
    .collection('donations')
    .where('user', '==', firestore().collection('users').doc(userId))
    .orderBy('createdAt', 'desc')
    .get();
};
const handleGetListingUser = async (userRef: any) => {
  return userRef.get();
};

const handleUpdateProfileAsync = async (userId: string, data: any) => {
  return firestore().collection('users').doc(userId).update(data);
};

const handleGetListingsAsync = async () => {
  const listings = await firestore()
    .collection('donations')
    .orderBy('createdAt', 'desc')
    .get();

  return Promise.all(
    listings.docs.map(async (item: any) => {
      const userSnap = await handleGetListingUser(item.data().user);
      return {
        id: item.id,
        ...item.data(),
        name: `${userSnap.data().firstName ?? ''} ${
          userSnap.data().lastName ?? ''
        }`,
        district: userSnap.data().district ?? '',
        mobile: userSnap.data().mobile,
      };
    })
  );
};

const handleGetSellersAsync = async () => {
  return firestore().collection('users').where('role', '==', 'Seller').get();
};

const handleDeleteDonationsAsync = async (donationIds: any) => {
  const promises = donationIds.map((item: string) =>
    firestore().collection('donations').doc(item).delete()
  );
  return Promise.all(promises);
};

function* watchHandleDonateSubmit({ payload }: any) {
  try {
    const userId = yield select(getLoggedInUserId);
    const data = {
      ...payload.data,
      user: firestore().collection('users').doc(userId),
      createdAt: firestore.Timestamp?.fromDate(new Date()),
    };
    yield call(handleDonateSubmitAsync, data);
    yield put(handleDonateSubmitSuccess());
    payload.navigate('/');
  } catch (e) {
    yield put(handleDonateSubmitFailure());
    console.error(e);
  }
}

function* watchHandleGetDonations() {
  try {
    const userId = yield select(getLoggedInUserId);

    const donationsSnap = yield call(handleGetDonationsAsync, userId);
    yield put(
      handleSaveDonations(
        donationsSnap.docs.map((item: any) => ({
          id: item.id,
          ...item.data(),
        }))
      )
    );
  } catch (e) {
    yield put(handleSaveDonations([]));
    console.error(e);
  }
}

function* watchHandleDeleteDonations({ payload }: any) {
  try {
    yield call(handleDeleteDonationsAsync, payload);
    yield put(handleGetDonations());
  } catch (e) {
    console.error(e);
  }
}

function* watchHandleGetListings() {
  try {
    const listings = yield call(handleGetListingsAsync);
    yield put(handleSaveListings(listings));
  } catch (e) {
    yield put(handleSaveListings([]));
    console.error(e);
  }
}

function* watchHandleUpdateProfile({ payload }: any) {
  try {
    const userId = yield select(getLoggedInUserId);
    yield call(handleUpdateProfileAsync, userId, payload);
    yield put(handleUpdateProfileSuccess());
  } catch (e) {
    yield put(handleUpdateProfileFailure());
    console.error(e);
  }
}

function* watchHandleGetSellers() {
  try {
    const sellers = yield call(handleGetSellersAsync);
    yield put(
      handleSaveSellers(
        sellers.map((item: any) => ({ id: item.id, ...item.data() }))
      )
    );
  } catch (e) {
    yield put(handleSaveSellers([]));
    console.error(e);
  }
}

function* customerSaga() {
  yield all([
    takeLatest(
      CustomerActionsTypes.HANDLE_DONATE_SUBMIT,
      watchHandleDonateSubmit
    ),
    takeLatest(
      CustomerActionsTypes.HANDLE_GET_DONATIONS,
      watchHandleGetDonations
    ),
    takeLatest(
      CustomerActionsTypes.HANDLE_DELETE_DONATIONS,
      watchHandleDeleteDonations
    ),
    takeLatest(
      CustomerActionsTypes.HANDLE_GET_LISTINGS,
      watchHandleGetListings
    ),
    takeLatest(
      CustomerActionsTypes.HANDLE_UPDATE_PROFILE,
      watchHandleUpdateProfile
    ),
    takeLatest(CustomerActionsTypes.HANDLE_GET_SELLERS, watchHandleGetSellers),
  ]);
}

export default customerSaga;
