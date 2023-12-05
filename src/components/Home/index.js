/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import {MdOutlineSort} from 'react-icons/md'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import './index.css'
import RestarantItem from '../RestarantItem'
import Counter from '../Counter'
import Footer from '../Footer'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const sortByOptions = [
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
]

const carouselApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const restaurantsApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    bannerData: [],
    activeSortId: sortByOptions[0].value,
    activePage: 1,
    LIMIT: 9,
    restarantsList: [],
    carouselApiStatus: carouselApiStatusConstants.initial,
    restaurantApiStatus: restaurantsApiStatusConstants.initial,
    loadFooter: false,
  }

  componentDidMount() {
    this.getBannerSlides()
    this.getrastarentList()
  }

  getBannerSlides = async () => {
    this.setState({
      carouselApiStatus: carouselApiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const fetchedData = data.offers.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
      }))
      this.setState({
        bannerData: fetchedData,
        carouselApiStatus: carouselApiStatusConstants.success,
      })
    }
  }

  getrastarentList = async () => {
    this.setState({
      restaurantApiStatus: restaurantsApiStatusConstants.inProgress,
    })
    const {LIMIT, activeSortId, activePage} = this.state
    const offset = (activePage - 1) * LIMIT
    const jwtToken = Cookies.get('jwt_token')
    const Rurl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}&sort_by_rating=${activeSortId}`
    console.log({Rurl})
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const Rresponse = await fetch(Rurl, options)
    if (Rresponse.ok === true) {
      const Rdata = await Rresponse.json()
      console.log({Rdata})
      const restarentData = Rdata.restaurants.map(each => ({
        costForTwo: each.cost_for_two,
        cuisine: each.cuisine,
        groupByTime: each.group_by_time,
        hasOnlineDelivery: each.has_online_delivery,
        hasTableBooking: each.has_table_booking,
        is_delivering_now: each.is_delivering_now,
        imageUrl: each.image_url,
        id: each.id,
        location: each.location,
        menuType: each.menu_type,
        name: each.name,
        opensAt: each.opens_at,
        rating: each.user_rating.rating,
        ratingColor: each.user_rating.rating_color,
        ratingText: each.user_rating.rating_text,
        totalReviews: each.user_rating.total_reviews,
      }))
      this.setState({
        restarantsList: restarentData,
        restaurantApiStatus: restaurantsApiStatusConstants.success,
        loadFooter: true,
      })
    }
  }

  OnSortedType = e => {
    this.setState({activeSortId: e.target.value}, this.getrastarentList)
  }

  getActivePage = page => {
    this.setState({activePage: page}, this.getrastarentList)
  }

  renderCarouselDisplayLoading = () => (
    <div testid="restaurants-offers-loader" className="banner_loader">
      <Loader type="ThreeDots" color="#f7931e" height="50" width="50" />
    </div>
  )

  renderRestaurantsDisplayLoading = () => (
    <div testid="restaurants-list-loader" className="reatarant_loader">
      <Loader type="TailSpin" color="#f7931e" height="50" width="50" />
    </div>
  )

  renderBannerSlide = () => {
    const settings = {
      dots: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 700,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 2000,
      adaptiveHeight: true,
    }
    const {bannerData} = this.state
    return (
      <ul className="banner_status">
        <Slider {...settings}>
          {bannerData.map(each => (
            <li key={each.id}>
              <img src={each.imageUrl} alt="offer" className="bannerImg" />
            </li>
          ))}
        </Slider>
      </ul>
    )
  }

  onRenderDisplayCarousel = () => {
    const {carouselApiStatus} = this.state

    switch (carouselApiStatus) {
      case carouselApiStatusConstants.success:
        return this.renderBannerSlide()

      case carouselApiStatusConstants.inProgress:
        return this.renderCarouselDisplayLoading()

      default:
        return null
    }
  }

  renderSuccess = () => {
    const {restarantsList} = this.state
    console.log({restarantsList})
    return (
      <>
        <ul className="restaurants_container">
          {restarantsList.map(each => (
            <Link to={`/restaurant/${each.id}`} className="link_className">
              <RestarantItem key={each.id} itemDetails={each} />
            </Link>
          ))}
        </ul>
      </>
    )
  }

  onRenderDisplayRestaurants = () => {
    const {restaurantApiStatus} = this.state

    switch (restaurantApiStatus) {
      case restaurantsApiStatusConstants.success:
        return this.renderSuccess()
      case restaurantsApiStatusConstants.inProgress:
        return this.renderRestaurantsDisplayLoading()
      case restaurantsApiStatusConstants.failure:
        return null
      default:
        return null
    }
  }

  render() {
    const {activeSortId, loadFooter} = this.state
    return (
      <>
        <Navbar />
        {this.onRenderDisplayCarousel()}
        <h1 className="main_heading">Popular Restaurants</h1>
        <div className="sorted_para_container">
          <p className="main_para">
            Select Your favourite restaurant special dish and make your day
            happy...
          </p>
          <div className="sort_container">
            <MdOutlineSort className="sort_icon" />
            <p>
              Sort By
              <select
                name="rating"
                className="sorted_element"
                value={activeSortId}
                onChange={this.OnSortedType}
              >
                {sortByOptions.map(each => (
                  <option value={each.value} className="option_className">
                    {each.displayText}
                  </option>
                ))}
              </select>
            </p>
          </div>
        </div>
        <hr className="hr_line" />
        {this.onRenderDisplayRestaurants()}
        <div className="pagination_container">
          <Counter getActivePageFromCounter={this.getActivePage} />
        </div>
        {loadFooter && <Footer />}
      </>
    )
  }
}

export default Home
