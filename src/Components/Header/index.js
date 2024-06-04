import {Link} from 'react-router-dom'
import './index.css' // Import the CSS file

const Header = ({history, match}) => {
  const {location} = history
  const {pathname} = location
  const {params} = match
  const {user, repositoryName} = params

  return (
    <header className="NavbarBar">
      <div className="Navbar">
        <Link className="NavbarBrand" to="/">
          Github Profile Visualizer
        </Link>
        <div>
          <Link
            className={`RouterLink ${
              pathname === `/${user}/profile` ? 'active' : ''
            }`}
            to={`/${user}/profile`}
          >
            Home
          </Link>
          <Link
            className={`RouterLink ${
              pathname === `/${user}/repositories` ||
              pathname === `/${user}/repository/${repositoryName}`
                ? 'active'
                : ''
            }`}
            to={`/${user}/repositories`}
          >
            Repositories
          </Link>
          <Link
            className={`RouterLink ${
              pathname === `/${user}/analysis` ? 'active' : ''
            }`}
            to={`/${user}/analysis`}
          >
            Analysis
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
