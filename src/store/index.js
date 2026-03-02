import { configureStore } from '@reduxjs/toolkit';
import rawMaterialReducer from './slices/rawMaterialSlice';
import productReducer from './slices/productSlice';

export const store = configureStore({
  reducer: {
    rawMaterials: rawMaterialReducer,
    products: productReducer,
  },
});