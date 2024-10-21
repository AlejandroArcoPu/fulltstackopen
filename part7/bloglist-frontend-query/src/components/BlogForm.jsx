import { useQueryClient, useMutation } from '@tanstack/react-query'
import blogsService from '../services/blogs'
import { useNotificationDispatch } from './NotificationContext'
import { useRefShare } from './ToggableContext'

const BlogForm = () => {
    const queryClient = useQueryClient()
    const dispatch = useNotificationDispatch()
    const blogFormRef = useRefShare()

    const mutation = useMutation({
        mutationFn: blogsService.create,
        onSuccess: (newBlog) => {
            const queryData = queryClient.getQueryData(['blogs'])
            queryClient.setQueryData(['blogs'], queryData.concat(newBlog))
            dispatch({
                type: 'success',
                message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
            })
            setTimeout(() => {
                dispatch('')
            }, 5000)
        },
        onError: () => {
            dispatch({
                type: 'error',
                message: `something is wrong with your blog: ${error}`,
            })
            setTimeout(() => {
                dispatch('')
            }, 5000)
        },
    })

    const addBlog = (event) => {
        event.preventDefault()
        blogFormRef.current.toggleVisibility()
        const newBlog = {
            title: event.target.title.value,
            author: event.target.author.value,
            url: event.target.url.value,
        }
        mutation.mutate(newBlog)

        event.target.title.value = ''
        event.target.author.value = ''
        event.target.url.value = ''
    }

    return (
        <div>
            <h1>create new</h1>
            <form onSubmit={addBlog}>
                <div>
                    title:
                    <input name="title" type="text" placeholder="title" />
                </div>
                <div>
                    author:
                    <input name="author" type="text" placeholder="author" />
                </div>
                <div>
                    url:
                    <input name="url" type="text" placeholder="url" />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm
