import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import store from '../../store'
import { fetchMinutes, fetchMisc, fetchListeningStats, fetchStotifyTopTracks, fetchStotifyTopArtists, selectMetrics } from './stotifySlice'
import '../../styles/home_stotify.css'
import StotifyTopItem from './StotifyTopItem'
import StotifyPlaceHolder from './StotifyPlaceHolder'

function StotifyFullTop() {
    useEffect(() => {
        store.dispatch(fetchStotifyTopArtists("long_term", "5"))
        store.dispatch(fetchStotifyTopTracks("long_term", "5"))
    }, [])

    const topArtist = useSelector(selectMetrics).filter(item => item.id.includes("fetch_stotify_top_artists"))[0]
    const topTrack = useSelector(selectMetrics).filter(item => item.id.includes("fetch_stotify_top_tracks"))[0]

    const renderedArtistList = topArtist === undefined || topArtist.value === undefined ? <StotifyPlaceHolder type={"artist"} /> : topArtist.value.map((item) => {
        return (
            <StotifyTopItem top={item} rank={topArtist.value.indexOf(item) + 1} type={"artists"} key={topArtist.value.indexOf(item) + 1} />
        )
    })

    const renderedTrackList = topTrack === undefined || topTrack.value === undefined ? <StotifyPlaceHolder type={"track"} /> : topTrack.value.map((item) => {
        return (
            <StotifyTopItem top={item} rank={topTrack.value.indexOf(item) + 1} type={"tracks"} key={topTrack.value.indexOf(item) + 1} />
        )
    })

    return (
        <>
            <div className="stat_top_statify_one">
                <div className="stat_indicator_wrap">
                    <div className="stat_indicator">
                        STOTIFY
                    </div>
                    <p>Musiques les plus écoutées</p>
                </div>
                <div className="stat_statify_details">
                    <a> VOIR LES STATISTIQUES DETAILLES </a>
                </div>
                <table className="table-info" style={{ tableLayout: 'fixed', width: '100%', height: '100%', marginTop: '0px', paddingLeft: '11px', paddingRight: '11px', borderSpacing: '0 6px' }}>
                    <thead style={{ visibility: 'collapse' }}>
                        <tr style={{ verticalAlign: 'middle' }}>
                            <th style={{ width: '60px' }} />
                            <th style={{ width: '14%' }}>Song art</th>
                            <th>Titre</th>
                            <th>Titre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderedTrackList}
                    </tbody>
                </table>
            </div>
            <div className="stat_top_statify_two">
                <div className="stat_indicator_wrap">
                    <div className="stat_indicator">
                        STOTIFY
                    </div>
                    <p>Artistes les plus écoutées</p>
                </div>
                <div className="stat_statify_details">
                    <a> VOIR LES STATISTIQUES DETAILLES </a>
                </div>
                <table className="table-info" style={{ tableLayout: 'fixed', width: '100%', height: '100%', marginTop: '0px', paddingLeft: '11px', paddingRight: '11px', borderSpacing: '0 6px' }}>
                    <thead style={{ visibility: 'collapse' }}>
                        <tr style={{ verticalAlign: 'middle' }}>
                            <th style={{ width: '60px' }} />
                            <th style={{ width: '14%' }}>Song art</th>
                            <th>Titre</th>
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

export default StotifyFullTop