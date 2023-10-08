// productSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import img from '../images/fish-44-1024x602.png';

export interface ProductType {
  id: string;
  title: string;
  price: number[];
  img: string;
  weight: number[];
  category: number;
}

// Define the initial state based on your array of products

const initialState: ProductType[] = [
  {
    id: '1',
    title: 'Ікряник з лосося',
    price: [15, 35, 60, 115],
    img: 'https://imagizer.imageshack.com/img924/4245/dSnrVy.jpg',
    weight: [100, 250, 500, 1000],
    category: 1,
  },
  {
    id: '2',
    title: 'Анчоус',
    price: [15, 35, 60, 110],
    img: 'https://imagizer.imageshack.com/img924/2086/HPRwwU.jpg',
    weight: [100, 250, 500, 1000],
    category: 1,
  },
  {
    id: '3',
    title: 'Бурштинова з перцем',
    price: [16, 40, 70, 130],
    img: 'https://imagizer.imageshack.com/img922/2047/vVuhDm.jpg',
    weight: [100, 250, 500, 1000],
    category: 1,
  },
  {
    id: '4',
    title: 'Соломка тріски',
    price: [16, 40, 70, 130],
    img: 'https://imagizer.imageshack.com/img924/1908/Fevmgr.jpg',
    weight: [100, 250, 500, 1000],
    category: 1,
  },
  {
    id: '5',
    title: 'Соломка тріски з перцем',
    price: [16, 40, 70, 130],
    img: 'https://imagizer.imageshack.com/img922/1299/uW554T.jpg',
    weight: [100, 250, 500, 1000],
    category: 1,
  },
  {
    id: '6',
    title: 'Кальмар по-шанхайськи',
    price: [16, 40, 70, 135],
    img: 'https://imagizer.imageshack.com/img923/8853/SRweGq.jpg',
    weight: [100, 250, 500, 1000],
    category: 2,
  },
  {
    id: '7',
    title: 'Кільця кальмара',
    price: [16, 40, 75, 145],
    img: 'https://imagizer.imageshack.com/img924/6471/vT8lba.jpg',
    weight: [100, 250, 500, 1000],
    category: 2,
  },
  {
    id: '8',
    title: 'Стружка кальмара',
    price: [16, 40, 80, 150],
    img: 'https://imagizer.imageshack.com/img924/4177/2rovl5.jpg',
    weight: [100, 250, 500, 1000],
    category: 2,
  },
  {
    id: '9',
    title: 'Ставридка',
    price: [15, 35, 60, 105],
    img: 'https://imagizer.imageshack.com/img923/2121/kntebT.jpg',
    weight: [100, 250, 500, 1000],
    category: 1,
  },
  {
    id: '10',
    title: 'Павутинка тунця з перцем',
    price: [16, 40, 75, 140],
    img: 'https://imagizer.imageshack.com/img923/7159/0RwhkB.jpg',
    weight: [100, 250, 500, 1000],
    category: 1,
  },
  {
    id: '11',
    title: 'Сет Дегустаційний',
    price: [135],
    img: 'https://imagizer.imageshack.com/img924/7130/vUivSi.jpg',
    weight: [1000],
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
