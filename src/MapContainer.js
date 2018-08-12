import React, {Component} from 'react'
//import { GoogleApiWrapper } from 'google-maps-react'
//import ReactDOM from 'react-dom'
//import Map from './Map'

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

//export class MapContainer extends Component {


  export class MapContainer extends Component {
    render() {
      const style = {
  width: '100%',
  height: '100%'
}
const points = [
    { lat: 52.02, lng: 0.2601 },
    { lat: 52.03, lng: 0.2602 },
    { lat: 51.03, lng: 0.2604 },
    { lat: 52.05, lng: 0.2602 }
]
const bounds = new this.props.google.maps.LatLngBounds();
for (var i = 0; i < points.length; i++) {
  bounds.extend(points[i]);
}
      return (
        <Map
          google={this.props.google}
          style={style}
          initialCenter={{
            lat:52.2053,
            lng: 0.1218
          }}
           bounds={bounds}
          zoom={15}
          onClick={this.onMapClicked}
        >

          <Marker onClick={this.onMarkerClick}
                  name={'Current location'} />

          <InfoWindow onClose={this.onInfoWindowClose}>
              <div>
                <h1>

                Cambridge</h1>
              </div>
          </InfoWindow>
        </Map>
      );
    }
  }


    /*  initMap () {
if(this.props && this.props.google) {
const {google} = this.props
//const maps = google.maps
//const mapRef = this.refs.map
//const node = ReactDOM.findDOMNode(mapRef)

/*const mapConfiguration = Object.assign({}, {
center: {lat: 52.4041682023796, lng: 0.26229858648434856},

})

    this.map = new google.maps.Map(this.refs.map, {
      center: {lat: 52.4041682023796, lng: 0.26229858648434856},
      zoom: 13,
      mapTypeControl: false,

    })}
}
    render() {
    const mapStyle = {
      width: 500,
      height: 300,
      border: '1px solid black'
    };

    return (
      <div>
        <div ref="map" style={mapStyle}> should be a map!
        <Map />
        </div>

      </div>
    );
  }
  }

  ReactDOM.render(
  <Map />,
  document.getElementById('root')
);*/


  /*render() {
    const style = {
    width: '100%',
    height: '100%'
  }
    return (
      <Map google={this.props.google}
          style={style}
          initialCenter={{
            lat: 52.199869,
            lng: 0.119986
          }}
          zoom={15}
          onClick={this.onMapClicked} >

        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>Page</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}*/

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAA0IrgCP3zn6wb_04IHMk3PWWC6D7gIS8'
})(MapContainer)



/*

export class MapContainer extends Component {
  render() {
    const style = {
      width: '100vw',
      height: '100vh'
    }
    return (
      <div style={style}>
        <Map google={this.props.google}
          />
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAA0IrgCP3zn6wb_04IHMk3PWWC6D7gIS8'
})(MapContainer)*/

//AIzaSyAA0IrgCP3zn6wb_04IHMk3PWWC6D7gIS8
