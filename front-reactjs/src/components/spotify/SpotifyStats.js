import { React, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import store from '../../store'
import { fetchTopArtists, fetchTopTracks, selectTops } from './spotifySlice'
import SpotifyStatsItem from './SpotifyStatsItem'
import SpotifyPlaceHolder from './SpotifyPlaceHolder'


function SpotifyStats() {
    useEffect(() => {
        store.dispatch(fetchTopArtists("long_term"))
        store.dispatch(fetchTopTracks("long_term"))
    }, [])
    
    const term = "long_term"
    const topArtist = useSelector(selectTops).filter(item => item.id.includes(`fetch_artists_${term}`))[0]
    const topTrack = useSelector(selectTops).filter(item => item.id.includes(`fetch_tracks_${term}`))[0]

    const renderedArtistList = topArtist === undefined ? <SpotifyPlaceHolder type={"artist"} /> : topArtist.value.slice(0, 5).map((item) => {
        return (
            <SpotifyStatsItem top={item} type={"artist"} key={item.id} />
        )
    })

    const renderedTrackList = topTrack === undefined ? <SpotifyPlaceHolder type={"track"} /> : topTrack.value.slice(0, 5).map((item) => {
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
                <Link className="detailed_stats_button" to='/spotify'>
                    <button className="detailed_stats_txt">VOIR LES STATISTIQUES DETAILLES  &#8594;</button>
                </Link>
                <table className="table-info" style={{ tableLayout: 'fixed', width: '100%', height: '100%', marginTop: '0px', paddingLeft: '11px', paddingRight: '11px', borderSpacing: '0 6px' }}>
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
                <Link className="detailed_stats_button" to='/spotify'>
                    <button className="detailed_stats_txt">VOIR LES STATISTIQUES DETAILLES  &#8594;</button>
                </Link>
                <table className="table-info" style={{ tableLayout: 'fixed', width: '100%', height: '100%', marginTop: '0px', paddingLeft: '11px', paddingRight: '11px', borderSpacing: '0 6px' }}>
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

export default SpotifyStats