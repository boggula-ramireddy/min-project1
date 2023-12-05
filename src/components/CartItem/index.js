/* eslint-disable react/no-unknown-property */
import {BiRupee} from 'react-icons/bi'
import './index.css'

const CartItem = props => {
  const {cartItemDetails, getCartList, RemoveItem} = props
  const {imageUrl, name, quantity, cost, id} = cartItemDetails

  const incrementCartItemQuantity = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === id) {
        const updatedQuantity = eachItem.quantity + 1
        return {...eachItem, quantity: updatedQuantity}
      }
      return eachItem
    })
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    getCartList()
  }

  const decrementCartItemQuantity = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === id) {
        if (eachItem.quantity > 0) {
          const updatedQuantity = eachItem.quantity - 1
          return {...eachItem, quantity: updatedQuantity}
        }
      }
      return eachItem
    })
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    getCartList()
    RemoveItem(id)
  }

  return (
    <li className="cartItem_container" testid="cartItem">
      <img src={imageUrl} alt="cart" className="cart_img" />
      <div className="cartItem_details_container">
        <h1 className="cartItem_name">{name}</h1>
        <div className="counter_container">
          <button
            testid="decrement-quantity"
            type="button"
            onClick={decrementCartItemQuantity}
            className="counter_button"
          >
            -
          </button>
          <div className="quantity_no" testid="item-quantity">
            {quantity}
          </div>
          <button
            testid="increment-quantity"
            type="button"
            onClick={incrementCartItemQuantity}
            className="counter_button"
          >
            +
          </button>
        </div>
        <p className="crtItem_cost">
          <BiRupee />
          {cost}
        </p>
      </div>
    </li>
  )
}

export default CartItem
