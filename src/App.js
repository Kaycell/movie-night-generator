import React, { Component } from 'react';
import television from './television.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={television} className="App-logo" alt="logo" />
        </div>
        <Movie className="Movie"/>
        <Meal className="Meal"/>
        <Clothing className="Clothing"/>
      </div>
    );
  }
}

class Movie extends Component {
  render() {
    return (
      <div className="Movie">
        <img src="https://www.movieposter.com/posters/archive/main/226/MPW-113357" className="MoviePoster" alt="movieposter" />
      </div>
    )
  }
}

class Meal extends Component {
  render() {
    return (
      <div className="Meal">
        <p>A Meal</p>
      </div>
    )
  }
}

class Clothing extends Component {
  render() {
    return (
      <div className="Clothing">
        <p>A Clothing</p>
      </div>
    )
  }
}

export default App;
