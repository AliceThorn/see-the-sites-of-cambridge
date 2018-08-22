import React, {Component} from 'react'


class VenueList extends Component {

  render(){

const { query, venues, queryResults} = this.props
    return(
      <div>
      /*As understood from udacity course notes - creates a list of searche places*/
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
      <div>
      queryResults.length !== venues.length && (
                   <div className="venues-list">
                      <span>Now showing {queryResults.length} of {venues.length} total</span>
                      <button className="button" onClick={this.props.clearQuery}>Show All</button>
                    </div>
                  )
                    <ul className="venue-list">
                      {queryResults.map((item,i) => (
                        <li key={i} className="venue-list-item">
                            <div className="venue-details">
                                <p onClick={this.onListClick}>{item.venue.name}</p>
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

export default VenueList
