import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

export const fetchMinutes = createAsyncThunk('stotify/fetchMinutes', async (days=30) => {
    let minuteOutput = [];
    await fetch(`http://127.0.0.1:5000/getNumberMinutesPlayed?days=${days}`).then(res => res.json()).then(data => minuteOutput = {id: `minutes_d${days}`, metric: "minutesPlayed30days", value: data.minutesPlayed/60000})
    return minuteOutput
})

const stotifyAdapter = createEntityAdapter()
const initialState = stotifyAdapter.getInitialState({
    status: 'idle',
})


const stotifySlice = createSlice({
    name: 'stotify',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMinutes.pending, (state, action) => {
                state.status= 'loading'
            })
            .addCase(fetchMinutes.fulfilled, (state, action) => {
                stotifyAdapter.setOne(state, action.payload)
                state.status = 'idle'
            })
    }
})

export default stotifySlice.reducer


export const { selectAll: selectMetrics } = stotifyAdapter.getSelectors((state) => state.stotify)

export const selectId = createSelector(selectMetrics, (metrics) => {
    return metrics.map((metric) => metric.id)
})