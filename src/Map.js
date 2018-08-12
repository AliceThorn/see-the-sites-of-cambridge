import React, { Component } from 'react'
//import MapboxGl from 'react-map-gl';
import ReactDOM from 'react-dom'


class Map extends Component {

  state = {
    places:[
    {title: 'The Fitzwilliam Museum', location: {lat: 52.199869, lng: 0.119986}},
    {title: 'Mathematical Bridge', location: {lat: 52.202182, lng: 0.115019}},
    {title: 'Addenbrookes Hospital', location: {lat: 52.17595, lng: 0.14045}},
    {title: 'The Grand Arcade', location: {lat: 52.204162, lng: 0.122344}},
    {title: 'Kings College Chapel', location: {lat: 52.204797, lng: 0.116566}},
    {title: 'Cambridge University Botanical Gardens', location: {lat: 52.193495, lng: 0.12576}}
  ]
}


componentDidMount() {

    this.loadMap();
}

loadMap() {
  if (this.props && this.props.google) {
      // google is available
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      //let zoom = 14;
      //let lat = 52.199869;
      //let lng = 0.119986;
      //const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: {lat: 52.4041682023796, lng: 0.26229858648434856},
        zoom: 15,
mapTypeId: 'terrain'
      })
      this.map = new maps.Map(node, mapConfig);
    }
  }

render() {

    return (
      <div ref='map' className='map'>
        Loading map...
      </div>
    )
  }
}

export default Map
