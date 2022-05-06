import { useSelector } from 'react-redux'
import { BarChart, Bar, ResponsiveContainer } from 'recharts';

import arrow_right from '../../ressources/arrow_right.svg'
import store from '../../store'
import { fetchListeningStats, selectMetrics } from './stotifySlice'

store.dispatch(fetchListeningStats(29))

function StotifyGraph() {
    const listStat = useSelector(selectMetrics).filter(item => item.id.includes("fetch_listening_stats"))[0]
    return (
        <div className="main_graph">
            <p>Statistiques sur les 30 derniers jours</p>
            <div className="graph">
                <ResponsiveContainer width="95%" height="100%">
                    <BarChart width={150} height={40} data={listStat === undefined ? [{date: "1999-04-03", value: 0}] : listStat.value}>
                        <Bar dataKey="value" fill="#1D413D" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="graph_details">
                <a> VOIR LES STATISTIQUES DETAILLES </a>
            </div>
        </div>
    )
}

export default StotifyGraph