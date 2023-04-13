import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import 'aos/dist/aos.css';
import './resources/css/style.css';

import AOS from 'aos';

import MessageHandler from "./utils/MessageHandler";

import Home from './pages/Home/FetureRoute';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Movie from './pages/Movies/FetureRoute';

function App() {

  const location = useLocation();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 600,
      easing: 'ease-out-sine',
    });
  });

  useEffect(() => {
    if (location.pathname == "/") {
      window.location.assign("/public");
    }
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <MessageHandler />
      <Routes>
        <Route exact path={"/public/*"} element={<Home />} />
        <Route exact path={"/movie/*"} element={<Movie />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
