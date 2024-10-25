import { PokemonTypeInfo } from "../components/SearchCard/SearchCard";

export interface SearchComponentState {
    searchTerm: string;
    searchResults: PakemonItem[];
    error: string | null;
    isLoading: boolean;
    data: PakemonData;
  }
  export interface PakemonData {
    count: number;
    next: null | string;
    previous: null | string;
    results: PakemonItem[];
  }
  export interface PakemonDataType {
    count: number;
    next: null | string;
    previous: null | string;
    results: PokemonTypeInfo[];
  }
  export interface PakemonItem {
    name: string;
    url: string;
  }