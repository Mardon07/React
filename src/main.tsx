import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import NotFound from './components/NotFound/NotFoundComponent';
import SearchComponent from './components/SearchComponent/SearchComponent';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/page',
        element: <SearchComponent />,
        errorElement: <ErrorBoundary children={undefined} />,
        children: [
          {
            path: '/page/:pageId',
            element: <SearchComponent />,
            errorElement: <ErrorBoundary children={undefined} />,
          },
        ],
      },
    ],
  },
  {
    path: '/404',
    element: <NotFound />,
    errorElement: <ErrorBoundary children={undefined} />,
  },
  {
    path: '*',
    element: <NotFound />,
    errorElement: <ErrorBoundary children={undefined} />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ErrorBoundary>,
);
