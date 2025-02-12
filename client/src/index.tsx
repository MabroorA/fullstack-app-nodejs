import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  RouterProvider,
  // Route,
  // Link,
} from "react-router-dom";
import HomePage from "./pages/homePage";
import ProfilePage from "./pages/profilePage";
import RegisterPage from "./pages/registerPage";
import LoginPage from "./pages/loginPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <HomePage/>
    ),
  },
  {
    path: "/profile",
    element:<ProfilePage/> ,
  },
  {
    path: "/register",
    element:<RegisterPage/> ,
  },
  {
    path: "/login",
    element:<LoginPage/> ,
  },
]);
root.render(
  <React.StrictMode>

    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
