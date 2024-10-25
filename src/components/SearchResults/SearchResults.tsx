import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';
import SearchCard from '../SearchCard/SearchCard';
import './SearchResults.model.css';

function SearchResults({
  onShowDetails,
}: {
  onShowDetails: (pokemon: string) => void;
}) {
  const { isLoading, error } = useAppSelector(
    (state: RootState) => state.pokemon,
  );
  return (
    <div className="search-results ">
      {isLoading ? (
        <div className="loader"></div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <ul>
          <SearchCard onShowDetails={onShowDetails}/>
        </ul>
      )}
    </div>
  );
}

export default SearchResults;
