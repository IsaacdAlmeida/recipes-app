import React, { useState, useEffect } from 'react';
import PropType from 'prop-types';
import { Carousel, Card } from 'react-bootstrap';

// const SIX_NUMB = 6;

function CarouselRecommend({ arrayRecomendation, way }) {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if (way === 'drinks') {
      setImage('strMealThumb');
      setName('strMeal');
    } else {
      setImage('strDrinkThumb');
      setName('strDrink');
    }
  }, [way]);

  return (
    <Carousel>
      {arrayRecomendation.map((recipe, index) => (
        <Carousel.Item key={ index } data-testid={ `${index}-recomendation-card` }>
          <Card>
            <Card.Img
              src={ recipe[image] }
            />
            <Card.Body>
              <Card.Title
                data-testid={ `${index}-recomendation-title` }
              >
                {recipe[name]}
              </Card.Title>
            </Card.Body>
          </Card>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

CarouselRecommend.propTypes = {
  arrayRecomendation: PropType.arrayOf(PropType.object).isRequired,
  way: PropType.string.isRequired,
};

export default CarouselRecommend;
