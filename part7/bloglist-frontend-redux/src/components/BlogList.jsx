import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { orderBlogs } from '../reducers/blogReducer'
import { setLogout } from '../reducers/userReducer'
import Toggable from './Toggable'
import BlogForm from './BlogForm'
import Blog from './Blog'

const BlogList = () => {
    const blogFormRef = useRef()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const blogs = useSelector((state) => state.blogs)

    return (
        <div>
            <h1>blogs</h1>
            <p>
                {user.name} logged in
                <button onClick={() => dispatch(setLogout())}>logout</button>
            </p>
            <Toggable label="create new blog" ref={blogFormRef}>
                <BlogForm blogFormRef={blogFormRef} />
            </Toggable>

            <button onClick={() => dispatch(orderBlogs(blogs))}>
                sort by likes
            </button>

            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} user={user} />
            ))}
        </div>
    )
}

export default BlogList
