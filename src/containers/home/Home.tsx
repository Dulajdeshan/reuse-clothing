import React from 'react';
import { useFirestoreConnect } from 'react-redux-firebase';
import HomeCustomer from './HomeCustomer';
import HomeSeller from './HomeSeller';
import { useAppSelector } from '../../redux/hooks';

export default function Home() {
  useFirestoreConnect(['donations']);
  const profile = useAppSelector((state) => state.firebase.profile);

  const auth = useAppSelector((state) => state.firebase.auth);

  if (profile?.role === 'Customer') {
    return <HomeCustomer />;
  }

  if (profile?.role === 'Seller') {
    return <HomeSeller />;
  }

  return null;
}
