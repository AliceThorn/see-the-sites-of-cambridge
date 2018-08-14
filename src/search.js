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
     this.setState({ queryResult: this.state.places})
   }


   render() {
     const { query, places } = this.state


     let queryResults
     if (query) {
       const match = new RegExp(escapeRegExp(query), 'i')
      queryResults = this.state.places.filter((place) => match.test(place.title))
     } else {
       queryResults = this.state.places
     }

   return(
     <div>
        <div className="choose-location-type">
          <h3>Sights of Cambridge City</h3>
          <div className="map-input-wrapper">
            <input className="search-bar"
                   type="text"
                   role="search"
                   placeholder="Type in a place of Interest"
                   value={ query }
                   onChange={(event) => this.updateQuery(event.target.value)} />
          </div>
  {/*<button className='button'>Search</button>*/}

  {queryResults.length !== places.length && (
          <div className='places-list'>
            <span>Now showing {queryResults.length} of {places.length} total</span>
            <button className='button' onClick={this.clearQuery}>Show All</button>
          </div>
        )}
          <ul className='place-list'>
              {queryResults.map((queryResult,i) => (
              <li key={i} className='place-list-item'>
                <div className='place-details'>
                  <h3>{queryResult.title}</h3>
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
