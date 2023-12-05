/* eslint-disable react/no-unknown-property */
import {IoIosStar} from 'react-icons/io'
import './index.css'

const RestarantItem = props => {
  const {itemDetails} = props
  const {imageUrl, name, rating, menuType, totalReviews, cuisine} = itemDetails
  return (
    <li testid="restaurant-item" className="restarant-item">
      <img src={imageUrl} alt="restaurant" className="restarant_img" />
      <div className="name_section">
        <h1 className="restarant_heading">{name}</h1>
        <p>{cuisine}</p>
        <p className="menu_type">{menuType}</p>
        <div className="rating">
          <IoIosStar className="star_rating" />
          {rating}
          <span className="reviews_container">({totalReviews} ratings)</span>
        </div>
      </div>
    </li>
  )
}

export default RestarantItem
