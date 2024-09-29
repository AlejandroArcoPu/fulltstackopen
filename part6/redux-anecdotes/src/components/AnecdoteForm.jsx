import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { removeNotification,createNotification } from "../reducers/notificationReducer"
import anecdotesService from "../services/anecdotes"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        const response = await anecdotesService.createNew(anecdote)
        dispatch(createAnecdote(response))
        event.target.anecdote.value = ''
        dispatch(createNotification(`you created '${anecdote}'`))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote"/></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm