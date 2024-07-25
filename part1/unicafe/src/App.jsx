import { useState } from 'react'

const History = ({text,value}) => <p>{text} {value}</p>

const Header = ({text}) => <h1>{text}</h1>

const Button = ({onClick,text}) => <button onClick={onClick}>{text}</button>

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [percentage, setPercentage] = useState(0)
  const [average, setAverage] = useState(0)

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
      <History text='good' value={good}/>
      <History text='neutral' value={neutral}/>
      <History text='bad' value={bad}/>
      <History text='all' value={all}/>
      <History text='average' value={average}/>
      <History text='positive' value={`${percentage}%`}/>
    </div>
  )
}

export default App
