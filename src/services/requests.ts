import axios from 'axios';
import { Dispatch } from 'react';
import { PokemonDetail } from '../components/SearchCard/SearchCard';
import {
  PakemonData,
  SearchComponentState,
} from '../components/SearchComponent/SearchComponent';

export const performAPICall = async (
  setState: Dispatch<React.SetStateAction<SearchComponentState>>,
  page: number,
) => {
  setState((prevState) => ({ ...prevState, isLoading: true }));
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${page === 1 ? 0 : page * 20}&limit=20`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data: PakemonData = await response.json();

    setState((prevState) => ({
      ...prevState,
      searchResults: data.results,
      data: data,
      error: null,
    }));
  } catch (error) {
    setState((prevState) => ({
      ...prevState,
      error: 'An error occurred',
      searchResults: [],
    }));
  } finally {
    setState((prevState) => ({ ...prevState, isLoading: false }));
  }
};

export const fetchPokemonDetails = async (
  state: SearchComponentState,
  setPokemonDetails: Dispatch<React.SetStateAction<PokemonDetail[]>>,
) => {
  try {
    const promises = state.searchResults.map((pokemon) =>
      axios.get(pokemon.url),
    );
    const results = await Promise.all(promises);
    setPokemonDetails(results.map((result) => result.data));
  } catch (error) {
    console.error('Ошибка при получении деталей покемонов:', error);
  }
};

export const searchPokemon = async (
  searchTerm: string,
  setState: Dispatch<React.SetStateAction<PokemonDetail[]>>,
) => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${searchTerm}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data: PokemonDetail = await response.json();

    setState([data]);
  } catch (error) {
    setState([]);
  }
};
