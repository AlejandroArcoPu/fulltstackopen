const Total = ({parts}) => {
    return(
        <p><strong>total of {parts.reduce((partialSum, parts) => 
            partialSum + parts.exercises, 0)} exercises</strong></p>
    )
}

const Header = ({text}) => {
    return(
        <h1>{text}</h1>
    )
}

const Part = ({name,exercises}) => {
    return(
        <p>{name} {exercises}</p>
    )
}


const Course = ({course}) => {
    return (
        <div>
            <Header text={course.name}/>
            {course.parts.map(c => 
                <Part key={c.id} name={c.name} exercises={c.exercises}/>
            )}
            <Total parts={course.parts}/>
        </div>
    )
}

export default Course