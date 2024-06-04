import {Component} from 'react'
import './index.css' // Import CSS file

class RepositoryInfoCount extends Component {
  state = {commitsCount: 0}

  componentDidMount = () => {
    this.getRepositoryInfoCount()
  }

  getRepositoryInfoCount = async () => {
    const {commitsUrl} = this.props

    const response = await fetch(commitsUrl.slice(0, -6))
    if (response.ok) {
      const commitsCount = await response.json()
      this.setState({commitsCount: commitsCount.length})
    }
  }

  getInfoUI = (countAbout, countInfo) => {
    const info = countInfo <= 9 ? `0${countInfo}` : countInfo
    return (
      <div key={countAbout} className="InfoContainer">
        <p className="CountAbout">{countAbout}</p>
        <p className="CountInfo">{info}</p>
      </div>
    )
  }

  render() {
    const {commitsCount} = this.state
    const {openIssuesCount} = this.props
    return (
      <div className="RepoInfoContainer">
        {this.getInfoUI('Commits Count', commitsCount)}
        {this.getInfoUI('Issues Count', openIssuesCount)}
      </div>
    )
  }
}

export default RepositoryInfoCount
