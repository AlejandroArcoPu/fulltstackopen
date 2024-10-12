import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog, user }) => {
    const dispatch = useDispatch()
    const [view, setView] = useState(false)

    const handleView = () => {
        setView(!view)
    }

    const increaseBlogLike = () => {
        try {
            const newBlog = { ...blog, likes: blog.likes + 1 }
            dispatch(updateBlog(newBlog))
        } catch (error) {
            console.log(error)
            dispatch(
                setNotification({
                    type: 'error',
                    notification: 'something is wrong with the update',
                })
            )
        }
    }

    const removeBlog = async (blog) => {
        try {
            if (window.confirm(`Remove blog ${blogTitle} by ${blogAuthor}`)) {
                await blogsService.remove(blogId)
                setBlogs(blogs.filter((blog) => blog.id !== blogId))
                dispatch(
                    setNotification({
                        type: 'success',
                        notification: `the blog ${blogTitle} by ${blogAuthor} removed`,
                    })
                )
            }
        } catch (error) {
            console.log(error)
            dispatch(
                setNotification({
                    type: 'error',
                    notification: `something is happening with the removal ${error}`,
                })
            )
        }
    }

    const showWhenView = { display: view ? '' : 'none' }
    const hiddenWhenView = { display: view ? 'none' : '' }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    return (
        <div className="blog">
            <div
                style={{ ...blogStyle, ...hiddenWhenView }}
                className="defaultBlog"
            >
                {blog.title} {blog.author}{' '}
                <button onClick={handleView}>view</button>
            </div>
            <div
                style={{ ...blogStyle, ...showWhenView }}
                className="clickBlog"
            >
                <div>
                    {blog.title} {blog.author}
                    <button onClick={handleView}>hide</button>
                </div>
                <div>{blog.url}</div>
                <div>
                    likes {blog.likes}
                    <button onClick={increaseBlogLike}>likes</button>
                </div>
                <div>{blog.user.name}</div>
                <div
                    style={{
                        display: user.name === blog.user.name ? '' : 'none',
                    }}
                >
                    <button onClick={removeBlog}>remove</button>
                </div>
            </div>
        </div>
    )
}

export default Blog
