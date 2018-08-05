import React, {Component} from 'react'

import Locations from './Locations';


class MapContainer extends Component {

  render(){
    return(
var map;

var markers = []

function initMap(){
  var styles = [
      {
        featureType: 'water',
        stylers: [
          { color: '#0099dd' }
        ]
      },{
        featureType: 'administrative',
        elementType: 'labels.text.stroke',
        stylers: [
          { color: '#ffffff' },
          { weight: 6 }
        ]
      },{
        featureType: 'administrative',
        elementType: 'labels.text.fill',
        stylers: [
          { color: '#e85113' }
        ]
      },{
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
          { color: '#efe9e4' },
          { lightness: -40 }
        ]
      },{
        featureType: 'transit.station',
        stylers: [
          { weight: 9 },
          { hue: '#e85113' }
        ]
      },{
        featureType: 'road.highway',
        elementType: 'labels.icon',
        stylers: [
          { visibility: 'off' }
        ]
      },{
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [
          { lightness: 100 }
        ]
      },{
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [
          { lightness: -100 }
        ]
      },{
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
          { visibility: 'on' },
          { color: '#aadd55' }
        ]
      },{
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [
          { color: '#efe9e4' },
          { lightness: -25 }
        ]
      }
    ];

    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 52.252454, lng: 0.268072},
      zoom: 13,
      styles: styles,
      mapTypeControl: false
    });

  var locations = var locations = [
    {title: 'Ely Museum', location: {lat: 52.40092150052206, lng: 0.2631139780248759}},
    {title: 'Ely Cathedral', location: {lat: 52.399166694893346, lng: 0.2637577081884501}},
    {title: 'Ely Football Club', location: {lat: 52.411216771263845, lng: 0.24659157049313762}},
    {title: 'Ely Train Station', location: {lat: 52.39100190882851, lng: 0.2664828730469253}},
    {title: 'Ely Hospital', location: {lat: 52.413939192250766, lng: 0.27564525854245403}},
    {title: 'Ely Golf Club', location: {lat: 52.39233757500849, lng: 0.25038961895756984}}
  ];
}
)
}
}

export default MapContainer
//AIzaSyAA0IrgCP3zn6wb_04IHMk3PWWC6D7gIS8
