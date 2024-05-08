import {Outlet} from 'react-router-dom'
import Navbar from '../components/nav/Navbar';
import Footer from '../components/footer/Footer';
const Layout = () => {
  return (
    <div className=' relative'>
     <div className=' sticky top-0 z-[999]'>
     <Navbar></Navbar>
     </div>
      <div className='min-h-[calc(100vh-116px)]'>
      <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Layout;