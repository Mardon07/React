import { ChangeEvent, useState, useEffect } from 'react';
interface SearchComponentResult {
  name: string;
  gender: string;
  height: string;
  skin_color: string;
}

interface SearchComponentState {
  searchTerm: string;
  searchResults: SearchComponentResult[];
  error: string | null;
  isLoading: boolean;
}

function SearchComponent() {
  const [state, setState] = useState<SearchComponentState>({
    searchTerm: '',
    searchResults: [],
    error: null,
    isLoading: false,
  });

  useEffect(() => {
    const savedQuery = localStorage.getItem('searchQuery');
    if (savedQuery) {
      setState((prevState) => ({ ...prevState, searchTerm: savedQuery }));
      performAPICall(savedQuery);
    } else {
      performAPICall('');
    }
  }, []);

  const performAPICall = async (searchTerm: string) => {
    setState((prevState) => ({ ...prevState, setIsLoading: true }));
    try {
      let url = 'https://swapi.dev/api/people/';
      if (searchTerm !== '') {
        url += `?search=${searchTerm}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setState((prevState) => ({
        ...prevState,
        searchResults: data.results,
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

  const handleSearch = () => {
    const { searchTerm } = state;
    performAPICall(searchTerm.trim());
    localStorage.setItem('searchQuery', searchTerm);
  };

  const throwError = () => {
    setState((prevState) => ({ ...prevState, error: 'Error has occurred!' }));
  };

  return (
    <div className="search-app">
      <div className="search-bar">
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
      <div className="search-results">
        {state.isLoading ? (
          <div className="loader"></div>
        ) : state.error ? (
          <div>Error: {state.error}</div>
        ) : (
          <ul>
            {state.searchResults.map(
              (result: SearchComponentResult, index: number) => (
                <li key={index} className="search-result">
                  <div>
                    <strong>{result.name}</strong>
                  </div>
                  <div>Gender: {result.gender}</div>
                  <div>Height: {result.height}</div>
                  <div>Skin Color: {result.skin_color}</div>
                </li>
              ),
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchComponent;
