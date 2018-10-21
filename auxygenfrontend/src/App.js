import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  search() {
    axios.get('http://localhost:5000/search?song=hello').then(res => {
      const songs = res.data
      this.setState({songs})
    }).catch(err => {
      console.log(err)
    });

  }

  render() {
    if(this.state.songs){
      return (
        <div>
          <div className="App">
            <button onClick = {() => this.search()}>HELL YEAH BROTHER</button>
          </div>
          {
            this.state.songs.map(song => (<button>song</button>))
          }
        </div>
      );
    } else {
      return (
        <div className="App">
          <button onClick = {() => this.search()}>HELL YEAH BROTHER</button>
        </div>
      );
    }

  }
}

export default App;
