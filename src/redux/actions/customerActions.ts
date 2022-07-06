export enum CustomerActionsTypes {
  HANDLE_DONATE_SUBMIT = 'CUSTOMER/HANDLE_DONATE_SUBMIT',
  HANDLE_DONATE_SUBMIT_SUCCESS = 'CUSTOMER/HANDLE_DONATE_SUBMIT_SUCCESS',
  HANDLE_DONATE_SUBMIT_FAILURE = 'CUSTOMER/HANDLE_DONATE_SUBMIT_FAILURE',
  HANDLE_GET_DONATIONS = 'CUSTOMER/HANDLE_GET_DONATIONS',
  HANDLE_SAVE_DONATIONS = 'CUSTOMER/HANDLE_SAVE_DONATIONS',
  HANDLE_DELETE_DONATIONS = 'CUSTOMER/HANDLE_DELETE_DONATIONS',
  HANDLE_GET_LISTINGS = 'CUSTOMER/HANDLE_GET_LISTINGS',
  HANDLE_SAVE_LISTINGS = 'CUSTOMER/HANDLE_SAVE_LISTINGS',
  HANDLE_UPDATE_PROFILE = 'CUSTOMER/HANDLE_UPDATE_PROFILE',
  HANDLE_UPDATE_PROFILE_SUCCESS = 'CUSTOMER/HANDLE_UPDATE_PROFILE_SUCCESS',
  HANDLE_UPDATE_PROFILE_FAILURE = 'CUSTOMER/HANDLE_UPDATE_PROFILE_FAILURE',
  HANDLE_GET_SELLERS = 'CUSTOMER/HANDLE_GET_SELLERS',
  HANDLE_SAVE_SELLERS = 'CUSTOMER/HANDLE_SAVE_SELLERS',
}

export const handleDonateSubmit = (payload: any) => ({
  type: CustomerActionsTypes.HANDLE_DONATE_SUBMIT,
  payload,
});

export const handleDonateSubmitSuccess = () => ({
  type: CustomerActionsTypes.HANDLE_DONATE_SUBMIT_SUCCESS,
});

export const handleDonateSubmitFailure = () => ({
  type: CustomerActionsTypes.HANDLE_DONATE_SUBMIT_FAILURE,
});

export const handleGetDonations = () => ({
  type: CustomerActionsTypes.HANDLE_GET_DONATIONS,
});

export const handleSaveDonations = (payload: any) => ({
  type: CustomerActionsTypes.HANDLE_SAVE_DONATIONS,
  payload,
});

export const handleDeleteDonations = (payload: any) => ({
  type: CustomerActionsTypes.HANDLE_DELETE_DONATIONS,
  payload,
});

export const handleGetListings = () => ({
  type: CustomerActionsTypes.HANDLE_GET_LISTINGS,
});

export const handleSaveListings = (payload: any) => ({
  type: CustomerActionsTypes.HANDLE_SAVE_LISTINGS,
  payload,
});

export const handleUpdateProfile = (payload: any) => ({
  type: CustomerActionsTypes.HANDLE_UPDATE_PROFILE,
  payload,
});

export const handleUpdateProfileSuccess = () => ({
  type: CustomerActionsTypes.HANDLE_UPDATE_PROFILE_SUCCESS,
});

export const handleUpdateProfileFailure = () => ({
  type: CustomerActionsTypes.HANDLE_UPDATE_PROFILE_FAILURE,
});

export const handleGetSellers = () => ({
  type: CustomerActionsTypes.HANDLE_GET_SELLERS,
});

export const handleSaveSellers = (payload: any) => ({
  type: CustomerActionsTypes.HANDLE_SAVE_SELLERS,
  payload,
});
