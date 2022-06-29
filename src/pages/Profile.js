import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const viewEmail = JSON.parse(localStorage.getItem('user')) || [];

  const clearStorage = () => {
    localStorage.clear();
    localStorage.removeItem('favoriteRecipes');
  };
  return (
    <div>
      <Header pageName="Profile" isEnable={ false } />
      <section>
        <p
          data-testid="profile-email"
          type="text"
        >
          {viewEmail.email}
        </p>

        <Link to="/done-recipes">
          <button data-testid="profile-done-btn" type="button">
            Done Recipes
          </button>
        </Link>
        <Link to="/favorite-recipes">
          <button
            data-testid="profile-favorite-btn"
            type="button"
          >
            Favorite Recipes
          </button>
        </Link>
        <Link to="/">
          <button
            data-testid="profile-logout-btn"
            type="button"
            onClick={ clearStorage }
          >
            Logout
          </button>
        </Link>
      </section>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Profile;
