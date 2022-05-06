import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

export const fetchMinutes = createAsyncThunk('stotify/fetchMinutes', async (props) => {
    const {days, len} = props;
    let minuteOutput = [];
    await fetch(`http://127.0.0.1:5000/getNumberMinutesPlayed?days=${days}`).then(res => res.json()).then(data => minuteOutput = { id: `minutes_${len}`, metric: "minutesPlayed", value: data.minutesPlayed / 60000 })
    return minuteOutput
})

export const fetchMisc = createAsyncThunk('stotify/fetchMisc', async (type = 'artists') => {
    const reqType = [
        'artists',
        'albums',
        'tracks',
        'date'
    ]
    type = reqType.includes(type) ? type : 'artists'
    let reqOutput;
    switch (type) {
        case 'artists':
            await fetch('http://127.0.0.1:5000/getNumberArtists').then(res => res.json()).then(data => reqOutput = { id: `misc_t${type}`, metric: "miscStat", value: data.len })
            break;
        case 'albums':
            await fetch('http://127.0.0.1:5000/getNumberAlbums').then(res => res.json()).then(data => reqOutput = { id: `misc_t${type}`, metric: "miscStat", value: data.len })
            break;
        case 'tracks':
            await fetch('http://127.0.0.1:5000/getNumberTracks').then(res => res.json()).then(data => reqOutput = { id: `misc_t${type}`, metric: "miscStat", value: data.len })
            break;
        case 'date':
            await fetch('http://127.0.0.1:5000/getFirstTrackDate').then(res => res.json()).then(data => reqOutput = { id: `misc_t${type}`, metric: "miscStat", value: data.firstDate })
            break;
        default:
            console.log('No type provided')
    }
    return reqOutput
})

export const fetchListeningStats = createAsyncThunk('stotify/fetchListeningStats', async (days = 30) => {
    let outputData = []
    await fetch(`http://127.0.0.1:5000/stotify/getPlayedStats?days=${days}`).then(res => res.json()).then(data => {
        for (const key in data) {
            outputData.push({
                date: key,
                value: data[key]
            })
        }
    })
    return { id: "fetch_listening_stats", metric: "listStat", value: outputData }
})

const stotifyAdapter = createEntityAdapter()
const initialState = stotifyAdapter.getInitialState({})


const stotifySlice = createSlice({
    name: 'stotify',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMinutes.fulfilled, (state, action) => {
               stotifyAdapter.setOne(state, action.payload)
            })
            .addCase(fetchMisc.fulfilled, (state, action) => {
                stotifyAdapter.setOne(state, action.payload)
            })
            .addCase(fetchListeningStats.fulfilled, (state, action) => {
                stotifyAdapter.setOne(state, action.payload)
            })
    }
})

export default stotifySlice.reducer


export const { selectAll: selectMetrics } = stotifyAdapter.getSelectors((state) => state.stotify)

export const selectGoodMetrics = createSelector(selectMetrics, (metrics) => {
    const metricsMap = {}
    metrics.forEach((metric) => {
        let metricid = metric.id
        metricsMap[metricid] = { 'metric': metric.metric, 'value': metric.value }
    })
    return metricsMap
})

export const selectId = createSelector(selectMetrics, (metrics) => {
    return metrics.map((metric) => metric.id)
})