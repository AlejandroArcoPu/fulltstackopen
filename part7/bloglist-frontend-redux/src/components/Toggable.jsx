import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Toggable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)
    const hiddenWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility,
        }
    })

    return (
        <div>
            <div style={hiddenWhenVisible}>
                <button onClick={toggleVisibility}>{props.label}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
})

Toggable.displayName = 'Toggable'

Toggable.propTypes = {
    label: PropTypes.string.isRequired,
}

export default Toggable
