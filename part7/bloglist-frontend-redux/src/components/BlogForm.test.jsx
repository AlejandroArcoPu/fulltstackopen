import { screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../utils/test-utils'
const mockDispatch = vi.fn()

const initialUsers = {
    username: 'alejandroarpu',
    name: 'Alejandro Arco',
}

describe('<BlogForm />', () => {
    test('calls onSubmit with the right details', async () => {
        vi.mock(import('react-redux'), async (importOriginal) => {
            const actual = await importOriginal()
            return {
                ...actual,
                useDispatch: () => mockDispatch,
            }
        })

        const mockToggle = vi.fn()

        renderWithProviders(
            <BlogForm
                blogFormRef={{ current: { toggleVisibility: mockToggle } }}
            />,
            {
                preloadedState: {
                    user: initialUsers,
                },
            }
        )

        const user = userEvent.setup()

        const inputTitle = screen.getByPlaceholderText('title')
        const inputAuthor = screen.getByPlaceholderText('author')
        const inputUrl = screen.getByPlaceholderText('url')

        const sendButton = screen.getByText('create')

        await user.type(inputTitle, 'testing a form...')
        await user.type(inputAuthor, 'Full Stack Open')
        await user.type(inputUrl, 'https://learning.com')
        await user.click(sendButton)

        expect(mockToggle).toHaveBeenCalledTimes(1)
        expect(mockDispatch).toHaveBeenCalledTimes(2)

        const dispatchedAction = mockDispatch.mock.calls[0][0]
        const mockDispatchSecondCall = vi.fn()
        await dispatchedAction(mockDispatchSecondCall)
        expect(mockDispatchSecondCall).toHaveBeenCalledWith({
            type: 'blogs/appendBlog',
            payload: [
                {
                    id: '1',
                    likes: 0,
                    title: 'testing a form...',
                    author: 'Full Stack Open',
                    url: 'https://learning.com',
                    user: Object({
                        id: '1',
                        name: 'Alejandro Arco',
                        username: 'alejandroarpu',
                    }),
                },
            ],
        })
        // expect(mockDispatch).toHaveBeenNthCalledWith(1, createBlog)
        // expect(mockDispatch).toHaveBeenCalledWith(
        //     createBlog(
        //         asObject(
        //             'testing a form...',
        //             'Full Stack Open',
        //             'https://learning.com'
        //         )
        //     )
        // )
        // expect(mockDispatch).toHaveBeenCalledWith(
        //     createBlog(
        //         asObject(
        //             'testing a form...',
        //             'Full Stack Open',
        //             'https://learning.com'
        //         )
        //     )
        // )
        // expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')
        // expect(createBlog.mock.calls[0][0].author).toBe('Full Stack Open')
        // expect(createBlog.mock.calls[0][0].url).toBe('https://learning.com')
    })
})
