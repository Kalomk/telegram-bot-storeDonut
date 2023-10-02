// productSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import img from '../images/fish-44-1024x602.png';

export interface ProductType {
  id: string;
  title: string;
  description: string;
  price: number;
  img: typeof img;
  weight: number[];
  category: number;
}

// Define the initial state based on your array of products

const initialState: ProductType[] = [
  {
    id: '1',
    title: 'Sneki rybni',
    description: 'Lorem ipsum dolor sit amet consectetur',
    price: 12,
    img,
    weight: [100, 200, 250, 500],
    category: 1,
  },
  {
    id: '2',
    title: 'Sneki rybni',
    description: 'Lorem ipsum dolor sit amet consectetur',
    price: 34,
    img,
    weight: [100, 250, 500, 1000],
    category: 2,
  },
  {
    id: '3',
    title: 'Sneki rybni',
    description: 'Lorem ipsum dolor sit amet consectetur',
    price: 14,
    img,
    weight: [100, 250, 500, 1000],
    category: 2,
  },
  {
    id: '4',
    title: 'Sneki rybni',
    description: 'Lorem ipsum dolor sit amet consectetur',
    price: 34,
    img,
    weight: [100, 250, 500, 1000],
    category: 2,
  },
  {
    id: '5',
    title: 'Sneki rybni',
    description: 'Lorem ipsum dolor sit amet consectetur',
    price: 44,
    img,
    weight: [100, 250, 500, 1000],
    category: 3,
  },
  {
    id: '6',
    title: 'Sneki rybni',
    description: 'Lorem ipsum dolor sit amet consectetur',
    price: 24,
    img,
    weight: [100, 250, 500, 1000],
    category: 3,
  },
  {
    id: '7',
    title: 'Sneki rybni',
    description: 'Lorem ipsum dolor sit amet consectetur',
    price: 124,
    img,
    weight: [100, 250, 500, 1000],
    category: 1,
  },
  {
    id: '8',
    title: 'Sneki rybni',
    description: 'Lorem ipsum dolor sit amet consectetur',
    price: 34,
    img,
    weight: [100, 250, 500, 1000],
    category: 3,
  },
  {
    id: '9',
    title: 'Sneki rybni',
    description: 'Lorem ipsum dolor sit amet consectetur',
    price: 64,
    img,
    weight: [100, 250, 500, 1000],
    category: 1,
  },
];

// Create a slice with only the initial state
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {}, // No reducer functions are defined
});

// Export the product reducer
export default productSlice.reducer;
