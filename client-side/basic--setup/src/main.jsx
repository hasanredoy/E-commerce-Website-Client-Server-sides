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
import MyCart from './components/MyCart/MyCart.jsx';
import AllGadgets from './pages/AllGadgets/AllGadgets.jsx';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

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
