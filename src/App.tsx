import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { isLoaded, ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import { ThemeProvider } from '@mui/material/styles';
import { firebase } from './config/firebaseConfig';
import PrivateRoute from './utils/PrivateRoute';
import Home from './containers/home/Home';
import Register from './containers/register/Register';
import Header from './components/header/Header';
import Login from './containers/login/Login';
import store from './redux/store';
import { useAppSelector } from './redux/hooks';
import theme from './utils/DefaultTheme';
import Loading from './components/loading/Loading';
import Donate from './containers/donate/Donate';
import Listings from './containers/listings/Listings';
import Profile from './containers/profile/Profile';

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  // enableClaims: true // Get custom claims along with the profile
};

firebase.firestore();

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

function AuthIsLoaded({ children }: { children: React.ReactNode }) {
  // @ts-ignore
  const auth = useAppSelector((state) => state.firebase.auth);
  if (!isLoaded(auth)) return <Loading />;
  return <>{children}</>;
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <Router>
            <AuthIsLoaded>
              <div className="App">
                <Header />
                <Routes>
                  <Route
                    path="/"
                    element={
                      <PrivateRoute>
                        <Home />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/donate"
                    element={
                      <PrivateRoute>
                        <Donate />
                      </PrivateRoute>
                    }
                  />

                  <Route
                    path="/listings"
                    element={
                      <PrivateRoute>
                        <Listings />
                      </PrivateRoute>
                    }
                  />

                  <Route
                    path="/profile"
                    element={
                      <PrivateRoute>
                        <Profile />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/login"
                    element={
                      <PrivateRoute requireAuth={false}>
                        <Login />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/register"
                    element={
                      <PrivateRoute requireAuth={false}>
                        <Register />
                      </PrivateRoute>
                    }
                  />
                </Routes>
              </div>
            </AuthIsLoaded>
          </Router>
        </ReactReduxFirebaseProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
