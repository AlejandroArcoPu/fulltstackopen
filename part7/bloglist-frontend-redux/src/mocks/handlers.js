import { http, HttpResponse } from 'msw'

export const handlers = [
    http.delete('/api/blogs/1', ({ request }) => {
        console.log('Handler', request.method, request.url)
        return HttpResponse.json({ status: 204 })
    }),
    http.post('/api/blogs', ({ request }) => {
        console.log('Handler', request.method, request.url)
        return HttpResponse.json([
            {
                title: 'testing a form...',
                author: 'Full Stack Open',
                url: 'https://learning.com',
                likes: 0,
                user: {
                    username: 'Alejandro',
                    name: 'Alejandro',
                    id: '66e884b34d9bcdac312ba003',
                },
                id: '1',
            },
        ])
    }),
    http.put('/api/blogs/1', ({ request }) => {
        console.log('Handler', request.method, request.url)
        return HttpResponse.json(
            {
                title: 'This is my first test',
                author: 'Alejandro',
                url: 'https://myfirsttest.com',
                likes: 1,
                user: {
                    username: 'Alejandro',
                    name: 'Alejandro',
                    id: '66e884b34d9bcdac312ba003',
                },
                id: '1',
            },
            { status: 200 }
        )
    }),
]
