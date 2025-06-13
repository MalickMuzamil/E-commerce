import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: 'idle',
    error: null,
    kidscategories: [],
};

const Image_in_Base64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};


export const postKidsCategories = createAsyncThunk(
    'kidscategories/postKidsCategories',
    async (rows, { rejectWithValue }) => {
        try {

            let Data_image = '';
            console.log("Kids Category Data", rows);
            console.log(`${process.env.REACT_APP_BASE_URL}/admin/kid`);

            Data_image = await Image_in_Base64(rows.image);
            const complete_row_data = { ...rows, image: Data_image };


            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/kid`, complete_row_data);
            console.log("Backend Response", response);
            return response.data;
        }

        catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const fetchKidsCategories = createAsyncThunk(
    'kidscategories/fetchKidsCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/fetch/kid`);
            return response.data;
        } 
        catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteKidsCategory = createAsyncThunk(
    'menscategories/deleteMenCategory',
    async (_id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/admin/delete/kid/${_id}`);
            console.log(response);
            return _id;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateKidsCategory = createAsyncThunk(
    'kidscategories/updateKidsCategory',
    async ({ id, updatedData }) => {
        
        if (updatedData.image instanceof File) {
            const Data_image = await Image_in_Base64(updatedData.image);
            updatedData.image = Data_image;
        }

        const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/admin/update/kid/${id}`, updatedData);
        return response.data;
    }
);

const kidscategoriesSlice = createSlice({
    name: 'kidscategories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postKidsCategories.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(postKidsCategories.fulfilled, (state, action) => {
                state.loading = 'idle';
                if (action.payload) {
                    // state.kidscategories.push(action.payload);
                }
            })
            .addCase(postKidsCategories.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.payload;
            })

            .addCase(fetchKidsCategories.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(fetchKidsCategories.fulfilled, (state, action) => {
                state.loading = 'idle';
                state.kidscategories = action.payload;

            })
            .addCase(fetchKidsCategories.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.payload;
            })

            .addCase(deleteKidsCategory.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(deleteKidsCategory.fulfilled, (state, action) => {
                state.loading = 'idle';
                state.kidscategories = state.kidscategories.filter(category => category._id !== action.payload);
            })
            .addCase(deleteKidsCategory.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.payload;
            })

            .addCase(updateKidsCategory.fulfilled, (state, action) => {
                const index = state.kidscategories.findIndex(category => category._id === action.payload._id);
                if (index !== -1) {
                    state.kidscategories[index] = action.payload;
                }
            })
    },
});

export default kidscategoriesSlice.reducer;
