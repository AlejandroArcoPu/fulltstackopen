const BlogForm = ({title, setTitle, author, setAuthor, url, setUrl, handleNewBlog}) => {
    return (
    <div>
        <form onSubmit={handleNewBlog}>
            <div>
                title:
                <input 
                name="title" 
                type="text"
                value={title}
                onChange={({ target }) => setTitle(target.value)}/>
            </div>
            <div>
                author:
                <input 
                name="author" 
                type="text"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}/>
            </div>
            <div>
                url:
                <input 
                name="url" 
                type="text"
                value={url}
                onChange={({ target }) => setUrl(target.value)}/>
            </div>
            <button type="submit">create</button>
        </form>
    </div>
  )
}

export default BlogForm