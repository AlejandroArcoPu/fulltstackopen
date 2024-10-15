import BlogList from './BlogList'
import { renderWithProviders } from '../utils/test-utils'
import { screen } from '@testing-library/dom'
import { beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'

const initialBlogs = [
    {
        title: 'como enseñar',
        author: 'montesory',
        url: 'https://montesory-books.com',
        likes: 0,
        user: {
            username: 'belen',
            name: 'Belen',
            id: '1',
        },
        id: '1',
    },
    {
        title: 'javascript',
        author: 'midudev',
        url: 'https://midudev.com',
        likes: 13,
        user: {
            username: 'belen',
            name: 'Belen',
            id: '2',
        },
        id: '2',
    },
]
const initialUsers = {
    username: 'alejandroarpu',
    name: 'Alejandro Arco',
}

describe('<BlogList/>', () => {
    beforeEach(() => {
        renderWithProviders(<BlogList />, {
            preloadedState: {
                user: initialUsers,
                blogs: initialBlogs,
            },
        })
    })
    test('should render the page properly', async () => {
        expect(screen.getByText('blogs')).toBeVisible()
        expect(screen.getByText(`${initialUsers.name} logged in`)).toBeVisible()
        expect(screen.getByRole('button', { name: 'logout' })).toBeVisible()
        expect(
            screen.getByRole('button', { name: 'create new blog' })
        ).toBeVisible()
        expect(
            screen.getByRole('button', { name: 'sort by likes' })
        ).toBeVisible()
    })

    test('should order blogs by likes', async () => {
        const userMock = userEvent.setup()
        const buttonSort = screen.getByText('sort by likes')
        await userMock.click(buttonSort)
        screen.debug()
    })

    test('should logout', async () => {})
})
