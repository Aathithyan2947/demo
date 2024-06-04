// import {withRouter} from 'react-router-dom'
// import {Component} from 'react'

// import './styles.css'
// import './index.css'
export default function CommitHistory() {
  return (
    <>
      <div>CommitHistory </div>
    </>
  )
}
// class CommitHistory extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       commitsHistory: [],
//       tooltip: null,
//     }
//   }

//   componentDidMount() {
//     this.getCommitHistory()
//   }

//   getCommitHistory = async () => {
//     try {
//       const {match} = this.props
//       const {params} = match
//       const {user} = params

//       const url = `https://ttvxlp94z4.execute-api.ap-south-1.amazonaws.com/dev/github-commits?user=${user}`
//       const response = await fetch(url)

//       if (!response.ok) {
//         throw new Error('Network response was not ok')
//       }

//       const commitHistory = await response.json()
//       const formattedCommitHistory = Object.keys(commitHistory).map(data => ({
//         date: new Date(data),
//         count: commitHistory[data],
//       }))

//       this.setState({commitsHistory: formattedCommitHistory})
//     } catch (error) {
//       console.error('Error fetching commit history:', error)
//       // Handle errors gracefully, e.g., display an error message to the user
//     }
//   }

//   renderTooltip = value => (
//     <div
//       style={{
//         position: 'absolute',
//         top: '10px',
//         left: '10px',
//         background: 'white',
//         padding: '5px',
//         border: '1px solid #ccc',
//         borderRadius: '4px',
//       }}
//     >
//       Commits: {value.count || 0}
//     </div>
//   )

//   render() {
//     const {commitsHistory, tooltip} = this.state
//     const today = new Date()
//     const startDate = new Date(today)
//     startDate.setDate(startDate.getDate() - 232) // Past six months from today

//     const classForValue = value =>
//       !value ? 'color-empty' : `color-gitlab-${value.count}`

//     const onMouseOver = (event, value) => {
//       this.setState({tooltip: {event, value}})
//     }

//     const onMouseLeave = () => {
//       this.setState({tooltip: null})
//     }

//     return (
//       <>
//         <h1 className="CommitHistoryHeading">Commit History</h1>
//         <div style={{position: 'relative'}}>
//           <div>
//             {commitsHistory.map(day => (
//               <HeatmapDay
//                 key={day.date}
//                 count={day.count}
//                 onMouseOver={event =>
//                   this.setState({tooltip: {event, value: day}})
//                 }
//                 onMouseLeave={() => this.setState({tooltip: null})}
//               />
//             ))}
//           </div>
//           {tooltip && this.renderTooltip(tooltip.value)}
//         </div>
//       </>
//     )
//   }
// }

// export default withRouter(CommitHistory)
