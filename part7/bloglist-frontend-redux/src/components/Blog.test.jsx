import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { renderWithProviders } from '../utils/test-utils.jsx'

const initialUsers = {
    username: 'Alejandro',
    name: 'Alejandro',
}

const blog = {
    title: 'This is my first test',
    author: 'Alejandro Arco',
    url: 'https://myfirsttest.com',
    likes: 0,
    user: {
        username: 'Alejandro',
        name: 'Alejandro',
        id: '66e884b34d9bcdac312ba003',
    },
    id: 1,
}

const mockDispatch = vi.fn()

let container

describe('<Blog />', () => {
    beforeEach(() => {
        container = renderWithProviders(<Blog blog={blog} />, {
            preloadedState: {
                user: initialUsers,
                blogs: [blog],
            },
        }).container
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })
    test('renders blog show title an author for default', async () => {
        const elementDefault = container.querySelector('.defaultBlog')
        const elementClick = container.querySelector('.clickBlog')
        const button = screen.getByText('view')

        expect(elementDefault).not.toHaveStyle('display: none')
        expect(elementClick).toHaveStyle('display: none')
        expect(button).toBeVisible()
    })

    test('url and author show when click on button', async () => {
        const userMock = userEvent.setup()
        const buttonView = screen.getByText('view')
        await userMock.click(buttonView)

        const buttonHide = screen.getByText('hide')

        const elementDefault = container.querySelector('.defaultBlog')
        const elementClick = container.querySelector('.clickBlog')

        expect(elementDefault).toHaveStyle('display: none')
        expect(elementClick).not.toHaveStyle('display: none')
        expect(buttonHide).toBeVisible()
    })

    test('click on button likes should increase likes of the blog', async () => {
        vi.mock(import('react-redux'), async (importOriginal) => {
            const actual = await importOriginal()
            return {
                ...actual,
                useDispatch: () => mockDispatch,
            }
        })
        const userMock = userEvent.setup()
        const buttonView = screen.getByText('view')
        await userMock.click(buttonView)

        const buttonLikes = screen.getByRole('button', { name: 'likes' })
        await userMock.click(buttonLikes)
        expect(mockDispatch).toHaveBeenCalledTimes(1)

        const dispatchedAction = mockDispatch.mock.calls[0][0]
        const mockDispatchSecondCall = vi.fn()

        await dispatchedAction(mockDispatchSecondCall)
        expect(mockDispatchSecondCall).toHaveBeenCalledWith({
            type: 'blogs/patchBlog',
            payload: {
                id: '1',
                likes: 1,
                title: 'This is my first test',
                author: 'Alejandro',
                url: 'https://myfirsttest.com',
                user: Object({
                    id: '66e884b34d9bcdac312ba003',
                    name: 'Alejandro',
                    username: 'Alejandro',
                }),
            },
        })
    })

    test('click on the remove button should remove the blog', async () => {
        window.confirm = vi.fn().mockImplementation(() => true)

        vi.mock(import('react-redux'), async (importOriginal) => {
            const actual = await importOriginal()
            return {
                ...actual,
                useDispatch: () => mockDispatch,
            }
        })

        const userMock = userEvent.setup()
        const buttonView = screen.getByText('view')
        await userMock.click(buttonView)
        const buttonRemove = screen.getByRole('button', { name: 'remove' })
        await userMock.click(buttonRemove)
        expect(mockDispatch).toHaveBeenCalledTimes(2)

        const dispatchedAction = mockDispatch.mock.calls[0][0]
        const mockDispatchSecondCall = vi.fn()

        await dispatchedAction(mockDispatchSecondCall)
        expect(mockDispatchSecondCall).toHaveBeenCalledWith({
            type: 'blogs/removeBlog',
            payload: 1,
        })
    })
})
