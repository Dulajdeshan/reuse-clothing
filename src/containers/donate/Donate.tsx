import React from 'react';
import './Donate.css';
import { useNavigate } from 'react-router-dom';
import DonateCard from '../../components/donateCard/DonateCard';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { handleDonateSubmit } from '../../redux/actions/customerActions';

export default function Donate() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isSubmitting = useAppSelector((state) => state.customer.loading);

  const onSubmitDonate = (data: any) => {
    dispatch(
      handleDonateSubmit({
        data,
        navigate,
      })
    );
  };

  return (
    <div className="donate-root">
      <DonateCard loading={isSubmitting} handleSubmit={onSubmitDonate} />
    </div>
  );
}
