import React from 'react'
import arrow_right from '../../ressources/arrow_right.svg'
import { useSelector } from 'react-redux'

import store from '../../store'
import { fetchTopArtists, fetchTopTracks, selectTops } from './spotifySlice'
import SpotifyStatsItem from './SpotifyStatsItem'
import SpotifyPlaceHolder from './SpotifyPlaceHolder'

store.dispatch(fetchTopArtists("long_term", "5"))
store.dispatch(fetchTopTracks("long_term", "5"))

function SpotifyStats() {
    const topArtist = useSelector(selectTops).filter(item => item.id.includes("fetch_artists"))[0]
    const topTrack = useSelector(selectTops).filter(item => item.id.includes("fetch_tracks"))[0]

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
            <div className="stat_top_spotify_one">
                <div className="stat_indicator_wrap">
                    <div className="stat_indicator">
                        SPOTIFY
                    </div>
                    <p>Musiques les plus écoutées</p>
                </div>
                <div className="stat_spotify_details">
                    <a> VOIR LES STATISTIQUES DETAILLES </a>
                </div>
                <table className="table-info" style={{ tableLayout: 'fixed', width: '100%', height: '100%', marginTop: '0px', paddingLeft: '11px', paddingRight: '11px', borderSpacing: '0 6px' }}>
                    <thead style={{ visibility: 'collapse' }}>
                        <tr style={{ verticalAlign: 'middle' }}>
                            <th style={{ width: '10%' }} />
                            <th style={{ width: '20%' }}>Song art</th>
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
                <div className="stat_spotify_details">
                    <a> VOIR LES STATISTIQUES DETAILLES </a>
                </div>
                <table className="table-info" style={{ tableLayout: 'fixed', width: '100%', height: '100%', marginTop: '0px', paddingLeft: '11px', paddingRight: '11px', borderSpacing: '0 6px' }}>
                    <thead style={{ visibility: 'collapse' }}>
                        <tr style={{ verticalAlign: 'middle' }}>
                            <th style={{ width: '10%' }} />
                            <th style={{ width: '20%' }}>Song art</th>
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

export default SpotifyStats