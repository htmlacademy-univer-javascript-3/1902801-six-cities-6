import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuth, fetchFavorites, fetchOffers } from './store/apiActions';

store.dispatch(fetchOffers());
store.dispatch(checkAuth()).then((result) => {
  if (checkAuth.fulfilled.match(result)) store.dispatch(fetchFavorites());
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
