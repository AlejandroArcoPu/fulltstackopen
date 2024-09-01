const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => blogs.length === 0 
    ? 0 
    : blogs.reduce((accumulator,currentValue) => accumulator + currentValue.likes, 0)

const favoriteBlog = (blogs) => blogs.length === 0 
    ? {}
    : blogs.reduce((a, b)  => a.likes > b.likes ? a : b, blogs[0])

const mostBlogs = (blogs) => blogs.length === 0 
    ? {}
    : _.maxBy(_.map(_.countBy(blogs,'author'),(val, key) => ({author: key, blogs: val})),'blogs')

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}