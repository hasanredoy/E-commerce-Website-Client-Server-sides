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
import AllGadgets from './pages/AllGadgets/AllGadgets.jsx';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import ReviewsPage from './pages/Reviews/ReviewsPage.jsx';
import ContactUs from './pages/ContactUs/ContactUs.jsx';
import Dashboard from './Layout/Dashboard.jsx';
import MyCart from './pages/Dashboard/User/MyCart/MyCart.jsx';

const queryClient = new QueryClient()

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
        path:"/item/:id",
        element:<Details></Details> ,
        loader:({params})=> fetch(`http://localhost:5000/gadgets/${params.id}`)      
      },
      {
        path:"/myCart",
        element:<MyCart></MyCart> ,
      },
      {
        path:"/allGadgets",
        element:<AllGadgets></AllGadgets> ,
      },
      {
        path:"/reviews",
        element:<ReviewsPage></ReviewsPage> ,
      },
      {
        path:"/contact",
        element:<ContactUs></ContactUs> ,
      },
    ]
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
    path:"/dashboard",
    element:<Dashboard></Dashboard>,
    children:[
      {
        path:'myCart',
        element:<MyCart></MyCart>
      },
    ]       
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
    </QueryClientProvider>
    
  </React.StrictMode>,
)
