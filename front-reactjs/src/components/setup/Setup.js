import React from 'react'
import store from '../../store'

import '../../styles/setup.css'
import logo from '../../ressources/stotify_logo.svg'
import ellipse_red from '../../ressources/ellipse_red.svg'
import ellipse_green from '../../ressources/ellipse_green.svg'

import { fetchSetup } from './setupSlice'

store.dispatch(fetchSetup())

const handleStatus = (status) => {
    if (status) {
        return (
            <>
                <div className="setup_status">
                    <img src={ellipse_green}/>
                    <div className="setup_status_txt">
                        ONLINE
                    </div>
                </div>
                <div className="setup_button">
                    <button className="setup_button_txt">ENTER</button>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className="setup_status">
                <img src={ellipse_red}/>
                    <div className="setup_status_txt">
                        OFFLINE
                    </div>
                </div>
                <div className="setup_button">
                    <a className="setup_button_txt">START SETUP</a>
                </div>
            </>
        )
    }
}

function Setup() {
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
                    {handleStatus(true)}
                </div>
            </div>
        </>
    )
}

export default Setup