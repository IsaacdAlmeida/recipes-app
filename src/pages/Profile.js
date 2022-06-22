import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

function Profile() {
  const clearStorage = () => {
    localStorage.setItem('user', { email: 'email@mail.com' });
  };
  return (
    <div>
      <Header pageName="Profile" isEnable={ false } />
      <section>
        <p data-testid="profile-email">email@test.com</p>
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
        <Link to="/login">
          <button
            data-testid="profile-logout-btn"
            type="button"
            onClick={ clearStorage }
          >
            Logout
          </button>
        </Link>
      </section>
    </div>
  );
}

export default Profile;
