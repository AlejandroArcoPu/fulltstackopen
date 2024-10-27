import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogsService from '../services/blogs'
import { useNotificationDispatch } from './NotificationContext'
import { useUserValue } from './UserContext'
import { useNavigate } from 'react-router-dom'

const Blog = ({ blog }) => {
    const userValue = useUserValue()
    const queryClient = useQueryClient()
    const dispatch = useNotificationDispatch()
    const navigate = useNavigate()

    const addNewComment = useMutation({
        mutationFn: ({ blogId, comment }) =>
            blogsService.addComment(blogId, comment),
        onSuccess: (newBlog) => {
            const queryData = queryClient.getQueryData(['blogs'])
            queryClient.setQueryData(
                ['blogs'],
                queryData.map((blog) =>
                    blog.id === newBlog.id ? newBlog : blog
                )
            )
        },
    })

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
                navigate('/', { replace: true })
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

    const handleComment = (event) => {
        event.preventDefault()
        const comment = event.target.comment.value
        console.log(comment)
        addNewComment.mutate({ blogId: blog.id, comment })
        event.target.comment.value = ''
    }

    return (
        <div>
            <h1>
                {blog.title} - {blog.author}
            </h1>
            <a href={blog.url}>{blog.url}</a>
            <div>
                likes {blog.likes}
                <button onClick={() => increaseBlogLike(blog)}>likes</button>
            </div>
            <div
                style={{
                    display: userValue.name === blog.user.name ? '' : 'none',
                }}
            >
                <button onClick={() => removeBlog(blog)}>remove</button>
            </div>
            <div>added by {blog.user.name}</div>
            <h2>comments</h2>
            <form onSubmit={handleComment}>
                <input name="comment" type="text" />
                <button type="submit">add comment</button>
            </form>

            <ul>
                {blog.comments.map((comment, idx) => (
                    <li key={idx}>{comment}</li>
                ))}
            </ul>
        </div>
    )
}

export default Blog
