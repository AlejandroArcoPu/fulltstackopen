const User = ({ user }) => {
    return (
        <div>
            <h2>{user.name}</h2>
            <h3>added blogs</h3>
            {user.blogs.length > 0 ? (
                <ul>
                    {user.blogs.map((blog) => (
                        <li key={blog.id}>{blog.title}</li>
                    ))}
                </ul>
            ) : (
                <p>waiting for blogs...</p>
            )}
        </div>
    )
}

export default User
