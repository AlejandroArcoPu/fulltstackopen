import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    voteAnecdote(state,action) {
      const anecdoteToUpdate = state.find(anecdote => anecdote.id === action.payload)
      const votesToUpdate = anecdoteToUpdate.votes
      const newAnecdote = {...anecdoteToUpdate, votes: votesToUpdate + 1 }
      return state.map(anecdote => anecdote.id === action.payload ? newAnecdote : anecdote)
    },
    createAnecdote(state,action){
      return state.concat(action.payload)
    },
    setAnecdotes(state,action){
      return action.payload
    }
  }
})

export const { voteAnecdote, createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer