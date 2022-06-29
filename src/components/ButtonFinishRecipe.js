import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
// import para onde salva as receitas já feitas

export default function ButtonFinishRecipe({
  name, image, category, type, id, nationality, alcoholicOrNot }) {
  const { push } = useHistory();

  // function checkButtonFinish() {
  //   const [isLoggedIn, setIsLoggedIn] = useState(false);
  //   const handleFinishBtn = (e) => {
  //     e.preventDefault();
  //     setIsLoggedIn(true);
  //   };
  // }

  const onClickSaveDoneRecipes = () => {
    const doneRecipe = {
      name,
      image,
      category,
      type,
      id,
      nationality,
      alcoholicOrNot,
    };
    addDoneRecipe(doneRecipe);
    push('/done-recipes');
  };

  return (
    <div>
      <button
        className="button-finish-recipe"
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ checkButtonFinish }
        onClick={ onClickSaveDoneRecipes }
      >
        Finish Recipe
      </button>
    </div>
  );
}

ButtonFinishRecipe.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string.isRequired,
  image: PropTypes.string,
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  nationality: PropTypes.string,
  alcoholicOrNot: PropTypes.string,
};

ButtonFinishRecipe.defaultProps = {
  nationality: '',
  alcoholicOrNot: '',
  name: '',
  image: '',
};
