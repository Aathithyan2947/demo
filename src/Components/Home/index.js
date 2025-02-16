import {Component} from 'react'
import cookie from 'js-cookie'
import LoginPageLogo from './resources/LoginPageLogo.png'
import Header from '../Header'
import './index.css'

class Home extends Component {
  state = {username: '', isUsernameInvalid: false}

  onChangeUsername = event => {
    if (event.key === 'Enter') {
      this.usernameAuthentication()
    } else {
      this.setState({username: event.target.value, isUsernameInvalid: false})
    }
  }

  onSuccessAuthenticate = userData => {
    const {username} = this.state
    const {history} = this.props
    const {id} = userData
    cookie.set('awt_token', id)
    history.replace(`/${username}/profile`)
  }

  onFailureAuthenticate = error => {
    this.setState({isUsernameInvalid: error, username: ''})
  }

  usernameAuthentication = async () => {
    const {username} = this.state
    const url = `https://api.github.com/users/${username}`

    const response = await fetch(url)

    if (response.ok) {
      const userData = await response.json()
      this.onSuccessAuthenticate(userData)
    } else {
      this.onFailureAuthenticate(true)
    }
  }

  render() {
    const {isUsernameInvalid} = this.state
    return (
      <div className="HomeContainer">
        <Header />
        <h1 className="HomeHeading">GitHub Profile Visualizer</h1>
        <div>
          <input
            className={`TextInput ${isUsernameInvalid ? 'invalid' : ''}`}
            placeholder="Enter GitHub username"
            type="text"
            name="text"
            onKeyUp={this.onChangeUsername}
          />
        </div>
        <p className="ErrorMessage">
          {isUsernameInvalid && 'Enter a valid GitHub username'}
        </p>
        <img
          className="HomeImage"
          src={LoginPageLogo}
          alt="gitHub profile visualizer home page"
        />
      </div>
    )
  }
}

export default Home
