import {withRouter} from 'react-router-dom'
import NotFoundViewImg from '../../Home/resources/NotFoundViewImg.png'

import './index.css' // Import the CSS file

const NotFoundView = props => {
  const gotoBackPage = () => {
    const {history} = props
    history.goBack()
  }

  return (
    <div className="NotFoundViewContainer">
      <img src={NotFoundViewImg} alt="not found" className="NotFoundViewLogo" />
      <h1 className="Heading">PAGE NOT FOUND</h1>
      <p className="Text">
        We are sorry, the page you requested could not be found. Please go back
        to home.
      </p>
      <button type="button" onClick={gotoBackPage} className="GoBackButton">
        Go Back
      </button>
    </div>
  )
}

export default withRouter(NotFoundView)
