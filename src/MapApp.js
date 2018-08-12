import React, { Component } from 'react';
import MapboxGl from 'react-map-gl';
import './App.css';

import Map from './Map'

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiYWxpY2V0IiwiYSI6ImNqa2lzaGJwMzBpamMzdHBobWJoYTdkNTYifQ.spcb7Dq657-jw_8rOgWjOQ'
});
class App extends React.Component {
  render() {
    return (
      <Map
        containerStyle={{ width: '100vw', height: '100vh'}}
      />
    );
  }
}
export default MapApp
