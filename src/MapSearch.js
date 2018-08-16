import React, {Component} from 'react'

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


export class MapSearch extends Component {
    state = {
        places:[
        {title: 'The Fitzwilliam Museum', location: {lat: 52.199869, lng: 0.119986}},
        {title: 'Mathematical Bridge', location: {lat: 52.202182, lng: 0.115019}},
        {title: 'The Grand Arcade', location: {lat: 52.204162, lng: 0.122344}},
        {title: 'Kings College Chapel', location: {lat: 52.204797, lng: 0.116566}},
        {title: 'Bridge of Sighs', location: {lat: 52.2084, lng: 0.1158}},
        {title: 'The Round Church', location: {lat: 52.2084, lng: 0.1189}}
      ],
      myMarkers:[],
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},

  };


//As understood from google-maps-react npm documentation - iopens an info window on marker click
      onMarkerClick = (props, place, e) =>
        this.setState({
          selectedPlace: props,
          activeMarker: place,
          showingInfoWindow: true
        });


/*As understood from google-maps-react npm documentation
      onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          })
        }
      };*/





    render() {
// Bounds - As understood from google-maps-react npm documentation
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


/*const addMarkers = this.state.places.map((place,i)=>{
  const marker  = new this.props.google.maps.Marker({
    title: place.title,
    position: { lat: place.location.lat,
                lng: place.location.lng
              },
              id:i
})
return (

console.log('all maped')
)
})*/

const markers = this.state.places

      return (
        <Map
          google={this.props.google}
          initialCenter={{
            lat:52.2053,
            lng: 0.1218
          }}
          bounds={bounds}
            zoom={15}
          onClick={this.onMapClicked}
          role="application"
          >
{/*pass an array of markers and map over them  -  As understood  here: https://stackoverflow.com/questions/43859785/how-do-i-display-multiple-markers-with-react-google-maps*/}
    {markers.map((place,i) => (
            <Marker
              onClick={this.onMarkerClick}
              title={place.title}
              position={{ lat: place.location.lat, lng: place.location.lng }}
              key={i}
              animation= {this.props.google.maps.Animation.DROP}
            />
        ))}
        {/* As explained in google-maps-react npm documentation*/}
            <InfoWindow
                marker={this.state.activeMarker}
                onOpen={this.windowHasOpened}
                onClose={this.windowHasClosed}
                visible={this.state.showingInfoWindow}
                >
                  <div>
                    <h4>{this.state.selectedPlace.title}</h4>
                  </div>
              </InfoWindow>

        </Map>

      );
    }
  }

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAA0IrgCP3zn6wb_04IHMk3PWWC6D7gIS8'
})(MapSearch)
