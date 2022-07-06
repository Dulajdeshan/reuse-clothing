export enum LoginActionTypes {
  HANDLE_LOGIN = 'LOGIN/HANDLE_LOGIN',
  HANDLE_LOGOUT = 'LOGIN/HANDLE_LOGOUT',
  HANDLE_LOGIN_SUCCESS = 'LOGIN/HANDLE_LOGIN_SUCCESS',
  HANDLE_LOGIN_FAILURE = 'LOGIN/HANDLE_LOGIN_FAILURE',
}

export const handleLogin = (payload: any) => ({
  type: LoginActionTypes.HANDLE_LOGIN,
  payload,
});

export const handleLogout = () => ({
  type: LoginActionTypes.HANDLE_LOGOUT,
});

export const handleLoginSuccess = (payload: any) => ({
  type: LoginActionTypes.HANDLE_LOGIN_SUCCESS,
  payload,
});

export const handleLoginFailure = () => ({
  type: LoginActionTypes.HANDLE_LOGIN_FAILURE,
});
