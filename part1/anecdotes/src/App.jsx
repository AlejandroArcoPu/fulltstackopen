import { useState } from 'react'

const Button = ({onClick,text}) => <button onClick={onClick}>{text}</button>

const Header = ({text}) => <h1>{text}</h1>

const Best = (props) => {
  const sum = props.votes.reduce((e1,e2) => e1 + e2)
  if(sum == 0){
    return(
      <p>No votes registered</p>
    )
  } 
  const indexMax = props.votes.indexOf(Math.max(...props.votes))
  return (
    <div>
      <p>{props.anecdotes[indexMax]}.</p>
      <p>has {props.votes[indexMax]} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const points = new Uint8Array(anecdotes.length); 
  const [votes, setVotes] = useState(points)

  const handleOnClickAnecdote = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  const handleOnClickVote = () => {
    setVotes(votes.map((element,index) => 
      index === selected ? element + 1 : element
    ))
  }

  return (
    <div>
      <Header text='Anecdote of the day'/>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button onClick={handleOnClickVote} text='vote'/>
      <Button onClick={handleOnClickAnecdote} text='next anecdote'/>
      <Header text='Anecdote with most votes'/>
      <Best votes={votes} anecdotes={anecdotes}/>
    </div>
  )
}

export default App