import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

export const fetchStatus = createAsyncThunk('/setup/fetchStatus', async() => {
    let status;
    await fetch('http://127.0.0.1:5000/getRunningStatus').then(res => res.json()).then((data) => {
        status = { id: `stotify_status`, metric: "status", value: data.status }
    })
    return status
})

const setupAdapter = createEntityAdapter()
const initialState = setupAdapter.getInitialState({})

const setupSlice = createSlice({
    name: 'setup',
    initialState,
    reducers: {
    }, extraReducers: (builder) => {
        builder
            .addCase(fetchStatus.fulfilled, (state, action) => {
                setupAdapter.setOne(state, action.payload)
            })
    }
})

export default setupSlice.reducer

export const { selectAll: selectStatus } = setupAdapter.getSelectors((state) => state.status)