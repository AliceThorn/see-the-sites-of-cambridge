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

// Bounds - As understood from google-maps-react npm documentation and rewritten in es6
const bounds = new this.props.google.maps.LatLngBounds();
venues.map((item)=> bounds.extend({ lat: item.venue.location.lat, lng: item.venue.location.lng }));

  return (
    <div className ="map-container">
      <div className="search-box">
         <div className="choose-location-type">

           <h3>Cambridge City</h3>
          <div className="map-input-wrapper">
             <input className="search-bar"
                    type="text"
                    role="search"
                    aria-label="Search"
                    sholder="Search Here"
                    value={ query }
                    onChange={(event) => this.props.updateQuery(event.target.value)} />
           </div>
         </div>
{/*As understood from udacity course notes - creates a list of searche places*/}
           {queryResults.length !== venues.length && (
             <div className="venues-list">
                <span>Now showing {queryResults.length} of {venues.length} total</span>
                <button className="button" onClick={this.props.clearQuery}>Show All</button>
              </div>
            )}
              <ul className="venue-list">
                {queryResults.map((item,i) => (
                  <li key={i} className="venue-list-item">
                      <div className="venue-details">
                          <p onClick={this.props.onMarkerClick}
                          >{item.venue.name}</p>
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
            //onClick={this.onMapClicked}
            role="application"
            onReady={this.props.getVenues}
          >
          {/*pass an array of markers and map over them  -  As understood  here: https://stackoverflow.com/questions/43859785/how-do-i-display-multiple-markers-with-react-google-maps*/}
            {queryResults.map((item,i) => (
              <Marker
                onClick={this.props.onMarkerClick}
                onMapClicked={this.props.onMapClicked}
                name={item.venue.name}
                position={{ lat: item.venue.location.lat, lng: item.venue.location.lng }}
                key={i}
                animation= {this.props.google.maps.Animation.DROP}
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
