import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'
import { appendNote } from '../../../practice-notes/src/reducers/noteReducer'

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
    appendAnecdote(state,action){
      state.push(action.payload)
    },
    setAnecdotes(state,action){
      return action.payload
    }
  }
})

export const { voteAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdotesService.createNew(content)
    dispatch(appendAnecdote(anecdote))
  }
}