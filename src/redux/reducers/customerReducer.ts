import { CustomerActionsTypes } from '../actions/customerActions';

interface CustomerState {
  loading: boolean;
  donations: any[];
  listings: any[];
  sellers: any[];
}

const initialState: CustomerState = {
  loading: false,
  donations: [],
  listings: [],
  sellers: [],
};

export default function reducer(state = initialState, action: any = {}) {
  switch (action.type) {
    case CustomerActionsTypes.HANDLE_DONATE_SUBMIT:
      return {
        ...state,
        loading: true,
      };
    case CustomerActionsTypes.HANDLE_DONATE_SUBMIT_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case CustomerActionsTypes.HANDLE_DONATE_SUBMIT_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case CustomerActionsTypes.HANDLE_SAVE_DONATIONS:
      return {
        ...state,
        donations: action.payload,
      };
    case CustomerActionsTypes.HANDLE_SAVE_LISTINGS:
      return {
        ...state,
        listings: action.payload,
      };
    case CustomerActionsTypes.HANDLE_UPDATE_PROFILE:
      return {
        ...state,
        loading: true,
      };
    case CustomerActionsTypes.HANDLE_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case CustomerActionsTypes.HANDLE_UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case CustomerActionsTypes.HANDLE_SAVE_SELLERS:
      return {
        ...state,
        sellers: action.payload,
      };
    default:
      return state;
  }
}
