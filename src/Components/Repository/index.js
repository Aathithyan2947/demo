import {Component} from 'react'
import Header from '../Header'
import FailureView from '../common/FailureView'
import LoadingView from '../common/LoadingView'
import RepositoryCard from '../RepositoryCard'
import Pagination from '../Pagination'
import NoData from '../Home/resources/NoData.png'
import './index.css'

const reposPerPage = 3
const initialPageNumber = 1
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RepositoriesPage extends Component {
  state = {
    repositoriesData: '',
    currentPage: initialPageNumber,
    totalPages: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = () => {
    this.getRepositoriesData()
  }

  onSuccessDataCollected = async reposData => {
    this.setState(
      {
        repositoriesData: reposData.map(repo => ({
          title: repo.name,
          description: repo.description,
          languagesUrl: repo.languages_url,
          starsCount: repo.stargazers_count,
          forksCount: repo.forks_count,
        })),
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

  getRepositoriesData = async () => {
    const {match} = this.props
    const {params} = match
    const {user} = params
    const {currentPage} = this.state

    const reposUrl = `https://api.github.com/users/${user}/repos?page=${currentPage}&per_page=3`
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const response = await fetch(reposUrl)
    console.log(response)
    if (response.ok) {
      const reposData = await response.json()
      this.onSuccessDataCollected(reposData)
    } else {
      this.onFailureDataCollected(true)
    }
  }

  gotoNextPage = () => {
    const {currentPage, totalPages} = this.state
    if (currentPage < totalPages) {
      this.setState(
        prevState => ({
          currentPage: prevState.currentPage + 1,
        }),
        this.getRepositoriesData,
      )
    }
  }

  gotoPrevPage = () => {
    const {currentPage} = this.state
    if (currentPage > 0) {
      this.setState(
        prevState => ({
          currentPage: prevState.currentPage - 1,
        }),
        this.getRepositoriesData,
      )
    }
  }

  getTheCountOfRepos = async () => {
    const {match} = this.props
    const {params} = match
    const {user} = params
    const url = `https://api.github.com/users/${user}/repos`
    const response = await fetch(url)
    const reposList = await response.json()
    const remain = reposList.length % reposPerPage
    const totalPagesCount = remain ? 1 : 0
    this.setState({
      totalPages: totalPagesCount + Math.floor(reposList.length / reposPerPage),
    })
  }

  renderNoRepositoriesView = () => (
    <div className="DataNotFoundViewContainer">
      <img
        src={NoData}
        alt="empty repositories"
        className="DataNotFoundViewLogo"
      />
      <h1 className="NoDataHeading">No Repositories Found!</h1>
    </div>
  )

  renderRepositoriesView = () => {
    const {match} = this.props
    const {params} = match
    const {user} = params
    const {repositoriesData, totalPages, currentPage} = this.state
    if (repositoriesData.length === 0) {
      return this.renderNoRepositoriesView()
    }
    return (
      <>
        <h1 className="Heading">Repositories</h1>
        {repositoriesData.map(repoDetails => (
          <a
            key={`repos-${Math.random()}-${repoDetails.title}`}
            href={`/${user}/repository/${repoDetails.title}`}
            className="RepositoryCardContainer"
            aria-label="Go to next page"
          >
            <RepositoryCard repoDetails={repoDetails} />
          </a>
        ))}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          gotoPrevPage={this.gotoPrevPage}
          gotoNextPage={this.gotoNextPage}
        />
      </>
    )
  }

  renderStatusView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoriesView()
      case apiStatusConstants.failure:
        return <FailureView />
      case apiStatusConstants.inProgress:
        return <LoadingView />
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="RepositoriesPageContainer">
          {this.renderStatusView()}
        </div>
      </>
    )
  }
}

export default RepositoriesPage
