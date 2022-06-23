import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import RecipesProvider from './context/searchProvider';
import HeaderProvider from './context/headerProvider';
import DoneRecipesProvider from './context/doneRecipesProvider';
import MainPageProvider from './context/MainPageProvider';

ReactDOM.render(
  <MainPageProvider>
    <DoneRecipesProvider>
      <HeaderProvider>
        <RecipesProvider>
          <App />
        </RecipesProvider>
      </HeaderProvider>
    </DoneRecipesProvider>
  </MainPageProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
