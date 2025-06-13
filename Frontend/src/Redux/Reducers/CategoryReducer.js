import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'


const initialState = {
    loading: 'idle',
    error: null,
    categories: [],
};

const Image_in_Base64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

export const postCategories = createAsyncThunk(
    'categories/postCategories',
    async (rows, { rejectWithValue }) => {
        try {
            console.log("DashBoard Post Request", rows)

            let Data_image = '';

            Data_image = await Image_in_Base64(rows.image);
            console.log(`${process.env.REACT_APP_BASE_URL}/admin`);

            const complete_row_data = { ...rows, image: Data_image };

            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/admin`, complete_row_data);
            return response.data;
        }

        catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const fetchpostCategories = createAsyncThunk(
    'postcategories/fetchPostCategories',
    async (_, { rejectWithValue }) => {

        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/fetch/`);
            return response.data;
        }

        catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteCategory = createAsyncThunk(
    'postcategories/deletePostCategory',
    async (_id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/admin/delete/category/${_id}`);
            console.log(response);
            return _id;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateCategory = createAsyncThunk(
    'categories/updateCategory',
    async ({ id, updatedData }) => {

        if (updatedData.image instanceof File) {
            const Data_image = await Image_in_Base64(updatedData.image);
            updatedData.image = Data_image;
        }

        const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/admin/update/category/${id}`, updatedData);
        return response.data;
    }
);

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postCategories.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(postCategories.fulfilled, (state, action) => {
                state.loading = 'idle';
                if (action.payload) {
                    // state.categories.push(action.payload);
                }
            })
            .addCase(postCategories.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.payload;
            })


            .addCase(fetchpostCategories.pending, (state) => {
                state.loading = "pending"
            })

            .addCase(fetchpostCategories.fulfilled, (state, action) => {
                state.loading = 'idle';
                state.categories = action.payload;

            })
            .addCase(fetchpostCategories.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.payload;
            })


            .addCase(deleteCategory.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.loading = 'idle';
                state.categories = state.categories.filter(category => category._id !== action.payload);
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.payload;
            })


            .addCase(updateCategory.fulfilled, (state, action) => {
                const index = state.categories.findIndex(category => category._id === action.payload._id);
                if (index !== -1) {
                    state.categories[index] = action.payload;
                }
            })
    },
});

export default categoriesSlice.reducer;
