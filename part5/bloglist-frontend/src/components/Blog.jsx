import { useState } from 'react'

const Blog = ({blog,updateBlog}) => {
    const [view, setView] = useState(false)

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

    return(
    <div>
      <div style={{...blogStyle,...hiddenWhenView}}>
        {blog.title} {blog.author} <button onClick={handleView}>view</button>
      </div>
      <div style={{...blogStyle,...showWhenView}}>
        <div>{blog.title} {blog.author}<button onClick={handleView}>hide</button></div>
        <div>{blog.url}</div>
        <div>likes {blog.likes}<button onClick={updateBlog}>likes</button></div>
        <div>{blog.user.name}</div>
      </div>
    </div>
    ) 
}

export default Blog