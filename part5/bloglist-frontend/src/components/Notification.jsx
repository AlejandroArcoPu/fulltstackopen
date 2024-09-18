const Notification = ({ message, type }) => {

    

    if (message === null) {
        return null
    }
    return (
        <div className={`notification ${type}`}>
            <h3>{message}</h3>
        </div>
    )
}

export default Notification