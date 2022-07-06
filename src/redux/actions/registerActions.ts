export enum RegisterActionTypes {
  HANDLE_REGISTER = 'REGISTER/HANDLE_REGISTER',
  HANDLE_REGISTER_SUCCESS = 'LOGIN/HANDLE_REGISTER_SUCCESS',
  HANDLE_REGISTER_FAILURE = 'LOGIN/HANDLE_REGISTER_FAILURE',
}

export const handleRegister = (payload: any) => ({
  type: RegisterActionTypes.HANDLE_REGISTER,
  payload,
});

export const handleRegisterSuccess = (payload: any) => ({
  type: RegisterActionTypes.HANDLE_REGISTER_SUCCESS,
  payload,
});

export const handleRegisterFailure = () => ({
  type: RegisterActionTypes.HANDLE_REGISTER_FAILURE,
});
