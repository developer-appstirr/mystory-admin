import { getApi, postApi } from "../../api";
import ls from "localstorage-slim";
import {
  NOTIFICATION_LOADING,
  NOTIFICATION_DATA,
} from "../../Constants/constants";

export const SCEDULENOTIFICATION = (objdata) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: NOTIFICATION_LOADING,
        payload: true,
      });
      const currentToken = ls.get("user", { decrypt: true });
      const token = currentToken?.access_token;
      let { data } = await postApi(
        `${process.env.REACT_APP_API_KEY}${process.env.REACT_APP_API_KEY_ADMIN}/SceduleNotification`,
        objdata,
        token
      );
      if (data.isSuccess) {
        dispatch({
          type: NOTIFICATION_LOADING,
          payload: false,
        });
        dispatch({
          type: NOTIFICATION_DATA,
          payload: data,
        });
        return Promise.resolve({ data: data });
      } else {
        dispatch({
          type: NOTIFICATION_LOADING,
          payload: false,
        });
        return Promise.resolve({ status: false });
      }
    } catch ({ message }) {
      dispatch({
        type: NOTIFICATION_LOADING,
        payload: false,
      });

      return Promise.reject({ status: false, message });
    }
  };
};
