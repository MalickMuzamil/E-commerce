import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: 'idle',
    error: null,
    cart: [],
};

export const AddCart = createAsyncThunk(
    'cart/AddCart',
    async (cart, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/home/addCart`, cart);
            return response.data;
        }

        catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const fetchCart = createAsyncThunk(
    'CartCategories/fetchCartCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/home/fetchCart`);
            return response.data;
        }
        catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const removeCart = createAsyncThunk(
    'Cart/removeCart',
    async (id, { rejectWithValue }) => {
        try {
            console.log("Removing Cart ID:", id);
            await axios.delete(`${process.env.REACT_APP_BASE_URL}/home/removeCart/${id}`);
            return id;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AddCart.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(AddCart.fulfilled, (state, action) => {

            })

            .addCase(AddCart.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.payload;
            })

            .addCase(removeCart.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(removeCart.fulfilled, (state, action) => {
                state.loading = 'idle';
                state.cart = state.cart.filter(cart => cart.id !== action.payload);
            })
            .addCase(removeCart.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.payload;
            })

            .addCase(fetchCart.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = 'idle';
                state.cart = action.payload;

            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.payload;
            })

    },
});

export default cartSlice.reducer;
