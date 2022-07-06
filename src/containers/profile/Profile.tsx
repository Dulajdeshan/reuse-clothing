import React from 'react';
import { useDispatch } from 'react-redux';
import './Profile.css';
import { useAppSelector } from '../../redux/hooks';
import ProfileCard from '../../components/profileCard/ProfileCard';
import { handleUpdateProfile } from '../../redux/actions/customerActions';

export default function Profile() {
  const dispatch = useDispatch();
  const isSubmitting = useAppSelector((state) => state.customer.loading);

  const onSubmitUpdateProfile = (data: any) => {
    dispatch(handleUpdateProfile(data));
  };
  return (
    <div className="profile-root">
      <ProfileCard
        loading={isSubmitting}
        handleSubmit={onSubmitUpdateProfile}
      />
    </div>
  );
}
