import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

export const fetchSetup = createAsyncThunk('/setup/', async() => {
    await fetch('http://127.0.0.1:5000/setup/')
})