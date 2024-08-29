const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: 3,
        required: true
    },
    author: {
        type: String,
        minLength: 3,
        required: true
    },
    url: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /(https:\/\/.+)/.test(v)
            },
            message: props => `${props.value} is not a valid URL! Should start with https://`
        },
        minLength: 5
    },
    likes: {
        type: Number,
        min: 0
    }
})

module.exports = mongoose.model('Blog',blogSchema)