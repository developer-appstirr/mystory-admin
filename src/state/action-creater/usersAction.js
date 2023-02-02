import { getApi, postApi, patchApi } from "../../api";
import {
  GET_ALL_USERS,
  GET_WEEKLY_ALL_USERS,
  LOADING,
  GET_WEEKLY_ALL_USERS_UNREGISTER,
  WEEKLY_FAMILY_MEMBER,
  WEEKLY_JOURNAL,
  ALL_COUNT,
  ALL_COUNT_LOADING,
} from "../../Constants/constants";
import ls from "localstorage-slim";

export const GET_USERS = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });
      const currentToken = ls.get("user", { decrypt: true });
      const token = currentToken?.access_token;
      let { data } = await getApi(
        `${process.env.REACT_APP_API_KEY}${process.env.REACT_APP_API_KEY_ADMIN}/users?count=1000000&page=1`,
        token
      );
      if (data.isSuccess) {
        dispatch({
          type: LOADING,
          payload: false,
        });
        dispatch({
          type: GET_ALL_USERS,
          payload: data.data,
        });
        return Promise.resolve({ data: data });
      } else {
        dispatch({
          type: LOADING,
          payload: false,
        });
        return Promise.resolve({ status: false });
      }
    } catch ({ message }) {
      dispatch({
        type: LOADING,
        payload: false,
      });

      return Promise.reject({ status: false, message });
    }
  };
};

export const GET_ALL_COUNT = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ALL_COUNT_LOADING,
        payload: true,
      });
      const currentToken = ls.get("user", { decrypt: true });
      const token = currentToken?.access_token;
      let { data } = await getApi(
        `${process.env.REACT_APP_API_KEY}${process.env.REACT_APP_API_KEY_ADMIN}/Counts`,
        token
      );
      if (data.isSuccess) {
        dispatch({
          type: ALL_COUNT_LOADING,
          payload: false,
        });
        dispatch({
          type: ALL_COUNT,
          payload: data.data,
        });
        return Promise.resolve({ data: data });
      } else {
        dispatch({
          type: ALL_COUNT_LOADING,
          payload: false,
        });
        return Promise.resolve({ status: false });
      }
    } catch ({ message }) {
      dispatch({
        type: ALL_COUNT_LOADING,
        payload: false,
      });

      return Promise.reject({ status: false, message });
    }
  };
};

export const GET_REGISTERED_USERS = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });
      const currentToken = ls.get("user", { decrypt: true });
      const token = currentToken?.access_token;
      let { data } = await getApi(
        `${process.env.REACT_APP_API_KEY}${
          process.env.REACT_APP_API_KEY_ADMIN
        }/un-registered?page=1&count=${1000000}&orderby=all`,
        token
      );
      if (data.isSuccess) {
        dispatch({
          type: LOADING,
          payload: false,
        });
        dispatch({
          type: GET_ALL_USERS,
          payload: data.data,
        });
        return Promise.resolve({ data: data });
      } else {
        dispatch({
          type: LOADING,
          payload: false,
        });
        return Promise.resolve({ status: false });
      }
    } catch ({ message }) {
      dispatch({
        type: LOADING,
        payload: false,
      });

      return Promise.reject({ status: false, message });
    }
  };
};

export const GET_UNREGISTERED_USERS = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });
      const currentToken = ls.get("user", { decrypt: true });
      const token = currentToken?.access_token;
      let { data } = await getApi(
        `${process.env.REACT_APP_API_KEY}${
          process.env.REACT_APP_API_KEY_ADMIN
        }/registered?page=1&count=${1000000}&orderby=all`,
        token
      );
      if (data.isSuccess) {
        dispatch({
          type: LOADING,
          payload: false,
        });
        dispatch({
          type: GET_ALL_USERS,
          payload: data.data,
        });
        return Promise.resolve({ data: data });
      } else {
        dispatch({
          type: LOADING,
          payload: false,
        });
        return Promise.resolve({ status: false });
      }
    } catch ({ message }) {
      dispatch({
        type: LOADING,
        payload: false,
      });

      return Promise.reject({ status: false, message });
    }
  };
};

export const GET_UNBLOCKED_USERS = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });
      const currentToken = ls.get("user", { decrypt: true });
      const token = currentToken?.access_token;
      let { data } = await getApi(
        `${process.env.REACT_APP_API_KEY}${
          process.env.REACT_APP_API_KEY_ADMIN
        }/block-unblock-users?page=1&count=${1000000}&isblock=0`,
        token
      );
      if (data.isSuccess) {
        dispatch({
          type: LOADING,
          payload: false,
        });
        dispatch({
          type: GET_ALL_USERS,
          payload: data.data,
        });
        return Promise.resolve({ data: data });
      } else {
        dispatch({
          type: LOADING,
          payload: false,
        });
        return Promise.resolve({ status: false });
      }
    } catch ({ message }) {
      dispatch({
        type: LOADING,
        payload: false,
      });

      return Promise.reject({ status: false, message });
    }
  };
};

export const GET_BLOCKED_USERS = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });
      const currentToken = ls.get("user", { decrypt: true });
      const token = currentToken?.access_token;
      let { data } = await getApi(
        `${process.env.REACT_APP_API_KEY}${
          process.env.REACT_APP_API_KEY_ADMIN
        }/block-unblock-users?page=1&count=${1000000}&isblock=1`,
        token
      );
      if (data.isSuccess) {
        dispatch({
          type: LOADING,
          payload: false,
        });
        dispatch({
          type: GET_ALL_USERS,
          payload: data.data,
        });
        return Promise.resolve({ data: data });
      } else {
        dispatch({
          type: LOADING,
          payload: false,
        });
        return Promise.resolve({ status: false });
      }
    } catch ({ message }) {
      dispatch({
        type: LOADING,
        payload: false,
      });

      return Promise.reject({ status: false, message });
    }
  };
};

export const GET_BLOCK_USER = async (objcondition, objId) => {
  try {
    let objdata = {
      isBlock: !objcondition,
    };
    const currentToken = ls.get("user", { decrypt: true });
    const token = currentToken?.access_token;
    let { data } = await patchApi(
      `${process.env.REACT_APP_API_KEY}${process.env.REACT_APP_API_KEY_ADMIN}/user-block/${objId}`,
      objdata,
      token
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

export const GET_APPROVE_USER = async (objcondition, objId) => {
  try {
    let objdata = {
      isActive: !objcondition,
    };
    const currentToken = ls.get("user", { decrypt: true });
    const token = currentToken?.access_token;
    let { data } = await patchApi(
      `${process.env.REACT_APP_API_KEY}${process.env.REACT_APP_API_KEY_ADMIN}/user-register/${objId}`,
      objdata,
      token
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

export const LOGOUT_ALL_USERS = async (objId) => {
  try {
    const currentToken = ls.get("user", { decrypt: true });
    const token = currentToken?.access_token;
    let { data } = await postApi(
      `${process.env.REACT_APP_API_KEY}${process.env.REACT_APP_API_KEY_ADMIN}/userLogOut/${objId}`,
      null,
      token
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

export const USERDATEANDCOUNTRY = (date, country) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });
      const currentToken = ls.get("user", { decrypt: true });
      const token = currentToken?.access_token;
      let { data } = await getApi(
        `${process.env.REACT_APP_API_KEY}${process.env.REACT_APP_API_KEY_ADMIN}/UserDateAndCountry?date=${date}&country=${country}&isActive=true&count=100000000&page=1`,
        token
      );
      if (data.isSuccess) {
        dispatch({
          type: LOADING,
          payload: false,
        });
        dispatch({
          type: GET_WEEKLY_ALL_USERS,
          payload: data.data,
        });
        return Promise.resolve({ data: data });
      } else {
        dispatch({
          type: LOADING,
          payload: false,
        });
        return Promise.resolve({ status: false });
      }
    } catch ({ message }) {
      dispatch({
        type: LOADING,
        payload: false,
      });
      return Promise.reject({ status: false, message });
    }
  };
};

export const WEEKLY_MEMBERS = (date, country) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });
      const currentToken = ls.get("user", { decrypt: true });
      const token = currentToken?.access_token;
      let { data } = await getApi(
        `${process.env.REACT_APP_API_KEY}${process.env.REACT_APP_API_KEY_ADMIN}/DailyInvite?date=${date}&count=10&page=1`,
        token
      );
      if (data.isSuccess) {
        dispatch({
          type: LOADING,
          payload: false,
        });
        dispatch({
          type: WEEKLY_FAMILY_MEMBER,
          payload: data.data,
        });
        return Promise.resolve({ data: data });
      } else {
        dispatch({
          type: LOADING,
          payload: false,
        });
        return Promise.resolve({ status: false });
      }
    } catch ({ message }) {
      dispatch({
        type: LOADING,
        payload: false,
      });
      return Promise.reject({ status: false, message });
    }
  };
};

export const WEEKLY_JOURNALS = (date) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });
      const currentToken = ls.get("user", { decrypt: true });
      const token = currentToken?.access_token;
      let { data } = await getApi(
        `${process.env.REACT_APP_API_KEY}${process.env.REACT_APP_API_KEY_ADMIN}/DailyJournal?count=100&page=1&date=${date}`,
        token
      );
      if (data.isSuccess) {
        dispatch({
          type: LOADING,
          payload: false,
        });
        dispatch({
          type: WEEKLY_JOURNAL,
          payload: data.data,
        });
        return Promise.resolve({ data: data });
      } else {
        dispatch({
          type: LOADING,
          payload: false,
        });
        return Promise.resolve({ status: false });
      }
    } catch ({ message }) {
      dispatch({
        type: LOADING,
        payload: false,
      });
      return Promise.reject({ status: false, message });
    }
  };
};

export const USERDATEANDCOUNTRY_UNREGISTER = (date, country) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });
      const currentToken = ls.get("user", { decrypt: true });
      const token = currentToken?.access_token;
      let { data } = await getApi(
        `${process.env.REACT_APP_API_KEY}${process.env.REACT_APP_API_KEY_ADMIN}/UserDateAndCountry?date=${date}&country=${country}&isActive=false&count=10&page=1`,
        token
      );
      if (data.isSuccess) {
        dispatch({
          type: LOADING,
          payload: false,
        });
        dispatch({
          type: GET_WEEKLY_ALL_USERS_UNREGISTER,
          payload: data.data,
        });
        return Promise.resolve({ data: data });
      } else {
        dispatch({
          type: LOADING,
          payload: false,
        });
        return Promise.resolve({ status: false });
      }
    } catch ({ message }) {
      dispatch({
        type: LOADING,
        payload: false,
      });
      return Promise.reject({ status: false, message });
    }
  };
};

export const GET_USERS_BYEMAIL = (searchInput) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });
      const currentToken = ls.get("user", { decrypt: true });
      const token = currentToken?.access_token;
      let { data } = await getApi(
        `${process.env.REACT_APP_API_KEY}${process.env.REACT_APP_API_KEY_ADMIN}/user-email?email=${searchInput}`,
        token
      );
      if (data.isSuccess) {
        dispatch({
          type: LOADING,
          payload: false,
        });
        dispatch({
          type: GET_ALL_USERS,
          payload: data.data,
        });
        return Promise.resolve({ data: data });
      } else {
        dispatch({
          type: LOADING,
          payload: false,
        });
        return Promise.resolve({ status: false });
      }
    } catch ({ message }) {
      dispatch({
        type: LOADING,
        payload: false,
      });

      return Promise.reject({ status: false, message });
    }
  };
};

export const PRIVACY_POLICY = async (objData) => {
  const currentToken = ls.get("user", { decrypt: true });
  const token = currentToken?.access_token;
  try {
    let { data } = await postApi(
      `${process.env.REACT_APP_API_KEY}${process.env.REACT_APP_API_KEY_ADMIN}/addPolicy`,
      objData,
      token
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

export const GET_PRIVACY_POLICY = async () => {
  const currentToken = ls.get("user", { decrypt: true });
  const token = currentToken?.access_token;
  try {
    let { data } = await getApi(
      `${process.env.REACT_APP_API_KEY}${process.env.REACT_APP_API_KEY_ADMIN}/getPolices`,
      token
    );
    if (data.isSuccess) {
      localStorage.setItem("policy", JSON.stringify(data?.data));
      return Promise.resolve({ data: data });
    } else {
      return Promise.resolve({ status: false });
    }
  } catch ({ message }) {
    return Promise.reject({ status: false, message });
  }
};

// export const GET_PRIVACY_POLICY = () => {
//   return async (dispatch) => {
//     try {
//       let { data } = await getApi(
//         `${process.env.REACT_APP_API_KEY}${process.env.REACT_APP_API_KEY_ADMIN}/getPolices`,
//         token
//       );
//       if (data.isSuccess) {
//         localStorage.setItem("policy", JSON.stringify(data?.data?.description));
//         return Promise.resolve({ data: data });
//       } else {
//         return Promise.resolve({ status: false });
//       }
//     } catch ({ message }) {
//       return Promise.reject({ status: false, message });
//     }
//   };
// };
