const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if(blogs.length === 0) return 0
    else return blogs.reduce((accumulator,currentValue) => accumulator + currentValue.likes, 0)
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 0) return {}
    else return blogs.reduce((a, b)  => a.likes > b.likes ? a : b, blogs[0])
}

const mostBlogs = (blogs) => {
    if(blogs.length === 0) return {}
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}