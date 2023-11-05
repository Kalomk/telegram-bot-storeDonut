// productSlice.ts
import { createSlice } from '@reduxjs/toolkit';

export interface ProductType {
  id: string;
  title: string;
  price: { zł: number[]; '€': number[] };
  img: string;
  weight: number[];
  description?: string;
  category: number;
}

// Define the initial state based on your array of products

const calculatePriceInEuro = (arr: number[]) =>
  arr.map((price) => Number((price / 4.5).toFixed(2)));

const initialState: ProductType[] = [
  {
    id: '0',
    title: 'Ікряник з лосося',
    price: {
      zł: [15, 35, 60, 115],
      '€': calculatePriceInEuro([15, 35, 60, 115]),
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
      '€': calculatePriceInEuro([15, 35, 60, 110]),
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
      '€': calculatePriceInEuro([16, 40, 70, 130]),
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
      '€': calculatePriceInEuro([16, 40, 70, 130]),
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
      '€': calculatePriceInEuro([16, 40, 70, 130]),
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
      '€': calculatePriceInEuro([16, 40, 70, 135]),
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
      '€': calculatePriceInEuro([16, 40, 75, 145]),
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
      '€': calculatePriceInEuro([16, 40, 80, 150]),
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
      '€': calculatePriceInEuro([15, 35, 60, 105]),
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
      '€': calculatePriceInEuro([16, 40, 75, 140]),
    },
    img: 'https://imagizer.imageshack.com/img923/7159/0RwhkB.jpg',
    weight: [100, 250, 500, 1000],
    category: 1,
  },

  {
    id: '10',
    title: 'Сет Дегустаційний',
    price: { zł: [135], '€': [30] },
    img: 'https://imagizer.imageshack.com/img924/7130/vUivSi.jpg',
    description:
      'Стружка кальмара 200г, Кальмар с кунжутом «По-Шанхайськи» 200г, Павутиння кальмара з червоним перцем 200г, Смужки перуанського кальмара 200г, Кільця кальмара 200г',
    weight: [1000],
    category: 3,
  },
  {
    id: '11',
    title: 'Сет Кальмар',
    price: { zł: [135], '€': [30] },
    img: 'https://imagizer.imageshack.com/img922/1213/N9ZIjG.jpg',
    description:
      'Стружка кальмара 200г, Кальмар с кунжутом «По-Шанхайськи» 200г, Павутиння кальмара з червоним перцем 200г, Смужки перуанського кальмара 200г, Кільця кальмара 200г',
    weight: [1000],
    category: 3,
  },
  {
    id: '12',
    title: 'Філе тріски',
    price: {
      zł: [15, 35, 65, 120],
      '€': calculatePriceInEuro([15, 35, 65, 120]),
    },
    img: 'https://imagizer.imageshack.com/img923/5699/upv1yh.jpg',
    weight: [100, 250, 500, 1000],
    category: 1,
  },
  {
    id: '13',
    title: 'Соломка тунця',
    price: {
      zł: [15, 35, 65, 120],
      '€': calculatePriceInEuro([15, 35, 65, 120]),
    },
    img: 'https://imagizer.imageshack.com/img923/2519/oHrl15.jpg',
    weight: [100, 250, 500, 1000],
    category: 1,
  },
  {
    id: '14',
    title: 'Смужки перуанського кальмара',
    price: {
      zł: [16, 40, 75, 140],
      '€': calculatePriceInEuro([16, 40, 75, 140]),
    },
    img: 'https://imagizer.imageshack.com/img924/1719/eIXwWO.jpg',
    weight: [100, 250, 500, 1000],
    category: 2,
  },
  {
    id: '15',
    title: 'Павутиння кальмара з перцем',
    price: {
      zł: [16, 40, 75, 140],
      '€': calculatePriceInEuro([16, 40, 75, 140]),
    },
    img: 'https://imagizer.imageshack.com/img922/1011/2aKEFs.jpg',
    weight: [100, 250, 500, 1000],
    category: 2,
  },
  {
    id: '16',
    title: 'Тарань малосольна',
    price: {
      zł: [30, 55],
      '€': calculatePriceInEuro([30, 55]),
    },
    img: 'https://imagizer.imageshack.com/img922/6467/qEq5cZ.jpg',
    weight: [500, 1000],
    category: 1,
  },
  {
    id: '17',
    title: 'Лящ копчений 1шт',
    price: {
      zł: [28],
      '€': calculatePriceInEuro([28]),
    },
    img: 'https://imagizer.imageshack.com/img924/2947/J9qigd.jpg',
    weight: [700],
    category: 1,
  },
  {
    id: '18',
    title: 'Сет XXL',
    price: { zł: [235], '€': calculatePriceInEuro([235]) },
    img: 'https://imagizer.imageshack.com/img923/7237/4viKiT.jpg',
    description:
      'Стружка кальмара 200г, Кальмар с кунжутом «По-Шанхайськи» 200г, Павутиння кальмара з червоним перцем 200г, Смужки перуанського кальмара 200г, Кільця кальмара 200г',
    weight: [2500],
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
