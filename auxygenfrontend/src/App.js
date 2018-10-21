import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './html5up-directive/assets/css/main.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  songSearch() {
    axios.get('http://localhost:5000/search?song=' + document.getElementById("songtitle").elements[0].value).then(res => {
      const songs = res.data
      this.setState({songs})
    }).catch(err => {
      console.log(err)
    });

  }

  submitSong(uri) {
    // this.setState({songs=[]})
    axios.post('http://localhost:5000/add_song?track_uri=' + uri).then(res => (
      console.log(res)
    )).catch(err => {
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
        <body class="is-preload">

            <div id="header">
              <span class="logo icon fa-music"></span>
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

              <div class="box alt container">
                <section class="feature left">
                  <a href="#" class="image icon fa-thumbs-up"><img src="https://img.discogs.com/_Ys4oxfbTXmWIRZtRdCjf2HoPnM=/fit-in/600x520/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-10099368-1495223837-7850.jpeg.jpg" alt="" style={{width:"100", height:"100"}} /></a>
                  <div class="content">
                    <h3>Song Title</h3>
                    <p>Artist Name</p>
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
              <div class="container medium">
                <header class="major last">
                  <h2>YOU DECIDE</h2>
                </header>
                <form id="songtitle">
                  <input type="text" name="title" placeholder="song title" style={{width:"200px", margin:"0 auto"}}></input>
                  <br/>
                  <a className="button" type="submit" onClick={()=>this.songSearch()}>ADD SONG <i className="icon fa-plus"/></a>
                </form>
                {
                  this.state.songs && this.state.songs.map(song => (
                      <div>
                        <a className="button" onClick={() => this.submitSong(song.uri)}>{song.name} by {song.artist}</a>
                        <br/>
                      </div>
                    )
                  )
                }
                <br/><br/>
                <a className="button">VOLUME UP <i className="icon fa-volume-up"/></a>
                <br/><br/>
                <a className="button">VOLUME DOWN <i className="icon fa-volume-down"/></a>
                <br/><br/>
                <a className="button">SKIP SONG <i className="icon fa-angle-double-right"/></a>

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
