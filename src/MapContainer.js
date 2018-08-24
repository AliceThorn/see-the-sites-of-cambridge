import React, {Component} from 'react'
import escapeRegExp from 'escape-string-regexp'

import {Marker, InfoWindow, Map, GoogleApiWrapper} from 'google-maps-react';


export class MapContainer extends Component {

render() {

const { query, venues} = this.props
//Regular Expressions used as explained in udacity course notes
  let queryResults
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      queryResults = venues.filter((item) => match.test(item.venue.name))
      } else {
        queryResults = venues
    }

// Bounds - As understood from google-maps-react npm documentation and my function created
const bounds = new this.props.google.maps.LatLngBounds();
venues.map((item)=> bounds.extend({ lat: item.venue.location.lat, lng: item.venue.location.lng }));


  return (
    <div className ="map-container">
      <div id="searchbox" className="sideBar">
         <div className="choose-location-type">
           <h3 tabIndex="0" aria-label="Cambridge Museums">Cambridge Museums</h3>
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
{/*As understood from udacity course notes - creates a list of searched venues*/}
           {queryResults.length !== venues.length && (
             <div className="venues-list">
                <span>Now showing {queryResults.length} of {venues.length} total</span>
                <button className="button" onClick={this.props.clearQuery}>Show All</button>
              </div>
            )}
            <ul className="venue-list">
              {queryResults.map((item, i) => (
                <li
                  key={i}
                  onClick={this.props.onListItemClick}
                  className="venue-list-item"
                >
                  <div className="venue-details">
                    <div>
                      <h4 className="list-name">{item.venue.name}</h4>
                      <hr />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
      <div className="map" aria-label="google-maps-area" role="application">
          <Map
            google={this.props.google}
            initialCenter={{
              lat:52.2053,
              lng: 0.1218
            }}
            bounds={bounds}
            zoom={15}
            mapTypeControl={false}
            //onClick={this.onMapClicked}
            role="application"
            onClick={this.props.onMapClicked}
            onReady={this.props.getVenues}
          >
          {/*pass an array of markers and map over them  -  As understood  here: https://stackoverflow.com/questions/43859785/how-do-i-display-multiple-markers-with-react-google-maps*/}
          {queryResults.map((item, i) => (
              <Marker
              //adding a reference to a react element as understood from here: https://reactjs.org/docs/refs-and-the-dom.html
                ref={this.props.createMarker}
                onClick={this.props.onMarkerClick}
                name={item.venue.name}
                title={item.venue.name}
                address={item.venue.location.formattedAddress.join(", ")}
                position={{
                  lat: item.venue.location.lat,
                  lng: item.venue.location.lng
                }}
                key={i}
                //Note: this is as explained and understood at: https://stackoverflow.com/questions/51160344/animate-marker-when-click-on-a-list-item-google-maps-react
                //animates the marker on click
                animation={
                  this.props.activeMarker
                    ? this.props.activeMarker.name === item.venue.name
                      ? "1"
                      : "0"
                    : "0"
                }
              />
            ))}
            {/* As explained in google-maps-react npm documentation*/}
            <InfoWindow
              marker={this.props.activeMarker}
              onOpen={this.windowHasOpened}
              onClose={this.windowHasClosed}
              visible={this.props.showingInfoWindow}
            >
              <div>
                <h4>{this.props.selectedVenue.name}</h4>
                <h4>{this.props.selectedVenue.address}</h4>
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
