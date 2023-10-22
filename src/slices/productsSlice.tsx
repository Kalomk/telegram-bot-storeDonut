// productSlice.ts
import { createSlice } from '@reduxjs/toolkit';

export interface ProductType {
  id: string;
  title: string;
  price: { zł: number[]; eu: number[] };
  img: string;
  weight: number[];
  category: number;
}

// Define the initial state based on your array of products

const initialState: ProductType[] = [
  {
    id: '0',
    title: 'Ікряник з лосося',
    price: {
      zł: [15, 35, 60, 115],
      eu: [3.3, 7.7, 13.3, 25.5],
    },
    img: 'https://imagizer.imageshack.com/img924/4245/dSnrVy.jpg',
    weight: [100, 250, 500, 1000],
    category: 1,
  },
  {
    id: '1',
    title: 'Анчоус',
    price: {
      zł: [15, 35, 60, 110],
      eu: [3.3, 7.7, 13.3, 24.4],
    },
    img: 'https://imagizer.imageshack.com/img924/2086/HPRwwU.jpg',
    weight: [100, 250, 500, 1000],
    category: 1,
  },
  {
    id: '2',
    title: 'Бурштинова з перцем',
    price: {
      zł: [16, 40, 70, 130],
      eu: [3.5, 8.8, 15.5, 28.8],
    },
    img: 'https://imagizer.imageshack.com/img922/2047/vVuhDm.jpg',
    weight: [100, 250, 500, 1000],
    category: 1,
  },
  {
    id: '3',
    title: 'Соломка тріски',
    price: {
      zł: [16, 40, 70, 130],
      eu: [3.5, 8.8, 15.5, 28.8],
    },
    img: 'https://imagizer.imageshack.com/img924/1908/Fevmgr.jpg',
    weight: [100, 250, 500, 1000],
    category: 1,
  },
  {
    id: '4',
    title: 'Соломка тріски з перцем',
    price: {
      zł: [16, 40, 70, 130],
      eu: [3.5, 8.8, 15.5, 28.8],
    },
    img: 'https://imagizer.imageshack.com/img922/1299/uW554T.jpg',
    weight: [100, 250, 500, 1000],
    category: 1,
  },
  {
    id: '5',
    title: 'Кальмар по-шанхайськи',
    price: {
      zł: [16, 40, 70, 135],
      eu: [3.5, 8.8, 15.5, 30],
    },
    img: 'https://imagizer.imageshack.com/img923/8853/SRweGq.jpg',
    weight: [100, 250, 500, 1000],
    category: 2,
  },
  {
    id: '6',
    title: 'Кільця кальмара',
    price: {
      zł: [16, 40, 75, 145],
      eu: [3.5, 8.8, 16.6, 32.2],
    },
    img: 'https://imagizer.imageshack.com/img924/6471/vT8lba.jpg',
    weight: [100, 250, 500, 1000],
    category: 2,
  },
  {
    id: '7',
    title: 'Стружка кальмара',
    price: {
      zł: [16, 40, 80, 150],
      eu: [3.5, 8.8, 17.7, 33.3],
    },
    img: 'https://imagizer.imageshack.com/img924/4177/2rovl5.jpg',
    weight: [100, 250, 500, 1000],
    category: 2,
  },
  {
    id: '8',
    title: 'Ставридка',
    price: {
      zł: [15, 35, 60, 105],
      eu: [3.3, 7.7, 13.3, 23.3],
    },
    img: 'https://imagizer.imageshack.com/img923/2121/kntebT.jpg',
    weight: [100, 250, 500, 1000],
    category: 1,
  },
  {
    id: '9',
    title: 'Павутинка тунця з перцем',
    price: {
      zł: [16, 40, 75, 140],
      eu: [3.5, 8.8, 16.6, 31.1],
    },
    img: 'https://imagizer.imageshack.com/img923/7159/0RwhkB.jpg',
    weight: [100, 250, 500, 1000],
    category: 1,
  },
  {
    id: '10',
    title: 'Сет Дегустаційний',
    price: { zł: [135], eu: [30] },
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
