import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogsService from '../services/blogs'
import { useNotificationDispatch } from './NotificationContext'
import { useUserValue } from './UserContext'

const Blog = ({ blog }) => {
    const [view, setView] = useState(false)
    const userValue = useUserValue()
    const queryClient = useQueryClient()
    const dispatch = useNotificationDispatch()

    const increaseLikesMutation = useMutation({
        mutationFn: blogsService.update,
        onSuccess: (newBlog) => {
            const queryData = queryClient.getQueryData(['blogs'])
            queryClient.setQueryData(
                ['blogs'],
                queryData.map((blog) =>
                    blog.id === newBlog.id ? newBlog : blog
                )
            )
        },
        onError: (error) => {
            console.log(error)
            dispatch({
                type: 'error',
                message: `${error.response.status}: ${error.response.statusText}`,
            })
            setTimeout(() => {
                dispatch('')
            }, 5000)
        },
    })

    const removeBlogsMutation = useMutation({
        mutationFn: blogsService.remove,
        onSuccess: (_, blogId) => {
            const queryData = queryClient.getQueryData(['blogs'])
            queryClient.setQueryData(
                ['blogs'],
                queryData.filter((blog) => blog.id !== blogId)
            )
        },
        onError: () => {
            console.log(error)
            dispatch({
                type: 'error',
                message: `${error.response.status}: ${error.response.statusText}`,
            })
            setTimeout(() => {
                dispatch('')
            }, 5000)
        },
    })

    const increaseBlogLike = (blog) => {
        try {
            increaseLikesMutation.mutate({ ...blog, likes: blog.likes + 1 })
        } catch (error) {
            console.log(error)
            dispatch({
                type: 'error',
                message: 'something is wrong with the update',
            })
            setTimeout(() => {
                dispatch('')
            }, 5000)
        }
    }

    const removeBlog = async (blog) => {
        try {
            if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
                removeBlogsMutation.mutate(blog.id)
                dispatch({
                    type: 'success',
                    message: `the blog ${blog.title} by ${blog.author} removed`,
                })
                setTimeout(() => {
                    dispatch('')
                }, 5000)
            }
        } catch (error) {
            console.log(error)
            dispatch({
                type: 'error',
                message: `something is happening with the removal ${error}`,
            })
            setTimeout(() => {
                dispatch('')
            }, 5000)
        }
    }

    const handleView = () => {
        setView(!view)
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
                    <button onClick={() => increaseBlogLike(blog)}>
                        likes
                    </button>
                </div>
                <div>{blog.user.name}</div>
                <div
                    style={{
                        display:
                            userValue.name === blog.user.name ? '' : 'none',
                    }}
                >
                    <button onClick={() => removeBlog(blog)}>remove</button>
                </div>
            </div>
        </div>
    )
}

export default Blog
