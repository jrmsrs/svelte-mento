import { test, expect } from '@playwright/test'

// delay = (time: number) => {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, time)
//   })
// }

test('index page', async ({ page }) => {
  await page.goto('/')
  await page.getByText('loading...').first().isVisible()
  await page.getByText('welcome guest take a look at these pikomons').click()
  await (await page.waitForSelector('.item')).click()
})

test('about page', async ({ page }) => {
  await page.goto('/about')
  await page.getByRole('heading', { name: 'about' }).isVisible()
  await page
    .getByText(
      'dis just a shitty project for my first interaction with sveltekit (i came from react + express), tailwind css (i came from bootstrap), mongodb (i came from mysql and sqlite).'
    )
    .isVisible()
  await page
    .getByText(
      'a social media based on rateyourmusic but for pokedex database (or maybe i change everything even project name).'
    )
    .isVisible()
  await page
    .getByText(
      'you will be able to follow a pikomon and see who follow, rate 0 to 5 stars, make review, follow user(?).'
    )
    .isVisible()
  await page.getByText('jrmsrs | 2023').isVisible()
})

test('pikodex page', async ({ page }) => {
  await page.goto('/pikodex')
  await page.getByRole('link', { name: 'pikodex' }).first().click()

  await page.goto('/pikodex/9')
  await page.getByRole('link', { name: 'pokemon dratini (#147) dratini' }).click()
})

test('pikomon page', async ({ page }) => {
  await page.goto('/pikodex/pikomon/1')
  await page.getByRole('heading', { name: 'bulbasaur #1' }).isVisible()
  expect(await (await page.waitForSelector('.name')).innerText()).toContain('bulbasaur')
  expect(await (await page.waitForSelector('.desc')).innerText()).toContain(
    'A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON.'.toLowerCase()
  )
  expect(await (await page.waitForSelector('.type-primary')).innerText()).toContain('grass')
  expect(await (await page.waitForSelector('.type-secondary')).innerText()).toContain('poison')
  await page.getByRole('row', { name: 'Speed 45' }).isVisible()

  await page.goto('/pikodex/pikomon/151')
  await page.getByRole('heading', { name: 'mew #151' }).isVisible()
  expect(await (await page.waitForSelector('.name')).innerText()).toContain('mew')
  expect(await (await page.waitForSelector('.desc')).innerText()).toContain(
    'So rare that it is still said to be a mirage by many experts. Only a few people have seen it worldwide.'.toLowerCase()
  )
  expect(await (await page.waitForSelector('.type-primary')).innerText()).toContain('psychic')
  await page.getByRole('row', { name: 'Speed 100' }).isVisible()
})
