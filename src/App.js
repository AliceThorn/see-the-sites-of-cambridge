import React, { Component } from 'react';
import './App.css';

import MapContainer from './MapContainer'

//Error Handling in case of failure to load Google Maps API
//let gm_authFailure=() => {console.log("I'm sorry Dave i cant load Google Maps at the moment")};


class App extends Component {

  state = {
    places:[
    {name: 'Fitzwilliam Museum', id: '4b0ecc4df964a5202d5b23e3', location: {lat: 52.199869, lng: 0.119986}},
    {name: 'Mathematical Bridge', id:'4cdebe6578ddf04d846c9c98', location: {lat: 52.202182, lng: 0.115019}},
    {name: 'Kings College Chapel', id:'4bb8b3b31261d13a31d3e898', location: {lat: 52.204797, lng: 0.116566}},
    {name: 'Bridge of Sighs', id: '4ba50ef4f964a520ffd638e3', location: {lat: 52.2084, lng: 0.1158}},
    {name: 'Sedgwick Museum of Earth Sciences', id: '4b54bf22f964a52032ca27e3', location: {lat: 52.202749869515685, lng: 0.12112797332697048}},
    {name: 'Museum of Archaeology and Anthropology', id: '4f48bb8ae4b00005b8afefe7', location: {lat: 52.20315259155748, lng: 0.12193184511250331}},
    {name: 'Polar Museum', id: '4b61ca2ff964a520fd222ae3', location: {lat: 52.19857243226378, lng: 0.12609499460874032}},
    {name: 'Cambridge University Museum Of Zoology', id: '4b54bf22f964a52032ca27e3', location: {lat: 52.20315259155748, lng: 0.12193184511250331}}
  ],
  query:'',
  queryResult:[],
  isLoading:false,
  error:null,
  venues:[]
};

updateQuery = (query) => {
  this.setState({ query: query });
  console.log(query)
}

clearQuery = () => {
   this.setState({ query: '' })
   this.setState({ queryResult: this.state.places})
 }

  //As understood from notes here: https://www.robinwieruch.de/react-fetching-data/
  componentWillMount(){
    this.setState({ isLoading: true });

    fetch('https://api.foursquare.com/v2/venues/explore?client_id=V0PCNSF1AQYCMV3VFHGTZIJXUSUL4ZNO3CRQFW2QDQQTOW1B&client_secret=BBRX55NXSA45AATXDQECBVXUQVQUVWF0RVKDLACKZQVGGPB1&v=20180323&limit=500&ll=52.199869,0.119986&radius=1000')
      .then(response => {
     if (response.ok) {
          return response.json();
       } else {
          throw new Error('I am sorry, I cannot do that Dave...');
       }
      }).then(data => {
        this.setState({ venues: data.response.groups[0].items, isLoading: false });
        //console.log(this.state.venues)
      })
      .catch(error => this.setState({ error, isLoading: false }));
}





  render(){

//As understood from notes here: https://www.robinwieruch.de/react-fetching-data/
    const { isLoading, error } = this.state;

        if (error) {
          return <p>{error.message}</p>;
        }

        if (isLoading) {
          return <p>Loading ...</p>;
        }

        /*let venuesList = this.state.venues.map((venue)=>{
          return(
            <div key={this.state.venues.id}>
            {venue.this.state.venues.name}
            </div>
          )
        })*/



    return(
      <div className="App">
        <header className="App-header">
          <h2 className="App-title">Sights and Sounds of Cambridge</h2>
        </header>
        <div>
          <MapContainer
          places = {this.state.places}
          query = {this.state.query}
          updateQuery = {this.updateQuery}
          clearQuery = {this.clearQuery}
          venues = {this.state.venues}
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
