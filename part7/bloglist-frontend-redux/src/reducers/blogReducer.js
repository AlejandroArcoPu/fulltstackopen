import { createSlice } from '@reduxjs/toolkit'
import blogsServices from '../services/blogs'

export const asObject = (title, author, url) => {
    return {
        title: title,
        author: author,
        url: url,
    }
}

const initialState = []

const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        appendBlog(state, action) {
            state.push(action.payload)
        },
        patchBlog(state, action) {
            console.log('aqui')
            return state.map((blog) =>
                blog.id === action.payload.id ? action.payload : blog
            )
        },
        removeBlog(state, action) {
            return state.filter((blog) => blog.id !== action.payload)
        },
    },
})

export const { setBlogs, appendBlog, patchBlog, removeBlog } = blogSlice.actions
export default blogSlice.reducer

export const initializeBlogs = () => {
    return async (dispatch) => {
        const response = await blogsServices.getAll()
        dispatch(setBlogs(response))
    }
}

export const orderBlogs = (blogs) => {
    return (dispatch) => {
        const sortedBlogs = [...blogs].sort((bA, bB) => bB.likes - bA.likes)
        dispatch(setBlogs(sortedBlogs))
    }
}

export const createBlog = (blog) => {
    return async (dispatch) => {
        const response = await blogsServices.create(blog)
        dispatch(appendBlog(response))
    }
}

export const updateBlog = (blog) => {
    return async (dispatch) => {
        const response = await blogsServices.update(blog.id, blog)
        dispatch(patchBlog(response))
    }
}

export const deleteBlog = (blogId) => {
    return async (dispatch) => {
        await blogsServices.remove(blogId)
        dispatch(removeBlog(blogId))
    }
}
