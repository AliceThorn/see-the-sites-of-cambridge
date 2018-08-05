import React, {Component} from 'react'

import './App.css'

import MapContainer from './MapContainer'

 state = {
locations: []

        }

class MapApp extends Component {

  render(){
    return(
<div>
<MapContainer locations={this.state.locations} />
)}/>
</div>
)
}
}

export default MapApp
