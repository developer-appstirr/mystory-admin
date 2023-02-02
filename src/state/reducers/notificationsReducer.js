import {
  NOTIFICATION_LOADING,
  NOTIFICATION_DATA,
} from "../../Constants/constants";

const initialState = {
  isLoading: false,
  notificatoionData: [],
};

const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_LOADING:
      return { ...state, isLoading: action.payload };

    case NOTIFICATION_DATA:
      return { ...state, notificatoionData: action.payload };

    default:
      return state;
  }
};

export default notificationsReducer;
