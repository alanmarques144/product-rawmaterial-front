import { configureStore } from '@reduxjs/toolkit';
import rawMaterialReducer from './slices/rawMaterialSlice';
import productReducer from './slices/productSlice';
import productionReducer from './slices/productionSlice';

export const store = configureStore({
  reducer: {
    rawMaterials: rawMaterialReducer,
    products: productReducer,
    production: productionReducer,
  },
});