import store from '../../store'
import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

import '../../styles/setup.css'
import logo from '../../ressources/stotify_logo.svg'
import ellipse_red from '../../ressources/ellipse_red.svg'
import ellipse_green from '../../ressources/ellipse_green.svg'

import { fetchStatus, selectStatus } from './setupSlice'

const AUTH_URL = `https://accounts.spotify.com/authorize?Access-Control-Allow-Origin=%2A&response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&scope=user-read-recently-played%20user-top-read&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`
store.dispatch(fetchStatus())

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

    return (
        <>
            <div className="setup_wrapper">
                <div className="setup_container">
                    <div className="setup_logo">
                        <img src={logo} />
                    </div>
                    <div className="setup_logo_name">
                        <a>STOTIFY</a>
                    </div>
                    {handleStatus(status === undefined ? false : status.value)}
                </div>
            </div>
        </>
    )
}

export default Setup