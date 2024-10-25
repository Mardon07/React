import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { PokemonDetail } from '../../components/SearchCard/SearchCard';
import { FilteredPokemonResponse } from '../../components/Filter/Filter';
import { PakemonData, PakemonDataType, PakemonItem } from '../../types/search';

export const pokemonApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
    endpoints: (builder) => ({
      getPokemonList: builder.query<PakemonData, number>({
        query: (page) => `pokemon/?offset=${page === 1 ? 0 : page * 20}&limit=20`,
      }),
      searchPokemon: builder.query<PokemonDetail, string>({
        query: (name) => name && `pokemon/${name}`,
      }),
      getPokemonTypes: builder.query<PakemonDataType, void>({
        query: () => 'type/?limit=40',
      }),
      getPokemonByType: builder.query<PakemonItem[], string>({
        query: (type) => `type/${type}`,
        transformResponse: (response: FilteredPokemonResponse) =>
          response.pokemon.map((pokemon) => ({
            name: pokemon.pokemon.name,
            url: pokemon.pokemon.url,
          })),
      }),
    }),
  });
  
  export const {
    useGetPokemonListQuery,
    useSearchPokemonQuery,
    useGetPokemonTypesQuery,
    useGetPokemonByTypeQuery,
  } = pokemonApi;