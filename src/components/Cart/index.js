/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BiRupee} from 'react-icons/bi'
import {FaCheckCircle} from 'react-icons/fa'
import Navbar from '../Navbar'
import Footer from '../Footer'
import CartItem from '../CartItem'

import './index.css'

const pageStatus = {
  initial: 'initial',
  sucess: 'sucess',
  purchase: 'purchase',
  empty: 'empty',
}

class Cart extends Component {
  state = {cartList: [], totalAmount: 0, cartPageStatus: pageStatus.initial}

  componentDidMount() {
    this.getCartList()
  }

  getCartList = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []

    console.log(true)
    if (cartData.length === 0) {
      this.setState({
        cartPageStatus: pageStatus.empty,
      })
      console.log(true)
    } else {
      this.setState({
        cartPageStatus: pageStatus.sucess,
      })
      this.setState({cartList: cartData})
      const amountList = cartData.map(each => each.quantity * each.cost)
      const totalAmount = amountList.reduce((a, b) => a + b)
      console.log({totalAmount})
      this.setState({totalAmount})
    }
  }

  placeOrder = () => {
    this.setState({
      cartPageStatus: pageStatus.purchase,
    })
    localStorage.clear('cartData')
  }

  RemoveItem = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const updatedCartData = cartData.filter(eachItem => eachItem.quantity > 0)
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.getCartList()
  }

  cartEmptyView = () => (
    <div className="empty_container">
      <img
        src="https://res.cloudinary.com/dmeefu4lu/image/upload/v1701503419/cooking_1_y5f1c5.png"
        alt="empty cart"
        className="emptyImg_className"
      />
      <h1 className="empty-heading">No Order Yet!</h1>
      <p className="empty_des">
        Your cart is empty. Add something from the menu.
      </p>
      <Link to="/" style={{textDecoration: 'none'}}>
        <button type="button" className="orderNow_button">
          Order Now
        </button>
      </Link>
    </div>
  )

  renderCartItem = () => {
    const {cartList} = this.state
    return (
      <>
        <ul className="ul_list_className">
          <div className="item_display">
            <p>item</p>
            <p>Quantity</p>
            <p>Price</p>
          </div>
          {cartList.map(each => (
            <CartItem
              cartItemDetails={each}
              key={each.id}
              getCartList={this.getCartList}
              RemoveItem={this.RemoveItem}
            />
          ))}
        </ul>
      </>
    )
  }

  renderTotalAmount = () => {
    const {totalAmount} = this.state
    return (
      <div className="order_container">
        <h1 className="oreder_total_heading">Order Total:</h1>
        <div>
          <p className="oreder_total_price" testid="total-price">
            <BiRupee />
            {totalAmount}
          </p>
          <button
            type="button"
            className="place_order_button"
            onClick={this.placeOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    )
  }

  renderSucessful = () => (
    <>
      <div className="cart_container">
        {this.renderCartItem()}
        <hr className="hr-line" />
        {this.renderTotalAmount()}
      </div>
      <Footer />
    </>
  )

  renderPurchace = () => (
    <div className="purchae_container">
      <FaCheckCircle className="Successful_img" />
      <h1 className="pay_heading">Payment Successful</h1>
      <p className="pay_des">
        Thank you for ordering Your payment is successfully completed.
      </p>
      <Link to="/" style={{textDecoration: 'none'}}>
        <button type="button" className="home_button">
          Go To Home Page
        </button>
      </Link>
    </div>
  )

  renderStatus = () => {
    const {cartPageStatus} = this.state
    console.log({cartPageStatus})
    switch (cartPageStatus) {
      case pageStatus.sucess:
        return this.renderSucessful()
      case pageStatus.empty:
        return this.cartEmptyView()
      case pageStatus.purchase:
        return this.renderPurchace()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Navbar />
        {this.renderStatus()}
      </>
    )
  }
}

export default Cart
