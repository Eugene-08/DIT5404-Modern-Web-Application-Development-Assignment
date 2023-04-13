import { Routes, Route, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import '../../resources/css/style.css';
import AOS from 'aos';

import Main from './Main';

function FetureRoute() {
    const location = useLocation();

    return (
        <Routes>
            <Route exact path={"/"} element={<Main />} />
        </Routes>
    );
}

export default FetureRoute;