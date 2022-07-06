import React from 'react';
import { useDispatch } from 'react-redux';
import LoginCard from '../../components/loginCard/LoginCard';
import './Login.css';
import { handleLogin } from '../../redux/actions/loginActions';
import { useAppSelector } from '../../redux/hooks';

export default function Login() {
  const dispatch = useDispatch();

  const isSubmitting = useAppSelector((state) => state.login.loading);

  const onSubmitLogin = (email: string, password: string) => {
    dispatch(handleLogin({ email, password }));
  };

  return (
    <div className="login-root">
      <LoginCard handleSubmit={onSubmitLogin} loading={isSubmitting} />
    </div>
  );
}
