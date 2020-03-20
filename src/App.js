import React from 'react';
import { PropTypes } from 'react'
import { BrowserRouter, Route, Switch, Link, Redirect, withRouter } from 'react-router-dom'
import SearchBar from './components/SearchBar'
import FoodList from './components/FoodList'
import SpecFoods from './components/SpecFoods'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAppleAlt, faHeartbeat, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { REACT_APP_API_KEY } from './config'

import './App.css';

config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
library.add(faHeartbeat, faAppleAlt, faArrowLeft)


class App extends React.Component {
  constructor() {
    super()
    this.handleSearchTerm = this.handleSearchTerm.bind(this)

    this.state = {
      searchTerm: '',
      foods: [],
      urlNumber: [],
      specFood: [],
      loading: false,
      mounted: false
    }

}

  handleSearchTerm(value) {
    this.setState({
      searchTerm: value,
    })
  }

  FoodListApi = () => {
    const foodListUrl = `https://api.nal.usda.gov/fdc/v1/search?api_key=${REACT_APP_API_KEY}&generalSearchInput=${this.state.searchTerm}`
    fetch(foodListUrl)
    .then(res => {
      return res.json()})
    .then(data => {
      this.setState({
        foods: data.foods,

      })
    })
    .catch(err => {
      console.log(err)
    })
    if (this.state.loading === true) return <div><h1 className='status'>Error</h1></div>
  }

  componentDidUpdate(prevProps, prevState) {

    if (prevState.searchTerm !== this.state.searchTerm) {
      this.FoodListApi() 
      this.setState({ mounted: true })  
    }
  }

  



  render() {
    const mountID = this.state.mounted ? "mounted" : "not-mounted"
    return (
      <div className={mountID}>
    
      <BrowserRouter>
      <div className="container" >
      <div className="top-container">
      <h1><FontAwesomeIcon className="icon" id="homepage-icon" 
      icon={faHeartbeat} /></h1> <h1>Islington Education Nutrition Search</h1>

      </div>
      <div className="spec-food-container">
      <Route
        exact path = "/"
        render={() => <div> 
          <SearchBar id="search-bar" handleSearchTerm={this.handleSearchTerm} clearList={this.clearList} /> 
          { this.state.mounted ? <FoodList searchResults={this.state.foods} getNumber={this.getNumber}/> : ""}
          </div> }
          />
  
      <Route
        exact path = "/:food_id"
        render={({match}) => <SpecFoods specFoods={this.state.specFood} match={match} />}
      />
   

      </div>
      </div>
 
      </BrowserRouter>
      </div>
    )

  } 
}

export default App;
