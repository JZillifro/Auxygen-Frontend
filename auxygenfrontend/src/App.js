import React, { Component } from 'react';
import './App.css';
import './html5up-directive/assets/css/main.css';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class App extends Component {

  constructor(props){
    super(props);
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }

    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' }
    }

    spotifyApi.getMyCurrentPlaybackState()
     .then((response) => {
        this.setState({
          nowPlaying: {
             name: response.item.name,
             albumArt: response.item.album.images[0].url,
             artist: response.item.artists[0].name
            }
        });
     });
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  toTrack(item) {
     var track = {};
     track['name'] = item['name'];
     track['artist'] = item['artists'][0]['name'];
     track['uri'] = item['uri'];
     track['cover_art'] = item['album']['images'][0]['url'];
     return track;
  }

  songSearch() {
     const queryTerm = document.getElementById("songtitle").elements[0].value;
     spotifyApi.searchTracks(queryTerm, {limit: 10})
      .then((response) => {
         this.setState({
           songs: response['tracks']['items'].map(item => this.toTrack(item))
         });
      }).catch(err => {
         console.log(err)
      });

  }

  skip() {
     spotifyApi.skipToNext()
     .then((response) => {
         console.log(response)
     }).catch(err => {
         console.log(err)
     });
 }

  submitSong(uri) {
     const playlist = '3XnJJ3aPN4RJTpBOzoNt92';
     const uris = [uri]
     spotifyApi.addTracksToPlaylist(playlist,uris)
      .then((response) => {
         console.log(response)
      }).catch(err => {
         console.log(err)
      });
  }

  render() {
    return (
      <html>
        <head>
          <title>Directive by HTML5 UP</title>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
          <link rel="stylesheet" href="assets/css/main.css" />
        </head>
        <body className="is-preload">

            <div id="header">
              <span className="logo icon fa-music"></span>
              <h1>Auxygen</h1>
              <p>Control the flow of the party.</p>
            </div>

            <div id="main">

              {/* <header class="major container medium">
                <h2>We conduct experiments that
                <br />
                may or may not seriously
                <br />
                break the universe</h2>
                <p>Tellus erat mauris ipsum fermentum<br />
                etiam vivamus nunc nibh morbi.</p>
              </header> */}

              <div className="box alt container">
                <h2>Current Song</h2>
                <section className="feature left">
                  <img src={this.state.nowPlaying.albumArt} alt="" style={{maxHeight: '450px', maxWidth: '450px', height: 'automatic', width: 'automatic'}}/>
                  <div className="content">
                    <h3>{this.state.nowPlaying.name}</h3>
                    <p>{this.state.nowPlaying.artist}</p>
                  </div>
                </section>
              </div>

              {/* <footer class="major container medium">
                <h3>Get shady with science</h3>
                <p>Vitae natoque dictum etiam semper magnis enim feugiat amet curabitur tempor orci penatibus. Tellus erat mauris ipsum fermentum etiam vivamus.</p>
                <ul class="actions special">
                  <li><a href="#" class="button">Join our crew</a></li>
                </ul>
              </footer> */}

            </div>

            <div id="footer">
              <div className="container medium">
                <header className="major last">
                  <h2>YOU DECIDE</h2>
                </header>
                <form id="songtitle">
                  <input type="text" name="title" placeholder="song title" style={{width:"200px", margin:"0 auto"}}></input>
                  <br/>
                  <a className="button" type="submit" onClick={()=>this.songSearch()}>ADD SONG <i className="icon fa-plus"/></a>
                </form>
                {
                  this.state.songs && this.state.songs.map(song => (
                      <div style={{minWidth: '95%', maxWidth: '95%'}}>
                        <a className="button" onClick={() => this.submitSong(song.uri)}><img src={song.cover_art} style={{borderRadius: '8px', maxWidth: '18%', height: 'auto', float: 'left', marginTop: '1%', marginBottom: '1%'}}/>
                          <div style={{float: 'center', marginTop: '5%'}}>
                            {song.name} by {song.artist}
                          </div>
                        </a>
                        <br/>
                      </div>
                    )
                  )
                }
                <br/><br/>
                <a className="button" onClick={() => this.skip()}>SKIP SONG <i className="icon fa-angle-double-right"/></a>

              </div>
            </div>

            <script src="assets/js/jquery.min.js"></script>
            <script src="assets/js/browser.min.js"></script>
            <script src="assets/js/breakpoints.min.js"></script>
            <script src="assets/js/util.js"></script>
            <script src="assets/js/main.js"></script>

        </body>
      </html>
    );

  }
}

export default App;
