import { useState } from 'react'

const BlogForm = ({createNewBlog}) => {

    const [author,setAuthor] = useState('')
    const [title,setTitle] = useState('')
    const [url,setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createNewBlog({
            title,author,url
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
    <div>
        <h1>create new</h1>
        <form onSubmit={addBlog}>
            <div>
                title:
                <input 
                name="title" 
                type="text"
                value={title}
                onChange={({target}) => setTitle(target.value)}/>
            </div>
            <div>
                author:
                <input 
                name="author" 
                type="text"
                value={author}
                onChange={({target}) => setAuthor(target.value)}/>
            </div>
            <div>
                url:
                <input 
                name="url" 
                type="text"
                value={url}
                onChange={({target}) => setUrl(target.value)}/>
            </div>
            <button type="submit">create</button>
        </form>
    </div>
  )
}

export default BlogForm