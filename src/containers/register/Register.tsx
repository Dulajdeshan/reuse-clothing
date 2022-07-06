import React from 'react';
import { useDispatch } from 'react-redux';
import RegisterCard from '../../components/registerCard/RegisterCard';
import './Register.css';
import { useAppSelector } from '../../redux/hooks';
import { handleRegister } from '../../redux/actions/registerActions';

export default function Register() {
  const dispatch = useDispatch();
  const isSubmitting = useAppSelector((state) => state.register.loading);

  const onSubmitRegister = (data: any) => {
    dispatch(handleRegister(data));
  };
  return (
    <div className="register-root">
      <RegisterCard loading={isSubmitting} handleSubmit={onSubmitRegister} />
    </div>
  );
}
