import React from 'react'
import { useSelector } from 'react-redux'

import { selectMetrics, fetchMinutes } from './stotifySlice'

const handleMinutes = () => {
    dispatch()
}

const StotifySum = () => {    
    const minutes = useSelector(selectMetrics)
    console.log('minutes var :')
    console.log(minutes)
    const curState = useSelector((state) => state.stotify.status)
    return (
        <>
            <div className="stat_header_one">
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <p style={{ fontFamily: '"Inter Extra Bold"', fontStyle: 'normal', fontWeight: 700, fontSize: '48px', lineHeight: '77px', paddingRight: '10px' }}>{curState === "loading" ? "..." : Math.floor(minutes[0].value)}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                        <p style={{ fontFamily: '"Inter Medium"', fontStyle: 'normal', fontWeight: 500, fontSize: '20px', lineHeight: '24px' }}>minutes écoutées</p>
                        <p style={{ fontFamily: '"Inter Light BETA"', fontStyle: 'normal', fontWeight: 500, fontSize: '20px', lineHeight: '24px' }}>sur les 30 derniers jours</p>
                    </div>
                </div>
            </div>
            <div className="stat_header_two">
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <p style={{ fontFamily: '"Inter Extra Bold"', fontStyle: 'normal', fontWeight: 700, fontSize: '48px', lineHeight: '77px', paddingRight: '10px' }}>{curState === "loading" ? "..." : "bob"/*Math.floor(minutes[1].value)*/}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                        <p style={{ fontFamily: '"Inter Medium"', fontStyle: 'normal', fontWeight: 500, fontSize: '20px', lineHeight: '24px' }}>minutes écoutées</p>
                        <p style={{ fontFamily: '"Inter Light BETA"', fontStyle: 'normal', fontWeight: 500, fontSize: '20px', lineHeight: '24px' }}>sur la dernière année</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StotifySum