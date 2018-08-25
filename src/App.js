import React, { Component } from 'react';
import './App.css';


import MapContainer from './MapContainer'

class App extends Component {
  state = {
  venues:[],
  markers:[],
  query:'',
  queryResult:[],
  isLoading:false,
  isSideBarOpen:false,
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

   // function to create an array of markers - as understood from Google Maps API
     createMarker = marker => {
    //to stop on search markers with value null being added to Array, markers now only added once
       if (marker !== null) this.state.markers.push(marker);
     };

//function compares list item to marker from node list created above. Had help with a bug (no props) which fellow Udacity Student andreafrontend on the forums helped me solve
//See forum conversation here: https://discussions.udacity.com/t/google-maps-react-issue-with-list-item-and-markers/864262/2
     onListItemClick = (e) => {
       const listMarkers = this.state.markers.find(
         marker => marker.props.name === e.target.innerText
       );

    if(listMarkers !== undefined) {
       listMarkers.marker.onClick(listMarkers.props, listMarkers.marker, e)
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

//Error Handling in case of failure to load Google Maps API
gm_authFailure() {
document.getElementById("map-area").innerText=("I'm sorry Dave, I cannot load Google Maps...")
};

//As understood from notes here: https://www.robinwieruch.de/react-fetching-data/
componentDidMount(){
    this.getVenues ()
    //binds funtion gm_authFailure to the window so it can be called automatically
    window.gm_authFailure = this.gm_authFailure.bind(this);
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
openSideBar = () => {
  const searchbox = document.getElementById("searchbox")
  searchbox.classList.toggle("open")
}

//closes the side search box on screens smaller than 600px
closeSideBar = () => {
  this.setState({isSideBarOpen: this.state.isSideBarOpen})
  const searchbox = document.getElementById("searchbox")
  searchbox.classList.toggle("open")
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
              <button id="open-button"
                      onClick={this.openSideBar}
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
            createMarker={this.createMarker}
            closeSideBar={this.closeSideBar}
            openSideBar={this.openSideBar}
            buttonClicked={this.buttonClicked}
            isSideBarOpen={this.state.isSideBarOpen}
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
