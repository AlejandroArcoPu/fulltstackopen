import { useNotificationValue } from './NotificationContext'
import Alert from '@mui/material/Alert'

const Notification = () => {
    const { type, message } = useNotificationValue()

    if (message == null) {
        return null
    }
    return <Alert severity={`${type}`}>{message}</Alert>
}

export default Notification
