import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({onClick,text}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text,value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = (props) => {
  if (props.all !== 0){
    return(
      <table>
        <tbody>
        {
          Object.keys(props.statistics).map(keys => 
            <StatisticLine  key={keys} text={keys} value={keys === 'positive' ? 
              `${props.statistics[keys]} %` : props.statistics[keys]} // To put the percentage when it is only positive
            />
          )
        }
        </tbody>
      </table>
    )
  }
  return (
    <div>
      <p>No feedback given</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [percentage, setPercentage] = useState(0)
  const [average, setAverage] = useState(0)

  const statistics = {
    'good': good,
    'bad': bad, 
    'neutral': neutral,
    'all': all,
    'average': average,
    'positive': percentage
  }

  const handleOnClikGood = () => {
    setGood(good + 1)
    setAll(all + 1)
    const updatedGood = good + 1
    const updatedAll = all + 1
    const updatedResult = (updatedGood/updatedAll)*100
    setPercentage(updatedResult)

    const averageResult = (updatedGood - bad)/updatedAll
    setAverage(averageResult)
  }
  
  const handleOnClikNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
    const updatedAll = all + 1
    const updatedResult = (good/updatedAll)*100
    setPercentage(updatedResult)

    const averageResult = (good - bad)/updatedAll
    setAverage(averageResult)
  }
  
  const handleOnClikBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
    const updatedAll = all + 1
    const updatedResult = (good/updatedAll)*100
    setPercentage(updatedResult)

    const updatedBad = bad + 1
    const averageResult = (good - updatedBad)/updatedAll
    setAverage(averageResult)
  }

  return (
    <div>
      <Header text='give feedback'/>
      <Button onClick={handleOnClikGood} text='good'/>
      <Button onClick={handleOnClikNeutral} text='neutral'/>
      <Button onClick={handleOnClikBad} text='bad'/>
      <Header text='statistics'/>
      <Statistics statistics={statistics} all={all}/>
    </div>
  )
}

export default App