import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout.jsx";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import AuthProvider from "./components/auth-provider/AuthProvider.jsx";
import Details from "./components/details/Details.jsx";
import AllGadgets from "./pages/AllGadgets/AllGadgets.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReviewsPage from "./pages/Reviews/ReviewsPage.jsx";
import ContactUs from "./pages/ContactUs/ContactUs.jsx";
import Dashboard from "./Layout/Dashboard.jsx";
import MyCart from "./pages/Dashboard/User/MyCart/MyCart.jsx";
import MyProfile from "./pages/Dashboard/User/MyProfile/MyProfile.jsx";
import UserHome from "./pages/Dashboard/User/UserHome/UserHome.jsx";
import AllUsers from "./pages/Dashboard/Admin/AllUsers/AllUsers.jsx";
import PrivetRout from "./Routs/PrivetRout.jsx";
import AdminRoute from "./Routs/AdminRoute.jsx";
import UpdateItem from "./pages/Dashboard/Admin/UpdateItem/UpdateItem.jsx";
import AllItems from "./pages/Dashboard/Admin/AllItems/AllItems.jsx";
import AddItem from "./pages/Dashboard/Admin/AddItem/AddItem.jsx";
import BecomeSeller from "./pages/BecomeSeller/BecomeSeller.jsx";
import Payment from "./pages/PaymentPages/Payment.jsx";
import PaymentHistory from "./pages/Dashboard/User/PaymentHistory/PaymentHistory.jsx";
import PaymentInvoice from "./pages/Dashboard/User/PaymentHistory/PaymentInvoice.jsx";
import AdminHome from "./pages/Dashboard/Admin/AdminHome/AdminHome.jsx";
import ErrorPage from "./pages/Error/ErrorPage.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },

      {
        path: "/item/:id",
        element: (
          <PrivetRout>
            <Details></Details>
          </PrivetRout>
        ),
        loader: ({ params }) =>
          fetch(`https://gadget-shop-server-nine.vercel.app/gadgets/${params.id}`),
      },
      {
        path: "/myCart",
        element: (
          <PrivetRout>
            <MyCart></MyCart>
          </PrivetRout>
        ),
      },
      {
        path: "/allGadgets",
        element: <AllGadgets></AllGadgets>,
      },
      {
        path: "/reviews",
        element: (
          <PrivetRout>
            <ReviewsPage></ReviewsPage>{" "}
          </PrivetRout>
        ),
      },
      {
        path: "/contact",
        element: (
          <PrivetRout>
            <ContactUs></ContactUs>
          </PrivetRout>
        ),
      },
      {
        path: "/becomeSeller",
        element: (
          <PrivetRout>
            <BecomeSeller></BecomeSeller>
          </PrivetRout>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/dashboard",
    errorElement: <ErrorPage></ErrorPage>,
    element: (
      <PrivetRout>
        <Dashboard></Dashboard>
      </PrivetRout>
    ),
    children: [
      // user route
      {
        path: "userHome",
        element: <UserHome></UserHome>,
      },
      {
        path: "myCart",
        element: <MyCart></MyCart>,
      },
      {
        path: "payment",
        element: <Payment></Payment>,
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "invoice/:id",
        element: <PaymentInvoice></PaymentInvoice>,
      },
      // common
      {
        path: "profile",
        element: <MyProfile></MyProfile>,
      },
      // admin route
      {
        path: "allUsers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "allItems",
        element: (
          <AdminRoute>
            <AllItems></AllItems>
          </AdminRoute>
        ),
      },
      {
        path: "addItems",
        element: (
          <AdminRoute>
            <AddItem></AddItem>
          </AdminRoute>
        ),
      },
      {
        path: "update/:id",
        element: (
          <AdminRoute>
            <UpdateItem></UpdateItem>
          </AdminRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://gadget-shop-server-nine.vercel.app/gadgets/${params.id}`),
      },
      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
