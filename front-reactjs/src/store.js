import { configureStore } from '@reduxjs/toolkit'

import stotifyReducer from './components/stotify/stotifySlice'
import spotifyReducer from './components/spotify/spotifySlice'


const store = configureStore({
    reducer: {
        stotify: stotifyReducer,
        spotify: spotifyReducer
    }
})

export default store;
