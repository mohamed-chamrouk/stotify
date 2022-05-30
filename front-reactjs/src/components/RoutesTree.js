import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from './Home.js'
import SpotifyHome from "./spotify/SpotifyHome.js";
import Setup from './setup/Setup.js'
import Layout from "./Layout.js";

const RoutesTree = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/setup" element={<Setup />} />
                <Route element={<Layout/>}>
                    <Route path="/" element={<Home />} />
                    <Route path="/spotify" element={<SpotifyHome/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesTree