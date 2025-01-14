import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import './index.css' // Importing the CSS file

const textColors = [
  '#38BDF8',
  '#E879F9',
  '#4ADE80',
  '#F472B6',
  '#FBBF24',
  '#C084FC',
  '#ffb3b3',
  '#ff944d',
  '#ffff4d',
  '#4db8ff',
  '#85adad',
  '#33ffad',
  '#80ff80',
]

class RepositoryLanguagePieChart extends Component {
  state = {languagesList: []}

  componentDidMount = () => {
    this.getLanguages()
  }

  getLanguages = async () => {
    const {languagesUrl} = this.props
    const response = await fetch(languagesUrl)
    const languages = await response.json()
    const languagesInfo = [...Object.entries(languages)]
    this.setState({
      languagesList: languagesInfo.map(item => ({
        language: item[0],
        count: item[1],
      })),
    })
  }

  render() {
    const {languagesList} = this.state

    return (
      <>
        <h1 className="LanguagesHeading">Languages :</h1>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              cx="50%"
              cy="40%"
              data={languagesList}
              startAngle={0}
              endAngle={360}
              innerRadius="40%"
              outerRadius="70%"
              dataKey="count"
            >
              {languagesList.map((item, index) => (
                <Cell
                  key={item.language}
                  name={item.language}
                  fill={textColors[index]}
                />
              ))}
            </Pie>
            <Legend
              iconType="square"
              layout="vertical"
              verticalAlign="middle"
              align="right"
            />
          </PieChart>
        </ResponsiveContainer>
      </>
    )
  }
}

export default withRouter(RepositoryLanguagePieChart)
