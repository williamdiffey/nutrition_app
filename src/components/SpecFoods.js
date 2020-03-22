import React from 'react'
import SpecFood from './SpecFood'
import { Link } from 'react-router-dom'
import '../components/specfood.css'
import '../components/table.css'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { REACT_APP_API_KEY } from '../config'
import NoData from './NoData'

export default class SpecFoods extends React.Component {
   
  constructor() {
    super()
    this.state = ({
      loaded: false,
      noData: false
    })
  }
    
  async componentDidMount() {
    const response = await fetch(`https://api.nal.usda.gov/fdc/v1/${this.props.match.params.food_id}?api_key=${REACT_APP_API_KEY}`)
    const json = await response.json()

    if (json.foodNutrients.length > 0) {
    this.setState({ food: json, loaded: true })
    } else {

      this.setState({noData: true})
    }
  }


 

  
  render() {
    if (this.state.noData === true) return <NoData />
    if (this.state.loaded === false) return <div><h1 className='status'>loading</h1></div>
    return (
      <div className="spec-foods">
      <div className="back-button">
        <Link to={`/`} className="link"><h2><FontAwesomeIcon className="icon" id="arrow-icon" icon={faArrowLeft} />Search New Food</h2></Link>
      </div> 
      <div className="food-info">
        <h3 className='food-name'>You searched for: {this.state.food.description}</h3> 
        <h2 classNAme='food-title'>{this.state.food.brandOwner}</h2>
      </div> 
        <SpecFood food={this.state.food}/>
      </div>
      
    )
    
  }
}



