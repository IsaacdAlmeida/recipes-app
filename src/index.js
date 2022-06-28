import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import DoneRecipesProvider from './context/doneRecipesProvider';
import MainProvider from './context/MainProvider';
import ExplorerProvider from './context/exploreProvider';
import FavoriteRecipesProvider from './context/favoriteRecipesProvider';

ReactDOM.render(
  <BrowserRouter>
    <MainProvider>
      <FavoriteRecipesProvider>
        <DoneRecipesProvider>
          <ExplorerProvider>
            <App />
          </ExplorerProvider>
        </DoneRecipesProvider>
      </FavoriteRecipesProvider>
    </MainProvider>
  </BrowserRouter>,

  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
