import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
        {/* <Route exact path={ `/foods/${idReceita}` } />
        <Route exact path={ `/drinks/${idReceita}` } />
        <Route exact path={ `/foods/${idReceita}/in-progress` } />
        <Route exact path={ `/drinks/${idReceita}/in-progress` } /> */}
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/explore/foods" component={ ExploreFoods } />
        <Route exact path="/explore/drinks" component={ ExploreDrinks } />
        <Route exact path="/explore/foods/ingredients" />
        <Route exact path="/explore/drinks/ingredients" />
        <Route exact path="/explore/foods/nationalities" />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="done-recipes" />
        <Route exact path="favorite-recipes" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
