import React, {Component} from 'react'

//import ReactDOM from 'react-dom'

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


export class MapContainer extends Component {
    state = {
      places:[
      {title: 'The Fitzwilliam Museum', location: {lat: 52.199869, lng: 0.119986}},
      {title: 'Mathematical Bridge', location: {lat: 52.202182, lng: 0.115019}},
      {title: 'Addenbrookes Hospital', location: {lat: 52.17595, lng: 0.14045}},
      {title: 'The Grand Arcade', location: {lat: 52.204162, lng: 0.122344}},
      {title: 'Kings College Chapel', location: {lat: 52.204797, lng: 0.116566}},
      {title: 'Cambridge University Botanical Gardens', location: {lat: 52.193495, lng: 0.12576}}
    ],
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

//As understood from google-maps-react npm documentation
      onMarkerClick = (props, place, e) =>
        this.setState({
          selectedPlace: this.state.place,
          activeMarker: place,
          showingInfoWindow: true
        });

//As understood from google-maps-react npm documentation
      onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          })
        }
      };



    render() {

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

        >
{/*pass an array of markers and map over them  -  As understood  here: https://stackoverflow.com/questions/43859785/how-do-i-display-multiple-markers-with-react-google-maps*/}
        {markers.map((place,i) => (
            <Marker
              onClick={this.onMarkerClick}
              name={'Current location'}
              title={place.title}
              position={{ lat: place.location.lat, lng: place.location.lng }}
              key={i}
              animation= {this.props.google.maps.Animation.DROP}
            />
        ))}
        {/* As explained in google-maps-react npm documentation*/}
        <InfoWindow
        marker={this.state.activeMarker}
        visible={this.state.showingInfoWindow}>
              onClose={this.onInfoWindowClose}>
                    <div>
                      <h1>{this.state.selectedPlace.title}</h1>
                    </div>
                </InfoWindow>

        </Map>

      );
    }
  }

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAA0IrgCP3zn6wb_04IHMk3PWWC6D7gIS8'
})(MapContainer)

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
