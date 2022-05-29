import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from './Home.js'
import SpotifyHome from "./pages/spotify/SpotifyHome.js";
import Setup from './setup/Setup.js'

const RoutesTree = () => {
    return (
        <BrowserRouter>
            <div>bob</div>
            <Routes>
                <Route path="/setup" element={<Setup />} />
                <Route path="/" element={<Home />} />
                <Route path="/spotify" element={<SpotifyHome/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesTree