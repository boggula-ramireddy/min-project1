/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {IoIosStar} from 'react-icons/io'
import {BiRupee} from 'react-icons/bi'
import Navbar from '../Navbar'
import FoodCard from '../FoodCard'
import Footer from '../Footer'

import './index.css'

const restaurantsApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestarantPage extends Component {
  state = {
    HostelDetails: [],
    foodList: [],
    footerLoader: false,
    pageStatus: restaurantsApiStatusConstants.initial,
  }

  componentDidMount() {
    this.HostelDetails()
  }

  HostelDetails = async () => {
    this.setState({pageStatus: restaurantsApiStatusConstants.inProgress})
    const {match} = this.props
    console.log(match)
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const restarentDetails = {
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        imageUrl: data.image_url,
        id: data.id,
        location: data.location,
        name: data.name,
        opensAt: data.opens_at,
        rating: data.rating,
        itemsCount: data.items_count,
        reviewsCount: data.reviews_count,
      }

      const foodItem = data.food_items.map(each => ({
        cost: each.cost,
        foodType: each.food_type,
        imageUrl: each.image_url,
        name: each.name,
        rating: each.rating,
        id: each.id,
      }))

      this.setState({
        HostelDetails: restarentDetails,
        foodList: foodItem,
        pageStatus: restaurantsApiStatusConstants.success,
        footerLoader: true,
      })
    } else {
      this.setState({pageStatus: restaurantsApiStatusConstants.failure})
    }
  }

  renderFoodItems = () => {
    const {foodList} = this.state
    return (
      <ul className="foodItems_container" testid="foodItem">
        {foodList.map(each => (
          <FoodCard key={each.id} itemDetails={each} />
        ))}
      </ul>
    )
  }

  restaurantsDisplayLoading = () => (
    <div testid="restaurant-details-loader" className="loader_container">
      <Loader type="TailSpin" color="#f7931e" height="50" width="50" />
    </div>
  )

  renderSuccess = () => {
    const {HostelDetails} = this.state
    const {
      costForTwo,
      cuisine,
      imageUrl,
      location,
      name,
      rating,
      reviewsCount,
    } = HostelDetails
    console.log(location)

    return (
      <>
        <div className="main_specific_page_container">
          <div className="main_hotel_image">
            <img src={imageUrl} alt="restaurant" className="hotel_img" />
            <div className="hotel_name_container">
              <h1 className="hotelName">{name}</h1>
              <p className="hotel_cuisine">{cuisine}</p>
              <p className="hotel_cuisine">{location}</p>
              <div className="ratings_container">
                <div className="rating_review_container">
                  <p className="raing_name">
                    <IoIosStar className="react_iconStar" />
                    {rating}
                  </p>
                  <p className="hotel_cuisine">{reviewsCount}+Rating</p>
                </div>
                <hr />
                <div className="left_container">
                  <p className="raing_name">
                    <BiRupee className="react_iconStar" />
                    {costForTwo}
                  </p>
                  <p className="hotel_cuisine">cost for two</p>
                </div>
              </div>
            </div>
          </div>
          {this.renderFoodItems()}
        </div>
      </>
    )
  }

  onRenderDisplayRestaurantDetails = () => {
    const {pageStatus} = this.state

    switch (pageStatus) {
      case restaurantsApiStatusConstants.success:
        return this.renderSuccess()
      case restaurantsApiStatusConstants.inProgress:
        return this.restaurantsDisplayLoading()
      case restaurantsApiStatusConstants.failure:
        return null
      default:
        return null
    }
  }

  render() {
    const {footerLoader} = this.state
    return (
      <>
        <Navbar />
        {this.onRenderDisplayRestaurantDetails()}
        {footerLoader && <Footer />}
      </>
    )
  }
}

export default RestarantPage
