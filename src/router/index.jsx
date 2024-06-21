import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import "bootstrap/dist/css/bootstrap.min.css";
import { SignIn, Main, SignUp } from "@pages";

const Index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="main/*" element={<Main />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default Index;
