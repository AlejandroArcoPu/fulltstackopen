import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

describe('<Blog />', () => {
    const user = {
        name: 'Alejandro Arco',
    }

    const blog = {
        title: 'This is my first test',
        author: 'Alejandro Arco',
        url: 'https://myfirsttest.com',
        likes: 0,
        user: { name: 'Alejandro Arco' },
    }

    test('renders blog show title an author for default', async () => {
        const container = render(<Blog blog={blog} user={user} />).container
        const elementDefault = container.querySelector('.defaultBlog')
        const elementClick = container.querySelector('.clickBlog')

        expect(elementDefault).not.toHaveStyle('display: none')
        expect(elementClick).toHaveStyle('display: none')
    })

    test('url and author show when click on button', async () => {
        const container = render(<Blog blog={blog} user={user} />).container
        const userMock = userEvent.setup()
        const button = screen.getByText('view')
        await userMock.click(button)

        const elementDefault = container.querySelector('.defaultBlog')
        const elementClick = container.querySelector('.clickBlog')

        expect(elementDefault).toHaveStyle('display: none')
        expect(elementClick).not.toHaveStyle('display: none')
    })

    test('clicking the likes button twice calls event handler twice', async () => {
        const mockUpdate = vi.fn()

        render(<Blog blog={blog} user={user} updateBlog={mockUpdate} />)

        const userMock = userEvent.setup()
        const button = screen.getByText('likes')
        await userMock.click(button)
        await userMock.click(button)

        expect(mockUpdate.mock.calls).toHaveLength(2)
    })
})
