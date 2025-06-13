import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: 'idle',
    error: null,
    query: '',
};


export const SearchBar = createAsyncThunk(
    'search/searchbar',
    async (query, { rejectWithValue }) => {
        try {
            console.log("Redux me ary", query)
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/home/search`, { query });
            console.log(response.data);
            return response.data.results;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const SearchQuerySlice = createSlice({
    name: 'search',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchBar.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(SearchBar.fulfilled, (state, action) => {
                state.loading = 'idle';
                state.query = action.payload;
            })

            .addCase(SearchBar.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.payload;
            })

        // .addCase(fetchFavorite.pending, (state) => {
        //     state.loading = 'pending';
        //     state.error = null;
        // })
        // .addCase(fetchFavorite.fulfilled, (state, action) => {
        //     state.loading = 'idle';
        //     state.favorites = action.payload;

        // })
        // .addCase(fetchFavorite.rejected, (state, action) => {
        //     state.loading = 'idle';
        //     state.error = action.payload;
        // })

    },
});

export default SearchQuerySlice.reducer;