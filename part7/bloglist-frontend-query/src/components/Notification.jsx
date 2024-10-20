import { useNotificationValue } from './NotificationContext'

const Notification = () => {
    const { type, message } = useNotificationValue()

    if (message == null) {
        return null
    }
    return (
        <div className={`notification ${type}`}>
            <h3>{message}</h3>
        </div>
    )
}

export default Notification
