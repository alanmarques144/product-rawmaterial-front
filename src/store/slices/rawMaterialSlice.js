import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import rawMaterialService from '../../services/rawMaterialService';

export const fetchRawMaterials = createAsyncThunk(
  'rawMaterials/fetchAll',
  async (_, thunkAPI) => {
    try {
      return await rawMaterialService.getAll();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createRawMaterial = createAsyncThunk(
  'rawMaterials/create',
  async (data, thunkAPI) => {
    try {
      return await rawMaterialService.create(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateRawMaterial = createAsyncThunk(
  'rawMaterials/update',
  async ({ code, data }, thunkAPI) => {
    try {
      return await rawMaterialService.update(code, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteRawMaterial = createAsyncThunk(
  'rawMaterials/delete',
  async (code, thunkAPI) => {
    try {
      await rawMaterialService.delete(code);
      return code;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const rawMaterialSlice = createSlice({
  name: 'rawMaterials',
  initialState: {
    items: [],
    status: 'idle', 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRawMaterials.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRawMaterials.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchRawMaterials.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createRawMaterial.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateRawMaterial.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.code === action.payload.code);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteRawMaterial.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.code !== action.payload);
      });
  },
});

export default rawMaterialSlice.reducer;