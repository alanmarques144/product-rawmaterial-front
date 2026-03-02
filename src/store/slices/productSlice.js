import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from '../../services/productService';

export const fetchProducts = createAsyncThunk('products/fetchAll', async (_, thunkAPI) => {
  try { return await productService.getAll(); } 
  catch (error) { return thunkAPI.rejectWithValue(error.message); }
});

export const createProduct = createAsyncThunk('products/create', async (data, thunkAPI) => {
  try { return await productService.create(data); } 
  catch (error) { return thunkAPI.rejectWithValue(error.message); }
});

export const updateProduct = createAsyncThunk('products/update', async ({ code, data }, thunkAPI) => {
  try { return await productService.update(code, data); } 
  catch (error) { return thunkAPI.rejectWithValue(error.message); }
});

export const deleteProduct = createAsyncThunk('products/delete', async (code, thunkAPI) => {
  try {
    await productService.delete(code);
    return code;
  } catch (error) { return thunkAPI.rejectWithValue(error.message); }
});

const productSlice = createSlice({
  name: 'products',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createProduct.fulfilled, (state, action) => { state.items.push(action.payload); })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.code === action.payload.code);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.code !== action.payload);
      });
  },
});

export default productSlice.reducer;