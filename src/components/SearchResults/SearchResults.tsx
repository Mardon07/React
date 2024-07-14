import SearchCard, { PokemonDetail } from '../SearchCard/SearchCard';
import { SearchComponentState } from '../SearchComponent/SearchComponent';
import './SearchResults.model.css';

function SearchResults({
  state,
  pokemonDetails,
  onShowDetails,
}: {
  state: SearchComponentState;
  pokemonDetails: PokemonDetail[];
  onShowDetails: (pokemon: string) => void;
}) {
  return (
    <div className="search-results ">
      {state.isLoading ? (
        <div className="loader"></div>
      ) : state.error ? (
        <div>Error: {state.error}</div>
      ) : (
        <ul>
          <SearchCard
            onShowDetails={onShowDetails}
            pokemonDetails={pokemonDetails}
          />
        </ul>
      )}
    </div>
  );
}

export default SearchResults;
