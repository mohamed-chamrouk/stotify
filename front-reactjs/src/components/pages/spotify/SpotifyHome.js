import React from 'react'

import stotify_logo from '../../../ressources/stotify_logo.svg'
import SpotifyFullStat from './SpotifyFullStat'

const handleRefresh = () => {

}

function SpotifyHome() {
    return (
        <div>
            <link rel="icon" href={stotify_logo} />
            <div className="bg-blur">

            </div>
            <div className="refresh-div">
                <button className="refresh-button" onClick={handleRefresh}>REFRESH DATA</button>
            </div>
            <div className="main-wrapper spotify-main-wrapper">
                {/* Logo */}
                <div className="header_logo">
                    <img style={{ width: '37px' }} src={stotify_logo} />
                    <a style={{ fontFamily: '"Inter Black"', fontStyle: 'normal', fontWeight: 800, fontSize: '48px', lineHeight: '42px', color: '#6DF0D1', paddingLeft: '10px' }}>STOTIFY</a>
                </div>
                {/* Popularity Index */}
                {/*<PopularityIndex />*/}
                {/* Spotify's tracks stats */}
                <SpotifyFullStat/>
            </div>
        </div>

    )
}

export default SpotifyHome