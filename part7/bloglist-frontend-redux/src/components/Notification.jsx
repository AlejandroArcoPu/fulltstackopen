import { useSelector } from 'react-redux'

const Notification = () => {
    const { type, notification } = useSelector((state) => state.notification)

    if (!notification) {
        return null
    }

    return (
        <div className={`notification ${type}`}>
            <h3>{notification}</h3>
        </div>
    )
}

export default Notification
