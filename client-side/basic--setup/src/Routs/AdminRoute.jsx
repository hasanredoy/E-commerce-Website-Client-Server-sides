import React from 'react';
import useAdmin from '../hooks/useAdmin';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AdminRoute = ({children}) => {
  const {user,loading}=useAuth()
  const location =useLocation()
  const [Admin,isAdminPending]=useAdmin()
if(loading||isAdminPending)return <div className='flex justify-center items-center h-full'>
  <span className="loading loading-infinity loading-lg "></span>
</div>

  if(user&&Admin)return children;

  return <Navigate state={location?.pathname} to={'/'}></Navigate>

};

export default AdminRoute;