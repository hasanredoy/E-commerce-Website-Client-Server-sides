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
import MyProfile from './pages/Dashboard/User/MyProfile/MyProfile.jsx';
import UserHome from './pages/Dashboard/User/UserHome/UserHome.jsx';
import AllUsers from './pages/Dashboard/Admin/AllUsers/AllUsers.jsx';
import PrivetRout from './Routs/PrivetRout.jsx';
import AdminRoute from './Routs/AdminRoute.jsx';
import UpdateItem from './pages/Dashboard/Admin/UpdateItem/UpdateItem.jsx';
import AllItems from './pages/Dashboard/Admin/AllItems/AllItems.jsx';
import AddItem from './pages/Dashboard/Admin/AddItem/AddItem.jsx';

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
        element:<PrivetRout><Details></Details></PrivetRout> ,
        loader:({params})=> fetch(`http://localhost:5000/gadgets/${params.id}`)      
      },
      {
        path:"/myCart",
        element:<PrivetRout><MyCart></MyCart></PrivetRout> ,
      },
      {
        path:"/allGadgets",
        element:<AllGadgets></AllGadgets> ,
      },
      {
        path:"/reviews",
        element:<PrivetRout><ReviewsPage></ReviewsPage> </PrivetRout>,
      },
      {
        path:"/contact",
        element:<PrivetRout><ContactUs></ContactUs></PrivetRout> ,
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
    element:<PrivetRout><Dashboard></Dashboard></PrivetRout>,
    children:[
      {
        path:'userHome',
        element:<UserHome></UserHome>
      },
      {
        path:'myCart',
        element:<MyCart></MyCart>
      },
      {
        path:'userProfile',
        element:<MyProfile></MyProfile>
      },
      // admin route 
      {
        path:'allUsers',
        element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
      },
      {
        path:'allItems',
        element:<AdminRoute><AllItems></AllItems></AdminRoute>
      },
      {
        path:'addItems',
        element:<AdminRoute><AddItem></AddItem></AdminRoute>
      },
      {
        path:'update/:id',
        element:<AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
        loader:({params})=>fetch(`http://localhost:5000/gadgets/${params.id}`)
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
