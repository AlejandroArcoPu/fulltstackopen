const { test, describe } = require('node:test')
const assert = require('node:assert')

const favoriteBlog = require('../utils/list_helper').favoriteBlog

describe('favorite blog',  () => {
    const emptyBlogs = []

    test('of empty blog', () => {
        assert.deepStrictEqual(favoriteBlog(emptyBlogs),{})
    })

})
