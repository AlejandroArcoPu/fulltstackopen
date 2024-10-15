import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { server } from './src/mocks/node'

beforeAll(() => server.listen())

afterEach(() => {
    cleanup()
    server.resetHandlers()
})

afterAll(() => server.close())
