import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'


class Search extends Component {
  state = {
    places:[
    {title: 'The Fitzwilliam Museum', location: {lat: 52.199869, lng: 0.119986}},
    {title: 'Mathematical Bridge', location: {lat: 52.202182, lng: 0.115019}},
    {title: 'Addenbrookes Hospital', location: {lat: 52.17595, lng: 0.14045}},
    {title: 'The Grand Arcade', location: {lat: 52.204162, lng: 0.122344}},
    {title: 'Kings College Chapel', location: {lat: 52.204797, lng: 0.116566}},
    {title: 'Cambridge University Botanical Gardens', location: {lat: 52.193495, lng: 0.12576}}
  ],
    query:'',
  queryResults:[]
  }

  updateQuery = (query) => {
    this.setState({ query: query });
    console.log(query)
  }




  clearQuery = () => {
     this.setState({ query: '' })
   }


   render() {
     const { places } = this.props
     const { query } = this.state


     let queryResults
     if (query) {
       const match = new RegExp(escapeRegExp(query), 'i')
      queryResults = this.state.places.filter((place) => match.test(place.title))
     } else {
       queryResults = places
     }

   return(
     <div>
        <div className="choose-location-type">
          <h3>Where would you like to go today?</h3>
          <div className="map-input-wrapper">
            <input className="search-bar"
                   type="text"
                   role="search"
                   placeholder="Where would you like to go today?"
                   value={ query }
                   onChange={(event) => this.updateQuery(event.target.value)} />
          </div>
  <button className='button'>Search</button>
          <ul className='place-list'>
              {this.state.places.map((place) => (
              <li key={place.id} className='place-list-item'>
                <div className='place-details'>
                  <h3>{place.title}</h3>
                  <hr></hr>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
          )
          }
          }
export default Search;
