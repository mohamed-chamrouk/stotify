import { configureStore } from '@reduxjs/toolkit'

import stotifyReducer from './components/stotify/stotifySlice'
import spotifyReducer from './components/spotify/spotifySlice'
import statusReducer from './components/setup/setupSlice'


const store = configureStore({
    reducer: {
        stotify: stotifyReducer,
        spotify: spotifyReducer,
        status: statusReducer,
    }
})

export default store;
