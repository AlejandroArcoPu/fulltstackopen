import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useEffect, useState } from 'react'
import { getAnecdotes } from './services/anecdotes'
import { useQuery, useQueryClient } from '@tanstack/react-query'

const App = () => {

  const queryClient = useQueryClient()

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if(result.isPending) {
    return <span>Loading data...</span>
  }

  if(result.isError) {
    return <span>anecdote service not available due to problems in server</span>
  }
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
