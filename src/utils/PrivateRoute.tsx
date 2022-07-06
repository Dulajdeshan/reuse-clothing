import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isEmpty, isLoaded } from 'react-redux-firebase';
import { useAppSelector } from '../redux/hooks';

export default function PrivateRoute({
  children,
  requireAuth = true,
}: {
  // eslint-disable-next-line no-undef
  children: JSX.Element;
  requireAuth?: boolean;
  // eslint-disable-next-line no-undef
}): JSX.Element {
  // @ts-ignore
  const auth = useAppSelector((state) => state.firebase.auth);
  const location = useLocation();

  if (requireAuth) {
    if (isLoaded(auth) && !isEmpty(auth)) {
      return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (isLoaded(auth) && !isEmpty(auth)) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}
