import { createAnecdote } from "../services/anecdotes"
import { useMutation,useQueryClient } from "@tanstack/react-query"
import { useNotificationDispatch } from "./NotificationContext"

const AnecdoteForm = () => {
  
  const dispatch = useNotificationDispatch()

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const queryData = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], queryData.concat(newAnecdote))
    },
    onError: () => {
      dispatch('too short anecdote must have length 5 or more')
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    newAnecdoteMutation.mutate({ content: content, votes: 0})
    dispatch(`anecdote '${content}' created`)
    setTimeout(() => {
      dispatch('')
    }, 5000)
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
