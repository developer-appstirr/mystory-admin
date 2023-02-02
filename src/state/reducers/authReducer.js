import { AUTH_LOADING, ADMIN_DATA } from "../../Constants/constants";

const initialState = {
  isLoading: false,
  adminData: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return { ...state, isLoading: action.payload };

    case ADMIN_DATA:
      return { ...state, adminData: action.payload };

    default:
      return state;
  }
};

export default authReducer;
