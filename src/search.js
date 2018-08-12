import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'


class Search extends Component {
  state = {
    query:'',
  locationResults:[]
  }

  updateQuery = (query) => {
    this.setState({ query: query });
    console.log(query)
  }

  clearQuery = () => {
     this.setState({ query: '' })
   }


   render() {
     const { places, place } = this.props
     const { query } = this.state

     let locationResults
     if (query) {
       const match = new RegExp(escapeRegExp(query), 'i')
       locationResults = places.filter((place) => match.test(place.title))
     } else {
       locationResults = {places}
     }

   return(
     <div>
        <div className="choose-location-type">
          <h4>Where would you like to go today?</h4>
          <div className="map-input-wrapper">
            <input type="text"
                   role="search"
                   placeholder="Where would you like to go today?"
                   value={ query }
                   onChange={(event) => this.updateQuery(event.target.value)} />
          </div>

          <ol className='place-list'>
            {locationResults.map((place) => (
              <li key={place.id} className='place-list-item'>
                <div className='place-details'>
                  <p>{place.title}</p>
                  <p>{place.location.lat}</p>
                  <p>{place.location.lng}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
          )
          }
          }
export default Search;
