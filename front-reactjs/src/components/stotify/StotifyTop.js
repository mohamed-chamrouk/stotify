import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import store from '../../store'
import { fetchStotifyTopArtists, fetchStotifyTopTracks, selectMetrics } from './stotifySlice'
import StotifyTopItem from './StotifyTopItem'
import StotifyPlaceHolder from './StotifyPlaceHolder'

function StotifyTop(props) {
    let { length, type } = props
    length = parseInt(length)

    useEffect(() => {
        store.dispatch(fetchStotifyTopArtists())
        store.dispatch(fetchStotifyTopTracks())
    }, [])

    const topArtist = useSelector(selectMetrics).filter(item => item.id.includes("fetch_stotify_top_artists"))[0]
    const topTrack = useSelector(selectMetrics).filter(item => item.id.includes("fetch_stotify_top_tracks"))[0]

    const renderedArtistList = topArtist === undefined || topArtist.value === undefined ? <StotifyPlaceHolder type={"artist"} /> : topArtist.value.slice(0, topArtist.value.length > length ? length : topArtist.value.length - 1).map((item) => {
        return (
            <StotifyTopItem top={item} rank={topArtist.value.indexOf(item) + 1} type={"artists"} key={topArtist.value.indexOf(item) + 1} />
        )
    })

    const renderedTrackList = topTrack === undefined || topTrack.value === undefined ? <StotifyPlaceHolder type={"track"} /> : topTrack.value.slice(0, topTrack.value.length > length ? length : topTrack.value.length).map((item) => {
        return (
            <StotifyTopItem top={item} rank={topTrack.value.indexOf(item) + 1} type={"tracks"} key={topTrack.value.indexOf(item) + 1} />
        )
    })

    const renderDetail = type === "full" ? <></> :
        <Link className="detailed_stats_button" to='/stotify'>
            <button className="detailed_stats_txt">DETAILED STATISTICS  &#8594;</button>
        </Link>

    return (
        <>
            <div className="stat_top_statify_one">
                <div className="stat_indicator_wrap">
                    <div className="stat_indicator">
                        STOTIFY
                    </div>
                    <p>Top Tracks</p>
                </div>
                {renderDetail}
                <table className="table-info" style={{ tableLayout: 'fixed', width: '100%', height: 'inherit', marginTop: '0px', paddingLeft: '11px', paddingRight: '11px', borderSpacing: '0 6px' }}>
                    <thead style={{ visibility: 'collapse' }}>
                        <tr style={{ verticalAlign: 'middle' }}>
                            <th style={{ width: '60px' }} />
                            <th style={{ width: '60px' }}>Song art</th>
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
                    <p>Top Artists</p>
                </div>
                {renderDetail}
                <table className="table-info" style={{ tableLayout: 'fixed', width: '100%', height: 'inherit', marginTop: '0px', paddingLeft: '11px', paddingRight: '11px', borderSpacing: '0 6px' }}>
                    <thead style={{ visibility: 'collapse' }}>
                        <tr style={{ verticalAlign: 'middle' }}>
                            <th style={{ width: '60px' }} />
                            <th style={{ width: '60px' }}>Song art</th>
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

export default StotifyTop