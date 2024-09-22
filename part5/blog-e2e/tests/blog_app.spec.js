const { test, expect,beforeEach, describe } = require('@playwright/test');

describe('Blog app', () => {
    beforeEach(async ({ page }) => {
      await page.goto('/')
    })
  
    test('Login form is shown', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'log in to application' })).toBeVisible()
        await expect(page.getByTestId('username')).toBeVisible()
        await expect(page.getByTestId('password')).toBeVisible()
    })
})