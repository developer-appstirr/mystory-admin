import axios from "axios";
import ls from "localstorage-slim";

const result3 = ls.get("user", { decrypt: true });

const params = new URLSearchParams();
params.append("grant_type", "refresh_token");
params.append("refresh_token", result3?.refresh_token);

export const refreshTokenApi = async () => {
  try {
    let response = await axios.post(
      "https://securetoken.googleapis.com/v1/token?key=AIzaSyCqQlWfqNTRhLe4QcM_C_4vSjTnhvUc2-M",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    if (response.status === 200) {
      ls.set("user", response.data, { encrypt: true });
    }
  } catch (e) {
    return Promise.reject(e);
  }
};
