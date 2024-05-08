import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './Layout/Layout.jsx';
import Home from './pages/home/Home.jsx';
import Login from './pages/login/Login.jsx';
import Register from './pages/register/Register.jsx';
import AuthProvider from './components/auth-provider/AuthProvider.jsx';
import Details from './components/details/Details.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children:[
      {
        path:"/",
        element:<Home></Home>       
      },
      {
        path:"/login",
        element:<Login></Login>       
      },
      {
        path:"/register",
        element:<Register></Register>       
      },
      {
        path:"/item/:id",
        element:<Details></Details> ,
        loader:()=> fetch('/data.json')      
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
