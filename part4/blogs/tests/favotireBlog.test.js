const { test, describe } = require('node:test')
const assert = require('node:assert')

const favoriteBlog = require('../utils/list_helper').favoriteBlog

describe('favorite blog',  () => {
    const emptyBlogs = []
    const oneElementBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        }
    ]
    const manyElementBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Full Stack Open',
            author: 'Test Guy',
            url: 'https://www.fulltstackopen.com',
            likes: 8,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 7,
            __v: 0
        }
    ]

    test('of empty blogs', () => {
        assert.deepStrictEqual(favoriteBlog(emptyBlogs),{})
    })

    test('of one element blogs', () => {
        const result = favoriteBlog(oneElementBlogs)
        assert.deepStrictEqual(result,oneElementBlogs[0])
    })

    test('of many blogs', () => {
        const result = favoriteBlog(manyElementBlogs)
        assert.deepStrictEqual(result,manyElementBlogs[1])
    })

})
