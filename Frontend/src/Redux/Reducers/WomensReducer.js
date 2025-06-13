import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: 'idle',
    error: null,
    womenscategories: [],
};

const Image_in_Base64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

export const postWomenCategories = createAsyncThunk(
    'womenscategories/postWomensCategories',
    async (rows, { rejectWithValue }) => {
        try {

            let Data_image = '';
            console.log("Womens Category Data", rows);

            Data_image = await Image_in_Base64(rows.image);
            console.log(`${process.env.REACT_APP_BASE_URL}/admin/women`);

            const complete_row_data = { ...rows, image: Data_image };

            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/women`, complete_row_data);
            console.log("Backend Response", response);
        }
        catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const fetchWomensCategories = createAsyncThunk(
    'womenscategories/fetchWomensCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/fetch/women`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteWomenCategory = createAsyncThunk(
    'womenscategories/deleteWomenCategory',
    async (_id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/admin/delete/women/${_id}`);
            console.log(response);
            return _id;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateWomenCategory = createAsyncThunk(
    'womencategories/updateWomenCategory',
    async ({ id, updatedData }) => {

        if (updatedData.image instanceof File) {
            const Data_image = await Image_in_Base64(updatedData.image);
            updatedData.image = Data_image;
        }

        const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/admin/update/women/${id}`, updatedData);
        return response.data;
    }
);

const womenscategoriesSlice = createSlice({
    name: 'womenscategories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postWomenCategories.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(postWomenCategories.fulfilled, (state, action) => {
                state.loading = 'idle';
                // state.womenscategories.push(action.payload);
            })
            .addCase(postWomenCategories.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.payload;
            })


            .addCase(fetchWomensCategories.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(fetchWomensCategories.fulfilled, (state, action) => {
                state.loading = 'idle';
                state.womenscategories = action.payload;

            })
            .addCase(fetchWomensCategories.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.payload;
            })


            .addCase(deleteWomenCategory.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(deleteWomenCategory.fulfilled, (state, action) => {
                state.loading = 'idle';
                state.womenscategories = state.womenscategories.filter(category => category._id !== action.payload);
            })
            .addCase(deleteWomenCategory.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.payload;
            })


            .addCase(updateWomenCategory.fulfilled, (state, action) => {
                const index = state.womenscategories.findIndex(category => category._id === action.payload._id);
                if (index !== -1) {
                    state.womenscategories[index] = action.payload;
                }
            })
    },
});

export default womenscategoriesSlice.reducer;

