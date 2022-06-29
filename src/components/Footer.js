import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import '../styles/footer.css';

function Footer() {
  return (
    <div data-testid="footer" className="footer-container">
      <Link to="/drinks">
        <input
          type="image"
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="Drink Icon"
        />
      </Link>

      <Link to="/explore">
        <input
          type="image"
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="Explore Icon"
        />
      </Link>

      <Link to="/foods">
        <input
          type="image"
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="Food Icon"
        />
      </Link>
    </div>
  );
}

export default Footer;
