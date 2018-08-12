import React, { Component } from 'react';
//import ReactDOM from 'react-dom'
//import { GoogleApiWrapper } from 'google-maps-react'
import './App.css';

import MapContainer from './MapContainer'
//import Search from './Search'

class App extends Component {

  render(){

    return(
      /*<div>
      <div className = 'search-box'>
      <Search />
      </div>*/
      <div className = 'map-container' >
      <MapContainer />
      </div>
//</div>
)
}
}

export default App
