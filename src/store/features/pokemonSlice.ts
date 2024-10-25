import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { pokemonApi } from '../services/pokemon'; // Импортируем ваш RTK Query API
import { PokemonDetail } from '../../components/SearchCard/SearchCard';
import { PakemonItem } from '../../types/search';
import axios from 'axios';

export interface SearchState {
  searchTerm: string;
  searchResults: PakemonItem[];
  pokemonDetails: PokemonDetail[];
  selectedPokemon: PokemonDetail | null;
  isLoading: boolean;
  error: string | null;
  totalCount: number;
  currentPage: number;
  types: PakemonItem[]
  selectedType: string
}

const initialState: SearchState = {
  searchTerm: '',
  searchResults: [],
  pokemonDetails: [],
  selectedPokemon: null,
  isLoading: false,
  error: null,
  totalCount: 0,
  currentPage: 1,
  types: [],
  selectedType : ''

};

export const fetchPokemonDetails = createAsyncThunk(
  'pokemon/fetchPokemonDetails',
  async (searchResults: PakemonItem[]) => {
    const promises = searchResults.map((pokemon) => axios.get(pokemon.url));
    const results = await Promise.all(promises);
    console.log('fetchPokemonDetails');

    return results.map((result) => result.data);
  },
);

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSelectedPokemon: (
      state,
      action: PayloadAction<PokemonDetail | null>,
    ) => {
      state.selectedPokemon = action.payload;
    },
    resetSearchResults: (state) => {
      state.searchResults = [];
      state.totalCount = 0;
      state.currentPage = 1;
    },
    removeSelectedPokemon: (state) => {
      state.selectedPokemon = null;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<PakemonItem[]>) => {
      state.searchResults = action.payload;
    },
    setSelectedType: (state, action: PayloadAction<string>)=>{
        state.selectedType = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonDetails.fulfilled, (state, action) => {
        state.pokemonDetails = action.payload;
      })
      .addMatcher(pokemonApi.endpoints.getPokemonList.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(
        pokemonApi.endpoints.getPokemonList.matchFulfilled,
        (state, { payload }) => {
          state.isLoading = false;
          state.searchResults = payload.results;
          state.totalCount = payload.count;
        },
      )
      .addMatcher(
        pokemonApi.endpoints.getPokemonList.matchRejected,
        (state, { error }) => {
          state.isLoading = false;
          state.error = error.message || 'Error occurred';
        },
      )

      .addMatcher(
        pokemonApi.endpoints.searchPokemon.matchPending,
        (state) => {
          state.isLoading = true;
          console.log('pending');

        }
      )
      .addMatcher(
        pokemonApi.endpoints.searchPokemon.matchFulfilled,
        (state, {payload}) => {
          state.pokemonDetails = [payload];
          state.isLoading = false;
          state.error = null;
          console.log('fullfilled');

        }
      )
      .addMatcher(
        pokemonApi.endpoints.searchPokemon.matchRejected,
        (state, { error }) => {
          state.isLoading = false;
          state.error = error.message || 'Ошибка загрузки данных';
        }
      )
      .addMatcher(
        pokemonApi.endpoints.getPokemonTypes.matchFulfilled,
        (state, {payload})=>{
            state.types = payload.results
        }
      )
      .addMatcher(
        pokemonApi.endpoints.getPokemonByType.matchFulfilled,
        (state, {payload})=>{
            state.searchResults = payload
        }
      )
  },
});

export const {
  setSearchTerm,
  setSelectedPokemon,
  resetSearchResults,
  removeSelectedPokemon,
  setPage,
  setSearchResults,
  setSelectedType
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
