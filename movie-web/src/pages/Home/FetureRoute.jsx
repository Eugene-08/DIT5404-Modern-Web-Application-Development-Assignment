import { Routes, Route, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import '../../resources/css/style.css';

import Home from './Home';

import AOS from 'aos';

function FetureRoute() {

    return (
        <Routes>
            <Route exact path={"/"} element={<Home />} />
        </Routes>
    );
}

export default FetureRoute;