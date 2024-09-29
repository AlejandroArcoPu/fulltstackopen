import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { createSelector } from '@reduxjs/toolkit'

const AnecdoteList = () => {
    const byVotes = (a,b) => b.votes - a.votes
    // memoize
    const selectAnecdotes  = state => state.anecdotes
    const selectFilter = state => state.filter
    const anecdotes = useSelector(createSelector(
        [selectAnecdotes, selectFilter],
        (anecdotes,filter) => {
            if(filter === '') return [...anecdotes].sort(byVotes)
            return [...anecdotes].sort(byVotes)
                    .filter(a => 
                        a.content
                        .toLowerCase()
                        .includes(filter.toLowerCase()
            ))
        }
    ))

    const dispatch = useDispatch()

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => dispatch(voteAnecdote(anecdote.id))}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList