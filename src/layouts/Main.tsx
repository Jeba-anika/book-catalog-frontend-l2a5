import Navbar from './Navbar'
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

export default function Main() {
  return (
    <div>
      <Navbar></Navbar>
      <div className='py-16 md:px-20 px-10'>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  )
}
