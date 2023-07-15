import Navbar from './Navbar'
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

export default function Main() {
  return (
    <div>
      <Navbar></Navbar>
      <div>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  )
}
