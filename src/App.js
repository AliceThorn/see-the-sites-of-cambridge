import React, { Component } from 'react';
import './App.css';

import MapContainer from './MapContainer'

//Error Handling in case of failure to load Google Maps API
let gm_authFailure=() => {console.log("I'm sorry Dave i cant load Google Maps at the moment")};


class App extends Component {
  state = {
  venues:[],
  query:'',
  queryResult:[],
  isLoading:false,
  error:null,
};

updateQuery = (query) => {
  this.setState({ query: query });
  console.log(query)
}

clearQuery = () => {
   this.setState({ query: '' })
   this.setState({ queryResult: this.state.venues})
 }

  //As understood from notes here: https://www.robinwieruch.de/react-fetching-data/
componentDidMount(){
    this.setState({ isLoading: true});
    this.getVenues ()
}

//Also contains Error Handling in case of failure to load APIs
  getVenues =()=> {
    fetch('https://api.foursquare.com/v2/venues/explore?client_id=V0PCNSF1AQYCMV3VFHGTZIJXUSUL4ZNO3CRQFW2QDQQTOW1B&client_secret=BBRX55NXSA45AATXDQECBVXUQVQUVWF0RVKDLACKZQVGGPB1&v=20180323&limit=500&near=Cambridge,UK&radius=500&query=museums', {
    method: 'GET'
  }).then(response => {
     if (response.ok) {
          return response.json();
       } else {
          throw new Error('I am sorry Dave, I cannot do that...');
       }
      }).then(data => {
        this.setState({ venues: data.response.groups[0].items, isLoading: false })
        //console.log(this.state.venues.data.response.groups[0].items)
      })
      .catch(error => this.setState({ error, isLoading: false })
    );
}

//sends venues to array
/* fetchPlaces=()=> {
 this.state.venues.map(markerVenue => {
  const marker = new google.maps.Marker({
 name:markerVenue.venue.name,
    position: {lat: markerVenue.venue.location.lat,
              lng: markerVenue.venue.location.lng},
    //  map: map,
      animation: window.google.maps.Animation.DROP
})

//})
this.state.venues.push(markerVenue);
}*/

/*createMarker = () =>{
//this.state.venues.map(markerVenue => {
const marker = new window.google.maps.Marker({
  position:{
    lat:52.2053,
    lng: 0.1218
  },
name:markerVenue.venue.name,
  position: {lat: markerVenue.venue.location.lat,
          lng: markerVenue.venue.location.lng},
  map: map,
    animation: window.google.maps.Animation.DROP
  });
})*/


  render(){
//As understood from notes here: https://www.robinwieruch.de/react-fetching-data/
    const { isLoading, error } = this.state;
        if (error) {
          return <p>{error.message}</p>;
        }
        if (isLoading) {
          return <p>Loading ...</p>;
        }

    return(
      <div className="App">
        <header className="App-header">
          <h2 className="App-title">Sights and Sounds of Cambridge</h2>
        </header>
        <div>
          <MapContainer
          venues ={this.state.venues}
          query = {this.state.query}
          updateQuery = {this.updateQuery}
          clearQuery = {this.clearQuery}
          createMarker = {this.createMarker}
          />
        </div>
        <footer className="App-footer">
          <p>Udacity Project #8: Neighbourhood Maps by Alicia Thornthwaite</p>
        </footer>
      </div>

    )
  }
}

export default App
