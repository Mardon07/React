
import { Component, ReactNode } from 'react';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import SearchComponent from './components/SearchComponent/SearchComponent';

class App extends Component {
  render(): ReactNode {
    return (
      <ErrorBoundary>
        <SearchComponent />
      </ErrorBoundary>
    )
  }
}

export default App