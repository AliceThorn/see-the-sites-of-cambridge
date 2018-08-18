import React, {Component} from 'react'
import MapContainer from './MapContainer'

class Data extends Component {

  state = {

  isLoading:false,
  error:null,
  venues:[]
};

  //As understood from notes here: https://www.robinwieruch.de/react-fetching-data/
  componentDidMount(){
    this.setState({ isLoading: true });



    fetch('https://api.foursquare.com/v2/venues/explore?client_id=V0PCNSF1AQYCMV3VFHGTZIJXUSUL4ZNO3CRQFW2QDQQTOW1B&client_secret=BBRX55NXSA45AATXDQECBVXUQVQUVWF0RVKDLACKZQVGGPB1&v=20180323&limit=500&ll=52.199869,0.119986&radius=1000&query=museum')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(response => this.setState({ venues: response.venues, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }




      /*fetch('https://api.foursquare.com/v2/venues/explore?client_id=V0PCNSF1AQYCMV3VFHGTZIJXUSUL4ZNO3CRQFW2QDQQTOW1B&client_secret=BBRX55NXSA45AATXDQECBVXUQVQUVWF0RVKDLACKZQVGGPB1&v=20180323&limit=500&ll=52.199869,0.119986&radius=1000&query=museum', {
      method: 'GET'
    }).then(response => {
      if (response.ok) {
         return response.json();
       } else {
         throw new Error('Something went wrong ...');
       }
     })
     .then(response => response.json())
         .then(data => this.setState({ venues: data.venues, isLoading: false }));*/



  /*
    this.setState({isLoading:true});
    fetch('https://api.foursquare.com/v2/venues/explore?client_id=V0PCNSF1AQYCMV3VFHGTZIJXUSUL4ZNO3CRQFW2QDQQTOW1B&client_secret=BBRX55NXSA45AATXDQECBVXUQVQUVWF0RVKDLACKZQVGGPB1&v=20180323&limit=500&ll=52.199869,0.119986&query=places')
    .then(response => {
       if (response.ok) {
         return response.json();
       } else {
         throw new Error('Something went wrong ...');
       }
     })
     .then(data =>
          sites = data.results.map((site)=>{
            return(
              <div key ={site.results}>
              <div>
            )
          })
       this.setState({ sites, isLoading }))
     .catch(error => this.setState({ error, isLoading }));
 }*/

  render(){

//As understood from notes here: https://www.robinwieruch.de/react-fetching-data/
    const { isLoading, error } = this.state;

        if (error) {
          return <p>{error.message}</p>;
        }

        if (isLoading) {
          return <p>Loading ...</p>;
        }


/*const venueList = this.state.venues.map(item =>
    {item.venue.name}
  );*/

    return(

        <div>
          <MapContainer
          venues = {this.state.venues}
          />
        </div>

    )
  }
}

export default Data
