import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from './services/pokemon';
import { setupListeners } from '@reduxjs/toolkit/query';
import pokemonReducer from './features/pokemonSlice';

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    pokemon: pokemonReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
