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
      zł: [15, 35, 65, 110],
      '€': calculatePriceInEuro([15, 35, 65, 110]),
    },
    img: 'https://imagizer.imageshack.com/img924/2086/HPRwwU.jpg',
    weight: [100, 250, 500, 1000],
    category: 1,
  },
  {
    id: '2',
    title: 'Бурштинова з перцем',
    price: {
      zł: [16, 40, 75, 140],
      '€': calculatePriceInEuro([16, 40, 75, 140]),
    },
    img: 'https://imagizer.imageshack.com/img922/2047/vVuhDm.jpg',
    weight: [100, 250, 500, 1000],
    category: 1,
  },
  {
    id: '3',
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
    id: '4',
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
    id: '5',
    title: 'Кільця кальмара',
    price: {
      zł: [16, 40, 80, 150],
      '€': calculatePriceInEuro([16, 40, 80, 150]),
    },
    img: 'https://imagizer.imageshack.com/img924/6471/vT8lba.jpg',
    weight: [100, 250, 500, 1000],
    category: 2,
  },
  {
    id: '6',
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
    id: '7',
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
    id: '8',
    title: 'Сет Дегустаційний',
    price: { zł: [135], '€': [30] },
    img: 'https://imagizer.imageshack.com/img924/7130/vUivSi.jpg',
    description:
      'Стружка тріски 100г,Стружка тріски з перцем 100г,Рибна павутинка з перцем 100г,Ставридка 100г,Бурштинова з перцем 100г,Анчоус 100г,Ікряник з мʼяса лосося 100г,Кільця кальмара 100г,Стружка краба 100г,Кальмар з кунжутом «По-Шанхайськи» 100г',
    weight: [1000],
    category: 3,
  },
  {
    id: '9',
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
    id: '10',
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
    id: '11',
    title: 'Сет Рибний',
    price: { zł: [125], '€': [28] },
    img: 'https://imagizer.imageshack.com/img922/7360/xJQY7p.jpg', // Replace with the actual image URL
    description:
      'Анчоус 150г,Ставридка 150г,Бурштинова з перцем 150г,Філе тріски 150г,Соломка тріски 100г,Соломка тріски з перцем 100г,Рибне павутиння з тунця з перцем 100г,Палички з мʼяса лосося 100г',
    weight: [1000],
    category: 3,
  },
  {
    id: '12',
    title: 'Стружка краба',
    price: {
      zł: [16, 40, 75, 145],
      '€': calculatePriceInEuro([16, 40, 75, 140]),
    },
    img: 'https://imagizer.imageshack.com/img922/6339/EnYerH.jpg', // Replace with the actual image URL
    weight: [100, 250, 500, 1000],
    category: 2,
  },
  {
    id: '13',
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
    id: '14',
    title: 'Сет Гігант',
    price: {
      zł: [225],
      '€': calculatePriceInEuro([225]),
    },
    img: 'https://imagizer.imageshack.com/img923/1537/NS9rwB.jpg',
    description:
      'Кільця кальмара 150г,Кальмар Шанхайський 150г,Кальмар Перуанський 150г,Стружка кальмара зі смаком краба 150г,Соломка тріски 100г,Соломка тріски з перцем 100г,Ікряник з лосося 100г,Павутинка тунця з перцем 100г,Палички вʼяленого лосося 100г,Анчоус 150г,Філе тріски 150г,Бурштинова з перцем 150г,Ставридка 150г',
    weight: [1700],
    category: 3,
  },
  {
    id: '15',
    title: 'Палички вʼяленого лосося',
    price: {
      zł: [15, 35, 60, 115],
      '€': calculatePriceInEuro([15, 35, 60, 115]),
    },
    img: 'https://imagizer.imageshack.com/img923/1805/g3MFhm.jpg',
    weight: [100, 250, 500, 1000],
    category: 1,
  },
  {
    id: '16',
    title: 'Сет XXL',
    price: {
      zł: [175],
      '€': calculatePriceInEuro([175]),
    },
    img: 'https://imagizer.imageshack.com/img923/9002/habg0E.jpg',
    description: 'Мікс сухариків 5 смаків,Стружка кальмара,Стружка краба 100г,Кільця кальмара 100г,Кальмар Шанхайський 100г,Кальмар Перуанський 100г,Павутинка кальмара з перцем 100г,Соломка тріски 100г,Соломка тріски з перцем 100г,Ікряник з лосося 100г,Павутинка тунця з перцем 100г,Палички вʼяленого лосося 100г,Анчоус 100г,Філе тріски 100г,Бурштинова з перцем 100г,Ставридка 100г',
    weight: [2000],
    category: 3,
  },
  {
    id: '17',
    title: 'Сет "Сет Палички"',
    price: {
      zł: [180],
      '€': calculatePriceInEuro([180]),
    },
    img: 'https://imagizer.imageshack.com/img924/6641/ICRfSn.jpg',
    description:
      'Соломка тріски 250 г,Соломка тріски з перцем 250 г,Соломка тунця 250 г,Ікряник з лосося 250 г,Рибна павутинка 250 г,Палички вʼяленого лосося 250 г',
    weight: [1500],
    category: 3,
  },
  {
    id: '18',
    title: 'Сет "Кальмар 2.0"',
    price: {
      zł: [135],
      '€': calculatePriceInEuro([135]),
    },
    img: 'https://imagizer.imageshack.com/img922/7627/lr6Vsr.jpg',
    description:
      'До сету входить (по 250г),Кальмар с кунжутом «По-Шанхайські»,Стружка кальмара зі смаком краба,Смужки перуанського кальмара,Кільця кальмара',
    weight: [1000],
    category: 3,
  },
  {
    id: '19',
    title: 'Грінки Flint Житні зі смаком баварських ковбасок',
    price: {
      zł: [5],
      '€': calculatePriceInEuro([5]),
    },
    img: 'https://imagizer.imageshack.com/img922/650/23PZEp.jpg',
    weight: [100],
    category: 4,
  },
  {
    id: '20',
    title: 'Сухарики Flint Пшенично-житні зі смаком грибної пательні',
    price: {
      zł: [5],
      '€': calculatePriceInEuro([5]),
    },
    img: 'https://imagizer.imageshack.com/img924/3851/j5mzIP.jpg',
    weight: [100],
    category: 4,
  },
  {
    id: '21',
    title: 'Сухарики Flint Пшенично-житні зі смаком краба',
    price: {
      zł: [5],
      '€': calculatePriceInEuro([5]),
    },
    img: 'https://imagizer.imageshack.com/img922/3154/pQxTJa.jpg',
    weight: [110],
    category: 4,
  },
  {
    id: '22',
    title: 'Грінки Flint Craft Житньо-пшеничні хвилясті зі смаком часнику',
    price: {
      zł: [5],
      '€': calculatePriceInEuro([5]),
    },
    img: 'https://imagizer.imageshack.com/img923/5012/optROz.jpg',
    weight: [90],
    category: 4,
  },
  {
    id: '23',
    title: 'Сухарики Flint Пшенично-житні зі смаком сметани із зеленню',
    price: {
      zł: [3.25],
      '€': calculatePriceInEuro([3.25]),
    },
    img: 'https://imagizer.imageshack.com/img923/7606/F9QJPX.jpg',
    weight: [70],
    category: 4,
  },
  {
    id: '24',
    title: 'Грінки Flint Житні зі смаком телятини з аджикою',
    price: {
      zł: [5],
      '€': calculatePriceInEuro([5]),
    },
    img: 'https://imagizer.imageshack.com/img922/8741/W9lk91.jpg',
    weight: [100],
    category: 4,
  },
  {
    id: '25',
    title: 'Сухарики Flint Baguette Пшеничні зі смаком грибів у вершковому соусі',
    price: {
      zł: [7.25],
      '€': calculatePriceInEuro([7.25]),
    },
    img: 'https://imagizer.imageshack.com/img922/8747/jJOWci.jpg',
    weight: [150],
    category: 4,
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
