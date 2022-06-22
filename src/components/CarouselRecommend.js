import React from 'react';
import { Carousel } from 'react-bootstrap';
import PropType from 'prop-types';

function CarouselRecommend(props) {
  const { arrayRecomendation } = props;
  return (
    <Carousel>
      {arrayRecomendation.map((food) => {
        console.log(food);
        return (
          <Carousel.Item key={ food.idMeal }>
            <img
              className="d-block w-100"
              src={ food.strMealThumb }
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>{food.strMeal}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

CarouselRecommend.propTypes = {
  arrayRecomendation: PropType.arrayOf(PropType.object).isRequired,
};

export default CarouselRecommend;
