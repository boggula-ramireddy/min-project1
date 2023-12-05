/* eslint-disable jsx-a11y/control-has-associated-label */
import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoMenu, IoCloseCircle} from 'react-icons/io5'
import './index.css'

class Navbar extends Component {
  state = {showNovbar: false}

  componentDidMount() {
    this.getNavBarDetails()
  }

  getNavBarDetails = () => {}

  onNavbar = () => {
    this.setState(prev => ({showNovbar: !prev.showNovbar}))
  }

  onLogoutButton = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  renderShowNavbar = () => {
    const {match} = this.props
    const {path} = match
    console.log(path)
    const homepage = path === '/' ? 'activePage' : null
    const homeage = path === '/restaurant/:id' ? 'activePage' : null
    const cartPage = path === '/cart' ? 'activePage' : 'non_activePage'
    return (
      <ul className="showNavbar">
        <Link to="/" style={{textDecoration: 'none'}}>
          <li className={`Home_className ${homepage} ${homeage}`}>Home</li>
        </Link>
        <Link to="/cart" style={{textDecoration: 'none'}}>
          <ul className={`cart_className ${cartPage}`}>Cart</ul>
        </Link>
        <button
          className="LogoutButton"
          type="button"
          onClick={this.onLogoutButton}
        >
          Logout
        </button>
      </ul>
    )
  }

  render() {
    const {showNovbar} = this.state
    return (
      <>
        <div className="Navbar-container">
          <div className="Navbar_first_section">
            <Link to="/" style={{textDecoration: 'none'}}>
              <img
                src="https://res.cloudinary.com/dmeefu4lu/image/upload/v1701211655/Frame_274_ihv9fy.png"
                alt="website logo"
                className="Navbar_logo"
              />
            </Link>
            <p className="Navbar_heading">Tasty Kitchens</p>
          </div>
          <button type="button" className="menu_button" onClick={this.onNavbar}>
            <IoMenu className="menu_icon" />
          </button>
          <div className="large_device_container">
            {this.renderShowNavbar()}
          </div>
        </div>
        <div className="small_device_container">
          {showNovbar ? (
            <div className="Main_showNavbar">
              {this.renderShowNavbar()}
              <button
                type="button"
                className="closeButtonInNavbar"
                onClick={this.onNavbar}
              >
                <IoCloseCircle className="close_icons" />
              </button>
            </div>
          ) : null}
        </div>
      </>
    )
  }
}

export default withRouter(Navbar)
