// productSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import img from '../images/fish-44-1024x602.png';

export interface ProductType {
  id: string;
  title: string;
  price: number[];
  img: typeof img;
  weight: number[];
  category: number;
}

// Define the initial state based on your array of products

const initialState: ProductType[] = [
  {
    id: '1',
    title: 'Ікряник з лосося',
    price: [15, 35, 60, 115],
    img,
    weight: [100, 250, 500, 1000],
    category: 1,
  },
  {
    id: '2',
    title: 'Анчоус',
    price: [15, 35, 60, 110],
    img,
    weight: [100, 250, 500, 1000],
    category: 1,
  },
  {
    id: '3',
    title: 'Янтарна з перцем',
    price: [16, 40, 70, 130],
    img,
    weight: [100, 250, 500, 1000],
    category: 1,
  },
  {
    id: '4',
    title: 'Соломка тріски',
    price: [16, 40, 70, 130],
    img,
    weight: [100, 250, 500, 1000],
    category: 1,
  },
  {
    id: '5',
    title: 'Соломка тріски з перцем',
    price: [16, 40, 70, 130],
    img,
    weight: [100, 250, 500, 1000],
    category: 1,
  },
  {
    id: '6',
    title: 'Кальмар по-шанхайськи',
    price: [16, 40, 70, 135],
    img,
    weight: [100, 250, 500, 1000],
    category: 2,
  },
  {
    id: '7',
    title: 'Кільця кальмара',
    price: [16, 40, 75, 145],
    img,
    weight: [100, 250, 500, 1000],
    category: 2,
  },
  {
    id: '8',
    title: 'Стружка кальмара',
    price: [16, 40, 80, 150],
    img,
    weight: [100, 250, 500, 1000],
    category: 2,
  },
  {
    id: '9',
    title: 'Ставридка',
    price: [15, 35, 60, 105],
    img,
    weight: [100, 250, 500, 1000],
    category: 1,
  },
  {
    id: '10',
    title: 'Павутинка тунця з перцем',
    price: [16, 40, 75, 140],
    img,
    weight: [100, 250, 500, 1000],
    category: 1,
  },
  {
    id: '11',
    title: 'Сет Дегустаційний',
    price: [70, 135],
    img,
    weight: [500, 1000],
    category: 3,
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
