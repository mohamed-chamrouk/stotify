import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from './Home.js'
import Setup from './setup/Setup.js'

const RoutesTree = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/setup" element={<Setup />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesTree