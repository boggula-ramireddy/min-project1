import {Link} from 'react-router-dom'

import './index.css'

const notFoundUrl =
  'https://res.cloudinary.com/dppqkea7f/image/upload/v1625830262/NotFound_kpncbm.png'
const NotFound = () => (
  <div className="notFound_page">
    <img src={notFoundUrl} alt="not found" className="notFound_img" />
    <h1 className="notFound_heading">Page Not Found</h1>
    <p className="notFound_para">
      we are sorry, the page you requested could not be found. Please go back to
      the homepage
    </p>
    <Link to="/" style={{textDecoration: 'none'}}>
      <button type="button" className="notFound_button">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
