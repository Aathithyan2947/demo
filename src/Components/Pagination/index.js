import {Component} from 'react'
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md'
import './index.css'

class Pagination extends Component {
  nextPage = () => {
    const {gotoNextPage} = this.props
    gotoNextPage()
  }

  prevPage = () => {
    const {gotoPrevPage} = this.props
    gotoPrevPage()
  }

  render() {
    const {totalPages, currentPage} = this.props
    return (
      <div className="PaginationContainer">
        <button
          className="PaginationButton"
          onClick={this.prevPage}
          type="button"
          aria-label="Go to previous page"
        >
          <MdKeyboardArrowLeft style={{color: 'white'}} />
        </button>
        <p>{`${currentPage} of ${totalPages}`}</p>
        <button
          className="PaginationButton"
          onClick={this.nextPage}
          type="button"
          aria-label="Go to next page"
        >
          <MdKeyboardArrowRight style={{color: 'white'}} />
        </button>
      </div>
    )
  }
}

export default Pagination
