import Header from './Header'
import Part from './Part'
import Total from './Total'

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