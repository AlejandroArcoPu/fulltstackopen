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

        const blogs = screen.getByText('likes 13')
        const blogs1 = screen.getByText('likes 0')

        expect(blogs.compareDocumentPosition(blogs1)).toBe(2) //Node.DOCUMENT_POSITION_PRECEDING (2)

        await userMock.click(buttonSort)

        expect(blogs.compareDocumentPosition(blogs1)).toBe(4) // Node.DOCUMENT_POSITION_FOLLOWING (4)
    })
})
