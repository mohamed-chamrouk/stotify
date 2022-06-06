import { React, useEffect } from 'react'

import StotifyTop from './StotifyTop'
import StotifyFullGraph from './StotifyFullGraph'
import '../../styles/home_stotify.css'

function StotifyHome() {
    useEffect(() => {
        window.scrollTo({top:0, behavior: 'smooth'})
    }, [])

    return (
        <>
            <StotifyFullGraph />
            <StotifyTop length="99" type="full" />
        </>

    )
}

export default StotifyHome