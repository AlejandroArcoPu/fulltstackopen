import { Link } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { useRefShare } from './ToggableContext'
import Toggable from './Toggable'
import BlogForm from './BlogForm'

const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
}

const BlogList = ({ blogs }) => {
    const blogFormRef = useRefShare()
    const queryClient = useQueryClient()

    const handleSort = () => {
        const sortedBlogs = [...blogs].sort((bA, bB) => bB.likes - bA.likes)
        queryClient.setQueryData(['blogs'], sortedBlogs)
    }
    return (
        <div>
            <Toggable label="create new blog" ref={blogFormRef}>
                <BlogForm />
            </Toggable>
            <button onClick={handleSort}>sort by likes</button>
            {blogs.map((blog) => (
                <div key={blog.id} style={blogStyle}>
                    <Link to={`/blogs/${blog.id}`}>
                        {blog.title}-{blog.author}
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default BlogList
