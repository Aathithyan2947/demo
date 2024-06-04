import {Component} from 'react'
import {IoLocationOutline} from 'react-icons/io5'
import {IoMdLink} from 'react-icons/io'
import Header from '../Header'
import FailureView from '../common/FailureView'
import LoadingView from '../common/LoadingView'
import './index.css' // Import CSS file

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfilePage extends Component {
  state = {userData: '', apiStatus: apiStatusConstants.initial}

  componentDidMount = () => {
    this.getUserData()
  }

  onSuccessDataCollected = userData => {
    this.setState({
      userData: {
        avatarUrl: userData.avatar_url,
        name: userData.name,
        username: userData.login,
        bio: userData.bio,
        followers: userData.followers,
        following: userData.following,
        publicRepos: userData.public_repos,
        company: userData.company,
        companyUrl: userData.company_url,
        location: userData.location,
      },
      apiStatus: apiStatusConstants.success,
    })
  }

  onFailureDataCollected = () => {
    this.setState({
      apiStatus: apiStatusConstants.failure,
    })
  }

  getUserData = async () => {
    const {match} = this.props
    const {params} = match
    const {user} = params
    const url = `https://api.github.com/users/${user}`

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const response = await fetch(url)

    if (response.ok) {
      const userData = await response.json()
      this.onSuccessDataCollected(userData)
    } else {
      this.onFailureDataCollected(true)
    }
  }

  renderUserGitInfo = userInfo => {
    const {infoData, infoAbout} = userInfo
    return (
      <li key={infoAbout.toLowerCase()} className="InfoContainer">
        <p className="InfoData">{infoData}</p>
        <p className="InfoAbout">{infoAbout}</p>
      </li>
    )
  }

  renderUserWorkAreaInfo = (userInfo, IconComponent) => {
    const {infoData, infoAbout} = userInfo

    return (
      <li className="InfoContainer" key={infoAbout}>
        <p className="InfoData">{infoData}</p>
        <p className="InfoAbout">
          <IconComponent style={{color: 'white'}} />
          {infoAbout}
        </p>
      </li>
    )
  }

  renderProfileView = () => {
    const {userData} = this.state

    const {
      avatarUrl,
      name,
      username,
      bio,
      followers,
      following,
      publicRepos,
      company,
      companyUrl,
      location,
    } = userData
    return (
      <>
        <img src={avatarUrl} className="UserAvatar" alt="UserAvatar" />
        <h1 className="UserProfileName">{name}</h1>
        <p className="UserName">{username}</p>
        <p className="UserBio">{bio}</p>
        <ul className="UserInfoContainer">
          {this.renderUserGitInfo({
            infoData: followers,
            infoAbout: 'FOLLOWERS',
          })}
          <hr className="Divider" />
          {this.renderUserGitInfo({
            infoData: following,
            infoAbout: 'FOLLOWING',
          })}
          <hr className="Divider" />
          {this.renderUserGitInfo({
            infoData: publicRepos,
            infoAbout: 'PUBLIC REPOS',
          })}
        </ul>
        <ul className="UserInfoContainer">
          {this.renderUserWorkAreaInfo(
            {
              infoAbout: company,
              infoData: 'Company',
            },
            IoMdLink,
          )}
          {this.renderUserWorkAreaInfo(
            {
              infoAbout: companyUrl,
              infoData: 'Git URL',
            },
            IoMdLink,
          )}
          {this.renderUserWorkAreaInfo(
            {
              infoAbout: location,
              infoData: 'Location',
            },
            IoLocationOutline,
          )}
        </ul>
      </>
    )
  }

  renderFailureView = () => <FailureView />

  renderLoadingView = () => <LoadingView />

  renderStatusView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="ProfilePageContainer">{this.renderStatusView()}</div>
      </>
    )
  }
}

export default ProfilePage
