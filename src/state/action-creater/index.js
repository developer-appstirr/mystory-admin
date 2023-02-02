import { getApi, postApi } from "../../api";
import { AUTH_LOADING } from "../../Constants/constants";

export const _ADMIN_LOGIN = async (objData) => {
  try {
    let { data } = await getApi(
      `${process.env.REACT_APP_API_KEY}${process.env.REACT_APP_API_KEY_ADMIN}/login`,
      objData
    );
    if (data.isSuccess) {
      return Promise.resolve({ data: data });
    } else {
      return Promise.resolve({ status: false });
    }
  } catch ({ message }) {
    return Promise.reject({ status: false, message });
  }
};

export const _ADMIN_SIGNUP = async (objData, objtoken) => {
  try {
    let { data } = await postApi(
      `${process.env.REACT_APP_API_KEY}${process.env.REACT_APP_API_KEY_ADMIN}/`,
      objData,
      objtoken
    );
    if (data.isSuccess) {
      return Promise.resolve({ data: data });
    } else {
      return Promise.resolve({ status: false });
    }
  } catch ({ message }) {
    return Promise.reject({ status: false, message });
  }
};
