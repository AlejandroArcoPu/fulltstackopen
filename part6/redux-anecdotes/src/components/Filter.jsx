import { useDispatch } from "react-redux"
import { changeFilter } from "../reducers/filterReducer"

const Filter = () => {
    const dispatch = useDispatch()
    const style = {
        marginBottom: 20
    }
    return (
        <div style={style}>
            filter <input name="filter" onChange={({target}) => 
                dispatch(changeFilter(target.value))}></input>
        </div>
    )
}

export default Filter