import { React, useEffect } from 'react'

import SpotifyFullStat from './SpotifyFullStat'

function SpotifyHome() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    return (
        <SpotifyFullStat />
    )
}

export default SpotifyHome