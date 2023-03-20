import { test } from '@playwright/test'
import * as dotenv from 'dotenv'
dotenv.config()

const delay = (time: number) => new Promise(resolve => setTimeout(resolve, time))

test('dark/light mode', async ({ page }) => {
  await page.goto('/')
  // await delay(5000)
  const dark = await page.evaluate(() => window.localStorage.getItem('dark'))
  if (dark === 'true') {
    await page.getByRole('button', { name: 'light mode' }).click()
    await page.getByRole('button', { name: 'dark mode' }).click()
  } else {
    await page.getByRole('button', { name: 'dark mode' }).click()
    await page.getByRole('button', { name: 'light mode' }).click()
  }
})

test('login/logout', async ({ page }) => {
  await page.goto('/')
  const page2promise = page.waitForEvent('popup')
  await page.getByRole('button', { name: 'login' }).click()
  const page2 = await page2promise
  await page2.getByLabel('Email address').fill(process.env.TESTING_EMAIL || 'test@te.st')
  await page2.getByLabel('Password').fill(process.env.TESTING_PASSWORD || 'test123')
  await page2.getByLabel('Password').press('Enter')

  await delay(2000)
  await page.goto('/')
  await delay(1000)
  await page
    .getByText(
      `welcome ${process.env.TESTING_EMAIL} what do you think about listening to these albums?`
    )
    .isVisible()

  await page.getByRole('button', { name: 'logout' }).click()
  await page.goto('/')
  await page
    .getByText('welcome guest what do you think about listening to these albums?')
    .isVisible()
})
