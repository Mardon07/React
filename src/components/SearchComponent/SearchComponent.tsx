import React, {  useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import SearchResults from '../SearchResults/SearchResults';
import styles from './SearchComponent.module.css';
import FilterComponent from '../Filter/Filter';
import { RootState } from '../../store/store';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import PokemonInfo from '../PokemonInfo/PokemonInfo';
import {
  useGetPokemonListQuery,
  useSearchPokemonQuery,
} from '../../store/services/pokemon';
import {
  fetchPokemonDetails,
  removeSelectedPokemon,
  setPage,
  setSearchTerm,
  setSelectedPokemon,
} from '../../store/features/pokemonSlice';

const SearchComponent: React.FC = () => {
  const {
    searchTerm,
    searchResults,
    selectedPokemon,
    currentPage,
    totalCount,
  } = useAppSelector((state: RootState) => state.pokemon);

  useGetPokemonListQuery(currentPage, { skip: !currentPage });

     useSearchPokemonQuery(searchTerm.trim().toLowerCase(), {skip: !searchTerm})

  const dispatch = useAppDispatch();
  const param = useParams<{ pageId: string }>();
  const navigate = useNavigate();
  const itemsPerPage = 20;
  useEffect(() => {
    const pageNumber = Number(param.pageId) || 1;
    dispatch(setPage(pageNumber));

  }, [dispatch, param.pageId, searchTerm]);

  useEffect(() => {
    if (searchResults.length > 0) {
      dispatch(fetchPokemonDetails(searchResults));
    }
  }, [dispatch, searchResults]);

  const handleSearch = () => {
    if (searchTerm) {
      dispatch(setSearchTerm(searchTerm));
    }
  };

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
    navigate(`/page/${page}`);
  };

  const handleShowDetails = async (name: string) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    dispatch(setSelectedPokemon(data)); 
  };

  const handleCloseDetails = () => {
    dispatch(removeSelectedPokemon()); 
  };

  return (
    <div className={styles.searchApp}>
      <div className={styles.searchBar}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <Pagination
        totalItems={totalCount}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <FilterComponent />
      <div className={styles.content}>
        <SearchResults
          onShowDetails={handleShowDetails} 
        />
      </div>
      {selectedPokemon && <PokemonInfo onClose={handleCloseDetails} />}
    </div>
  );
};

export default SearchComponent;
