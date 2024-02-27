import React from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import store from "./slices/store.js";
import "./main.css";
import 'flowbite';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import WelcomeContainer from "./containers/WelcomeContainer.jsx";
import PlayContainer from "./containers/PlayContainer.jsx";
import ResultContainer from "./containers/ResultContainer.jsx";
import SignupContainer from "./containers/SignupContainer.jsx";
import LoginContainer from "./containers/LoginContainer.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

const root = createRoot(document.getElementById("root"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<WelcomeContainer />} />

      <Route path="/signup" element={<SignupContainer />} />
      <Route path="/login" element={<LoginContainer />} />

      {/* YOU NEED LOGIN AND SIGNUP TO ACCESS THIS STUFF */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/play" element={<PlayContainer />} />
        <Route path="/results" element={<ResultContainer />} />
      </Route>
    </Route>
  )
);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
