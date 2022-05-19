import '../styles/home.css'
import '../styles/stat_line.css'
import '../styles/stat_spotify.css'
import '../styles/stat_stotify.css'
import '../styles/graph.css'
import '../styles/setup.css'

import stotify_logo from '../ressources/stotify_logo.svg'

import StotifySum from './stotify/StotifySum'
import StotifyStats from './stotify/StotifyStats'
import StotifyGraph from './stotify/StotifyGraph'
import SpotifyStats from './spotify/SpotifyStats'
import StotifyTop from './stotify/StotifyTop'

import store from '../store'

import { fetchMinutes, fetchMisc, fetchListeningStats } from './stotify/stotifySlice'

const handleRefresh = () => {
    store.dispatch(fetchMinutes({ days: 30, len: "short" }))
    store.dispatch(fetchMinutes({ days: 365, len: "long" }))

    store.dispatch(fetchMisc('artists'))
    store.dispatch(fetchMisc('albums'))
    store.dispatch(fetchMisc('tracks'))
    store.dispatch(fetchMisc('date'))

    store.dispatch(fetchListeningStats(30))
}


function Home() {
    return (
        <div>
            <link rel="icon" href={stotify_logo} />
            <div className="bg-blur">

            </div>
            <div className="refresh-div">
                <button className="refresh-button" onClick={handleRefresh}>REFRESH DATA</button>
            </div>
            <div className="main-wrapper">
                {/* Logo */}
                <div className="header_logo">
                    <img style={{ width: '37px' }} src={stotify_logo} />
                    <a style={{ fontFamily: '"Inter Black"', fontStyle: 'normal', fontWeight: 800, fontSize: '48px', lineHeight: '42px', color: '#6DF0D1', paddingLeft: '10px' }}>STOTIFY</a>
                </div>
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
            </div>
        </div>

    )
}

export default Home