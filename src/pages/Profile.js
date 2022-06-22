import React from 'react';
import Header from '../components/Header';

function Profile() {
  return (
    <div>
      <Header pageName="Profile" isEnable={ false } />
      <section>
        <p data-testid="profile-email">email@test.com</p>
        <button data-testid="profile-done-btn" type="button"> Done Recipes</button>
        <button data-testid="profile-favorite-btn" type="button">Favorite Recipes</button>
        <button data-testid="profile-logout-btn" type="button">Logout</button>
      </section>
    </div>
  );
}

export default Profile;
