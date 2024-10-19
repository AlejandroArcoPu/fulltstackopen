import { http, HttpResponse } from 'msw'

export const handlers = [
    http.post('/api/blogs', ({ request }) => {
        console.log('Handler', request.method, request.url)
        return HttpResponse.json([
            {
                title: 'testing a form...',
                author: 'Full Stack Open',
                url: 'https://learning.com',
                likes: 0,
                user: {
                    username: 'alejandroarpu',
                    name: 'Alejandro Arco',
                    id: '1',
                },
                id: '1',
            },
        ])
    }),
    http.get('/api/blogs', ({ request }) => {
        console.log('Handler', request.method, request.url)
        return HttpResponse.json([
            {
                title: 'como enseñar',
                author: 'montesory',
                url: 'https://montesory-books.com',
                likes: 15,
                user: {
                    username: 'belen',
                    name: 'Belen',
                    id: '66e884b34d9bcdac312ba003',
                },
                id: '66e8852f4d9bcdac312ba00c',
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
