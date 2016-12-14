import React, { Component } from 'react';
import television from './television.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      generating: false
    }
  }

  handleClick = () => {
    this.setState( (prevState) => ({generating: !prevState.generating}));
  }

  _getPosters() {
    const posterList = [
      "https://image.tmdb.org/t/p/w500/tcqb9NHdw9SWs2a88KCDD4V8sVR.jpg",
      "https://image.tmdb.org/t/p/w500/weUSwMdQIa3NaXVzwUoIIcAi85d.jpg",
      "https://image.tmdb.org/t/p/w500/kHXEpyfl6zqn8a6YuozZUujufXf.jpg",
      "https://image.tmdb.org/t/p/w500/cezWGskPY5x7GaglTTRN4Fugfb8.jpg",
      "https://image.tmdb.org/t/p/w500/jjBgi2r5cRt36xF6iNUEhzscEcb.jpg",
      "https://image.tmdb.org/t/p/w500/dCgm7efXDmiABSdWDHBDBx2jwmn.jpg",
      "https://image.tmdb.org/t/p/w500/t90Y3G8UGQp0f0DrP60wRu9gfrH.jpg",
      "https://image.tmdb.org/t/p/w500/fTplI1NCSuEDP4ITLcTps739fcC.jpg",
      "https://image.tmdb.org/t/p/w500/1Ilv6ryHUv6rt9zIsbSEJUmmbEi.jpg"
    ];
    console.log("AJAX REQUEST !");
    return posterList;
  }


  render() {
    return (
        // <Movie className="Movie"/>
        // <Meal className="Meal"/>
        // <Clothing className="Clothing"/>
      <div className="App">
        <GenerateButton startGenerate={this.handleClick}/>
        <Slot started={this.state.generating} panelList={this._getPosters()} speed={10}/>
      </div>
    );
  }
}

class Slot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPannel: 1,
      currentDeg: 0
    }
   this.nbPanel = this.props.panelList.length;
   this.rotationAngle = 360 / this.nbPanel;
   this.panels = this.props.panelList.map((panel, index) => {
     const panelRotationAngle = index * this.rotationAngle;
     const style = { transform: `rotateY(${panelRotationAngle}deg) translateZ(288px)` };
     return(<img className="panel" key={index} src={panel} alt={`panel${index}`} style={style}/>);
   });
  }

  next = () => {
    console.log("hello");
    this.setState((prevState) => ({
      currentDeg: prevState.currentDeg - this.rotationAngle
    }))
    console.log(this.state.currentDeg);
  }

  componentDidUpdate() {
    if (this.props.started) {
      if (typeof this.interval == "undefined"){
        this.interval = setInterval(() => this.next(), this.props.speed);
      }
    } else {
      clearInterval(this.interval);
      this.interval = undefined;
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const currentRotationStyle = {
      transition: "transform 1s",
      transform: `translateZ(-288px) rotateY(${this.state.currentDeg}deg )`
    }
    return(
      <div className="container">
        <div className="slot" style={currentRotationStyle}>
          {this.panels}
        </div>
      </div>
    );
  }
}

class GenerateButton extends Component {
  render() {
    return (
      <div className="App-header">
        <img src={television} className="App-logo" alt="logo" onClick={this.props.startGenerate} />
      </div>
    );
  }
}

// class Movie extends Component {
//   constructor() {
//     super();
//     this.state = {
//       poster: "http://www.clipartkid.com/images/44/top-fictional-monologues-of-all-time-PzUyRb-clipart.jpg"
//     }
//   }
//
//   componentWillMount() {
//     this._fetchPoster();
//   }
//
//   _fetchPoster() {
//     fetch("https://api.themoviedb.org/3/discover/movie?api_key=b10aede3f3389969994a1d3cb3f7c968&language=en-US&sort_by=revenue.desc&include_adult=false&include_video=false&page=1")
//     .then(res => res.json())
//     .then(json => {
//       let randInt = Math.floor(Math.random() * json.results.length);
//       console.log(randInt);
//         let posterFullPath = "";
//       for (var i = 0; i < json.results.length; i++) {
//         posterFullPath = "https://image.tmdb.org/t/p/w500" + json.results[i].poster_path;
//         console.log(posterFullPath);
//       }
//       this.setState({poster: posterFullPath})
//     })
//     .catch(err => console.log('Fetch Error :-S', err))
//   }
//
//   render() {
//     return (
//       <div className="Movie">
//         <img src={this.state.poster} className="MoviePoster" alt="movieposter" />
//       </div>
//     )
//   }
// }
//
// class Meal extends Component {
//   constructor() {
//     super();
//     this.state = { photo: "http://mealnj.com/wp-content/themes/meal/images/slide-03.jpg"}
//   }
//   render() {
//     return (
//       <div className="Meal">
//         <img src={this.state.photo} className="MealPhoto" alt="meal" />
//       </div>
//     )
//   }
// }
//
// class Clothing extends Component {
//   constructor() {
//     super();
//     this.state = { photo: "https://www.cdvshop.com/photos/nsb/dsc_2726.jpg"}
//   }
//   render() {
//     return (
//       <div className="Clothing">
//         <img src={this.state.photo} className="ClothingPhoto" alt="clothing" />
//       </div>
//     )
//   }
// }

export default App;
