const UserList = ({ users }) => {
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
