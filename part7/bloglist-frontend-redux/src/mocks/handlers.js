import { http, HttpResponse } from 'msw'

export const handlers = [
    http.get('/api/blogs', () => {
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
    http.put('/api/blogs/1', () => {
        console.log(`Captured a request`)
        return HttpResponse.json({
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
        })
    }),
]
