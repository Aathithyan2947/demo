import {Component} from 'react'
import {FaChevronRight} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import Header from '../Header'
import RepositoryCard from '../RepositoryCard'
import FailureView from '../common/FailureView'
import LoadingView from '../common/LoadingView'
import RepositoryInfoCount from '../RepositoryInfoCount'
import RepositoryContributors from '../RepositoryContributors'
import RepositoryLanguagePieChart from '../RepositoryLanguagePieChart'
import './index.css' // Import CSS file

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RepositoryItemPage extends Component {
  state = {repoDetails: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount = () => {
    this.getRepostoryData()
  }

  // componentWillUnmount() {
  //   // fix Warning: Can't perform a React state update on an unmounted component
  //   this.setState = (state, callback) => {
  //     return
  //   }
  // }

  onSuccessDataCollected = async repositoryData => {
    this.setState(
      {
        repoDetails: {
          title: repositoryData.name,
          description: repositoryData.description,
          languagesUrl: repositoryData.languages_url,
          starsCount: repositoryData.stargazers_count,
          forksCount: repositoryData.forks_count,
          contributorsUrl: repositoryData.contributors_url,
          htmlUrl: repositoryData.html_url,
          commitsUrl: repositoryData.commits_url,
          openIssuesCount: repositoryData.open_issues_count,
        },
        apiStatus: apiStatusConstants.success,
      },
      this.getTheCountOfRepos,
    )
  }

  onFailureDataCollected = () => {
    this.setState({
      apiStatus: apiStatusConstants.failure,
    })
  }

  getRepostoryData = async () => {
    const {match} = this.props
    const {params} = match
    const {user, repositoryName} = params

    const repoUrl = `https://api.github.com/repos/${user}/${repositoryName}`
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const response = await fetch(repoUrl)

    if (response.ok) {
      const repositoryData = await response.json()
      console.log(repositoryData)
      this.onSuccessDataCollected(repositoryData)
    } else {
      this.onFailureDataCollected(true)
    }
  }

  renderRepositoryView = () => {
    const {repoDetails} = this.state

    return (
      <div className="RepositoryCardContainer">
        <RepositoryCard repoDetails={repoDetails} />
        <RepositoryInfoCount
          commitsUrl={repoDetails.commitsUrl}
          openIssuesCount={repoDetails.openIssuesCount}
        />
        <RepositoryContributors contributorsUrl={repoDetails.contributorsUrl} />
        <RepositoryLanguagePieChart languagesUrl={repoDetails.languagesUrl} />
      </div>
    )
  }

  renderStatusView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoryView()
      case apiStatusConstants.failure:
        return <FailureView />
      case apiStatusConstants.inProgress:
        return <LoadingView />
      default:
        return null
    }
  }

  render() {
    const {match} = this.props
    const {params} = match
    const {repositoryName, user} = params
    return (
      <>
        <Header />
        <div className="RepoPath">
          <Link to={`/${user}/repositories`}>Repositories</Link>
          <FaChevronRight />
          <Link isactive="true" to={`/${user}/repository/${repositoryName}`}>
            {repositoryName}
          </Link>
        </div>
        <div className="RepositoryItemPageContainer">
          {this.renderStatusView()}
        </div>
      </>
    )
  }
}

export default RepositoryItemPage
