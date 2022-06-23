import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

function Explore() {
  return (
    <div>
      <Header pageName="Explore" isEnable={ false } />
      {/* Req - 68/69 criado dois botões e adicionado rotas para suas respectivas paginas */ }
      <Link to="/explore/foods">
        <button
          data-testid="explore-foods"
          type="button"
        >
          Explore Foods
        </button>
      </Link>
      <Link to="/explore/drinks">
        <button
          data-testid="explore-drinks"
          type="button"
        >
          Explore Drinks
        </button>
      </Link>
    </div>
  );
}

export default Explore;
