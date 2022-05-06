import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

export const fetchTopArtists = createAsyncThunk('spotify/fetchTopArtists', async (term = '', limit = "5") => {
    let topArtists = [];
    let arrayOutput = []
    await fetch(`http://127.0.0.1:5000/spotify/getMyTopArtists?term=${term}&limit=5`).then(res => res.json()).then(data => {
        data.items.forEach((item) => {
            topArtists.push({ id: data.items.indexOf(item), name: item.name, image: item.images[2].url, link: item.external_urls.spotify })
        }
        )
        arrayOutput = { id: `fetch_artists_${term}`, metric: "topStats", value: topArtists }
    })
    return arrayOutput
})

export const fetchTopTracks = createAsyncThunk('spotify/fetchTopTracks', async (term = '', limit = "5") => {
    let topTracks = [];
    let arrayOutput = []
    await fetch(`http://127.0.0.1:5000/spotify/getMyTopTracks?term=${term}&limit=5`).then(res => res.json()).then(data => {
        data.items.forEach((item) => {
            topTracks.push({ id: data.items.indexOf(item), name: item.name, artist: item.artists[0].name, image: item.album.images[2].url, link: item.external_urls.spotify })
        })
        arrayOutput = { id: `fetch_tracks_${term}`, metric: "topStats", value: topTracks }
    })
    return arrayOutput
})

const spotifyAdapter = createEntityAdapter()
const initialState = spotifyAdapter.getInitialState({})

const spotifySlice = createSlice({
    name: 'spotify',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTopArtists.fulfilled, (state, action) => {
                spotifyAdapter.setOne(state, action.payload)
            })
            .addCase(fetchTopTracks.fulfilled, (state, action) => {
                spotifyAdapter.setOne(state, action.payload)
            })
    }
})

export default spotifySlice.reducer

export const { selectAll: selectTops } = spotifyAdapter.getSelectors((state) => state.spotify)

export const selectId = createSelector(selectTops, (tops) => {
    return tops.map((top) => top.id)
})