import React from 'react'
import { useSelector } from 'react-redux'

import { selectGoodMetrics } from './stotifySlice'

function handleDate(date) {
    if (date === undefined) {
        return "..."
    } else {
        const myDate = new Date(date.value)
        const month = myDate.getMonth() +1 < 10 ? `0${myDate.getMonth()+1}` : `${myDate.getMonth()+1}`
        const year = `${myDate.getFullYear()}`.slice(2)
        return `${month}-${year}`
    }
}

function StotifyStats() {
    const misc = useSelector(selectGoodMetrics)
    return (
        <div className="main_stat">
            <div className="stat_misc_one stat_generic">
                <p>Artistes</p>
                <a>{misc.misc_tartists === undefined ? "..." : misc.misc_tartists.value}</a>
            </div>
            <div className="stat_misc_two stat_generic">
                <p>Albums</p>
                <a>{misc.misc_talbums === undefined ? "..." : misc.misc_talbums.value}</a>
            </div>
            <div className="stat_misc_three stat_generic">
                <p>Musiques</p>
                <a>{misc.misc_ttracks === undefined ? "..." : misc.misc_ttracks.value}</a>
            </div>
            <div className="stat_misc_four stat_generic">
                <p>Depuis</p>
                <a>{handleDate(misc.misc_tdate)}</a>
            </div>
        </div>
    )
}

export default StotifyStats