import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNotificationDispatch } from './components/NotificationContext'
import { getAnecdotes, updateAnecdote } from './services/anecdotes'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

const App = () => {
  
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const queryData = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], queryData.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote))
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    dispatch(`anecdote '${anecdote.content}' voted`)
    setTimeout(() => {
      dispatch('')
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })
  
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
