import React, { Component } from 'react';
import './App.css';

import MapContainer from './MapContainer'
//import Search from './Search'

class App extends Component {

  state = {
    places:[
    {title: 'The Fitzwilliam Museum', location: {lat: 52.199869, lng: 0.119986}},
    {title: 'Mathematical Bridge', location: {lat: 52.202182, lng: 0.115019}},
    {title: 'The Grand Arcade', location: {lat: 52.204162, lng: 0.122344}},
    {title: 'Kings College Chapel', location: {lat: 52.204797, lng: 0.116566}},
    {title: 'Bridge of Sighs', location: {lat: 52.2084, lng: 0.1158}},
    {title: 'The Round Church', location: {lat: 52.2084, lng: 0.1189}}
  ],
  query:'',
  queryResult:[]
};

updateQuery = (query) => {
  this.setState({ query: query });
  console.log(query)
}

clearQuery = () => {
   this.setState({ query: '' })
   this.setState({ queryResult: this.state.places})
 }

        /*const ListClicked = places.map(place=>{
         if (place.id === queryResult.id){
         this.myMarkers
         }return place
        })*/

  /*state={
    sites:[],
    isLoading:false,
    error:null
  }
  //As understood from notes here: https://www.robinwieruch.de/react-fetching-data/
  componentDidMount(){
    this.setState({isLoading:true});
    fetch('https://api.foursquare.com/v2/venues/explore?client_id=V0PCNSF1AQYCMV3VFHGTZIJXUSUL4ZNO3CRQFW2QDQQTOW1B&client_secret=BBRX55NXSA45AATXDQECBVXUQVQUVWF0RVKDLACKZQVGGPB1&v=20180323&limit=1&ll=52.2053,0.1218&query=places')
    .then(response => {
       if (response.ok) {
         return response.json();
       } else {
         throw new Error('Something went wrong ...');
       }
     })
     .then(data => this.setState({ sites: data.sites, isLoading: false }))
     .catch(error => this.setState({ error, isLoading: false }));
 }*/

  render(){

/*As understood from notes here: https://www.robinwieruch.de/react-fetching-data/
const {sites, isLoading, error} = this.state;
if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }*/




    return(
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Sights and Sounds of Cambridge</h1>
        </header>

        {/*<div className = 'search-box'>
          <Search
          places = {this.state.places}

           />
        </div>*/}
        <div className ='map-container'>
          <MapContainer
          places = {this.state.places}
          query = {this.state.query}
          updateQuery = {this.updateQuery}
          clearQuery = {this.clearQuery}
          />
        </div>
        <footer className='App-footer'>
          <p>Udacity Project #8: Neighbourhood Maps by Alicia Thornthwaite</p>
        </footer>
      </div>

    )
  }
}

export default App
