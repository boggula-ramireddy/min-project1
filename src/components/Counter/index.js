/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/control-has-associated-label */
import {Component} from 'react'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'

import './index.css'

const totalPages = 4

class Counter extends Component {
  state = {currentPage: 1}

  onIncrement = () => {
    const {getActivePageFromCounter} = this.props
    const {currentPage} = this.state
    if (currentPage < totalPages) {
      this.setState(
        pre => ({currentPage: pre.currentPage + 1}),
        getActivePageFromCounter(currentPage + 1),
      )
    }
  }

  onDecrement = () => {
    const {getActivePageFromCounter} = this.props
    const {currentPage} = this.state
    if (currentPage > 1) {
      this.setState(
        pre => ({currentPage: pre.currentPage - 1}),
        getActivePageFromCounter(currentPage - 1),
      )
    }
    console.log({currentPage})
  }

  render() {
    const {currentPage} = this.state
    return (
      <div className="counter-class">
        <button
          type="button"
          onClick={this.onDecrement}
          className="react_icon_button"
          testid="pagination-left-button"
        >
          <IoIosArrowBack className="react_icon" />
        </button>
        <div className="pages-class">
          <span testid="active-page-number">{currentPage}</span> of {totalPages}
        </div>
        <button
          type="button"
          onClick={this.onIncrement}
          className="react_icon_button"
          testid="pagination-right-button"
        >
          <IoIosArrowForward className="react_icon" />
        </button>
      </div>
    )
  }
}

export default Counter
