import './styles/website.css'
import './styles/stat_line.css'
import './styles/stat_spotify.css'
import './styles/stat_statify.css'
import './styles/graph.css'

import stotify_logo from './ressources/stotify_logo.svg'
import arrow_right from './ressources/arrow_right.svg'
import StotifySum from './components/stotify/StotifySum'

import store from './store'

function App() {
    console.log(store.getState())
    return (
        <div>
            <link rel="icon" href={stotify_logo}/>
            <div className="main-wrapper">
                {/* Logo */}
                <div className="header_logo">
                    <img style={{ width: '37px' }} src={stotify_logo} />
                    <a style={{ fontFamily: '"Inter Black"', fontStyle: 'normal', fontWeight: 800, fontSize: '48px', lineHeight: '42px', color: '#6DF0D1', paddingLeft: '10px' }}>STOTIFY</a>
                </div>
                {/* Header statistics */}
                <StotifySum/>
                {/* Main graph */}
                <div className="main_graph">
                    <p>Statistiques sur les 30 derniers jours</p>
                    <div className="graph">
                    </div>
                    <div className="graph_details">
                        <a> VOIR LES STATISTIQUES DETAILLES </a>
                        <img style={{ paddingLeft: '15px' }} src={arrow_right} />
                    </div>
                </div>
                {/* Miscelleanous stats */}
                <div className="main_stat">
                    <div className="stat_misc_one stat_generic">
                        <p>Artistes</p>
                        <a>150</a>
                    </div>
                    <div className="stat_misc_two stat_generic">
                        <p>Albums</p>
                        <a>75</a>
                    </div>
                    <div className="stat_misc_three stat_generic">
                        <p>Musiques</p>
                        <a>7000</a>
                    </div>
                    <div className="stat_misc_four stat_generic">
                        <p>Depuis</p>
                        <a>15/03</a>
                    </div>
                </div>
                {/* Top stats spotify */}
                <div className="stat_top_spotify_one">
                    <div className="stat_indicator_wrap">
                        <div className="stat_indicator">
                            SPOTIFY
                        </div>
                        <p>Musiques les plus écoutées</p>
                    </div>
                    <div className="stat_spotify_details">
                        <a> VOIR LES STATISTIQUES DETAILLES </a>
                        <img style={{ paddingLeft: '15px' }} src={arrow_right} />
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
                <div className="stat_top_spotify_two">
                    <div className="stat_indicator_wrap">
                        <div className="stat_indicator">
                            SPOTIFY
                        </div>
                        <p>Artistes les plus écoutées</p>
                    </div>
                    <div className="stat_spotify_details">
                        <a> VOIR LES STATISTIQUES DETAILLES </a>
                        <img style={{ paddingLeft: '15px' }} src={arrow_right} />
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
                        <img style={{ paddingLeft: '15px' }} src={arrow_right} />
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
                        <img style={{ paddingLeft: '15px' }} src={arrow_right} />
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