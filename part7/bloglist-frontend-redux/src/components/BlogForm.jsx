import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { asObject, createBlog } from '../reducers/blogReducer'

const BlogForm = ({ blogFormRef }) => {
    const dispatch = useDispatch()

    const addBlog = async (event) => {
        const title = event.target.title.value
        const author = event.target.author.value
        const url = event.target.url.value

        event.preventDefault()
        try {
            blogFormRef.current.toggleVisibility()
            dispatch(createBlog(asObject(title, author, url)))
            dispatch(
                setNotification({
                    type: 'success',
                    notification: `a new blog ${title} by ${author} added`,
                })
            )
        } catch (error) {
            console.log(error)
            dispatch(
                setNotification({
                    type: 'error',
                    notification: `something is wrong with your blog ${error}`,
                })
            )
        }
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
