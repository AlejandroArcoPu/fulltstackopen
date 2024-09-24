const { test, expect,beforeEach, describe } = require('@playwright/test');
const { loginWith,createBlog, increaseLike } = require('./helpers')

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
      await request.post('/api/users', {
        data: {
            username: 'belenagui',
            name: 'Belen',
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
            await loginWith(page,'alejandroarpu','mysecret')
            await expect(page.getByText('Alejandro logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({page}) => {
            await loginWith(page,'alejandroarpu','wrong')

            const errorDiv = page.locator('div').filter({ hasText: /^wrong username or password$/})

            await expect(errorDiv).toHaveCSS('border-style','solid')
            await expect(errorDiv).toHaveCSS('color','rgb(255, 0, 0)')
            await expect(page.getByText('wrong username or password')).toBeVisible()
            await expect(page.getByText('Alejandro logged in')).not.toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page,'alejandroarpu','mysecret')
        })
      
        test('a new blog can be created', async ({ page }) => {
            await createBlog(page,'my first blog','Playwright','https://playwright.dev/')
            await expect(page.getByText('my first blog by Playwright')).toBeVisible()
        })

        describe('With some blogs created', () => {
            beforeEach(async ({page}) => {
                await createBlog(page,'my first blog','Playwright','https://playwright.dev/')
                await createBlog(page,'my second blog','Playwright','https://playwright.dev/')
                await createBlog(page,'my third blog','Playwright','https://playwright.dev/')
            })

            test('a blog can be updated', async ({page}) => {
                await page.getByText('my second blog').locator('..').getByRole('button', {name: 'view'}).click()
                await page.getByRole('button',{ name: 'likes', exact: true }).click()
                await expect(page.getByText('likes 1')).toBeVisible()
            })

            test('a creator can delete a blog', async ({page,context}) => {
                await page.getByText('my second blog').locator('..').getByRole('button', {name: 'view'}).click()
                
                page.on('dialog', async dialog => {
                    console.log(dialog.message())
                    await dialog.accept()
                })

                await page.getByRole('button', { name: 'remove' }).click()
                
                await expect(page.getByText('my second blog Playwrighthide')).not.toBeVisible()
                await expect(page.getByText('the blog my second blog by Playwright removed')).toBeVisible()
            })

            test('blogs are ordered based on likes', async ({page}) => {
                const blogs = ['my first blog','my second blog','my third blog']
                
                for(let blog of blogs){
                    await page.getByText(blog).locator('..').getByRole('button', {name: 'view'}).click()
                }

                await page.getByText(blogs[0]).locator('..').getByRole('button', { name: 'likes' }).click();
                await expect(page.getByText(blogs[0]).locator('..').getByText('likes 1')).toBeVisible()
                await page.getByText(blogs[1]).locator('..').getByRole('button', { name: 'likes' }).click();
                await expect(page.getByText(blogs[1]).locator('..').getByText('likes 1')).toBeVisible()
                await page.getByText(blogs[1]).locator('..').getByRole('button', { name: 'likes' }).click();
                await expect(page.getByText(blogs[1]).locator('..').getByText('likes 2')).toBeVisible()

                await page.getByRole('button',{ name: 'sort by likes' }).click()

                await expect(page.locator('div.blog').nth(0).getByText('likes 2')).toBeVisible()
                await expect(page.locator('div.blog').nth(1).getByText('likes 1')).toBeVisible()
                await expect(page.locator('div.blog').nth(2).getByText('likes 0')).toBeVisible()

            }) 

        })

       
    })
    describe('When logged in with some users', () => {
        beforeEach(async ({page}) => {
            await loginWith(page,'alejandroarpu','mysecret')
            await createBlog(page,'my first blog','Playwright','https://playwright.dev/')
            await createBlog(page,'my second blog','Playwright','https://playwright.dev/')
            await page.getByRole('button', { name: 'logout' }).click()
            await loginWith(page,'belenagui','mysecret')
            await createBlog(page,'my third blog','Playwright','https://playwright.dev/')
        })
        
        test('only creators can see remove button', async ({page}) => {
            await page.getByText('my first blog').locator('..').getByRole('button', { name: 'view'} ).click()
            await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
        })
    })


})