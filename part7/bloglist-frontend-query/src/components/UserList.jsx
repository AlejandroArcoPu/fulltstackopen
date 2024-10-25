import { useQuery } from '@tanstack/react-query'
import userServices from '../services/users'

const UserList = () => {
    const result = useQuery({
        queryFn: userServices.getAll,
        queryKey: ['users'],
        retry: 1,
    })

    if (result.isPending) {
        return <span>Loading data...</span>
    }

    if (result.isError) {
        return (
            <span>blogs service not available due to problems in server</span>
        )
    }

    const users = result.data

    return (
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserList
