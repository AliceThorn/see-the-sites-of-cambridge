import React, { Component } from 'react';
//import ReactDOM from 'react-dom'
//import { GoogleApiWrapper } from 'google-maps-react'
import './App.css';

import MapContainer from './MapContainer'
import Search from './Search'

class App extends Component {

  render(){

    return(
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Sights and Sounds of Cambridge</h1>
        </header>

        <div className = 'search-box'>
          <Search />
        </div>
        <div className = 'map-container'>
          <MapContainer />
        </div>
        <footer className="App-header">
          <p>Udacity Project #8: Neighbourhood Maps by Alicia Thornthwaite</p>
        </footer>
      </div>

    )
  }
}

export default App
