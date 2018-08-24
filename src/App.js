import React, { Component } from 'react';
import './App.css';


import MapContainer from './MapContainer'

class App extends Component {
  state = {
  venues:[],
  query:'',
  queryResult:[],
  isLoading:false,
  addClass:false,
  error:null,
  showingInfoWindow: false,
  activeMarker: {},
  selectedVenue: {},
};

//updates the query, if something is seached for - as understood from Udacity notes
updateQuery = (query) => {
  this.setState({ query: query });
  console.log(query)
}

//removes search data once search box is emptied and returns the full venue list - as understood from Udacity class notes
clearQuery = () => {
   this.setState({ query: '' })
   this.setState({ queryResult: this.state.venues})
 }

//opens an InfoWindow if marker or list item is clicked on - as understood from google-maps-react npm documentation
 onMarkerClick = (props, venue, e) =>
   this.setState({
     selectedVenue: props,
     activeMarker: venue,
     showingInfoWindow: true,
   });

//several components of google maps are wrapped in the class gmnoprint including the map markers which I was able to find using Chrome Dev Tools
// selectedMarker compares the markers title to the inner text of the list item
//help sought with google-maps-react on slack channel and solution demonstrated by fellow Udacity student Schular from which I have written my own function
onListItemClick = (e) => {
  let listMarkers
  if (document.querySelectorAll(".gmnoprint map area") === undefined){
  listMarkers = [...document.querySelectorAll(".gmnoprint map area")];
} else {
  listMarkers = [...document.querySelectorAll(".gmnoprint")];
}
  const selectedMarker = listMarkers.find(
    marker => marker.title === e.innerText
  );
  if(selectedMarker!== undefined){
  selectedMarker.click();
  }
};

//closes the infoWindow if open - as understood from google-maps-react npm documentation
   onMapClicked = (props) => {
       if (this.state.showingInfoWindow) {
         this.setState({
           showingInfoWindow: false,
           activeMarker: null
         })
       }
     };

//As understood from notes here: https://www.robinwieruch.de/react-fetching-data/
componentDidMount(){
    //this.setState({ isLoading: true});
    this.getVenues ()
    //Error Handling in case of failure to load Google Maps API
    this.gm_authFailure=() => {console.log("I'm sorry Dave I cant load Google Maps...")};

}

//Also contains Error Handling in case of failure to load Third Party API
  getVenues =()=> {
    fetch('https://api.foursquare.com/v2/venues/explore?client_id=V0PCNSF1AQYCMV3VFHGTZIJXUSUL4ZNO3CRQFW2QDQQTOW1B&client_secret=BBRX55NXSA45AATXDQECBVXUQVQUVWF0RVKDLACKZQVGGPB1&v=20180323&limit=500&near=Cambridge,UK&radius=500&query=museums', {
    method: 'GET'
  }).then(response => {
     if (response.ok) {
          return response.json();
       } else {
          throw new Error('I am sorry Dave, I cannot load FourSquare API...');
       }
      }).then(data => {
        this.setState({ venues: data.response.groups[0].items, isLoading: false })
        //console.log(this.state.venues.data.response.groups[0].items)
      })
      .catch(error => this.setState({ error, isLoading: false })
    );
}

//opens the side search box on screens smaller than 700px
openNav = () => {
    this.setState({sideOpen: this.state.sideOpen});
}

//closes the side search box on screens smaller than 700px
closeNav = () => {
  this.setState({sideOpen: this.state.sideOpen})
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


    return(
      <div className="App">
        <header className="App-header">
          <h2 className="App-title"
              aria-label="Cambridge City Museums"
              tabIndex="0">
              <button id="button_1"
                      aria-label="opens search bar and brings back on screen"
                      tabIndex="0">☰</button>
          Cambridge City Museums</h2>
        </header>
        <div>
          <MapContainer
          markers={this.state.markers}
            venues={this.state.venues}
            query={this.state.query}
            updateQuery={this.updateQuery}
            clearQuery={this.clearQuery}
            onMarkerClick={this.onMarkerClick}
            onListItemClick={this.onListItemClick}
            showingInfoWindow={this.state.showingInfoWindow}
            activeMarker={this.state.activeMarker}
            selectedVenue={this.state.selectedVenue}
            onMapClicked={this.onMapClicked}
            closeNav={this.closeNav}
            openNav={this.openNav}
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

//&#9776;
