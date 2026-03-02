import { configureStore } from '@reduxjs/toolkit';
import rawMaterialReducer from './slices/rawMaterialSlice';

export const store = configureStore({
  reducer: {
    rawMaterials: rawMaterialReducer,
  },
});