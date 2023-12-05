import {
  FaFacebookSquare,
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer_container">
      <div className="First_section">
        <img
          src="https://res.cloudinary.com/dmeefu4lu/image/upload/v1701302924/Frame_275_oa1uup.png"
          alt="website-footer-logo"
          className="footer_img"
        />
        <h1 className="footer_heading">Tasty Kitchens </h1>
      </div>
      <p className="footer_description">
        The only thing we are serious about is food. <br />
        Contact us on
      </p>
      <div className="socialMedia_icons">
        <FaPinterestSquare
          testid="pintrest-social-icon"
          className="social_icon"
        />
        <FaInstagram testid="instagram-social-icon" />
        <FaFacebookSquare
          testid="facebook-social-icon"
          className="social_icon"
        />
        <FaTwitter testid="twitter-social-icon" />
      </div>
    </div>
  )
}
