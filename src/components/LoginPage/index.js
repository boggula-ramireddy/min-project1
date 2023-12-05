import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginPage extends Component {
  state = {password: '', username: '', showSubmitError: false, errorMsg: 'ram'}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {showSubmitError, errorMsg} = this.state
    return (
      <div className="Main_small_container">
        <div className="small_device_container">
          <img
            src="https://res.cloudinary.com/dmeefu4lu/image/upload/v1701209333/Rectangle_1457_1_zqq8xk.png"
            alt="website logo"
            className="websitelogo"
          />
        </div>
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://res.cloudinary.com/dmeefu4lu/image/upload/v1701211655/Frame_274_ihv9fy.png"
            alt="website logo"
            className="mini_website_logo"
          />
          <h1 className="img_heading">Tasty Kitchens</h1>
          <h1 className="login_heading">Login</h1>
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          {showSubmitError && <p className="error-message">{errorMsg}</p>}
          <div className="button_container">
            <button type="submit" className="login-button">
              Login
            </button>
          </div>
        </form>
        <div className="large_device_container_img">
          <img
            src="https://res.cloudinary.com/dmeefu4lu/image/upload/v1701209707/Rectangle_1456_1_htlco4.png"
            alt="website logo"
            className="large_device_img"
          />
        </div>
      </div>
    )
  }
}

export default LoginPage
