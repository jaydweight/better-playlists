import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';

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
let btnStyle = {
  padding: 20,
  fontSize: 50,
  marginTop: 20,
  borderRadius: 5
}
let imgStyle = {
  width: 60
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
      }
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
        <input type="text" placeholder="Filter Playlists" onKeyUp={event => 
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
        <img src={playlist.imageUrl} style={imgStyle} />
        <h3>{playlist.name}</h3>
        <ul style={ulStyle}>
          {playlist.songs.map(song =>
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
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    if (!accessToken)
      return;

    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({
      user: {
        name: data.display_name
      }
    }))

    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({
      playlists: data.items.map(item => {
        console.log(data.items)
        return {
          name: item.name,
          imageUrl: item.images[0].url,
          songs: []
        }
      })
    }))

  }
  render() {
    let playlistToRender = 
      this.state.user && 
      this.state.playlists 
        ? this.state.playlists.filter(playlist =>
          playlist.name.toLowerCase().includes(
            this.state.filterString.toLowerCase())) 
        : []
    return (
      <div className="App">
      {this.state.user ? 
        <div>      
          <h1 style={titleStyle}>
            {this.state.user.name}'s Playlists
          </h1>
          <PlaylistCounter playlists={playlistToRender}/>
          <HoursCounter playlists={playlistToRender}/>
          <Filter onChange={text => {
              this.setState({filterString: text})
            }} />
          {playlistToRender.map(playlist => 
            <Playlist playlist={playlist} />          
          )}
        </div> : <button onClick={() => {
          window.location = window.location.href.includes('localhost')
            ? 'http://localhost:8888/login'
            : 'https://better-playlists-backend.herokuapp.com/login' }
        }
        style={btnStyle}>Sign in with Spotify</button>
      }
      </div>
    );
  }
}

export default App;
