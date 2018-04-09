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
let ulStyle = {
  textAlign: 'left'
}
let fakeServerData = {
  user: {
    name: 'Jay',
    playlists: [
      {
        name: 'My favorites',
        songs: [
          {name: 'Beat It', duration: 1345}, 
          {name: 'Sweet Caroline', duration: 1234},
          {name: 'Bad', duration: 2342}
        ]
      },
      {
        name: 'Discover Weekly',
        songs: [
          {name: 'Halleluja', duration: 1345}, 
          {name: 'Sweet Caroline', duration: 1234},
          {name: 'Hey', duration: 2342}
        ]
      },
      {
        name: 'Another playlist - the best!',
        songs: [
          {name: 'What', duration: 1345}, 
          {name: 'Sweet Caroline', duration: 1234},
          {name: 'Bad', duration: 2342}
        ]
      },
      {
        name: 'Playlist - yeah!',
        songs: [
          {name: 'Beat It', duration: 1345}, 
          {name: 'Sweet Caroline', duration: 1234},
          {name: 'Bad', duration: 2342}
        ]
      },
    ]
  }
}

class PlaylistCounter extends Component {
  render() {
    return(
      <div style={aggregateStyle}>
        <h2>{this.props.playlists.length} playlists</h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    } , [])
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    }, 0)
    return(
      <div style={aggregateStyle}>
        <h2>{Math.round(totalDuration/60)} hours</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return(
      <div>
        <img />
        <input type="text" onKeyUp={event => 
          this.props.onChange(event.target.value)}/>
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist
    return(
      <div style={playlistStyle}>
        <img />
        <h3>{playlist.name}</h3>
        <ul style={ulStyle}>
          {this.props.playlist.songs.map(song =>
            <li>{song.name}</li>
          )}
        </ul>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      filterString: ''
    }
  }
  componentDidMount() {
    setTimeout(() => {
    this.setState({serverData: fakeServerData});
  }, 1000);
}
  render() {
    return (
      <div className="App">
      {this.state.serverData.user ? 
        <div>      
          <h1 style={titleStyle}>
            {this.state.serverData.user.name}'s Playlists
          </h1>
          <PlaylistCounter playlists={this.state.serverData.user.playlists}/>
          <HoursCounter playlists={this.state.serverData.user.playlists}/>
          <Filter onChange={text => this.setState({filterString: text})} />
          {this.state.serverData.user.playlists.filter(playlist =>
            playlist.name.toLowerCase().includes(
              this.state.filterString.toLowerCase())
          ).map(playlist => 
            <Playlist playlist={playlist} />          
          )}
        </div> : <h1 style={whiteTextColor}>Loading...</h1>
      }
      </div>
    );
  }
}

export default App;
