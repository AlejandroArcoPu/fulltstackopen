import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const [view, setView] = useState(false)

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

    const removeBlog = async () => {
        try {
            if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
                dispatch(deleteBlog(blog.id))
                dispatch(
                    setNotification({
                        type: 'success',
                        notification: `the blog ${blog.title} by ${blog.author} removed`,
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
                <button onClick={() => setView(!view)}>view</button>
            </div>
            <div
                style={{ ...blogStyle, ...showWhenView }}
                className="clickBlog"
            >
                <div>
                    {blog.title} {blog.author}
                    <button onClick={() => setView(!view)}>hide</button>
                </div>
                <div>{blog.url}</div>
                <div className="likes">
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
