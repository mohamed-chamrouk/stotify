import { useSelector } from 'react-redux'
import { BarChart, Bar, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';

import store from '../../store'
import '../../styles/buttons.css'
import { fetchListeningTracksStats, selectMetrics } from './stotifySlice'
import { useEffect } from 'react';

function StotifyGraph() {
    useEffect(() => {
        store.dispatch(fetchListeningTracksStats(29))
    }, [])

    const listStat = useSelector(selectMetrics).filter(item => item.id.includes("fetch_listening_tracks_stats"))[0]

    return (
        <div className="main_graph">
            <p>Statistiques sur les 30 derniers jours</p>
            <div className="graph">
                <ResponsiveContainer width="95%" height="100%">
                    <BarChart width={150} height={40} data={listStat === undefined ? [{ date: "1999-04-03", value: 0 }] : listStat.value}>
                        <Bar dataKey="value" fill="#1D413D" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="graph_details">
                <Link className="detailed_stats_button" to='/stotify'>
                    <button className="detailed_stats_txt">VOIR LES STATISTIQUES DETAILLES  &#8594;</button>
                </Link>
            </div>
        </div>
    )
}

export default StotifyGraph