import { useQuery } from '@tanstack/react-query'
import usersService from '../services/users'
import { Link } from 'react-router-dom'

const Users = () => {
    const result = useQuery({
        queryKey: ['users'],
        queryFn: usersService.getAll,
        retry: 1,
    })

    if (result.isPending) {
        return <span>Loading data...</span>
    }

    if (result.isError) {
        return (
            <span>users service not available due to problems in server</span>
        )
    }

    const users = result.data

    return (
        <div>
            <h2>Users 👥</h2>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>
                                <Link to={`${user.id}`}>{user.name}</Link>
                            </td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Users
