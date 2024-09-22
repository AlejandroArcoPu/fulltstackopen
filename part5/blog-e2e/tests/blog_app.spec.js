const { test, expect,beforeEach, describe } = require('@playwright/test');

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
      await request.post('/api/testing/reset')
      await request.post('/api/users', {
        data: {
            username: 'alejandroarpu',
            name: 'Alejandro',
            password: 'mysecret'
        }
      })
      await page.goto('/')
    })
  
    test('Login form is shown', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'log in to application' })).toBeVisible()
        await expect(page.getByTestId('username')).toBeVisible()
        await expect(page.getByTestId('password')).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({page}) => {
            await page.getByTestId('username').fill('alejandroarpu')
            await page.getByTestId('password').fill('mysecret')
            await page.getByRole('button', {name: 'login'}).click()
            await expect(page.getByText('Alejandro logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({page}) => {
            await page.getByTestId('username').fill('alejandroarpu')
            await page.getByTestId('password').fill('wrong')
            await page.getByRole('button', {name: 'login'}).click()
            const errorDiv = page.locator('div').filter({ hasText: /^wrong username or password$/})

            await expect(errorDiv).toHaveCSS('border-style','solid')
            await expect(errorDiv).toHaveCSS('color','rgb(255, 0, 0)')
            await expect(page.getByText('wrong username or password')).toBeVisible()
            await expect(page.getByText('Alejandro logged in')).not.toBeVisible()
        })
    })

})