// productSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import img from '../images/fish-44-1024x602.png';
import treska_perec from '../images/IMG_2706.JPG';
import set from '../images/IMG_2703.JPG';
import treska from '../images/IMG_2708.JPG';
import pavutynka from '../images/IMG_2709.JPG';
import ikrianyk from '../images/IMG_2716.JPG';
import stavrydka from '../images/IMG_2718.JPG';
import yantarna_z_percem from '../images/IMG_2723.JPG';
import struzka_kalmar from '../images/IMG_2727.JPG';
import kilca_kalmaru from '../images/IMG_2732.JPG';
import anchous from '../images/IMG_2737.JPG';
import shanhai from '../images/IMG_2740.JPG';

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
    img: ikrianyk,
    weight: [100, 250, 500, 1000],
    category: 1,
  },
  {
    id: '2',
    title: 'Анчоус',
    price: [15, 35, 60, 110],
    img: anchous,
    weight: [100, 250, 500, 1000],
    category: 1,
  },
  {
    id: '3',
    title: 'Бурштинова з перцем',
    price: [16, 40, 70, 130],
    img: yantarna_z_percem,
    weight: [100, 250, 500, 1000],
    category: 1,
  },
  {
    id: '4',
    title: 'Соломка тріски',
    price: [16, 40, 70, 130],
    img: treska,
    weight: [100, 250, 500, 1000],
    category: 1,
  },
  {
    id: '5',
    title: 'Соломка тріски з перцем',
    price: [16, 40, 70, 130],
    img: treska_perec,
    weight: [100, 250, 500, 1000],
    category: 1,
  },
  {
    id: '6',
    title: 'Кальмар по-шанхайськи',
    price: [16, 40, 70, 135],
    img: shanhai,
    weight: [100, 250, 500, 1000],
    category: 2,
  },
  {
    id: '7',
    title: 'Кільця кальмара',
    price: [16, 40, 75, 145],
    img: kilca_kalmaru,
    weight: [100, 250, 500, 1000],
    category: 2,
  },
  {
    id: '8',
    title: 'Стружка кальмара',
    price: [16, 40, 80, 150],
    img: struzka_kalmar,
    weight: [100, 250, 500, 1000],
    category: 2,
  },
  {
    id: '9',
    title: 'Ставридка',
    price: [15, 35, 60, 105],
    img: stavrydka,
    weight: [100, 250, 500, 1000],
    category: 1,
  },
  {
    id: '10',
    title: 'Павутинка тунця з перцем',
    price: [16, 40, 75, 140],
    img: pavutynka,
    weight: [100, 250, 500, 1000],
    category: 1,
  },
  {
    id: '11',
    title: 'Сет Дегустаційний',
    price: [70, 135],
    img: set,
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
