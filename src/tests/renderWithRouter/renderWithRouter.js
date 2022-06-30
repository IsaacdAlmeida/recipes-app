import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import DoneRecipesProvider from '../../context/doneRecipesProvider';
import MainProvider from '../../context/MainProvider';
import ExplorerProvider from '../../context/exploreProvider';

const renderWithRouter = (component, route = '/') => {
  const history = createMemoryHistory({ initialEntries: [route] });
  return ({
    ...render(
      <DoneRecipesProvider>
        <ExplorerProvider>
          <MainProvider>
            <Router
              history={ history }
            >
              { component }
            </Router>
          </MainProvider>
        </ExplorerProvider>
      </DoneRecipesProvider>,
    ),
    history,
  });
};

export default renderWithRouter;
