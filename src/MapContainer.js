import React, {Component} from 'react'
import escapeRegExp from 'escape-string-regexp'

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
state = {
  showingInfoWindow: false,
  openInfoWindow: false,
  selectedListItem: null,
  activeMarker: {},
  selectedPlace: {},
  defaultIcon:{},
  queryResults:[],
  };


//As understood from google-maps-react npm documentation - opens an info window on marker click
      onMarkerClick = (props, place, e) =>
        this.setState({
          selectedPlace: props,
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

//As understood from https://stackoverflow.com/questions/51808256/how-to-open-the-corresponding-marker-infowindow-when-click-on-a-list-item/51830410
      /*    showListInfoWindow(e, id) {
            let result = data.find(item => {
              return item.locationId === id;
            });
            this.setState({
              selectedListItem: result
            })
          };


//As understood from: https://gis.stackexchange.com/questions/36703/google-map-display-specific-markers-popup-using-a-list-of-markers

       createMarker = (latlng, html) => {
              const listMarker = new this.props.google.maps.Marker({
                  position: latlng,
                  //map: map
              })
            };

ListItem = this.props.queryResult.map((queryResult,i)=>(
queryResult.id =
  this.createMarker(new this.props.google.maps.LatLng(queryResult.id))
))
      onclickitem =  window.google.maps.event.addListener(listMarker, 'click', function() {
                  infowindow.setContent(html);
                  infowindow.open(map, listMarker);
              });
              return listMarker
          }

          onListItemClick = (queryResult) => {
            if(listMarker.id === queryResult.id){
            new listMarker.google.maps.event.trigger(listMarker, 'click')
          }
          }
*/





          makeMarkerIcon=(markerColor)=>{
              let markerImage = new this.props.google.maps.MarkerImage(
                'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
                new this.props.google.maps.Size(21, 34),
                new this.props.google.maps.Point(0, 0),
                new this.props.google.maps.Point(10, 34),
                new this.props.google.maps.Size(21,34));
              return markerImage;
            }

//showInfoWindow=(infoWindow)=>{ new this.props.google.maps.InfoWindow()}

render() {
  const { places, query, venues} = this.props

  let queryResults
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      queryResults = places.filter((place) => match.test(place.name))
      } else {
        queryResults = places
    }

const placesId = places.map((place) => {
  return(
  place.id
)
})
//console.log(placesId)

const venuesId = venues.map((item) => {
  return(
    item.venue.id
  )
})
//console.log(venuesId)

const venuesLocationList = venues.map((item,i) => {
  return(
    item.venue.location.address
  )
})
//console.log(venuesLocationList[4])

/*const venuesLocation = venues.map((venue,i) => {
  return(
    venuesLocationList.i
  )
})
console.log(venuesLocation)*/


let venueAddress
if (placesId[0] === venuesId[1]){
venueAddress = venuesLocationList[1]
} else {
  venueAddress= "No address provided"
}



//&& venues.location.address!=null
//const venueAddress = item.venues.map(item =>{item.venues.name})
/* const venueList = venues.map(item =>{
  return(
  item.venue.location.address
)
});*/

/* const venueList = venues.map(item =>{
//console.log(places.id)
console.log(item.venue.id)
console.log(item.venue.location.address)
item.venue.location.address
})
 let venueList
if(places.id === item.venue.id && item.venue.location.address!=null) {
venueList = venues.map(venue =>{
  key= item.venue.id
  item.venue.location.address}
} else {
    item.venue.name
  )};*/



//document.getElementsByClassName('place-details').addEventListener('click', this.onMarkerClick);

//default marker icon seen on the map
//let defaultIcon = this.makeMarkerIcon('ff6600');
//Changed icon-marker color for when the markeris clicked
//let changeIcon = this.makeMarkerIcon('5BC3E5');

// Bounds - As understood from google-maps-react npm documentation and rewritten in es6
const bounds = new this.props.google.maps.LatLngBounds();
/*for (var i = 0; i < points.length; i++) {bounds.extend(points[i]);}*/
places.map((place)=> bounds.extend({ lat: place.location.lat, lng: place.location.lng }));

/* Appears to open the search-box by setting the width of the side navigation to 25% */
function openNav() {
    document.getElementsByClassName("search-box").width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementsByClassName("search-box").width = "0";
}



    return (
      <div className ="map-container">
      <div className="search-box">
      <span className="closebtn" onClick={closeNav()}>&times;</span>
      <span onClick={openNav()}>&#9776;</span>
         <div className="choose-location-type">

           <h3>Cambridge City</h3>
          <div className="map-input-wrapper">
             <input className="search-bar"
                    type="text"
                    role="search"
                    aria-label="Search"
                    placeholder="Search Here"
                    value={ query }
                    onChange={(event) => this.props.updateQuery(event.target.value)} />
           </div>
         </div>
{/*As understood from udacity course notes - creates a list of searche places*/}
           {queryResults.length !== places.length && (
             <div className="places-list">
                <span>Now showing {queryResults.length} of {places.length} total</span>
                <button className="button" onClick={this.props.clearQuery}>Show All</button>
              </div>
            )}
              <ul className="place-list">
                {queryResults.map((queryResult,i) => (
                  <li key={i} className="place-list-item">
                      <div className="place-details">
                          <h3
                          onClick={this.showListInfoWindow}
                          >
                          {queryResult.name}</h3>

                          <hr></hr>
                      </div>
                  </li>
                ))}
                </ul>

      </div>
        <div className="map" aria-label="google-maps-area">
          <Map
            google={this.props.google}
            initialCenter={{
              lat:52.2053,
              lng: 0.1218
            }}
            bounds={bounds}
            zoom={15}
            mapTypeControl={false}
            onClick={this.onMapClicked}
            role="application"

          >
{/*pass an array of markers and map over them  -  As understood  here: https://stackoverflow.com/questions/43859785/how-do-i-display-multiple-markers-with-react-google-maps*/}
            {queryResults.map((place,i) => (
              <Marker
                onClick={this.onMarkerClick}
                onMapClicked={this.onMapClicked}
                name={place.name}
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
              <h4>{this.state.selectedPlace.name}</h4>
                  <h3>{venueAddress}</h3>
                </div>
              </InfoWindow>
          </Map>
        </div>

      </div>

      );
    }
  }

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAA0IrgCP3zn6wb_04IHMk3PWWC6D7gIS8'
})(MapContainer)


//AIzaSyAA0IrgCP3zn6wb_04IHMk3PWWC6D7gIS8



  /*const markers= markers.map(place,i) => {
  const marker  = new google.maps.Marker({
  name: place.name,
                  position: { lat: place.location.lat,
                              lng: place.location.lng
                            }
          })
        }
markers.push(marker);*/
