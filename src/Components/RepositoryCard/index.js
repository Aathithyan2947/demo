import RepositoryLanguagesItem from '../RepositoryLanguagesItem'
import LookUp from '../Home/resources/LookUp.png'
import './index.css' // Import CSS file

const RepositoryCard = props => {
  const {
    repoDetails: {
      title,
      description,
      languagesUrl,
      starsCount,
      forksCount,
      htmlUrl,
    },
  } = props

  return (
    <>
      <h1 className="RepositoryTitle">
        {title}
        {htmlUrl && (
          <a
            href={htmlUrl}
            target="_blank"
            rel="noreferrer"
            className="LookUPLink"
          >
            <img src={LookUp} alt="Look Up" className="LookUPImg" />
          </a>
        )}
      </h1>
      <p className="RepositoryDescription">{description}</p>

      <div className="RepositoryLanguages">
        <RepositoryLanguagesItem languagesUrl={languagesUrl} />
      </div>
      <div className="RepositoryInfo">
        <div className="RepositoryInfoContainer">
          <img
            src="https://uploads.codesandbox.io/uploads/user/3b4bf1a2-79b9-4319-933d-c5a16235ae34/SO7Q-Star.png"
            alt="git star icon"
            className="RepositoryInfoIcon"
          />
          <p className="RepositoryInfoCount">{starsCount}</p>
        </div>
        <div className="RepositoryInfoContainer">
          <img
            src="https://uploads.codesandbox.io/uploads/user/3b4bf1a2-79b9-4319-933d-c5a16235ae34/1asD-Git.png"
            alt="git fork icon"
            className="RepositoryInfoIcon"
          />
          <p className="RepositoryInfoCount">{forksCount}</p>
        </div>
      </div>
    </>
  )
}

export default RepositoryCard
