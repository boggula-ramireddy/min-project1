/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import {IoIosStar} from 'react-icons/io'
import './index.css'

class FoodCard extends Component {
  state = {addbutton: true, quantity: 0}

  componentDidMount() {
    this.getCartList()
  }

  getCartList = () => {
    const {itemDetails} = this.props
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    const cartItem = cartData.filter(each => each.id === itemDetails.id)
    if (cartItem.length !== 0) {
      this.setState(prev => ({addbutton: !prev.addbutton}))
      this.setState({quantity: cartItem[0].quantity})
    }
  }

  findTheCartItemInList = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const updatedCartData = cartData.filter(eachItem => eachItem.quantity > 0)
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
  }

  incrementCartItemQuantity = () => {
    this.setState(prev => ({quantity: prev.quantity + 1}))
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const {itemDetails} = this.props
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === itemDetails.id) {
        const updatedQuantity = eachItem.quantity + 1
        return {...eachItem, quantity: updatedQuantity}
      }
      return eachItem
    })
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
  }

  decrementCartItemQuantity = () => {
    this.setState(prev => ({quantity: prev.quantity - 1}))
    const {quantity} = this.state
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const {itemDetails} = this.props
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === itemDetails.id) {
        if (eachItem.quantity > 0) {
          const updatedQuantity = eachItem.quantity - 1
          this.setState(prev => ({quantity: prev.quantity - 1}))
          return {...eachItem, quantity: updatedQuantity}
        }
      }
      return eachItem
    })
    if (quantity === 1) {
      this.setState(prev => ({addbutton: !prev.addbutton}))
    }
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.findTheCartItemInList()
  }

  onAddToCart = () => {
    this.setState(prev => ({quantity: prev.quantity + 1}))
    this.setState(prev => ({addbutton: !prev.addbutton}))
    const {itemDetails} = this.props
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    const cartItem = {...itemDetails, quantity: 1}
    cartData.push(cartItem)
    localStorage.setItem('cartData', JSON.stringify(cartData))
  }

  renderQuantity = () => {
    const {quantity} = this.state
    const {itemDetails} = this.props
    console.log({quantity})
    return (
      <>
        <div className="counter_container" id={itemDetails.id}>
          <button
            testid="decrement-count"
            type="button"
            onClick={this.decrementCartItemQuantity}
            className="counter_button"
          >
            -
          </button>
          <button type="button" className="count-value" testid="active-count">
            {quantity}
          </button>
          <button
            testid="increment-count"
            type="button"
            onClick={this.incrementCartItemQuantity}
            className="counter_button"
          >
            +
          </button>
        </div>
      </>
    )
  }

  render() {
    const {addbutton} = this.state
    const {itemDetails} = this.props
    const {cost, imageUrl, name, rating} = itemDetails
    return (
      <li className="foodItem_container" testid="foodItem">
        <img src={imageUrl} alt="foodItem" className="foodItem_img" />
        <div className="foodItem_name_container">
          <h1 className="foodItem_heading">{name}</h1>
          <p className="foodItem_cost">
            <BiRupee className="react_Rupee" />
            {cost}
          </p>
          <p className="foodItem_rating">
            <IoIosStar className="react_star" />
            {rating}
          </p>
          {addbutton ? (
            <button
              type="button"
              className="add_className"
              onClick={this.onAddToCart}
            >
              Add
            </button>
          ) : (
            this.renderQuantity()
          )}
        </div>
      </li>
    )
  }
}

export default FoodCard
