import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: 'idle',
    error: null,
    favorites: [],
};

export const addFavorite = createAsyncThunk(
    'favorites/addFavorite',
    async (favorite, { rejectWithValue }) => {
        try {

            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/home/add`, favorite);
            return response.data;
        } 
        
        catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const removeFavorite = createAsyncThunk(
    'favorites/removeFavorite',
    async (id, { rejectWithValue }) => {
        try {
            console.log("Removing Favorite ID:", id);
            await axios.delete(`${process.env.REACT_APP_BASE_URL}/home/remove/${id}`);
            return id;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const fetchFavorite = createAsyncThunk(
    'favoritecategories/fetchFaviroteCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/home/fetch`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addFavorite.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(addFavorite.fulfilled, (state, action) => {

            })

            .addCase(addFavorite.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.payload;
            })


            .addCase(removeFavorite.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(removeFavorite.fulfilled, (state, action) => {
                state.loading = 'idle';
                state.favorites = state.favorites.filter(fav => fav.id !== action.payload);
            })
            .addCase(removeFavorite.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.payload;
            })

            .addCase(fetchFavorite.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(fetchFavorite.fulfilled, (state, action) => {
                state.loading = 'idle';
                state.favorites = action.payload;

            })
            .addCase(fetchFavorite.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.payload;
            })

    },
});

export default favoritesSlice.reducer;
