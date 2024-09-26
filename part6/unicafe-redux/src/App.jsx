import { useDispatch, useSelector } from 'react-redux'

function App() {
  const dispatch = useDispatch()

  const good = useSelector(state => state.good)
  const ok = useSelector(state => state.ok)
  const bad = useSelector(state => state.bad)

  return (
      <div>
        <button onClick={() => dispatch({type: 'GOOD'})}>good</button>
        <button onClick={() => dispatch({type: 'OK'})}>ok</button>
        <button onClick={() => dispatch({type: 'BAD'})}>bad</button>
        <button onClick={() => dispatch({type: 'ZERO'})}>reset stats</button>
        <p>good {good}</p>
        <p>ok {ok}</p>
        <p>bad {bad}</p>
      </div>
  )
}

export default App
