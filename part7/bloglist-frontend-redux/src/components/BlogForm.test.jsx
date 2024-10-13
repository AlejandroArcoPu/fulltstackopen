import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import configureStore from 'redux-mock-store'
import { renderWithProviders } from '../utils/test-utils'

describe('<BlogForm />', () => {
    test('calls onSubmit with the right details', async () => {
        renderWithProviders(<BlogForm />)

        const user = userEvent.setup()

        const inputTitle = screen.getByPlaceholderText('title')
        const inputAuthor = screen.getByPlaceholderText('author')
        const inputUrl = screen.getByPlaceholderText('url')

        const sendButton = screen.getByText('create')

        await user.type(inputTitle, 'testing a form...')
        await user.type(inputAuthor, 'Full Stack Open')
        await user.type(inputUrl, 'https://learning.com')
        await user.click(sendButton)

        store.dispatch()
        // expect(useDispatch.mock.calls).toHaveLength(1)
        // expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')
        // expect(createBlog.mock.calls[0][0].author).toBe('Full Stack Open')
        // expect(createBlog.mock.calls[0][0].url).toBe('https://learning.com')
    })
})
