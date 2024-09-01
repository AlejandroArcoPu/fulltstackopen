const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if(blogs.length === 0) return 0
    else return blogs.reduce((accumulator,currentValue) => accumulator + currentValue.likes, 0)
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 0) return {}
    else return blogs.reduce((a, b)  => a > b)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}