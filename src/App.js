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
let fakeServerData = {
  user: {
    name: 'Jay',
    playlists: [
      {
        name: 'My favorites',
        songs: ['Beat It', 'Sweet Caroline', 'Bad']
      },
      {
        name: 'Discover WEekly',
        songs: ['Le song', 'The Song', 'Song']
      },
      {
        name: 'Another playlist - the best!',
        songs: ['Le song', 'The Song', 'Song']
      },
      {
        name: 'Playlis - yeah!',
        songs: ['Le song', 'The Song', 'Song']
      },
    ]
  }
}

class Aggregate extends Component {
  render() {
    return(
      <div style={aggregateStyle}>
        <h2>{this.props.playlists && this.props.playlists.length} Text</h2>
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
  constructor() {
    super();
      this.state = {serverData: {}}
  }
  componentDidMount() {
    setTimeout(() => {
    this.setState({serverData: fakeServerData});
  }, 1000);
}
  render() {
    return (
      <div className="App">
      {this.state.serverData.user && 
        <div>      
          <h1 style={titleStyle}>
            {this.state.serverData.user.name}'s Playlists
          </h1>
            <Aggregate playlists={this.state.serverData.user.playlists}/>
            <Aggregate />
    
          <Filter />
          <Playlist />
          <Playlist />
          <Playlist />
          <Playlist />
        </div>
      }
      </div>
    );
  }
}

export default App;
