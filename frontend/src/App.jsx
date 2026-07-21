import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import Navbar from './Layout/Navbar';
import AOS from 'aos';
import 'aos/dist/aos.css';

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
    });
    AOS.refresh();
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default App;
