import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import store from '../../store'
import { fetchTopArtists, fetchTopTracks, selectTops } from './spotifySlice'
import '../../styles/home_spotify.css'
import SpotifyStatsItem from './SpotifyStatsItem'
import SpotifyPlaceHolder from './SpotifyPlaceHolder'

function SpotifyFullStat() {
    const [term, setTerm] = useState("long_term")

    useEffect(() => {
        store.dispatch(fetchTopArtists("long_term"))
        store.dispatch(fetchTopTracks("long_term"))
        store.dispatch(fetchTopArtists("medium_term"))
        store.dispatch(fetchTopTracks("medium_term"))
        store.dispatch(fetchTopArtists("short_term"))
        store.dispatch(fetchTopTracks("short_term"))
    }, [])

    const topArtist = useSelector(selectTops).filter(item => item.id.includes(`fetch_artists_${term}`))[0]
    const topTrack = useSelector(selectTops).filter(item => item.id.includes(`fetch_tracks_${term}`))[0]

    const renderedArtistList = topArtist === undefined ? <SpotifyPlaceHolder type={"artist"} /> : topArtist.value.map((item) => {
        return (
            <SpotifyStatsItem top={item} type={"artist"} key={item.id} />
        )
    })

    const renderedTrackList = topTrack === undefined ? <SpotifyPlaceHolder type={"track"} /> : topTrack.value.map((item) => {
        return (
            <SpotifyStatsItem top={item} type={"track"} key={item.id} />
        )
    })

    return (
        <>
            <div className="select-buttons-div">
                Selection de la durée
                <div className="select-buttons">
                    <div className="select-div">
                        <button className="select-button" onClick={() => setTerm("short_term")}>COURT</button>
                    </div>
                    <div className="select-div">
                        <button className="select-button" onClick={() => setTerm("medium_term")}>MOYEN</button>
                    </div>
                    <div className="select-div">
                        <button className="select-button" onClick={() => setTerm("long_term")}>LONG</button>
                    </div>
                </div>
            </div>
            <div className="stat_top_spotify_one">
                <div className="stat_indicator_wrap">
                    <div className="stat_indicator">
                        SPOTIFY
                    </div>
                    <p>Musiques les plus écoutées</p>
                </div>
                <table className="table-info" style={{ tableLayout: 'fixed', width: '100%', height: 'inherit', marginTop: '0px', paddingLeft: '11px', paddingRight: '11px', borderSpacing: '0 6px' }}>
                    <thead style={{ visibility: 'collapse' }}>
                        <tr style={{ verticalAlign: 'middle' }}>
                            <th style={{ width: '60px' }}>Song art</th>
                            <th style={{ width: '18%' }} />

                            <th>Titre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderedTrackList}
                    </tbody>
                </table>
            </div>
            <div className="stat_top_spotify_two">
                <div className="stat_indicator_wrap">
                    <div className="stat_indicator">
                        SPOTIFY
                    </div>
                    <p>Artistes les plus écoutées</p>
                </div>
                <table className="table-info" style={{ tableLayout: 'fixed', width: '100%', height: 'inherit', marginTop: '0px', paddingLeft: '11px', paddingRight: '11px', borderSpacing: '0 6px' }}>
                    <thead style={{ visibility: 'collapse' }}>
                        <tr style={{ verticalAlign: 'middle' }}>
                            <th style={{ width: '60px' }}>Song art</th>
                            <th style={{ width: '18%' }} />

                            <th>Titre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderedArtistList}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default SpotifyFullStat