import { Component, ChangeEvent } from 'react';
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

class SearchComponent extends Component<object, SearchComponentState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResults: [],
      error: null,
      isLoading: false,
    };
  }

  componentDidMount() {
    const savedQuery = localStorage.getItem('searchQuery');
    if (savedQuery) {
      this.setState({ searchTerm: savedQuery });
      this.performAPICall(savedQuery);
    } else {
      this.performAPICall('');
    }
  }

  performAPICall = async (searchTerm: string) => {
    this.setState({ isLoading: true });
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
      this.setState({ searchResults: data.results, error: null });
    } catch (error) {
      this.setState({ error: 'An error occurred', searchResults: [] });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearch = () => {
    const { searchTerm } = this.state;
    this.performAPICall(searchTerm.trim());
    localStorage.setItem('searchQuery', searchTerm);
  };

  throwError = () => {
    this.setState({ error: 'Error has occurred!' });
  };

  render() {
    const { searchTerm, searchResults, error, isLoading } = this.state;

    return (
      <div className="search-app">
        <div className="search-bar">
          <input
            type="text"
            value={searchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              this.setState({ searchTerm: e.target.value })
            }
          />
          <button onClick={this.handleSearch}>Search</button>
          <button onClick={this.throwError}>Throw Error</button>
        </div>
        <div className="search-results">
          {isLoading ? (
            <div className="loader"></div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <ul>
              {searchResults.map((result: SearchComponentResult, index: number) => (
                <li key={index} className="search-result">
                  <div>
                    <strong>{result.name}</strong>
                  </div>
                  <div>Gender: {result.gender}</div>
                  <div>Height: {result.height}</div>
                  <div>Skin Color: {result.skin_color}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default SearchComponent;