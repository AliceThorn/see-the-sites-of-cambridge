import React, {Component} from 'react'
import escapeRegExp from 'escape-string-regexp'

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


export class MapContainer extends Component {
state = {
  showingInfoWindow: false,
  activeMarker: {},
  selectedPlace: {},
  queryResults:[]
  };


  /*const markers= markers.map(place,i) => {
  const marker  = new google.maps.Marker({
  title: place.title,
                  position: { lat: place.location.lat,
                              lng: place.location.lng
                            }
          })
        }
markers.push(marker);*/




//As understood from google-maps-react npm documentation - iopens an info window on marker click
      onMarkerClick = (props, place, e) =>
        this.setState({
          selectedPlace: props,
          activeMarker: place,
          showingInfoWindow: true,
        });

//As understood from google-maps-react npm documentation
        onMapClicked = (props) => {
            if (this.state.showingInfoWindow) {
              this.setState({
                showingInfoWindow: false,
                activeMarker: null
              })
            }
          }

render() {

const { places, query} = this.props

let queryResults
  if (query) {
    const match = new RegExp(escapeRegExp(query), 'i')
    queryResults = places.filter((place) => match.test(place.title))
    } else {
      queryResults = places
  }

// Bounds - As understood from google-maps-react npm documentation
const bounds = new this.props.google.maps.LatLngBounds();
/*for (var i = 0; i < points.length; i++) {bounds.extend(points[i]);}*/
places.map((place)=> bounds.extend({ lat: place.location.lat, lng: place.location.lng }));

    return (
      <div className ="map-container">
      <div className="search-box">
         <div className="choose-location-type">
           <h3>Sights of Cambridge City</h3>
          <div className="map-input-wrapper">
             <input className="search-bar"
                    type="text"
                    role="search"
                    aria-label="Search"
                    placeholder="Type in a place of Interest"
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
                  <li key={i} className="place-list-item" >
                      <div className="place-details">
                          <h3>{queryResult.title}</h3>
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
                title={place.title}
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
                  <h4>{this.state.selectedPlace.title}</h4>
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
