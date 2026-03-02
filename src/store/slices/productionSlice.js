import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productionService from '../../services/productionService';

export const fetchSuggestions = createAsyncThunk(
  'production/fetchSuggestions',
  async (_, thunkAPI) => {
    try {
      return await productionService.getSuggestions();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const productionSlice = createSlice({
  name: 'production',
  initialState: { 
    suggestions: [], 
    totalValue: 0,
    status: 'idle', 
    error: null 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.suggestions = action.payload.suggestions;
        state.totalValue = action.payload.totalValue;
      })
      .addCase(fetchSuggestions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default productionSlice.reducer;