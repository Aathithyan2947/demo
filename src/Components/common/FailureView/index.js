// FailureView.jsx

import './index.css' // Import CSS file

const FailureView = () => {
  const tryAgain = () => {
    window.location.reload()
  }

  return (
    <div className="FailureViewContainer">
      <img
        className="FailureViewLogo"
        src="https://rawcdn.githack.com/chennachandrika/Mini_Project_Task_Flow_Manager/aff08ba65374b593c22bf3b26e9894ec8f812112/src/Components/LoginPage/resources/SomthingWentWrong.png"
        alt="something went wrong"
      />
      <h1 className="FailureText">Something went wrong. Please try again</h1>
      <button type="button" className="TryAgainButton" onClick={tryAgain}>
        Try Again
      </button>
    </div>
  )
}

export default FailureView
