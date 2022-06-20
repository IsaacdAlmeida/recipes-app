import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" />
        <Route exact path="/drinks" />
        {/* <Route exact path={ `/foods/${idReceita}` } />
        <Route exact path={ `/drinks/${idReceita}` } />
        <Route exact path={ `/foods/${idReceita}/in-progress` } />
        <Route exact path={ `/drinks/${idReceita}/in-progress` } /> */}
        <Route exact path="/explore" />
        <Route exact path="/explore/foods" />
        <Route exact path="/explore/drinks" />
        <Route exact path="/explore/foods/ingredients" />
        <Route exact path="/explore/drinks/ingredients" />
        <Route exact path="/explore/foods/nationalities" />
        <Route exact path="/profile" />
        <Route exact path="done-recipes" />
        <Route exact path="favorite-recipes" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
