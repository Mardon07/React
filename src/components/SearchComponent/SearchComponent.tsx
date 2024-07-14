import { ChangeEvent, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchPokemonDetails,
  performAPICall,
  searchPokemon,
} from '../../services/requests';
import Pagination from '../Pagination/Pagination';
import PokemonInfo from '../PokemonInfo/PokemonInfo';
import { PokemonDetail } from '../SearchCard/SearchCard';
import SearchResults from '../SearchResults/SearchResults';
import styles from './SearchComponent.module.css';

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
export interface PakemonItem {
  name: string;
  url: string;
}

function SearchComponent() {
  const param = useParams<{ pageId: string }>();
  const navigate = useNavigate();

  const [state, setState] = useState<SearchComponentState>({
    searchTerm: '',
    searchResults: [],
    error: null,
    isLoading: false,
    data: {
      count: 0,
      next: '' || null,
      previous: '' || null,
      results: [],
    },
  });

  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetail[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(
    Number(param.pageId) || 1,
  );
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const itemsPerPage = 20;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    performAPICall(setState, page);
    navigate(`/page/${page}`);
  };
  useEffect(() => {
    const pageNumber = Number(param.pageId);
    if (pageNumber) {
      if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > 65) {
        navigate('/404');
      }
    }
  }, [param.pageId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const savedQuery = localStorage.getItem('searchQuery');
    if (savedQuery) {
      setState((prevState) => ({ ...prevState, searchTerm: savedQuery }));
      searchPokemon(savedQuery.trim().toLowerCase(), setPokemonDetails);
    } else {
      performAPICall(setState, currentPage);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (state.searchResults.length > 0) {
      fetchPokemonDetails(state, setPokemonDetails);
    }
  }, [state.searchResults]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = () => {
    const { searchTerm } = state;
    if (searchTerm) {
      searchPokemon(searchTerm.trim().toLowerCase(), setPokemonDetails);
    } else {
      performAPICall(setState, currentPage);
    }

    localStorage.setItem('searchQuery', searchTerm);
  };

  const throwError = () => {
    setState((prevState) => ({ ...prevState, error: 'Error has occurred!' }));
  };

  const handleShowDetails = async (name: string) => {
    console.log(name);

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    console.log(data);

    setSelectedPokemon(data);
  };

  const handleCloseDetails = () => {
    setSelectedPokemon(null);
  };

  return (
    <div className={styles.searchApp}>
      <div className={styles.searchBar}>
        <input
          type="text"
          value={state.searchTerm}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setState((prevState) => ({
              ...prevState,
              searchTerm: e.target.value,
            }))
          }
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={throwError}>Throw Error</button>
      </div>
      <Pagination
        totalItems={state.data.count}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <div className={styles.content} onClick={handleCloseDetails}>
        <SearchResults
          pokemonDetails={pokemonDetails}
          state={state}
          onShowDetails={handleShowDetails}
        />
        {selectedPokemon && (
          <PokemonInfo
            state={state}
            pokemon={selectedPokemon}
            onClose={handleCloseDetails}
          />
        )}
      </div>
    </div>
  );
}

export default SearchComponent;
