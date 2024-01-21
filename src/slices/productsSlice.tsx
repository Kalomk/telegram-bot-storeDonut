// productSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface ProductType {
  id: string;
  title: string;
  price: { zł: { [key: string]: number }; '€': { [key: string]: number } };
  img: string;
  weight: number[];
  description?: string;
  totalProductWeight: number;
  isEnable: boolean;
  category: number;
}
interface ProductSliceType {
  entities: ProductType[] | [];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState = {
  entities: [],
  loading: 'pending',
} as ProductSliceType;

// Define the initial state based on your array of products
export const fetchProduct = createAsyncThunk<ProductType[]>('product/fetchProduct', async () => {
  const response = (await axios.get(`https://snakicz-bot.net/getProducts`)).data;
  return response;
});

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state) => {
      state.loading = 'pending';
      state.entities = [];
    });

    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.entities = action.payload;
    });

    builder.addCase(fetchProduct.rejected, (state) => {
      state.loading = 'failed';
      state.entities = [];
    });
  },
});

// Export the product reducer
export default productSlice.reducer;
