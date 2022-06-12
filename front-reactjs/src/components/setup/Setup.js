import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'

//TODO : CHANGER LE CLIENT SECRET DANS L'EXPORT

import '../../styles/setup.css'
import stotify_logo from '../../ressources/stotify_logo.svg'
import stotify_dark_logo from '../../ressources/stotify_dark_logo.svg'
import ellipse_red from '../../ressources/ellipse_red.svg'
import ellipse_green from '../../ressources/ellipse_green.svg'
import store from '../../store'

import { fetchStatus, selectStatus } from './setupSlice'

const AUTH_URL = `https://accounts.spotify.com/authorize?Access-Control-Allow-Origin=%2A&response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&scope=user-read-recently-played%20user-top-read&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`
store.dispatch(fetchStatus())

const elipse = (color) => {
    return(<svg fill={color} viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="100" cy="50" rx="100" ry="100" />
  </svg>)
}

const handleStatus = (status) => {
    if (status) {
        return (
            <>
                <div className="setup_status">
                    <img src={ellipse_green} />
                    <div className="setup_status_txt">
                        ONLINE
                    </div>
                </div>
                <Link to='/' className="setup_button">
                    <button className="setup_button_txt">ENTER</button>
                </Link>
            </>
        )
    } else {
        return (
            <>
                <div className="setup_status">
                    <img src={ellipse_red} />
                    <div className="setup_status_txt">
                        OFFLINE
                    </div>
                </div>
                <a href={AUTH_URL} className="setup_button">
                    <button className="setup_button_txt">START SETUP</button>
                </a>
            </>
        )
    }
}

function Setup() {
    const status = useSelector(selectStatus).filter(item => item.id.includes("stotify_status"))[0]
    const [cookies] = useCookies(['theme'])

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', cookies.theme)
    }, [cookies.theme])

    return (
        <>
        <div className="setup_holder">
            <div className="setup_wrapper">
                <div className="setup_container">
                    <div className="setup_logo">
                        <img src={cookies.theme === 'dark' ? stotify_dark_logo : stotify_logo} />
                    </div>
                    <div className="setup_logo_name">
                        <a>STOTIFY</a>
                    </div>
                    {handleStatus(status === undefined ? false : status.value)}
                </div>
            </div>
            </div>
        </>
    )
}

export default Setup