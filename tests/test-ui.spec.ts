import { test, expect } from '@playwright/test'

test('index page', async ({ page }) => {
  await page.goto('/')
  // await page.getByText('loading...').first().isVisible()
  await page
    .getByText('welcome guest what do you think about listening to these albums?')
    .isVisible()
  const albums = page.locator('div.album')
  await expect(albums.first()).toBeVisible()
  expect(await albums.count()).toBe(6)
  await (await page.waitForSelector('.item')).click()
})

test('about page', async ({ page }) => {
  await page.goto('/about')
  await page.getByRole('heading', { name: 'about' }).isVisible()
  await page
    .getByText(
      (
        'dis just a shitty project for my first interaction with sveltekit (i come from react + express)' +
        ', tailwind css (i come from bootstrap), mongodb (i come from mysql and sqlite).'
      ).toLowerCase()
    )
    .isVisible()
  await page
    .getByText(
      (
        'a mini frontend for Last.FM API. late ull be able to fav an album and see who follow, rate 0-5 ' +
        'stars, make review, follow user, etc, but for now the main focus r to maintain project as scall' +
        'able as possible.'
      ).toLowerCase()
    )
    .isVisible()
  await page.getByText('tusm: gueibe | ').isVisible()
  await page.getByText('jrmsrs | 2023').isVisible()
})

test('library page', async ({ page }) => {
  await page.goto('/library')
  await page.getByRole('link').first().click()

  await page.goto('/library/20')
  await page.getByRole('link').last().click()
})

test('release page', async ({ page }) => {
  await page.goto('/library/release/Van%20Halen;1984%20(Remastered)')
  await page.getByRole('img', { name: '1984 (remastered)' }).isVisible()
  expect(await (await page.waitForSelector('.artist')).innerText()).toContain('van halen')
  await page.getByText('hard rock').isVisible()
  await page.getByRole('table').isVisible()

  await page.goto('/library/release/Beck;Sea%20Change')
  await page.getByRole('img', { name: 'sea change' }).isVisible()
  expect(await (await page.waitForSelector('.artist')).innerText()).toContain('beck')
  await page.getByText('singer-songwriter').isVisible()
  await page.getByRole('table').isVisible()
})
