import { Outlet, Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

import stotify_logo from '../ressources/stotify_logo.svg'
import stotify_dark_logo from '../ressources/stotify_dark_logo.svg'
import '../styles/global_variables.css'
import '../styles/footer.css'
import '../styles/popup.css'

import store from '../store'

import { fetchMinutes, fetchMisc, fetchListeningTracksStats } from './stotify/stotifySlice'
import Popup from './Popup'

const handleRefresh = () => {
    store.dispatch(fetchMinutes({ days: 30, len: "short" }))
    store.dispatch(fetchMinutes({ days: 365, len: "long" }))

    store.dispatch(fetchMisc('artists'))
    store.dispatch(fetchMisc('albums'))
    store.dispatch(fetchMisc('tracks'))
    store.dispatch(fetchMisc('date'))

    store.dispatch(fetchListeningTracksStats(30))
}

const cogComp = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="footer_cog" viewBox="0 0 20 20" fill="var(--text-color)">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
    )
}

function Layout() {
    const [isOpen, setIsOpen] = useState(false);
    const [cookies, setCookie] = useCookies(['theme']);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', cookies.theme)
    }, [cookies.theme])

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const handleDarkMode = () => {
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            setCookie('theme', 'light', {path: '/'})
        } else {
            setCookie('theme', 'dark', {path: '/'})
        }
    }

    return (
        <>
            <div className="bg-blur"></div>
            <div className="refresh-div">
                <button className="refresh-button" onClick={togglePopup}> {cogComp()} SETTINGS</button>
            </div>
            {isOpen && <Popup
                content={
                    <>
                        <b className="popup-settings-text">Settings</b>
                        <div className="popup-buttons-container">
                            <button className="refresh-button" onClick={handleRefresh}>REFRESH DATA</button>
                            <button className="refresh-button" onClick={handleDarkMode}>CHANGE THEME</button>
                        </div>
                    </>
                }
                handleClose={togglePopup}
            />}
            <div className="main-wrapper">
                {/* Logo */}
                <Link to="/" className="header_logo">
                    <img alt="website logo" style={{ width: '37px' }} src={cookies.theme === 'dark' ? stotify_dark_logo : stotify_logo} />
                    <a href="/" className="header_logo_text" >STOTIFY</a>
                </Link>
                <Outlet />
            </div>
        </>
    )
}

export default Layout