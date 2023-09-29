import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Main from "./layout/Main";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import HeroRegister from "./components/HeroRegister/HeroRegister";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signin",
                element: <SignIn />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/HeroRegister",
                element: <HeroRegister />,
            },
        ],
    },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
