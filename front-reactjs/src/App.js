import './styles/home.css'
import './styles/stat_line.css'
import './styles/stat_spotify.css'
import './styles/stat_statify.css'
import './styles/graph.css'
import './styles/setup.css'

import stotify_logo from './ressources/stotify_logo.svg'

import StotifySum from './components/stotify/StotifySum'
import StotifyStats from './components/stotify/StotifyStats'
import StotifyGraph from './components/stotify/StotifyGraph'
import SpotifyStats from './components/spotify/SpotifyStats'

import store from './store'

import { fetchMinutes, fetchMisc, fetchListeningStats } from './components/stotify/stotifySlice'
import { BrowserRouter, Routes, Route } from "react-router-dom"

const handleRefresh = () => {
    store.dispatch(fetchMinutes({days: 30, len: "short"}))
    store.dispatch(fetchMinutes({days: 365, len:"long"}))

    store.dispatch(fetchMisc('artists'))
    store.dispatch(fetchMisc('albums'))
    store.dispatch(fetchMisc('tracks'))
    store.dispatch(fetchMisc('date'))

    store.dispatch(fetchListeningStats(30))
}


function App() {
    const testData = { "2022-04-01": 0, "2022-04-02": 0, "2022-04-03": 0, "2022-04-04": 0, "2022-04-05": 0, "2022-04-06": 0, "2022-04-07": 0, "2022-04-08": 0, "2022-04-09": 0, "2022-04-10": 0, "2022-04-11": 0, "2022-04-12": 0, "2022-04-13": 0, "2022-04-14": 0, "2022-04-15": 6, "2022-04-16": 14, "2022-04-17": 44, "2022-04-18": 39, "2022-04-19": 43, "2022-04-20": 0, "2022-04-21": 0, "2022-04-22": 0, "2022-04-23": 0, "2022-04-24": 0, "2022-04-25": 0, "2022-04-26": 0, "2022-04-27": 0, "2022-04-28": 45, "2022-04-29": 77, "2022-04-30": 12 }
    const testArray = []
    for (const key in testData) {
        testArray.push(
            {date: key, value: testData[key]}
        )
    }

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
                <StotifyGraph/>
                {/* Miscelleanous stats */}
                <StotifyStats />
                {/* Top stats spotify */}
                <SpotifyStats />
                {/* Top stats statify */}
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
                                <th style={{ width: '10%' }} />
                                <th style={{ width: '20%' }}>Song art</th>
                                <th>Titre</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="rank">1</td>
                                <td><img className="track_img" src="https://i.scdn.co/image/ab67616d00001e02034f85da463faf79527d1fe0" /></td>
                                <td><b>Uranus</b><br />de PNL </td>
                            </tr>
                            <tr>
                                <td className="rank">2</td>
                                <td><img className="track_img" src="https://i.scdn.co/image/ab67616d00001e026c3966c4dd0eb2273696fe16" /></td>
                                <td><b>Autre monde</b><br />de PNL </td>
                            </tr>
                            <tr>
                                <td className="rank">3</td>
                                <td><img className="track_img" src="https://i.scdn.co/image/ab67616d00001e026c3966c4dd0eb2273696fe16" /></td>
                                <td><b>Blanka</b><br />de PNL </td>
                            </tr>
                            <tr>
                                <td className="rank">4</td>
                                <td><img className="track_img" src="https://i.scdn.co/image/ab67616d00001e02da874e05558f98561a20e69b" /></td>
                                <td><b>Aznavour</b><br />de Kekra </td>
                            </tr>
                            <tr>
                                <td className="rank">5</td>
                                <td><img className="track_img" src="https://i.scdn.co/image/ab67616d00001e0257c87959e63d634cd5128e36" /></td>
                                <td><b>Capuche</b><br />de PNL </td>
                            </tr>
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
                                <th style={{ width: '10%' }} />
                                <th style={{ width: '20%' }}>Song art</th>
                                <th>Titre</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="rank">1</td>
                                <td><img className="track_img" src="https://i.scdn.co/image/ab67616d00001e02034f85da463faf79527d1fe0" /></td>
                                <td><b>Uranus</b><br />de PNL </td>
                            </tr>
                            <tr>
                                <td className="rank">2</td>
                                <td><img className="track_img" src="https://i.scdn.co/image/ab67616d00001e026c3966c4dd0eb2273696fe16" /></td>
                                <td><b>Autre monde</b><br />de PNL </td>
                            </tr>
                            <tr>
                                <td className="rank">3</td>
                                <td><img className="track_img" src="https://i.scdn.co/image/ab67616d00001e026c3966c4dd0eb2273696fe16" /></td>
                                <td><b>Blanka</b><br />de PNL </td>
                            </tr>
                            <tr>
                                <td className="rank">4</td>
                                <td><img className="track_img" src="https://i.scdn.co/image/ab67616d00001e02da874e05558f98561a20e69b" /></td>
                                <td><b>Aznavour</b><br />de Kekra </td>
                            </tr>
                            <tr>
                                <td className="rank">5</td>
                                <td><img className="track_img" src="https://i.scdn.co/image/ab67616d00001e0257c87959e63d634cd5128e36" /></td>
                                <td><b>Capuche</b><br />de PNL </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default App