import { Outlet } from 'react-router-dom'
import React from 'react'

import stotify_logo from '../ressources/stotify_logo.svg'

import store from '../store'

import { fetchMinutes, fetchMisc, fetchListeningTracksStats } from './stotify/stotifySlice'

const handleRefresh = () => {
    store.dispatch(fetchMinutes({ days: 30, len: "short" }))
    store.dispatch(fetchMinutes({ days: 365, len: "long" }))

    store.dispatch(fetchMisc('artists'))
    store.dispatch(fetchMisc('albums'))
    store.dispatch(fetchMisc('tracks'))
    store.dispatch(fetchMisc('date'))

    store.dispatch(fetchListeningTracksStats(30))
}

function Layout() {
    return (
        <>
            <div className="bg-blur"></div>
            <div className="refresh-div">
                <button className="refresh-button" onClick={handleRefresh}>REFRESH DATA</button>
            </div>
            <div className="main-wrapper">
                {/* Logo */}
                <div className="header_logo">
                    <img style={{ width: '37px' }} src={stotify_logo} />
                    <a style={{ fontFamily: '"Inter Black"', fontStyle: 'normal', fontWeight: 800, fontSize: '48px', lineHeight: '42px', color: '#6DF0D1', paddingLeft: '10px' }}>STOTIFY</a>
                </div>
                <Outlet />
            </div>
        </>
    )
}

export default Layout