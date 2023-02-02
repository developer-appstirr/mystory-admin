import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "assets/plugins/nucleo/css/nucleo.css";
import { UserContext } from "./context/userContext";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import { Provider } from "react-redux";
import { store } from "./state/store";
import axios from "axios";
import { refreshTokenApi } from "./state/action-creater/refreshTokenAction";

// console.log = console.warn = console.error = () => {};

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    if (error.message === "Request failed with status code 401") {
      refreshTokenApi();
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default function App() {
  const getuser = localStorage.getItem("user");
  const [user, setUser] = useState(getuser);
  return (
    <>
      <Provider store={store}>
        <UserContext.Provider value={{ user, setUser }}>
          <Switch>
            {user == null ? (
              <AuthLayout />
            ) : (
              <Route
                path="/admin"
                render={(props) => <AdminLayout {...props} />}
              />
            )}
            <Redirect from="/" to="/admin/index" />
          </Switch>
        </UserContext.Provider>
      </Provider>
    </>
  );
}
