import Header from './Header'
import Part from './Part'

const Course = ({course}) => {
    return (
        <div>
            <Header text={course.name}/>
            {course.parts.map(c => 
                <Part key={c.id} name={c.name} exercises={c.exercises}/>
            )}
        </div>
    )
}

export default Course