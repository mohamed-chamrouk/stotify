import { useEffect } from 'react'

import '../styles/home.css'
import '../styles/stat_line.css'
import '../styles/stat_spotify.css'
import '../styles/stat_stotify.css'
import '../styles/graph.css'
import '../styles/setup.css'

import StotifySum from './stotify/StotifySum'
import StotifyStats from './stotify/StotifyStats'
import StotifyGraph from './stotify/StotifyGraph'
import SpotifyStats from './spotify/SpotifyStats'
import StotifyTop from './stotify/StotifyTop'

function Home() {
    useEffect(() => {
        window.scrollTo({top:0, behavior: 'smooth'})
    }, [])

    return (
        <>
            {/* Header statistics */}
            <StotifySum />
            {/* Main graph */}
            <StotifyGraph />
            {/* Miscelleanous stats */}
            <StotifyStats />
            {/* Top stats spotify */}
            <SpotifyStats />
            {/* Top stats statify */}
            <StotifyTop />
        </>

    )
}

export default Home