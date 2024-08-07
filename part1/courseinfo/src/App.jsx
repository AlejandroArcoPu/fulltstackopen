const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Part = (props) => {
  return <p> {props.part} {props.exercises} </p>
}

const Content = (props) => {
  return(
    <div>
      {
        props.parts.map(element =>
        <Part key={element.name} part={element.name} exercises={element.exercises}/>)
      }
    </div>
  )
}

const Total = (props) => {
  let exercisesAll = props.parts.map(element => element.exercises).reduce((partialSum,exercise) =>
    partialSum + exercise
  )
  return <p>Number of exercises {exercisesAll}</p>
}

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App