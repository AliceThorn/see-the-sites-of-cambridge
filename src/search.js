import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'
//import { InfoWindow } from 'google-maps-react';


class Search extends Component {
  state = {
    query:'',
    queryResults:[]

  }



  updateQuery = (query) => {
    this.setState({ query: query });
    console.log(query)
  }


  clearQuery = () => {
     this.setState({ query: '' })
     this.setState({ queryResult: this.props.places})
   }


   render() {
const { query} = this.state
     const { places} = this.props


     let queryResults
     if (query) {
       const match = new RegExp(escapeRegExp(query), 'i')
      queryResults = places.filter((place) => match.test(place.title))
     } else {
       queryResults = places
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
                   onChange={(event) => this.props.updateQuery(event.target.value)} />
          </div>
        </div>
  {/*<button className='button'>Search</button>


     <div className="select-location-type">
       <h4>...or Click Below to Choose</h4>
       <div className="map-select-wrapper">
       <select value={place.type} onChange={(event) => this.selectLocation(this.state.places, event.target.value)}>
         <option value="museum">Museums</option>
         <option value="greenSpaces">Green Spaces</option>
         <option value="shopping">Shopping</option>
         <option value="transport">Transport</option>
         <option value="emergency">Emergency</option>
       </select>
       </div>
      </div>
  */}
  {/*As understood from google-maps-react npm documentation - opens an info window on marker click*/}

{/*As understood from udacity course notes - creates a list of searche places*/}
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

          )
          }
          }
export default Search;


/*fetch('https://api.foursquare.com/v2/venues/explore?client_id=V0PCNSF1AQYCMV3VFHGTZIJXUSUL4ZNO3CRQFW2QDQQTOW1B&client_secret=BBRX55NXSA45AATXDQECBVXUQVQUVWF0RVKDLACKZQVGGPB1&v=20180323&limit=1&ll=40.7243,-74.0018&query=coffee')
    .then(function() {
        // Code for handling API response
    })
    .catch(function() {
        // Code for handling errors
    });*/
