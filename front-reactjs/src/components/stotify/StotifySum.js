import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import store from '../../store.js'
import { fetchMinutes } from './stotifySlice';

import { selectGoodMetrics } from './stotifySlice'

const StotifySum = () => {
    useEffect(() => {
        store.dispatch(fetchMinutes({ days: 30, len: "short" }))
        store.dispatch(fetchMinutes({ days: 365, len: "long" }))
    }, [])

    const minutes = useSelector(selectGoodMetrics)
    return (
        <>
            <div className="stat_header_one">
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <p style={{ fontFamily: '"Inter Extra Bold"', fontStyle: 'normal', fontWeight: 700, fontSize: '48px', lineHeight: '77px', paddingRight: '10px' }}>{minutes.minutes_short === undefined ? "..." : Math.floor(minutes.minutes_short.value)}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                        <p style={{ fontFamily: '"Inter Medium"', fontStyle: 'normal', fontWeight: 500, fontSize: '20px', lineHeight: '24px' }}>minutes listened to</p>
                        <p style={{ fontFamily: '"Inter Light BETA"', fontStyle: 'normal', fontWeight: 500, fontSize: '20px', lineHeight: '24px' }}>in the past 30 days</p>
                    </div>
                </div>
            </div>
            <div className="stat_header_two">
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <p style={{ fontFamily: '"Inter Extra Bold"', fontStyle: 'normal', fontWeight: 700, fontSize: '48px', lineHeight: '77px', paddingRight: '10px' }}>{minutes.minutes_long === undefined ? "..." : Math.floor(minutes.minutes_long.value)}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                        <p style={{ fontFamily: '"Inter Medium"', fontStyle: 'normal', fontWeight: 500, fontSize: '20px', lineHeight: '24px' }}>minutes listened to</p>
                        <p style={{ fontFamily: '"Inter Light BETA"', fontStyle: 'normal', fontWeight: 500, fontSize: '20px', lineHeight: '24px' }}>in the past year</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StotifySum