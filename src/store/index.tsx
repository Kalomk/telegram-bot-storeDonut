import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import filters from '../slices/filterSlice';
import cart from '../slices/cartSlice';
import products from '../slices/productsSlice';
import activePrice from '../slices/priceFilter';
import activeCountry from '../slices/countrySlice';

const store = configureStore({
  reducer: { filters, cart, products, activePrice, activeCountry },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
