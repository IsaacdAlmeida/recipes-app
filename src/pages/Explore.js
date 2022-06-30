import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/explore.css';

function Explore() {
  return (
    <div className="app-container">
      <Header pageName="Explore" isEnable={ false } />
      {/* Req - 68/69 criado dois botões e adicionado rotas para suas respectivas paginas */ }
      <div className="explore-container">
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

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Explore;
