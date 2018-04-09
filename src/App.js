import React, { Component } from 'react';
import './App.css';

let whiteTextColor = {
  color: 'white'
}
let aggregateStyle = {
  display: 'inline-block',
  width: '40%',
  color: 'white'  
}
let playlistStyle = {
  display: 'inline-block',  
  color: 'white',
  width: '25%'
}
let titleStyle = {
  fontSize: '54px',
  color: 'white'
}

class Aggregate extends Component {
  render() {
    return(
      <div style={aggregateStyle}>
        <h2>Number Text</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return(
      <div>
        <img />
        <input
          type="text"
          placeholder="Filter"
        />
        
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    return(
      <div style={playlistStyle}>
        <img />
        <h3>Playlist Name</h3>
        <ul>
          <li>Song 1</li>
          <li>Song 2</li>
          <li>Song 3</li>
        </ul>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 style={titleStyle}>Title</h1>
        <Aggregate />
        <Aggregate />
        <Filter />
        <Playlist />
        <Playlist />
        <Playlist />
        <Playlist />
      </div>
    );
  }
}

export default App;
