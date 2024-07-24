import { useState } from 'react'

const History = ({text,value}) => <p>{text} {value}</p>

const Header = ({text}) => <h1>{text}</h1>

const Button = ({onClick,text}) => <button onClick={onClick}>{text}</button>

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleOnClikGood = () => setGood(good + 1)
  
  const handleOnClikNeutral = () => setNeutral(neutral + 1)
  
  const handleOnClikBad = () => setBad(bad + 1)

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
    </div>
  )
}

export default App
