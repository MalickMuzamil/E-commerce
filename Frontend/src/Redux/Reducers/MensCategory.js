import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: 'idle',
    error: null,
    menscategories: [],
};

const Image_in_Base64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

export const postMensCategories = createAsyncThunk(
    'menscategories/postMensCategories',
    async (rows, { rejectWithValue }) => {
        try {

            console.log("Mens Category Data", rows);
            console.log(`${process.env.REACT_APP_BASE_URL}/admin/men`);

            let Data_image = '';

            Data_image = await Image_in_Base64(rows.image);

            const complete_row_data = { ...rows, image: Data_image };

            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/men`, complete_row_data);
            console.log("Backend Response", response);
        }
        catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const fetchMensCategories = createAsyncThunk(
    'menscategories/fetchMensCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/fetch/men`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteMenCategory = createAsyncThunk(
    'menscategories/deleteMenCategory',
    async (_id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/admin/delete/men/${_id}`);
            console.log(response);
            return _id;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateMenCategory = createAsyncThunk(
    'mencategories/updateMenCategory',
    async ({ id, updatedData }) => {

        if (updatedData.image instanceof File) {
            const Data_image = await Image_in_Base64(updatedData.image);
            updatedData.image = Data_image;
        }

        const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/admin/update/men/${id}`, updatedData);
        return response.data;
    }
);

const menscategoriesSlice = createSlice({
    name: 'menscategories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postMensCategories.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(postMensCategories.fulfilled, (state, action) => {
                state.loading = 'idle';
                // state.menscategories.push(action.payload);
            })
            .addCase(postMensCategories.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.payload;
            })


            .addCase(fetchMensCategories.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(fetchMensCategories.fulfilled, (state, action) => {
                state.loading = 'idle';
                state.menscategories = action.payload;

            })
            .addCase(fetchMensCategories.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.payload;
            })

            .addCase(deleteMenCategory.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(deleteMenCategory.fulfilled, (state, action) => {
                state.loading = 'idle';
                state.menscategories = state.menscategories.filter(category => category._id !== action.payload);
            })
            .addCase(deleteMenCategory.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.payload;
            })

            .addCase(updateMenCategory.fulfilled, (state, action) => {
                const index = state.menscategories.findIndex(category => category._id === action.payload._id);
                if (index !== -1) {
                    state.menscategories[index] = action.payload;
                }
            })
    },
});


export default menscategoriesSlice.reducer;

