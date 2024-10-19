import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { renderWithProviders } from '../utils/test-utils.jsx'

const initialUsers = {
    username: 'alejandroarpu',
    name: 'Alejandro Arco',
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
        const userMock = userEvent.setup()
        const buttonView = screen.getByText('view')
        await userMock.click(buttonView)

        const buttonLikes = screen.getByRole('button', { name: 'likes' })
        await userMock.click(buttonLikes)
    })
})
