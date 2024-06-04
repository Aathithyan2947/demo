import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import './index.css' // Import CSS file

class RepositoryContributors extends Component {
  state = {contributors: []}

  componentDidMount() {
    this.getRepositoryContributors()
  }

  getRepositoryContributors = async () => {
    const {contributorsUrl} = this.props
    const options = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
    const response = await fetch(contributorsUrl, options)
    const contributors = await response.json()
    this.setState({contributors})
  }

  renderRepositoryContributors = () => {
    const {contributors} = this.state
    return (
      <>
        <h1 className="RepoContributorsHeading">Contributors :</h1>
        <p className="ContributorsCount">{`${contributors.length} Members`}</p>
        <div className="ContributorsList">
          {contributors.map((contributor, index) => {
            if (index <= 4) {
              return (
                <img
                  key={contributor.id}
                  src={contributor.avatar_url}
                  alt={contributor.login}
                  className="ContributorsAvatar"
                />
              )
            }
            return ''
          })}
          {contributors.length > 5 && (
            <div className="ContributorsCountPresent">{`+${
              contributors.length - 5
            }`}</div>
          )}
        </div>
      </>
    )
  }

  render() {
    return (
      <div className="RepositoryContributorsContainer">
        {this.renderRepositoryContributors()}
      </div>
    )
  }
}

export default withRouter(RepositoryContributors)
